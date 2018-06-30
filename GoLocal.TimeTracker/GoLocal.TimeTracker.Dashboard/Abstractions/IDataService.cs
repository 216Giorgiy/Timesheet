// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.Dashboard.ViewModels;
using Microsoft.AspNetCore.Http;
using GoLocal.TimeTracker.MiddleTier.Models;
using GoLocal.TimeTracker.MiddleTier.Abstractions;

namespace GoLocal.TimeTracker.Dashboard.Abstractions
{
    public interface IDataService
    {
		Task<MiddleTier.Models.UserProfile> GetUserProfile();
				
        Task<MyMonthlyHoursViewModel> GetMonthlyReportHours(DateTime dt);

        Task<WeeklyHoursViewModel> GetWeeklyReportHours(DateTime dt);

		Task<DashBoardViewModel> GetWorkHours(DateTime dt, string weekType, string firstDayOfWeek, string dataBoundary);

		Task<Dictionary<string, string>> GetWorkHoursForDate( DateTime dt);

        Task<List<WorkHours>> GetEditWorkHoursForDate(DateTime dt);

        Task<bool> SaveItemAsync(WorkHours workHours);

        Task<bool> SubmitHoursForMonthAsync();

        Task<NotificationViewModel> GetUserNotifications(bool isHr);

        Task<IEnumerable<WorkHours>> GetTeamWeeklyHours(DateTime date);
        
        Task<IEnumerable<WorkHours>> GetTeamMonthlyHours(DateTime date);

        Task<MyTeamHoursViewModel> GetMyTeamHours(DateTime date, string empNameFilter, int pageId, int pagesize);

        Task<bool> MyTeamSaveAdjustedHrs(string objectIdentifier, string newAdjustedHrs, string newAdjustedMins);

        Task<Boolean> MyTeamsSubmitHours( DateTime month);
		
        Task<bool> MyTeamWorkHoursRevisionRequest( DateTime month, string userId, string reason, string id, string date);

		Task<bool> NotificationMarkAsRead(MiddleTier.Models.Notifications modelData);

        Task<ListCollectionPage<TeamHours>> GetMyTeamHoursPageView(DateTime date, string empNameFilter, int pageId, int pagesize, ListCollectionPage<TeamHours> myCurrentTeamHourList, int status);
		Task<ListCollectionPage<ReportHours>> GetWeeklyPageView(DateTime date, string empNameFilter, int pageId, int pagesize, ListCollectionPage<ReportHours> myCurrentReportHoursList, int status);

		int[] GetDayOfMonthWeekAssignmentArray(DateTime date);
	}
}
