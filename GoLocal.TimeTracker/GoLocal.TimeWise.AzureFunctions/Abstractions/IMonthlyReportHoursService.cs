// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    public interface IMonthlyReportHoursService<T>
    {
        Task<T> GetViewModel(DateTime date, int pageIndex, int pageSize);

        Task MonthlyHoursLoadRequest();

        //Task<MiddleTier.Models.UserProfile> GetUserProfile(ClaimsPrincipal user, HttpContext httpContext);

        Task<T> GetSearchResults(DateTime dt, string searchQuery, int pageIndex, int pageSize);

    }
}
