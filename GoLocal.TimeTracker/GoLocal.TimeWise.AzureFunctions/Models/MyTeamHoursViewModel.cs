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
    public class MyTeamHoursViewModel
    {
        public UserProfile UserInfo { get; set; }

        public List<TeamHours> TeamHoursList { get; set; }

        public string ObjectIdentifier { get; set; }

        public List<MyTeamFields> MyTeam { get; set; }

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

        public MyTeamHours SearchMyTeamHrs(String EmployeeName, string SearchMonth)
        {
            MyTeamHours SearchResultMTH = new MyTeamHours();

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
    }
    public class MyTeamFields
    {
        public TeamHours TeamHours { get; set; }

        public String EmpName { get; set; }


        public int ComputedHours
        {
            get
            {
                return this.TeamHours.Fields.EmailHours + this.TeamHours.Fields.MeetingHours + this.TeamHours.Fields.OtherHours +
                    ((this.TeamHours.Fields.EmailMinutes + this.TeamHours.Fields.MeetingMinutes + this.TeamHours.Fields.OtherMinutes) / 60);
            }
        }
        public int ComputedMinutes
        {
            get
            {
                return (this.TeamHours.Fields.EmailMinutes + this.TeamHours.Fields.MeetingMinutes + this.TeamHours.Fields.OtherMinutes) % 60;
            }
        }

        public int AdjustedHours
        {
            get
            {
                return this.TeamHours.Fields.EmailAdjustedHours + this.TeamHours.Fields.MeetingAdjustedHours + this.TeamHours.Fields.OtherAdjustedHours +
                    ((this.TeamHours.Fields.EmailAdjustedMinutes + this.TeamHours.Fields.MeetingAdjustedMinutes + this.TeamHours.Fields.OtherAdjustedMinutes) / 60);
            }
        }
        public int AdjustedMinutes
        {
            get
            {
                return (this.TeamHours.Fields.EmailAdjustedMinutes + this.TeamHours.Fields.MeetingAdjustedMinutes + this.TeamHours.Fields.OtherAdjustedMinutes) % 60;
            }
        }
        public int TotalHours
        {
            get
            {
                return this.ComputedHours + this.AdjustedHours + ((this.ComputedMinutes + this.AdjustedMinutes) / 60);
            }
        }
        public int TotalMinutes
        {
            get
            {
                return ((this.ComputedMinutes + this.AdjustedMinutes) % 60);
            }
        }
    }
}
