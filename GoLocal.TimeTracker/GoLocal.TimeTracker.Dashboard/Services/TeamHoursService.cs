// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.Dashboard.Interfaces;
using GoLocal.TimeTracker.MiddleTier.Repositories;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Services;
using System.Globalization;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.Services.Helpers;
using GoLocal.TimeTracker.Dashboard.Resources;

namespace GoLocal.TimeTracker.Dashboard.Services
{
    /// <summary>
    /// This is a UI-specific service so belongs in UI project. It does not contain any business logic and works
    /// with UI-specific types (view models, SelectListItem types, etc.).
    /// </summary>
    public class TeamHoursService : IViewModelService<TeamHoursViewModel>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly IRepository<TeamHours> _teamHoursRepository;
        private ListCollectionPage<TeamHours> _listCollectionPage;
		private readonly LocService _sharedLocalizer;

		public TeamHoursService(
            ILogger<TeamHoursService> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            IRepository<UserProfile> userProfileRepository,
            IRepository<TeamHours> teamHoursRepository,
			LocService sharedLocalizer)
		{
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _teamHoursRepository = teamHoursRepository ?? throw new ArgumentNullException(nameof(teamHoursRepository));
			_sharedLocalizer = sharedLocalizer ;
		}

        public async Task<TeamHoursViewModel> GetViewModel(DateTime date, int pageIndex = 1, int pageSize = 10)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;
            bool userSubmitted = false;
            bool mgrSubmitted = false;
            bool submitToHR = false;
            try
            {
                if (_listCollectionPage == null)  _listCollectionPage = await _teamHoursRepository.GetItemsAsync(date, pageSize);

                // Exit from search
                //if (!String.IsNullOrEmpty(_listCollectionPage.SearchQuery)) _listCollectionPage = await _teamHoursRepository.GetItemsAsync(date, pageSize);

                // Check to see if a new date is being requested
                if (_listCollectionPage.QueryDate != date.ToString("yyyyMM")) _listCollectionPage = await _teamHoursRepository.GetItemsAsync(date, pageSize);

                if ((pageIndex -_listCollectionPage.CurrentPageIndex) == 1)
                {
                    // Move next
                    _listCollectionPage = await _teamHoursRepository.GetNextItemsAsync(_listCollectionPage);
                }
                else if ((_listCollectionPage.CurrentPageIndex - pageIndex) == 1)
                {
                    // Move previous
                    _listCollectionPage = await _teamHoursRepository.GetPreviousItemsAsync(_listCollectionPage);
                }
                else if (pageIndex > 2)  // Increment until we find the correct page.
                {
                    while (_listCollectionPage.CurrentPageIndex < pageIndex)
                    {
                        _listCollectionPage = await _teamHoursRepository.GetNextItemsAsync(_listCollectionPage);
                    }
                }

                // Create the DataTable
                MyTeamDataTableData dataTableData = new MyTeamDataTableData();

                List<TeamHoursListData> th = new List<TeamHoursListData>();
                foreach (var item in _listCollectionPage.DataList)
                {
                    var computedHours = item.Fields.EmailHours + item.Fields.MeetingHours + item.Fields.OtherHours +
                    ((item.Fields.EmailMinutes + item.Fields.MeetingMinutes + item.Fields.OtherMinutes) / 60);
                    var computedMinutes = (item.Fields.EmailMinutes + item.Fields.MeetingMinutes + item.Fields.OtherMinutes) % 60;
					/*
					var AdjustedHours = item.Fields.EmailAdjustedHours + item.Fields.MeetingAdjustedHours + item.Fields.OtherAdjustedHours +
					((item.Fields.EmailAdjustedMinutes + item.Fields.MeetingAdjustedMinutes + item.Fields.OtherAdjustedMinutes) / 60);
					var AdjustedMinutes = (item.Fields.EmailAdjustedMinutes + item.Fields.MeetingAdjustedMinutes + item.Fields.OtherAdjustedMinutes) % 60;
					*/
					Dictionary<string, short> hrsMins = new Dictionary<string, short>();

					//call to get Final hours for ReportHours Repository data
					hrsMins = HoursComputeHelper.GetFinalTeamHrsMins(item);
					var AdjustedHours = hrsMins["FinalTotalHrs"];
					var AdjustedMinutes = hrsMins["FinalTotalMins"];
				
					string status = "";
                    string actionLinks = "";
                    if(item.Fields.TeamHoursItemState.ToString() == ItemState.Submitted.ToString())
                    {
                        mgrSubmitted = true;

						//status = item.Fields.ItemState.ToString();
						status = _sharedLocalizer.GetLocalizedHtmlString("Submitted");
						
						
						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='" + _sharedLocalizer.GetLocalizedHtmlString("RequestRevision") + "'></i></span>";
                    }
                    else if(item.Fields.ItemState.ToString() == ItemState.Submitted.ToString())
                    {
                        userSubmitted = true;
                        //status = item.Fields.ItemState.ToString();
						status = _sharedLocalizer.GetLocalizedHtmlString("Submitted");
						actionLinks += "<span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer' title='" + _sharedLocalizer.GetLocalizedHtmlString("RequestRevision") + "'></i></span>";
                    }else if (item.Fields.ItemState.ToString() == ItemState.RequiresRevision.ToString())
                    {
                        //status = "Requires Revision";
						status = _sharedLocalizer.GetLocalizedHtmlString("RequiresRevision");
						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='" + _sharedLocalizer.GetLocalizedHtmlString("NoAction") + "'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.NotSubmitted.ToString())
                    {
                        status = "Not Submitted";
						status = _sharedLocalizer.GetLocalizedHtmlString("NotSubmitted");
						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='" + _sharedLocalizer.GetLocalizedHtmlString("NoAction") + "'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.SubmittedBySystem.ToString())
                    {
                        userSubmitted = true;
                        status = "Submitted By System";
						status = _sharedLocalizer.GetLocalizedHtmlString("SubmittedBySystem");
						actionLinks += "<span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer' title='" + _sharedLocalizer.GetLocalizedHtmlString("RequestRevision") + "'></i></span>";
                    }
                    else
                    {
                        status = item.Fields.ItemState.ToString();
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='" + _sharedLocalizer.GetLocalizedHtmlString("NoAction") + "'></i></span>";
                    }

                    if(userSubmitted && !mgrSubmitted)  // Enable Submit Button.
                    {
                        submitToHR = true;
                    }

                    // reset the 2 local variables - never reset submitToHR.
                    userSubmitted = false;
                    mgrSubmitted = false;

                    var t = new TeamHoursListData
                    {
                        Name = item.Fields.DisplayName,
                        ComputedHours = computedHours + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + computedMinutes + _sharedLocalizer.GetLocalizedHtmlString("minute"),
                        AdjustedHours = AdjustedHours + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + AdjustedMinutes + _sharedLocalizer.GetLocalizedHtmlString("minute"),                 
                        ObjectIdentifier = item.Fields.ObjectIdentifier,
                        Status = status,
                        Action = actionLinks,
                        Id = item.Id,
                        Date = item.Fields.Date,
						SubmittedDate = item.Fields.TeamHoursSubmittedDate
					};
                    th.Add(t);
                }

                dataTableData.recordsTotal = (pageIndex * pageSize) + th.Count + 1;
                int recordsFiltered = (pageIndex * pageSize) + th.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;
                dataTableData.data = th;
                dataTableData.SubmittedDate = (dataTableData.data.Exists(x => x.SubmittedDate != DateTime.MinValue) ? dataTableData.data.FirstOrDefault().SubmittedDate.ToShortDateString() : DateTime.MinValue.ToShortDateString());
                //dataTableData.SubmitEnable = (dataTableData.data.Exists(x => x.SubmittedDate == DateTime.MinValue) ? true : false);
                dataTableData.SubmitEnable = (dataTableData.data.Exists(x => x.Status == ItemState.Submitted.ToString()) ? true : false);
                dataTableData.SubmitToHR = submitToHR;

                var teamHoursViewModel = new TeamHoursViewModel
                {
                    MyTeamDataTableData = dataTableData,
                    RequestRevision = "is-disabled",
                    EditTeamHours = "is-disabled",
                };

               return teamHoursViewModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting the team hours view model: " + ex.Message);
                return new TeamHoursViewModel();
            }
        }

        public async Task<TeamHoursViewModel> GetSearchResults(DateTime date, string searchQuery, int pageIndex = 1, int pageSize = 10)
        {
            bool userSubmitted = false;
            bool mgrSubmitted = false;
            bool submitToHR = false;
            try
            {
                if (_listCollectionPage == null) _listCollectionPage = await _teamHoursRepository.GetSearchResultsAsync(date, searchQuery, pageSize);

                // reset search if this is a different search
                //if (!String.IsNullOrEmpty(_listCollectionPage.SearchQuery) && _listCollectionPage.SearchQuery != searchQuery) _listCollectionPage = await _teamHoursRepository.GetSearchResultsAsync(date, searchQuery, pageSize);

                // Check to see if a new date is being requested
                if (_listCollectionPage.QueryDate != date.ToString("yyyyMM")) _listCollectionPage = await _teamHoursRepository.GetSearchResultsAsync(date, searchQuery, pageSize);

                if ((pageIndex - _listCollectionPage.CurrentPageIndex) == 1)
                {
                    // Move next
                    _listCollectionPage = await _teamHoursRepository.GetNextItemsAsync(_listCollectionPage);
                }
                else if ((_listCollectionPage.CurrentPageIndex - pageIndex) == 1)
                {
                    // Move previous
                    _listCollectionPage = await _teamHoursRepository.GetPreviousItemsAsync(_listCollectionPage);
                }
                else if (pageIndex > 2)  // Increment until we find the correct page.
                {
                    while (_listCollectionPage.CurrentPageIndex < pageIndex)
                    {
                        _listCollectionPage = await _teamHoursRepository.GetNextItemsAsync(_listCollectionPage);
                    }
                }

                // Create the DataTable
                MyTeamDataTableData dataTableData = new MyTeamDataTableData();

                List<TeamHoursListData> th = new List<TeamHoursListData>();
                foreach (var item in _listCollectionPage.DataList)
                {
                    var ComputedHours = item.Fields.EmailHours + item.Fields.MeetingHours + item.Fields.OtherHours +
                    ((item.Fields.EmailMinutes + item.Fields.MeetingMinutes + item.Fields.OtherMinutes) / 60);
                    var ComputedMinutes = (item.Fields.EmailMinutes + item.Fields.MeetingMinutes + item.Fields.OtherMinutes) % 60;
 					/*
					var AdjustedHours = item.Fields.EmailAdjustedHours + item.Fields.MeetingAdjustedHours + item.Fields.OtherAdjustedHours +
					((item.Fields.EmailAdjustedMinutes + item.Fields.MeetingAdjustedMinutes + item.Fields.OtherAdjustedMinutes) / 60);
					var AdjustedMinutes = (item.Fields.EmailAdjustedMinutes + item.Fields.MeetingAdjustedMinutes + item.Fields.OtherAdjustedMinutes) % 60;
					*/
					Dictionary<string, short> hrsMins = new Dictionary<string, short>();

					//call to get Final hours for ReportHours Repository data
					hrsMins = HoursComputeHelper.GetFinalTeamHrsMins(item);
					var AdjustedHours = hrsMins["FinalTotalHrs"];
					var AdjustedMinutes = hrsMins["FinalTotalMins"];

					string status = "";
                    string actionLinks = "";
					if (item.Fields.TeamHoursItemState.ToString() == ItemState.Submitted.ToString())
					{
						mgrSubmitted = true;

						//status = item.Fields.ItemState.ToString();
						status = _sharedLocalizer.GetLocalizedHtmlString("Submitted");

						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
					}
					else if (item.Fields.ItemState.ToString() == ItemState.Submitted.ToString())
					{
						userSubmitted = true;
						//status = item.Fields.ItemState.ToString();
						status = _sharedLocalizer.GetLocalizedHtmlString("Submitted");
						actionLinks += "<span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer' title='Request Revision'></i></span>";
					}
					else if (item.Fields.ItemState.ToString() == ItemState.RequiresRevision.ToString())
					{
						//status = "Requires Revision";
						status = _sharedLocalizer.GetLocalizedHtmlString("RequiresRevision");
						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
					}
					else if (item.Fields.ItemState.ToString() == ItemState.NotSubmitted.ToString())
					{
						status = "Not Submitted";
						status = _sharedLocalizer.GetLocalizedHtmlString("NotSubmitted");
						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
					}
					else if (item.Fields.ItemState.ToString() == ItemState.SubmittedBySystem.ToString())
					{
						userSubmitted = true;
						status = "Submitted By System";
						status = _sharedLocalizer.GetLocalizedHtmlString("SubmittedBySystem");
						actionLinks += "<span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer' title='Request Revision'></i></span>";
					}
					else
					{
						status = item.Fields.ItemState.ToString();
						actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
					}


					if (userSubmitted && !mgrSubmitted)  // Enable Submit Button.
                    {
                        submitToHR = true;
                    }

                    // reset the 2 local variables - never reset submitToHR.
                    userSubmitted = false;
                    mgrSubmitted = false;

                    var t = new TeamHoursListData
                    {
                        Name = item.Fields.DisplayName,
						ComputedHours = ComputedHours + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + ComputedMinutes + _sharedLocalizer.GetLocalizedHtmlString("minute"),
						AdjustedHours = AdjustedHours + _sharedLocalizer.GetLocalizedHtmlString("hour") + " " + AdjustedMinutes + _sharedLocalizer.GetLocalizedHtmlString("minute"),
						ObjectIdentifier = item.Fields.ObjectIdentifier,
                        Status = status,
                        Action = actionLinks,
                        Id = item.Id,
                        Date = item.Fields.Date,
						SubmittedDate = item.Fields.TeamHoursSubmittedDate
					};
                    th.Add(t);
                }

                dataTableData.recordsTotal = (pageIndex * pageSize) + th.Count + 1;
                int recordsFiltered = (pageIndex * pageSize) + th.Count + 1;

                dataTableData.recordsFiltered = recordsFiltered;
                dataTableData.data = th;
                dataTableData.SubmittedDate = (dataTableData.data.Exists(x => x.SubmittedDate != DateTime.MinValue) ? dataTableData.data.FirstOrDefault().SubmittedDate.ToShortDateString() : DateTime.MinValue.ToShortDateString());
                dataTableData.SubmitEnable = (dataTableData.data.Exists(x => x.SubmittedDate == DateTime.MinValue) ? true : false);
                dataTableData.SubmitToHR = submitToHR;

                var teamHoursViewModel = new TeamHoursViewModel
                {
                    MyTeamDataTableData = dataTableData,
                    RequestRevision = "is-disabled",
                    EditTeamHours = "is-disabled",
                };

                return teamHoursViewModel;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting the team hours view model: " + ex.Message);
                return new TeamHoursViewModel();
            }
        }

        public async Task RequestRevision()
        {
            try
            {
                
            }
            catch (Exception ex)
            {
                _logger.LogError("Error requesting a team hours revisionin the team hours service: " + ex.Message);
            }
        }

        public async Task EditHours()
        {
            try
            {

            }
            catch (Exception ex)
            {
                _logger.LogError("Error requesting a team hours revisionin the team hours service: " + ex.Message);
            }
        }

        public async Task SubmitHours()
        {
            try
            {

            }
            catch (Exception ex)
            {
                _logger.LogError("Error requesting a team hours revisionin the team hours service: " + ex.Message);
            }
        }
    }
}
