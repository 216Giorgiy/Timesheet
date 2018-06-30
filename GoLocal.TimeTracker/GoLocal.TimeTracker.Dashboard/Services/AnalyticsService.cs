// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.Resources;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using GoLocal.TimeTracker.MiddleTier.Repositories;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Options;

namespace GoLocal.TimeTracker.Dashboard.Services
{
    public class AnalyticsService : IAnalyticsServiceDashBoard<AnalyticsViewModel>
    {
        private readonly ILogger _logger;
        private readonly IRepository<WorkHours> _workHoursRepository;
        private readonly IRepository<Analytics> _analyticsRepository;
        private readonly LocService _sharedLocalizer;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private const string _reportHoursListIdentifier = "entries";
        public AnalyticsService(
            ILogger<TimeTrackerDataService> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<WorkHours> workHoursRepository,
            IRepository<Analytics> analyticsRepository,
            GraphAppSharePointService graphSharePointService,
            LocService sharedLocalizer
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _workHoursRepository = workHoursRepository ?? throw new ArgumentNullException(nameof(workHoursRepository)); 
            _analyticsRepository = analyticsRepository ?? throw new ArgumentNullException(nameof(analyticsRepository));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _sharedLocalizer = sharedLocalizer ?? throw new ArgumentNullException(nameof(logger));

        }

        public class OTUserChartData
        {
            public int otUserCount;
            public decimal percentOfOTUsers;
        }

        public async Task<Dictionary<string, object>> GetOTPercentageAsync(string sDate)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;

            DateTime selDate = DateTime.Parse(sDate, ci);

            var analyticsList = await _analyticsRepository.GetItemsAsync(new DateTime(selDate.Year, selDate.Month, 1));

            var dictOTUsers = new Dictionary<string, object>();

            bool testData = false;
            if (!testData)
            {
                // get the datewise groupings and the count of users both total and reported overtime
                var groupings = from item in analyticsList
                                group item by item.Fields.Date into data
                                select data;

                                //select data.Distinct();


                foreach (var grouping in groupings)
                {
                    var userChartData = new OTUserChartData();

                    var usersWithOT = grouping.Where(s => s.Fields.OvertimeHours > 0 || s.Fields.OvertimeMinutes > 0);
                    userChartData.otUserCount = usersWithOT.Count();

                    int reportedUsers = grouping.Count();
                    userChartData.percentOfOTUsers = Math.Round((decimal)(userChartData.otUserCount * 100 )/ reportedUsers);

                    dictOTUsers.Add(grouping.Key, userChartData);
                }
            }
            else
            {
                //temp mock data --------------------------------
                DateTime dtMonth = selDate;
                DateTime date = dtMonth.Date;
                DateTime curDate = date.AddDays(1 - date.Day);
                Random rnd = new Random();

                while (curDate.Month == dtMonth.Month)
                {
                    string dateStr = curDate.ToString("yyyyMMdd", ci);

                    var userChartData = new OTUserChartData();
                    userChartData.otUserCount = 0;
                    userChartData.percentOfOTUsers = rnd.Next(101);
                    dictOTUsers.Add(dateStr, userChartData);

                    curDate = curDate.AddDays(1);
                }
            }
            return dictOTUsers;
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

                // if is first time process the submissions during current month, else check for any submits today.

                //var submittedDate = DateTime.Now.Date.ToString("yyyyMMdd", CultureInfo.InvariantCulture);
                ////var todayDate = DateTime.ParseExact(submittedDate, "yyyyMMdd", CultureInfo.InvariantCulture);
                //submittedDate = processForToday ? submittedDate : submittedDate.Remove(6);

                //var options = new List<QueryOption>();
                //options.Add(new QueryOption("filter", @"startswith(fields/TeamHoursSubmittedDate,'" + submittedDate + "')"));
                //var reportHoursList = await _graphSharePointService.GetSiteListItemsAsync(reportHoursSiteList, options);

                var submitDate = DateTime.Now.Date.AddDays(-1);
                var startDate = processForToday ? submitDate : submitDate.AddDays(1 - submitDate.Day);
                var endDate = submitDate;  // processForToday ? submitDate : startDate.AddMonths(1).AddDays(-1);

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
                            OTMins = totalMins - dailyGoalMin;  //TODO: verify -ve values
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
                _logger.LogError("Error saving team hours in submit: " + ex.Message);
                throw ex;
            }
            return true;
        }

        //public static Dictionary<string, short> ComputeDailyTotals(WorkHoursFields whf)
        //{
        //    Dictionary<string, short> FinalDictObj = new Dictionary<string, short>();

        //    //For Email Hours
        //    if (whf.EmailAdjustedHours > 0 || whf.EmailAdjustedMinutes > 0)
        //    {

        //        FinalDictObj.TryAdd("FinalEmailHrs", whf.EmailAdjustedHours);
        //        FinalDictObj.TryAdd("FinalEmailMins", whf.EmailAdjustedMinutes);

        //    }
        //    else
        //    {
        //        FinalDictObj.TryAdd("FinalEmailHrs", whf.EmailHours);
        //        FinalDictObj.TryAdd("FinalEmailMins", whf.EmailMinutes);

        //    }
        //    //For Meeting Hours
        //    if (whf.MeetingAdjustedHours > 0 || whf.MeetingAdjustedMinutes > 0)
        //    {

        //        FinalDictObj.TryAdd("FinalMeetingHrs", whf.MeetingAdjustedHours);
        //        FinalDictObj.TryAdd("FinalMeetingMins", whf.MeetingAdjustedMinutes);

        //    }
        //    else
        //    {
        //        FinalDictObj.TryAdd("FinalMeetingHrs", whf.MeetingHours);
        //        FinalDictObj.TryAdd("FinalMeetingMins", whf.MeetingMinutes);

        //    }
        //    //For Other Hours
        //    if (whf.OtherAdjustedHours > 0 || whf.OtherAdjustedMinutes > 0)
        //    {

        //        FinalDictObj.TryAdd("FinalOtherHrs", whf.OtherAdjustedHours);
        //        FinalDictObj.TryAdd("FinalOtherMins", whf.OtherAdjustedMinutes);

        //    }
        //    else
        //    {
        //        FinalDictObj.TryAdd("FinalOtherHrs", whf.OtherHours);
        //        FinalDictObj.TryAdd("FinalOtherMins", whf.OtherMinutes);

        //    }

        //    // Total Calculation
        //    var Mins = FinalDictObj["FinalEmailMins"] + FinalDictObj["FinalMeetingMins"] + FinalDictObj["FinalOtherMins"];
        //    var totalMins = Mins % 60;
        //    var totalHrs = FinalDictObj["FinalEmailHrs"] + FinalDictObj["FinalMeetingHrs"] + FinalDictObj["FinalOtherHrs"] + Mins / 60;

        //    FinalDictObj.TryAdd("FinalTotalHrs", (short)totalHrs);
        //    FinalDictObj.TryAdd("FinalTotalMins", (short)totalMins);

        //    return FinalDictObj;

        //}
    }
}
