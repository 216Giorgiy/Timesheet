using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Extensions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Repository
{
    public class TeamHoursRepository : IRepository<TeamHours>
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IUserContext _userContext;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly GraphAppCalendarService _graphCalendarService;
        private readonly GraphAppTasksService _graphTasksService;
        private readonly GraphAppMailService _graphMailService;
        private List<TeamHours> _teamHoursDataList;
        private readonly String _objectIdentifier;


        public TeamHoursRepository(
            TimeTrackerOptions timeTrackerOptions,
            IUserContext userContext,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            GraphAppCalendarService graphCalendarService,
            GraphAppTasksService graphTasksService,
            GraphAppMailService graphMailService,
            String objectIdentifier
            )
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _graphCalendarService = graphCalendarService ?? throw new ArgumentNullException(nameof(graphCalendarService));
            _graphTasksService = graphTasksService ?? throw new ArgumentNullException(nameof(graphTasksService));
            _graphMailService = graphMailService ?? throw new ArgumentNullException(nameof(graphMailService));
            _teamHoursDataList = new List<TeamHours>();
            _objectIdentifier = objectIdentifier;//?? throw new ArgumentNullException(nameof(userContext));
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
                
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetItemsAsync(DateTime date, int pageSize = 10)
        {
            try
            {
                // Get the user object identifier
                //var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var userObjectIdentifier = _objectIdentifier;

                var listCollectionPage = new ListCollectionPage<TeamHours>();
                listCollectionPage = await GetItemsResultsAsync(date, pageSize, String.Empty);

                return listCollectionPage;
            }
            catch (Exception ex)
            {
               
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
                

                return listCollectionPage;
            }
            catch (Exception ex)
            {
               
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
                

                
                if (String.IsNullOrEmpty(listCollectionPage.SkipToken)) return null; // No more entries TODO: process not submitted

                // TeamHours entry not in cache TODO: Should not get to here unless no distributed cache so different logic to re-create previous

                listCollectionPage.SkipToken = "";

                listCollectionPage.DataList = new List<TeamHours>();

                return listCollectionPage;
            }
            catch (Exception ex)
            {
               
                throw;
            }
        }

        public async Task<ListCollectionPage<TeamHours>> GetPageItemsAsync(ListCollectionPage<TeamHours> listCollectionPage, int page = 1)
        {
            try
            {
                // Try fetching the data from cache
                var cacheKey = page.ToString() + "_" + listCollectionPage.ObjectIdentifier + listCollectionPage.QueryDate;
                //var cacheEntry = await _teamHoursCache.TryRetrieveFromCacheAsync(listCollectionPage, cacheKey);

                //if (cacheEntry != null) return cacheEntry;

                //if (cacheEntry.CurrentPageIndex > page && !String.IsNullOrEmpty(listCollectionPage.SkipToken))
                //{
                //    var currentPage = cacheEntry.CurrentPageIndex;
                //    while (currentPage < page)
                //    {
                //        var moveResults = await GetNextItemsAsync(listCollectionPage);
                //        if (moveResults != null)
                //        {
                //            if (moveResults.CurrentPageIndex == page) return moveResults;
                //            currentPage = moveResults.CurrentPageIndex;
                //        }

                //        if (currentPage < page && String.IsNullOrEmpty(moveResults.SkipToken)) break;
                //    }

                //    return null;
                //}
                //else
                //{
                //    return null; // No pages exists for provided index
                //}
                return null;
            }
            catch (Exception ex)
            {
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
                //var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var userObjectIdentifier = _objectIdentifier;

                var listCollectionPage = new ListCollectionPage<TeamHours>();

                var teamHoursList = new List<TeamHours>();

                // Search for matches in entries from cache and add to teamHoursList
                string lowerSearchQuery = searchQuery.ToLowerInvariant();               

                // Re-create the cache with the search results
                if (teamHoursList?.Count > 0)
                {
                    // First clear cache
                   

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
                                listCollectionPage.CurrentPageIndex++;
                            }
                        }
                        else
                        {
                            
                        }
                    }
                    return null;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // Private methods

        private async Task<ListCollectionPage<TeamHours>> GetItemsResultsAsync(DateTime date, int pageSize, string searchQuery = "")
        {
            try
            {
                // Get the user object identifier
                //var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var userObjectIdentifier = _objectIdentifier;
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
        public Task<bool> dataCheck(DateTime date)
        {
            //not implemented for now
            return null;
        }
    }
}
