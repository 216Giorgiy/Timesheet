// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
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
using GoLocal.TimeWise.AzureFunctions.Utilities;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using System.Linq;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class GraphAppSharePointService : GraphAppServiceBase
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;

        /// <summary>
        /// Constructor
        /// </summary>
        public GraphAppSharePointService(
            IGraphAuthProvider authProvider,
            IUserContext userContext,
            TimeTrackerOptions timeTrackerOptions) : base(authProvider, userContext)
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
        }


        public async Task<SiteList> GetSiteListAsync(string identifier, ListSchema listSchema)
        {
            try
            {
                if (String.IsNullOrEmpty(identifier)) throw new ArgumentNullException(nameof(identifier));

                var spSiteList = new SiteList
                {
                    SiteId = _timeTrackerOptions.SharePointSiteId
                };

                switch (listSchema)
                {
                    case ListSchema.NotificationsListSchema:
                        spSiteList.ListId = _timeTrackerOptions.NotificationsListPrefix + identifier;
                        break;
                    case ListSchema.ReportHoursListSchema:
                        spSiteList.ListId = _timeTrackerOptions.ReportHoursListPrefix + identifier;
                        break;
                    case ListSchema.TeamHoursListSchema:
                        spSiteList.ListId = _timeTrackerOptions.TeamHoursListPrefix + identifier;
                        break;
                    case ListSchema.WorkHoursListSchema:
                        spSiteList.ListId = _timeTrackerOptions.WorkHoursListPrefix + identifier;
                        break;
                    case ListSchema.UsersListSchema:
                        spSiteList.ListId = _timeTrackerOptions.SharePointUsersList;
                        break;
                    case ListSchema.TotalHrsListSchema:
                        spSiteList.ListId = _timeTrackerOptions.SharePointTotalHoursList;
                        break;
                }

                // Call to Graph API to check if SharePoint List exists.
                var listExists = await TryGetSiteListAsync(spSiteList);

                // Create List if it does not exists.
                if (!listExists)
                {
                    switch (listSchema)
                    {
                        case ListSchema.NotificationsListSchema:
                            await CreateSiteListAsync(spSiteList, ListSchema.NotificationsListSchema);
                            break;
                        case ListSchema.ReportHoursListSchema:
                            await CreateSiteListAsync(spSiteList, ListSchema.ReportHoursListSchema);
                            break;
                        case ListSchema.TeamHoursListSchema:
                            await CreateSiteListAsync(spSiteList, ListSchema.TeamHoursListSchema);
                            break;
                        case ListSchema.WorkHoursListSchema:
                            await CreateSiteListAsync(spSiteList, ListSchema.WorkHoursListSchema);
                            break;
                        case ListSchema.UsersListSchema:
                            await CreateSiteListAsync(spSiteList, ListSchema.UsersListSchema);
                            break;
                        case ListSchema.TotalHrsListSchema:
                            await CreateSiteListAsync(spSiteList, ListSchema.TotalHrsListSchema);
                            break;
                    }
                }

                return spSiteList;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task CreateSiteListAsync(SiteList siteList, ListSchema listSchema)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));

                var htmlBody = "";

                switch (listSchema)
                {
                    case ListSchema.NotificationsListSchema:
                        htmlBody = SharePointListsSchemaHelper.GetNotificationsJsonSchema(siteList.ListId);
                        break;
                    case ListSchema.ReportHoursListSchema:
                        htmlBody = SharePointListsSchemaHelper.GetReportHoursJsonSchema(siteList.ListId);
                        break;
                    case ListSchema.TeamHoursListSchema:
                        htmlBody = SharePointListsSchemaHelper.GetTeamHoursJsonSchema(siteList.ListId);
                        break;
                    case ListSchema.WorkHoursListSchema:
                        htmlBody = SharePointListsSchemaHelper.GetWorkHoursJsonSchema(siteList.ListId);
                        break;
                    case ListSchema.UsersListSchema:
                        htmlBody = SharePointListsSchemaHelper.GetUsersMembershipJsonSchema(siteList.ListId);
                        break;
                    case ListSchema.TotalHrsListSchema:
                        htmlBody = SharePointListsSchemaHelper.GetTotalHoursJsonSchema(siteList.ListId);
                        break;
                }

                var requestUrl = _timeTrackerOptions.GraphRequestUrl + "/sites/" + siteList.SiteId + "/lists";

                // Create the request message and add the content.
                HttpRequestMessage hrm = new HttpRequestMessage(HttpMethod.Post, requestUrl);
                hrm.Content = new StringContent(htmlBody, System.Text.Encoding.UTF8, "application/json");

                var response = new HttpResponseMessage();

                // Authenticate (add access token) our HttpRequestMessage
                await GraphAppClient.AuthenticationProvider.AuthenticateRequestAsync(hrm);

                // Send the request and get the response.
                response = await GraphAppClient.HttpProvider.SendAsync(hrm);

                // Get the content from the response.
                if (response.StatusCode != System.Net.HttpStatusCode.Created)
                {
                    // TODO: Depending on code, rise proper exception for now invalid request is
                    throw new ServiceException(new Error { Code = ErrorConstants.Codes.InvalidRequest, Message = response.StatusCode.ToString() });
                }
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<string> CreateSiteListItemAsync(SiteList siteList, string siteListItemJson)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));
                if (String.IsNullOrEmpty(siteListItemJson.ToString())) throw new ArgumentNullException(nameof(siteListItemJson));

                var requestUrl = _timeTrackerOptions.GraphRequestUrl + "/sites/" + siteList.SiteId + "/lists/" + siteList.ListId + "/items/";

                // Create the request message and add the content.
                HttpRequestMessage hrm = new HttpRequestMessage(HttpMethod.Post, requestUrl);
                hrm.Content = new StringContent(siteListItemJson, Encoding.UTF8, "application/json");

                var response = new HttpResponseMessage();

                // Authenticate (add access token) our HttpRequestMessage
                await GraphAppClient.AuthenticationProvider.AuthenticateRequestAsync(hrm);

                // Send the request and get the response.
                response = await GraphAppClient.HttpProvider.SendAsync(hrm);

                var returnId = "";
                // Get the status response and throw if is not 201.
                if (response.StatusCode != System.Net.HttpStatusCode.Created)
                {
                    // TODO: Depending on code, rise proper exception for now invalid request is
                    throw new ServiceException(new Error { Code = ErrorConstants.Codes.InvalidRequest, Message = response.StatusCode.ToString() });
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync();
                    JObject responseJObject = JObject.Parse(content); ;

                    returnId = responseJObject["fields"]["id"].ToString();
                }

                return returnId;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<string> UpdateSiteListItemAsync(SiteList siteList, string itemId, string siteListItemJson)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));
                if (String.IsNullOrEmpty(siteListItemJson.ToString())) throw new ArgumentNullException(nameof(siteListItemJson));

                var method = new HttpMethod("PATCH");
                var requestUrl = _timeTrackerOptions.GraphRequestUrl + "/sites/" + siteList.SiteId + "/lists/" + siteList.ListId + "/items/" + itemId;

                // Create the request message and add the content.
                HttpRequestMessage hrm = new HttpRequestMessage(method, requestUrl);
                hrm.Content = new StringContent(siteListItemJson, Encoding.UTF8, "application/json");

                var response = new HttpResponseMessage();

                // Authenticate (add access token) our HttpRequestMessage
                await GraphAppClient.AuthenticationProvider.AuthenticateRequestAsync(hrm);

                // Send the request and get the response.
                response = await GraphAppClient.HttpProvider.SendAsync(hrm);

                // Get the status response and throw is not 201.
                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    // TODO: Depending on code, rise proper exception for now invalid request is
                    throw new ServiceException(new Error { Code = ErrorConstants.Codes.InvalidRequest, Message = response.StatusCode.ToString() });
                }

                return itemId;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<List<GraphResultItem>> GetSiteListItemsAsync(SiteList siteList)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));

                var listItemResults = new List<ListItem>();

                // Call to graph API to retrieve List Items filtered by dateQuery (match pattern: yyyyMMdd) example: for full month 201802
                var graphResponse = await GraphAppClient.Sites[siteList.SiteId].Lists[siteList.ListId].Items.Request().Expand("fields").GetAsync();

                if (graphResponse == null) throw new ServiceException(new Error { Code = ErrorConstants.Codes.ItemNotFound });

                listItemResults.AddRange(graphResponse);

                while (graphResponse.NextPageRequest != null)
                {
                    graphResponse = await graphResponse.NextPageRequest.GetAsync();
                    listItemResults.AddRange(graphResponse);
                }

                if (listItemResults?.Count == 0) throw new ServiceException(new Error { Code = ErrorConstants.Codes.ItemNotFound });

                var resultItems = new List<GraphResultItem>();

                foreach (var item in listItemResults)
                {
                    var resultsItemProperties = new Dictionary<string, object>();

                    foreach (var field in item.Fields.AdditionalData)
                    {
                        resultsItemProperties.Add(field.Key, field.Value.ToString());
                    }

                    resultItems.Add(new GraphResultItem
                    {
                        Id = item.Id,
                        Properties = resultsItemProperties
                    });
                }

                return resultItems;
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
                    case "ErrorInvalidUser":
                        throw;
                    case "AuthenticationFailure":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
            catch (Exception ex)
            {
                //_logger.LogError("Error GetSiteListItems: " + ex.Message);
                throw;
            }
        }

        public async Task<List<GraphResultItem>> GetSiteListItemsAsync(SiteList siteList, string dateQuery)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));
                if (String.IsNullOrEmpty(dateQuery)) throw new ArgumentNullException(nameof(dateQuery));

                var options = new List<QueryOption>();
                options.Add(new QueryOption("filter", @"startswith(fields/Date,'" + dateQuery + "')"));

                return await GetSiteListItemsAsync(siteList, options);
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
                    case "ErrorInvalidUser":
                        throw;
                    case "AuthenticationFailure":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<List<GraphResultItem>> GetSiteListItemsAsync(SiteList siteList, string startDate, string endDate)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));
                if (String.IsNullOrEmpty(startDate)) throw new ArgumentNullException(nameof(startDate));
                if (String.IsNullOrEmpty(endDate)) throw new ArgumentNullException(nameof(endDate));

                var options = new List<QueryOption>();
                options.Add(new QueryOption("filter", @"startswith(fields/StartDate,'" + startDate + "' and startswith(fields/EndDate,'" + endDate + "')"));

                return await GetSiteListItemsAsync(siteList, options);
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
                    case "ErrorInvalidUser":
                        throw;
                    case "AuthenticationFailure":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<List<GraphResultItem>> GetSiteListItemsAsync(SiteList siteList, IEnumerable<QueryOption> queryOptions)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));
                if (queryOptions == null) throw new ArgumentNullException(nameof(queryOptions));


                var listItemResults = new List<ListItem>();

                var options = queryOptions.ToList<QueryOption>();

                // Call to graph API to retrieve List Items filtered by dateQuery (match pattern: yyyyMMdd) example: for full month 201802
                var graphResponse = new ListItemsCollectionPage();
                graphResponse = (ListItemsCollectionPage)await GraphAppClient.Sites[siteList.SiteId].Lists[siteList.ListId].Items.Request(options).Expand("fields").GetAsync();//.Items.Request(options).Expand("fields").GetAsync();

                if (graphResponse == null) throw new ServiceException(new Error { Code = ErrorConstants.Codes.ItemNotFound });

                listItemResults.AddRange(graphResponse);

                while (graphResponse.NextPageRequest != null)
                {
                    graphResponse = (ListItemsCollectionPage)await graphResponse.NextPageRequest.GetAsync();
                    listItemResults.AddRange(graphResponse);
                }

                if (listItemResults?.Count == 0) throw new ServiceException(new Error { Code = ErrorConstants.Codes.ItemNotFound });

                var resultItems = new List<GraphResultItem>();

                foreach (var item in listItemResults)
                {
                    var resultsItemProperties = new Dictionary<string, object>();

                    foreach (var field in item.Fields.AdditionalData)
                    {
                        resultsItemProperties.Add(field.Key, field.Value.ToString());
                    }

                    resultItems.Add(new GraphResultItem
                    {
                        Id = item.Id,
                        Properties = resultsItemProperties
                    });
                }

                return resultItems;
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
                    case "ErrorInvalidUser":
                        throw;
                    case "AuthenticationFailure":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<IListCollectionPage<GraphResultItem>> GetSiteListItemsAsync(SiteList siteList, IEnumerable<QueryOption> queryOptions, int pageSize = 10)
        {
            try
            {
                if (String.IsNullOrEmpty(siteList.ListId)) throw new ArgumentNullException(nameof(siteList.ListId));
                if (String.IsNullOrEmpty(siteList.SiteId)) throw new ArgumentNullException(nameof(siteList.SiteId));
                if (queryOptions == null) throw new ArgumentNullException(nameof(queryOptions));

                var listItemResults = new List<ListItem>();

                var options = queryOptions.ToList<QueryOption>();
                options.Add(new QueryOption("top", pageSize.ToString()));

                // Call to graph API to retrieve List Items filtered by dateQuery (match pattern: yyyyMMdd) example: for full month 201802
                var graphRequest = await GraphAppClient.Sites[siteList.SiteId].Lists[siteList.ListId].Items.Request(options).Expand("fields").GetAsync();

                if (graphRequest?.Count == 0) throw new ServiceException(new Error { Code = ErrorConstants.Codes.ItemNotFound });

                var graphRequestList = new ListCollectionPage<GraphResultItem>();

                if (graphRequest.NextPageRequest != null)
                {
                    var graphRequestOptions = graphRequest.NextPageRequest.QueryOptions.ToList();
                    graphRequestList.SkipToken = graphRequestOptions.Find(x => x.Name == "$skiptoken").Value ?? "";
                }

                var resultItems = new List<GraphResultItem>();

                foreach (var item in graphRequest)
                {
                    var resultsItemProperties = new Dictionary<string, object>();

                    foreach (var field in item.Fields.AdditionalData)
                    {
                        resultsItemProperties.Add(field.Key, field.Value.ToString());
                    }

                    resultItems.Add(new GraphResultItem
                    {
                        Id = item.Id,
                        Properties = resultsItemProperties
                    });
                }

                graphRequestList.DataList = resultItems;

                return graphRequestList;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        return new ListCollectionPage<GraphResultItem>();
                    case "ErrorInvalidUser":
                        throw;
                    case "AuthenticationFailure":
                        throw;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        // Private methods
        private async Task<bool> TryGetSiteListAsync(SiteList spSiteList)
        {
            try
            {
                // Call to Graph API to check if SharePoint List exists.
                var graphRequest = new List();
                graphRequest = await GraphAppClient.Sites[spSiteList.SiteId].Lists[spSiteList.ListId].Request().GetAsync();

                return true;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                        throw;
                    case "itemNotFound":
                        return false;
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
