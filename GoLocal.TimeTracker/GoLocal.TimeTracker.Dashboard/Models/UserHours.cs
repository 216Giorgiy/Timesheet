// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.Dashboard.Models
{
    public class UserHours
    {
		public const Int16 DailyGoal = 8;
		public const Int16 WeeklyGoal = 40;
		public const Int16 MonthlyGoal = 160;
        public const Int16 DailyGoalMin = 0;
        public const Int16 WeeklyGoalMin = 0;
        public const Int16 MonthlyGoalMin = 0;


        public enum HourType
		{
			MeetingHours,
			EmailHours,
			OtherWork,
			OverTime
		}

		public enum HourStatus
		{
			SubmittedToManager,
			Rejected,
			Approved,
			NotSubmitted,
			PendingFromManager
		}
		public Int16 EmployeeID { get; set; }
		public DateTime Date { get; set; }
		public Int16 Hours { get; set; }
		public Int16 Minutes { get; set; }
		public string HoursType { get; set; }
		public Char ComputedOrAdjusted { get; set; }  // C for Computed ; A for Adjusted
		public string ReasonForEdit { get; set; }
	}

	
}
