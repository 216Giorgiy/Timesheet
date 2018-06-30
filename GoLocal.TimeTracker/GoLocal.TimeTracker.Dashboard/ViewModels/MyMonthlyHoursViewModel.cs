// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoLocal.TimeTracker.Dashboard.Models;
using GoLocal.TimeTracker.MiddleTier.Models;

namespace GoLocal.TimeTracker.Dashboard.ViewModels
{
    public class MyMonthlyHoursViewModel
    {
        public MiddleTier.Models.UserProfile UserInfo { get; set; }

        public List<MonthlyHours> MonthlyHoursList { get; set; }

        public string ObjectIdentifier { get; set; }

        public List<MonthlyHours> MonthlyHrs;

        public bool IsSubmitted { get; set; }

        public bool SubmitToHR { get; set; }

        public string SubmittedDate { get; set; }

        public DateTime SearchDate { get; set; }

        public void EditHours(int EmployeeID, string EditMonth, Int16 NewHrs, Int16 NewMins)
        {
            //logic here
        }

        public void RecheckHours(int EmployeeID, string EditMonth, string ReasonForCheck)
        {
            //change status of hours to NotSubmitted and call API

        }

        public MonthlyHours SearchMyTeamHrs(String EmployeeName, string SearchMonth)
        {
            MonthlyHours SearchResultMTH = new MonthlyHours();

            //search logic
            return SearchResultMTH;
        }

        public DateTime fnGetLastMonthEndDate()
        {
            DateTime curDate = DateTime.Now;
            DateTime lmStDate = curDate.AddMonths(-1).AddDays(1 - curDate.Day);
            DateTime lmEdDate = lmStDate.AddMonths(1).AddDays(-1);
            return lmEdDate;
        }


        public string AdjustedHoursReason { get; set; }

        public MyMonthlyHoursViewModel()
        {
            MyMonthlyHoursDataTableData = new MyMonthlyHoursDataTableData();
            PaginationInfo = new PaginationInfoViewModel();
        }

        public MyMonthlyHoursDataTableData MyMonthlyHoursDataTableData { get; set;}


        public string RequestRevision { get; set; }

        public string EditMonthlyHours { get; set; }

        public string MonthlyHoursLoadRequest { get; set; }

        public PaginationInfoViewModel PaginationInfo { get; set; }


        public MonthlyHours SearchEmpHours( string EmployeeName, DateTime SearchDate,string ManagerName = "")
		{
			MonthlyHours SearchResultMH = new MonthlyHours();

			//code to fetch data from Services
			return SearchResultMH;
		}

        public DateTime SelectedDate { get; set; }

        //public void ComputeTotalMonthlyHrs()
        //{
        //    if (MonthlyHrs != null && MonthlyHrs.Any())
        //    {
        //        this.MonthlyHrs.FirstOrDefault().MonthlyTotalMins = (short)(((MonthlyHrs.FirstOrDefault().Week1TotalMins)
        //                                                                        + (MonthlyHrs.FirstOrDefault().Week2TotalMins)
        //                                                                        + (MonthlyHrs.FirstOrDefault().Week3TotalMins)
        //                                                                        + (MonthlyHrs.FirstOrDefault().Week4TotalMins)
        //                                                                        + (MonthlyHrs.FirstOrDefault().Week5TotalMins)) % 60);

        //        this.MonthlyHrs.FirstOrDefault().MonthlyTotalHours = (short)(((MonthlyHrs.FirstOrDefault().Week1TotalHours)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week2TotalHours)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week3TotalHours)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week4TotalHours)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week5TotalHours)) +
        //                                                             (((MonthlyHrs.FirstOrDefault().Week1TotalMins)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week2TotalMins)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week3TotalMins)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week4TotalMins)
        //                                                             + (MonthlyHrs.FirstOrDefault().Week5TotalMins)) / 60));
        //    }
            
        //}
        // TODO print method()
        //TODO export method()
    }
}
