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
    public class WorkHoursWorkflowService : IWorkflowService<WorkHours>
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly WorkflowServiceHelper _workflowServiceHelper;
        private readonly string _objectIdentifier;

        /// <summary>
        /// Constructor
        /// </summary>
        public WorkHoursWorkflowService(
             TimeTrackerOptions timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            WorkflowServiceHelper workflowServiceHelper,
            string objectIdentifier)
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _workflowServiceHelper = workflowServiceHelper ?? throw new ArgumentNullException(nameof(workflowServiceHelper));
            _objectIdentifier = objectIdentifier;
        }

        public async Task SubmitHoursAsync(IEnumerable<WorkHours> workHoursToSubmit, string messageBody = "")
        {
            try
            {
                if (workHoursToSubmit == null) throw new ArgumentNullException(nameof(workHoursToSubmit));
                if (((List<WorkHours>)workHoursToSubmit)?.Count == 0) return; // Nothing to do

                // Get the manager object identifier of the current user
                var managerOfUser = await _graphUserService.GetMyManagerAsync(_objectIdentifier); // Need to get the manager Id in order to request the corresponding SharePoint List.
                var managerObjectIdentifier = managerOfUser.Id ?? "";

                await SubmitHoursAsync(workHoursToSubmit, _objectIdentifier, managerOfUser, messageBody);
            }
            catch (Exception ex)
            {
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
                //var workHoursCacheEntry = await _cacheService.TryRetrieveFromCacheAsync(workHoursListCollectionPage, cacheKey);
                //if (workHoursCacheEntry != null)
                //{
                //    workHoursListCollectionPage = workHoursCacheEntry;
                //}

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
                //await _cacheService.ClearCacheAsync(cacheKey);
            }
            catch (Exception ex)
            {
            }
        }

        public async Task RequestHoursReviewAsync(IEnumerable<WorkHours> modelData, string messageBody = "")
        {
            throw new NotImplementedException();
        }
    }
}
