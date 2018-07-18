// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

using System.IO;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Utilities;


namespace GoLocal.TimeTracker.MiddleTier.Services.AppContext
{
    public class GraphAppMailService : GraphAppServiceBase
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly TimezoneHelper _timezoneHelper;

        /// <summary>
        /// Constructor
        /// </summary>
        public GraphAppMailService(
            IGraphAuthProvider authProvider,
            IUserContext userContext,
            ILogger<GraphAppMailService> logger,
            TimezoneHelper timezoneHelper,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions): base(authProvider, userContext)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _timezoneHelper = timezoneHelper;
        }

        public async Task<List<GraphResultItem>> GetMailItemsAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                if (startDate == null) throw new ArgumentNullException(nameof(startDate));
                if (endDate == null) throw new ArgumentNullException(nameof(endDate));

                // Initialize the Time Zone based on appSettings value.
                var definedZone = _timezoneHelper.timeZoneInfo;
                TimeZoneInfo localTimeZone = TimeZoneInfo.Local;

                var options = new List<QueryOption>();
				// format must be 2018-01-01T19:00:00.0000000
				//   string queryFilter = "(receivedDateTime ge " + startDate.ToString("yyyy-MM-dd'T'HH':'mm':'ss") + ") and " +
				//      "(receivedDateTime le " + endDate.ToString("yyyy-MM-dd'T'HH':'mm':'ss") + ")";
				//  options.Add(new QueryOption("$filter", queryFilter));

				options.Add(new QueryOption("$select", "id,categories,receivedDateTime,isRead"));

				options.Add(new QueryOption("$filter", @"ReceivedDateTime ge " + TimeZoneInfo.ConvertTimeToUtc(startDate, localTimeZone).ToString("yyyy-MM-dd'T'HH':'mm':'ss'Z'") + " and " +
				"receivedDateTime le " + TimeZoneInfo.ConvertTimeToUtc(endDate,localTimeZone).ToString("yyyy-MM-dd'T'HH':'mm':'ss'Z'")));

                string userObjectIdentifier = User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;

                var graphResponse = await GraphAppClient.Users[userObjectIdentifier].MailFolders.Inbox.Messages.Request(options).GetAsync();
                // for sent items need to format query as:
                // /me/mailFolders('SentItems')/messages

                var mailItems = new List<GraphResultItem>();
               

                if (graphResponse?.Count == 0) return mailItems; // No calendar events found for this query

                var mailResults = new List<Message>();
                mailResults.AddRange(graphResponse);

				while (graphResponse.NextPageRequest != null)
				{
					graphResponse = await graphResponse.NextPageRequest.GetAsync();
					mailResults.AddRange(graphResponse);
				}


                foreach (var item in mailResults)
                {
                    var resultsItemProperties = new Dictionary<string, object>();
                    resultsItemProperties.Add("IsRead", item.IsRead);
                    DateTime readTime = item.ReceivedDateTime.Value.DateTime;
                    DateTime localReadTime;
                    if (localTimeZone.IsInvalidTime(readTime) == false) // Skip invalid Local Daylight Savings Time values.
                    {
                        localReadTime = TimeZoneInfo.ConvertTime(readTime, definedZone);
                        resultsItemProperties.Add("DateTime", localReadTime);
                        resultsItemProperties.Add("Categories", item.Categories);
                        resultsItemProperties.Add("EmailType", "received");

                        mailItems.Add(new GraphResultItem
                        {
                            Id = item.Id,
                            Properties = resultsItemProperties
                        });
                    }
                }

                var sentOptions = new List<QueryOption>();


				options.Add(new QueryOption("$select", "id,categories,receivedDateTime,isRead"));

				sentOptions.Add(new QueryOption("$filter", @"LastModifiedDateTime ge " + TimeZoneInfo.ConvertTimeToUtc(startDate, localTimeZone).ToString("yyyy-MM-dd'T'HH':'mm':'ss'Z'") + " and " +
				"LastModifiedDateTime le " + TimeZoneInfo.ConvertTimeToUtc(endDate, localTimeZone).ToString("yyyy-MM-dd'T'HH':'mm':'ss'Z'")));

				//var queryFilter = "(LastModifiedDateTime ge " + startDate.ToString("yyyy-MM-dd'T'HH':'mm':'ss'Z") + ") and " +
                  //  "(LastModifiedDateTime le " + endDate.ToString("yyyy-MM-dd'T'HH':'mm':'ss'Z") + ")";
                //sentOptions.Add(new QueryOption("$filter", queryFilter));

                // Also retrieve and count sent mails between these dates.
                // createdDateTime gt
                var sentGraphResponse = await GraphAppClient.Users[userObjectIdentifier].MailFolders.SentItems.Messages.Request(sentOptions).GetAsync();
                var sentMailItems = new List<GraphResultItem>();
                if (sentGraphResponse?.Count == 0) return sentMailItems; // sent mail events found for this query

                var sentMailResults = new List<Message>();
                sentMailResults.AddRange(sentGraphResponse);

                while (sentGraphResponse.NextPageRequest != null)
                {
                    sentGraphResponse = await sentGraphResponse.NextPageRequest.GetAsync();
                    sentMailResults.AddRange(sentGraphResponse);
                }

                foreach (var item in sentMailResults)
                {
                    var resultsItemProperties = new Dictionary<string, object>();

                    resultsItemProperties.Add("IsRead", item.IsRead);
                    resultsItemProperties.Add("DateTime", item.ReceivedDateTime.Value.DateTime);
                    resultsItemProperties.Add("Categories", item.Categories);
                    resultsItemProperties.Add("EmailType", "sent");

                    mailItems.Add(new GraphResultItem
                    {
                        Id = item.Id,
                        Properties = resultsItemProperties
                    });
                }


                return mailItems;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        return new List<GraphResultItem>();
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }
    }
}
