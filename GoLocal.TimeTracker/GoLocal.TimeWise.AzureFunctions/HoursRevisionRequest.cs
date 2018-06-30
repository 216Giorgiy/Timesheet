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
    public static class HoursRevisionRequest
    {
        [FunctionName("HoursRevisionRequest")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log,ExecutionContext context)
        {
            try
            {
                dynamic data = await req.Content.ReadAsAsync<object>();
                DateTime selDt = data.selDate;
                string identifier = data.objIdentifier;
                string reason = data.reason;
                string ID = data.id;
                string date = data.date;
                string notificationMsgBody = data.notificationMsgBody;

                // Get request body
                string userIdentifier = req.Headers.Authorization.Parameter.ToString();

                Helpers.HelperMethods helperMethods = new Helpers.HelperMethods(context);
                bool isSuccess = await helperMethods.GetTimeTrackerDataService(userIdentifier).MyTeamWorkHoursRevisionRequest(selDt, identifier, reason, ID, date, notificationMsgBody);
                // Set name to query string or body data

                return isSuccess == null
                    ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
                    : req.CreateResponse(HttpStatusCode.OK, isSuccess);
            }
            catch (Exception ex)
            {
                string message = ex.InnerException != null ? ex.InnerException.ToString() : ex.Message;
                log.Info(message + " occurred in HoursRevisionRequest : " + DateTime.Now);
                return req.CreateResponse(HttpStatusCode.BadRequest, "Error Occurred.Please check log details");
            }
        }
    }
}
