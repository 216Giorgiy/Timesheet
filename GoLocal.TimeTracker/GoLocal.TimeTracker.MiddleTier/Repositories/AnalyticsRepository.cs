// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.MiddleTier.Repositories
{
    public class AnalyticsRepository : IRepository<Analytics>
    {

        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;


        public AnalyticsRepository(
            ILogger<AnalyticsRepository> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
        }

        public async Task<IEnumerable<Analytics>> GetItemsAsync(DateTime date)
        {
            if (date == null) throw new ArgumentNullException(nameof(date));

            try
            {
                var analyticsListCollectionPage = new ListCollectionPage<Analytics>();
                var dateQuery = date.ToString("yyyyMM");  // Get all items in a given month

                string objectIdentifier = Guid.NewGuid().ToString();

                // Get the site list
                analyticsListCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(objectIdentifier, ListSchema.TotalHrsListSchema);
                var siteList = analyticsListCollectionPage.SiteList;

                analyticsListCollectionPage.QueryDate = dateQuery;

                // Get the results from the call to GraphService.GetSiteListItemByDateAsync
                var results = await _graphSharePointService.GetSiteListItemsAsync(siteList, dateQuery);
                var analyticsResults = await AddItemsToDataListAsync(siteList, results);

                // get the datewise groupings and the count of users both total and reported overtime
                //var groupings = from item in analyticsResults
                //                group item by item.Fields.selDate into data

                //                select data.Distinct();

                return analyticsResults;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting work hour items in repository: " + ex.Message);
                throw;
            }
        }

        private async Task<IList<Analytics>> AddItemsToDataListAsync(SiteList siteList, IList<GraphResultItem> graphResults)
        {
            try
            {
                var analyticsList = new List<Analytics>();

                foreach (var analyticsItem in graphResults)
                {
                    var analytics = new Analytics
                    {
                        Fields = ConvertToAnalytics(analyticsItem)
                    };

                    analyticsList.Add(analytics);
                }
                return analyticsList;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting report hour items in repository AddItemsToDataListAsync: " + ex.Message);
                throw;
            }
        }

        private AnalyticsFields ConvertToAnalytics(GraphResultItem graphResultsItem)
        {
            try
            {
                var analyticsFields = new AnalyticsFields();
                object objectValue;

                if (graphResultsItem.Properties.TryGetValue("Date", out objectValue)) analyticsFields.Date = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("ObjectIdentifier", out objectValue)) analyticsFields.ObjectIdentifier = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("TotalHours", out objectValue)) analyticsFields.TotalHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("TotalMins", out objectValue)) analyticsFields.TotalMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OTHours", out objectValue)) analyticsFields.OvertimeHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OTMins", out objectValue)) analyticsFields.OvertimeMinutes = Convert.ToInt16(objectValue);

                return analyticsFields;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error converting analytics items in repository: " + ex.Message);
                throw;
            }
        }

        #region unimplemented functions
        public Task<Analytics> GetItemAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Analytics> GetItemAsync(string itemId)
        {
            throw new NotImplementedException();
        }

        public Task<Analytics> GetItemAsync(DateTime date)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Analytics>> GetItemsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Analytics>> GetItemsAsync(DateTime date, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Analytics>> GetItemsAsync(DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Analytics>> GetNextItemsAsync(ListCollectionPage<Analytics> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Analytics>> GetPageItemsAsync(ListCollectionPage<Analytics> listCollectionPage, int page)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Analytics>> GetPreviousItemsAsync(ListCollectionPage<Analytics> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Analytics>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task SaveItemAsync(Analytics modelData)
        {
            throw new NotImplementedException();
        }
        #endregion

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
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
