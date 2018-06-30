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
    public interface IViewModelService<T>
    {
        Task<T> GetViewModel(DateTime date, int pageIndex, int pageSize);

        Task<T> GetSearchResults(DateTime date, string searchQuery, int pageIndex, int pageSize);

        Task RequestRevision();

        Task EditHours();

        Task SubmitHours();
    }
}
