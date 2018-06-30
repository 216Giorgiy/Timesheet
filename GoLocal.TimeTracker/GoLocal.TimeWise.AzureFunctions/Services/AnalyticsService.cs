// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
//using GoLocal.TimeTracker.Dashboard.Interfaces;
//using GoLocal.TimeTracker.Dashboard.Resources;
//using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Utilities;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Options;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class AnalyticsService 
    {
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private const string _reportHoursListIdentifier = "entries";

        public AnalyticsService(
            TimeTrackerOptions timeTrackerOptions,
            GraphAppSharePointService graphSharePointService
            ) 
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
        }

        public async Task<bool> UpdateAnalytics()
        {
            try
            {
                // Get the site list
                string objectIdentifier = Guid.NewGuid().ToString();
                var analyticsSiteList = await _graphSharePointService.GetSiteListAsync(objectIdentifier, ListSchema.TotalHrsListSchema);
                bool processForToday = true;
                var analyticsRecords = await _graphSharePointService.GetSiteListItemsAsync(analyticsSiteList);
                processForToday = analyticsRecords.Count > 0;

                // get the reportHours
                var reportHoursSiteList = await _graphSharePointService.GetSiteListAsync(_reportHoursListIdentifier, ListSchema.ReportHoursListSchema);

                // if is first time process the submissions during current month up until yesteray
                // else check for any submits on yesterday.

                TimezoneHelper timezoneHelper = new TimezoneHelper(_timeTrackerOptions);
                var definedZone = timezoneHelper.timeZoneInfo;
                var today = TimeZoneInfo.ConvertTime(DateTime.Now, definedZone);
                 
                var submitDate = today.Date.AddDays(-1);  
                var startDate = processForToday ? submitDate : submitDate.AddDays(1 - submitDate.Day);
                var endDate = submitDate; 

                //TODO:  filtering upfront would be more performant and less demanding for resources.
                //var options = new List<QueryOption>();
                //options.Add(new QueryOption("filter", @"startswith(fields/TeamHoursSubmittedDate,'" + submittedDate + "')"));
                //var reportHoursList = await _graphSharePointService.GetSiteListItemsAsync(reportHoursSiteList, options);

                var reportHoursList = await _graphSharePointService.GetSiteListItemsAsync(reportHoursSiteList);
                var filteredList = reportHoursList.Where(k => (DateTime.Parse(k.Properties["TeamHoursSubmittedDate"].ToString()).Date >= startDate) &&
                    (DateTime.Parse(k.Properties["TeamHoursSubmittedDate"].ToString()).Date <= endDate) ).ToList();

                foreach (var item in filteredList)
                {
                    // Get work hours list for this teamHours entry and update the TeamHoursItemState
                    var userObjectIdentifier = item.Properties["ObjectIdentifier"].ToString();

                    var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);
                    // Works for longer yyyyMMdd date.
                    var dateQuery = item.Properties["Date"].ToString().Remove(6);

                    var workHoursResult = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, dateQuery);

                    if (workHoursResult?.Count == 0) throw new ServiceException(new Error { Code = "invalidRequest", Message = "Can't retrieve work hours for a team hours entry" });

                    foreach (var workHoursItem in workHoursResult)
                    {
                        if ((workHoursItem.Properties["TeamHoursItemState"].ToString() != ItemState.Submitted.ToString()) ||
                            (item.Properties["TeamHoursSubmittedDate"].ToString() != workHoursItem.Properties["TeamHoursSubmittedDate"].ToString()))
                        {
                            // log error and continue;
                            // continue;   //TODO: find out why only one item is getting updated in workhours with teamhourssubmitteddate.
                        }

                        WorkHoursFields whf = WorkHoursRepository.ConvertToWorkHours(workHoursItem, userObjectIdentifier);
                        Dictionary<string, short> dailyTotals = Helpers.HoursComputeHelper.ComputeDailyTotals(whf);

                        // calculate totals and overtime
                        int totalHours = Convert.ToInt16(dailyTotals["FinalTotalHrs"]);
                        int totalMins = Convert.ToInt16(dailyTotals["FinalTotalMins"]);
                        int dailyGoalHrs = _timeTrackerOptions.DayHours;
                        int dailyGoalMin = 0;
                        int OTHours = 0;
                        int OTMins = 0;

                        if ((totalHours > dailyGoalHrs) || ((totalHours == dailyGoalHrs) && (dailyGoalMin > 0) && (totalMins > dailyGoalMin)))
                        {
                            OTHours = totalHours - dailyGoalHrs;
                            OTMins = totalMins - dailyGoalMin;  
                            
                            //TODO: verify -ve values;  Shouldn't encounter -ve ot mins.
                            if (OTMins < 0)
                            {
                                OTMins += 60;
                                OTHours--;
                            }
                        }

                        // create analytic record.
                        // Create JSON object to add a new list item in Daily OT Hours list in SharePoint
                        dynamic dailyOTHoursFieldsObject = new JObject();
                        dailyOTHoursFieldsObject.ObjectIdentifier = userObjectIdentifier;
                        dailyOTHoursFieldsObject.Date = workHoursItem.Properties["Date"].ToString();
                        dailyOTHoursFieldsObject.TotalHours = totalHours;
                        dailyOTHoursFieldsObject.TotalMins = totalMins;
                        dailyOTHoursFieldsObject.OTHours = OTHours;
                        dailyOTHoursFieldsObject.OTMins = OTMins;

                        dynamic dailyOTHoursRootObject = new JObject();
                        dailyOTHoursRootObject.fields = dailyOTHoursFieldsObject;

                        var saveResults = await _graphSharePointService.CreateSiteListItemAsync(analyticsSiteList, dailyOTHoursRootObject.ToString());
                    }
                }

            }

            catch (Exception ex)
            {
                throw ex;
            }
            return true;
        }
    }
}
