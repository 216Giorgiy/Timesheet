// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using GoLocal.TimeTracker.MiddleTier.Abstractions;
using Microsoft.AspNetCore.Http;

namespace GoLocal.TimeTracker.MiddleTier.Helpers
{
    /// <summary>
    /// Adapter to pass the ClaimsPrincipal from the HTTPContext in ASP.Net Core
    /// </summary>
    public class AspNetUserContext : IUserContext
    {
        private readonly IHttpContextAccessor _accessor;


        public AspNetUserContext(IHttpContextAccessor a)
        {
            _accessor = a;
        }

        public ClaimsPrincipal User => _accessor.HttpContext.User;
    }
}
