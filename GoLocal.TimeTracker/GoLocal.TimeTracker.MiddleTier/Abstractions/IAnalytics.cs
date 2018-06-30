// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.MiddleTier.Abstractions
{
    public interface IAnalyticsService<T> where T : IDataItem<T>
    {
        Task GetOverTimePercentageItemAsync(T modelData);
    }
}
