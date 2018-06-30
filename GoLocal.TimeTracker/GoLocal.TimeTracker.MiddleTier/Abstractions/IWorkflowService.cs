// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeTracker.MiddleTier.Helpers;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using GoLocal.TimeTracker.MiddleTier.Models;

using System.Threading.Tasks;

namespace GoLocal.TimeTracker.MiddleTier.Abstractions
{
    public interface IWorkflowService<T> where T : IDataItem<T>
    {
        Task SubmitHoursAsync(IEnumerable<T> modelData, string messageBody);

        Task SubmitHoursAsync(IEnumerable<T> workHoursToSubmit, string userObjectIdentifier, GraphResultItem managerOfUser, string messageBody);

        Task RequestHoursReviewAsync(IEnumerable<T> modelData, string messageBody);
    }
}
