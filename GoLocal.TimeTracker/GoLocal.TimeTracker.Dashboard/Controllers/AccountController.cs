// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GoLocal.TimeTracker.Dashboard.Controllers
{
	public class AccountController : Controller
	{
		
		private readonly ILogger _logger;

		
		public AccountController(ILogger<AccountController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public IActionResult SignIn()
		{
			_logger.LogInformation(12345,"SignIN method called");
			var redirectUrl = Url.Action(nameof(HomeController.Index), "Home");
			return Challenge(
				new AuthenticationProperties { RedirectUri = redirectUrl },
				OpenIdConnectDefaults.AuthenticationScheme);

		}

		[HttpGet]
		public IActionResult SignOut()
		{
			var callbackUrl = Url.Action(nameof(SignIn), "Account", values: null, protocol: Request.Scheme);
			return SignOut(
				new AuthenticationProperties { RedirectUri = callbackUrl },
				CookieAuthenticationDefaults.AuthenticationScheme,
				OpenIdConnectDefaults.AuthenticationScheme);
		}

		[HttpGet]
		public IActionResult SignedOut()
		{
            if (User.Identity.IsAuthenticated)
            {
                // Redirect to home page if the user is authenticated.
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }

            return View();
        }

		[HttpGet]
		public IActionResult AccessDenied()
		{
			_logger.LogError(LogEvents.AuthRelated, "User {UserID} Not Authenticated", User.Identity.Name);
			return View();
		}
	}
}
