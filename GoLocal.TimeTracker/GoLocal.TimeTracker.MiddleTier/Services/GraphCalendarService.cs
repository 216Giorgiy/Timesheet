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

namespace GoLocal.TimeTracker.MiddleTier.Services
{
    public class GraphCalendarService : GraphServiceBase
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly TimezoneHelper _timezoneHelper;

        /// <summary>
        /// Constructor
        /// </summary>
        public GraphCalendarService(
            IGraphAuthProvider authProvider,
            IUserContext userContext,
            ILogger<GraphCalendarService> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions,
            TimezoneHelper timezoneHelper) : base(authProvider, userContext)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _timezoneHelper = timezoneHelper;
        }

        public async Task<List<GraphResultItem>> GetCalendarEventsAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                if (startDate == null) throw new ArgumentNullException(nameof(startDate));
                if (endDate == null) throw new ArgumentNullException(nameof(endDate));

                var options = new List<QueryOption>();
                // format must be 2018-01-01T19:00:00.0000000
                options.Add(new QueryOption("startDateTime", startDate.ToString("yyyy-MM-dd'T'HH':'mm':'ss")));
                options.Add(new QueryOption("endDateTime", endDate.ToString("yyyy-MM-dd'T'HH':'mm':'ss")));

                var graphResponse = await GraphClient.Me.CalendarView.Request(options).GetAsync();

                var calendarEvents = new List<GraphResultItem>();
                if (graphResponse?.Count == 0) return calendarEvents; // No calendar events found for this query

                var eventsResults = new List<Event>();
                eventsResults.AddRange(graphResponse);

                while (graphResponse.NextPageRequest != null)
                {
                    graphResponse = await graphResponse.NextPageRequest.GetAsync();
                    eventsResults.AddRange(graphResponse);
                }

                // Initialize the Time Zone based on appSettings value.
                var definedZone = _timezoneHelper.timeZoneInfo;
                TimeZoneInfo localTimeZone = TimeZoneInfo.Local;

                foreach (var item in eventsResults)
                {
                    var resultsItemProperties = new Dictionary<string, object>();
                    var eventId = item.Id;
                    DateTime startTime = DateTime.Parse(item.Start.DateTime);
                    DateTime endTime = DateTime.Parse(item.End.DateTime);
                    // Skip invalid Local Daylight Savings Time values.
                    if ((localTimeZone.IsInvalidTime(startTime) == false) && (localTimeZone.IsInvalidTime(endTime) == false))
                    {
                        String localStartStr = TimeZoneInfo.ConvertTime(startTime, definedZone).ToString();
                        resultsItemProperties.Add("Start", localStartStr);
                        String localEndStr = TimeZoneInfo.ConvertTime(endTime, definedZone).ToString();
                        resultsItemProperties.Add("End", localEndStr);
                        resultsItemProperties.Add("IsAllDay", item.IsAllDay);
                        resultsItemProperties.Add("IsCancelled", item.IsCancelled);
                        resultsItemProperties.Add("ShowAs", item.ShowAs);
                        resultsItemProperties.Add("Categories", item.Categories);
                        resultsItemProperties.Add("Sensitivity", item.Sensitivity);

                        calendarEvents.Add(new GraphResultItem
                        {
                            Id = eventId,
                            Properties = resultsItemProperties
                        });
                    }
                }

                return calendarEvents;
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
