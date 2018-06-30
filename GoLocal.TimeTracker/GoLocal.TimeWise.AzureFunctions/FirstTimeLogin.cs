// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using System;
using GoLocal.TimeWise.AzureFunctions.Models;

namespace GoLocal.TimeWise.AzureFunctions
{
    public static class FirstTimeLogin
    {
        [FunctionName("FirstTimeLogin")]
        public static async Task<string> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log, ExecutionContext context)
        {
            try
            {
                // Get request body
                dynamic requestData = await req.Content.ReadAsAsync<object>();
                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);

                 var data = requestData.siteList;
                 SiteList siteList = data.ToObject<SiteList>();
                 DateTime date = requestData.date;
                 string userIdentifier = req.Headers.Authorization.Parameter.ToString();
                 var workHoursList = await helperMethods.computeHours(userIdentifier, date,siteList);


                return ("sucses");
            }
            catch (Exception ex)
            {
                string message = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;
                log.Info(message + " occurred in FirstTimeLogin : " + DateTime.Now);
                return ex.Message;
            }

        }
    }
}
