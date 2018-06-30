// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.Dashboard.Abstractions;
using GoLocal.TimeTracker.Dashboard.Services;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
    [Route("[controller]/[action]")]
    public class MonthlyReportHoursController : Controller
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IRepository<UserProfile> _userProfileRepository;
        //private readonly IViewModelService<MyMonthlyHoursViewModel> _reportHoursService;
        private readonly IMonthlyReportHoursService<MyMonthlyHoursViewModel> _reportHoursService;
        private readonly IDataService _dataServiceClient;
        private MiddleTier.Models.UserProfile _userProfile;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">The logging provider to use</param>
        public MonthlyReportHoursController(
            ILogger<MonthlyReportHoursController> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<UserProfile> userProfileRepository,
            IMonthlyReportHoursService<MyMonthlyHoursViewModel> reportHoursService,
        //    IMonthlyReportHoursService<MyMonthlyHoursViewModel> uxReportHoursService,
            IDataService dataServiceClient
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _reportHoursService = reportHoursService ?? throw new ArgumentNullException(nameof(reportHoursService));
            // _uxReportHoursService = uxReportHoursService ?? throw new ArgumentNullException(nameof(uxReportHoursService));
            _dataServiceClient = dataServiceClient ?? throw new ArgumentNullException(nameof(dataServiceClient));
        }

        [HttpGet]
        public void MonthlyReport()
        {
            ViewBag["test"] = "MonthlyReport";
        }

        [HttpGet]
        public async Task<IActionResult> MonthlyHoursLoadRequest(string date, string searchtext, int draw, int start = 0, int length = 10)
        {
            int pageIndex = 0;
            if (start != 0)
            {
                pageIndex = start / length + 1;
            }

            if (pageIndex == 0) pageIndex = 1;


            MyMonthlyHoursDataTableData dataTableData = new MyMonthlyHoursDataTableData();

            if (User.Identity.IsAuthenticated)
            {
                MyMonthlyHoursViewModel myMonthlyHoursViewModel = new MyMonthlyHoursViewModel();
                _userProfile = await _dataServiceClient.GetUserProfile();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                // on first call, datepicker may not pass date. 
                // If date == null, default to last month.
                DateTime selDt = DateTime.Now.AddMonths(-1);
                if (date != null)
                {
                    selDt = DateTime.Parse(date);
                }
                string searchQuery = HttpContext.Request.Query["search[value]"].ToString();

                MyMonthlyHoursViewModel monthlyHoursViewModel = new MyMonthlyHoursViewModel();

                // Generate TEST data...
                //List<MonthlyHoursListData> mh = new List<MonthlyHoursListData>();

                //for (int i = 0; i < length; i++)
                //{
                //    //return View();
                //    MonthlyHoursListData t = new MonthlyHoursListData();
                //    t.EmpName = "test" + i + start;
                //    t.ManagerName = "Anil";
                //    t.Week1TotalHrMns = i.ToString();
                //    t.Week2TotalHrMns = i+1.ToString();
                //    t.Week3TotalHrMns = i+2.ToString();
                //    t.Week4TotalHrMns = i+3.ToString();
                //    t.Week5TotalHrMns = i+4.ToString();
                //    t.MonthlyTotalHrMns = i+5.ToString();
                //    mh.Add(t);
                //}

                if (searchtext != null)
                {
                    monthlyHoursViewModel = await _reportHoursService.GetSearchResults(selDt, searchtext, pageIndex, length);
                    dataTableData = monthlyHoursViewModel.MyMonthlyHoursDataTableData;
                }
                else
                {
                    monthlyHoursViewModel = await _reportHoursService.GetViewModel(selDt, pageIndex, length);
                    dataTableData = monthlyHoursViewModel.MyMonthlyHoursDataTableData;
                }

                

                

                dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * length) + dataTableData.Data.Count + 1;
                int recordsFiltered = (pageIndex * length) + dataTableData.Data.Count + 1;
                dataTableData.recordsTotal = int.MaxValue;
                dataTableData.recordsFiltered = recordsFiltered;

                if (date == null)
                {
                    myMonthlyHoursViewModel.SearchDate = myMonthlyHoursViewModel.fnGetLastMonthEndDate();
                }
                else
                {
                    myMonthlyHoursViewModel.SearchDate = selDt;
                }
                myMonthlyHoursViewModel.UserInfo = _userProfile;

                // Output TEST data...
                //dataTableData.Data = mh;

                return Json(dataTableData);

            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }


    }
}