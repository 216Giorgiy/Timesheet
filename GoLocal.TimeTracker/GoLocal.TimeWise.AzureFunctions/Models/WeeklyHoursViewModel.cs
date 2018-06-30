// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Models
{
    public class WeeklyHoursViewModel
    {
        public UserProfile UserInfo { get; set; }

        public List<ReportHours> WeeklyHoursList { get; set; }

        public string ObjectIdentifier { get; set; }

        public List<WeeklyHours> WeeklyHrs;

        public string MonthlyHoursLoadRequest { get; set; }

        public string RequestRevision { get; set; }

        public bool IsSubmitted { get; set; }

        public string SubmittedDate { get; set; }

        public DateTime SearchDate { get; set; }


        public int TodayEmailHours { get; set; }
        public int TodayEmailMins { get; set; }
        public int TodayMeetingHours { get; set; }
        public int TodayMeetingMins { get; set; }
        public int TodayOtherHours { get; set; }
        public int TodayOtherMins { get; set; }
        public string AdjustedHoursReason { get; set; }

        public string SundayDate;
        public string MondayDate;
        public string TuesdayDate;
        public string WednesdayDate;
        public string ThursdayDate;
        public string FridayDate;
        public string SaturdayDate;

        public WeeklyHours SearchWeeklyEmpHours(string EmployeeName, DateTime SearchDate, string ManagerName = "")
        {
            WeeklyHours SearchResultWH = new WeeklyHours();

            //Search logic

            return SearchResultWH;
        }

        public MyWeeklyHoursDataTableData MyWeeklyHoursDataTableData { get; set; }

        public DateTime fnGetLastMonthEndDate()
        {
            DateTime curDate = DateTime.Now;
            DateTime lmStDate = curDate.AddMonths(-1).AddDays(1 - curDate.Day);
            DateTime lmEdDate = lmStDate.AddMonths(1).AddDays(-1);
            return lmEdDate;
        }

        // Returns Sunday for Last Week of Last Month
        public DateTime fnGetLastMonthLastWeekSunDate()
        {
            DateTime curDate = DateTime.Now;
            DateTime lmStDate = curDate.AddMonths(-1).AddDays(1 - curDate.Day);
            DateTime lmEdWkStart = lmStDate.AddMonths(1).AddDays(-1);
            int startDay = (int)lmEdWkStart.DayOfWeek;
            while (startDay > 0)
            {
                lmEdWkStart = lmEdWkStart.AddDays(-1);
                startDay--;
            }
            return lmEdWkStart;
        }

        public PaginationInfoViewModel PaginationInfo { get; set; }

        public WeeklyHoursViewModel()
        {
            MyWeeklyHoursDataTableData = new MyWeeklyHoursDataTableData();
            PaginationInfo = new PaginationInfoViewModel();
        }

        public DateTime SelectedDate { get; set; }

        public void ComputeTotalHrs()
        {
            if (this.WeeklyHrs != null && this.WeeklyHrs.Any())
            {
                int totMins = this.WeeklyHrs.FirstOrDefault().SundayMins
                            + this.WeeklyHrs.FirstOrDefault().MondayMins
                            + this.WeeklyHrs.FirstOrDefault().TuesdayMins
                            + this.WeeklyHrs.FirstOrDefault().WednesdayMins
                            + this.WeeklyHrs.FirstOrDefault().ThursdayMins
                            + this.WeeklyHrs.FirstOrDefault().FridayMins
                            + this.WeeklyHrs.FirstOrDefault().SaturdayMins;

                this.WeeklyHrs.FirstOrDefault().TotalHours = this.WeeklyHrs.FirstOrDefault().SundayHours
                                                            + this.WeeklyHrs.FirstOrDefault().MondayHours
                                                            + this.WeeklyHrs.FirstOrDefault().TuesdayHours
                                                            + this.WeeklyHrs.FirstOrDefault().WednesdayHours
                                                            + this.WeeklyHrs.FirstOrDefault().ThursdayHours
                                                            + this.WeeklyHrs.FirstOrDefault().FridayHours
                                                            + this.WeeklyHrs.FirstOrDefault().SaturdayHours
                                                            + (totMins / 60);
                this.WeeklyHrs.FirstOrDefault().TotalMins = totMins % 60;
            }

        }

        //print method()
        //export method()
    }
}
