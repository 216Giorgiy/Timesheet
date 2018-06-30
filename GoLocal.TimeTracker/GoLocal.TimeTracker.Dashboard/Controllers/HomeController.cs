// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GoLocal.TimeTracker.Dashboard.Models;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using Microsoft.Extensions.Configuration;
using GoLocal.TimeTracker.Dashboard.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Repositories;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Services;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.Dashboard.Abstractions;
using System.Globalization;
using Newtonsoft.Json;
using GoLocal.TimeTracker.Dashboard.Services.Helpers;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Text;
using System.Security.Claims;
using GoLocal.TimeTracker.Dashboard.Resources;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
    /// <summary>
    /// Time Tracker Front End controller
    /// </summary>
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IDataService _dataServiceClient;
        private readonly IRepository<MiddleTier.Models.UserProfile> _userProfileRepository;
        private readonly GraphAppSharePointService _graphSharePointService;
        private MiddleTier.Models.UserProfile _userProfile;
        private readonly LocService _sharedLocalizer;
        private readonly ICacheService<ListCollectionPage<WorkHours>> _cacheService;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="logger">The logging provider to use</param>
        /// <param name="timeTrackerOptions">The app settings provider</param>
        /// <param name="dataServiceClient">Data Service client</param>
        public HomeController(
            ILogger<HomeController> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<MiddleTier.Models.UserProfile> userProfileRepository,
            GraphAppSharePointService graphSharePointService,
            IDataService dataServiceClient,
            LocService sharedLocalizer, ICacheService<ListCollectionPage<WorkHours>> cacheService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _dataServiceClient = dataServiceClient ?? throw new ArgumentNullException(nameof(dataServiceClient));
            _sharedLocalizer = sharedLocalizer ?? throw new ArgumentNullException(nameof(logger));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
        }

        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                // Get UserProfile details
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Mail;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                String firstDayOfWeek = _userProfile.Fields.FirstDayWeek;
				
                // Get current week data for Dashboard initially
				string dataBoundary = "CurrentWeek";

                 var spSiteList = new SiteList
                {
                    SiteId = _timeTrackerOptions.SharePointSiteId,
                    ListId = _timeTrackerOptions.WorkHoursListPrefix + _userProfile.Id
                };
                var isExisted = await _graphSharePointService.TryGetSiteListAsync(spSiteList);
                if (isExisted)
                {
                    dataBoundary = "All";
                    ViewBag.dataBoundary = "All";
                }
                var dashboardViewModel = await _dataServiceClient.GetWorkHours(DateTime.Now, "current", firstDayOfWeek, dataBoundary);
                dashboardViewModel.currentWeekData = (isExisted == true) ? false : true;
                dashboardViewModel.UserInfo = _userProfile;
                dashboardViewModel.WorkHoursEditable = (isExisted == true) ? true : false;
				return View(dashboardViewModel);
			
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }


		public async Task<IActionResult> refreshData()
		{
			if (User.Identity.IsAuthenticated)
			{
				// Get UserProfile details
				if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
				ViewData["Email"] = _userProfile.Fields.Mail;
				ViewData["IsManager"] = _userProfile.Fields.IsManager;
				ViewData["IsHr"] = _userProfile.Fields.IsHr;
				ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
				ViewData["UserImage"] = _userProfile.Fields.UserPicture;

				String firstDayOfWeek = _userProfile.Fields.FirstDayWeek;
				// Get Dashboard data
				string dataBoundary = "All";
				var dashboardViewModel = await _dataServiceClient.GetWorkHours(DateTime.Now, "current", firstDayOfWeek, dataBoundary);

				dashboardViewModel.UserInfo = _userProfile;

				dashboardViewModel.WorkHoursEditable = _timeTrackerOptions.WorkHoursEditable;

				
				return View(nameof(Index), dashboardViewModel);
				

			}
			else
			{
				ErrorViewModel EVM = new ErrorViewModel();

				return View(EVM);
			}
		}


		public async Task<IActionResult> GetPrevNextWeek(string dt, string weekType)
        {
            if (User.Identity.IsAuthenticated)
            {
                // Get UserProfile details
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Mail;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                // Get Dashboard data
                DateTime selDate = Convert.ToDateTime(dt);
				String firstDayOfWeek = _userProfile.Fields.FirstDayWeek;
				string dataBoundary = "All";
				var dashboardViewModel = await _dataServiceClient.GetWorkHours(selDate, weekType, firstDayOfWeek, dataBoundary);

                dashboardViewModel.UserInfo = _userProfile;
                dashboardViewModel.WorkHoursEditable = _timeTrackerOptions.WorkHoursEditable;
				

				dashboardViewModel.OTcomputation(Convert.ToInt16(_timeTrackerOptions.DayHours), Convert.ToInt16(_timeTrackerOptions.WeekHours), Convert.ToInt16(_timeTrackerOptions.MonthHours));
                return View(nameof(Index), dashboardViewModel);
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }

       
        public async Task<IActionResult> Notifications()
        {
            if (User.Identity.IsAuthenticated)
            {
                // Get UserProfile details
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();

                // Get User Notifications
                var userNotificationsViewModel = await _dataServiceClient.GetUserNotifications(_userProfile.Fields.IsHr);

                userNotificationsViewModel.UserInfo = _userProfile;

                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                return View(userNotificationsViewModel);
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }

        [HttpPost]
		public async Task<JsonResult> NotificationMarkAsRead()		{
            var response = new object();
            if (User.Identity.IsAuthenticated)
			{
                // Get UserProfile details
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                if (Request != null && Request.Form != null && Request.Form.Count > 0)
                {
                    MiddleTier.Models.Notifications selNotification = new MiddleTier.Models.Notifications();
                    selNotification.Fields.SentToMail = Request.Form["Fields[SentToMail]"].ToString();
                    selNotification.Fields.SentDate = Convert.ToDateTime(Request.Form["Fields[SentDate]"].ToString());
                    selNotification.Fields.MessageBody = Request.Form["Fields[MessageBody]"].ToString();
                    selNotification.Fields.ReadDate = DateTime.Now;
                    selNotification.Id = Request.Form["id"].ToString();
                    selNotification.ListId = Request.Form["listId"].ToString();

                    var isSave = await _dataServiceClient.NotificationMarkAsRead(selNotification);

                    if (isSave)
                {
                        response = new
                    {
                        responseCode = 200,
                    };

                }
                
                return Json(response);
                }
			}
            return Json(response);
			
		}

        public async Task<JsonResult> NotificationsUnReadCount()
        {
            var response = new object();
            if (User.Identity.IsAuthenticated)
			{
                // Get UserProfile details
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();

                // Get User Notifications
                var userNotificationsViewModel = await _dataServiceClient.GetUserNotifications(_userProfile.Fields.IsHr);

                if(userNotificationsViewModel != null)
                {
                    var cnt = userNotificationsViewModel.MyUserNotifications.Count(p => p.Notifications.Fields.ReadDate.Equals(new DateTime(1,1,1)));
                    response = new
                    {
                        responseCode = 200,
                        unReadCount = userNotificationsViewModel.UnReadCount
                };
                }
                return Json(response);
                
			}
            return Json(response);
        }
		/*
        public async Task<IActionResult> Weekly(string dt)
        {
            if (User.Identity.IsAuthenticated)
            {
                // Get UserProfile details
                _userProfile = await _dataServiceClient.GetUserProfile(User, HttpContext);
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                DateTime selDt = DateTime.Now.AddDays(-DateTime.Now.Day);
                if (dt != null)
                {
                    selDt = Convert.ToDateTime(dt.ToString());
                }
                

                var viewModel = await _dataServiceClient.GetWeeklyReportHours(
                    User,
                    HttpContext,
                   selDt);
                viewModel.ComputeTotalHrs();
                viewModel.SelectedDate = selDt;
                return View(viewModel);
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }
		*/

		//public async Task<IActionResult> Weekly(string dt)
		public async Task<IActionResult> Weekly(string selMonthDt, string empNameFilter = default(string), int pageId = 0, int pageSize = 10, ListCollectionPage<ReportHours> reportHours = null, int status = 0)
		{
			var ci = System.Threading.Thread.CurrentThread.CurrentCulture;
			
			if (User.Identity.IsAuthenticated)
			{
                // Get UserProfile details
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Upn;
				ViewData["IsManager"] = _userProfile.Fields.IsManager;
				ViewData["IsHr"] = _userProfile.Fields.IsHr;
				ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
				ViewData["UserImage"] = _userProfile.Fields.UserPicture;

				DateTime selDt = DateTime.Now.AddDays(-DateTime.Now.Day);
                int startDay = (int)selDt.DayOfWeek;
                int dayOfMonth = (int)selDt.Day;
                while ((startDay > 0) && (dayOfMonth > 1))
                {
                    selDt = selDt.AddDays(-1);
                    startDay--;
                    dayOfMonth--;
                }

                if (selMonthDt != null)
				{
                    selDt = Convert.ToDateTime(selMonthDt.ToString());
                    startDay = (int)selDt.DayOfWeek;
                    dayOfMonth = (int)selDt.Day;
                    while ((startDay > 0) && (dayOfMonth > 1))
                    {
                        selDt = selDt.AddDays(-1);
                        startDay--;
                        dayOfMonth--;
                    }
                }
				//DateTime date = Convert.ToDateTime(selMonthDt);
				// Get an array tagging each item of the month with the Week number



				int[] dateWeekNumber = _dataServiceClient.GetDayOfMonthWeekAssignmentArray(selDt);


				// Get an array tagging each item of the month with the Week number
				var myWeekNumber = dateWeekNumber[selDt.Day - 1];
				var weeklyHrsList = new List<WeeklyHours>();
				
				WeeklyHoursViewModel weeklyViewModel = new WeeklyHoursViewModel();
				ListCollectionPage<ReportHours> weeklyTemp = null;
				//if (Request.Query.Count != 0)
				//{
					//var json = Request.Query["reportHours"];
					//weeklyTemp = JsonConvert.DeserializeObject<ListCollectionPage<ReportHours>>(json);
				//}
				if (status == 0)
					reportHours = await _dataServiceClient.GetWeeklyPageView(selDt, empNameFilter, pageId, pageSize, null, 0);
				else if (status == 1)
					reportHours = await _dataServiceClient.GetWeeklyPageView(selDt, empNameFilter, pageId, pageSize, reportHours, 1);
				else if (status == 2)
					reportHours = await _dataServiceClient.GetWeeklyPageView(selDt, empNameFilter, pageId, pageSize, reportHours, 2);
				/*
				if (teamHours == null)
				{
					myTeamsHoursViewModel.UserInfo = _userProfile;
					return View(myTeamsHoursViewModel);
				}
				*/
				ViewData["ReportHoursCollection"] = reportHours;

				IList<ReportHours> reportHoursList = reportHours.DataList;
				// Group Monthly Report hours by individual User data using DisplayName
				var groupings = from item in reportHoursList
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

				
				if (selMonthDt == null)
				{
					weeklyViewModel.SelectedDate = fnGetLastMonthLastWeekSunDate(); // Start on Sunday.
                }
				else
				{
					weeklyViewModel.SelectedDate = selDt;
				}

				//weeklyViewModel.u = _userProfile;
				

				//WeeklyHrs = weeklyHrsList;
				weeklyViewModel.WeeklyHrs = weeklyHrsList;
				return View(weeklyViewModel);
			}
			else
			{
				ErrorViewModel EVM = new ErrorViewModel();

				return View(EVM);
			}
		}

		public DateTime fnGetLastMonthEndDate()
		{
			DateTime curDate = DateTime.Now;
			DateTime lmStDate = curDate.AddMonths(-1).AddDays(1 - curDate.Day);
			DateTime lmEdDate = lmStDate.AddMonths(1).AddDays(-1);
			return lmEdDate;
		}

        // Returns Sunday for Last Week of Last Month
        public DateTime fnGetLastMonthLastWeekSunDate()
        {
            DateTime curDate = DateTime.Now;
            DateTime lmStDate = curDate.AddMonths(-1).AddDays(1 - curDate.Day);
            DateTime lmEdWkStart = lmStDate.AddMonths(1).AddDays(-1);
            int startDay = (int)lmEdWkStart.DayOfWeek;
            while (startDay > 0)
            {
                lmEdWkStart = lmEdWkStart.AddDays(-1);
                startDay--;
            }
            return lmEdWkStart;
        }

        public async Task<IActionResult> Analytics(string dt)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                var email = User.Identity.Name ?? User.FindFirst("preferred_username").Value;
                ViewData["Email"] = email;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                DateTime selDt = DateTime.Now.AddMonths(-1);
                if (dt != null)
                {
                    selDt = Convert.ToDateTime(dt.ToString());
                }

                //var viewModel = await _dataServiceClient.GetDirectMonthlyReportHours(User, HttpContext, selDt);
                var viewModel = await _dataServiceClient.GetMonthlyReportHours(Convert.ToDateTime(selDt));
                //viewModel.ComputeTotalMonthlyHrs();
                viewModel.SelectedDate = selDt;
                return View(viewModel);
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }


        [HttpGet]
        public async Task<IActionResult> Monthly(string dt)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                var email = User.Identity.Name ?? User.FindFirst("preferred_username").Value;
                ViewData["Email"] = email;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                DateTime selDt = DateTime.Now.AddMonths(-1);
                if (dt != null)
                {
                    selDt = Convert.ToDateTime(dt.ToString());
                }

                //var viewModel = await _dataServiceClient.GetDirectMonthlyReportHours(User, HttpContext, selDt);
                var viewModel = await _dataServiceClient.GetMonthlyReportHours(Convert.ToDateTime(selDt));
                //viewModel.ComputeTotalMonthlyHrs();
                viewModel.SelectedDate = selDt;
                return View(viewModel);
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }
		
        [HttpGet]
        public async Task<IActionResult> Myteams(string selMonthDt, string empNameFilter = default(string), int pageId = 0, int pageSize = 10, ListCollectionPage<TeamHours> teamHours = null, int status = 0)
        {
            if (User.Identity.IsAuthenticated)
            {
                if (_userProfile == null) _userProfile = await _userProfileRepository.GetItemAsync();
                ViewData["Email"] = _userProfile.Fields.Upn;
                ViewData["IsManager"] = _userProfile.Fields.IsManager;
                ViewData["IsHr"] = _userProfile.Fields.IsHr;
                ViewData["IsAdmin"] = _userProfile.Fields.IsAdmin;
                ViewData["UserImage"] = _userProfile.Fields.UserPicture;

                DateTime selDt = DateTime.Now.AddMonths(-1);
                if (selMonthDt != null)
                {
                    selDt = Convert.ToDateTime(selMonthDt.ToString());
                }

                var myTeamsHoursViewModel = await _dataServiceClient.GetMyTeamHours(selDt, empNameFilter, pageId, pageSize);
                //MyTeamHoursViewModel myTeamsHoursViewModel = new MyTeamHoursViewModel();
                //ListCollectionPage<TeamHours> teamHourstemp = null;
                //if (Request.Query.Count != 0)
                //{
                //    var json = Request.Query["teamHours"];
                //    teamHourstemp = JsonConvert.DeserializeObject<ListCollectionPage<TeamHours>>(json);
                //}
                //if (status == 0)
                //    teamHours = await _dataServiceClient.GetMyTeamHoursPageView(selDt, empNameFilter, pageId, pageSize, User, HttpContext, null, 0);
                //else if (status == 1)
                //    teamHours = await _dataServiceClient.GetMyTeamHoursPageView(selDt, empNameFilter, pageId, pageSize, User, HttpContext, teamHourstemp, 1);
                //else if (status == 2)
                //    teamHours = await _dataServiceClient.GetMyTeamHoursPageView(selDt, empNameFilter, pageId, pageSize, User, HttpContext, teamHourstemp, 2);

                //if (teamHours == null)
                //{
                //    myTeamsHoursViewModel.UserInfo = _userProfile;
                //    return View(myTeamsHoursViewModel);
                //}

                ViewData["TeamHoursCollection"] = teamHours;

                IList<TeamHours> teamHoursList = teamHours.DataList;
                bool isSubmitted = false;
                string SubmittedDate = string.Empty;
                if (teamHoursList != null)
                {
                    List<MyTeamFields> myTeam = new List<MyTeamFields>();
                    foreach (var team in teamHoursList)
                    {
                        if (team.Fields.TeamHoursItemState == MiddleTier.Helpers.ItemState.Submitted)
                        {
                            isSubmitted = true;
                            SubmittedDate = team.Fields.TeamHoursSubmittedDate.ToString();
                        }
                        
                        myTeam.Add(new MyTeamFields
                        {
                            TeamHours = team
                        });
                    }

                    myTeamsHoursViewModel.IsSubmitted = isSubmitted;
                    myTeamsHoursViewModel.SubmittedDate = SubmittedDate;
                    myTeamsHoursViewModel.MyTeam = myTeam;
                }

                if (selMonthDt == null)
                {
                    myTeamsHoursViewModel.SearchDate = myTeamsHoursViewModel.fnGetLastMonthEndDate();
                }
                else
                {
                    myTeamsHoursViewModel.SearchDate = selDt;
                }

                myTeamsHoursViewModel.UserInfo = _userProfile;

                return View(myTeamsHoursViewModel);
            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
        }
		
        [HttpPost]
        public async Task<IActionResult> MyTeamSaveAdjustedTime()
        {
            if (User.Identity.IsAuthenticated)
            {
                string newAdjustedHrs = String.Empty;
                string newAdjustedMins = String.Empty;
                string objectIdentifier = String.Empty;
                var isSaveAdjustedTime = await _dataServiceClient.MyTeamSaveAdjustedHrs(objectIdentifier, newAdjustedHrs, newAdjustedMins);

                if (isSaveAdjustedTime)
                {
                    
                    var response = new
                    {
                        ResponseCode = 200,
                        ResponseMsg = "Success"
                    };
                    return Json(response);
                }
                else
                {
                    var response = new
                    {
                        ResponseCode = -999,
                        ResponseMsg = "Failure"
                    };
                    return Json(response);
                }

            }
            else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> MyTeamRevisionRequest()
        {
            ///current work
            if (User.Identity.IsAuthenticated)
            {
                var selDate = Request.Form["selDate"].ToString();
                var reason = Request.Form["reason"].ToString();
                var objIdentifier = Request.Form["objIdentifier"].ToString();
                var id = Request.Form["empId"].ToString();
                var date = Request.Form["empDate"].ToString();

                //added this to check if user has not selected any date
                //if true, the logic considers the last month based on current date to proces the records displayed
                var dateNotSelected = Request.Form["dateNotSelected"].ToString();
							

				DateTime month = default(DateTime); 

                if(!string.IsNullOrEmpty(selDate) && DateTime.TryParse(selDate, out month) && !string.IsNullOrEmpty( objIdentifier) && !string.IsNullOrEmpty(reason)) 
                {
                    var isSave = false;
                    string objectIdentifier = String.Empty;
                    if (dateNotSelected == "true")
                    {
                        month = month.AddMonths(-1);
                    }

                    string requestUrl = _timeTrackerOptions.HoursRevisionRequest;
                    dynamic requestObject = new JObject();

                    requestObject.selDate = selDate;
                    requestObject.reason = reason;
                    requestObject.objIdentifier = objIdentifier;
                    requestObject.id = id;
                    requestObject.date = date;
                    requestObject.dateNotSelected = dateNotSelected;
                    requestObject.notificationMsgBody = _sharedLocalizer.GetLocalizedHtmlString("NotRequestWorkHoursRevision1") + " " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month.Month) + " " + _sharedLocalizer.GetLocalizedHtmlString("NotRequestWorkHoursRevision2") + " - " + reason;

                    string json = JsonConvert.SerializeObject(requestObject);

                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    using (HttpClient client = new HttpClient())
                    {
                        string ObjectIdentifierType = _timeTrackerOptions.ObjectIdentifier;
                        var identifier = User.FindFirst(ObjectIdentifierType).Value;
                        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("ObjectIdentifierType", identifier);

                        using (HttpResponseMessage httpResponse = client.PostAsync(requestUrl, content).Result)
                        {

                            isSave = httpResponse.IsSuccessStatusCode;
                        }
                    }

                    if (isSave)
                    {
                        // TODO: Update hours and update the MyTeamViewModel
                        //bool isRevisionRequest = await _dataServiceClient.MyTeamWorkHoursRevisionRequest(new DateTime(month.Year, month.Month, 1), objIdentifier, reason, id, date);
                        var response = new
                        {
                            ResponseCode = 200,
                            ResponseMsg = "Success"
                        };
                        return Json(response);
                    }
                    else
                    {
                        var response = new
                        {
                            ResponseCode = -999,
                            ResponseMsg = "Failure"
                        };
                        return Json(response);
                    }
                }
                else
                {
                    string message = "Input validation failed for field: ";

                    if(string.IsNullOrEmpty(selDate) || !DateTime.TryParse(selDate, out month))
                    {
                        message += "(selDate)";
                    }

                    if (string.IsNullOrEmpty(objIdentifier))
                    {
                        message += "(objIdentifier)";
                    }


                    if (string.IsNullOrEmpty(reason))
                    {
                        message += "(reason)";
                    }


                    ErrorViewModel EVM = new ErrorViewModel();
                    EVM.ErrorMessage = message;
                    return View(EVM);
                }
               

            }else
            {
                ErrorViewModel EVM = new ErrorViewModel();

                return View(EVM);
            }
            
        }

        [AllowAnonymous]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult SetLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect(returnUrl);
        }

        [HttpPost]
        public async Task<JsonResult> GetWorkHoursForDate()
        {
            if (User.Identity.IsAuthenticated)
            {
                // Get Work hours by date
                var reqDate = Request.Form["selectedDate"].ToString();
                DateTime selectedDate = DateTime.Parse(reqDate, CultureInfo.InstalledUICulture, DateTimeStyles.AllowInnerWhite);

                //var DictHrsMins = new Dictionary<string, string>();
                //DictHrsMins = await _dataServiceClient.GetWorkHoursForDate(selectedDate );

                List<WorkHours> editWorkHours = new List<WorkHours>();
                editWorkHours = await _dataServiceClient.GetEditWorkHoursForDate(selectedDate);
                var response = new object();
                if (editWorkHours != null)
                {       
                    response = new
                    {
                        responseCode = 200,
                        data = editWorkHours
                    };
                }

                return Json(response);
            }
            else
            {
                var response = new
                {
                    responseCode = -999,
                };
                return Json(response);
            }
        }

        
		[HttpPost]
		public async Task<JsonResult> SaveHrsByDate()
		{
			try
			{
				if (User.Identity.IsAuthenticated)
				{
					var dashboardViewModel = new DashBoardViewModel();

					// Passing Edit Work hours 
					WorkHours editWorkHrs = new WorkHours();
					editWorkHrs.Id = Request.Form["modelId"].ToString();
					Dictionary<string, Int32> emailTime = SplitHrMin(Request.Form["emailHrMin"].ToString());
					Dictionary<string, Int32> meetingTime = SplitHrMin(Request.Form["meetingHrMin"].ToString());
					Dictionary<string, Int32> otherTime = SplitHrMin(Request.Form["otherHrMin"].ToString());
					// Adjusted HrsMin
					Dictionary<string, Int32> adjustedEmailTime = SplitHrMin(Request.Form["txtAdjEmailHrsMin"].ToString());
					Dictionary<string, Int32> adjustedMeetingTime = SplitHrMin(Request.Form["txtAdjMeetingHrsMin"].ToString());
					Dictionary<string, Int32> adjustedOtherTime = SplitHrMin(Request.Form["txtAdjOtherWorkHrsMin"].ToString());
					string strSelDate = Request.Form["selectedDate"].ToString();
					DateTime selectedDate = DateTime.Parse(strSelDate, CultureInfo.InstalledUICulture, DateTimeStyles.AllowInnerWhite);

					editWorkHrs.Fields = new WorkHoursFields
					{
						EmailHours = 0,
						EmailMinutes = 0,
						MeetingHours = 0,
						MeetingMinutes = 0,
						OtherHours = 0,
						OtherMinutes = 0,
						EmailAdjustedHours = Convert.ToInt16(adjustedEmailTime["hr"]),
						EmailAdjustedMinutes = Convert.ToInt16(adjustedEmailTime["min"]),
						MeetingAdjustedHours = Convert.ToInt16(adjustedMeetingTime["hr"]),
						MeetingAdjustedMinutes = Convert.ToInt16(adjustedMeetingTime["min"]),
						OtherAdjustedHours = Convert.ToInt16(adjustedOtherTime["hr"]),
						OtherAdjustedMinutes = Convert.ToInt16(adjustedOtherTime["min"]),
						AdjustedHoursReason = Request.Form["txtAdjReason"],
						//Date = selectedDate.ToShortDateString()
						Date = selectedDate.ToString("yyyyMMdd")
					};

                    string requestUrl =  _timeTrackerOptions.SaveHrsByDate;

					dynamic requestObject = new JObject();					
					JObject data = (JObject)JToken.FromObject(editWorkHrs);
					requestObject.data = data;
					string json = JsonConvert.SerializeObject(requestObject);
						
					// Create the request message and add the content.
					var content = new StringContent(json, Encoding.UTF8, "application/json");

                    var isSave = false;
                    string ObjectIdentifierType = _timeTrackerOptions.ObjectIdentifier;
                    var identifier = User.FindFirst(ObjectIdentifierType).Value;
                    using (HttpClient client = new HttpClient())
					{
                        client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("ObjectIdentifierType", identifier);

                        using (HttpResponseMessage httpResponse = client.PostAsync(requestUrl, content).Result)
						{

							isSave = httpResponse.IsSuccessStatusCode;
						}
					}


					if (isSave)
					{
						var response = new
						{
							ResponseCode = 200,
							ResponseMsg = "Success"
						};
                        string key = identifier + selectedDate.ToString("yyyyMM");
                        await _cacheService.RemoveFromCacheAsync(key);
                        return Json(response);
					}
					else
					{
						var response = new
						{
							ResponseCode = -999,
							ResponseMsg = "Fail"
						};
						return Json(response);
					}
				}
				else
				{
					var response = new
					{
						ResponseCode = -999,
						ResponseMsg = "Fail"
					};
					return Json(response);
				}
			}
			catch(Exception ex) {
				throw;
			}
		}


		[HttpPost]
        public async Task<JsonResult> SubmitButtonForLastMonth()
        {
            var response = new object();
            if (User.Identity.IsAuthenticated)
            {
                var isSave = false;
                var dashboardViewModel = new DashBoardViewModel();
                var requestUrl = _timeTrackerOptions.SubmitHoursForLastMonth;
                var dateToProcess = DateTime.Now;
                var notificationMsgBody = _sharedLocalizer.GetLocalizedHtmlString("NotSubmitWorkHours1") + " " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateToProcess.AddMonths(-1).Month);

                dynamic requestObject = new JObject();
                requestObject.notificationMsgBody = notificationMsgBody;
                string json = JsonConvert.SerializeObject(requestObject);
				var content = new StringContent(json, Encoding.UTF8, "application/json");
                string ObjectIdentifierType = _timeTrackerOptions.ObjectIdentifier;
                var identifier = User.FindFirst(ObjectIdentifierType).Value;
                using (HttpClient client = new HttpClient())
				{
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("ObjectIdentifierType", identifier);

                    using (HttpResponseMessage httpResponse = client.PostAsync(requestUrl, content).Result)
					{

						isSave = httpResponse.IsSuccessStatusCode;
					}
				}


				if (isSave)
                {
                    response = new
                    {
                        responseCode = 200,
                        submittedOnDate = DateTime.Parse(DateTime.Now.ToString(), CultureInfo.InstalledUICulture, DateTimeStyles.AllowInnerWhite)
                    };
                    DateTime cacheStart = new DateTime(DateTime.Now.AddMonths(-1).Year, DateTime.Now.AddMonths(-1).Month, 1);
                    string key = identifier + cacheStart.ToString("yyyyMM");
                    await _cacheService.RemoveFromCacheAsync(key);
                }
                
                return Json(response);
            }
            else
            {
                response = new
                {
                    responseCode = -999,
                    submittedOnDate = DateTime.Parse(DateTime.Now.ToString(), CultureInfo.InstalledUICulture, DateTimeStyles.AllowInnerWhite)
                };
                return Json(response);
            }

        }

		[HttpPost]
		public async Task<JsonResult> SubmitButtonForMyTeamHours()
		{
			var response = new object();

			if (User.Identity.IsAuthenticated)
			{
                DateTime month = DateTime.Now.AddMonths(-1);

                if (Request != null && Request.Form != null && Request.Form.ContainsKey("selDate"))
                {
                    var selDate = Request.Form["selDate"].ToString();

                    if (!string.IsNullOrEmpty(selDate))
                    {
                        if (DateTime.TryParse(selDate, out month))
                        {
                            if (month.Month == DateTime.Now.Month)
                            {
                                month = month.AddMonths(-1);
                            }
                        }
                    }
                }

                //var isSubmit = await _dataServiceClient.MyTeamsSubmitHours(month);
                var isSubmit = false;

                var requestUrl =_timeTrackerOptions.SubmitTeamHours;
                dynamic requestObject = new JObject();
                requestObject.selDate = month.ToString();
                requestObject.notificationMsgBody = _sharedLocalizer.GetLocalizedHtmlString("NotSubmitTeamHours") + " " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month.Month);
                string json = JsonConvert.SerializeObject(requestObject);

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                using (HttpClient client = new HttpClient())
                {
                    string ObjectIdentifierType = _timeTrackerOptions.ObjectIdentifier;
                    var identifier = User.FindFirst(ObjectIdentifierType).Value;
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("ObjectIdentifierType", identifier);

                    using (HttpResponseMessage httpResponse = client.PostAsync(requestUrl, content).Result)
                    {
                        isSubmit = httpResponse.IsSuccessStatusCode;
                    }
                }

                if (isSubmit)
				{
					response = new
					{
                        submittedOnDate = DateTime.Now.Date.ToString("MM/dd/yy H:mm:ss"),
                        responseCode = 200,
					};
                    return Json(response);
                }
                else
                {
                    response = new
                    {
                        responseCode = -999,

                    };
                    return Json(response);
                }
                
			}
			else
			{
				response = new
				{
					responseCode = -999,
					
				};
				return Json(response);
			}
		}


		public Dictionary<string,Int32> SplitHrMin(string str)
        {
            Dictionary<string, int> hrMin = new Dictionary<string, int>();
              var  splitStr=  str.Split(';').Select(x => x.Split(':'));
            hrMin.Add("hr", Convert.ToInt32(splitStr.FirstOrDefault()[0]));
            hrMin.Add("min", Convert.ToInt32(splitStr.FirstOrDefault()[1]));

            return hrMin;
        }
       
    }
        
}
