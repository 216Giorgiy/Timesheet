// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using GoLocal.TimeWise.AzureFunctions.Repository;
using Microsoft.Graph;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class TimeTrackerDataService : IDataService
    {
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly IRepository<WorkHours> _workHoursRepository;
        private readonly IRepository<TeamHours> _teamHoursRepository;
        private readonly IRepository<ReportHours> _reportHoursRepository;
        private readonly IWorkflowService<WorkHours> _workflowService;
        private readonly IWorkflowService<TeamHours> _teamHoursWorkflowService;
        private readonly IRepository<Notifications> _notificationsRepository;
        private readonly TimeTrackerOptions _timeTrackerOptions;

        // global variables to be used across methods
        private DashBoardViewModel _dashboardViewModel;
        private IEnumerable<WorkHours> _workHoursList;
        private Task<IEnumerable<WorkHours>> _thirdMonthHrsLst;
        private Task<IEnumerable<WorkHours>> _fourthMonthHrsLst;


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">The logging provider to use</param>
        /// <param name="timeTrackerOptions">The app settings provider</param>
        public TimeTrackerDataService(
            UserProfileRepository userProfileRepository,

            WorkHoursRepository workHoursRepository,
            TeamHoursRepository teamHoursRepository,
            ReportHoursRepository reportHoursRepository,
            WorkHoursWorkflowService workflowService,
            TeamHoursWorkflowService teamHoursWorkflowService,
            TimeTrackerOptions timeTrackerOptions
            )
        {
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _workHoursRepository = workHoursRepository ?? throw new ArgumentNullException(nameof(workHoursRepository)); // For dashboard
            _teamHoursRepository = teamHoursRepository ?? throw new ArgumentNullException(nameof(teamHoursRepository)); // For manager
            _reportHoursRepository = reportHoursRepository ?? throw new ArgumentNullException(nameof(reportHoursRepository)); // For HR
            _workflowService = workflowService ?? throw new ArgumentNullException(nameof(workflowService));
            _teamHoursWorkflowService = teamHoursWorkflowService ?? throw new ArgumentNullException(nameof(teamHoursWorkflowService));
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions)); // For GetDirect
            _dashboardViewModel = new DashBoardViewModel();
            _workHoursList = new List<WorkHours>();
        }

        public async Task<UserProfile> GetUserProfile()
        {
            var userProfile = await _userProfileRepository.GetItemAsync(); // Call to MiddleTier 
            if (userProfile != null)
            {
                return userProfile;
            }

            return userProfile;
        }

        public async Task<Boolean> GetMonthsToSubmit()
        {
            try
            {
                List<WorkHours> monthHours = new List<WorkHours>();
                Int16 i = 1;
                DateTime dateToProcess = DateTime.Now;
                int totHrs;
                int totMins;
                String dictValOutHrs;
                String dictValOutMins;
                String strMonths = "";

                while (i <= 1) //check for a max of 1 months in the past for submission
                {
                    ConcurrentDictionary<string, string> DictHrsMins = new ConcurrentDictionary<string, string>();
                    CultureInfo ci = CultureInfo.InvariantCulture;
                    dateToProcess = dateToProcess.AddMonths(-1);
                    var firstDayOfMonth = new DateTime(dateToProcess.Year, dateToProcess.Month, 1);
                    var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

                    //var prevMonthHours = await _workHoursRepository.GetItemsAsync(dateToProcess);
                    List<WorkHours> prevMonthHours = new List<WorkHours>();
                    var result = _workHoursList.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= firstDayOfMonth.Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= lastDayOfMonth.Date);
                    if (result != null && result.Any())
                    {
                        prevMonthHours.AddRange(result);
                    }
                    else
                    {
                        var workHours = await _workHoursRepository.GetItemsAsync(dateToProcess);
                        prevMonthHours.AddRange(workHours);

                    }

                    //get totalhrs and totalmins for the month 
                    DictHrsMins = HoursComputeHelper.ComputeHoursAndMins(prevMonthHours);

                    //check if the totalhrs and totalmins are returned
                    if (DictHrsMins.TryGetValue("TotHrs", out dictValOutHrs) && DictHrsMins.TryGetValue("TotMins", out dictValOutMins))
                    {
                        totHrs = int.Parse(dictValOutHrs);
                        totMins = int.Parse(dictValOutMins);

                        //If the logic comes across a month where the total hours and total mins both are 0, come out of the while condition
                        //also check if there exists atleast one record where the itemstate = notsubmitted/requiresrevision

                        if ((totHrs > 0 || totMins > 0) && (prevMonthHours.ToList().Exists(x => x.Fields.ItemState.Equals(ItemState.NotSubmitted)) || prevMonthHours.ToList().Exists(x => x.Fields.ItemState.Equals(ItemState.RequiresRevision))))
                        {
                            i++;
                            strMonths = strMonths + "" + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateToProcess.Month) + " " + dateToProcess.Year + ", ";

                        }
                        else
                        {
                            break;
                        }

                    }
                }

                _dashboardViewModel.SubmittedMonths = strMonths.Substring(0, strMonths.Length - 2);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }


        }


        public async Task<Boolean> SubmitHoursForMonthAsync(string notificationMsgBody)
        {
            Boolean submitResult = false;

            try
            {
                List<WorkHours> monthHours = new List<WorkHours>();
                Int16 i = 1;
                DateTime dateToProcess = DateTime.Now;
                int totHrs;
                int totMins;
                String dictValOutHrs;
                String dictValOutMins;


                while (i <= 3) //check for a max of 3 months in the past for submission
                {
                    dateToProcess = dateToProcess.AddMonths(-1);
                    bool check = await _workHoursRepository.dataCheck(dateToProcess);
                    if (check == true)
                    {
                        ConcurrentDictionary<string, string> DictHrsMins = new ConcurrentDictionary<string, string>();

                        var prevMonthHours = await _workHoursRepository.GetItemsAsync(dateToProcess);

                        //get totalhrs and totalmins for the month 
                        DictHrsMins = HoursComputeHelper.ComputeHoursAndMins(prevMonthHours);

                        //check if the totalhrs and totalmins are returned
                        if (DictHrsMins.TryGetValue("TotHrs", out dictValOutHrs) && DictHrsMins.TryGetValue("TotMins", out dictValOutMins))
                        {
                            totHrs = int.Parse(dictValOutHrs);
                            totMins = int.Parse(dictValOutMins);

                            //If the logic comes across a month where the total hours and total mins both are 0, come out of the while condition
                            //also check if there exists atleast one record where the itemstate = notsubmitted/requiresrevision

                            if ((totHrs > 0 || totMins > 0) && (prevMonthHours.ToList().Exists(x => x.Fields.ItemState.Equals(ItemState.NotSubmitted)) || prevMonthHours.ToList().Exists(x => x.Fields.ItemState.Equals(ItemState.RequiresRevision))))
                            {
                                
                                await _workflowService.SubmitHoursAsync(prevMonthHours, notificationMsgBody);
                                submitResult = true;

                            }
                            else
                            {
                                break;
                            }

                        }
                    }
                    i++;
                }

                submitResult = true;
            }
            catch (Exception ex)
            {
                submitResult = false;
            }


            return submitResult;
        }

        public async Task<bool> MyTeamWorkHoursRevisionRequest(DateTime monthDate, string objIdentifier, string reason, string id, string date, string notificationMsgBody)
        {
            try
            {
                TeamHours entryToRequestRevision = new TeamHours();
                var itemsToRequestRevision = new List<TeamHours>();
                entryToRequestRevision.Id = id;
                entryToRequestRevision.Fields.Date = date;
                entryToRequestRevision.Fields.AdjustedHoursReason = reason;
                entryToRequestRevision.Fields.ObjectIdentifier = objIdentifier;
                itemsToRequestRevision.Add(entryToRequestRevision);

                // Get team hours object to be submitted
                //var teamHoursToSubmit = await _teamHoursRepository.GetItemsAsync(month);

                // Request for revision of hours using the workflow service
               
                await _teamHoursWorkflowService.RequestHoursReviewAsync(itemsToRequestRevision, notificationMsgBody);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
        /*
		public async Task<Boolean> MyTeamsSubmitHours( DateTime month)

		{
			Boolean submitResult = false;
			try
			{
				// Get team hours object and submit to HR
				var teamHoursToSubmit = await _teamHoursRepository.GetItemsAsync(month);
				await _teamHoursWorkflowService.SubmitHoursAsync(teamHoursToSubmit);

			}
			catch (Exception ex)
			{
				_logger.LogError("Error requesting team hours revision request: " + ex.Message);
				return false;
			}

			return true;
		}
		*/

        public async Task<Boolean> MyTeamsSubmitHours(DateTime date, string notificationMsgBody)

        {
            Boolean submitResult;
            try
            {
                IEnumerable<TeamHours> teamHoursList = new List<TeamHours>();

                // Get all records to be submitted for the month
                teamHoursList = await _teamHoursRepository.GetItemsAsync(date);

                // Submit to HR                
                await _teamHoursWorkflowService.SubmitHoursAsync(teamHoursList, notificationMsgBody);
                submitResult = true;
            }
            catch (Exception ex)
            {
                submitResult = false;
            }

            return submitResult;
        }
        public async Task<MyMonthlyHoursViewModel> GetMonthlyReportHours(DateTime dt)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;

            // Get an array tagging each item of the month with the Week number
            int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);
            var monthlyHrsList = new List<MonthlyHours>();

            int week1TotHrs = 0;
            int week1TotMins = 0;
            int week2TotHrs = 0;
            int week2TotMins = 0;
            int week3TotHrs = 0;
            int week3TotMins = 0;
            int week4TotHrs = 0;
            int week4TotMins = 0;
            int week5TotHrs = 0;
            int week5TotMins = 0;
            int monthTotalHrs = 0;
            int monthTotalMins = 0;


            var items = await this._reportHoursRepository.GetItemsAsync(dt);

            // Group Monthly Report hours by individual User data using DisplayName
            var groupings = from item in items
                            group item by item.Fields.DisplayName into data
                            select data;
            var monthlyHours = new MonthlyHours();

            // Process the data for each user 
            foreach (var grouping in groupings)
            {
                //	dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);

                // Compute the total for each week of the month by processing daily records
                foreach (var item in grouping)
                {

                    monthlyHours.EmpName = item.Fields.DisplayName;
                    monthlyHours.ManagerName = item.Fields.ManagerDisplayName;
                    var itemDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", ci);

                    ConcurrentDictionary<string, short> hrsMins = new ConcurrentDictionary<string, short>();

                    //call to get Final hours for ReportHours Repository data
                    hrsMins = HoursComputeHelper.GetFinalHrsMins(item);
                    var totalHours = hrsMins["FinalTotalHrs"];
                    var totalMins = hrsMins["FinalTotalMins"];

                    if ((itemDate.Day - 1) <= 27)
                    {
                        var theWeekNumber = dateWeekNumber[itemDate.Day - 1];

                        switch (dateWeekNumber[itemDate.Day - 1])
                        {
                            case 1:
                                week1TotHrs += totalHours;
                                week1TotMins += totalMins;
                                break;
                            case 2:
                                week2TotHrs += totalHours;
                                week2TotMins += totalMins;
                                break;
                            case 3:

                                week3TotHrs += totalHours;
                                week3TotMins += totalMins;
                                break;
                            case 4:

                                week4TotHrs += totalHours;
                                week4TotMins += totalMins;
                                break;
                            case 5:

                                week5TotHrs += totalHours;
                                week5TotMins += totalMins;
                                break;

                        }


                    }
                    else
                    {
                        week5TotHrs += totalHours;
                        week5TotMins += totalMins;
                    }
                }
                //Logic to adjust values 60 min = hrs++
                week1TotHrs = (week1TotHrs + (week1TotMins / 60));
                week1TotMins = (week1TotMins % 60);
                week2TotHrs = (week2TotHrs + (week2TotMins / 60));
                week2TotMins = (week2TotMins % 60);
                week3TotHrs = (week3TotHrs + (week3TotMins / 60));
                week3TotMins = (week3TotMins % 60);
                week4TotHrs = (week4TotHrs + (week4TotMins / 60));
                week4TotMins = (week4TotMins % 60);
                week5TotHrs = (week5TotHrs + (week5TotMins / 60));
                week5TotMins = (week5TotMins % 60);
                monthTotalMins = (week1TotMins + week2TotMins + week3TotMins + week4TotMins + week5TotMins);
                monthTotalHrs = (week1TotHrs + week2TotHrs + week3TotHrs + week4TotHrs + week5TotHrs) + (monthTotalMins / 60);
                monthTotalMins = monthTotalMins % 60;

                var week1TotalHrMns = week1TotHrs + "h " + week1TotMins + "m";
                var week2TotalHrMns = week2TotHrs + "h " + week2TotMins + "m";
                var week3TotalHrMns = week3TotHrs + "h " + week3TotMins + "m";
                var week4TotalHrMns = week4TotHrs + "h " + week4TotMins + "m";
                var week5TotalHrMns = week5TotHrs + "h " + week5TotMins + "m";
                var monthlyTotalHrMns = monthTotalHrs + "h " + monthTotalMins + "m";

                monthlyHours.Week1TotalHrMns = week1TotalHrMns;
                monthlyHours.Week2TotalHrMns = week2TotalHrMns;
                monthlyHours.Week3TotalHrMns = week3TotalHrMns;
                monthlyHours.Week4TotalHrMns = week4TotalHrMns;
                monthlyHours.Week5TotalHrMns = week5TotalHrMns;
                monthlyHours.MonthlyTotalHrMns = monthlyTotalHrMns;

                //Add the computed object(for each employee) to the list of monthly hours for the HR
                monthlyHrsList.Add(monthlyHours);


            }
            return new MyMonthlyHoursViewModel()
            {
                MonthlyHrs = monthlyHrsList
            };
        }
        public async Task<ListCollectionPage<ReportHours>> GetWeeklyPageView(DateTime date, string empNameFilter, int pageId, int pagesize, ListCollectionPage<ReportHours> myCurrentReportHoursList, int status = 0)
        {
            try
            {
                /*
				var teamHoursNew = new ListCollectionPage<TeamHours>();
				if (status == 0)
					teamHoursNew = await _teamHoursRepository.GetItemsAsync(date, pagesize);
				else if (status == 1)
					teamHoursNew = await _teamHoursRepository.GetNextItemsAsync(myCurrentTeamHourList);
				else if (status == 2)
					teamHoursNew = await _teamHoursRepository.GetPreviousItemsAsync(myCurrentTeamHourList);

				return teamHoursNew;
				*/

                var reportHours = new ListCollectionPage<ReportHours>();
                //var items;

                //var items = await this._reportHoursRepository.GetItemsAsync(dt);
                if (status == 0)
                    reportHours = await _reportHoursRepository.GetItemsAsync(date, pagesize);
                else if (status == 1)
                    reportHours = await _reportHoursRepository.GetNextItemsAsync(myCurrentReportHoursList);
                else if (status == 2)
                    reportHours = await _reportHoursRepository.GetPreviousItemsAsync(myCurrentReportHoursList);

                return reportHours;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<Dictionary<string, string>> GetWorkHoursForDate(DateTime dt)
        {

            DashBoardViewModel dashboardViewModel = new DashBoardViewModel();

            var workhoursList = await GetHoursInternal(dt, dt);
            CultureInfo ci = CultureInfo.InvariantCulture;
            //var workhoursList = await _workHoursRepository.GetItemsAsync(dt);
            var workhours = workhoursList.Where(x => DateTime.ParseExact(x.Fields.Date, "yyyyMMdd", ci) == dt).FirstOrDefault();

            var DictHrsMins = new ConcurrentDictionary<string, string>();
            DictHrsMins = HoursComputeHelper.ComputeHoursAndMins(workhoursList);
            if (workhours != null)
            {
                DictHrsMins.TryAdd("modelId", workhours.Id);
                DictHrsMins.TryAdd("AdjustedHoursReason", workhours.Fields.AdjustedHoursReason);
                DictHrsMins.TryAdd("ItemState", workhours.Fields.ItemState.ToString());
            }
            Dictionary<string, string> dic = new Dictionary<string, string>(DictHrsMins);
            return dic;
        }

        public async Task<WeeklyHoursViewModel> GetWeeklyReportHours(DateTime dt)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;

            // Get an array tagging each item of the month with the Week number
            int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);
            var myWeekNumber = dateWeekNumber[dt.Day - 1];
            var weeklyHrsList = new List<WeeklyHours>();

            var items = await this._reportHoursRepository.GetItemsAsync(dt);

            // Group Report hours by individual User data using DisplayName
            var groupings = from item in items
                            group item by item.Fields.DisplayName into data
                            select data;

            // Process the data for each user 
            foreach (var grouping in groupings)
            {
                var weeklyHrs = new WeeklyHours();

                //Add the computed object(for each employee) to the list of weekly hours for the HR
                weeklyHrsList.Add(weeklyHrs);
                weeklyHrs.EmpName = grouping.Key;
                foreach (var item in grouping)
                {
                    ConcurrentDictionary<string, short> hrsMins = new ConcurrentDictionary<string, short>();

                    //call to get Final hours for ReportHours Repository data
                    hrsMins = HoursComputeHelper.GetFinalHrsMins(item);
                    var totalHours = hrsMins["FinalTotalHrs"];
                    var totalMins = hrsMins["FinalTotalMins"];
                    if (weeklyHrs.MgrName == null)
                    {
                        weeklyHrs.MgrName = item.Fields.ManagerDisplayName;
                    }
                    var itemDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", ci);

                    var theWeekNumber = dateWeekNumber[itemDate.Day - 1];
                    if (dateWeekNumber[itemDate.Day - 1] == myWeekNumber)
                    {

                        switch (itemDate.DayOfWeek)
                        {
                            case System.DayOfWeek.Saturday:
                                weeklyHrs.SundayHours += totalHours;
                                weeklyHrs.SundayMins += totalMins;
                                break;
                            case System.DayOfWeek.Monday:
                                weeklyHrs.MondayHours += totalHours;
                                weeklyHrs.MondayMins += totalMins;
                                break;
                            case System.DayOfWeek.Tuesday:
                                weeklyHrs.TuesdayHours += totalHours;
                                weeklyHrs.TuesdayMins += totalMins;
                                break;
                            case System.DayOfWeek.Wednesday:
                                weeklyHrs.WednesdayHours += totalHours;
                                weeklyHrs.WednesdayMins += totalMins;
                                break;
                            case System.DayOfWeek.Thursday:
                                weeklyHrs.ThursdayHours += totalHours;
                                weeklyHrs.ThursdayMins += totalMins;
                                break;
                            case System.DayOfWeek.Friday:
                                weeklyHrs.FridayHours += totalHours;
                                weeklyHrs.FridayMins += totalMins;
                                break;
                            default:
                                weeklyHrs.SaturdayHours += totalHours;
                                weeklyHrs.SaturdayMins += totalMins;
                                break;
                        }
                    }
                }
            }

            return new WeeklyHoursViewModel()
            {
                WeeklyHrs = weeklyHrsList
            };
        }

        public async Task<DashBoardViewModel> GetWorkHours(DateTime dt, string weekType, string firstDayOfWeek)
        {
            DateTime cacheStart = new DateTime(DateTime.Now.AddMonths(-1).Year, DateTime.Now.AddMonths(-1).Month, 1);
            DateTime cacheEnd = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month));
            //var cachedDate = await CacheHourDate(DateTime.Now.AddMonths(-1), DateTime.Now, user, httpContext);

            //DashBoardViewModel dashboardViewModel = new DashBoardViewModel();

            //initliazing required properties
            //var userProfile = await _userProfileRepository.GetItemAsync(); // Call to MiddleTier
            //var firstDay = userProfile.Fields.FirstDayWeek;
            int firstDayWeekNum = 1; // init to default value.
            switch (firstDayOfWeek)
            {
                case "Sunday":
                    firstDayWeekNum = 0;
                    break;
                case "Monday":
                    firstDayWeekNum = 1;
                    break;
                case "Tuesday":
                    firstDayWeekNum = 2;
                    break;
                case "Wednesday":
                    firstDayWeekNum = 3;
                    break;
                case "Thursday":
                    firstDayWeekNum = 4;
                    break;
                case "Friday":
                    firstDayWeekNum = 5;
                    break;
                case "Saturday":
                    firstDayWeekNum = 6;
                    break;
                default:
                    firstDayWeekNum = 1;
                    break;
            }

            _dashboardViewModel.InitilizeObjProp();


            Dictionary<string, DateTime> weekStEndDt = WeekDayHelper.GetWeekStEndDate(dt, weekType, firstDayWeekNum);

            _dashboardViewModel.WeekStartDay = weekStEndDt["weekStDate"].Date;
            _dashboardViewModel.WeekEndDay = weekStEndDt["weekEndDate"].Date;

            // Get current month's Workhours data


            //Task<IEnumerable<WorkHours>>thisMonthHrsLst = Task.Run(() => _workHoursRepository.GetItemsAsync(new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)));
            var thisMonthHrsLst = await _workHoursRepository.GetItemsAsync(new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1));

            DateTime curDate = DateTime.Now;
            DateTime lmStDate = curDate.AddMonths(-1).AddDays(1 - curDate.Day);

            //Task<IEnumerable<WorkHours>> lastMonthHrsLst = Task.Run(() => _workHoursRepository.GetItemsAsync(lmStDate));
            var lastMonthHrsLst = await _workHoursRepository.GetItemsAsync(lmStDate);

            _workHoursList = (thisMonthHrsLst).Concat(lastMonthHrsLst);
            //_dashboardViewModel = await PopulateMonthHours(user, await thisMonthHrsLst, "thismonth", weekType, firstDayWeekNum, dt);

            /*
			var thirdMonthStDate = curDate.AddMonths(-2).AddDays(1 - curDate.Day);
			_thirdMonthHrsLst = Task.Run(() => _workHoursRepository.GetItemsAsync(thirdMonthStDate));

			_workHoursList = (_workHoursList).Concat(await _thirdMonthHrsLst);

			var fourthMonthStDate = curDate.AddMonths(-3).AddDays(1 - curDate.Day);
			_fourthMonthHrsLst = Task.Run(() => _workHoursRepository.GetItemsAsync(fourthMonthStDate));

			_workHoursList = (_workHoursList).Concat(await _fourthMonthHrsLst);
			*/

            Task resultThisMonth = Task.Run(() => PopulateMonthHours(thisMonthHrsLst, "thismonth", weekType, firstDayWeekNum, dt));
            //var resultThisMonth = await PopulateMonthHours(user, thisMonthHrsLst, "thismonth", weekType, firstDayWeekNum, dt);

            // Get last month's workHours data

            Task resultLastMonth = Task.Run(() => PopulateMonthHours(lastMonthHrsLst, "lastmonth", weekType, firstDayWeekNum, dt));
            //var resultLastMonth = await PopulateMonthHours(user, lastMonthHrsLst, "lastmonth", weekType, firstDayWeekNum, dt);

            var resultMonthsToSubmit = await GetMonthsToSubmit();

            return _dashboardViewModel;
        }

        private async Task<Boolean> PopulateMonthHours(IEnumerable<WorkHours> MonthlyHoursList, String month, String weekType, int firstDayWeekNum, DateTime dt)
        {

            WorkHours MonthHrs = new WorkHours();
            CultureInfo ci = CultureInfo.InvariantCulture;
            ConcurrentDictionary<string, string> DictHrs = new ConcurrentDictionary<string, string>();
            ConcurrentDictionary<string, string> DictWeekHrsMins = new ConcurrentDictionary<string, string>();
            int dictValue;
            string dictValOut;
            try
            {
                MonthHrs = MonthlyHoursList.FirstOrDefault();
                DictHrs = HoursComputeHelper.ComputeHoursAndMins(MonthlyHoursList);
                switch (month)
                {
                    case "lastmonth":
                        if (DictHrs.TryGetValue("TotHrs", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.LastMonth.TotalHours = dictValue;
                        }

                        if (DictHrs.TryGetValue("TotMins", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.LastMonth.TotalMins = dictValue;
                        }

                        Boolean enableSubmitCheck1 = false;
                        Boolean enableSubmitCheck2 = false;
                        DateTime SubmittedDate = DateTime.MinValue;

                        //Check 2 conditions to enable the submit button

                        //Check for existance of one record in last month's workHours to have an ItemState as NotSubmitted

                        // Calculate total hrs and mins for last week
                        Dictionary<string, DateTime> LweekStEndDt;

                        //logic to compute last week start and end date 

                        var lwDt = DateTime.Now.AddDays(-7);
                        LweekStEndDt = WeekDayHelper.GetWeekStEndDate(lwDt, "current", firstDayWeekNum);

                        //var lastWeekHrsLst = await GetHours(LweekStEndDt["weekStDate"].Date, LweekStEndDt["weekEndDate"].Date, user, httpContext, cachedDate, cacheStart, cacheEnd);
                        List<WorkHours> lastWeekHrsLst = new List<WorkHours>();
                        //foreach (var item in _workHoursList)
                        //{

                        var resultLastWeek = _workHoursList.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= LweekStEndDt["weekStDate"].Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= LweekStEndDt["weekEndDate"].Date);
                        if (resultLastWeek != null && resultLastWeek.Any())
                        {

                            lastWeekHrsLst.AddRange(resultLastWeek);

                        }
                        else
                        {
                            //var workHours = await _workHoursRepository.GetItemsAsync(LweekStEndDt["weekStDate"].Date);
                            //_workHoursList = _workHoursList.Concat(workHours);
                            _workHoursList = _workHoursList.Concat(await _thirdMonthHrsLst);
                            _workHoursList = _workHoursList.Concat(await _fourthMonthHrsLst);
                        }
                        //}

                        ConcurrentDictionary<string, string> DictHrsMins = new ConcurrentDictionary<string, string>();
                        DictHrsMins = HoursComputeHelper.ComputeHoursAndMins(lastWeekHrsLst);

                        //setting LastWeek related properties in the dashboard viewmodel
                        if (DictHrsMins.TryGetValue("TotHrs", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.LastWeek.TotalHours = dictValue;
                        }

                        if (DictHrsMins.TryGetValue("TotMins", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.LastWeek.TotalMins = dictValue;
                        }

                        enableSubmitCheck1 = MonthlyHoursList.ToList().Exists(x => x.Fields.ItemState.Equals(ItemState.NotSubmitted));

                        //Check for existance of one record in last month's workHours to have an ItemState as RequiresRevision
                        enableSubmitCheck2 = MonthlyHoursList.ToList().Exists(x => x.Fields.ItemState.Equals(ItemState.RequiresRevision));

                        //if Both enable condition are false, it implies the previous month/s data is submitted
                        if (enableSubmitCheck1 == false && enableSubmitCheck2 == false)
                        {
                            if (MonthlyHoursList != null && MonthlyHoursList.Any())
                            {
                                //Set the submitted date as the max Submitted date from the last month's workhours
                                SubmittedDate = MonthlyHoursList.OrderByDescending(p => p.Fields.Date).First().Fields.SubmittedDate;
                            }
                        }
                        _dashboardViewModel.SubmittedOn = SubmittedDate;


                        break;
                    case "thismonth":

                        if (DictHrs.TryGetValue("TotHrs", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisMonth.TotalHours = dictValue;
                        }

                        if (DictHrs.TryGetValue("TotMins", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisMonth.TotalMins = dictValue;
                        }

                        // Get current week's workHours data
                        var startDate = _dashboardViewModel.WeekStartDay.Date;
                        var endDate = _dashboardViewModel.WeekEndDay.Date;
                        //

                        //IEnumerable<WorkHours> thisWeekHrsList = new List<WorkHours>();
                        List<WorkHours> thisWeekHrsList = new List<WorkHours>();

                        //foreach (var item in _workHoursList)
                        //	{

                        var resultThisWeek = _workHoursList.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= startDate && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= endDate);
                        if (resultThisWeek != null && resultThisWeek.Any())
                        {
                            //thisWeekHrsList.AddRange((from kvp in result select kvp.Value).ToList());
                            thisWeekHrsList.AddRange(resultThisWeek);

                        }
                        else
                        {
                            //var workHours = await _workHoursRepository.GetItemsAsync(startDate);
                            //_workHoursList = _workHoursList.Concat(workHours);
                            _workHoursList = _workHoursList.Concat(await _thirdMonthHrsLst);
                            _workHoursList = _workHoursList.Concat(await _fourthMonthHrsLst);
                        }
                        //}

                        // Calculate Hrs/Mins of days of the current week to populate bar graph data sets
                        WeekDayHelper.GetCurrentWeekData(startDate, endDate, thisWeekHrsList, _dashboardViewModel);

                        //userWorkHours = todayHrs;


                        //Set property values relevant to current week
                        DictWeekHrsMins = HoursComputeHelper.ComputeHoursAndMins(thisWeekHrsList);

                        if (DictWeekHrsMins.TryGetValue("EmailMins", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisWeek.EmailMinutes = dictValue;
                        }

                        if (DictWeekHrsMins.TryGetValue("EmailHrs", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisWeek.EmailHours = dictValue;
                        }


                        if (DictWeekHrsMins.TryGetValue("MeetingMins", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisWeek.MeetingMinutes = dictValue;
                        }

                        if (DictWeekHrsMins.TryGetValue("MeetingHrs", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisWeek.MeetingHours = dictValue;
                        }


                        if (DictWeekHrsMins.TryGetValue("OtherHrs", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisWeek.OthWorkHours = dictValue;
                        }

                        if (DictWeekHrsMins.TryGetValue("OtherMins", out dictValOut))
                        {
                            dictValue = int.Parse(dictValOut);
                            _dashboardViewModel.ThisWeek.OthWorkMinutes = dictValue;
                        }

                        //var id = user.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                        WorkHours userWorkHours = new WorkHours();

                        var dateAndTime = DateTime.Now;
                        var todayStartDate = dateAndTime.Date;

                        // Get Today's hours

                        //var todayHrslst  = thisWeekHrsList.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= startDate && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= endDate);
                        var todayHrslst = _workHoursList.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= DateTime.Now.Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= DateTime.Now.Date);
                        WorkHours todayHrs = todayHrslst.FirstOrDefault();
                        if (todayHrs == null)
                        {
                            todayHrs = new WorkHours();
                        }

                        // Calculate total hrs and mins for today
                        var TotalMins = 0;
                        var TotalHours = 0;
                        //int dictValue;

                        TotalMins = todayHrs.Fields.GetFinalEmailMinutes() +
                                        todayHrs.Fields.GetFinalMeetingMinutes() +
                                        todayHrs.Fields.GetFinalOtherMinutes();

                        TotalHours = todayHrs.Fields.GetFinalEmailHours() +
                                        todayHrs.Fields.GetFinalMeetingHours() +
                                        todayHrs.Fields.GetFinalOtherHours();

                        _dashboardViewModel.TodayMinutes = TotalMins % 60;
                        _dashboardViewModel.TodayHours = TotalHours + TotalMins / 60;

                        _dashboardViewModel.TodayEmailMins = todayHrs.Fields.GetFinalEmailMinutes() % 60;
                        _dashboardViewModel.TodayEmailHours = todayHrs.Fields.GetFinalEmailHours() + todayHrs.Fields.GetFinalEmailMinutes() / 60;

                        _dashboardViewModel.TodayMeetingMins = todayHrs.Fields.GetFinalMeetingMinutes() % 60;
                        _dashboardViewModel.TodayMeetingHours = todayHrs.Fields.GetFinalMeetingHours() + todayHrs.Fields.GetFinalMeetingMinutes() / 60;

                        _dashboardViewModel.TodayOtherMins = todayHrs.Fields.GetFinalOtherMinutes() % 60;
                        _dashboardViewModel.TodayOtherHours = todayHrs.Fields.GetFinalOtherHours() + todayHrs.Fields.GetFinalOtherMinutes() / 60;


                        _dashboardViewModel.OTcomputation(Convert.ToInt16(_timeTrackerOptions.DayHours), Convert.ToInt16(_timeTrackerOptions.WeekHours), Convert.ToInt16(_timeTrackerOptions.MonthHours));
                        break;
                }
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        //Used to get hours for the month
        private async Task GetMonthWorkHours(DateTime start, DateTime end, List<WorkHours> workhours)
        {
            CultureInfo provider = CultureInfo.InvariantCulture;
            // use batching
            try
            {
                var hours = await _workHoursRepository.GetItemsAsync(start);
                if (hours != null && hours.Any())
                {
                    foreach (var h in hours)
                    {
                        var workDate = DateTime.ParseExact(h.Fields.Date, "yyyyMMdd", provider);

                        h.Fields.Date = workDate.ToString("yyyyMMdd");

                        if (workDate.Date >= start.Date && workDate.Date <= end.Date)
                        {
                            workhours.Add(h);
                        }
                    }
                }
            }
            catch (ServiceException e)
            {
                if (e.Error.Code == "Request_ResourceNotFound" || e.Error.Code == "ResourceNotFound" || e.Error.Code == "ErrorItemNotFound"
                    || e.Error.Code == "itemNotFound")
                {

                }
                else
                {
                    throw;
                }
            }
        }
        //Used by Edit Hours functionality in Dashboard to save edited hours
        public async Task<bool> SaveItemAsync(WorkHours workHours)
        {
            try
            {
                await _workHoursRepository.SaveItemAsync(workHours);
            }
            catch (Exception)
            {

                return false;
            }

            return true;

        }

        //Used by Edit Hours functionality in Dashboard to get data for a day based on date selected in the Calendar
      

        public async Task<List<WorkHours>> GetEditWorkHoursForDate(DateTime dt)
        {

            DashBoardViewModel dashboardViewModel = new DashBoardViewModel();
            List<WorkHours> EditWorkHours = new List<WorkHours>();
            var workhoursList = await GetHoursInternal(dt, dt);
            CultureInfo ci = CultureInfo.InvariantCulture;
            //var workhoursList = await _workHoursRepository.GetItemsAsync(dt);
            var workhours = workhoursList.Where(x => DateTime.ParseExact(x.Fields.Date, "yyyyMMdd", ci) == dt).FirstOrDefault();

            EditWorkHours.Add(workhours);

            return EditWorkHours;
        }

        //Used to get hours for given dates
        private async Task<IEnumerable<WorkHours>> GetHoursInternal(DateTime start, DateTime end)
        {
            if (start > end)
            {
                throw new ArgumentException("start");
            }

            CultureInfo provider = CultureInfo.InvariantCulture;
            List<WorkHours> totalHours = new List<WorkHours>();
            start = start.AddDays(-1);
            while (start < end)
            {
                start = start.AddDays(1);
                WorkHours hours = new WorkHours();
                try
                {
                    CultureInfo ci = CultureInfo.InvariantCulture;
                    var hoursList = await _workHoursRepository.GetItemsAsync(start);
                    hours = hoursList.Where(x => DateTime.ParseExact(x.Fields.Date, "yyyyMMdd", ci) == start).FirstOrDefault();
                }
                catch (ServiceException e)
                {
                    switch (e.Error.Code)
                    {
                        case "Request_ResourceNotFound":
                        case "ResourceNotFound":
                        case "ErrorItemNotFound":
                        case "itemNotFound":
                            continue;
                        case "ErrorInvalidUser":
                            throw;
                        case "AuthenticationFailure":
                            throw;
                        case "TokenNotFound":
                            throw;
                        default:
                            throw;
                    }
                }

                if (hours != null)
                {
                    if (!string.IsNullOrEmpty(hours.Fields.Date))
                        totalHours.Add(hours);
                }
            }

            return totalHours;
        }


        #region GetUserNotifications
        // Get User Notifications
        public async Task<NotificationViewModel> GetUserNotifications(bool isHr = false)
        {
            NotificationViewModel userNotificationsViewModel = new NotificationViewModel();
            try
            {
                var userNotifications = await _notificationsRepository.GetItemsAsync();
                userNotificationsViewModel.MyUserNotifications = new List<UserNotifications>();
                if (userNotifications != null && userNotifications.Count() > 0)
                {

                    foreach (var item in userNotifications)
                    {
                        userNotificationsViewModel.MyUserNotifications.Add(new UserNotifications
                        {
                            Notifications = item
                        });
                    }

                }

                return userNotificationsViewModel;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        #endregion GetUserNotifications

        #region MarkNotificationAsRead
        public async Task<bool> NotificationMarkAsRead(Notifications modelData)
        {
            bool isUpdated;
            try
            {
                await _notificationsRepository.SaveItemAsync(modelData);
                isUpdated = true;
            }
            catch
            {
                isUpdated = false;
            }

            return isUpdated;
        }
        #endregion MarkNotificationAsRead

        #region GetTeamWeeklyHours
        public async Task<IEnumerable<WorkHours>> GetTeamWeeklyHours(DateTime date)
        {
            try
            {
                var monthlyHours = await _workHoursRepository.GetItemsAsync(date);
                return monthlyHours;
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion GetTeamWeeklyHours

        #region GetTeamMonthlyHours
        public async Task<IEnumerable<WorkHours>> GetTeamMonthlyHours(DateTime date)
        {
            try
            {
                var monthlyHours = await _workHoursRepository.GetItemsAsync(date);
                return monthlyHours;
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion GetTeamMonthlyHours

        #region GetMyTeamHours
        public async Task<MyTeamHoursViewModel> GetMyTeamHours(DateTime date, string empNameFilter, int pageId, int pagesize)
        {
            try
            {
                MyTeamHoursViewModel myTeamHours = new MyTeamHoursViewModel();
                var teamHoursNew = await _teamHoursRepository.GetItemsAsync(date, pagesize);
                IList<TeamHours> teamHoursList = teamHoursNew.DataList;

                bool isSubmitted = false;
                bool submitToHR = false;
                string SubmittedDate = string.Empty;
                if (teamHoursNew != null)
                {
                    List<MyTeamFields> myTeam = new List<MyTeamFields>();
                    foreach (var team in teamHoursList)
                    {
                        if (team.Fields.TeamHoursItemState == ItemState.Submitted)
                        {
                            isSubmitted = true;
                            SubmittedDate = team.Fields.TeamHoursSubmittedDate.ToString();
                        }
                        if ((team.Fields.ItemState == ItemState.Submitted) && (team.Fields.TeamHoursItemState == ItemState.NotSubmitted))

                        {
                            submitToHR = true;
                        }

                        myTeam.Add(new MyTeamFields
                        {
                            TeamHours = team
                        });
                    }

                    myTeamHours.IsSubmitted = isSubmitted;
                    myTeamHours.SubmitToHR = submitToHR;
                    myTeamHours.SubmittedDate = SubmittedDate;
                    myTeamHours.MyTeam = myTeam;
                }
                return myTeamHours;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        #endregion GetMyTeamHours

        public async Task<ListCollectionPage<TeamHours>> GetMyTeamHoursPageView(DateTime date, string empNameFilter, int pageId, int pagesize, ListCollectionPage<TeamHours> myCurrentTeamHourList, int status = 0)
        {
            try
            {
                var teamHoursNew = new ListCollectionPage<TeamHours>();
                if (status == 0)
                    teamHoursNew = await _teamHoursRepository.GetItemsAsync(date, pagesize);
                else if (status == 1)
                    teamHoursNew = await _teamHoursRepository.GetNextItemsAsync(myCurrentTeamHourList);
                else if (status == 2)
                    teamHoursNew = await _teamHoursRepository.GetPreviousItemsAsync(myCurrentTeamHourList);

                //IList<TeamHours> teamHoursList = teamHoursNew.DataList;
                return teamHoursNew;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #region SaveMyTeamAdjustedHours
        public async Task<bool> MyTeamSaveAdjustedHrs(string objectIdentifier, string newAdjustedHrs, string newAdjustedMins)
        {
            try
            {
                // TODO: Integration with MiddleTier
            }
            catch (Exception)
            {

                return true; // TODO: Integration with MiddleTier
            }

            return true;
        }
        #endregion SaveMyTeamAdjustedHours
        public int[] GetDayOfMonthWeekAssignmentArray(DateTime dt)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;
            List<int> dateWeekNumber = new List<int>();
            DateTime currDT = new DateTime(dt.Year, dt.Month, 1);
            int weekNumber = 0;
            var monthlyHrsList = new List<MonthlyHours>();
            while (currDT.Month == dt.Month)
            {
                if (currDT.DayOfWeek == ci.DateTimeFormat.FirstDayOfWeek ||
                    dateWeekNumber.Count == 0)
                {
                    weekNumber++;

                }

                dateWeekNumber.Add(weekNumber);
                currDT = currDT.AddDays(1);
            }

            return dateWeekNumber.ToArray();
        }

    }
}
