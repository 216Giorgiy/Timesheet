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

namespace GoLocal.TimeTracker.MiddleTier.Models
{
    /// <summary>
    /// User profile model class
    /// </summary>
    public class UserProfile : BaseModel<UserProfile>
    {
        public UserProfile()
        {
            Fields = new UserProfileFields();
        }

        public new UserProfileFields Fields { get; set; }
    }

    public class UserProfileFields
    {
        /// <summary>
        /// User UPN
        /// </summary>
        [JsonProperty("ObjectIdentifier")]
        public string ObjectIdentifier { get; set; }

        /// <summary>
        /// Display nae of the user
        /// </summary>
        [JsonProperty("DisplayName")]
        public string DisplayName { get; set; }

        /// <summary>
        /// User UPN
        /// </summary>
        [JsonProperty("Upn")]
        public string Upn { get; set; }

        /// <summary>
        /// User preferred email address
        /// </summary>
        [JsonProperty("Mail")]
        public string Mail { get; set; }

        /// <summary>
        /// Picture of the user encoded in base 64
        /// </summary>
        [JsonProperty("UserPicture")]
        public string UserPicture { get; set; }

        /// <summary>
        /// Is manager
        /// </summary>
        [JsonProperty("IsManager")]
        public bool IsManager { get; set; }

        /// <summary>
        /// Is HR
        /// </summary>
        [JsonProperty("IsHr")]
        public bool IsHr { get; set; }

        /// <summary>
        /// Is Admin
        /// </summary>
        [JsonProperty("IsAdmin")]
        public bool IsAdmin { get; set; }

        /// <summary>
        /// Enable email notifications
        /// </summary>
        [JsonProperty("EmailNotifications")]
        public bool EmailNotifications { get; set; }

        /// <summary>
        /// Name of the manager of a user
        /// </summary>
        [JsonProperty("Manager")]
        public string Manager { get; set; }

        /// <summary>
        /// Picture of the manager of a user encoded in base 64
        /// </summary>
        [JsonProperty("ManagerPicture")]
        public string ManagerPicture { get; set; }

        /// <summary>
        /// SharePoint site ID that contains the list associated to a user
        /// </summary>
        [JsonProperty("SpSiteId")]
        public string SpSiteId { get; set; }

        /// <summary>
        /// SharePoint list ID associated to a user
        /// </summary>
        [JsonProperty("SpListId")]
        public string SpListId { get; set; }

        /// <summary>
        /// First day of week
        /// </summary>
        [JsonProperty("FirstDayWeek")]
        public string FirstDayWeek { get; set; }

        /// <summary>
        /// Daily Update Status
        /// </summary>
        [JsonProperty("DailyUpdateStatus")]
        public string DailyUpdateStatus { get; set; } // initial, scheduled, inprogress, updated

        /// <summary>
        /// Daily Update Date
        /// </summary>
        [JsonProperty("UpdateDate")]
        public DateTime UpdateDate { get; set; }

        /// <summary>
        /// Auto-Submitted Status
        /// </summary>
        [JsonProperty("AutoSubmitStatus")]
        public string AutoSubmitStatus { get; set; } // initial, scheduled, inprogress, submitted

        /// <summary>
        /// Auto-Submit Date
        /// </summary>
        [JsonProperty("SubmitDate")]
        public DateTime SubmitDate { get; set; }

    }
}
