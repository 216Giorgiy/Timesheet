// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Threading.Tasks;
using GoLocal.TimeWise.AzureFunctions.Services;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;

namespace GoLocal.TimeWise.AzureFunctions
{
    public static class UpdateAnalyticsFunction
    {
        [FunctionName("UpdateAnalyticsFunction")]
        public static async Task Run([TimerTrigger("0 30 5 * * *")]TimerInfo myTimer, TraceWriter log, ExecutionContext context)
        {
            try
            {
                log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);
                AnalyticsService analyticService = helperMethods.GetAnalyticsService();
                bool status = await analyticService.UpdateAnalytics();
            }
            catch (Exception ex)
            {
                string message =ex.InnerException!=null?ex.InnerException.ToString():ex.Message;
                log.Info(message + " occurred in UpdateAnalyticsFunction : "+ DateTime.Now);
            }
            
        }
    }
}
