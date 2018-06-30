// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    /// <summary>
    /// A base class for all models in this application
    /// </summary>
    [Serializable]
    public class BaseModel<T> : IDataItem<T>, IDataItem
    {
        /// <summary>
        /// Gets  or sets the ID of a data item
        /// </summary>
        /// <value>Unique ID to identify the data item</value>
        [JsonProperty("id")]
        public string Id { get; set; }

        /// <summary>
        /// Gets  or sets the List ID of a data item
        /// </summary>
        /// <value>Unique ID to identify the list</value>
        [JsonProperty("listId")]
        public string ListId { get; set; }

        /// <summary>
        /// The fields of the data item
        /// </summary>
        [JsonProperty("fields")]
        public T Fields { get; set; }
    }
}
