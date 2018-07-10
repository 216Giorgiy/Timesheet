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
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.Services;
using GoLocal.TimeTracker.Dashboard.Services.Helpers;
using Microsoft.AspNetCore.Http;
using System.Globalization;
using System.Security.Claims;
using GoLocal.TimeTracker.Dashboard.Resources;

namespace GoLocal.TimeTracker.Dashboard.Services
{
    /// <summary>
    /// This is a UI-specific service so belongs in UI project. It does not contain any business logic and works
    /// with UI-specific types (view models, SelectListItem types, etc.).
    /// </summary>
    public class MonthlyReportHoursService : IMonthlyReportHoursService<MyMonthlyHoursViewModel>
    {
        private readonly ILogger _logger;
        private readonly IRepository<MiddleTier.Models.UserProfile> _userProfileRepository;
        private readonly IRepository<ReportHours> _reportHoursRepository;
        private readonly IRepository<MiddleTier.Models.Notifications> _notificationsRepository;
        private ListCollectionPage<ReportHours> _listCollectionPage;
		private readonly LocService _sharedLocalizer;
		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="logger">The logging provider to use</param>
		/// <param name="timeTrackerOptions">The app settings provider</param>
		public MonthlyReportHoursService(
            ILogger<TimeTrackerDataService> logger,
            IRepository<MiddleTier.Models.UserProfile> userProfileRepository,
            IRepository<ReportHours> reportHoursRepository,
            IRepository<MiddleTier.Models.Notifications> notificationRepository,
			LocService sharedLocalizer)
		{
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _reportHoursRepository = reportHoursRepository ?? throw new ArgumentNullException(nameof(reportHoursRepository)); // For HR
            _notificationsRepository = notificationRepository ?? throw new ArgumentNullException(nameof(notificationRepository));
			_sharedLocalizer = sharedLocalizer;
		}

        public async Task<MyMonthlyHoursViewModel> GetViewModel(DateTime dt, int pageIndex = 1, int pageSize = 10)
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
                else
                {
                    // Other page
                    //_listCollectionPage = await _reportHoursRepository.GetPageItemsAsync(_listCollectionPage, pageIndex);
                }

                // Create the DataTable
                MyMonthlyHoursDataTableData dataTableData = new MyMonthlyHoursDataTableData(); // This is the MonthlyHoursListData.

                List<MonthlyHoursListData> mh = new List<MonthlyHoursListData>();

                // Get an array tagging each item of the month with the Week number
                int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);

                //var monthlyHrsList = new List<MonthlyHours>();

                // variables to compute total hours per week.
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

                // Populate MonthlyHoursList
                // Group Monthly Report hours by individual User data using DisplayName
                var groupings = from item in _listCollectionPage.DataList
                                group item by item.Fields.DisplayName into data
								
                                select data.Distinct();
				//var monthlyHours = new MonthlyHours();
				// Process the data for each user 
				
                foreach (var grouping in groupings)
                {
                    var thisGrouping = new MonthlyHoursListData();

					//logic for handling duplicate records coming for the IW
					var count = grouping.Count();
					var noOfDays = DateTime.DaysInMonth(dt.Year,dt.Month);
					int diff=0;
					if (count > noOfDays)
					{
						diff = count - noOfDays;
					}
					
					var reportHoursforIW = grouping.SkipLast(diff);

					// Compute the total for each week of the month by processing daily records
					foreach (var item in reportHoursforIW)
                    {
                        thisGrouping.EmpName = item.Fields.DisplayName.ToString();
                        thisGrouping.ManagerName = item.Fields.ManagerDisplayName.ToString();
                        
                        var itemDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", ci);

                        Dictionary<string, short> hrsMins = new Dictionary<string, short>();

                        //call to get Final hours for ReportHours Repository data
                        hrsMins = HoursComputeHelper.GetFinalHrsMins(item);
                        var totalHours = hrsMins["FinalTotalHrs"];
                        var totalMins = hrsMins["FinalTotalMins"];

                        if ((itemDate.Day - 1) < DateTime.DaysInMonth(dt.Year, dt.Month) )
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

					// Create display string.
					
                    var week1TotalHrMns = week1TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week1TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week2TotalHrMns = week2TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week2TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week3TotalHrMns = week3TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week3TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week4TotalHrMns = week4TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week4TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week5TotalHrMns = week5TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week5TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    //var monthlyTotalHrMns = monthTotalHrs + "h " + monthTotalMins + "m";

                    thisGrouping.Week1TotalHrMns = week1TotalHrMns;
                    thisGrouping.Week2TotalHrMns = week2TotalHrMns;
                    thisGrouping.Week3TotalHrMns = week3TotalHrMns;
                    thisGrouping.Week4TotalHrMns = week4TotalHrMns;
                    thisGrouping.Week5TotalHrMns = week5TotalHrMns;
                    //thisGrouping.MonthlyTotalHrMns = monthlyTotalHrMns;


                    monthTotalMins = (week1TotMins + week2TotMins + week3TotMins + week4TotMins + week5TotMins);
                    monthTotalHrs = (week1TotHrs + week2TotHrs + week3TotHrs + week4TotHrs + week5TotHrs) + (monthTotalMins / 60);
                    monthTotalMins = monthTotalMins % 60;
                    var monthlyTotalHrMns = monthTotalHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + monthTotalMins + _sharedLocalizer.GetLocalizedHtmlString("minute");

                    thisGrouping.MonthlyTotalHrMns = monthlyTotalHrMns;

                    //Add the computed object(for each employee) to the list of monthly hours for the HR
                    mh.Add(thisGrouping);

					// initializing the values to 0 for the next employee
					week1TotHrs = 0;
					week1TotMins = 0;
					week2TotHrs = 0;
					week2TotMins = 0;
					week3TotHrs = 0;
					week3TotMins = 0;
					week4TotHrs = 0;
					week4TotMins = 0;
					week5TotHrs = 0;
					week5TotMins = 0;
				} // end for each grouping.

                //dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * pageSize) + mh.Count + 1;
                int recordsFiltered = (pageIndex * pageSize) + mh.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;
                dataTableData.Data = mh;

                var monthlyHoursViewModel = new MyMonthlyHoursViewModel
                {
                    MyMonthlyHoursDataTableData = dataTableData,
                    RequestRevision = "is-disabled",
                    PaginationInfo = new PaginationInfoViewModel
                    {
                        CurrentPage = pageIndex,
                        PageSize = pageSize,
                        Next = "is-disabled",
                        Previous = "is-disabled"
                    }
                };

                return monthlyHoursViewModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting the monthly hours view model: " + ex.Message);
                return new MyMonthlyHoursViewModel();
            }
        }

        public async Task<MyMonthlyHoursViewModel> GetSearchResults(DateTime dt, string searchQuery, int pageIndex = 1, int pageSize = 10)
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
                else
                {
                    // Other page
                    //_listCollectionPage = await _reportHoursRepository.GetPageItemsAsync(_listCollectionPage, pageIndex);
                }

                // Create the DataTable
                MyMonthlyHoursDataTableData dataTableData = new MyMonthlyHoursDataTableData(); // This is the MonthlyHoursListData.

                List<MonthlyHoursListData> mh = new List<MonthlyHoursListData>();

                // Get an array tagging each item of the month with the Week number
                int[] dateWeekNumber = this.GetDayOfMonthWeekAssignmentArray(dt);

                //var monthlyHrsList = new List<MonthlyHours>();

                // variables to compute total hours per week.
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

                // Populate MonthlyHoursList
                // Group Monthly Report hours by individual User data using DisplayName
                var groupings = from item in _listCollectionPage.DataList
                                group item by item.Fields.DisplayName into data
                                select data;
                //var monthlyHours = new MonthlyHours();
                // Process the data for each user 
                foreach (var grouping in groupings)
                {
                    var thisGrouping = new MonthlyHoursListData();

					//logic for handling duplicate records coming for the IW
					var count = grouping.Count();
					var noOfDays = DateTime.DaysInMonth(dt.Year, dt.Month);
					int diff = 0;
					if (count > noOfDays)
					{
						diff = count - noOfDays;
					}
					
					var reportHoursforIW = grouping.SkipLast(diff);

					// Compute the total for each week of the month by processing daily records
					foreach (var item in reportHoursforIW)
                    {
                        thisGrouping.EmpName = item.Fields.DisplayName.ToString();
                        thisGrouping.ManagerName = item.Fields.ManagerDisplayName.ToString();

                        var itemDate = DateTime.ParseExact(item.Fields.Date, "yyyyMMdd", ci);

                        Dictionary<string, short> hrsMins = new Dictionary<string, short>();

                        //call to get Final hours for ReportHours Repository data
                        hrsMins = HoursComputeHelper.GetFinalHrsMins(item);
                        var totalHours = hrsMins["FinalTotalHrs"];
                        var totalMins = hrsMins["FinalTotalMins"];

                        if ((itemDate.Day - 1) < DateTime.DaysInMonth(dt.Year, dt.Month))
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

                    // Create display string.
                    var week1TotalHrMns = week1TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week1TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week2TotalHrMns = week2TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week2TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week3TotalHrMns = week3TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week3TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week4TotalHrMns = week4TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week4TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    var week5TotalHrMns = week5TotHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + week5TotMins + _sharedLocalizer.GetLocalizedHtmlString("minute");
                    //var monthlyTotalHrMns = monthTotalHrs + "h " + monthTotalMins + "m";

                    thisGrouping.Week1TotalHrMns = week1TotalHrMns;
                    thisGrouping.Week2TotalHrMns = week2TotalHrMns;
                    thisGrouping.Week3TotalHrMns = week3TotalHrMns;
                    thisGrouping.Week4TotalHrMns = week4TotalHrMns;
                    thisGrouping.Week5TotalHrMns = week5TotalHrMns;
                    //thisGrouping.MonthlyTotalHrMns = monthlyTotalHrMns;


                    monthTotalMins = (week1TotMins + week2TotMins + week3TotMins + week4TotMins + week5TotMins);
                    monthTotalHrs = (week1TotHrs + week2TotHrs + week3TotHrs + week4TotHrs + week5TotHrs) + (monthTotalMins / 60);
                    monthTotalMins = monthTotalMins % 60;
                    var monthlyTotalHrMns = monthTotalHrs + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + monthTotalMins + _sharedLocalizer.GetLocalizedHtmlString("minute");

                    thisGrouping.MonthlyTotalHrMns = monthlyTotalHrMns;

                    //Add the computed object(for each employee) to the list of monthly hours for the HR
                    mh.Add(thisGrouping);

					// initializing the values to 0 for the next employee
					week1TotHrs = 0;
					week1TotMins = 0;
					week2TotHrs = 0;
					week2TotMins = 0;
					week3TotHrs = 0;
					week3TotMins = 0;
					week4TotHrs = 0;
					week4TotMins = 0;
					week5TotHrs = 0;
					week5TotMins = 0;
				} // end for each grouping.

                //dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * pageSize) + mh.Count + 1;
                int recordsFiltered = (pageIndex * pageSize) + mh.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;
                dataTableData.Data = mh;

                var monthlyHoursViewModel = new MyMonthlyHoursViewModel
                {
                    MyMonthlyHoursDataTableData = dataTableData,
                    RequestRevision = "is-disabled",
                    PaginationInfo = new PaginationInfoViewModel
                    {
                        CurrentPage = pageIndex,
                        PageSize = pageSize,
                        Next = "is-disabled",
                        Previous = "is-disabled"
                    }
                };

                return monthlyHoursViewModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting the monthly hours view model: " + ex.Message);
                return new MyMonthlyHoursViewModel();
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

        public async Task MonthlyHoursLoadRequest()
        {
            try
            {

            }
            catch (Exception ex)
            {
                _logger.LogError("Error requesting a monthly hours revisionin the monthly hours service: " + ex.Message);
            }
        }
    }
}
