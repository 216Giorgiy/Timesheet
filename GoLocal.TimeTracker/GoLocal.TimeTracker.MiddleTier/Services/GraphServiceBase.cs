// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

using System.IO;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Net.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Graph;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GoLocal.TimeTracker.MiddleTier.Utilities;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using GoLocal.TimeTracker.MiddleTier.Extensions;
using System.Net.Http.Headers;

namespace GoLocal.TimeTracker.MiddleTier.Services
{
    public abstract class GraphServiceBase
    {
        private readonly IGraphAuthProvider _authProvider;
        private readonly IUserContext _userContext;
        private GraphServiceClient _graphServiceClient;
        private GraphServiceClient _graphServiceAppClient;


        public GraphServiceBase(IGraphAuthProvider authProvider, IUserContext userContext)
        {
            _authProvider = authProvider ?? throw new ArgumentNullException(nameof(authProvider));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }


        /// <summary>
        /// Gets the <see cref="ClaimsPrincipal"/> for user associated with the executing action.
        /// </summary>
        public ClaimsPrincipal User => _userContext?.User;

        public GraphServiceClient GraphClient
        {
            get
            {
                if (_graphServiceClient == null)
                {
                    _graphServiceClient = GetAuthenticatedClient(User.FindFirst(AzureAdAuthenticationBuilderExtensions.ObjectIdentifierType)?.Value);
                }

                return _graphServiceClient;
            }
        }

        // Get an authenticated Microsoft Graph Service client.
        public GraphServiceClient GetAuthenticatedClient(string userId)
        {
            if (_graphServiceClient != null) return _graphServiceClient;
            _graphServiceClient = new GraphServiceClient(new DelegateAuthenticationProvider(
                async requestMessage =>
                {
                    // Passing tenant ID to the auth provider to use as a cache key
                    var accessToken = await _authProvider.GetUserAccessTokenAsync(userId);

                    // Append the access token to the request
                    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                    // This header identifies the app in the Microsoft Graph service. If extracting this code for your project please remove.
                    // requestMessage.Headers.Add("SomeID", "golocal-timetracker");
                }));

            return _graphServiceClient;
        }
    }
}
