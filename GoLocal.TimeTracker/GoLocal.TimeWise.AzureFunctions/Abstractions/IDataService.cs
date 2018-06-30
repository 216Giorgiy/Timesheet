// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GoLocal.TimeWise.AzureFunctions.Models;
using GoLocal.TimeWise.AzureFunctions.Abstractions;

namespace GoLocal.TimeWise.AzureFunctions.Abstractions
{
    public interface IDataService
    {
        Task<UserProfile> GetUserProfile();

        Task<MyMonthlyHoursViewModel> GetMonthlyReportHours(DateTime dt);

        Task<WeeklyHoursViewModel> GetWeeklyReportHours(DateTime dt);

        Task<DashBoardViewModel> GetWorkHours(DateTime dt, string weekType, string firstDayOfWeek);

        Task<Dictionary<string, string>> GetWorkHoursForDate(DateTime dt);

        Task<List<WorkHours>> GetEditWorkHoursForDate(DateTime dt);

        Task<bool> SaveItemAsync(WorkHours workHours);

        Task<bool> SubmitHoursForMonthAsync(string notificationMsgBody);

        Task<NotificationViewModel> GetUserNotifications(bool isHr);

        Task<IEnumerable<WorkHours>> GetTeamWeeklyHours(DateTime date);

        Task<IEnumerable<WorkHours>> GetTeamMonthlyHours(DateTime date);

        Task<MyTeamHoursViewModel> GetMyTeamHours(DateTime date, string empNameFilter, int pageId, int pagesize);

        Task<bool> MyTeamSaveAdjustedHrs(string objectIdentifier, string newAdjustedHrs, string newAdjustedMins);

        Task<Boolean> MyTeamsSubmitHours(DateTime month, string notificationMsgBody);

        Task<bool> MyTeamWorkHoursRevisionRequest(DateTime month, string userId, string reason, string id, string date, string notificationMsgBody);

        Task<bool> NotificationMarkAsRead(Notifications modelData);

        Task<ListCollectionPage<TeamHours>> GetMyTeamHoursPageView(DateTime date, string empNameFilter, int pageId, int pagesize, ListCollectionPage<TeamHours> myCurrentTeamHourList, int status);
        Task<ListCollectionPage<ReportHours>> GetWeeklyPageView(DateTime date, string empNameFilter, int pageId, int pagesize, ListCollectionPage<ReportHours> myCurrentReportHoursList, int status);

        int[] GetDayOfMonthWeekAssignmentArray(DateTime date);
    }
}
