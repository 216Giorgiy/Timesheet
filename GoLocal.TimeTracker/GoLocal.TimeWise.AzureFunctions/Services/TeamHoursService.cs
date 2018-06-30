// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using GoLocal.TimeWise.AzureFunctions.Repository;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class TeamHoursService : GraphAppServiceBase, IViewModelService<TeamHoursViewModel>
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly TeamHoursRepository _teamHoursRepository;
        private ListCollectionPage<TeamHours> _listCollectionPage;

        public TeamHoursService(
              IGraphAuthProvider authProvider,GraphAppSharePointService graphAppSharePointService,
            IUserContext userContext,
             TimeTrackerOptions timeTrackerOptions, TeamHoursRepository teamHoursRepository) : base(authProvider, userContext)
            {
                
                _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
                _teamHoursRepository = teamHoursRepository ?? throw new ArgumentNullException(nameof(teamHoursRepository));
            }

    public async Task<TeamHoursViewModel> GetViewModel(DateTime date, int pageIndex = 1, int pageSize = 10)
        {
            var ci = System.Threading.Thread.CurrentThread.CurrentCulture;
            bool userSubmitted = false;
            bool mgrSubmitted = false;
            bool submitToHR = false;
            try
            {
                if (_listCollectionPage == null) _listCollectionPage = await _teamHoursRepository.GetItemsAsync(date, pageSize);

                // Exit from search
                //if (!String.IsNullOrEmpty(_listCollectionPage.SearchQuery)) _listCollectionPage = await _teamHoursRepository.GetItemsAsync(date, pageSize);

                // Check to see if a new date is being requested
                if (_listCollectionPage.QueryDate != date.ToString("yyyyMM")) _listCollectionPage = await _teamHoursRepository.GetItemsAsync(date, pageSize);

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
                //var saveResults = await _graphSharePointService.CreateSiteListItemAsync(analyticsSiteList, dailyOTHoursRootObject.ToString());
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
                    ConcurrentDictionary<string, short> hrsMins = new ConcurrentDictionary<string, short>();

                    //call to get Final hours for ReportHours Repository data
                    hrsMins = HoursComputeHelper.GetFinalTeamHrsMins(item);
                    var AdjustedHours = hrsMins["FinalTotalHrs"];
                    var AdjustedMinutes = hrsMins["FinalTotalMins"];

                    string status = "";
                    string actionLinks = "";
                    if (item.Fields.TeamHoursItemState.ToString() == ItemState.Submitted.ToString())
                    {
                        mgrSubmitted = true;
                        status = item.Fields.ItemState.ToString();
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.Submitted.ToString())
                    {
                        userSubmitted = true;
                        status = item.Fields.ItemState.ToString();
                        actionLinks += "<span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.RequiresRevision.ToString())
                    {
                        status = "Requires Revision";
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.NotSubmitted.ToString())
                    {
                        status = "Not Submitted";
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.SubmittedBySystem.ToString())
                    {
                        userSubmitted = true;
                        status = "Submitted By System";
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
                        ComputedHours = computedHours + "h " + computedMinutes + "m",
                        AdjustedHours = AdjustedHours + "h " + AdjustedMinutes + "m",
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
                    ConcurrentDictionary<string, short> hrsMins = new ConcurrentDictionary<string, short>();

                    //call to get Final hours for ReportHours Repository data
                    hrsMins = HoursComputeHelper.GetFinalTeamHrsMins(item);
                    var AdjustedHours = hrsMins["FinalTotalHrs"];
                    var AdjustedMinutes = hrsMins["FinalTotalMins"];

                    string status = "";
                    string actionLinks = "";
                    if (item.Fields.TeamHoursItemState.ToString() == ItemState.Submitted.ToString())
                    {
                        mgrSubmitted = true;
                        status = item.Fields.ItemState.ToString();
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.Submitted.ToString())
                    {
                        userSubmitted = true;
                        status = item.Fields.ItemState.ToString();
                        actionLinks += "<span class='recheckHrs'> <i class='ms-Icon ms-Icon--DelveAnalytics font20 Pointer' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.RequiresRevision.ToString())
                    {
                        status = "Requires Revision";
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.NotSubmitted.ToString())
                    {
                        status = "Not Submitted";
                        actionLinks += "<span class='recheckHrs icon-noaction'> <i class='ms-Icon ms-Icon--DelveAnalytics font20' title='Request Revision'></i></span>";
                    }
                    else if (item.Fields.ItemState.ToString() == ItemState.SubmittedBySystem.ToString())
                    {
                        userSubmitted = true;
                        status = "Submitted By System";
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
                        ComputedHours = ComputedHours + "h " + ComputedMinutes + "m",
                        AdjustedHours = AdjustedHours + "h " + AdjustedMinutes + "m",
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
            }
        }

        public async Task EditHours()
        {
            try
            {

            }
            catch (Exception ex)
            {
            }
        }

        public async Task SubmitHours()
        {
            try
            {

            }
            catch (Exception ex)
            {
            }
        }
    }
}
