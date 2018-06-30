﻿// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Repository;
using GoLocal.TimeWise.AzureFunctions.Services;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Helpers
{
    public class WorkflowServiceHelper
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly IRepository<UserProfile> _userProfileRepository;

        /// <summary>
        /// Constructor
        /// </summary>
        public WorkflowServiceHelper(
            TimeTrackerOptions timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            UserProfileRepository userProfileRepository)
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _userProfileRepository = userProfileRepository ?? throw new ArgumentNullException(nameof(userProfileRepository));
        }


        public async Task SendNotificationAsync(GraphResultItem sendToObject, NotificationType notificationType, string messageBody = "")
        {
            try
            {
                if (sendToObject == null) throw new ArgumentNullException(nameof(sendToObject));

                var userProfile = await _userProfileRepository.GetItemAsync();

                // Create notification entry and persist
                var notification = new Notifications
                {
                    Fields = new NotificationsFields
                    {
                        SentToMail = sendToObject.Properties["Mail"].ToString(),
                        SentToName = sendToObject.DisplayName,
                        SentFromMail = userProfile.Fields.Mail ?? userProfile.Fields.Upn,
                        SentFromName = userProfile.Fields.DisplayName,
                        SentDate = DateTime.Now,
                        MessageBody = messageBody
                    }
                };

                if (!_timeTrackerOptions.HrNotificationAlerts && sendToObject.Id == "inbox")
                {
                    // Don't create the notification alert for HR if disabled in app settings
                }
                else
                {
                    // Get the SpSiteList, if the list does not exists, it will create one
                    var notificationsSiteList = await _graphSharePointService.GetSiteListAsync(sendToObject.Id, ListSchema.NotificationsListSchema);

                    // Create JSON object to update or create WORK HOURS (aka employee entries) in SharePoint
                    dynamic notificationsFieldsObject = new JObject();
                    notificationsFieldsObject.SentToMail = notification.Fields.SentToMail;
                    notificationsFieldsObject.SentDate = notification.Fields.SentDate;
                    notificationsFieldsObject.SentFromMail = notification.Fields.SentFromMail;
                    notificationsFieldsObject.MessageBody = notification.Fields.MessageBody ?? "";

                    dynamic notificationsRootObject = new JObject();
                    notificationsRootObject.fields = notificationsFieldsObject;

                    // Add new notification in SharePoint
                    var result = await _graphSharePointService.CreateSiteListItemAsync(notificationsSiteList, notificationsRootObject.ToString());
                }

                // If user elected to get notifications by email, send the notification email
                if (userProfile.Fields.EmailNotifications)
                {
                    var emailTemplate = "/" + notificationType.ToString() + "_template.html";

                    // Send email TODO: Add localization to subject parameter below
                    await _graphUserService.SendEmailAsync(userProfile.Fields.ObjectIdentifier, notification.Fields.SentToMail, "Notification from Time Tracker", emailTemplate);
                }
            }
            catch (Exception ex)
            {
               
            }
        }

        public string ComposeMessageBody(NotificationType notificationType, DateTime dateForMessageBody, string reason = "")
        {
            //var messageBody = "";

            //switch (notificationType)
            //{
            //    case NotificationType.SubmitWorkHours:
            //        messageBody = "Work hours submission for the month of: " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateForMessageBody.Month);
            //        break;
            //    case NotificationType.RequestWorkHoursRevision:
            //        messageBody = "The work hours for the month of " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateForMessageBody.Month) + " requires to be reviewed again, the reason provided by your manager is: " + reason;
            //        break;
            //    case NotificationType.SubmitTeamHours:
            //        messageBody = "Manager has submitted the work hours for the month of " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateForMessageBody.Month);
            //        break;
            //    case NotificationType.WorkHoursReadyForSubmit:
            //        messageBody = "The work hours for the month of " + CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(dateForMessageBody.Month) + " are ready to be reviwed and submitted";
            //        break;
            //}

            //return messageBody;
            return reason;
        }
    }
}
