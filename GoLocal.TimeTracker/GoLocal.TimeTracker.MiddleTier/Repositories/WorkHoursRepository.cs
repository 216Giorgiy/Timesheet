// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using GoLocal.TimeTracker.MiddleTier.Services;
using System.Globalization;
using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Caching.Memory;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using System.Timers;
using GoLocal.TimeTracker.MiddleTier.Services.AppContext;
using System.Net.Http;
using System.Text;

namespace GoLocal.TimeTracker.MiddleTier.Repositories
{

    /// <summary>
    /// This is the work hours repository
    /// </summary>
    public class WorkHoursRepository : IRepository<WorkHours>
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IUserContext _userContext;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private readonly GraphAppCalendarService _graphCalendarService;
        private readonly GraphAppTasksService _graphTasksService;
        private readonly GraphAppMailService _graphMailService;
        private readonly TimezoneHelper timezoneHelper;
        private readonly ICacheService<ListCollectionPage<WorkHours>> _cacheService;
        private static Timer aTimer;

        public WorkHoursRepository(
            ILogger<WorkHoursRepository> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            IUserContext userContext,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            GraphAppCalendarService graphCalendarService,
            GraphAppTasksService graphTasksService,
            GraphAppMailService graphMailService,
            TimezoneHelper timezoneHelper,
            ICacheService<ListCollectionPage<WorkHours>> cacheService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _graphCalendarService = graphCalendarService ?? throw new ArgumentNullException(nameof(graphCalendarService));
            _graphTasksService = graphTasksService ?? throw new ArgumentNullException(nameof(graphTasksService));
            _graphMailService = graphMailService ?? throw new ArgumentNullException(nameof(graphMailService));
            this.timezoneHelper = timezoneHelper ?? throw new ArgumentNullException(nameof(timezoneHelper));
            _cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
        }


        public async Task SaveItemAsync(WorkHours modelData)
        {
            if (String.IsNullOrEmpty(modelData.Id)) throw new ArgumentNullException(nameof(modelData.Id));

            try
            {
                var workHoursList = new List<WorkHours>();
                var workHoursListCollectionPage = new ListCollectionPage<WorkHours>();
                // This works when dateTime is longer.
                var dateQuery = modelData.Fields.Date.Remove(6);

                // Try to get the work hours from cache
                var cacheKey = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value + dateQuery;
                var workHoursCacheEntry = await _cacheService.TryRetrieveFromCacheAsync(workHoursListCollectionPage, cacheKey);
                if (workHoursCacheEntry != null)
                {
                    // Remove the entry from cache
                    await _cacheService.RemoveFromCacheAsync(cacheKey);

                    var workHoursDataList = workHoursCacheEntry.DataList;
                    var cacheUpdated = false;
                    foreach (var item in workHoursDataList)
                    {
                        if (item.Id == modelData.Id && item.ListId == modelData.ListId && !String.IsNullOrEmpty(modelData.Fields.ObjectIdentifier))
                        {
                            cacheUpdated = true;
                            item.Fields = modelData.Fields;
                        }
                    }

                    if (cacheUpdated)
                    {
                        // Save the udated cache entries
                        workHoursCacheEntry.DataList = workHoursDataList;
                        await _cacheService.SaveToCacheAsync(workHoursCacheEntry, cacheKey);
                    }
                }

                // Get the site list
                var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var siteList = workHoursCacheEntry.SiteList;
                if (String.IsNullOrEmpty(siteList.ListId)) siteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);

                // Create JSON object
                dynamic fieldsObject = new JObject();
                fieldsObject.MeetingAdjustedHours = modelData.Fields.MeetingAdjustedHours;
                fieldsObject.MeetingAdjustedMinutes = modelData.Fields.MeetingAdjustedMinutes;
                fieldsObject.EmailAdjustedHours = modelData.Fields.EmailAdjustedHours;
                fieldsObject.EmailAdjustedMinutes = modelData.Fields.EmailAdjustedMinutes;
                fieldsObject.OtherAdjustedHours = modelData.Fields.OtherAdjustedHours;
                fieldsObject.OtherAdjustedMinutes = modelData.Fields.OtherAdjustedMinutes;
                fieldsObject.AdjustedHoursReason = modelData.Fields.AdjustedHoursReason;

                dynamic rootObject = new JObject();
                rootObject.fields = fieldsObject;

                // Persist to SharePoint
                var result = await _graphSharePointService.UpdateSiteListItemAsync(siteList, modelData.Id, rootObject.ToString());
            }
            catch (Exception ex)
            {
                _logger.LogError("Error saving work hours in repository: " + ex.Message);
            }
        }

        public async Task<WorkHours> GetItemAsync(DateTime date)
        {
            if (date == null) throw new ArgumentNullException(nameof(date));

            try
            {
                // TODO: This method needs testing on 2 user cases: today's date and a past date (1st of the month, middle and last of the month)

                var dateQuery = date.ToString("yyyyMMdd");  // Get an item with specific date

                // Get the site list
                var userObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var siteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);

                // Get the results from the call to GraphService.GetSiteListItemByDateAsync
                var results = await _graphSharePointService.GetSiteListItemsAsync(siteList, dateQuery);

                // Get the WorkHours list with computed work hours
                var workHoursList = await ComputeHours(date, results, siteList, userObjectIdentifier, _timeTrackerOptions, _graphSharePointService, _graphCalendarService, _graphTasksService, _graphMailService, timezoneHelper, _timeTrackerOptions.ExcludedCategories, _timeTrackerOptions.ExcludedShowAs, _timeTrackerOptions.AllDayCountHours);

                return workHoursList.FirstOrDefault<WorkHours>();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting work hour items in repository: " + ex.Message);
                throw;
            }
        }

        public async Task<IEnumerable<WorkHours>> GetItemsAsync(DateTime date)
        {
            if (date == null) throw new ArgumentNullException(nameof(date));

            try
            {
                var workHoursListCollectionPage = new ListCollectionPage<WorkHours>();
                var dateQuery = date.ToString("yyyyMM");  // Get all items in a given month
                var workHoursList = new List<WorkHours>();

                // Try to get the work hours from cache
                var cacheKey = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value + dateQuery;
                var workHoursCacheEntry = await _cacheService.TryRetrieveFromCacheAsync(workHoursListCollectionPage, cacheKey);
                if (workHoursCacheEntry != null) return workHoursCacheEntry.DataList;

                // Get the site list
                workHoursListCollectionPage.ObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
                var userObjectIdentifier = workHoursListCollectionPage.ObjectIdentifier;
                workHoursListCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);
                var siteList = workHoursListCollectionPage.SiteList;

                workHoursListCollectionPage.QueryDate = dateQuery;

                // Get the results from the call to GraphService.GetSiteListItemByDateAsync
                var results = await _graphSharePointService.GetSiteListItemsAsync(siteList, dateQuery);

                // Get the WorkHours list with computed work hours

                if (results.Count == 0)
                {
                    await ExecuteFirstTimeLoginFn(userObjectIdentifier, date, siteList);
                    var fnResult = await _graphSharePointService.GetSiteListItemsAsync(siteList, dateQuery);
                    workHoursList = (await ComputeHours(date, fnResult, siteList, userObjectIdentifier, _timeTrackerOptions, _graphSharePointService, _graphCalendarService, _graphTasksService, _graphMailService, timezoneHelper, _timeTrackerOptions.ExcludedCategories, _timeTrackerOptions.ExcludedShowAs, _timeTrackerOptions.AllDayCountHours)).ToList<WorkHours>();
                    // Write the user profile to cache
                    workHoursListCollectionPage.DataList = workHoursList;
                    await _cacheService.SaveToCacheAsync(workHoursListCollectionPage, cacheKey);
                    return workHoursList;
                }
                else
                {
                    workHoursList = (await ComputeHours(date, results, siteList, userObjectIdentifier, _timeTrackerOptions, _graphSharePointService, _graphCalendarService, _graphTasksService, _graphMailService, timezoneHelper, _timeTrackerOptions.ExcludedCategories, _timeTrackerOptions.ExcludedShowAs, _timeTrackerOptions.AllDayCountHours)).ToList<WorkHours>();
                    // Write the user profile to cache
                    workHoursListCollectionPage.DataList = workHoursList;
                    await _cacheService.SaveToCacheAsync(workHoursListCollectionPage, cacheKey);
                    return workHoursList;
                }

            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting work hour items in repository: " + ex.Message);
                throw;
            }
        }

        private async Task<bool> ExecuteFirstTimeLoginFn(string identifier, DateTime date, SiteList siteList)
        {
            var requestUrl = _timeTrackerOptions.FirstTimeLogin;
            var isSave = false;

            dynamic requestObject = new JObject();

            JObject data = (JObject)JToken.FromObject(siteList);

            requestObject.siteList = data;
            requestObject.date = date;

            string json = JsonConvert.SerializeObject(requestObject);

            // Create the request message and add the content.
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("ObjectIdentifierType", identifier);
                using (HttpResponseMessage httpResponse = client.PostAsync(requestUrl, content).Result)
                {

                    isSave = httpResponse.IsSuccessStatusCode;
                }
            }

            return isSave;

        }

		public static async Task<IEnumerable<WorkHours>> ComputeHoursforWeek(
		   DateTime startDate,
		   DateTime endDate,
		   //IEnumerable<GraphResultItem> results,
		   //SiteList siteList,
		   string userObjectIdentifier,
		   TimeTrackerOptions timeTrackerOptions,
		   GraphAppSharePointService graphSharePointService,
		   GraphAppCalendarService graphCalendarService,
		   GraphAppTasksService graphTasksService,
		   GraphAppMailService graphMailService,
		   TimezoneHelper timezoneHelper,
		   List<string> categoryFilter,
		   List<string> showAsFilter,
		   int allDayCountHours)
		{
			try
			{
				var workHoursList = new List<WorkHours>();

				// Create a variable to track last day retrieved from SharePoint
			//	var lastDay = new DateTime(date.Year, date.Month, 1);
			/*
				foreach (var item in results)
				{
					var workHoursFields = ConvertToWorkHours(item, userObjectIdentifier);

					lastDay = DateTime.ParseExact(workHoursFields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

					workHoursList.Add(new WorkHours
					{
						Id = item.Id,
						Fields = workHoursFields
					});
				}
				*/
				
				var fullCalendar = new List<GraphResultItem>();
				var fullMail = new List<GraphResultItem>();
				var fullTaskItems = new List<JToken>();
				bool finishWeeks = false;

				// Add remaining days till today for calendar
				//var endOfMonth = new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month));
				//DateTime today = DateTime.Now;
				var definedZone = timezoneHelper.timeZoneInfo;

				var today = TimeZoneInfo.ConvertTime(DateTime.Now, definedZone);

				if (today.Date <= endDate.Date)
				{
					endDate = today;
				}

                startDate = new DateTime(startDate.Year, startDate.Month, startDate.Day, 0, 0, 0, 0);

                if (startDate.Date <= endDate.Date)
				{
					
					var taskCalendar = Task.Run(() => graphCalendarService.GetCalendarEventsAsync(startDate, endDate));
					var weeklyCalResults = await taskCalendar;
					if (weeklyCalResults != null)
					{
						foreach (var item in weeklyCalResults)
						{
							fullCalendar.Add(item);
						}
					}

					// Get Emails in inbox for count
					//var emailResults = await graphMailService.GetMailItemsAsync(lastDay, endOfMonth);
					var taskMail = Task.Run(() => graphMailService.GetMailItemsAsync(startDate, endDate));
					var weeklyMailResults = await taskMail;
					if (weeklyMailResults != null)
					{
						foreach (var item in weeklyMailResults)
						{
							fullMail.Add(item);
						}
					}
										
					// To track the day that is being calculated in the while
					var dateToCalculate = startDate;

					while (dateToCalculate.Date <= endDate.Date)
					{
						var workHoursFields = new WorkHoursFields
						{
							Date = dateToCalculate.ToString("yyyyMMdd"),
							ObjectIdentifier = userObjectIdentifier,
							TeamHoursItemState = ItemState.NotSubmitted,
							ItemState = ItemState.NotSubmitted,
							AdjustedHoursReason = "",
							TeamHoursSubmittedDate = new DateTime(),
							SubmittedDate = new DateTime(),
							MeetingHours = 0,
							MeetingMinutes = 0,
							EmailHours = 0,
							EmailMinutes = 0,
							OtherHours = 0,
							OtherMinutes = 0
						};

						#region calendar items
						// var calendarResults = await taskCalendar;

						// Variables needed for calculating sum for calendar events
						double totalTimeSpan = 0;
						var span = TimeSpan.FromHours(0);

						// Calculate time spent in calendar events ////////
						if (fullCalendar != null)
						{

							// TODO: can refactor into a select type statement and remove foreach? var calendarEventsToSum = calendarResults.Select<>
							foreach (var item in fullCalendar)
							{
								// Filter out rules
								var includeItem = true;
								var categories = (List<string>)item.Properties["Categories"];
								foreach (var value in categories)
								{
									if (categoryFilter.Contains(value)) includeItem = false;
								}

								if (showAsFilter.Contains(item.Properties["ShowAs"].ToString())) includeItem = false;

								if (includeItem && !Convert.ToBoolean(item.Properties["IsCancelled"]))
								{
									if (Convert.ToBoolean(item.Properties["IsAllDay"]))
									{
										if (allDayCountHours > 0) totalTimeSpan = totalTimeSpan + allDayCountHours;
									}
									else
									{
										var startTime = Convert.ToDateTime(item.Properties["Start"]);
										var endTime = Convert.ToDateTime(item.Properties["End"]);
                                        if (startTime.Date == dateToCalculate.Date)
                                        {
                                            span = endTime.Subtract(startTime);
                                            totalTimeSpan = totalTimeSpan + span.TotalHours;
                                        }
									}
								}
							}

							span = TimeSpan.FromHours(totalTimeSpan);

							workHoursFields.MeetingHours = Convert.ToInt16(span.Hours);
							workHoursFields.MeetingMinutes = Convert.ToInt16(span.Minutes);
						}

						#endregion

						#region mail items
						// var emailResults = await taskMail;

						// Variables needed for calculating counts of emails
						var sentEmailCount = 0;
						var receivedEmailCount = 0;

						// Calculate time spent in email //////////////
						if (fullMail != null)
						{
							foreach (var item in fullMail)
							{
								// Filter out rules
								var includeItem = true;
								var categories = (List<string>)item.Properties["Categories"];
								foreach (var category in categories)
								{
									if (categoryFilter.Contains(category)) includeItem = false;
								}

								if (includeItem)
								{
									if (Convert.ToDateTime(item.Properties["DateTime"]).Date == dateToCalculate.Date)
									{
										if (item.Properties["EmailType"].ToString() == "received")
										{
											if (Convert.ToBoolean(item.Properties["IsRead"])) receivedEmailCount = receivedEmailCount + 1;
										}
										else if (item.Properties["EmailType"].ToString() == "sent")
										{
											sentEmailCount = sentEmailCount + 1;
										}
									}
								}
							}

							// Calculate total time in minutes
							span = TimeSpan.FromMinutes((sentEmailCount * timeTrackerOptions.SentEmailTime) + (receivedEmailCount * timeTrackerOptions.ReceivedEmailTime));
							workHoursFields.EmailHours = Convert.ToInt16(span.Hours);
							workHoursFields.EmailMinutes = Convert.ToInt16(span.Minutes);
						}

						#endregion

						#region task items
						// var tasksResults = await taskTasksItems;

						// Variables needed for calculating counts of tasks
						var tasksCount = 0;

						if (fullTaskItems?.Count > 0)
						{
							// Initialize the Time Zone based on appSettings value.
							//var definedZone = timezoneHelper.timeZoneInfo;
							// TODO: can refactor into a select type statement and remove foreach? var calendarEventsToSum = calendarResults.Select<>
							foreach (var item in fullTaskItems)
							{
								var dateTime = DateTime.Parse(item["startDateTime"]["dateTime"].ToString());
								// Adjust for TimeZone stored in appSettings.
								var adjustedDateTime = TimeZoneInfo.ConvertTime(dateTime, definedZone);
								if (adjustedDateTime.Date == dateToCalculate.Date)
								{
									tasksCount = tasksCount + 1;
								}
							}

							// Calculate total time in minutes
							span = TimeSpan.FromMinutes(tasksCount * timeTrackerOptions.TaskTime);
							workHoursFields.OtherHours = Convert.ToInt16(span.Hours);
							workHoursFields.OtherMinutes = Convert.ToInt16(span.Minutes);
						}

						#endregion

						var workHours = new WorkHours
						{
							Id = "",
							Fields = workHoursFields
						};

						// Persist to SharePoint
						if (dateToCalculate.Date <= DateTime.Now.Date)
						{
							// Create JSON object
							dynamic fieldsObject = new JObject();
							fieldsObject.ObjectIdentifier = workHoursFields.ObjectIdentifier;
							fieldsObject.Date = workHoursFields.Date;
							fieldsObject.MeetingHours = workHoursFields.MeetingHours;
							fieldsObject.MeetingMinutes = workHoursFields.MeetingMinutes;
							fieldsObject.MeetingAdjustedHours = workHoursFields.MeetingAdjustedHours;
							fieldsObject.MeetingAdjustedMinutes = workHoursFields.MeetingAdjustedMinutes;
							fieldsObject.EmailHours = workHoursFields.EmailHours;
							fieldsObject.EmailMinutes = workHoursFields.EmailMinutes;
							fieldsObject.EmailAdjustedHours = workHoursFields.EmailAdjustedHours;
							fieldsObject.EmailAdjustedMinutes = workHoursFields.EmailAdjustedMinutes;
							fieldsObject.OtherHours = workHoursFields.OtherHours;
							fieldsObject.OtherMinutes = workHoursFields.OtherMinutes;
							fieldsObject.OtherAdjustedHours = workHoursFields.OtherAdjustedHours;
							fieldsObject.OtherAdjustedMinutes = workHoursFields.OtherAdjustedMinutes;
							fieldsObject.AdjustedHoursReason = workHoursFields.AdjustedHoursReason;
							fieldsObject.TeamHoursItemState = workHoursFields.TeamHoursItemState.ToString();
							fieldsObject.ItemState = workHoursFields.ItemState.ToString();

							dynamic jsonObject = new JObject();
							jsonObject.fields = fieldsObject;

							// Call graph to create the item in the SHarePoint List
							//var saveResults = await graphSharePointService.CreateSiteListItemAsync(siteList, jsonObject.ToString());
							//workHours.Id = saveResults;
							workHours.Id = "";
                            workHoursList.Add(workHours);
                        }

						

						dateToCalculate = dateToCalculate.AddDays(1);
					}
				}

				return workHoursList;
			}
			catch (Exception ex)
			{
				throw;
			}
		}


		public static async Task<IEnumerable<WorkHours>> ComputeHours(
            DateTime date, IEnumerable<GraphResultItem> results, 
            SiteList siteList,
            string userObjectIdentifier,
            TimeTrackerOptions timeTrackerOptions,
            GraphAppSharePointService graphSharePointService,
            GraphAppCalendarService graphCalendarService,
            GraphAppTasksService graphTasksService,
            GraphAppMailService graphMailService,
            TimezoneHelper timezoneHelper,
            List<string> categoryFilter,
            List<string> showAsFilter,
            int allDayCountHours)
        {
            try
            {
                var workHoursList = new List<WorkHours>();

                // Create a variable to track last day retrieved from SharePoint
                var lastDay = new DateTime(date.Year, date.Month, 1);

                foreach (var item in results)
                {
                    var workHoursFields = ConvertToWorkHours(item, userObjectIdentifier);

                    lastDay = DateTime.ParseExact(workHoursFields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

                    workHoursList.Add(new WorkHours
                    {
                        Id = item.Id,
                        Fields = workHoursFields
                    });
                }

                // WorkHours Compute Logic
                //
                // New Logic - retrieve 1 week at a time then pause & repeat.
                // Create Arrays[] to hold partial results.
                // Calculate:   1. BeginDate = beginning of Month
                //              2. EndOfWeek - BeginDate +7 days 
                //                  (if EndOfWeek => Now, EndOfWeek = Now, finishWeeks = true)
                //              3. BeginDate = EndOfWeek date +1 
                //              4. if !(finishWeeks), pause - to avoid throttling 
                //              5. Repeat 2-4.

                var fullCalendar = new List<GraphResultItem>();
                var fullMail = new List<GraphResultItem>();
                var fullTaskItems = new List<JToken>();
                bool finishWeeks = false;

                // Add remaining days till today for calendar
                var endOfMonth = new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month));

                if (lastDay.Date != endOfMonth.Date)
                {
                    // Ensure we only calculate until today
                    if (DateTime.Now.Month == date.Month && endOfMonth > DateTime.Now) endOfMonth = DateTime.Now;
                    //endOfMonth = new DateTime(endOfMonth.Year, endOfMonth.Month, endOfMonth.Day, 23, 59, 59, 999);

                    // Skip lastDay TODO: test when today is the first
                    if (endOfMonth.Date > lastDay.Date && lastDay.Day != 1) lastDay = lastDay.AddDays(1);
                    lastDay = new DateTime(lastDay.Year, lastDay.Month, lastDay.Day, 0, 0, 0, 0);

                    // Get calendar items
                    //var calendarResults = await graphCalendarService.GetCalendarEventsAsync(lastDay, endOfMonth);
                    var taskCalendar = Task.Run(() => graphCalendarService.GetCalendarEventsAsync(lastDay, endOfMonth));
                    var weeklyCalResults = await taskCalendar;
                    if (weeklyCalResults != null)
                    {
                        foreach (var item in weeklyCalResults)
                        {
                            fullCalendar.Add(item);
                        }
                    }

                    // Get Emails in inbox for count
                    //var emailResults = await graphMailService.GetMailItemsAsync(lastDay, endOfMonth);
                    var taskMail = Task.Run(() => graphMailService.GetMailItemsAsync(lastDay, endOfMonth));
                    var weeklyMailResults = await taskMail;
                    if (weeklyMailResults != null)
                    {
                        foreach (var item in weeklyMailResults)
                        {
                            fullMail.Add(item);
                        }
                    }

                    // Get task items for count
                    //var tasksResults = await graphTasksService.GetUserTasksAsync(lastDay, endOfMonth);

                    // TODO:  Varma:  uncomment the following after ensuring app context is supported
                    //var taskTasksItems = Task.Run(() => graphTasksService.GetUserTasksAsync(lastDay, endOfMonth));
                    //var weeklyTaskItemsResults = await taskTasksItems;
                    //if (weeklyTaskItemsResults != null)
                    //{
                    //    foreach (var item in weeklyTaskItemsResults)
                    //    {
                    //        fullTaskItems.Add(item);
                    //    }
                    //}

                    // *** Loop Back and do more weeks *** //


                    // To track the day that is being calculated in the while
                    var dateToCalculate = lastDay;

                    while (dateToCalculate.Date <= endOfMonth.Date)
                    {
                        var workHoursFields = new WorkHoursFields
                        {
                            Date = dateToCalculate.ToString("yyyyMMdd"),
                            ObjectIdentifier = userObjectIdentifier,
                            TeamHoursItemState = ItemState.NotSubmitted,
                            ItemState = ItemState.NotSubmitted,
                            AdjustedHoursReason = "",
                            TeamHoursSubmittedDate = new DateTime(),
                            SubmittedDate = new DateTime(),
                            MeetingHours = 0,
                            MeetingMinutes = 0,
                            EmailHours = 0,
                            EmailMinutes = 0,
                            OtherHours = 0,
                            OtherMinutes = 0
                        };

                        #region calendar items
                        // var calendarResults = await taskCalendar;
                        
                        // Variables needed for calculating sum for calendar events
                        double totalTimeSpan = 0;
                        var span = TimeSpan.FromHours(0);                     

                        // Calculate time spent in calendar events ////////
                        if (fullCalendar != null)
                        {
                            
                            // TODO: can refactor into a select type statement and remove foreach? var calendarEventsToSum = calendarResults.Select<>
                            foreach (var item in fullCalendar)
                            {
                                // Filter out rules
                                var includeItem = true;
                                var categories = (List<string>)item.Properties["Categories"];
                                foreach (var value in categories)
                                {
                                    if (categoryFilter.Contains(value)) includeItem = false;
                                }
                                
                                if (showAsFilter.Contains(item.Properties["ShowAs"].ToString())) includeItem = false;

                                if (includeItem && !Convert.ToBoolean(item.Properties["IsCancelled"]))
                                {
                                    if (Convert.ToBoolean(item.Properties["IsAllDay"]))
                                    {
                                        if (allDayCountHours > 0) totalTimeSpan = totalTimeSpan + allDayCountHours;
                                    }
                                    else
                                    {                                  
                                        var startTime = Convert.ToDateTime(item.Properties["Start"]);
                                        var endTime = Convert.ToDateTime(item.Properties["End"]);

                                        if (startTime.Date == dateToCalculate.Date)
                                        {
                                            span = endTime.Subtract(startTime);
                                            totalTimeSpan = totalTimeSpan + span.TotalHours;
                                        }
                                    }
                                }
                            }

                            span = TimeSpan.FromHours(totalTimeSpan);

                            workHoursFields.MeetingHours = Convert.ToInt16(span.Hours);
                            workHoursFields.MeetingMinutes = Convert.ToInt16(span.Minutes);
                        }

                        #endregion

                        #region mail items
                        // var emailResults = await taskMail;

                        // Variables needed for calculating counts of emails
                        var sentEmailCount = 0;
                        var receivedEmailCount = 0;

                        // Calculate time spent in email //////////////
                        if (fullMail != null)
                        {
                            foreach (var item in fullMail)
                            {
                                // Filter out rules
                                var includeItem = true;
                                var categories = (List<string>)item.Properties["Categories"];
                                foreach (var category in categories)
                                {
                                    if (categoryFilter.Contains(category)) includeItem = false;
                                }

                                if (includeItem)
                                {
                                    if (Convert.ToDateTime(item.Properties["DateTime"]).Date == dateToCalculate.Date)
                                    {
                                        if (item.Properties["EmailType"].ToString() == "received")
                                        {
                                            if (Convert.ToBoolean(item.Properties["IsRead"])) receivedEmailCount = receivedEmailCount + 1;
                                        }
                                        else if (item.Properties["EmailType"].ToString() == "sent")
                                        {
                                            sentEmailCount = sentEmailCount + 1;
                                        }
                                    }
                                }    
                            }

                            // Calculate total time in minutes
                            span = TimeSpan.FromMinutes((sentEmailCount * timeTrackerOptions.SentEmailTime) + (receivedEmailCount * timeTrackerOptions.ReceivedEmailTime));
                            workHoursFields.EmailHours = Convert.ToInt16(span.Hours);
                            workHoursFields.EmailMinutes = Convert.ToInt16(span.Minutes);
                        }

                        #endregion

                        #region task items
                        // var tasksResults = await taskTasksItems;

                        // Variables needed for calculating counts of tasks
                        var tasksCount = 0;

                        if (fullTaskItems?.Count > 0)
                        {
                            // Initialize the Time Zone based on appSettings value.
                            var definedZone = timezoneHelper.timeZoneInfo;
                            // TODO: can refactor into a select type statement and remove foreach? var calendarEventsToSum = calendarResults.Select<>
                            foreach (var item in fullTaskItems)
                            {
                                var dateTime = DateTime.Parse(item["startDateTime"]["dateTime"].ToString());
                                // Adjust for TimeZone stored in appSettings.
                                var adjustedDateTime = TimeZoneInfo.ConvertTime(dateTime, definedZone);
                                if (adjustedDateTime.Date == dateToCalculate.Date)
                                {
                                    tasksCount = tasksCount + 1;
                                }
                            }

                            // Calculate total time in minutes
                            span = TimeSpan.FromMinutes(tasksCount * timeTrackerOptions.TaskTime);
                            workHoursFields.OtherHours = Convert.ToInt16(span.Hours);
                            workHoursFields.OtherMinutes = Convert.ToInt16(span.Minutes);
                        }

                        #endregion

                        var workHours = new WorkHours
                        {
                            Id = "",
                            Fields = workHoursFields
                        };

                        // Persist to SharePoint
                        if (dateToCalculate.Date <= DateTime.Now.Date)
                        {
                            // Create JSON object
                            dynamic fieldsObject = new JObject();
                            fieldsObject.ObjectIdentifier = workHoursFields.ObjectIdentifier;
                            fieldsObject.Date = workHoursFields.Date;
                            fieldsObject.MeetingHours = workHoursFields.MeetingHours;
                            fieldsObject.MeetingMinutes = workHoursFields.MeetingMinutes;
                            fieldsObject.MeetingAdjustedHours = workHoursFields.MeetingAdjustedHours;
                            fieldsObject.MeetingAdjustedMinutes = workHoursFields.MeetingAdjustedMinutes;
                            fieldsObject.EmailHours = workHoursFields.EmailHours;
                            fieldsObject.EmailMinutes = workHoursFields.EmailMinutes;
                            fieldsObject.EmailAdjustedHours = workHoursFields.EmailAdjustedHours;
                            fieldsObject.EmailAdjustedMinutes = workHoursFields.EmailAdjustedMinutes;
                            fieldsObject.OtherHours = workHoursFields.OtherHours;
                            fieldsObject.OtherMinutes = workHoursFields.OtherMinutes;
                            fieldsObject.OtherAdjustedHours = workHoursFields.OtherAdjustedHours;
                            fieldsObject.OtherAdjustedMinutes = workHoursFields.OtherAdjustedMinutes;
                            fieldsObject.AdjustedHoursReason = workHoursFields.AdjustedHoursReason;
                            fieldsObject.TeamHoursItemState = workHoursFields.TeamHoursItemState.ToString();
                            fieldsObject.ItemState = workHoursFields.ItemState.ToString();

                            dynamic jsonObject = new JObject();
                            jsonObject.fields = fieldsObject;

                            // Call graph to create the item in the SHarePoint List
                            //var saveResults = await graphSharePointService.CreateSiteListItemAsync(siteList, jsonObject.ToString());
                            workHours.Id = "";
                            workHoursList.Add(workHours);
                        }

                        

                        dateToCalculate = dateToCalculate.AddDays(1);
                    }
                }

                return workHoursList;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static WorkHoursFields ConvertToWorkHours (GraphResultItem graphResultsItem, string userObjectIdentifier)
        {
            try
            {
                var workHoursFields = new WorkHoursFields();
                object objectValue;

                workHoursFields.ObjectIdentifier = userObjectIdentifier;
                if (graphResultsItem.Properties.TryGetValue("Date", out objectValue)) workHoursFields.Date = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("MeetingHours", out objectValue)) workHoursFields.MeetingHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingMinutes", out objectValue)) workHoursFields.MeetingMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingAdjustedHours", out objectValue)) workHoursFields.MeetingAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("MeetingAdjustedMinutes", out objectValue)) workHoursFields.MeetingAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailHours", out objectValue)) workHoursFields.EmailHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailMinutes", out objectValue)) workHoursFields.EmailMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailAdjustedHours", out objectValue)) workHoursFields.EmailAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("EmailAdjustedMinutes", out objectValue)) workHoursFields.EmailAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherHours", out objectValue)) workHoursFields.OtherHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherMinutes", out objectValue)) workHoursFields.OtherMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherAdjustedHours", out objectValue)) workHoursFields.OtherAdjustedHours = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("OtherAdjustedMinutes", out objectValue)) workHoursFields.OtherAdjustedMinutes = Convert.ToInt16(objectValue);
                if (graphResultsItem.Properties.TryGetValue("AdjustedHoursReason", out objectValue)) workHoursFields.AdjustedHoursReason = objectValue.ToString();
                if (graphResultsItem.Properties.TryGetValue("TeamHoursItemState", out objectValue)) workHoursFields.TeamHoursItemState = (ItemState)Enum.Parse(typeof(ItemState), objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("TeamHoursSubmittedDate", out objectValue)) workHoursFields.TeamHoursSubmittedDate = Convert.ToDateTime(objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("ItemState", out objectValue)) workHoursFields.ItemState = (ItemState)Enum.Parse(typeof(ItemState), objectValue.ToString());
                if (graphResultsItem.Properties.TryGetValue("SubmittedDate", out objectValue)) workHoursFields.SubmittedDate = Convert.ToDateTime(objectValue.ToString());

                return workHoursFields;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // Causes a pause between data access calls.
        private static void StartTwoSecTimer()
        {
            // Create a timer with a two second interval.
            aTimer = new System.Timers.Timer(2000);
            // Hook up the Elapsed event for the timer. 
            aTimer.Elapsed += OnTimedEvent;
            aTimer.AutoReset = true;
            aTimer.Enabled = true;
        }
        private static void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            aTimer.Stop();
            aTimer.Dispose();
            // code to start next access here?
        }

        #region Not implemented methods

        /// <summary>
        /// Not implemented, for future use
        /// </summary>
        /// <returns></returns>
        public async Task<WorkHours> GetItemAsync()
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        /// <summary>
        /// Not implemented, for future use
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public async Task<WorkHours> GetItemAsync(string itemId)
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        /// <summary>
        /// Not implemented, for future use
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<WorkHours>> GetItemsAsync()
        {
            // TODO: Implement get "all" here P3 since this is not used in current design
            throw new NotImplementedException();
        }

        /// <summary>
        /// Not implemented, for future use
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        public async Task<IEnumerable<WorkHours>> GetItemsAsync(DateTime startDate, DateTime endDate)
        {
			// TODO: Implement get "all" here P3 since this is not used in current desig
			// throw new NotImplementedException();
			if (startDate == null || endDate == null) throw new ArgumentNullException(nameof(startDate));

			try
			{
				var workHoursListCollectionPage = new ListCollectionPage<WorkHours>();
				var dateQuery = startDate.Date.ToString("yyyyMM");  // Get all items in a given month
				
				var workHoursList = new List<WorkHours>();

				// Try to get the work hours from cache
				var cacheKey = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value + dateQuery;
				//var workHoursCacheEntry = await _cacheService.TryRetrieveFromCacheAsync(workHoursListCollectionPage, cacheKey);
				//if (workHoursCacheEntry != null) return workHoursCacheEntry.DataList;

				// Get the site list
				workHoursListCollectionPage.ObjectIdentifier = _userContext.User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;
				var userObjectIdentifier = workHoursListCollectionPage.ObjectIdentifier;
				workHoursListCollectionPage.SiteList = await _graphSharePointService.GetSiteListAsync(userObjectIdentifier, ListSchema.WorkHoursListSchema);
				var siteList = workHoursListCollectionPage.SiteList;

				//workHoursListCollectionPage.QueryDate = dateQuery;

				// Get the results from the call to GraphService.GetSiteListItemByDateAsync
				var results = await _graphSharePointService.GetSiteListItemsAsync(siteList, dateQuery);//,endDate);

				// Get the WorkHours list with computed work hours

				if (results.Count == 0)
				{
					//await ExecuteFirstTimeLoginFn(userObjectIdentifier, startDate.Date, siteList);
					//var fnResult = await _graphSharePointService.GetSiteListItemsAsync(siteList, dateQuery);
					workHoursList = (await ComputeHoursforWeek(startDate, endDate, userObjectIdentifier, _timeTrackerOptions, _graphSharePointService, _graphCalendarService, _graphTasksService, _graphMailService, timezoneHelper, _timeTrackerOptions.ExcludedCategories, _timeTrackerOptions.ExcludedShowAs, _timeTrackerOptions.AllDayCountHours)).ToList<WorkHours>();
					// Write the user profile to cache
					workHoursListCollectionPage.DataList = workHoursList;
					//await _cacheService.SaveToCacheAsync(workHoursListCollectionPage, cacheKey);
					return workHoursList;
				}
				else
				{
					workHoursList = (await ComputeHours(startDate.Date, results, siteList, userObjectIdentifier, _timeTrackerOptions, _graphSharePointService, _graphCalendarService, _graphTasksService, _graphMailService, timezoneHelper, _timeTrackerOptions.ExcludedCategories, _timeTrackerOptions.ExcludedShowAs, _timeTrackerOptions.AllDayCountHours)).ToList<WorkHours>();
					// Write the user profile to cache
					workHoursListCollectionPage.DataList = workHoursList;
					await _cacheService.SaveToCacheAsync(workHoursListCollectionPage, cacheKey);
					return workHoursList;
				}

			}
			catch (Exception ex)
			{
				_logger.LogError("Error getting work hour items in repository getItemsAsync: " + ex.Message);
				throw;
			}
		}

        public Task<ListCollectionPage<WorkHours>> GetItemsAsync(DateTime date, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<WorkHours>> GetNextItemsAsync(ListCollectionPage<WorkHours> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<WorkHours>> GetPreviousItemsAsync(ListCollectionPage<WorkHours> listCollectionPage)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<WorkHours>> GetPageItemsAsync(ListCollectionPage<WorkHours> listCollectionPage, int page)
        {
            throw new NotImplementedException();
        }

        public Task<ListCollectionPage<WorkHours>> GetSearchResultsAsync(DateTime date, string searchQuery, int pageSize)
        {
            throw new NotImplementedException();
        }

        #endregion


        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting
        /// unmanaged resources
        /// </summary>
        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                // TODO: Clear db context and of any other services or providers
                //if (_dbContext != null)
                //{
                //    _dbContext.Dispose();
                //}
            }
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting
        /// unmanaged resources
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
