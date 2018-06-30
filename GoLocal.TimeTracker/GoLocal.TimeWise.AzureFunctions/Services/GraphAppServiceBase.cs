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
using Microsoft.Graph;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using System.Net.Http.Headers;

namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public abstract class GraphAppServiceBase
    {
        private readonly IGraphAuthProvider _authProvider;
        private readonly IUserContext _userContext;
        private GraphServiceClient _graphServiceClient;
        private GraphServiceClient _graphServiceAppClient;


        public GraphAppServiceBase(IGraphAuthProvider authProvider, IUserContext userContext)
        {
            _authProvider = authProvider ?? throw new ArgumentNullException(nameof(authProvider));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }


        /// <summary>
        /// Gets the <see cref="ClaimsPrincipal"/> for user associated with the executing action.
        /// </summary>
        public ClaimsPrincipal User => _userContext?.User;

        public GraphServiceClient GraphAppClient
        {
            get
            {
                if (_graphServiceAppClient == null)
                {
                    _graphServiceAppClient = GetAuthenticatedAppClient();
                }

                return _graphServiceAppClient;
            }
        }

        public GraphServiceClient GetAuthenticatedAppClient()
        {
            if (_graphServiceAppClient != null) return _graphServiceAppClient;
            _graphServiceAppClient = new GraphServiceClient(new DelegateAuthenticationProvider(
                async requestMessage =>
                {
                    // Passing tenant ID to the auth provider to use as a cache key
                    var accessToken = await _authProvider.GetAppAccessTokenAsync();

                    // Append the access token to the request
                    requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                    // This header identifies the app in the Microsoft Graph service. If extracting this code for your project please remove.
                    // requestMessage.Headers.Add("SomeID", "golocal-timetracker"
                }));

            return _graphServiceAppClient;
        }
    }
}
