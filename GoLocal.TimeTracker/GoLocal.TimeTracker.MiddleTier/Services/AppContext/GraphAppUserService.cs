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
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Helpers;
using System.Linq;

namespace GoLocal.TimeTracker.MiddleTier.Services.AppContext
{
    public class GraphAppUserService : GraphAppServiceBase
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// Constructor
        /// </summary>
        public GraphAppUserService(
            IGraphAuthProvider authProvider,
            IUserContext userContext,
            ILogger<GraphAppUserService> logger,
            IOptions<TimeTrackerOptions> timeTrackerOptions,
            IHostingEnvironment hostingEnvironment) : base(authProvider, userContext)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
        }


        public async Task<GraphResultItem> GetUserBasicAsync(string userObjectIdentifier)
        {
            try
            {
                // Call to Graph API to get the current user direct reports information.
                var graphRequest = new User();

                graphRequest = await GraphAppClient.Users[userObjectIdentifier].Request().GetAsync();

                if (graphRequest == null) return null;

                var graphResultsItem = new GraphResultItem
                {
                    Id = graphRequest.Id,
                    DisplayName = graphRequest.DisplayName,
                    Properties = new Dictionary<string, object>
                    {
                        { "Upn", graphRequest.UserPrincipalName },
                        { "Id", graphRequest.Id },
                        { "Mail", graphRequest.Mail },
                        //{ "Picture", managerPicture } TODO: Decide if we need this, commenting out for now to save graph calls
                    }
                };

                return graphResultsItem;
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

        public async Task<GraphResultItem> GetUserManagerAsync(string userObjectIdentifier)
        {
            try
            {
                // Call to Graph API to get the current user direct reports information.
                var graphRequest = new User();

                graphRequest = await GraphAppClient.Users[userObjectIdentifier].Manager.Request().GetAsync() as User;

                if (graphRequest == null) return null;

                var graphResultsItem = new GraphResultItem
                {
                    Id = graphRequest.Id,
                    DisplayName = graphRequest.DisplayName,
                    Properties = new Dictionary<string, object>
                    {
                        { "Upn", graphRequest.UserPrincipalName },
                        { "Id", graphRequest.Id },
                        { "Mail", graphRequest.Mail }
                        //{ "Picture", managerPicture } TODO: Decide if we need this, commenting out for now to save graph calls
                    }
                };

                return graphResultsItem;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        return null;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task<GraphResultItem> GetMyManagerAsync(string userObjectIdentifier)
        {
            try
            {
                // Call to Graph API to get the current user manager information.
                var graphRequest = await GraphAppClient.Users[userObjectIdentifier].Manager.Request().GetAsync() as User;

                // If no manager found return empty object
                if (graphRequest == null) return new GraphResultItem { Id = "", DisplayName = "" };

                // Get picture of manager
                var managerPicture = await GetPictureBase64Async(graphRequest.Mail ?? graphRequest.UserPrincipalName);

                var graphResultsItem = new GraphResultItem
                {
                    Id = graphRequest.Id,
                    DisplayName = graphRequest.DisplayName,
                    Properties = new Dictionary<string, object>
                    {
                        { "Upn", graphRequest.UserPrincipalName },
                        { "Id", graphRequest.Id },
                        { "Mail", graphRequest.Mail },
                        { "Picture", managerPicture }
                    }
                };

                return graphResultsItem;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                        return new GraphResultItem
                        {
                            Id = "",
                            DisplayName = "",
                            Properties = new Dictionary<string, object>
                            {
                                { "Upn", "" },
                                { "Id", "" },
                                { "Mail", "" },
                                { "Picture", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==" }
                            }
                        };
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

        public async Task<bool> GetMyHasDirectReportsAsync(string userObjectIdentifier)
        {
            try
            {
                // Call to Graph API to get the current user direct reports information.
                var graphRequest = await GraphAppClient.Users[userObjectIdentifier].DirectReports.Request().Top(1).GetAsync();

                if (graphRequest?.Count > 0) return true;

                return false;
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
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

        public async Task<string> GetPictureBase64Async(string userMail)
        {
            try
            {
                if (!String.IsNullOrEmpty(userMail))
                {
                    // Load user's profile picture.
                    var pictureStream = await GraphAppClient.Users[userMail].Photo.Content.Request().GetAsync();

                    // Copy stream to MemoryStream object so that it can be converted to byte array.
                    var pictureMemoryStream = new MemoryStream();
                    await pictureStream.CopyToAsync(pictureMemoryStream);

                    // Convert stream to byte array.
                    var pictureByteArray = pictureMemoryStream.ToArray();

                    // Convert byte array to base64 string.
                    var pictureBase64 = Convert.ToBase64String(pictureByteArray);

                    return "data:image/jpeg;base64," + pictureBase64;
                }

                return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
                    case "ResourceNotFound":
                        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
                    case "ErrorItemNotFound":
                        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
                    case "itemNotFound":
                        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
                    case "ErrorInvalidUser":
                        // If picture not found, return the default image.
                        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        return null;
                    default:
                        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4NCjxzdmcgd2lkdGg9IjQwMXB4IiBoZWlnaHQ9IjQwMXB4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDMxMi44MDkgMCA0MDEgNDAxIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjMxMi44MDkgMCA0MDEgNDAxIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+DQoJPHJlY3QgeD0iNjAxLjQ1IiB5PSI2NTMuMDciIHdpZHRoPSI0MDEiIGhlaWdodD0iNDAxIiBmaWxsPSIjRTRFNkU3Ii8+DQoJPHBhdGggZD0ibTgwMi4zOCA5MDguMDhjLTg0LjUxNSAwLTE1My41MiA0OC4xODUtMTU3LjM4IDEwOC42MmgzMTQuNzljLTMuODctNjAuNDQtNzIuOS0xMDguNjItMTU3LjQxLTEwOC42MnoiIGZpbGw9IiNBRUI0QjciLz4NCgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+DQo8L2c+DQo8L3N2Zz4NCg==";
                }
            }
        }

        public async Task<GraphResultItem> GetMyUserInfoAsync(string userObjectIdentifier)
        {
            try
            {
                // Call to Graph API to get the current user information.
                var graphRequest = await GraphAppClient.Users[userObjectIdentifier].Request().GetAsync() as User;
                // TODO: See if with 1 call we can get everything like picture, manager, etc.

                if (graphRequest == null) throw new ServiceException(new Error { Code = ErrorConstants.Codes.ItemNotFound });

                // Get picture of user 
                var userPicture = await GetPictureBase64Async(graphRequest.Mail ?? graphRequest.UserPrincipalName);

                var graphResultsItem = new GraphResultItem
                {
                    Id = graphRequest.Id,
                    DisplayName = graphRequest.DisplayName,
                    Properties = new Dictionary<string, object>
                    {
                        { "Upn", graphRequest.UserPrincipalName },
                        { "Mail", graphRequest.Mail ?? graphRequest.UserPrincipalName },
                        { "Picture", userPicture }
                    }
                };

                return graphResultsItem;
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

		public async Task<Boolean> GetMemberOfGroupsAsync(string ADGroupName)
		{
			
			// GET: https://graph.microsoft.com/v1.0/users/{userid}/memberOf

			try
			{
				string ObjectIdentifierType = "http://schemas.microsoft.com/identity/claims/objectidentifier";
				var userIdentifier = User.FindFirst(ObjectIdentifierType).Value;

				// Call to Graph API to get the groups for the user
				var graphResponse = await GraphAppClient.Users[userIdentifier].MemberOf.Request().GetAsync();

				//if no records are present, return false
				if (graphResponse?.Count == 0) return false;
				
				foreach (var item in graphResponse)
				{
					if (item.GetType() == typeof(Microsoft.Graph.Group))
					{
						if (((Microsoft.Graph.Group)item).DisplayName == ADGroupName)
						{
							return true;
						}
					
					}

				}
				return false;
								
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


		public async Task<Boolean> GetMemberOfAsync(string ADGroupName)
		{
            try
            {
				var result = false;
                // var graphResultsItems = new List<GraphResultItem>();
                if (String.IsNullOrEmpty(_timeTrackerOptions.SharePointGroupId)) // Uses Azure AD to get group membership
                {
					result = await GetMemberOfAsync(ADGroupName);
                }
                else // Uses SharePoint group to get group membership
                {
					//graphResultsItems = await GetSiteListMemberOfAsync();
					result = await GetMemberOfGroupsAsync(ADGroupName);

				}

                return result;
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

        public async Task<IListCollectionPage<GraphResultItem>> GetUserDirectReportsAsync(string userObjectIdentifier, string skipToken = "", int pageSize = 10)
        {
            try
            {
                var directReportsList = new ListCollectionPage<GraphResultItem>();
                directReportsList.ObjectIdentifier = userObjectIdentifier;

                var queryOptions = new List<QueryOption>();
                if (!String.IsNullOrEmpty(skipToken)) queryOptions.Add(new QueryOption("$skiptoken", skipToken));

                // Call to Graph API to get the current user direct reports information.
                var graphRequest = await GraphAppClient.Users[userObjectIdentifier].DirectReports.Request(queryOptions).Top(pageSize).GetAsync();

                if (graphRequest?.Count == 0) return directReportsList;

                if (graphRequest.NextPageRequest != null)
                {
                    var graphRequestOptions = graphRequest.NextPageRequest.QueryOptions.ToList();
                    directReportsList.SkipToken = graphRequestOptions.Find(x => x.Name == "$skiptoken").Value ?? "";
                }
                else
                {
                    directReportsList.SkipToken = "";
                }

                foreach (User user in graphRequest)
                {
                    directReportsList.DataList.Add(new GraphResultItem
                    {
                        Id = user.Id,
                        DisplayName = user.DisplayName,
                        Properties = new Dictionary<string, object>
                        {
                            { "Mail", user.Mail },
                            { "Upn", user.UserPrincipalName }
                        }
                    });
                }

                return directReportsList;
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
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        throw;
                    default:
                        throw;
                }
            }
        }

        public async Task SendEmailAsync(string userObjectIdentifier, string sendTo, string subject, string emailTemplate)
        {
            if (sendTo == null) return;

            var attachments = new MessageAttachmentsCollectionPage();

            try
            {
                // Load user's profile picture.
                var pictureStream = await GraphAppClient.Users[userObjectIdentifier].Photo.Content.Request().GetAsync();

                // Copy stream to MemoryStream object so that it can be converted to byte array.
                var pictureMemoryStream = new MemoryStream();
                await pictureStream.CopyToAsync(pictureMemoryStream);

                // Convert stream to byte array and add as attachment.
                attachments.Add(new FileAttachment
                {
                    ODataType = "#microsoft.graph.fileAttachment",
                    ContentBytes = pictureMemoryStream.ToArray(),
                    ContentType = "image/png",
                    Name = "me.png"
                });
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        break;
                    case "TokenNotFound":
                        //await HttpContext.ChallengeAsync();
                        break;
                    default:
                        throw;
                }
            }

            // Prepare the recipient list.
            var splitRecipientsString = sendTo.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries);
            var recipientList = splitRecipientsString.Select(recipient => new Recipient
            {
                EmailAddress = new EmailAddress
                {
                    Address = recipient.Trim()
                }
            }).ToList();

            // Build the email message.
            var email = new Message
            {
                Body = new ItemBody
                {
                    Content = System.IO.File.ReadAllText(_hostingEnvironment.WebRootPath + emailTemplate),
                    ContentType = BodyType.Html,
                },
                Subject = subject,
                ToRecipients = recipientList,
                Attachments = attachments
            };

            await GraphAppClient.Users[userObjectIdentifier].SendMail(email, true).Request().PostAsync();
        }

        private async Task<List<GraphResultItem>> GetSiteListMemberOfAsync()
        {
            try
            {
                // Get users's email.
                var email = User.Identity.Name ?? User.FindFirst("preferred_username").Value;

                var options = new List<QueryOption>();
                options.Add(new QueryOption("filter", @"startswith(fields/UserMail,'" + email + "')"));
                options.Add(new QueryOption("expand", @"fields"));
                //options.Add(new QueryOption("expand", @"fields($select=UserMail)")); // TODO Optional: See how we can use the fieldtype person in sharepoint right now if we use it we can't filter

                var listExists = false;
                try
                {
                    // Call to Graph API to check if SharePoint List exists.
                    var graphRequest = await GraphAppClient.Sites[_timeTrackerOptions.SharePointSiteId].Lists[_timeTrackerOptions.SharePointGroupId].Request().GetAsync();
                    listExists = true;
                }
                catch (ServiceException ex)
                {
                    if (ex.Error.Code != "itemNotFound") throw;
                }

                // List does not exists, create one
                if (!listExists)
                {
                    await CreateSiteListAsync();
                }

                // Call to Graph API to get the content of HR group list.
                var graphResponse = await GraphAppClient.Sites[_timeTrackerOptions.SharePointSiteId].Lists[_timeTrackerOptions.SharePointGroupId].Items.Request(options).GetAsync();

                var graphResultsItems = new List<GraphResultItem>();
                if (graphResponse?.Count == 0) return graphResultsItems;

                // Iterate graph call to get all
                var listItemsResults = new List<ListItem>();
                listItemsResults.AddRange(graphResponse);

                while (graphResponse.NextPageRequest != null)
                {
                    graphResponse = await graphResponse.NextPageRequest.GetAsync();
                    listItemsResults.AddRange(graphResponse);
                }

                foreach (var item in listItemsResults)
                {
                    graphResultsItems.Add(new GraphResultItem
                    {
                        Id = item.Id,
                        DisplayName = item.Fields.AdditionalData["GroupMembership"].ToString()
                    });
                }

                return graphResultsItems;
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

        private async Task CreateSiteListAsync()
        {
            try
            {
                // TODO Optional: see how we can just leverage code in GraphSharePointService
                var htmlBody = SharePointListsSchemaHelper.GetGroupMembershipJsonSchema(_timeTrackerOptions.SharePointGroupId);

                var requestUrl = _timeTrackerOptions.GraphRequestUrl + "/sites/" + _timeTrackerOptions.SharePointSiteId + "/lists";

                // Create the request message and add the content.
                HttpRequestMessage hrm = new HttpRequestMessage(HttpMethod.Post, requestUrl);
                hrm.Content = new StringContent(htmlBody, System.Text.Encoding.UTF8, "application/json");

                // Authenticate (add access token) our HttpRequestMessage
                await GraphAppClient.AuthenticationProvider.AuthenticateRequestAsync(hrm);

                // Send the request and get the response.
                HttpResponseMessage response = await GraphAppClient.HttpProvider.SendAsync(hrm);

                // Get the content from the response.
                if (response.StatusCode != System.Net.HttpStatusCode.Created)
                {
                    //var content = await response.Content.ReadAsStringAsync();
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

    }
}
