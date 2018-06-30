// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

namespace GoLocal.TimeWise.AzureFunctions.Models
{
    public class TimeTrackerOptions
    {
        /// <summary>
        /// Max hours per day before starting overtime - used only if week and month is set to 0
        /// </summary>
        public int DayHours { get; set; }

        /// <summary>
        /// Max hours per week before starting overtime - used only if month is set to 0
        /// </summary>
        public int WeekHours { get; set; }

        /// <summary>
        /// Max hours per month before starting overtime - used only if month is set to 0
        /// </summary>
        public int MonthHours { get; set; }

        /// <summary>
        /// SharePoint Site Id that stores the lists used in Time Tracker
        /// </summary>
        public string SharePointSiteId { get; set; }

        // <summary>
        /// SharePoint Site name that stores the lists used in Time Tracker
        /// </summary>
        public string SharePointSiteName { get; set; }

        /// <summary>
        /// If using a SharePoint list for group membership the list Id
        /// </summary>
        public string SharePointGroupId { get; set; }

        /// <summary>
        /// The SharePoint list to track the users of Time Tracker
        /// </summary>
        public string SharePointUsersList { get; set; }

        /// <summary>
        /// The SharePoint list to track the users of Time Tracker
        /// </summary>
        public string SharePointTotalHoursList { get; set; }

        /// <summary>
        /// First day of week
        /// </summary>
        public string FirstDayWeek { get; set; }

        /// <summary>
        /// Defined Time Zone
        /// </summary>
        public string TimeZone { get; set; }

        /// <summary>
        /// HR Group
        /// </summary>
        public string HrGroup { get; set; }

        /// <summary>
        /// HR notification email
        /// </summary>
        public string HrNotificationMail { get; set; }

        /// <summary>
        /// Enable / disable HR notification alerts
        /// </summary>
        public bool HrNotificationAlerts { get; set; }

        /// <summary>
        /// Admin Group
        /// </summary>
        public string AdminGroup { get; set; }

        /// <summary>
        /// Name of the category to filter out in compute hours for mail & calendar items
        /// </summary>
        public List<string> ExcludedCategories { get; set; }

        /// <summary>
        /// Show As states which should be filtered out
        /// </summary>
        public List<string> ExcludedShowAs { get; set; }

        /// <summary>
        /// Number of hours that "All day" events will count for. 0 means exclude
        /// </summary>
        public int AllDayCountHours { get; set; }

        /// <summary>
        /// Schedule for Employee autosubmit to Manager as a Cron expression - if this value is set, auto submit will be triggered per expressio value.
        /// Cron expression format: https://en.wikipedia.org/wiki/Cron#CRON_expression
        /// If the expression is set for a day that the current month does not have, then last day of current month will be used, for example:
        /// If value = 30, in Februrary the last cut off day will be 28 (or 29 for leap year) but for march it will be on the 30th
        /// </summary>
        public string CutoffDayEmployee { get; set; }

        /// <summary>
        /// Schedule for Manager autosubmit to HR as a Cron expression - if this value is set, auto submit will be triggered per expressio value.
        /// Cron expression format: https://en.wikipedia.org/wiki/Cron#CRON_expression
        /// If the expression is set for a day that the current month does not have, then last day of current month will be used, for example:
        /// If value = 30, in Februrary the last cut off day will be 28 (or 29 for leap year) but for march it will be on the 30th
        /// </summary>
        public string CutoffDayManager { get; set; }

        /// <summary>
        /// If set to true, then work hours are editable by employees
        /// </summary>
        public bool WorkHoursEditable { get; set; }

        /// <summary>
        /// If set to true, then team hours are editable by manager
        /// Not implmented - kept for extensibility to support manager to adjust hours of employees
        /// </summary>
        public bool TeamHoursEditable { get; set; }

        /// <summary>
        /// Report Hours List Prefix
        /// </summary>
        public string ReportHoursListPrefix { get; set; }

        /// <summary>
        /// Team Hours List Prefix
        /// </summary>
        public string TeamHoursListPrefix { get; set; }

        /// <summary>
        /// Work Hours List Prefix
        /// </summary>
        public string WorkHoursListPrefix { get; set; }

        /// <summary>
        /// Notifications List Prefix
        /// </summary>
        public string NotificationsListPrefix { get; set; }

        /// <summary>
        /// Value in minutes to use when calculating time spent in email for received emails marked as read in Inbox
        /// </summary>
        public double ReceivedEmailTime { get; set; }

        /// <summary>
        /// Value in minutes to use when calculating time spent in email based on emails in sent items
        /// </summary>
        public double SentEmailTime { get; set; }

        /// <summary>
        /// Value in minutes to use when calculating time spent in tasks on a given day based on the start date specified
        /// </summary>
        public double TaskTime { get; set; }

        /// <summary>
        /// Number of days to keep in the history for work hours
        /// </summary>
        public int DaysHistory { get; set; }

        /// <summary>
        /// Request Url for the Graph API 
        /// </summary>
        public string GraphRequestUrl { get; set; }

        /// <summary>
        /// Request Url for the Graph API Beta
        /// </summary>
        public string GraphBetaRequestUrl { get; set; }

        /// <summary>
        /// Time in minutes for the WorkHours cache, 0 means don't use cache
        /// </summary>
        public int WorkHoursCacheMinutes { get; set; }

        /// <summary>
        /// Time in minutes for the notifications cache, 0 means don't use cache
        /// </summary>
        public int NotificationsCacheMinutes { get; set; }

        /// <summary>
        /// Time in minutes for the user profile cache, 0 means don't use cache
        /// </summary>
        public int UserProfileCacheMinutes { get; set; }
    }
}
