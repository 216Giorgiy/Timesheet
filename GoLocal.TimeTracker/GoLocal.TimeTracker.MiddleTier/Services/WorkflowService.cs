// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Repositories;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Services;
using System.Globalization;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System.Linq;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;

namespace GoLocal.TimeTracker.MiddleTier.Services
{
    public class WorkHoursWorkflowService : IWorkflowService<WorkHours>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly WorkflowServiceHelper _workflowServiceHelper;
        private readonly IRepository<Notifications> _notificationsRepository;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly ICacheService<ListCollectionPage<WorkHours>> _cacheService;

        /// <summary>
        /// Constructor
        /// </summary>
        public WorkHoursWorkflowService(
            ILogger<WorkHoursWorkflowService> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            WorkflowServiceHelper workflowServiceHelper,
            IRepository<Notifications> notificationsRepository,
            IRepository<UserProfile> userProfileRepository,
            ICacheService<ListCollectionPage<WorkHours>> cacheService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _workflowServiceHelper = workflowServiceHelper ?? throw new ArgumentNullException(nameof(workflowServiceHelper));
            _notificationsRepository = notificationsRepository ?? throw new ArgumentNullException(nameof(notificationsRepository));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
        }

        public async Task SubmitHoursAsync(IEnumerable<WorkHours> workHoursToSubmit, string messageBody = "")
        {
            try
            {
                if (workHoursToSubmit == null) throw new ArgumentNullException(nameof(workHoursToSubmit));
                if (((List<WorkHours>)workHoursToSubmit)?.Count == 0) return; // Nothing to do

                // Get the manager object identifier of the current user
                var userProfile = await _userProfileRepository.GetItemAsync();
                var userObjectIdentifier = userProfile.Id;
                var managerOfUser = await _graphUserService.GetMyManagerAsync(userObjectIdentifier); // Need to get the manager Id in order to request the corresponding SharePoint List.
                var managerObjectIdentifier = managerOfUser.Id ?? "";

                await SubmitHoursAsync(workHoursToSubmit, userObjectIdentifier, managerOfUser, messageBody);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error submitting work hours in workflow: " + ex.Message);
            }
        }

        public async Task SubmitHoursAsync(IEnumerable<WorkHours> workHoursToSubmit, string userObjectIdentifier, GraphResultItem managerOfUser, string messageBody = "")
        {
            try
            {
                if (workHoursToSubmit == null) throw new ArgumentNullException(nameof(workHoursToSubmit));
                if (((List<WorkHours>)workHoursToSubmit)?.Count == 0) return; // Nothing to do
                if (String.IsNullOrEmpty(userObjectIdentifier)) return; // Nothing to do

                // Try to get the work hours from cache
                var workHoursListCollectionPage = new ListCollectionPage<WorkHours>();
                var dateQuery = workHoursToSubmit.ToList();
                // Works for longer Date yyyyMMdd
                var cacheKey = userObjectIdentifier + dateQuery[0].Fields.Date.Remove(6);
                var workHoursCacheEntry = await _cacheService.TryRetrieveFromCacheAsync(workHoursListCollectionPage, cacheKey);
                if (workHoursCacheEntry != null)
                {
                    workHoursListCollectionPage = workHoursCacheEntry;
                }

                var managerObjectIdentifier = managerOfUser.Id ?? "";

                var teamHoursSiteList = new SiteList();

                if (String.IsNullOrEmpty(managerObjectIdentifier))
                {
                    // Skip manager by passing report hours identifier as manager identifier and handling that when building the models for the report by setting the manager display name to blank
                    managerObjectIdentifier = "";
                    managerOfUser.DisplayName = "";
                    teamHoursSiteList = await _graphSharePointService.GetSiteListAsync("entries", ListSchema.ReportHoursListSchema);
                }

                // Get the SpSiteList, if the list does not exists, it will create one
                var workHoursSiteList = workHoursListCollectionPage.SiteList;
                if (String.IsNullOrEmpty(workHoursSiteList.ListId)) workHoursSiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);
                if (!String.IsNullOrEmpty(managerObjectIdentifier)) teamHoursSiteList = await _graphSharePointService.GetSiteListAsync(managerObjectIdentifier, ListSchema.TeamHoursListSchema);

                var teamHoursRow = new TeamHours();
                var submittedDate = DateTime.Now;
                var hasRequestedRevision = false;
                var tasksList = new List<Task>();
                var workHoursDate = DateTime.Now;

                foreach (var workHours in workHoursToSubmit)
                {
                    // Only count not submitted and requieres revision
                    if (workHours.Fields.ItemState == ItemState.NotSubmitted || workHours.Fields.ItemState == ItemState.RequiresRevision)
                    {
                        //Update the workHoursDate so we can assamble the message of the notification
                        workHoursDate = DateTime.ParseExact(workHours.Fields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

                        // To track if there is an entry that has a requiered revision
                        if (!hasRequestedRevision && workHours.Fields.ItemState == ItemState.RequiresRevision) hasRequestedRevision = true;

                        teamHoursRow.Fields.Date = workHours.Fields.Date;
                        teamHoursRow.Fields.ObjectIdentifier = workHours.Fields.ObjectIdentifier;

                        teamHoursRow.Fields.MeetingHours += workHours.Fields.MeetingHours;
                        teamHoursRow.Fields.MeetingMinutes += workHours.Fields.MeetingMinutes;

                        if (workHours.Fields.MeetingAdjustedHours != 0 || workHours.Fields.MeetingAdjustedMinutes != 0)
                        {
                            teamHoursRow.Fields.MeetingAdjustedHours += workHours.Fields.MeetingAdjustedHours;
                            teamHoursRow.Fields.MeetingAdjustedMinutes += workHours.Fields.MeetingAdjustedMinutes;
                        }
                        else
                        {
                            teamHoursRow.Fields.MeetingAdjustedHours += workHours.Fields.MeetingHours;
                            teamHoursRow.Fields.MeetingAdjustedMinutes += workHours.Fields.MeetingMinutes;
                        }
                        
                        teamHoursRow.Fields.EmailHours += workHours.Fields.EmailHours;
                        teamHoursRow.Fields.EmailMinutes += workHours.Fields.EmailMinutes;

                        if (workHours.Fields.EmailAdjustedHours != 0 || workHours.Fields.EmailAdjustedMinutes != 0)
                        {
                            teamHoursRow.Fields.EmailAdjustedHours += workHours.Fields.EmailAdjustedHours;
                            teamHoursRow.Fields.EmailAdjustedMinutes += workHours.Fields.EmailAdjustedMinutes;
                        }
                        else
                        {
                            teamHoursRow.Fields.EmailAdjustedHours += workHours.Fields.EmailHours;
                            teamHoursRow.Fields.EmailAdjustedMinutes += workHours.Fields.EmailMinutes;
                        }

                        teamHoursRow.Fields.OtherHours += workHours.Fields.OtherHours;
                        teamHoursRow.Fields.OtherMinutes += workHours.Fields.OtherMinutes;

                        if (workHours.Fields.OtherAdjustedHours != 0 || workHours.Fields.OtherAdjustedMinutes != 0)
                        {
                            teamHoursRow.Fields.OtherAdjustedHours += workHours.Fields.OtherAdjustedHours;
                            teamHoursRow.Fields.OtherAdjustedMinutes += workHours.Fields.OtherAdjustedMinutes;
                        }
                        else
                        {
                            teamHoursRow.Fields.OtherAdjustedHours += workHours.Fields.OtherHours;
                            teamHoursRow.Fields.OtherAdjustedMinutes += workHours.Fields.OtherMinutes;
                        }

                        teamHoursRow.Fields.TeamHoursItemState = ItemState.NotSubmitted;
                        teamHoursRow.Fields.ItemState = ItemState.Submitted;
                        teamHoursRow.Fields.SubmittedDate = submittedDate;

                        // Create JSON object to update WORK HOURS (aka employee entries) in SharePoint
                        dynamic workHoursFieldsObject = new JObject();
                        if (String.IsNullOrEmpty(managerObjectIdentifier))
                        {
                            // Skip submit to manager and send to HR since user does not has manager
                            workHoursFieldsObject.TeamHoursItemState = ItemState.Submitted.ToString();
                            workHoursFieldsObject.TeamHoursSubmittedDate = submittedDate;
                        }
                        workHoursFieldsObject.ItemState = ItemState.Submitted.ToString();
                        workHoursFieldsObject.SubmittedDate = submittedDate;

                        dynamic workHoursRootObject = new JObject();
                        workHoursRootObject.fields = workHoursFieldsObject;

                        // Update List Item in WorkHours List
                        await _graphSharePointService.UpdateSiteListItemAsync(workHoursSiteList, workHours.Id, workHoursRootObject.ToString());
                    }
                }

                // Adjust minutes to hours due the sum (above)
                var timeSpan = new TimeSpan(teamHoursRow.Fields.MeetingHours, teamHoursRow.Fields.MeetingMinutes, 0);
                teamHoursRow.Fields.MeetingHours = Convert.ToInt16(timeSpan.Hours + (timeSpan.Days * 24));
				teamHoursRow.Fields.MeetingMinutes = Convert.ToInt16(timeSpan.Minutes);

                timeSpan = new TimeSpan(teamHoursRow.Fields.MeetingAdjustedHours, teamHoursRow.Fields.MeetingAdjustedMinutes, 0);
                teamHoursRow.Fields.MeetingAdjustedHours = Convert.ToInt16(timeSpan.Hours + (timeSpan.Days * 24));
				teamHoursRow.Fields.MeetingAdjustedMinutes = Convert.ToInt16(timeSpan.Minutes);

                timeSpan = new TimeSpan(teamHoursRow.Fields.EmailHours, teamHoursRow.Fields.EmailMinutes, 0);
                teamHoursRow.Fields.EmailHours = Convert.ToInt16(timeSpan.Hours + (timeSpan.Days * 24));
				teamHoursRow.Fields.EmailMinutes = Convert.ToInt16(timeSpan.Minutes);

                timeSpan = new TimeSpan(teamHoursRow.Fields.EmailAdjustedHours, teamHoursRow.Fields.EmailAdjustedMinutes, 0);
                teamHoursRow.Fields.EmailAdjustedHours = Convert.ToInt16(timeSpan.Hours + (timeSpan.Days * 24));
				teamHoursRow.Fields.EmailAdjustedMinutes = Convert.ToInt16(timeSpan.Minutes);

                timeSpan = new TimeSpan(teamHoursRow.Fields.OtherHours, teamHoursRow.Fields.OtherMinutes, 0);
                teamHoursRow.Fields.OtherHours = Convert.ToInt16(timeSpan.Hours + (timeSpan.Days * 24));
				teamHoursRow.Fields.OtherMinutes = Convert.ToInt16(timeSpan.Minutes);

                timeSpan = new TimeSpan(teamHoursRow.Fields.OtherAdjustedHours, teamHoursRow.Fields.OtherAdjustedMinutes, 0);
                teamHoursRow.Fields.OtherAdjustedHours = Convert.ToInt16(timeSpan.Hours + (timeSpan.Days * 24));
				teamHoursRow.Fields.OtherAdjustedMinutes = Convert.ToInt16(timeSpan.Minutes);


                // Create JSON object to add a new list item in team Hours list in SharePoint
                dynamic teamHoursFieldsObject = new JObject();
                teamHoursFieldsObject.ObjectIdentifier = teamHoursRow.Fields.ObjectIdentifier;
                teamHoursFieldsObject.Date = teamHoursRow.Fields.Date;
                teamHoursFieldsObject.MeetingHours = teamHoursRow.Fields.MeetingHours;
                teamHoursFieldsObject.MeetingMinutes = teamHoursRow.Fields.MeetingMinutes;
                teamHoursFieldsObject.MeetingAdjustedHours = teamHoursRow.Fields.MeetingAdjustedHours;
                teamHoursFieldsObject.MeetingAdjustedMinutes = teamHoursRow.Fields.MeetingAdjustedMinutes;
                teamHoursFieldsObject.EmailHours = teamHoursRow.Fields.EmailHours;
                teamHoursFieldsObject.EmailMinutes = teamHoursRow.Fields.EmailMinutes;
                teamHoursFieldsObject.EmailAdjustedHours = teamHoursRow.Fields.EmailAdjustedHours;
                teamHoursFieldsObject.EmailAdjustedMinutes = teamHoursRow.Fields.EmailAdjustedMinutes;
                teamHoursFieldsObject.OtherHours = teamHoursRow.Fields.OtherHours;
                teamHoursFieldsObject.OtherMinutes = teamHoursRow.Fields.OtherMinutes;
                teamHoursFieldsObject.OtherAdjustedHours = teamHoursRow.Fields.OtherAdjustedHours;
                teamHoursFieldsObject.OtherAdjustedMinutes = teamHoursRow.Fields.OtherAdjustedMinutes;
                teamHoursFieldsObject.AdjustedHoursReason = "" + teamHoursRow.Fields.AdjustedHoursReason;
                if (String.IsNullOrEmpty(managerObjectIdentifier))
                {
                    // Skip submit to manager and send to HR since user does not has manager
                    teamHoursFieldsObject.TeamHoursItemState = ItemState.Submitted.ToString();
                    teamHoursFieldsObject.TeamHoursSubmittedDate = submittedDate;
                }
                else
                {
                    teamHoursFieldsObject.TeamHoursItemState = teamHoursRow.Fields.TeamHoursItemState.ToString();
                }
                teamHoursFieldsObject.ItemState = teamHoursRow.Fields.ItemState.ToString();
                teamHoursFieldsObject.SubmittedDate = teamHoursRow.Fields.SubmittedDate;

                dynamic teamHoursRootObject = new JObject();
                teamHoursRootObject.fields = teamHoursFieldsObject;

                // If submit is not due to a request revision, create team hours entry otherwise we only update the existing one
                if (hasRequestedRevision)
                {
                    // Update existing team hours entry (this is the case for requesting revision)
                    List<QueryOption> options = new List<QueryOption>();
                    options.Add(new QueryOption("filter", @"startswith(fields/Date,'" + teamHoursRow.Fields.Date + "') and startswith(fields/ObjectIdentifier,'" + teamHoursRow.Fields.ObjectIdentifier + "')"));

                    var teamHoursResults = await _graphSharePointService.GetSiteListItemsAsync(teamHoursSiteList, options);

                    var updateResults = await _graphSharePointService.UpdateSiteListItemAsync(teamHoursSiteList, teamHoursResults[0].Id, teamHoursRootObject.ToString());
                }
                else
                {
                    // Create List Item in TeamHours list
                    var createResults = await _graphSharePointService.CreateSiteListItemAsync(teamHoursSiteList, teamHoursRootObject.ToString());
                }


                // Create notification and send email
                //var messageBody = _workflowServiceHelper.ComposeMessageBody(NotificationType.SubmitWorkHours, workHoursDate);
                await _workflowServiceHelper.SendNotificationAsync(managerOfUser, NotificationType.SubmitWorkHours, messageBody);

                // Clear te cache
                await _cacheService.ClearCacheAsync(cacheKey);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error submitting work hours in workflow: " + ex.Message);
            }
        }

        public async Task RequestHoursReviewAsync(IEnumerable<WorkHours> modelData, string messageBody = "")
        {
            throw new NotImplementedException();
        }
    }


    /// <summary>
    /// The workflow service implements the functionality to submit, reject, etc. hours across users
    /// </summary>
    public class TeamHoursWorkflowService : IWorkflowService<TeamHours>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly WorkflowServiceHelper _workflowServiceHelper;
        private readonly IRepository<Notifications> _notificationsRepository;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly ICacheService<ListCollectionPage<TeamHours>> _cacheService;
        private const string _hrListIdentifier = "inbox";
        private const string _reportHoursListIdentifier = "entries";

        /// <summary>
        /// Constructor
        /// </summary>
        public TeamHoursWorkflowService(
            ILogger<TeamHoursWorkflowService> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            WorkflowServiceHelper workflowServiceHelper,
            IRepository<Notifications> notificationsRepository,
            IRepository<UserProfile> userProfileRepository,
            ICacheService<ListCollectionPage<TeamHours>> cacheService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _workflowServiceHelper = workflowServiceHelper ?? throw new ArgumentNullException(nameof(workflowServiceHelper));
            _notificationsRepository = notificationsRepository ?? throw new ArgumentNullException(nameof(notificationsRepository));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
        }

        public async Task SubmitHoursAsync(IEnumerable<TeamHours> teamHoursToSubmit, string messageBody = "")
        {
            try
            {
                if (teamHoursToSubmit == null) throw new ArgumentNullException(nameof(teamHoursToSubmit));
                var hoursToSubmit = teamHoursToSubmit.ToList();
                if (hoursToSubmit?.Count == 0) return; // Nothing to do

                // Get the Team hours site list for current user, if the list does not exists, it will create one
                var userProfile = await _userProfileRepository.GetItemAsync();
                var managerObjectIdentifier = userProfile.Id;
                var teamHoursSiteList = await _graphSharePointService.GetSiteListAsync(managerObjectIdentifier, ListSchema.TeamHoursListSchema);
                var reportHoursSiteList = await _graphSharePointService.GetSiteListAsync(_reportHoursListIdentifier, ListSchema.ReportHoursListSchema);

                // Try fetching the data from cache
                var dateKey =hoursToSubmit[0].Fields.Date.ToString();
                var cacheKey = managerObjectIdentifier + dateKey;
                await _cacheService.ClearCacheAsync(cacheKey);

                var teamHoursSubmitList = teamHoursToSubmit.ToList();
                var submittedDate = DateTime.Now;
                var teamHoursDate = DateTime.Now;

                foreach (var item in teamHoursToSubmit)
                {
                    // Hours Submitted, but NO HR Report.
                    //if (item.Fields.TeamHoursItemState == ItemState.NotSubmitted || item.Fields.TeamHoursItemState == ItemState.RequiresRevision)
                    if (item.Fields.TeamHoursItemState == ItemState.NotSubmitted && item.Fields.ItemState == ItemState.Submitted)
                    {
                        // Update teamHoursDate with last date value which is used in the notificationn message body
                        // Date contains a string! yyyyMMdd
                        teamHoursDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

                        // Create JSON object to update Team Hours in SharePoint
                        dynamic teamHoursFieldsObject = new JObject();
                        teamHoursFieldsObject.TeamHoursItemState = ItemState.Submitted.ToString();
                        teamHoursFieldsObject.TeamHoursSubmittedDate = submittedDate; 

                        dynamic teamHoursRootObject = new JObject();
                        teamHoursRootObject.fields = teamHoursFieldsObject;

                        // Create JSON object to create entries in Report Hours in SharePoint
                        dynamic reportHoursFieldsObject = new JObject();
                        reportHoursFieldsObject.ObjectIdentifier = item.Fields.ObjectIdentifier;
                        reportHoursFieldsObject.ManagerObjectIdentifier = managerObjectIdentifier;
                        reportHoursFieldsObject.Date = item.Fields.Date;
                        reportHoursFieldsObject.TeamHoursItemState = ItemState.Submitted.ToString();
                        reportHoursFieldsObject.TeamHoursSubmittedDate = submittedDate;
                        reportHoursFieldsObject.ItemState = item.Fields.ItemState.ToString();
                        reportHoursFieldsObject.SubmittedDate = item.Fields.SubmittedDate;

                        dynamic reportHoursRootObject = new JObject();
                        reportHoursRootObject.fields = reportHoursFieldsObject;

                        // Update the team hours entry in SharePoint
                        await _graphSharePointService.UpdateSiteListItemAsync(teamHoursSiteList, item.Id, teamHoursRootObject.ToString());

                        // Create List Item in ReportHours List
                        var createResult = await _graphSharePointService.CreateSiteListItemAsync(reportHoursSiteList, reportHoursRootObject.ToString());

                        // Get work hours list for this teamHours entry and update the TeamHoursItemState
                        var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(item.Fields.ObjectIdentifier, ListSchema.WorkHoursListSchema);
                        // Works for longer yyyyMMdd date.
                        var dateQuery = item.Fields.Date.Remove(6);
                        var workHoursResult = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, dateQuery);

                        if (workHoursResult?.Count == 0) throw new ServiceException(new Error { Code = ErrorConstants.Codes.InvalidRequest, Message = "Can't retrieve work hours for a team hours entry" });

                        foreach (var workHoursItem in workHoursResult)
                        {
                            // Create JSON object to update Work Hours list in SharePoint
                            dynamic workHoursFieldsObject = new JObject();
                            workHoursFieldsObject.TeamHoursItemState = ItemState.Submitted.ToString();
                            workHoursFieldsObject.TeamHoursSubmittedDate = submittedDate;

                            dynamic workHoursRootObject = new JObject();
                            workHoursRootObject.fields = workHoursFieldsObject;

                            // Update List Item in WorkHours List
                            // var updateResult = await _graphSharePointService.UpdateSiteListItemAsync(workHoursSiteList, workHoursItem.Id, workHoursRootObject.ToString());
                            await _graphSharePointService.UpdateSiteListItemAsync(workHoursSiteList, workHoursItem.Id, workHoursRootObject.ToString());
                        }
                    }
                }

                // Create notification and send email
                var sendToObject = new GraphResultItem
                {
                    Id = _hrListIdentifier,
                    Properties = new Dictionary<string, object>
                        {
                            { "Mail", _timeTrackerOptions.HrNotificationMail },
                        }
                };
                // Send notification
                //var messageBody = _workflowServiceHelper.ComposeMessageBody(NotificationType.SubmitTeamHours, teamHoursDate);
                await _workflowServiceHelper.SendNotificationAsync(sendToObject, NotificationType.SubmitTeamHours, messageBody);
            }

            catch (Exception ex)
            {
                _logger.LogError("Error saving team hours in submit: " + ex.Message);
                throw ex;
            }
        }

        public Task SubmitHoursAsync(IEnumerable<TeamHours> workHoursToSubmit, string userObjectIdentifier, GraphResultItem managerOfUser, string messageBody = "")
        {
            throw new NotImplementedException();
        }

        public async Task RequestHoursReviewAsync(IEnumerable<TeamHours> teamHoursToReview, string messageBody = "")
        {
            try
            {
                // Get the SpSiteList, if the list does not exists, it will create one
                var userProfile = await _userProfileRepository.GetItemAsync();
                var managerObjectIdentifier = userProfile.Id;
                //var teamHoursSiteList = await _graphSharePointService.GetSiteListAsync(managerObjectIdentifier, ListSchema.TeamHoursListSchema);
                var workHoursDate = DateTime.Now;

                var teamHoursToReviewList = teamHoursToReview.ToList();
                //var dateKey = teamHoursToReviewList.First().Fields.Date.Remove(6).ToString();
                //var cacheKey = managerObjectIdentifier + dateKey;
                //await _cacheService.ClearCacheAsync(cacheKey);

                //// Persist to SharePoint
                foreach (var item in teamHoursToReview)
                {
                    // Update the workHoursDate which is used to set the month in the message body
                    //workHoursDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

                    //// Create JSON object to update Team Hours in SharePoint
                    //dynamic teamHoursFieldsObject = new JObject();
                    //teamHoursFieldsObject.ItemState = ItemState.RequiresRevision.ToString();

                    //dynamic teamHoursRootObject = new JObject();
                    //teamHoursRootObject.fields = teamHoursFieldsObject;

                    //// Update List Item in TeamHours List
                    //var teamHoursItemId = _graphSharePointService.UpdateSiteListItemAsync(teamHoursSiteList, item.Id, teamHoursRootObject.ToString());

                    //// Update work hours in sharepoint with request revision
                    var userObjectIdentifier = item.Fields.ObjectIdentifier;
                    //var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);

                    //var dateFix = item.Fields.Date.Remove(6).ToString();
                    //var workHoursToUpdate = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, dateFix);

                    //foreach (var workHoursItem in workHoursToUpdate)
                    //{
                    //    // Create JSON object to update Work Hours in SharePoint
                    //    dynamic workHoursFieldsObject = new JObject();
                    //    workHoursFieldsObject.ItemState = ItemState.RequiresRevision.ToString();

                    //    dynamic workHoursRootObject = new JObject();
                    //    workHoursRootObject.fields = workHoursFieldsObject;

                    //    // Update List Item in WorkHours List
                    //    var workHoursItemId = _graphSharePointService.UpdateSiteListItemAsync(workHoursSiteList, workHoursItem.Id, workHoursRootObject.ToString());
                    //}

                    // Create notification and send email
                    var sendToObject = await _graphUserService.GetUserBasicAsync(userObjectIdentifier);
                    messageBody = _workflowServiceHelper.ComposeMessageBody(NotificationType.RequestWorkHoursRevision, workHoursDate, messageBody);
                    await _workflowServiceHelper.SendNotificationAsync(sendToObject, NotificationType.RequestWorkHoursRevision, messageBody);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error saving team hours in submit: " + ex.Message);
                throw ex;
            }
        }
    }
}
