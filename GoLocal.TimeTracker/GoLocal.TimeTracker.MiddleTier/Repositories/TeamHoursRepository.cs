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
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Services;
using System.Globalization;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;

namespace GoLocal.TimeTracker.MiddleTier.Repositories
{
    /// <summary>
    /// This is the team hours repository
    /// </summary>
    public class TeamHoursRepository : IRepository<TeamHours>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IUserContext _userContext;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly GraphAppCalendarService _graphCalendarService;
        private readonly GraphAppTasksService _graphTasksService;
        private readonly GraphAppMailService _graphMailService;
        private readonly IWorkflowService<WorkHours> _workHoursWorkflowService;
        private readonly ICacheService<ListCollectionPage<TeamHours>> _teamHoursCache;
        private readonly ICacheService<ListCollectionPage<GraphResultItem>> _directReportsCache;
        private List<TeamHours> _teamHoursDataList;


        public TeamHoursRepository(
            ILogger<TeamHoursRepository> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            IUserContext userContext,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            GraphAppCalendarService graphCalendarService,
            GraphAppTasksService graphTasksService,
            GraphAppMailService graphMailService,
            IWorkflowService<WorkHours> workHoursWorkflowService,
            ICacheService<ListCollectionPage<TeamHours>> teamHoursCache,
            ICacheService<ListCollectionPage<GraphResultItem>> directReportsCache)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _graphCalendarService = graphCalendarService ?? throw new ArgumentNullException(nameof(graphCalendarService));
            _graphTasksService = graphTasksService ?? throw new ArgumentNullException(nameof(graphTasksService));
            _graphMailService = graphMailService ?? throw new ArgumentNullException(nameof(graphMailService));
            _workHoursWorkflowService = workHoursWorkflowService ?? throw new ArgumentNullException(nameof(workHoursWorkflowService));
            _teamHoursCache = teamHoursCache ?? throw new ArgumentNullException(nameof(teamHoursCache));
            _directReportsCache = directReportsCache ?? throw new ArgumentNullException(nameof(directReportsCache));

            _teamHoursDataList = new List<TeamHours>();
        }


        public async Task<IEnumerable<TeamHours>> GetItemsAsync(DateTime date)
        {
            try
            {
                var teamHoursList = new List<TeamHours>();

                var getItemsResults = await GetItemsAsync(date, 50);
                while (getItemsResults != null)
                {
                    teamHoursList.AddRange(getItemsResults.DataList);
                    getItemsResults = await GetNextItemsAsync(getItemsResults);
                }

                return teamHoursList;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetItemsAsync(DateTime date, int pageSize = 10)
        {
            try
            {
                // Get the user object identifier
                var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;

                // Try fetching the data from cache
                var cacheKey = "1_" + userObjectIdentifier + date.ToString("yyyyMM");
                var listCollectionPage = new ListCollectionPage<TeamHours>();
                //var cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                //if (cacheEntry != null)
                //{
                //    if (String.IsNullOrEmpty(cacheEntry.SearchQuery)) return cacheEntry;
                //    await _teamHoursCache.ClearCacheAsync("_" + userObjectIdentifier + date.ToString("yyyyMM"));
                //}

                // Data set not found in cache, get from backend
                listCollectionPage = await GetItemsResultsAsync(date, pageSize, String.Empty);

                // Save to cache
                await _teamHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetNextItemsAsync(ListCollectionPage<TeamHours> listCollectionPage)
        {
            try
            {
                // Try fetching the data from cache
                listCollectionPage.CurrentPageIndex++;
                var cacheKey = listCollectionPage.CurrentPageIndex.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                var cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null) return cacheEntry;
                if (String.IsNullOrEmpty(listCollectionPage.SkipToken)) return null; // No more entries TODO: process not submitted

                // TeamHours entry not in cache
                listCollectionPage.DataList = new List<TeamHours>();

                // Get all Team hours for the date if not in memory
                if (_teamHoursDataList?.Count == 0)
                {
                    var teamHoursResults = await _graphSharePointService.GetSiteListItemsAsync(listCollectionPage.SiteList, listCollectionPage.QueryDate);

                    foreach (var teamHoursItem in teamHoursResults)
                    {
                        var teamHoursFields = ConvertToTeamHours(teamHoursItem);

                        var userInfo = await _graphUserService.GetUserBasicAsync(teamHoursFields.ObjectIdentifier);
                        teamHoursFields.DisplayName = userInfo.DisplayName ?? "";

                        _teamHoursDataList.Add(new TeamHours
                        {
                            Id = teamHoursItem.Id,
                            ListId = listCollectionPage.SiteList.ListId,
                            Fields = teamHoursFields
                        });
                    }
                }

                // Call graph for direct reports next page
                var directReports = await _graphUserService.GetUserDirectReportsAsync(listCollectionPage.ObjectIdentifier, listCollectionPage.SkipToken, listCollectionPage.PageSize);
                listCollectionPage.SkipToken = directReports.SkipToken;


                var teamHoursDataList = new List<TeamHours>();
                foreach (var item in directReports.DataList)
                {
                    var teamHoursId = String.Empty;

                    var teamHoursFields = new TeamHoursFields
                    {
                        ObjectIdentifier = item.Id,
                        Date = listCollectionPage.QueryDate,
                        ItemState = ItemState.NotSubmitted,
                        TeamHoursItemState = ItemState.NotSubmitted
                    };

                    foreach (var teamHoursItem in _teamHoursDataList)
                    {
                        if (teamHoursItem.Fields.ObjectIdentifier == item.Id)
                        {
                            teamHoursId = teamHoursItem.Id;
                            teamHoursFields = teamHoursItem.Fields;
                        }
                    }

                    if (String.IsNullOrEmpty(teamHoursFields.DisplayName))
                    {
                        var userInfo = await _graphUserService.GetUserBasicAsync(teamHoursFields.ObjectIdentifier);
                        teamHoursFields.DisplayName = userInfo.DisplayName ?? "";
                    }

                    teamHoursDataList.Add(new TeamHours
                    {
                        Id = teamHoursId,
                        ListId = listCollectionPage.SiteList.ListId,
                        Fields = teamHoursFields
                    });
                }

                listCollectionPage.DataList = teamHoursDataList;

                // Save to cache
                await _teamHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetPreviousItemsAsync(ListCollectionPage<TeamHours> listCollectionPage)
        {
            try
            {
                // Try fetching the data from cache
                listCollectionPage.CurrentPageIndex--;
                //if (listCollectionPage.CurrentPageIndex > 1) listCollectionPage.CurrentPageIndex--;
                var cacheKey = listCollectionPage.CurrentPageIndex.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                var cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null) return cacheEntry;
                if (String.IsNullOrEmpty(listCollectionPage.SkipToken)) return null; // No more entries TODO: process not submitted

                // TeamHours entry not in cache TODO: Should not get to here unless no distributed cache so different logic to re-create previous

                listCollectionPage.SkipToken = "";

                listCollectionPage.DataList = new List<TeamHours>();

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetPageItemsAsync(ListCollectionPage<TeamHours> listCollectionPage, int page = 1)
        {
            try
            {
                // Try fetching the data from cache
                var cacheKey = page.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                var cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null) return cacheEntry;

                if (cacheEntry.CurrentPageIndex > page && !String.IsNullOrEmpty(listCollectionPage.SkipToken))
                {
                    var currentPage = cacheEntry.CurrentPageIndex;
                    while (currentPage < page)
                    {
                        var moveResults = await GetNextItemsAsync(listCollectionPage);
                        if (moveResults != null)
                        {
                            if (moveResults.CurrentPageIndex == page) return moveResults;
                            currentPage = moveResults.CurrentPageIndex;
                        }

                        if (currentPage < page && String.IsNullOrEmpty(moveResults.SkipToken)) break;
                    }

                    return null;
                }
                else
                {
                    return null; // No pages exists for provided index
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize = 10)
        {
            try
            {
                if (String.IsNullOrEmpty(searchQuery)) return await GetItemsAsync(date, pageSize);

                // Set the cap for search results
                var searchMaxResults = 100;

                var siteList = new SiteList();

                // Get the user object identifier
                var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;

                // Try fetching the first cache entry
                var cacheKey = "1_" + userObjectIdentifier + date.ToString("yyyyMM");
                var listCollectionPage = new ListCollectionPage<TeamHours>();
                var cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null && cacheEntry.SearchQuery != searchQuery && !String.IsNullOrEmpty(cacheEntry.SearchQuery))
                {
                    // Different search so clear cache to start new search
                    await _teamHoursCache.ClearCacheAsync("_" + userObjectIdentifier + date.ToString("yyyyMM"));
                    cacheEntry = null;
                }

                var teamHoursList = new List<TeamHours>();

                // Search for matches in entries from cache and add to teamHoursList
                string lowerSearchQuery = searchQuery.ToLowerInvariant();
                var cacheIndex = 1;
                while (cacheEntry != null)
                {
                    siteList = cacheEntry.SiteList;
                    cacheIndex ++;
                    teamHoursList.AddRange(cacheEntry.DataList.Select(x => x).Where(s => s.Fields.DisplayName.ToLowerInvariant().Contains(lowerSearchQuery)));
                    cacheKey = cacheIndex.ToString() + "_" + userObjectIdentifier + date.ToString("yyyyMM");
                    cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);
                }

                // At least 1 entry found in cache, keep getting next until we have 50 search results or there are no more records
                if (cacheIndex > 1)
                {
                    // Get last cache entry
                    cacheIndex --;
                    cacheKey = cacheIndex.ToString() + "_" + userObjectIdentifier + date.ToString("yyyyMM");
                    cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);
                }

                var nextItems = cacheEntry;
                if (nextItems == null && teamHoursList?.Count == 0)
                {
                    nextItems = await GetItemsResultsAsync(date, pageSize, searchQuery);
                    teamHoursList.AddRange(nextItems.DataList.Select(x => x).Where(s => s.Fields.DisplayName.ToLowerInvariant().Contains(lowerSearchQuery)));
                    siteList = nextItems.SiteList;
                }

                while (!String.IsNullOrEmpty(nextItems.SkipToken) && teamHoursList?.Count < searchMaxResults)
                {
                    nextItems = await GetNextItemsAsync(cacheEntry);
                    siteList = nextItems.SiteList;
                    teamHoursList.AddRange(nextItems.DataList.Select(x => x).Where(s => s.Fields.DisplayName.ToLowerInvariant().Contains(lowerSearchQuery)));
                }

                // Re-create the cache with the search results
                if (teamHoursList?.Count > 0)
                {
                    // First clear cache
                    await _teamHoursCache.ClearCacheAsync("_" + userObjectIdentifier + date.ToString("yyyyMM"));

                    listCollectionPage = new ListCollectionPage<TeamHours>();
                    listCollectionPage.QueryDate = date.ToString("yyyyMM");
                    listCollectionPage.ObjectIdentifier = userObjectIdentifier;
                    listCollectionPage.CurrentPageIndex = 1;
                    listCollectionPage.PageSize = pageSize;
                    listCollectionPage.SearchQuery = searchQuery;
                    listCollectionPage.SiteList = siteList;
                    listCollectionPage.DataList = new List<TeamHours>();

                    var pageSizeCounter = 0;
                    foreach (var item in teamHoursList)
                    {
                        if (!String.IsNullOrEmpty(item.Fields.ObjectIdentifier)) // Avoid failing when TeamHours list is corrupt
                        {
                            listCollectionPage.DataList.Add(item);
                            pageSizeCounter++;
                            if (pageSizeCounter == pageSize || pageSizeCounter == teamHoursList.Count)
                            {
                                cacheKey = listCollectionPage.CurrentPageIndex.ToString() + "_" + userObjectIdentifier + date.ToString("yyyyMM");
                                await _teamHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);
                                listCollectionPage.CurrentPageIndex++;
                            }
                        }
                        else
                        {
                            _logger.LogWarning("TeamHours List contains a record with empty ObjectIdentifier");
                        }
                    }

                    cacheKey = "1_" + userObjectIdentifier + date.ToString("yyyyMM");
                    return await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        // Private methods

        private async Task<ListCollectionPage<TeamHours>> GetItemsResultsAsync(DateTime date, int pageSize, string searchQuery = "")
        {
            try
            {
                // Get the user object identifier
                var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;

                // Prepare call to graph to fetch teamhours records from SharePoint

                var listCollectionPage = new ListCollectionPage<TeamHours>();
                listCollectionPage.QueryDate = date.ToString("yyyyMM");
                listCollectionPage.ObjectIdentifier = userObjectIdentifier;
                listCollectionPage.CurrentPageIndex = 1;
                listCollectionPage.PageSize = pageSize;
                listCollectionPage.SearchQuery = searchQuery;
                listCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.TeamHoursListSchema);

                // Get the direct reports of the manager (paged)
                var directReports = await _graphUserService.GetUserDirectReportsAsync(userObjectIdentifier, String.Empty, pageSize);
                listCollectionPage.SkipToken = directReports.SkipToken;

                // Get all Team hours for the date
                if (_teamHoursDataList?.Count == 0 || _teamHoursDataList[0].Fields.Date != date.ToString("yyyyMM"))
                { 
                    var teamHoursResults = await _graphSharePointService.GetSiteListItemsAsync(listCollectionPage.SiteList, date.ToString("yyyyMM"));

                    foreach (var teamHoursItem in teamHoursResults)
                    {
                        var teamHoursFields = ConvertToTeamHours(teamHoursItem);

                        var userInfo = await _graphUserService.GetUserBasicAsync(teamHoursFields.ObjectIdentifier);
                        teamHoursFields.DisplayName = userInfo.DisplayName ?? "";

                        _teamHoursDataList.Add(new TeamHours
                        {
                            Id = teamHoursItem.Id,
                            ListId = listCollectionPage.SiteList.ListId,
                            Fields = teamHoursFields
                        });
                    }
                }

                var teamHoursDataList = new List<TeamHours>();
                foreach (var item in directReports.DataList)
                {
                    var teamHoursId = String.Empty;

                    var teamHoursFields = new TeamHoursFields
                    {
                        ObjectIdentifier = item.Id,
                        Date = date.ToString("yyyyMM"),
                        ItemState = ItemState.NotSubmitted,
                        TeamHoursItemState = ItemState.NotSubmitted
                    };

                    foreach (var teamHoursItem in _teamHoursDataList)
                    {
                        if (teamHoursItem.Fields.ObjectIdentifier == item.Id)
                        {
                            teamHoursId = teamHoursItem.Id;
                            teamHoursFields = teamHoursItem.Fields;
                        }
                    }

                    if (String.IsNullOrEmpty(teamHoursFields.DisplayName))
                    {
                        var userInfo = await _graphUserService.GetUserBasicAsync(teamHoursFields.ObjectIdentifier);
                        teamHoursFields.DisplayName = userInfo.DisplayName ?? "";
                    }

                    teamHoursDataList.Add(new TeamHours
                    {
                        Id = teamHoursId,
                        ListId = listCollectionPage.SiteList.ListId,
                        Fields = teamHoursFields
                    });
                }

                listCollectionPage.DataList = teamHoursDataList;

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        private async Task<IList<TeamHours>> AddItemsToDataListAsync(IList<GraphResultItem> graphResults, string listId)
        {
            try
            {
                var resultsList = new List<TeamHours>();

                foreach (var item in graphResults)
                {
                    var teamHoursFields = ConvertToTeamHours(item);
                    teamHoursFields.ObjectIdentifier = item.Properties["ObjectIdentifier"].ToString();
                    var userBasicInfo = await _graphUserService.GetUserBasicAsync(teamHoursFields.ObjectIdentifier);
                    teamHoursFields.DisplayName = userBasicInfo.DisplayName;

                    resultsList.Add(new TeamHours
                    {
                        Id = item.Id,
                        ListId = listId,
                        Fields = teamHoursFields
                    });
                }

                return resultsList;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting team hour items in repository: " + ex.Message);
                throw;
            }
        }

        private TeamHoursFields ConvertToTeamHours(GraphResultItem graphResultsItem)
        {
            try
            {
                var teamHoursFields = new TeamHoursFields();
                object objectValue;

                if (graphResultsItem.Properties.TryGetValue("ObjectIdentifier", out objectValue)) teamHoursFields.ObjectIdentifier = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("Date", out objectValue)) teamHoursFields.Date = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("MeetingHours", out objectValue)) teamHoursFields.MeetingHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingMinutes", out objectValue)) teamHoursFields.MeetingMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingAdjustedHours", out objectValue)) teamHoursFields.MeetingAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingAdjustedMinutes", out objectValue)) teamHoursFields.MeetingAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailHours", out objectValue)) teamHoursFields.EmailHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailMinutes", out objectValue)) teamHoursFields.EmailMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailAdjustedHours", out objectValue)) teamHoursFields.EmailAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailAdjustedMinutes", out objectValue)) teamHoursFields.EmailAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherHours", out objectValue)) teamHoursFields.OtherHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherMinutes", out objectValue)) teamHoursFields.OtherMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherAdjustedHours", out objectValue)) teamHoursFields.OtherAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherAdjustedMinutes", out objectValue)) teamHoursFields.OtherAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("AdjustedHoursReason", out objectValue)) teamHoursFields.AdjustedHoursReason = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("TeamHoursItemState", out objectValue)) teamHoursFields.TeamHoursItemState = (ItemState)Enum.Parse(typeof(ItemState), objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("TeamHoursSubmittedDate", out objectValue)) teamHoursFields.TeamHoursSubmittedDate = Convert.ToDateTime(objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("ItemState", out objectValue)) teamHoursFields.ItemState = (ItemState)Enum.Parse(typeof(ItemState), objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("SubmittedDate", out objectValue)) teamHoursFields.SubmittedDate = Convert.ToDateTime(objectValue.ToString());

                return teamHoursFields;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error converting team hours items in repository: " + ex.Message);
                throw;
            }
        }


        #region Not implemented

        public async Task SaveItemAsync(TeamHours modelData)
        {
            throw new NotImplementedException();
        }

        public async Task<TeamHours> GetItemAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<TeamHours> GetItemAsync(string itemId)
        {
            throw new NotImplementedException();
        }

        public async Task<TeamHours> GetItemAsync(DateTime date)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TeamHours>> GetItemsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TeamHours>> GetItemsAsync(DateTime startDate, DateTime date)
        {
            throw new NotImplementedException();
        }

        #endregion

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting
        /// unmanaged resources
        /// </summary>
        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                // TODO: Clear db context and of any other services or providers
                //if (_dbContext != null)
                //{
                //    _dbContext.Dispose();
                //}
            }
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting
        /// unmanaged resources
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
