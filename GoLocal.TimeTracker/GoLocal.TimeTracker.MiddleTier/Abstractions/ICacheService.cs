// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.MiddleTier.Abstractions
{
    public interface ICacheService<T>
    {
        Task SaveToCacheAsync(T items, string key);

        Task<T> TryRetrieveFromCacheAsync(T items, string key);

        Task RemoveFromCacheAsync(string key);

        Task ClearCacheAsync(string key);
    }
}
