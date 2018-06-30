// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace GoLocal.TimeWise.AzureFunctions
{
    public static class SubmitTeamHours
    {
        [FunctionName("SubmitTeamHours")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log, ExecutionContext context)
        {
            try
            {
                // Get request body
                dynamic data = await req.Content.ReadAsAsync<object>();
                string userIdentifier = req.Headers.Authorization.Parameter.ToString();
                // Set name to query string or body data
                var date = data?.selDate;
                string notificationMsgBody = data?.notificationMsgBody;

                DateTime selDate = DateTime.Parse(date.ToString());
                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);
                bool isSave = await helperMethods.GetTimeTrackerDataService(userIdentifier).MyTeamsSubmitHours(selDate, notificationMsgBody);

                return isSave == false ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass selected date in the request body")
                                        : req.CreateResponse(HttpStatusCode.OK, isSave);
            }
            catch(Exception ex)
            {
                string message = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;
                log.Info(message + " occurred in Submit Team Hours : " + DateTime.Now);
                return req.CreateResponse(HttpStatusCode.BadRequest, "Error Occured.Please check log Details");
            }
        }
    }
}
