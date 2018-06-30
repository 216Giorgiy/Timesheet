// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Linq.Expressions;
using GoLocal.TimeWise.AzureFunctions.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    /// <summary>
    /// Repository interface for repository models
    /// </summary>
    public interface IRepository<T> where T : IDataItem<T>
    {
        Task SaveItemAsync(T modelData);

        Task<T> GetItemAsync();

        Task<T> GetItemAsync(string itemId);

        Task<T> GetItemAsync(DateTime date);
        Task<bool> dataCheck(DateTime date);
        Task<IEnumerable<T>> GetItemsAsync();

        Task<IEnumerable<T>> GetItemsAsync(DateTime date);

        Task<ListCollectionPage<T>> GetItemsAsync(DateTime date, int pageSize);

        Task<ListCollectionPage<T>> GetNextItemsAsync(ListCollectionPage<T> listCollectionPage);

        Task<ListCollectionPage<T>> GetPreviousItemsAsync(ListCollectionPage<T> listCollectionPage);

        Task<ListCollectionPage<T>> GetPageItemsAsync(ListCollectionPage<T> listCollectionPage, int page);

        Task<ListCollectionPage<T>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize);

        Task<IEnumerable<T>> GetItemsAsync(DateTime startDate, DateTime endDate);


        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting
        /// unmanaged resources
        /// </summary>
        void Dispose();
    }
}
