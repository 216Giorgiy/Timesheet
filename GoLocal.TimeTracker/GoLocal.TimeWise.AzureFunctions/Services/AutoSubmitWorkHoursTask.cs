// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Newtonsoft.Json.Linq;


namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class AutoSubmitWorkHoursTask : IScheduledTask
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly string _schedule;
        private SiteList _usersSiteList;

        public AutoSubmitWorkHoursTask(
            TimeTrackerOptions timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService)
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));

            _schedule = _timeTrackerOptions.CutoffDayEmployee;
        }

        /// <summary>
        /// Uses Cron expression format: https://en.wikipedia.org/wiki/Cron#CRON_expression
        /// </summary>
        public string Schedule => _schedule;

        public async Task ExecuteAsync()
        {
            if (_usersSiteList == null) await TryGetSiteList();

            await CheckSubmitState();
        }

        private async Task TryGetSiteList()
        {
            _usersSiteList = await _graphSharePointService.GetSiteListAsync("users", ListSchema.UsersListSchema);
        }

        private async Task CheckSubmitState()
        {
            // Query options to filter expired work hours entries
            var queryOptions = new List<QueryOption>();
            queryOptions.Add(new QueryOption("filter", @"startswith(fields/AutoSubmitData,'scheduled')"));
            // Call graph to get all registered users
            var usersList = await _graphSharePointService.GetSiteListItemsAsync(_usersSiteList, queryOptions);

            if (usersList?.Count > 0)
            {
                foreach (var item in usersList)
                {
                    await updateStatus("inprogress", item.Id);

                    var substractMonths = -3;
                    try
                    {
                        while (substractMonths != 0)
                        {
                            var queryOptionsExpired = new List<QueryOption>();
                            var nextOccurrence = DateTime.Now.AddMonths(substractMonths);
                            queryOptionsExpired.Add(new QueryOption("filter", @"startswith(fields/Date,'" + nextOccurrence.ToString("yyyyMM") + "')"));

                            var userObjectIdentifier = item.Properties["ObjectIdentifier"].ToString();
                            var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);

                            // Call graph to get hours not submitted but expired due to cut off setting
                            var workHoursList = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, queryOptionsExpired);

                            if (workHoursList?.Count > 0)
                            {
                                var workHoursToSubmit = new List<WorkHours>();
                                var managerOfUser = await _graphUserService.GetUserManagerAsync(userObjectIdentifier);

                                foreach (var graphItem in workHoursList)
                                {
                                    workHoursToSubmit.Add(new WorkHours
                                    {
                                        Id = graphItem.Id,
                                        ListId = workHoursSiteList.ListId,
                                        Fields = WorkHoursRepository.ConvertToWorkHours(graphItem, userObjectIdentifier)
                                    });
                                }
                                var result = await SubmitHoursAsync(workHoursToSubmit, userObjectIdentifier, managerOfUser);                                
                            }
                            substractMonths++;
                        }
                        await updateStatus("updated", item.Id);
                    }
                    catch(Exception ex)
                    {
                        //go to the next user.
                    }
                }
            }
        }
    
        private async Task updateStatus(string status, string id)
        {

            dynamic workHoursFieldsObject = new JObject();

            switch (status)
            {
                case "updated":
                    workHoursFieldsObject.AutoSubmitStatus = "Complete";
                    workHoursFieldsObject.SubmitDate = DateTime.Now;
                    break;
                case "inprogress":
                    workHoursFieldsObject.AutoSubmitStatus = "Inprogress";
                    break;
            }

            dynamic workHoursRootObject = new JObject();
            workHoursRootObject.fields = workHoursFieldsObject;
            // Update List Item in WorkHours List
            await _graphSharePointService.UpdateSiteListItemAsync(_usersSiteList, id, workHoursRootObject.ToString());
        }
        private async Task<string> SubmitHoursAsync(IEnumerable<WorkHours> workHoursToSubmit, string userObjectIdentifier, GraphResultItem managerOfUser)
        {
            var completedSubmit = String.Empty;

            if (workHoursToSubmit == null) throw new ArgumentNullException(nameof(workHoursToSubmit));
            var workHoursToSubmitList = workHoursToSubmit.ToList();
            if (workHoursToSubmitList?.Count == 0) return completedSubmit; // Nothing to do
            if (String.IsNullOrEmpty(userObjectIdentifier)) return completedSubmit; // Nothing to do

            var workHoursListCollectionPage = new ListCollectionPage<WorkHours>();
            var teamHoursSiteList = new SiteList();

            if (managerOfUser == null)
            {
                // Skip manager by passing report hours identifier as manager identifier and handling that when building the models for the report by setting the manager display name to blank
                managerOfUser = new GraphResultItem
                {
                    Id = "",
                    DisplayName = ""
                };

                teamHoursSiteList = await _graphSharePointService.GetSiteListAsync("entries", ListSchema.ReportHoursListSchema);
            }

            var managerObjectIdentifier = managerOfUser.Id;

            // Get the SpSiteList, if the list does not exists, it will create one
            var workHoursSiteList = workHoursListCollectionPage.SiteList;
            if (String.IsNullOrEmpty(workHoursSiteList.ListId)) workHoursSiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);
            if (!String.IsNullOrEmpty(managerObjectIdentifier)) teamHoursSiteList = await _graphSharePointService.GetSiteListAsync(managerObjectIdentifier, ListSchema.TeamHoursListSchema);

            var teamHoursRow = new TeamHours();
            var submittedDate = DateTime.Now;
            var hasRequestedRevision = false;
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

            if (teamHoursRow.Fields.ObjectIdentifier != null)
            {
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

                completedSubmit = "OK";


                // Create notification and send email
                //var messageBody = _workflowServiceHelper.ComposeMessageBody(NotificationType.SubmitWorkHours, workHoursDate);
                //await _workflowServiceHelper.SendNotificationAsync(managerOfUser, NotificationType.SubmitWorkHours, messageBody);

                return completedSubmit;
            }

            return "Nothing to Submit";
        }
    }
}
