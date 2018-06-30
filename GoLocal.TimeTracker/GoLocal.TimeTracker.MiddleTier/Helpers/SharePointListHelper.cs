// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using Microsoft.Graph;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using GoLocal.TimeTracker.MiddleTier.Models;

namespace GoLocal.TimeTracker.MiddleTier.Helpers
{
    public class SharePointListHelper
    {
        // For future user
    }

    public class SiteList
    {
        /// <summary>
        /// SharePoint site Id
        /// </summary>
        [JsonProperty("siteId")]
        public string SiteId { get; set; }

        /// <summary>
        /// SharePoint site Id
        /// </summary>
        [JsonProperty("listId")]
        public string ListId { get; set; }
    }

    public enum ItemState
    {
        NotSubmitted,
        Submitted,
        RequiresRevision,
        RevisionSubmitted,
        SubmittedBySystem
    }
}
