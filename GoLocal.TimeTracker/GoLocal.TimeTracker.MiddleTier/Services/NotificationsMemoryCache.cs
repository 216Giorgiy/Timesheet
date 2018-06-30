﻿// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.MiddleTier.Services
{
    public class NotificationsMemoryCache : ICacheService<ListCollectionPage<Notifications>>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IMemoryCache _memoryCache;
        private readonly int _cacheTime;
        private const string _cacheKey = "_nt";

        public NotificationsMemoryCache(
            ILogger<NotificationsMemoryCache> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            IMemoryCache memoryCache)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));

            _cacheTime = _timeTrackerOptions.NotificationsCacheMinutes;
        }

        public async Task<ListCollectionPage<Notifications>> TryRetrieveFromCacheAsync(ListCollectionPage<Notifications> items, string key)
        {
            key = key + _cacheKey;

            if (_cacheTime == 0) return items; // Cache is disabled

            var entryFromCache = _memoryCache.Get<string>(key);

            if (entryFromCache == null) return null;

            items = JsonConvert.DeserializeObject<ListCollectionPage<Notifications>>(entryFromCache);

            return items;
        }

        public async Task SaveToCacheAsync(ListCollectionPage<Notifications> items, string key)
        {
            key = key + _cacheKey;

            // Set cache options.
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                // Keep in cache for this time, reset time if accessed.
                .SetSlidingExpiration(TimeSpan.FromMinutes(_cacheTime));

            var jsonItems = JsonConvert.SerializeObject(items);

            // Save data in cache.
            _memoryCache.Set(key, jsonItems, cacheEntryOptions);
        }

        public async Task RemoveFromCacheAsync(string key)
        {
            key = key + _cacheKey;

            _memoryCache.Remove(key);
        }

        public async Task ClearCacheAsync(string key)
        {
            var cacheIndex = 1;

            while (cacheIndex > 0)
            {
                var cacheKey = cacheIndex.ToString() + key;
                var entryFromCache = _memoryCache.Get<string>(cacheKey);

                if (entryFromCache != null)
                {
                    _memoryCache.Remove(cacheKey);
                    cacheIndex++;
                }
                else
                {
                    cacheIndex = 0;
                }
            }
        }
    }
}
