// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;
using GoLocal.TimeWise.AzureFunctions.Models;
using Microsoft.Graph;
using GoLocal.TimeWise.AzureFunctions.Helpers;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    /// <summary>
    /// Interface for collection pages.
    /// </summary>
    /// <typeparam name="T">The type of the collection.</typeparam>
    public interface IListCollectionPage<T>
    {
        /// <summary>
        /// The current page of the collection.
        /// </summary>
        IList<T> DataList { get; set; }

        SiteList SiteList { get; set; }

        int CurrentPageIndex { get; set; }

        int PageSize { get; set; }

        string ObjectIdentifier { get; set; }

        string QueryDate { get; set; }

        string SearchQuery { get; set; }

        string SkipToken { get; set; }
    }
}
