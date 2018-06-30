// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Services;
using System.Globalization;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using Newtonsoft.Json.Linq;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;

namespace GoLocal.TimeTracker.MiddleTier.Repositories
{
    /// <summary>
    /// This is the User profile repository
    /// </summary>
    public class UserProfileRepository : IRepository<UserProfile>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IUserContext _userContext;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly ICacheService<UserProfile> _memoryCacheService;
        private SiteList _usersList;


        public UserProfileRepository(
            ILogger<UserProfileRepository> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            IUserContext userContext,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            ICacheService<UserProfile> memoryCacheService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _memoryCacheService = memoryCacheService ?? throw new ArgumentNullException(nameof(memoryCacheService));
        }


        public async Task<UserProfile> GetItemAsync()
        {
            try
            {
                var identifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var userProfile = new UserProfile
                {
                    Id = identifier
                };

                // Try to get the user profile from from cache
                var cacheKey = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                userProfile = await _memoryCacheService.TryRetrieveFromCacheAsync(userProfile, cacheKey);
                if (userProfile != null) return userProfile;

                // Get user info from Graph
                var userInfoResults = await _graphUserService.GetMyUserInfoAsync(identifier);

                // Check to see that users exists on Users List, if not add it with default personal settings
                if (_usersList == null) _usersList = await _graphSharePointService.GetSiteListAsync("users", Helpers.ListSchema.UsersListSchema);
                var queryOptions = new List<QueryOption>();
                queryOptions.Add(new QueryOption("filter", @"startswith(fields/ObjectIdentifier,'" + identifier + "')"));
                var usersListResults = await _graphSharePointService.GetSiteListItemsAsync(_usersList, queryOptions);
                if (usersListResults?.Count == 0)
                {
                    // Register user in Users List
                    // Create JSON object to add the user in the list
                    dynamic userListFieldsObject = new JObject();

                    userListFieldsObject.ObjectIdentifier = identifier;
                    userListFieldsObject.UserMail = userInfoResults.Properties["Mail"].ToString() ?? userInfoResults.Properties["Upn"].ToString();
                    userListFieldsObject.FirstDayOfWeek = _timeTrackerOptions.FirstDayWeek ?? "Monday";
                    userListFieldsObject.EmailNotificationsEnabled = true;
                    userListFieldsObject.AutoSubmitData = "scheduled";
                    userListFieldsObject.DailyUpdateStatus = "scheduled";
                    userListFieldsObject.UpdateDate = DateTime.Now;
                    userListFieldsObject.AutoSubmitStatus = "initial";
                    userListFieldsObject.SubmitDate = Convert.ToDateTime("01/01/2017");

                    dynamic userListRootObject = new JObject();
                    userListRootObject.fields = userListFieldsObject;

                    // Call graph to create the entry i the list
                    await _graphSharePointService.CreateSiteListItemAsync(_usersList, userListRootObject.ToString());

                    // Call graph again to fetch the newly created entry (to confirm and have the object expected for functional below
                    usersListResults = await _graphSharePointService.GetSiteListItemsAsync(_usersList, queryOptions);
                }

                //var firstDayWeek = _timeTrackerOptions.FirstDayWeek;
                var firstDayWeek = usersListResults[0].Properties["FirstDayOfWeek"].ToString();

                // Get groups the user belongs to
                //var memberOfResults = await _graphUserService.GetMemberOfAsync();

                // Get manager info for the user
                var managerResults = await _graphUserService.GetMyManagerAsync(identifier);

                // Get the user direct reports list
                var isManager = await _graphUserService.GetMyHasDirectReportsAsync(identifier);

                var dailyUpdateStatus = usersListResults[0].Properties["DailyUpdateStatus"].ToString();

                var updateDate = usersListResults[0].Properties["UpdateDate"].ToString();

                var autoSubmitStatus = usersListResults[0].Properties["AutoSubmitStatus"].ToString();

                var submitDate = usersListResults[0].Properties["SubmitDate"].ToString();

                userProfile = new UserProfile
                {
                    Id = userInfoResults.Id,

                    Fields = new UserProfileFields
                    {
                        ObjectIdentifier = userInfoResults.Id,
                        DisplayName = userInfoResults.DisplayName,
                        Upn = userInfoResults.Properties["Upn"].ToString(),
                        Mail = userInfoResults.Properties["Mail"].ToString(),
                        UserPicture = userInfoResults.Properties["Picture"].ToString(),
                        IsManager = isManager,
                        //IsAdmin = memberOfResults.Exists(x => x.DisplayName == _timeTrackerOptions.AdminGroup),
                        IsAdmin = await _graphUserService.GetMemberOfAsync(_timeTrackerOptions.AdminGroup),
						//IsHr = memberOfResults.Exists(x => x.DisplayName == _timeTrackerOptions.HrGroup),
						IsHr = await _graphUserService.GetMemberOfAsync(_timeTrackerOptions.HrGroup),
						
                        // TODO: Store this in personalization settings for user, for now just set to default which is true
                        EmailNotifications = Convert.ToBoolean(usersListResults[0].Properties["EmailNotificationsEnabled"]),
                        Manager = managerResults.DisplayName,
                        ManagerPicture = managerResults.Properties["Picture"].ToString(),
                        SpSiteId = _timeTrackerOptions.SharePointSiteId,
                        FirstDayWeek = firstDayWeek,
                        DailyUpdateStatus = dailyUpdateStatus,
                        UpdateDate = Convert.ToDateTime(updateDate),
                        AutoSubmitStatus = autoSubmitStatus,
                        SubmitDate = Convert.ToDateTime(submitDate)
                    }
                };

                // Write the user profile to cache
                await _memoryCacheService.SaveToCacheAsync(userProfile, cacheKey);

                return userProfile;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting user in repository: " + ex.Message);
                return null;
            }
        }

        #region Not Implemented methods
        public async Task SaveItemAsync(UserProfile modelData)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public async Task<UserProfile> GetItemAsync(string itemId)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public async Task<UserProfile> GetItemAsync(DateTime date)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserProfile>> GetItemsAsync()
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserProfile>> GetItemsAsync(DateTime date)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserProfile>> GetItemsAsync(DateTime startDate, DateTime endDate)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public async Task<ListCollectionPage<UserProfile>> GetItemsAsync(DateTime date, int pageSize)
        {
            throw new NotImplementedException();
        }

        public async Task<ListCollectionPage<UserProfile>> GetNextItemsAsync(ListCollectionPage<UserProfile> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public async Task<ListCollectionPage<UserProfile>> GetPreviousItemsAsync(ListCollectionPage<UserProfile> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public async Task<ListCollectionPage<UserProfile>> GetPageItemsAsync(ListCollectionPage<UserProfile> listCollectionPage, int page)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<UserProfile>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize)
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
                // Dispose
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
