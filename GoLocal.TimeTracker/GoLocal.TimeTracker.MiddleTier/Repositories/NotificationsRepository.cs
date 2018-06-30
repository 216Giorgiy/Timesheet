// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Services;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using System.Globalization;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Caching.Memory;
using System.Linq;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;

namespace GoLocal.TimeTracker.MiddleTier.Repositories
{
    /// <summary>
    /// This is the notifications repository
    /// </summary>
    public class NotificationsRepository : IRepository<Notifications>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IUserContext _userContext;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly IRepository<UserProfile> _userProfileRepository;
        private readonly ICacheService<ListCollectionPage<Notifications>> _memoryCacheService;
        private const string _hrListIdentifier = "inbox";

        public NotificationsRepository(
            ILogger<NotificationsRepository> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            IUserContext userContext,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            IRepository<UserProfile> userProfileRepository,
            ICacheService<ListCollectionPage<Notifications>> memoryCacheService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
            _memoryCacheService = memoryCacheService ?? throw new ArgumentNullException(nameof(memoryCacheService));
        }


        public async Task SaveItemAsync(Notifications modelData)
        {
            try
            {
                if (modelData == null) throw new ArgumentNullException(nameof(modelData));

                var notificationsList = new List<Notifications>();
                var notificationListCollectionPage = new ListCollectionPage<Notifications>();
                var userProfile = await _userProfileRepository.GetItemAsync();
                var userObjectIdentifier = userProfile.Id;
                var hrSiteListId = _timeTrackerOptions.NotificationsListPrefix + _hrListIdentifier;

                // Try to get the work hours from cache
                var cacheKey = userObjectIdentifier;
                var notificationsListEntry = await _memoryCacheService.TryRetrieveFromCacheAsync(notificationListCollectionPage, cacheKey);

                if (notificationsListEntry != null)
                {
                    notificationsList = notificationsListEntry.DataList.ToList();
                    notificationListCollectionPage = notificationsListEntry;

                    // remove from cache so it can be updated and saved back in cache
                    await _memoryCacheService.RemoveFromCacheAsync(cacheKey);

                    // Find in the entries from cache the item to update then save it back to cache
                    var cacheUpdated = false;
                    foreach (var item in notificationsList)
                    {
                        if (item.Id == modelData.Id && item.ListId == modelData.ListId)
                        {
                            if (modelData.Fields.SentDate != null) item.Fields.SentDate = modelData.Fields.SentDate;
                            if (modelData.Fields.ReadDate != null && !String.IsNullOrEmpty(modelData.Id)) item.Fields.ReadDate = modelData.Fields.ReadDate;
                            cacheUpdated = true;
                        }
                    }

                    // Save the entry back to cache
                    if (cacheUpdated)
                    {
                        notificationListCollectionPage.DataList = notificationsList;
                        await _memoryCacheService.SaveToCacheAsync(notificationListCollectionPage, cacheKey);
                    }
                }

                // Get the SpSiteList, if the list does not exists, it will create one
                if (String.IsNullOrEmpty(notificationListCollectionPage.SiteList.ListId)) notificationListCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.NotificationsListSchema);
                var notificationsSiteList = notificationListCollectionPage.SiteList;
                if (modelData.ListId == hrSiteListId) notificationsSiteList.ListId = modelData.ListId; // Change ListId if shared notifications in box (for HR)

                // Add relevant properties to cache entry
                if (String.IsNullOrEmpty(notificationListCollectionPage.ObjectIdentifier)) notificationListCollectionPage.ObjectIdentifier = userObjectIdentifier;

                // Create JSON object to update or create WORK HOURS (aka employee entries) in SharePoint
                dynamic notificationsFieldsObject = new JObject();
                notificationsFieldsObject.SentToMail = modelData.Fields.SentToMail;
                if (modelData.Fields.SentDate != null) notificationsFieldsObject.SentDate = modelData.Fields.SentDate;
                if (modelData.Fields.ReadDate != null && !String.IsNullOrEmpty(modelData.Id)) notificationsFieldsObject.ReadDate = modelData.Fields.ReadDate;
                notificationsFieldsObject.MessageBody = modelData.Fields.MessageBody ?? "";

                dynamic notificationsRootObject = new JObject();
                notificationsRootObject.fields = notificationsFieldsObject;
                
                // If Id empty we assume new notification: note creating via this methd does not trigger sending emails, that is part of workflow service helper
                if (String.IsNullOrEmpty(modelData.Id))
                {
                    // Add new notification in SharePoint
                    var result = await _graphSharePointService.CreateSiteListItemAsync(notificationsSiteList, notificationsRootObject.ToString());
                }
                else 
                {
                    // Update an existing notification
                    var result = await _graphSharePointService.UpdateSiteListItemAsync(notificationsSiteList, modelData.Id, notificationsRootObject.ToString());
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error saving notifiction items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<IEnumerable<Notifications>> GetItemsAsync()
        {
            try
            {
                var userProfile = await _userProfileRepository.GetItemAsync();
                var notificationsList = new List<Notifications>();
                var notificationListCollectionPage = new ListCollectionPage<Notifications>();
                var hrSiteListId = _timeTrackerOptions.NotificationsListPrefix + _hrListIdentifier;

                // Try to get the work hours from cache
                var cacheKey = userProfile.Id;
                var notificationsListEntry = await _memoryCacheService.TryRetrieveFromCacheAsync(notificationListCollectionPage, cacheKey);
                if (notificationsListEntry != null) return notificationsListEntry.DataList;

                // Get the SpSiteList, if the list does not exists, it will create one
                notificationListCollectionPage.ObjectIdentifier = userProfile.Id;
                notificationListCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(notificationListCollectionPage.ObjectIdentifier, ListSchema.NotificationsListSchema);
                var notificationsSiteList = notificationListCollectionPage.SiteList;

                var results = new List<GraphResultItem>();

                results = await _graphSharePointService.GetSiteListItemsAsync(notificationsSiteList);

                foreach (var item in results)
                {
                    notificationsList.Add(await AddFromGraphResultsItem(item, notificationsSiteList.ListId));
                }

                // If it is HR also pull notifications from shared notification list for HR
                if (userProfile.Fields.IsHr)
                {
                    notificationsSiteList = await _graphSharePointService.GetSiteListAsync(_hrListIdentifier, ListSchema.NotificationsListSchema);
                    var resultsHrInbox = await _graphSharePointService.GetSiteListItemsAsync(notificationsSiteList);

                    foreach (var item in resultsHrInbox)
                    {
                        notificationsList.Add(await AddFromGraphResultsItem(item, notificationsSiteList.ListId));
                    }
                }

                // Sort by SentDate Descending.
                notificationsList.Sort((x, y) => -x.Fields.SentDate.CompareTo(y.Fields.SentDate));
                
                // Write the user profile to cache
                notificationListCollectionPage.DataList = notificationsList;
                await _memoryCacheService.SaveToCacheAsync(notificationListCollectionPage, cacheKey);

                return notificationsList;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting notifiction items in repository: " + ex.Message);
                throw;
            }
        }

        #region Not Implemented methods

        public Task<Notifications> GetItemAsync()
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public Task<Notifications> GetItemAsync(DateTime date)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        public Task<Notifications> GetItemAsync(string itemId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Notifications>> GetItemsAsync(DateTime date)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Notifications>> GetItemsAsync(DateTime startDate, DateTime endDate)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Notifications>> GetItemsAsync(DateTime date, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Notifications>> GetNextItemsAsync(ListCollectionPage<Notifications> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Notifications>> GetPreviousItemsAsync(ListCollectionPage<Notifications> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Notifications>> GetPageItemsAsync(ListCollectionPage<Notifications> listCollectionPage, int page)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<Notifications>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize)
        {
            throw new NotImplementedException();
        }

        #endregion

        // Private methods

        private async Task<Notifications> AddFromGraphResultsItem(GraphResultItem graphResultsItem, string listId)
        {
            // TODO: See if we can refactor into an extension
            try
            {
                if (graphResultsItem == null) throw new ArgumentNullException(nameof(graphResultsItem));

                object objectValue;
                var notificationsFields = new NotificationsFields();
                var notification = new Notifications
                {
                    Id = graphResultsItem.Id,
                    ListId = listId
                };

                if (graphResultsItem.Properties.TryGetValue("SentToMail", out objectValue)) notificationsFields.SentToMail = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("SentToName", out objectValue)) notificationsFields.SentToName = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("SentFromMail", out objectValue)) notificationsFields.SentFromMail = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("SentFromName", out objectValue)) notificationsFields.SentFromName = objectValue.ToString();

                if (graphResultsItem.Properties.TryGetValue("MessageBody", out objectValue)) notificationsFields.MessageBody = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("ReadDate", out objectValue)) notificationsFields.ReadDate = DateTime.Parse(objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("SentDate", out objectValue)) notificationsFields.SentDate = DateTime.Parse(objectValue.ToString());

                if (String.IsNullOrEmpty(notificationsFields.SentToName) && !String.IsNullOrEmpty(notificationsFields.SentToMail))
                {
                    if (notificationsFields.SentToMail != _timeTrackerOptions.HrNotificationMail)
                    {
                        var toName = await _graphUserService.GetUserBasicAsync(notificationsFields.SentToMail);
                        notificationsFields.SentToName = toName.DisplayName;
                    }
                    else
                    {
                        notificationsFields.SentToName = _timeTrackerOptions.HrNotificationMail;
                    }
                }

                if (String.IsNullOrEmpty(notificationsFields.SentFromName) && !String.IsNullOrEmpty(notificationsFields.SentFromMail))
                {
                    var toName = await _graphUserService.GetUserBasicAsync(notificationsFields.SentFromMail);
                    notificationsFields.SentFromName = toName.DisplayName;
                }

                notification.Fields = notificationsFields;

                return notification;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error mapping a notifiction item from repository Message: " + ex.Message);
                throw;
            }
        }

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
