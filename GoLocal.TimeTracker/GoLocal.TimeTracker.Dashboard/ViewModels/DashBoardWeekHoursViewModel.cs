// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.Dashboard.ViewModels
{
    public class DashBoardWeekHoursViewModel
    {
		public int TotalHours { get; set; } = 0;
		public int TotalMins { get; set; } = 0;
		public string GoalStatus { get; set; } = "";
		public int MeetingHours { get; set; }

		public int MeetingMinutes { get; set; }

		public int EmailHours { get; set; }

		public int EmailMinutes { get; set; }
		public int OthWorkHours { get; set; }

		public int OthWorkMinutes { get; set; }

		public int OTHours { get; set; }

		public int OTMinutes { get; set; }


	}
}
