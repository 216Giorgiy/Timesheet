// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.Graph;
using GoLocal.TimeWise.AzureFunctions.Services;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Models;



namespace GoLocal.TimeWise.AzureFunctions.Helpers
{
    public class GraphAuthProvider : IGraphAuthProvider
    {
        private readonly IMemoryCache _memoryCache;
        private Microsoft.Identity.Client.TokenCache _userTokenCache;

        // Properties used to get and manage an access token.
        private readonly string _appId;
        private readonly string _aadInstance;
        private readonly Microsoft.Identity.Client.ClientCredential _credential;
        private readonly string _appSecret;
        private readonly string[] _scopes;
        private readonly string _redirectUri;
        private readonly string _graphResourceId;
        private readonly string _tenantId;

        public GraphAuthProvider(IMemoryCache memoryCache, IConfiguration configuration)
        {
            var azureOptions = new AzureAdOptions();
            configuration.Bind("AzureAd", azureOptions);

            _appId = azureOptions.ClientId;
            _aadInstance = azureOptions.Instance;
            _appSecret = azureOptions.ClientSecret;
            _credential = new Microsoft.Identity.Client.ClientCredential(azureOptions.ClientSecret); // For development mode purposes only. Production apps should use a client certificate.
            _scopes = azureOptions.GraphScopes.Split(new[] { ' ' });
            _redirectUri = azureOptions.BaseUrl + azureOptions.CallbackPath;
            _graphResourceId = azureOptions.GraphResourceId;
            _tenantId = azureOptions.TenantId;

            _memoryCache = memoryCache;
        }

        // Gets an access token. First tries to get the access token from the token cache.
        // Using password (secret) to authenticate. Production apps should use a certificate.
        public async Task<string> GetUserAccessTokenAsync(string userId)
        {            

            var cca = new ConfidentialClientApplication(
                _appId,
                _redirectUri,
                _credential,
                null,
                null);

            if (!cca.Users.Any()) throw new ServiceException(new Error
            {
                Code = "TokenNotFound",
                Message = "User not found in token cache. Maybe the server was restarted."
            });

            try
            {
                var result = await cca.AcquireTokenSilentAsync(_scopes, cca.Users.First());
                return result.AccessToken;
            }

            // Unable to retrieve the access token silently.
            catch (Exception)
            {
                throw new ServiceException(new Error
                {
                    Code = GraphErrorCode.AuthenticationFailure.ToString(),
                    Message = "Caller needs to authenticate. Unable to retrieve the access token silently."
                });
            }
        }

        // Gets an access token. First tries to get the access token from the token cache.
        // This app uses a password (secret) to authenticate. Production apps should use a certificate.
        //public async Task<string> GetAppAccessTokenAsync()
        //{
        //    try
        //    {
        //        // For development mode purposes only. Production apps should use a client certificate.

        //        return await GetUserAccessTokenAsync(_tenantId);
        //    }
        //    catch (AdalException ex)
        //    {
        //        throw ex;
        //    }
        //}


        // TODO: Once the new method above has been fully tested, deprecate the cmmented code below:
        // Gets an access token. First tries to get the access token from the token cache.
        // This app uses a password (secret) to authenticate. Production apps should use a certificate.
        public async Task<string> GetAppAccessTokenAsync()
        {

            AuthenticationContext authContext = new AuthenticationContext($"{ _aadInstance }{ _tenantId }", null);

            try
            {
                Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationResult authResult = await authContext.AcquireTokenAsync(
                    _graphResourceId,
                    new Microsoft.IdentityModel.Clients.ActiveDirectory.ClientCredential(_appId, _appSecret)); // For development mode purposes only. Production apps should use a client certificate.

                return authResult.AccessToken;
            }
            catch (AdalException ex)
            {
                throw ex;
            }
        }
    }
}
