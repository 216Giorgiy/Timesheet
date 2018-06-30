// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Newtonsoft.Json;

namespace GoLocal.TimeTracker.MiddleTier.Abstractions
{
    /// <summary>
    /// Provides an interface for data items, root object contains the metadata and fields the data
    /// </summary>
    public interface IDataItem
    {
        /// <summary>
        /// Gets the ID of a data item
        /// </summary>
        /// <value>Unique ID to identify the model data</value>
        [JsonProperty("id")]
        string Id { get; set; }

        [JsonProperty("listId")]
        string ListId { get; set; }
    }

    /// <summary>
    /// Provides an interface for interacting with data items
    /// </summary>
    /// <typeparam name="T">The Type T value of the fields of the data item.</typeparam>
    public interface IDataItem<T> : IDataItem
    {
        /// <summary>
        /// The value representing the document itself
        /// </summary>
        [JsonProperty("fields")]
        T Fields { get; set; }
    }
}
