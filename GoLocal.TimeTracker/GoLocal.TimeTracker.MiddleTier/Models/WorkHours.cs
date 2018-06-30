// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Newtonsoft.Json;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Helpers;

namespace GoLocal.TimeTracker.MiddleTier.Models
{
    /// <summary>
    /// Work hours model class
    /// </summary>
    public class WorkHours : BaseModel<WorkHours>
    {
        public WorkHours()
        {
            // Constructor code
            Fields = new WorkHoursFields();
        }

        public new WorkHoursFields Fields { get; set; }
    }


    public class WorkHoursFields
    {
        /// <summary>
        /// ObjectIdentifier of the item (Guid)
        /// </summary>
        [JsonProperty("ObjectIdentifier")]
        public string ObjectIdentifier { get; set; }

        /// <summary>
        /// Date in format YYYYMMDD
        /// </summary>
        [JsonProperty("Date")]
        public string Date { get; set; }

        /// <summary>
        /// Meeting Hours
        /// </summary>
        [JsonProperty("MeetingHours")]
        public short MeetingHours { get; set; }

        /// <summary>
        /// Meeting Minutes
        /// </summary>
        [JsonProperty("MeetingMinutes")]
        public short MeetingMinutes { get; set; }

        // <summary>
        /// Meeting Adjusted hours
        /// </summary>
        [JsonProperty("MeetingAdjustedHours")]
        public short MeetingAdjustedHours { get; set; }

        // <summary>
        /// Meeting Adjusted minutes
        /// </summary>
        [JsonProperty("MeetingAdjustedMinutes")]
        public short MeetingAdjustedMinutes { get; set; }

        /// <summary>
        /// Email Hours
        /// </summary>
        [JsonProperty("EmailHours")]
        public short EmailHours { get; set; }

        /// <summary>
        /// Email Minutes
        /// </summary>
        [JsonProperty("EmailMinutes")]
        public short EmailMinutes { get; set; }

        // <summary>
        /// Email Adjusted
        /// </summary>
        [JsonProperty("EmailAdjustedHours")]
        public short EmailAdjustedHours { get; set; }

        // <summary>
        /// Email Adjusted
        /// </summary>
        [JsonProperty("EmailAdjustedMinutes")]
        public short EmailAdjustedMinutes { get; set; }

        /// <summary>
        /// Other Hours
        /// </summary>
        [JsonProperty("OtherHours")]
        public short OtherHours { get; set; }

        /// <summary>
        /// Other Minutes
        /// </summary>
        [JsonProperty("OtherMinutes")]
        public short OtherMinutes { get; set; }

        /// <summary>
        /// Other Adjusted
        /// </summary>
        [JsonProperty("OtherAdjustedHours")]
        public short OtherAdjustedHours { get; set; }

        /// <summary>
        /// Other Adjusted
        /// </summary>
        [JsonProperty("OtherAdjustedMinutes")]
        public short OtherAdjustedMinutes { get; set; }

        /// <summary>
        /// Adjusted Hours Reasons
        /// </summary>
        [JsonProperty("AdjustedHoursReason")]
        public String AdjustedHoursReason { get; set; }

        /// <summary>
        /// To track state of which entries have been submitted to HR
        /// </summary>
        [JsonProperty("TeamHoursItemState")]
        public ItemState TeamHoursItemState { get; set; }

        /// <summary>
        /// Submitted date
        /// </summary>
        [JsonProperty("TeamHoursSubmittedDate")]
        public DateTime TeamHoursSubmittedDate { get; set; }

        /// <summary>
        /// Item state
        /// </summary>
        [JsonProperty("ItemState")]
        public ItemState ItemState { get; set; }

        /// <summary>
        /// Submitted date
        /// </summary>
        [JsonProperty("SubmittedDate")]
        public DateTime SubmittedDate { get; set; }
    }
}
