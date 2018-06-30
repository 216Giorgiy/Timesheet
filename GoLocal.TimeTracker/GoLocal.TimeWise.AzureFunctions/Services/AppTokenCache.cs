﻿// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    // This app uses an in-memory cache. Production apps will typically use some method of persistent storage.
    // For more information, see http://www.cloudidentity.com/blog/2014/07/09/the-new-token-cache-in-adal-v2/
    public class AppTokenCache : TokenCache
    {
        private static readonly object FileLock = new object();
        string CacheId = string.Empty;
        IMemoryCache Cache;

        // This sample uses the tenant ID as the cache key because the token is good for all users in the tenant.
        public AppTokenCache(string tenantId, IMemoryCache cache)
        {
            CacheId = tenantId + "_TokenCache";
            Cache = cache;
            this.AfterAccess = AfterAccessNotification;
            this.BeforeAccess = BeforeAccessNotification;
            Load();
        }

        public void Load()
        {
            lock (FileLock)
            {
                this.Deserialize(Cache.Get(CacheId) as byte[]);
            }
        }

        public void Persist()
        {
            lock (FileLock)
            {
                // reflect changes in the persistent store
                Cache.Set(CacheId, this.Serialize());
                // once the write operation took place, restore the HasStateChanged bit to false
                this.HasStateChanged = false;
            }
        }

        // Empties the persistent store.
        public override void Clear()
        {
            base.Clear();
            Cache.Remove(CacheId);
        }

        public override void DeleteItem(TokenCacheItem item)
        {
            base.DeleteItem(item);
            Persist();
        }

        // Triggered right before ADAL needs to access the cache.
        // Reload the cache from the persistent store in case it changed since the last access.
        void BeforeAccessNotification(TokenCacheNotificationArgs args)
        {
            Load();
        }

        // Triggered right after ADAL accessed the cache.
        void AfterAccessNotification(TokenCacheNotificationArgs args)
        {
            // if the access operation resulted in a cache update
            if (this.HasStateChanged)
            {
                Persist();
            }
        }
    }
}
