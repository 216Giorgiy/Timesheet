// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GoLocal.TimeWise.AzureFunctions.Abstractions;
using Microsoft.Extensions.Configuration;
using GoLocal.TimeWise.AzureFunctions.Models;
using Microsoft.Extensions.Options;
using System.IO;
using GoLocal.TimeWise.AzureFunctions.Services;
using Microsoft.Extensions.Caching.Memory;
using GoLocal.TimeWise.AzureFunctions.Helpers;
using Microsoft.AspNetCore.Http;
using GoLocal.TimeWise.AzureFunctions.Repository;
using GoLocal.TimeWise.AzureFunctions.Utilities;
using GoLocal.TimeWise.AzureFunctions.Repositories;

namespace GoLocal.TimeWise.AzureFunctions.Helpers
{
	class HelperMethods
	{
		public IConfiguration config;
		public IDataService _dataServiceClient;
		public IMemoryCache _memoryCache;
		public IRepository<UserProfile> _repository;
		private HttpContextAccessor context;

		public HelperMethods(ExecutionContext context)
		{
			var builder = new ConfigurationBuilder()
			.SetBasePath(context.FunctionAppDirectory)
            .AddJsonFile("host.json");
			config = builder.Build();
		}

		public AnalyticsService GetAnalyticsService()
		{
			return new AnalyticsService(getTimeTrackerOptions(), getGraphAppSharePointService());
		}

        public TimeTrackerDataService GetTimeTrackerDataService(string objectIdentifier)
        {
            return new TimeTrackerDataService(GetUserProfileRepository(objectIdentifier), GetWorkHoursRepository(objectIdentifier), GetTeamHoursRepository(objectIdentifier), GetReportHoursRepository(), GetWorkHoursWorkflowService(objectIdentifier), GetTeamHoursWorkflowService(objectIdentifier), getTimeTrackerOptions());
        }
        public WorkHoursWorkflowService GetWorkHoursWorkflowService(string objectIdentifier)
        {
            return new WorkHoursWorkflowService(getTimeTrackerOptions(), getGraphAppUserService(), getGraphAppSharePointService(), GetWorkflowServiceHelper(objectIdentifier), objectIdentifier);
        }

        public TeamHoursWorkflowService GetTeamHoursWorkflowService(string objectIdentifier)
        {
            return new TeamHoursWorkflowService(getTimeTrackerOptions(), getGraphAppUserService(), getGraphAppSharePointService(), GetWorkflowServiceHelper(objectIdentifier), GetUserProfileRepository(objectIdentifier));
        }
        public WorkflowServiceHelper GetWorkflowServiceHelper(string objectIdentifier)
        {
            return new WorkflowServiceHelper(getTimeTrackerOptions(), getGraphAppUserService(), getGraphAppSharePointService(), GetUserProfileRepository(objectIdentifier));
        }
        public UserProfileRepository GetUserProfileRepository(string objectIdentifier)
        {
            return new UserProfileRepository(getTimeTrackerOptions(), GetUserContext(), getGraphAppUserService(), getGraphAppSharePointService(), objectIdentifier);
        }

		public TeamHoursService GetTeamHoursService()
		{
			return new TeamHoursService(getAuthProvider(), getGraphAppSharePointService(), GetUserContext(), getTimeTrackerOptions(), GetTeamHoursRepository(""));
		}

		public MonthlyReportHoursService GetReportHoursService()
		{
			return new MonthlyReportHoursService(getAuthProvider(), GetUserContext(), getTimeTrackerOptions(), GetReportHoursRepository());
		}

		public ReportHoursRepository GetReportHoursRepository()
		{
			return new ReportHoursRepository(getTimeTrackerOptions(), getGraphAppUserService(), getGraphAppSharePointService());
		}
		public TeamHoursRepository GetTeamHoursRepository(string objIdentifier)
		{
			return new TeamHoursRepository(getTimeTrackerOptions(), GetUserContext(), getGraphAppUserService(), getGraphAppSharePointService(), GetGraphAppCalendarService(objIdentifier), GetGraphAppTasksService(objIdentifier), GetGraphAppMailService(objIdentifier), objIdentifier);
		}
		public WorkHoursRepository GetWorkHoursRepository(string objIdentifier)
		{
			return new WorkHoursRepository(getTimeTrackerOptions(), GetUserContext(), getGraphAppUserService(), getGraphAppSharePointService(), GetGraphAppCalendarService(objIdentifier), GetGraphAppTasksService(objIdentifier), GetGraphAppMailService(objIdentifier), GetTimezoneHelper(), objIdentifier);
		}
        public async Task<IEnumerable<WorkHours>> computeHours(string identifier, DateTime date, SiteList siteList)
        {
            WorkHoursRepository repo = GetWorkHoursRepository(identifier);
            IEnumerable<GraphResultItem> graphResultItem = new List<GraphResultItem>();
            var workhours = await repo.ComputeHours(date, graphResultItem, siteList, identifier, getTimeTrackerOptions(), getGraphAppSharePointService(), GetGraphAppCalendarService(identifier), GetGraphAppTasksService(identifier),
                GetGraphAppMailService(identifier), GetTimezoneHelper(), getTimeTrackerOptions().ExcludedCategories, getTimeTrackerOptions().ExcludedShowAs, getTimeTrackerOptions().AllDayCountHours);
            return workhours;
        }
		public GraphAppTasksService GetGraphAppTasksService(string identifier)
		{
			return new GraphAppTasksService(getAuthProvider(), GetUserContext(), getTimeTrackerOptions(), identifier);
		}
		public GraphAppUserService getGraphAppUserService()
		{
			return new GraphAppUserService(getAuthProvider(), GetUserContext(), getTimeTrackerOptions());
		}
		public GraphAppSharePointService getGraphAppSharePointService()
		{
			return new GraphAppSharePointService(getAuthProvider(), GetUserContext(), getTimeTrackerOptions());
		}
		private IGraphAuthProvider getAuthProvider()
		{
			GraphAuthProvider authProvider = new GraphAuthProvider(_memoryCache, config);
			return authProvider;
		}

		private GraphAppCalendarService GetGraphAppCalendarService(string identifier)
		{
			return new GraphAppCalendarService(getAuthProvider(), GetUserContext(), getTimeTrackerOptions(), GetTimezoneHelper(), identifier);
		}

		private GraphAppMailService GetGraphAppMailService(string identifier)
		{
			return new GraphAppMailService(getAuthProvider(), GetUserContext(), GetTimezoneHelper(), getTimeTrackerOptions(), identifier);
		}
		private TimezoneHelper GetTimezoneHelper()
		{
			return new TimezoneHelper(getTimeTrackerOptions());
		}
		private AspNetUserContext GetUserContext()
		{
			AspNetUserContext userContext = new AspNetUserContext(context);
			return userContext;
		}
		public TimeTrackerOptions getTimeTrackerOptions()
		{
			var timeTrackerOptions = new TimeTrackerOptions();
			config.GetSection("TimeTracker").Bind(timeTrackerOptions);
			return timeTrackerOptions;
		}
		public Dictionary<string, Int32> SplitHrMin(string str)
		{
			Dictionary<string, int> hrMin = new Dictionary<string, int>();
			var splitStr = str.Split(';').Select(x => x.Split(':'));
			hrMin.Add("hr", Convert.ToInt32(splitStr.FirstOrDefault()[0]));
			hrMin.Add("min", Convert.ToInt32(splitStr.FirstOrDefault()[1]));

			return hrMin;
		}
	}
}
