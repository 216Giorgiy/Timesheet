// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Net.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using GoLocal.TimeWise.AzureFunctions.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Globalization;
using Newtonsoft.Json.Linq;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using Microsoft.Extensions.Configuration;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using GoLocal.TimeWise.AzureFunctions.Utilities;
using System.Security.Claims;


namespace GoLocal.TimeWise.AzureFunctions
{
    public static class SaveHrsByDate
    {
        
        [FunctionName("SaveHrsByDate")]
        public static async Task<string> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage Request, TraceWriter log, ExecutionContext context)
        {
            try
            {
                // Get request body
                dynamic requestData = await Request.Content.ReadAsAsync<object>();
                //var objectIdentifier = data.userContext.Principal.FindFirst(ObjectIdentifierType).Value;
                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);
                TimezoneHelper timezoneHelper = new TimezoneHelper(helperMethods.getTimeTrackerOptions());
                var editedHours = requestData.data;
                string userIdentifier = Request.Headers.Authorization.Parameter.ToString();

                WorkHours workHours = editedHours.ToObject<WorkHours>();
                WorkHoursRepository workHoursRepository = helperMethods.GetWorkHoursRepository(userIdentifier);
                await workHoursRepository.SaveItemAsync(workHours);

                return "Procesed";
            }
            catch (Exception ex)
            {

                string message = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;
                log.Info(message + " occurred in SaveHoursByDate : " + DateTime.Now);
                return message;
            }
		}
    }
}
