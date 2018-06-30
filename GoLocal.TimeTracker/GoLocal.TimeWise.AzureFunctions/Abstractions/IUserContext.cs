// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Claims;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    /// <summary>
    /// Interface to abstract the user context needed by Middle Tier components
    /// </summary>
    public interface IUserContext
    {
        ClaimsPrincipal User { get; }
    }
}
