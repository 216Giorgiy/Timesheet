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
using GoLocal.TimeTracker.MiddleTier.Extensions;
using System.Linq;

namespace GoLocal.TimeTracker.MiddleTier.Services.AppContext
{
    public class GraphAppTasksService : GraphAppServiceBase
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;

        /// <summary>
        /// Constructor
        /// </summary>
        public GraphAppTasksService(
            IGraphAuthProvider authProvider,
            IUserContext userContext,
            ILogger<GraphAppTasksService> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions) : base(authProvider, userContext)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
        }

        public async Task<IList<JToken>> GetUserTasksAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                if (startDate == null) throw new ArgumentNullException(nameof(startDate));
                if (endDate == null) throw new ArgumentNullException(nameof(endDate));

                //TODO: Varma: check how to replace /me with object identifier for user.
                // Get the user object identifier
                var userObjectIdentifier = User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value;

                // Call to Graph API Beta to get tasks filtered: https://graph.microsoft.com/beta/me/outlook/tasks?filter=startDateTime/dateTime gt '2018-02-16T08:00:00.0000000' and startDateTime/dateTime lt '2018-02-18T08:00:00.0000000'
                var requestUrl = _timeTrackerOptions.GraphBetaRequestUrl + 
                    "users/" + userObjectIdentifier +
                    "/outlook/tasks?filter=startDateTime/dateTime ge '" + startDate.ToString("s") + "' and startDateTime/dateTime le '" + endDate.ToString("s") + "'";

                // Create the request message and add the content.
                HttpRequestMessage hrm = new HttpRequestMessage(HttpMethod.Get, requestUrl);

                // Authenticate (add access token) our HttpRequestMessage
                await GraphAppClient.AuthenticationProvider.AuthenticateRequestAsync(hrm);

                // Send the request and get the response.
                HttpResponseMessage response = await GraphAppClient.HttpProvider.SendAsync(hrm);

                // Get the status response and throw is not 201.
                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    // TODO: Depending on code, rise proper exception for now invalid request is
                    throw new ServiceException(new Error { Code = ErrorConstants.Codes.InvalidRequest, Message = response.StatusCode.ToString() });
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync();
                    JObject responseJObject = JObject.Parse(content);

                    // get JSON result objects into a list
                    IList<JToken> results = responseJObject["value"].Children().ToList();

                    return results;
                }
            }
            catch (ServiceException ex)
            {
                switch (ex.Error.Code)
                {
                    case "RESTAPINotEnabledForComponentSharedMailbox":
                    case "Request_ResourceNotFound":
                    case "ResourceNotFound":
                    case "ErrorItemNotFound":
                    case "itemNotFound":
                        return new List<JToken>();
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
