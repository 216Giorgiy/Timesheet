// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

using Newtonsoft.Json;
using GoLocal.TimeTracker.MiddleTier.Abstractions;

namespace GoLocal.TimeTracker.MiddleTier.Models
{
    /// <summary>
    /// Notification model class
    /// </summary>
    public class Notifications : BaseModel<Notifications>
    {
        /// <summary>
        /// Constructor to set default values
        /// </summary>
        public Notifications()
        {
            Fields = new NotificationsFields();
        }

        public new NotificationsFields Fields { get; set; }

    }

    public class NotificationsFields
    {
        /// <summary>
        /// ObjectIdentifier of the item (Guid)
        /// </summary>
        [JsonProperty("SentToMail")]
        public string SentToMail { get; set; }

        /// <summary>
        /// ObjectIdentifier of the item (Guid)
        /// </summary>
        [JsonProperty("SentToName")]
        public string SentToName { get; set; }

        /// <summary>
        /// Notification sent date
        /// </summary>
        [JsonProperty("SentDate")]
        public DateTime SentDate { get; set; }

        /// <summary>
        /// ObjectIdentifier of the item (Guid)
        /// </summary>
        [JsonProperty("SentFromMail")]
        public string SentFromMail { get; set; }

        /// <summary>
        /// ObjectIdentifier of the item (Guid)
        /// </summary>
        [JsonProperty("SentFromName")]
        public string SentFromName { get; set; }

        /// <summary>
        /// Notification readed date
        /// </summary>
        [JsonProperty("ReadDate")]
        public DateTime ReadDate { get; set; }

        /// <summary>
        /// Notification message body
        /// </summary>
        [JsonProperty("MessageBody")]
        public string MessageBody { get; set; }
    }

    public enum NotificationType
    {
        SubmitWorkHours,
        SubmitTeamHours,
        RequestWorkHoursRevision,
        WorkHoursReadyForSubmit
    }
}
