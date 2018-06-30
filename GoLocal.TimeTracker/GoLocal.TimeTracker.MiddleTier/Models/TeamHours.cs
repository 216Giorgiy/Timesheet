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
    /// Team hours model class
    /// </summary>
    public class TeamHours : BaseModel<TeamHours>
    {
        public TeamHours()
        {
            Fields = new TeamHoursFields();
        }

        public new TeamHoursFields Fields { get; set; }
    }

    public class TeamHoursFields
    {
        /// <summary>
        /// ObjectIdentifier of the user (Guid) that submitted the hours
        /// </summary>
        [JsonProperty("ObjectIdentifier")]
        public string ObjectIdentifier { get; set; }

        /// <summary>
        /// Display name of the user this field is calculated on runtime and not persisted
        /// </summary>
        [JsonProperty("DisplayName")]
        public string DisplayName { get; set; }

        /// <summary>
        /// Date in format YYYYMM
        /// </summary>
        [JsonProperty("Date")]
        public string Date { get; set; }

        /// <summary>
        /// Meeting Hours
        /// </summary>
        [JsonProperty("MeetingHours")]
        public Int16 MeetingHours { get; set; }

        /// <summary>
        /// Meeting Minutes
        /// </summary>
        [JsonProperty("MeetingMinutes")]
        public Int16 MeetingMinutes { get; set; }

        // <summary>
        /// Meeting Adjusted hours
        /// </summary>
        [JsonProperty("MeetingAdjustedHours")]
        public Int16 MeetingAdjustedHours { get; set; }

        // <summary>
        /// Meeting Adjusted minutes
        /// </summary>
        [JsonProperty("MeetingAdjustedMinutes")]
        public Int16 MeetingAdjustedMinutes { get; set; }

        /// <summary>
        /// Email Hours
        /// </summary>
        [JsonProperty("EmailHours")]
        public Int16 EmailHours { get; set; }

        /// <summary>
        /// Email Minutes
        /// </summary>
        [JsonProperty("EmailMinutes")]
        public Int16 EmailMinutes { get; set; }

        // <summary>
        /// Email Adjusted
        /// </summary>
        [JsonProperty("EmailAdjustedHours")]
        public Int16 EmailAdjustedHours { get; set; }

        // <summary>
        /// Email Adjusted
        /// </summary>
        [JsonProperty("EmailAdjustedMinutes")]
        public Int16 EmailAdjustedMinutes { get; set; }

        /// <summary>
        /// Other Hours
        /// </summary>
        [JsonProperty("OtherHours")]
        public Int16 OtherHours { get; set; }

        /// <summary>
        /// Other Minutes
        /// </summary>
        [JsonProperty("OtherMinutes")]
        public Int16 OtherMinutes { get; set; }

        /// <summary>
        /// Other Adjusted
        /// </summary>
        [JsonProperty("OtherAdjustedHours")]
        public Int16 OtherAdjustedHours { get; set; }

        /// <summary>
        /// Other Adjusted
        /// </summary>
        [JsonProperty("OtherAdjustedMinutes")]
        public Int16 OtherAdjustedMinutes { get; set; }

        /// <summary>
        /// Adjusted Hours Reason notes
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
        /// To track the state of this item in respect workflow to from employee to manager
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
