// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Configuration;
using GoLocal.TimeWise.AzureFunctions.Services;
using System.Threading.Tasks;
namespace GoLocal.TimeWise.AzureFunctions
{
    public static class DataRefresh
    {
        [FunctionName("DataRefresh")]
        public static async void Run([TimerTrigger("0 30 5 * * *")]TimerInfo myTimer, TraceWriter log, ExecutionContext context)
        {
            try
            {
                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);
                RefreshHoursTask dataRefresh = new RefreshHoursTask(helperMethods.getTimeTrackerOptions(), helperMethods.getGraphAppUserService(), helperMethods.getGraphAppSharePointService(), context);
                await dataRefresh.ExecuteAsync();
                log.Info($"C# Timer trigger function executed every 24 hours that would contain the logic for autosubmit.");
            }
            catch (Exception ex)
            {
                string message = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;
                log.Info(message + " occurred in DataRefresh : " + DateTime.Now);
            }
           
        }
    }
}
