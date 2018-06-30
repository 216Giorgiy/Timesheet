// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

namespace GoLocal.TimeTracker.MiddleTier.Models
{
    public class GraphResultItem
    {
        public GraphResultItem()
        {
            Properties = new Dictionary<string, object>();
        }

        /// <summary>
        /// Id property of the Graph item
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// DisplayName property if the Graph item
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// The properties of an intem from Graph
        /// </summary>
        public Dictionary<string, object> Properties;
    }
}
