// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Repositories;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Services;
using GoLocal.TimeTracker.Dashboard.Abstractions;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.Services;
using GoLocal.TimeTracker.Dashboard.Services.Helpers;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.Security.Claims;


namespace GoLocal.TimeTracker.Dashboard.Services
{
    public class WeeklyReportHoursService : IWeeklyReportHoursService<WeeklyHoursViewModel>
    {
        private readonly ILogger _logger;
        private readonly IRepository<MiddleTier.Models.UserProfile> _userProfileRepository;
        private readonly IRepository<ReportHours> _reportHoursRepository;
        private readonly IRepository<MiddleTier.Models.Notifications> _notificationsRepository;
        private ListCollectionPage<ReportHours> _listCollectionPage;

        /// <summary>
		/// Constructor
		/// </summary>
		/// <param name="logger">The logging provider to use</param>
		/// <param name="timeTrackerOptions">The app settings provider</param>
		public WeeklyReportHoursService(
            ILogger<TimeTrackerDataService> logger,
            IRepository<MiddleTier.Models.UserProfile> userProfileRepository,
            IRepository<ReportHours> reportHoursRepository,
            IRepository<MiddleTier.Models.Notifications> notificationRepository
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _reportHoursRepository = reportHoursRepository ?? throw new ArgumentNullException(nameof(reportHoursRepository)); // For HR
            _notificationsRepository = notificationRepository ?? throw new ArgumentNullException(nameof(notificationRepository));
        }

        public async Task<WeeklyHoursViewModel> GetViewModel(DateTime dt, int pageIndex = 1, int pageSize = 10)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;

            try
            {
                if (_listCollectionPage == null) _listCollectionPage = await _reportHoursRepository.GetItemsAsync(dt, pageSize);

                // Check to see if a new date is being requested
                if (_listCollectionPage.QueryDate != dt.ToString("yyyyMM")) _listCollectionPage = await _reportHoursRepository.GetItemsAsync(dt, pageSize);

                if ((pageIndex - _listCollectionPage.CurrentPageIndex) == 1)
                {
                    // Move next
                    _listCollectionPage = await _reportHoursRepository.GetNextItemsAsync(_listCollectionPage);
                }
                else if ((_listCollectionPage.CurrentPageIndex - pageIndex) == 1)
                {
                    // Move previous
                    _listCollectionPage = await _reportHoursRepository.GetPreviousItemsAsync(_listCollectionPage);
                }
                else if (pageIndex > 2)  // Increment until we find the correct page.
                {
                    while (_listCollectionPage.CurrentPageIndex < pageIndex)
                    {
                        _listCollectionPage = await _reportHoursRepository.GetNextItemsAsync(_listCollectionPage);
                    }
                }

                // Create the DataTable
                MyWeeklyHoursDataTableData dataTableData = new MyWeeklyHoursDataTableData(); // This is the WeeklyHoursListData.

                List<WeeklyHoursListData> weeklyHrsListData = new List<WeeklyHoursListData>();

                // Get an array tagging each item of the month with the Week number
                int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);
                var myWeekNumber = dateWeekNumber[dt.Day - 1];

                var weeklyHrsList = new List<WeeklyHours>();

				//var items = await this._reportHoursRepository.GetItemsAsync(dt);

				// Group Report hours by individual User data using DisplayName
				var monthDate = from item in _listCollectionPage.DataList
								group item by item.Fields.DisplayName into data
								
								select data;
				
				DateTime weekStartDate = dt;
				DateTime weekEndDate = weekStartDate;
				while (weekEndDate.DayOfWeek != DayOfWeek.Saturday)
				{
					weekEndDate = weekEndDate.AddDays(1);
				}
				
				//var groupings = monthDate.ToList().Where(k => DateTime.ParseExact(k.Contains, "yyyyMMdd", ci).Date >= LweekStEndDt["weekStDate"].Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= LweekStEndDt["weekEndDate"].Date);
				

				// Process the data for each user 
				foreach (var grouping in monthDate)
                {
                    var thisGrouping = new WeeklyHoursListData();

					int SundayMins = 0;
					int SundayHours = 0;
					int MondayMins = 0;
					int MondayHours = 0;
					int TuesdayMins = 0;
					int TuesdayHours = 0;
					int WednesdayMins = 0;
					int WednesdayHours = 0;
					int ThursdayMins = 0;
					int ThursdayHours = 0;
					int FridayMins = 0;
					int FridayHours = 0;
					int SaturdayMins = 0;
					int SaturdayHours = 0;


					var weekTotalMns = 0;
					var TotalMins = 0;

					var weekTotalHrs = 0;
					var TotalHours = 0;


					var weeklyHrs = new WeeklyHours();
				

					var thisWeekData = grouping.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= weekStartDate.Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date<= weekEndDate.Date);
					//var resultLastWeek = grouping.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= weekStartDate.Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= LweekStEndDt["weekEndDate"].Date);
					//Add the computed object(for each employee) to the list of weekly hours for the HR
					weeklyHrsList.Add(weeklyHrs);
					weeklyHrs.EmpName = grouping.Key;
					//foreach (var item in grouping)
			
					foreach (var item in thisWeekData)

					{
						thisGrouping.ENm = item.Fields.DisplayName.ToString();
                        thisGrouping.MNm = item.Fields.ManagerDisplayName.ToString();
                        Dictionary<string, short> hrsMins = new Dictionary<string, short>();

                        //call to get Final hours for ReportHours Repository data
                        hrsMins = HoursComputeHelper.GetFinalHrsMins(item);
                        var totalHours = hrsMins["FinalTotalHrs"];
                        var totalMins = hrsMins["FinalTotalMins"];
                        if (weeklyHrs.MgrName == null)
                        {
                            weeklyHrs.MgrName = item.Fields.ManagerDisplayName;
                        }
                        var itemDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", ci);

                        //var theWeekNumber = dateWeekNumber[itemDate.Day - 1];
                        //if (dateWeekNumber[itemDate.Day - 1] == myWeekNumber)
                        //{

                            switch (itemDate.DayOfWeek)
                            {
                                case System.DayOfWeek.Sunday:
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
                       

                         SundayMins = (short)(weeklyHrs.SundayMins % 60);
                         SundayHours = (short)(weeklyHrs.SundayHours + (weeklyHrs.SundayMins / 60));
                         MondayMins = (short)(weeklyHrs.MondayMins % 60);
                         MondayHours = (short)(weeklyHrs.MondayHours + (weeklyHrs.MondayMins / 60));
                         TuesdayMins = (short)(weeklyHrs.TuesdayMins % 60);
                         TuesdayHours = (short)(weeklyHrs.TuesdayHours + (weeklyHrs.TuesdayMins / 60));
                         WednesdayMins = (short)(weeklyHrs.WednesdayMins % 60);
                         WednesdayHours = (short)(weeklyHrs.WednesdayHours + (weeklyHrs.WednesdayMins / 60));
                         ThursdayMins = (short)(weeklyHrs.ThursdayMins % 60);
                         ThursdayHours = (short)(weeklyHrs.ThursdayHours + (weeklyHrs.ThursdayMins / 60));
                         FridayMins = (short)(weeklyHrs.FridayMins % 60);
                         FridayHours = (short)(weeklyHrs.FridayHours + (weeklyHrs.FridayMins / 60));
                         SaturdayMins = (short)(weeklyHrs.SaturdayMins % 60);
                         SaturdayHours = (short)(weeklyHrs.SaturdayHours + (weeklyHrs.SaturdayMins / 60));


                         weekTotalMns = (SundayMins + MondayMins + TuesdayMins + WednesdayMins + ThursdayMins + FridayMins + SaturdayMins) % 60;
                         TotalMins = (short) weekTotalMns;

                         weekTotalHrs = (SundayHours + MondayHours + TuesdayHours + WednesdayHours + ThursdayHours + FridayHours + SaturdayHours) + (weekTotalMns / 60);
                         TotalHours = (short)weekTotalHrs;

						// This is what the view needs.
						



					} // end for each grouping.

					var weeklySundayHrMns = SundayHours + "h " + SundayMins + "m";
					var weeklyMondayHrMns = MondayHours + "h " + MondayMins + "m";
					var weeklyTuesdayHrMns = TuesdayHours + "h " + TuesdayMins + "m";
					var weeklyWednesdayHrMns = WednesdayHours + "h " + WednesdayMins + "m";
					var weeklyThursdayHrMns = ThursdayHours + "h " + ThursdayMins + "m";
					var weeklyFridayHrMns = FridayHours + "h " + FridayMins + "m";
					var weeklySaturdayHrMns = SaturdayHours + "h " + SaturdayMins + "m";
					var weeklylyTotalHrMns = TotalHours + "h " + TotalMins + "m";
					thisGrouping.suHM = weeklySundayHrMns.ToString();
					thisGrouping.MonHM = weeklyMondayHrMns.ToString();
					thisGrouping.TuHM = weeklyTuesdayHrMns.ToString();
					thisGrouping.weHM = weeklyWednesdayHrMns.ToString();
					thisGrouping.ThHM = weeklyThursdayHrMns.ToString();
					thisGrouping.frHM = weeklyFridayHrMns.ToString();
					thisGrouping.SaHM = weeklySaturdayHrMns.ToString();
					thisGrouping.TotHM = weeklylyTotalHrMns.ToString();

					 
					//Add the computed object(for each employee) to the list of monthly hours for the HR
					weeklyHrsListData.Add(thisGrouping);

					 SundayMins = 0;
					 SundayHours = 0;
					 MondayMins = 0;
					 MondayHours = 0;
					 TuesdayMins = 0;
					 TuesdayHours = 0;
					 WednesdayMins = 0;
					 WednesdayHours = 0;
					 ThursdayMins = 0;
					 ThursdayHours = 0;
					 FridayMins = 0;
					 FridayHours = 0;
					 SaturdayMins = 0;
					 SaturdayHours = 0;


					 weekTotalMns = 0;
					 TotalMins = 0;

					weekTotalHrs = 0;
					 TotalHours = 0;
				}
                //dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * pageSize) + weeklyHrsListData.Count + 1;
                int recordsFiltered = (pageIndex * pageSize) + weeklyHrsListData.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;
                dataTableData.data = weeklyHrsListData;

                var weeklyHoursViewModel = new WeeklyHoursViewModel
                {
                    MyWeeklyHoursDataTableData = dataTableData,                
                    PaginationInfo = new PaginationInfoViewModel
                    {
                        CurrentPage = pageIndex,
                        PageSize = pageSize,
                        Next = "is-disabled",
                        Previous = "is-disabled"
                    }
                };

                return weeklyHoursViewModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting the weekly hours view model: " + ex.Message);
                return new WeeklyHoursViewModel();
            }
        }

        public async Task<WeeklyHoursViewModel> GetWeeklyReportHours(DateTime dt, int pageIndex, int pageSize = 10)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;

            // Get an array tagging each item of the month with the Week number
            int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);
            var myWeekNumber = dateWeekNumber[dt.Day - 1];
            var weeklyHrsList = new List<WeeklyHours>();

			//var items = await this._reportHoursRepository.GetItemsAsync(dt);

			// Group Report hours by individual User data using DisplayName
			var groupings = from item in _listCollectionPage.DataList
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
                    Dictionary<string, short> hrsMins = new Dictionary<string, short>();

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
                            case System.DayOfWeek.Sunday:
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

        public async Task<WeeklyHoursViewModel> GetSearchResults(DateTime dt, string searchQuery, int pageIndex = 1, int pageSize = 10)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;

            try
            {
                if (_listCollectionPage == null) _listCollectionPage = await _reportHoursRepository.GetSearchResultsAsync(dt, searchQuery, pageSize);

                // Check to see if a new date is being requested
                if (_listCollectionPage.QueryDate != dt.ToString("yyyyMM")) _listCollectionPage = await _reportHoursRepository.GetSearchResultsAsync(dt, searchQuery, pageSize);

                if ((pageIndex - _listCollectionPage.CurrentPageIndex) == 1)
                {
                    // Move next
                    _listCollectionPage = await _reportHoursRepository.GetNextItemsAsync(_listCollectionPage);
                }
                else if ((_listCollectionPage.CurrentPageIndex - pageIndex) == 1)
                {
                    // Move previous
                    _listCollectionPage = await _reportHoursRepository.GetPreviousItemsAsync(_listCollectionPage);
                }
                else if (pageIndex > 2)  // Increment until we find the correct page.
                {
                    while (_listCollectionPage.CurrentPageIndex < pageIndex)
                    {
                        _listCollectionPage = await _reportHoursRepository.GetNextItemsAsync(_listCollectionPage);
                    }
                }

                // Create the DataTable
                MyWeeklyHoursDataTableData dataTableData = new MyWeeklyHoursDataTableData(); // This is the WeeklyHoursListData.

                List<WeeklyHoursListData> weeklyHrsListData = new List<WeeklyHoursListData>();

                // Get an array tagging each item of the month with the Week number
                int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);
                var myWeekNumber = dateWeekNumber[dt.Day - 1];

                var weeklyHrsList = new List<WeeklyHours>();

                //var items = await this._reportHoursRepository.GetItemsAsync(dt);

                // Group Report hours by individual User data using DisplayName
                var monthDate = from item in _listCollectionPage.DataList
                                group item by item.Fields.DisplayName into data

                                select data;

                DateTime weekStartDate = dt;
                DateTime weekEndDate = weekStartDate;
                while (weekEndDate.DayOfWeek != DayOfWeek.Saturday)
                {
                    weekEndDate = weekEndDate.AddDays(1);
                }

                //var groupings = monthDate.ToList().Where(k => DateTime.ParseExact(k.Contains, "yyyyMMdd", ci).Date >= LweekStEndDt["weekStDate"].Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= LweekStEndDt["weekEndDate"].Date);


                // Process the data for each user 
                foreach (var grouping in monthDate)
                {
                    var thisGrouping = new WeeklyHoursListData();

                    // Save names here in case there are no hours to process.
                    thisGrouping.ENm = grouping.Key;
                    thisGrouping.MNm = grouping.FirstOrDefault().Fields.ManagerDisplayName;

                    int SundayMins = 0;
                    int SundayHours = 0;
                    int MondayMins = 0;
                    int MondayHours = 0;
                    int TuesdayMins = 0;
                    int TuesdayHours = 0;
                    int WednesdayMins = 0;
                    int WednesdayHours = 0;
                    int ThursdayMins = 0;
                    int ThursdayHours = 0;
                    int FridayMins = 0;
                    int FridayHours = 0;
                    int SaturdayMins = 0;
                    int SaturdayHours = 0;


                    var weekTotalMns = 0;
                    var TotalMins = 0;

                    var weekTotalHrs = 0;
                    var TotalHours = 0;


                    var weeklyHrs = new WeeklyHours();


                    var thisWeekData = grouping.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= weekStartDate.Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= weekEndDate.Date);
                    //var resultLastWeek = grouping.Where(k => DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date >= weekStartDate.Date && DateTime.ParseExact(k.Fields.Date, "yyyyMMdd", ci).Date <= LweekStEndDt["weekEndDate"].Date);
                    //Add the computed object(for each employee) to the list of weekly hours for the HR
                    weeklyHrsList.Add(weeklyHrs);
                    weeklyHrs.EmpName = grouping.Key;

                    //foreach (var item in grouping)

                    foreach (var item in thisWeekData)

                    {
                        thisGrouping.ENm = item.Fields.DisplayName.ToString();
                        thisGrouping.MNm = item.Fields.ManagerDisplayName.ToString();
                        Dictionary<string, short> hrsMins = new Dictionary<string, short>();

                        //call to get Final hours for ReportHours Repository data
                        hrsMins = HoursComputeHelper.GetFinalHrsMins(item);
                        var totalHours = hrsMins["FinalTotalHrs"];
                        var totalMins = hrsMins["FinalTotalMins"];
                        if (weeklyHrs.MgrName == null)
                        {
                            weeklyHrs.MgrName = item.Fields.ManagerDisplayName;
                        }
                        var itemDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", ci);

                        //var theWeekNumber = dateWeekNumber[itemDate.Day - 1];
                        //if (dateWeekNumber[itemDate.Day - 1] == myWeekNumber)
                        //{

                        switch (itemDate.DayOfWeek)
                        {
                            case System.DayOfWeek.Sunday:
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
                        
                        SundayMins = (short)(weeklyHrs.SundayMins % 60);
                        SundayHours = (short)(weeklyHrs.SundayHours + (weeklyHrs.SundayMins / 60));
                        MondayMins = (short)(weeklyHrs.MondayMins % 60);
                        MondayHours = (short)(weeklyHrs.MondayHours + (weeklyHrs.MondayMins / 60));
                        TuesdayMins = (short)(weeklyHrs.TuesdayMins % 60);
                        TuesdayHours = (short)(weeklyHrs.TuesdayHours + (weeklyHrs.TuesdayMins / 60));
                        WednesdayMins = (short)(weeklyHrs.WednesdayMins % 60);
                        WednesdayHours = (short)(weeklyHrs.WednesdayHours + (weeklyHrs.WednesdayMins / 60));
                        ThursdayMins = (short)(weeklyHrs.ThursdayMins % 60);
                        ThursdayHours = (short)(weeklyHrs.ThursdayHours + (weeklyHrs.ThursdayMins / 60));
                        FridayMins = (short)(weeklyHrs.FridayMins % 60);
                        FridayHours = (short)(weeklyHrs.FridayHours + (weeklyHrs.FridayMins / 60));
                        SaturdayMins = (short)(weeklyHrs.SaturdayMins % 60);
                        SaturdayHours = (short)(weeklyHrs.SaturdayHours + (weeklyHrs.SaturdayMins / 60));


                        weekTotalMns = (SundayMins + MondayMins + TuesdayMins + WednesdayMins + ThursdayMins + FridayMins + SaturdayMins) % 60;
                        TotalMins = (short)weekTotalMns;

                        weekTotalHrs = (SundayHours + MondayHours + TuesdayHours + WednesdayHours + ThursdayHours + FridayHours + SaturdayHours) + (weekTotalMns / 60);
                        TotalHours = (short)weekTotalHrs;

                        // This is what the view needs.




                    } // end for each grouping.

                    var weeklySundayHrMns = SundayHours + "h " + SundayMins + "m";
                    var weeklyMondayHrMns = MondayHours + "h " + MondayMins + "m";
                    var weeklyTuesdayHrMns = TuesdayHours + "h " + TuesdayMins + "m";
                    var weeklyWednesdayHrMns = WednesdayHours + "h " + WednesdayMins + "m";
                    var weeklyThursdayHrMns = ThursdayHours + "h " + ThursdayMins + "m";
                    var weeklyFridayHrMns = FridayHours + "h " + FridayMins + "m";
                    var weeklySaturdayHrMns = SaturdayHours + "h " + SaturdayMins + "m";
                    var weeklylyTotalHrMns = TotalHours + "h " + TotalMins + "m";
                    thisGrouping.suHM = weeklySundayHrMns.ToString();
                    thisGrouping.MonHM = weeklyMondayHrMns.ToString();
                    thisGrouping.TuHM = weeklyTuesdayHrMns.ToString();
                    thisGrouping.weHM = weeklyWednesdayHrMns.ToString();
                    thisGrouping.ThHM = weeklyTuesdayHrMns.ToString();
                    thisGrouping.frHM = weeklyFridayHrMns.ToString();
                    thisGrouping.SaHM = weeklySaturdayHrMns.ToString();
                    thisGrouping.TotHM = weeklylyTotalHrMns.ToString();


                    //Add the computed object(for each employee) to the list of monthly hours for the HR
                    weeklyHrsListData.Add(thisGrouping);

                    SundayMins = 0;
                    SundayHours = 0;
                    MondayMins = 0;
                    MondayHours = 0;
                    TuesdayMins = 0;
                    TuesdayHours = 0;
                    WednesdayMins = 0;
                    WednesdayHours = 0;
                    ThursdayMins = 0;
                    ThursdayHours = 0;
                    FridayMins = 0;
                    FridayHours = 0;
                    SaturdayMins = 0;
                    SaturdayHours = 0;


                    weekTotalMns = 0;
                    TotalMins = 0;

                    weekTotalHrs = 0;
                    TotalHours = 0;
                }
                //dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * pageSize) + weeklyHrsListData.Count + 1;
                int recordsFiltered = (pageIndex * pageSize) + weeklyHrsListData.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;
                dataTableData.data = weeklyHrsListData;

                var weeklyHoursViewModel = new WeeklyHoursViewModel
                {
                    MyWeeklyHoursDataTableData = dataTableData,
                    PaginationInfo = new PaginationInfoViewModel
                    {
                        CurrentPage = pageIndex,
                        PageSize = pageSize,
                        Next = "is-disabled",
                        Previous = "is-disabled"
                    }
                };

                return weeklyHoursViewModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting the weekly hours view model: " + ex.Message);
                return new WeeklyHoursViewModel();
            }
        }

        public async Task<MiddleTier.Models.UserProfile> GetUserProfile(ClaimsPrincipal user, HttpContext httpContext)
        {
            var userProfile = await _userProfileRepository.GetItemAsync(); // Call to MiddleTier 
            if (userProfile != null)
            {
                return userProfile;
            }

            return userProfile;
        }

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

        public async Task WkLdReq()
        {
            try
            {

            }
            catch (Exception ex)
            {
                _logger.LogError("Error requesting a weekly hours revisionin the weekly hours service: " + ex.Message);
            }
        }

        
    }
}
