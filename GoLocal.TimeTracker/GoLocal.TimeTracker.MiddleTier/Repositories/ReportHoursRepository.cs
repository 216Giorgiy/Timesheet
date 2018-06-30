// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Services;
using Newtonsoft.Json.Linq;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;


namespace GoLocal.TimeTracker.MiddleTier.Repositories
{
    /// <summary>
    /// This is the report hours repository
    /// </summary>
    public class ReportHoursRepository : IRepository<ReportHours>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly ICacheService<ListCollectionPage<ReportHours>> _reportHoursCache;
        private const string _reportHoursIdentifier = "entries";


        public ReportHoursRepository(
            ILogger<ReportHoursRepository> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            ICacheService<ListCollectionPage<ReportHours>> reportHoursCache)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _reportHoursCache = reportHoursCache ?? throw new ArgumentNullException(nameof(reportHoursCache));
        }

        
        public async Task<IEnumerable<ReportHours>> GetItemsAsync(DateTime date)
        {
            try
            {
                var reportHoursList = new List<ReportHours>();

                var getItemsResults = await GetItemsAsync(date, 50);
                while (getItemsResults != null)
                {
                    reportHoursList.AddRange(getItemsResults.DataList);
                    getItemsResults = await GetNextItemsAsync(getItemsResults);
                }

                return reportHoursList;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting work report hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<ReportHours>> GetItemsAsync(DateTime date, int pageSize = 10)
        {
            try
            {
                // Try fetching the data from cache
                var cacheKey = "1_" + date.ToString("yyyyMM");
                var listCollectionPage = new ListCollectionPage<ReportHours>();
                var cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null)
                {
                    if (String.IsNullOrEmpty(cacheEntry.SearchQuery)) return cacheEntry;
                    await _reportHoursCache.ClearCacheAsync("_" + date.ToString("yyyyMM"));
                }

                // Data set not found in cache, get from backend
                listCollectionPage = await GetItemsResultsAsync(date, pageSize);

                // Save to cache
                await _reportHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<ReportHours>> GetNextItemsAsync(ListCollectionPage<ReportHours> listCollectionPage)
        {
            try
            {
                // Try fetching the data from cache
                listCollectionPage.CurrentPageIndex++;
                var cacheKey = listCollectionPage.CurrentPageIndex.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                var cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null) return cacheEntry;
                if (String.IsNullOrEmpty(listCollectionPage.SkipToken)) return null; // No more entries TODO: process not submitted

                // ReportHours entry not in cache
                listCollectionPage.DataList = new List<ReportHours>();

                var queryOptions = new List<QueryOption>();
                queryOptions.Add(new QueryOption("filter", @"startswith(fields/Date,'" + listCollectionPage.QueryDate + "')")); // Filter to get all entries of a month
                queryOptions.Add(new QueryOption("$skiptoken", listCollectionPage.SkipToken));

                // Call to SharePoint graph service
                var graphResults = await _graphSharePointService.GetSiteListItemsAsync(listCollectionPage.SiteList, queryOptions, listCollectionPage.PageSize);

                listCollectionPage.SkipToken = "";
                if (!String.IsNullOrEmpty(graphResults.SkipToken)) listCollectionPage.SkipToken = graphResults.SkipToken; // Store skiptoken if any

                var dateQuery = listCollectionPage.QueryDate;

                listCollectionPage.DataList = await AddItemsToDataListAsync(graphResults.DataList, dateQuery);

                // Save to cache
                await _reportHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<ReportHours>> GetPreviousItemsAsync(ListCollectionPage<ReportHours> listCollectionPage)
        {
            try
            {
                // Try fetching the data from cache
                if (listCollectionPage.CurrentPageIndex > 1) listCollectionPage.CurrentPageIndex--;
                var cacheKey = listCollectionPage.CurrentPageIndex.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                var cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null) return cacheEntry;
                if (String.IsNullOrEmpty(listCollectionPage.SkipToken)) return null; // No more entries TODO: process not submitted

                // ReportHours entry not in cache TODO: Should not get to here unless no distributed cache so different logic to re-create previous

                var listCollectionPageDr = new ListCollectionPage<GraphResultItem>();

                // Prepare call to graph to fetch teamhours records from SharePoint

                var queryOptions = new List<QueryOption>();
                queryOptions.Add(new QueryOption("filter", @"startswith(fields/Date,'" + listCollectionPage.QueryDate + "')")); // Filter to get all entries of a month
                queryOptions.Add(new QueryOption("$skiptoken", listCollectionPage.SkipToken));

                // Call to SharePoint graph service
                var graphResults = await _graphSharePointService.GetSiteListItemsAsync(listCollectionPage.SiteList, queryOptions, listCollectionPage.PageSize);

                listCollectionPage.SkipToken = "";
                if (!String.IsNullOrEmpty(graphResults.SkipToken)) listCollectionPage.SkipToken = graphResults.SkipToken; // Store skiptoken if any

                var dateQuery = listCollectionPage.QueryDate;

                listCollectionPage.DataList = await AddItemsToDataListAsync(graphResults.DataList, dateQuery);

                // Save to cache
                await _reportHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<ReportHours>> GetPageItemsAsync(ListCollectionPage<ReportHours> listCollectionPage, int page = 1)
        {
            try
            {
                // Try fetching the data from cache
                var cacheKey = page.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                var cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

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
                _logger.LogError("Error getting report hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<ListCollectionPage<ReportHours>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize = 10)
        {
            try
            {
                if (String.IsNullOrEmpty(searchQuery)) return await GetItemsAsync(date, pageSize);

                // Set the cap for search results
                var searchMaxResults = 50;
                var siteList = new SiteList();

                // Try fetching the first cache entry
                var cacheKey = "1_" + date.ToString("yyyyMM");
                var listCollectionPage = new ListCollectionPage<ReportHours>();
                var cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                if (cacheEntry != null && cacheEntry.SearchQuery != searchQuery && !String.IsNullOrEmpty(cacheEntry.SearchQuery))
                {
                    // Different search so clear cache to start new search
                    await _reportHoursCache.ClearCacheAsync("_" + date.ToString("yyyyMM"));
                    cacheEntry = null;
                }

                var reportHoursList = new List<ReportHours>();

                // Search for matches in entries from cache and add to teamHoursList
                string lowerSearchQuery = searchQuery.ToLowerInvariant();
                var cacheIndex = 1;
                while (cacheEntry != null)
                {
                    siteList = cacheEntry.SiteList;
                    cacheIndex++;
                    reportHoursList.AddRange(cacheEntry.DataList.Select(x => x).Where(s => s.Fields.DisplayName.ToLowerInvariant().Contains(lowerSearchQuery)));
                    cacheKey = cacheIndex.ToString() + "_" + date.ToString("yyyyMM");
                    cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);
                }

                // At least 1 entry found in cache, keep getting next until we have 50 search results or there are no more records
                if (cacheIndex > 1)
                {
                    // Get last cache entry
                    cacheIndex--;
                    cacheKey = cacheIndex.ToString() + "_" + date.ToString("yyyyMM");
                    cacheEntry = await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);
                }

                var nextItems = cacheEntry;
                if (nextItems == null && reportHoursList?.Count == 0)
                {
                    nextItems = await GetItemsResultsAsync(date, pageSize, searchQuery);
                    reportHoursList.AddRange(nextItems.DataList.Select(x => x).Where(s => s.Fields.DisplayName.ToLowerInvariant().Contains(lowerSearchQuery)));
                    siteList = nextItems.SiteList;
                }

                while (!String.IsNullOrEmpty(nextItems.SkipToken) && reportHoursList?.Count < searchMaxResults)
                {
                    nextItems = await GetNextItemsAsync(cacheEntry);
                    siteList = nextItems.SiteList;
                    reportHoursList.AddRange(nextItems.DataList.Select(x => x).Where(s => s.Fields.DisplayName.ToLowerInvariant().Contains(lowerSearchQuery)));
                }

                // Re-create the cache with the search results
                if (reportHoursList?.Count > 0)
                {
                    // First clear cache
                    await _reportHoursCache.ClearCacheAsync("_" + date.ToString("yyyyMM"));

                    listCollectionPage = new ListCollectionPage<ReportHours>();
                    listCollectionPage.QueryDate = date.ToString("yyyyMM");
                    listCollectionPage.ObjectIdentifier = _reportHoursIdentifier;
                    listCollectionPage.CurrentPageIndex = 1;
                    listCollectionPage.PageSize = pageSize;
                    listCollectionPage.SearchQuery = searchQuery;
                    listCollectionPage.SiteList = siteList;
                    listCollectionPage.DataList = new List<ReportHours>();

                    var pageSizeCounter = 0;
                    foreach (var item in reportHoursList)
                    {
                        listCollectionPage.DataList.Add(item);
                        pageSizeCounter++;
                        //if (pageSizeCounter == pageSize || pageSizeCounter == reportHoursList.Count)
                        if (pageSizeCounter == reportHoursList.Count)
                        {
                            cacheKey = listCollectionPage.CurrentPageIndex.ToString() + "_" + date.ToString("yyyyMM");
                            await _reportHoursCache.SaveToCacheAsync(listCollectionPage, cacheKey);
                            listCollectionPage.CurrentPageIndex++;
                        }
                    }

                    cacheKey = "1_" + date.ToString("yyyyMM");
                    return await _reportHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour search items in repository: " + ex.Message);
                throw;
            }
        }


        // Private methods

        public async Task<ListCollectionPage<ReportHours>> GetItemsResultsAsync(DateTime date, int pageSize = 10, string searchQuery = "")
        {
            try
            {
                var dateQuery = date.ToString("yyyyMM");

                var listCollectionPage = new ListCollectionPage<ReportHours>();
                listCollectionPage.QueryDate = dateQuery;
                listCollectionPage.ObjectIdentifier = _reportHoursIdentifier;
                listCollectionPage.CurrentPageIndex = 1;
                listCollectionPage.PageSize = pageSize;
                listCollectionPage.SearchQuery = searchQuery;
                listCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(_reportHoursIdentifier, ListSchema.ReportHoursListSchema);

                var queryOptions = new List<QueryOption>();
                queryOptions.Add(new QueryOption("filter", @"startswith(fields/Date,'" + listCollectionPage.QueryDate + "')")); // Filter to get all entries of a month

                // Call to SharePoint graph service
                var graphResults = await _graphSharePointService.GetSiteListItemsAsync(listCollectionPage.SiteList, queryOptions, pageSize);

                if (graphResults.DataList?.Count == 0) return new ListCollectionPage<ReportHours>(); // No entries were found

                listCollectionPage.SkipToken = "";
                if (!String.IsNullOrEmpty(graphResults.SkipToken)) listCollectionPage.SkipToken = graphResults.SkipToken; // Store skiptoken if any

                listCollectionPage.DataList = await AddItemsToDataListAsync(graphResults.DataList, dateQuery);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository: " + ex.Message);
                throw;
            }
        }

        private async Task<IList<ReportHours>> AddItemsToDataListAsync(IList<GraphResultItem> graphResults, string dateQuery)
        {
            try
            {
                var reportHoursList = new List<ReportHours>();
                foreach (var item in graphResults)
                {
                    object objectValue;

                    if (item.Properties.TryGetValue("ObjectIdentifier", out objectValue))
                    {
                        // Get the site list
                        var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(item.Properties["ObjectIdentifier"].ToString(), ListSchema.WorkHoursListSchema);
                        var workHoursResults = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, dateQuery);

                        var userBasicInfo = await _graphUserService.GetUserBasicAsync(item.Properties["ObjectIdentifier"].ToString());
                        var managerBasicInfo = new GraphResultItem
                        {
                            Id = "",
                            DisplayName = ""
                        };

                        if (item.Properties.TryGetValue("ManagerObjectIdentifier", out objectValue)) managerBasicInfo = await _graphUserService.GetUserBasicAsync(objectValue.ToString());

                        if (workHoursResults?.Count > 0)
                        {
                            foreach (var workHoursItem in workHoursResults)
                            {
                                var reportHours = new ReportHours
                                {
                                    Id = workHoursItem.Id,
                                    ListId = workHoursSiteList.ListId,
                                    Fields = ConvertToReportHours(workHoursItem, managerBasicInfo, userBasicInfo)
                                };

                                reportHoursList.Add(reportHours);
                            }
                        }
                    }
                }

                return reportHoursList;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository AddItemsToDataListAsync: " + ex.Message);
                throw;
            }
        }

        private ReportHoursFields ConvertToReportHours(GraphResultItem graphResultsItem, GraphResultItem managerBasicInfo, GraphResultItem userBasicInfo)
        {
            try
            {
                var reportHoursFields = new ReportHoursFields();
                object objectValue;

                reportHoursFields.ObjectIdentifier = graphResultsItem.Properties["ObjectIdentifier"].ToString();
                reportHoursFields.DisplayName = userBasicInfo.DisplayName;
                reportHoursFields.ManagerObjectIdentifier = managerBasicInfo.Id;
                reportHoursFields.ManagerDisplayName = managerBasicInfo.DisplayName;
                if (graphResultsItem.Properties.TryGetValue("Date", out objectValue)) reportHoursFields.Date = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("MeetingHours", out objectValue)) reportHoursFields.MeetingHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingMinutes", out objectValue)) reportHoursFields.MeetingMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingAdjustedHours", out objectValue)) reportHoursFields.MeetingAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingAdjustedMinutes", out objectValue)) reportHoursFields.MeetingAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailHours", out objectValue)) reportHoursFields.EmailHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailMinutes", out objectValue)) reportHoursFields.EmailMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailAdjustedHours", out objectValue)) reportHoursFields.EmailAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailAdjustedMinutes", out objectValue)) reportHoursFields.EmailAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherHours", out objectValue)) reportHoursFields.OtherHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherMinutes", out objectValue)) reportHoursFields.OtherMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherAdjustedHours", out objectValue)) reportHoursFields.OtherAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherAdjustedMinutes", out objectValue)) reportHoursFields.OtherAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("AdjustedHoursReason", out objectValue)) reportHoursFields.AdjustedHoursReason = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("ItemState", out objectValue)) reportHoursFields.ItemState = (ItemState)Enum.Parse(typeof(ItemState), objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("SubmittedDate", out objectValue)) reportHoursFields.SubmittedDate = Convert.ToDateTime(objectValue.ToString());

                return reportHoursFields;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error converting report hours items in repository: " + ex.Message);
                throw;
            }
        }

        #region Not implemented methods

        public async Task SaveItemAsync(ReportHours modelData)
        {
            throw new NotImplementedException();
        }

        public async Task<ReportHours> GetItemAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<ReportHours> GetItemAsync(DateTime date)
        {
            throw new NotImplementedException();
            //try
            //{
            //    // Get the site list
            //    var siteList = await _graphSharePointService.GetSiteListAsync(_reportHoursIdentifier, ListSchema.ReportHoursListSchema);

            //    // Get the items from the reporthours_summary list
            //    var results = await _graphSharePointService.GetSiteListItemsAsync(siteList, date.ToString("yyyyMMdd"));
            //    // TODO: Map of results & fix schema refactor to startDate & endDate

            //    return new ReportHours();
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError("Error getting report hours items in repository: " + ex.Message);
            //    throw;
            //}
        }

        public async Task<ReportHours> GetItemAsync(string itemId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ReportHours>> GetItemsAsync(DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
            //try
            //{
            //    // Get the site list
            //    var reportHoursSiteList = await _graphSharePointService.GetSiteListAsync(_reportHoursIdentifier, ListSchema.ReportHoursListSchema);

            //    var results = new List<GraphResultItem>();
            //    var dateQuery = startDate.ToString("yyyyMM");  // Get all items in a given month
            //    results = await _graphSharePointService.GetSiteListItemsAsync(reportHoursSiteList, dateQuery);

            //    var reportHoursList = new List<ReportHours>();
            //    if (results?.Count == 0) return reportHoursList; // No records could be found

            //    foreach (var item in results)
            //    {
            //        object objectValue;

            //        if (item.Properties.TryGetValue("ObjectIdentifier", out objectValue))
            //        {
            //            // Get the site list
            //            var workHoursSiteList = await _graphSharePointService.GetSiteListAsync(item.Properties["ObjectIdentifier"].ToString(), ListSchema.WorkHoursListSchema);
            //            var workHoursResults = await _graphSharePointService.GetSiteListItemsAsync(workHoursSiteList, dateQuery);

            //            var userBasicInfo = await _graphUserService.GetUserBasicAsync(item.Properties["ObjectIdentifier"].ToString());
            //            var managerBasicInfo = await _graphUserService.GetUserBasicAsync(item.Properties["ManagerObjectIdentifier"].ToString());

            //            if (workHoursResults?.Count > 0)
            //            {
            //                foreach (var workHoursItem in workHoursResults)
            //                {
            //                    var reportHours = new ReportHours
            //                    {
            //                        Id = workHoursItem.Id,
            //                        ListId = workHoursSiteList.ListId,
            //                        Fields = ConvertToReportHours(workHoursItem, managerBasicInfo, userBasicInfo)
            //                    };

            //                    reportHoursList.Add(reportHours);
            //                }
            //            }
            //        }
            //    }

            //    return reportHoursList;
            //}
            //catch (Exception ex)
            //{
            //    _logger.LogError("Error getting report hour items in repository: " + ex.Message);
            //    throw;
            //}
        }

        public async Task<IEnumerable<ReportHours>> GetItemsAsync()
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
