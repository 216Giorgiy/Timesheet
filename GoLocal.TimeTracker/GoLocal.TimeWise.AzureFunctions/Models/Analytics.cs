// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;

namespace GoLocal.TimeWise.AzureFunctions.Models
{
    public class Analytics : BaseModel<Analytics>
    {
        public Analytics()
        {
            Fields = new AnalyticsFields();
        }

        public new AnalyticsFields Fields { get; set; }
    }

    public class AnalyticsFields
    {
        /// <summary>
        /// ObjectIdentifier of the use that the hours belong to
        /// </summary>
        [JsonProperty("ObjectIdentifier")]
        public string ObjectIdentifier { get; set; }

        [JsonProperty("Date")]
        public string Date { get; set; }

        /// <summary>
        /// Meeting Hours
        /// </summary>
        [JsonProperty("TotalHours")]
        public short TotalHours { get; set; }

        /// <summary>
        /// Meeting Minutes
        /// </summary>
        [JsonProperty("TotalMinutes")]
        public short TotalMinutes { get; set; }

        // <summary>
        /// Meeting Adjusted hours
        /// </summary>
        [JsonProperty("OvertimeHours")]
        public short OvertimeHours { get; set; }

        // <summary>
        /// Meeting Adjusted minutes
        /// </summary>
        [JsonProperty("OvertimeMinutes")]
        public short OvertimeMinutes { get; set; }

    }
}
