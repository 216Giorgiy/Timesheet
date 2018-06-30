// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    public interface IGraphAuthProvider
    {
        Task<string> GetUserAccessTokenAsync(string userId);

        Task<string> GetAppAccessTokenAsync();
    }
}
