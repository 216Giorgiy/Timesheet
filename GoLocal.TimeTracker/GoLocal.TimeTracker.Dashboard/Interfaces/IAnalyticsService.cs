// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.Dashboard.Interfaces
{
    public interface IAnalyticsServiceDashBoard<T>
    {
        Task<Dictionary<string,object>> GetOTPercentageAsync(string date);

        Task<bool> UpdateAnalytics();
    }
}
