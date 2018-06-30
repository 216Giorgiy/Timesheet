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
using System.Net;

namespace GoLocal.TimeWise.AzureFunctions
{
    public static class SubmitHours
    {
        [FunctionName("SubmitHours")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage Request, TraceWriter log,ExecutionContext context)
        {
            try
            {
                string userIdentifier = Request.Headers.Authorization.Parameter.ToString();
                // Get request body
                dynamic requestData = await Request.Content.ReadAsAsync<object>();
                string notificationMsgBody = requestData.notificationMsgBody;
                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);
                var isSave = await helperMethods.GetTimeTrackerDataService(userIdentifier).SubmitHoursForMonthAsync(notificationMsgBody);

                return isSave == null
                    ? Request.CreateResponse(System.Net.HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
                    : Request.CreateResponse(HttpStatusCode.OK, isSave);
            }
            catch (Exception ex)
            {
                string message = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;
                log.Info(message + " occurred in SubmitHours : " + DateTime.Now);
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Error Occured.Please check log Details");
            }
			
        }
    }
}
