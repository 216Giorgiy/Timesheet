// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoLocal.TimeTracker.Dashboard.Abstractions;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
    [Route("[controller]/[action]")]
    public class AnalyticsController : Controller
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly IAnalyticsServiceDashBoard<AnalyticsViewModel> _analyticsService;
        private readonly IDataService _dataServiceClient;
        private MiddleTier.Models.UserProfile _userProfile;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">The logging provider to use</param>
        public AnalyticsController(
            ILogger<MonthlyReportHoursController> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<UserProfile> userProfileRepository,
            IAnalyticsServiceDashBoard<AnalyticsViewModel> analyticsservice,
            IDataService dataServiceClient
            )
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _analyticsService = analyticsservice ?? throw new ArgumentNullException(nameof(analyticsservice));
            _dataServiceClient = dataServiceClient ?? throw new ArgumentNullException(nameof(dataServiceClient));
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> AnalyticsRequest(string dt)
        {
            if (User.Identity.IsAuthenticated)
            {
                MyMonthlyHoursViewModel myMonthlyHoursViewModel = new MyMonthlyHoursViewModel();
                _userProfile = await _dataServiceClient.GetUserProfile();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;
                if (dt != null)
                {
                    Dictionary<string, object> analyticsdata = new Dictionary<string, object>();
                    try
                    {
                        analyticsdata = await _analyticsService.GetOTPercentageAsync(dt);
                    }
                    catch (Exception ex)
                    {

                        throw;
                    }
                    return Json(analyticsdata);
                }
                else
                {
                    ErrorViewModel error = new ErrorViewModel();
                    return View();
                }
            }
            else
            {
                ErrorViewModel error = new ErrorViewModel();
                return View();
            }
        }

        [HttpGet]
        public async Task<bool> UpdateAnalyticsRequest()
        {
            try
            {
               var analyticsdata = await _analyticsService.UpdateAnalytics();
                return analyticsdata;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}