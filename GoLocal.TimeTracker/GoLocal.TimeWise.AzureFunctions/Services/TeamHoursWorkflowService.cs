// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Repository;
using GoLocal.TimeWise.AzureFunctions.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class TeamHoursWorkflowService : IWorkflowService<TeamHours>
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly WorkflowServiceHelper _workflowServiceHelper;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private const string _hrListIdentifier = "inbox";
        private const string _reportHoursListIdentifier = "entries";

        /// <summary>
        /// Constructor
        /// </summary>
        public TeamHoursWorkflowService(
            TimeTrackerOptions timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            WorkflowServiceHelper workflowServiceHelper,
            UserProfileRepository userProfileRepository)
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _workflowServiceHelper = workflowServiceHelper ?? throw new ArgumentNullException(nameof(workflowServiceHelper));
            
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
         
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
                var dateKey = hoursToSubmit[0].Fields.Date.ToString();
                var cacheKey = managerObjectIdentifier + dateKey;

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
                var teamHoursToReviewList = teamHoursToReview.ToList();
                GraphResultItem managerObjectIdentifier = await _graphUserService.GetMyManagerAsync(teamHoursToReviewList[0].Fields.ObjectIdentifier);
                var teamHoursSiteList = await _graphSharePointService.GetSiteListAsync(managerObjectIdentifier.Id, ListSchema.TeamHoursListSchema);
                var workHoursDate = DateTime.Now;

                
                var dateKey = teamHoursToReviewList.First().Fields.Date.Remove(6).ToString();
                var cacheKey = managerObjectIdentifier + dateKey;

                // Persist to SharePoint
                foreach (var item in teamHoursToReview)
                {
                    // Update the workHoursDate which is used to set the month in the message body
                    workHoursDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

                    // Create JSON object to update Team Hours in SharePoint
                    dynamic teamHoursFieldsObject = new JObject();
                    teamHoursFieldsObject.ItemState = ItemState.RequiresRevision.ToString();

                    dynamic teamHoursRootObject = new JObject();
                    teamHoursRootObject.fields = teamHoursFieldsObject;

                    // Update List Item in TeamHours List
                    var teamHoursItemId = _graphSharePointService.UpdateSiteListItemAsync(teamHoursSiteList, item.Id, teamHoursRootObject.ToString());

                    // Update work hours in sharepoint with request revision
                    var userObjectIdentifier = item.Fields.ObjectIdentifier;
                    var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);

                    var dateFix = item.Fields.Date.Remove(6);
                    var workHoursToUpdate = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, dateFix);

                    foreach (var workHoursItem in workHoursToUpdate)
                    {
                        // Create JSON object to update Work Hours in SharePoint
                        dynamic workHoursFieldsObject = new JObject();
                        workHoursFieldsObject.ItemState = ItemState.RequiresRevision.ToString();

                        dynamic workHoursRootObject = new JObject();
                        workHoursRootObject.fields = workHoursFieldsObject;

                        // Update List Item in WorkHours List
                        var workHoursItemId = _graphSharePointService.UpdateSiteListItemAsync(workHoursSiteList, workHoursItem.Id, workHoursRootObject.ToString());
                    }

                    // Create notification and send email
                    var sendToObject = await _graphUserService.GetUserBasicAsync(userObjectIdentifier);
                    messageBody = _workflowServiceHelper.ComposeMessageBody(NotificationType.RequestWorkHoursRevision, workHoursDate, messageBody);
                    await _workflowServiceHelper.SendNotificationAsync(sendToObject, NotificationType.RequestWorkHoursRevision, messageBody);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
