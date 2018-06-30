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
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.Dashboard.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
    [Route("[controller]/[action]")]
    [Authorize]
    public class WeeklyReportHoursController : Controller
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly IDataService _dataServiceClient;
        private readonly IWeeklyReportHoursService<WeeklyHoursViewModel> _reportHoursService;
        private MiddleTier.Models.UserProfile _userProfile;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">The logging provider to use</param>
        public WeeklyReportHoursController(
            ILogger<WeeklyReportHoursController> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<UserProfile> userProfileRepository,
            IWeeklyReportHoursService<WeeklyHoursViewModel> reportHoursService,
            IDataService dataServiceClient
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _reportHoursService = reportHoursService;
            _dataServiceClient = dataServiceClient ?? throw new ArgumentNullException(nameof(dataServiceClient));
        }

        // GET: WeeklyReportHours
        [HttpGet]
        public async Task<IActionResult> Index(int page = 1)
        {
            var pageSize = 10;
            var weeklyReportViewModel = _reportHoursService.GetWeeklyReportHours(DateTime.Now, page, pageSize);
            return View(weeklyReportViewModel);
        }

        // POST: TeamHours/Search
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Search(string searchQuery, int page = 1)
        {
            try
            {
                var pageSize = 10;

                var teamHoursViewModel = await _reportHoursService.GetSearchResults(DateTime.Now, searchQuery, page, pageSize);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        [HttpGet]
        public async Task<IActionResult> WkLdReq(string date, string searchtext, int draw, int start = 0, int length = 10)
        {
            int pageIndex = 0;
            if (start != 0)
            {
                pageIndex = start / length + 1;
            }

            if (pageIndex == 0) pageIndex = 1;

            MyWeeklyHoursDataTableData dataTableData = new MyWeeklyHoursDataTableData();

            if (User.Identity.IsAuthenticated)
            {
                WeeklyHoursViewModel myWeeklyHoursViewModel = new WeeklyHoursViewModel();
                _userProfile = await _dataServiceClient.GetUserProfile();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                DateTime selDt = DateTime.Now.AddMonths(-1);
                if (date != null)
                {
                    selDt = DateTime.Parse(date);
                    int startDay = (int)selDt.DayOfWeek;
                    int dayOfMonth = (int)selDt.Day;
                    while ((startDay > 0) && (dayOfMonth > 1))
                    {
                        selDt = selDt.AddDays(-1);
                        startDay--;
                        dayOfMonth--;
                    }
                }
                string searchQuery = HttpContext.Request.Query["search[value]"].ToString();

                WeeklyHoursViewModel weeklyHoursViewModel = new WeeklyHoursViewModel();
                if (searchtext != null)
                {
                    weeklyHoursViewModel = await _reportHoursService.GetSearchResults(selDt, searchtext, pageIndex, length);
                    dataTableData = weeklyHoursViewModel.MyWeeklyHoursDataTableData;
                }
                else
                {
                    weeklyHoursViewModel = await _reportHoursService.GetViewModel(selDt, pageIndex, length);
                    dataTableData = weeklyHoursViewModel.MyWeeklyHoursDataTableData;
                }
                

                dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * length) + dataTableData.data.Count + 1;
                int recordsFiltered = (pageIndex * length) + dataTableData.data.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;

                if (date == null)
                {
                    myWeeklyHoursViewModel.SearchDate = myWeeklyHoursViewModel.fnGetLastMonthLastWeekSunDate(); // Start on Sunday.
                }
                else
                {
                    int startDay = (int)selDt.DayOfWeek;
                    int dayOfMonth = (int)selDt.Day;
                    while ((startDay > 0) && (dayOfMonth > 1))
                    {
                        selDt = selDt.AddDays(-1);
                        startDay--;
                        dayOfMonth--;
                    }
                    myWeeklyHoursViewModel.SearchDate = selDt;
                }
                myWeeklyHoursViewModel.UserInfo = _userProfile;

                return Json(dataTableData);

            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }

        [HttpGet("Error")]
        public IActionResult Error()
        {
            return View();
        }

        // GET: WeeklyReportHours/Details/10
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: WeeklyReportHours/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: WeeklyReportHours/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: WeeklyReportHours/Delete/10
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST:  WeeklyReportHours/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

    }
}