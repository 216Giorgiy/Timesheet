// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.Dashboard.Services;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.Abstractions;
using System.Globalization;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
    /// <summary>
    /// Team Hours controller
    /// </summary>
    [Route("[controller]/[action]")]
    public class TeamHoursController : Controller
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly IViewModelService<TeamHoursViewModel> _teamHoursService;

        private readonly IDataService _dataServiceClient;
        private MiddleTier.Models.UserProfile _userProfile;

        public TeamHoursController(
            ILogger<TeamHoursController> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<UserProfile> userProfileRepository,
            IViewModelService<TeamHoursViewModel> teamHoursService,
            IDataService dataServiceClient)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _teamHoursService = teamHoursService ?? throw new ArgumentNullException(nameof(teamHoursService));
            _dataServiceClient = dataServiceClient ?? throw new ArgumentNullException(nameof(dataServiceClient));
        }

        [HttpGet]
        public async Task<IActionResult> MyTeamRevisionRequest(string date, string searchtext, int draw, int start, int length = 10)
        {
           int pageIndex = 0;
           if (start != 0)
            {
                pageIndex = start / length + 1;
            }
            
            if (pageIndex == 0) pageIndex = 1;

            //var dateRequested = DateTime.ParseExact(date, "yyyMMdd", CultureInfo.InvariantCulture);

            MyTeamDataTableData dataTableData = new MyTeamDataTableData();

            if (User.Identity.IsAuthenticated)
            {
                MyTeamHoursViewModel myTeamsHoursViewModel = new MyTeamHoursViewModel();
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                DateTime selDt = DateTime.Now.AddMonths(-1);
                if (date != null)
                {
                    selDt = DateTime.Parse(date);
                }
                
                string searchQuery = HttpContext.Request.Query["search[value]"].ToString();
                TeamHoursViewModel teamHoursViewModel = new TeamHoursViewModel();
                if (searchtext != null)
                {
                    teamHoursViewModel = await _teamHoursService.GetSearchResults(selDt, searchtext, pageIndex, length);
                    dataTableData = teamHoursViewModel.MyTeamDataTableData;
                }
                else
                {
                    teamHoursViewModel = await _teamHoursService.GetViewModel(selDt, pageIndex, length);
                    dataTableData = teamHoursViewModel.MyTeamDataTableData;
                }
                

                dataTableData.draw = draw;
                dataTableData.recordsTotal = (pageIndex * length) + dataTableData.data.Count + 1;
                int recordsFiltered = (pageIndex * length) + dataTableData.data.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;

                if (date == null)
                {
                    myTeamsHoursViewModel.SearchDate = myTeamsHoursViewModel.fnGetLastMonthEndDate();
                }
                else
                {
                    myTeamsHoursViewModel.SearchDate = selDt;
                }

                myTeamsHoursViewModel.UserInfo = _userProfile;
				//return View(myTeamsHoursViewModel);

                if (teamHoursViewModel.MyTeamDataTableData.data.Exists(x => x.SubmittedDate == DateTime.MinValue) )
				{
					myTeamsHoursViewModel.IsSubmitted = false;
				}
				else
				{
					myTeamsHoursViewModel.IsSubmitted = true;
				}

                return Json(dataTableData);

            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }

            //return Json(dataTableData);
        }
    }
}