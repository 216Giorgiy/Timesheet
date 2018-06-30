// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GoLocal.TimeTracker.Dashboard.Models;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Caching.Memory;
using GoLocal.TimeTracker.MiddleTier.Models;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
    public class AdministratorConsentController : Controller
    {
        private readonly IMemoryCache _memoryCache;

        private readonly AzureAdOptions _azureOptions;
        public AdministratorConsentController(IOptions<AzureAdOptions> azureOptions, IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            _azureOptions = azureOptions.Value;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            Guid randomUser = Guid.NewGuid();
            var redirectUrl = _azureOptions.BaseUrl + Url.Action(nameof(AdministratorConsentController.Permissions), "AdministratorConsent");
            _memoryCache.Set(randomUser, DateTimeOffset.UtcNow);
            var getConsentUrl = _azureOptions.Instance + "common/adminconsent?client_id=" + _azureOptions.ClientId + "&admin_consent=True&state=" + randomUser.ToString() + "&redirect_uri=" + redirectUrl;
            return new RedirectResult(getConsentUrl);
        }

        [AllowAnonymous]
        public IActionResult Permissions(string error, string error_description, string tenant, string state, string admin_consent)
        {
            string redirectUrl = null;
            if (!string.IsNullOrEmpty(error))
            {
                redirectUrl = Url.Action(nameof(AdministratorConsentController.ConsentError), "AdministratorConsent");

                string message = $"Code:{error}, Message:{error_description}";
                return new RedirectResult(redirectUrl+ "?message="+message);
            }

            //redirectUrl = Url.Action(nameof(HomeController.Index), "Index");
            //return new RedirectResult(redirectUrl);
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        public IActionResult ConsentError(string message)
        {
            if(!string.IsNullOrEmpty(message))
            {
                return View(new ErrorViewModel { ErrorMessage = message });
            }

            var redirectUrl = Url.Action(nameof(AdministratorConsentController.Index), "AdministratorConsent");
            return View(new ErrorViewModel { ErrorMessage = _azureOptions.BaseUrl + redirectUrl });
        }
    }
}