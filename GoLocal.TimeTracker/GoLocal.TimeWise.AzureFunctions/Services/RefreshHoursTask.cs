// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Newtonsoft.Json.Linq;
using Microsoft.Azure.WebJobs;


namespace GoLocal.TimeWise.AzureFunctions.Services
{
    public class RefreshHoursTask
    {
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly GraphAppUserService _graphUserService;
        private readonly GraphAppSharePointService _graphSharePointService;
        private SiteList _usersSiteList;
        private Microsoft.Azure.WebJobs.ExecutionContext _context;

        public RefreshHoursTask(
            TimeTrackerOptions timeTrackerOptions,
            GraphAppUserService graphUserService,
            GraphAppSharePointService graphSharePointService,
            Microsoft.Azure.WebJobs.ExecutionContext context)
        {
            _timeTrackerOptions = timeTrackerOptions ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _graphUserService = graphUserService ?? throw new ArgumentNullException(nameof(graphUserService));
            _graphSharePointService = graphSharePointService ?? throw new ArgumentNullException(nameof(graphSharePointService));
            _context = context ?? throw new ArgumentNullException(nameof(context));

        }

        public async Task ExecuteAsync()
        {
            if (_usersSiteList == null) await TryGetSiteList();

            await refreshHoursTask();
        }

        private async Task TryGetSiteList()
        {
            _usersSiteList = await _graphSharePointService.GetSiteListAsync("users", ListSchema.UsersListSchema);
        }

        private async Task<string> refreshHoursTask()
        {
            var queryOptions = new List<QueryOption>();
            queryOptions.Add(new QueryOption("filter", @"startswith(fields/DailyUpdateStatus,'scheduled')"));

            // Call graph to get all registered users
            var usersList = await _graphSharePointService.GetSiteListItemsAsync(_usersSiteList, queryOptions);

            HelperMethods helperMethods = new HelperMethods(_context);
            if (usersList?.Count > 0)
            {
                foreach (var item in usersList)
                {
                    try
                    {
                        updateStatus("inprogress", item.Id);
                        var userObjectIdentifier = item.Properties["ObjectIdentifier"].ToString();
                        var workHrsRepo = helperMethods.GetWorkHoursRepository(userObjectIdentifier);
                        var workHoursList = await workHrsRepo.GetItemsAsync(DateTime.Now);
                        updateStatus("updated", item.Id);
                    }
                    catch(Exception ex)
                    {
                        updateStatus("scheduled", item.Id);
                    }

                }
            }
                    return "Data Refresh Is Complete";
        }

        private async void updateStatus(string status, string id)
        {

            dynamic workHoursFieldsObject = new JObject();

            switch(status)
            {
                case "scheduled":
                    workHoursFieldsObject.DailyUpdateStatus = "scheduled";
                    break;
                case "updated":
                    workHoursFieldsObject.DailyUpdateStatus = "scheduled";
                    workHoursFieldsObject.UpdateDate = DateTime.Now;
                    break;
                case "inprogress":
                    workHoursFieldsObject.DailyUpdateStatus = "inprogress";
                    break;
            }

            dynamic workHoursRootObject = new JObject();
            workHoursRootObject.fields = workHoursFieldsObject;
            // Update List Item in WorkHours List
            await _graphSharePointService.UpdateSiteListItemAsync(_usersSiteList, id, workHoursRootObject.ToString());
        }
    }
}