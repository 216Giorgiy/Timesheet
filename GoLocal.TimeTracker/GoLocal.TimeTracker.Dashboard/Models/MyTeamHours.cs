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
    public class MyTeamHours
    {
		public string EmpName;

		public int EmpID;

		public Int16 MonthlyComputedHrs;
		public Int16 MonthlyComputedMins;

		public Int16 MonthlyAdjustedHrs { get; set; }
		public Int16 MonthlyAdjustedMins { get; set; }

		public bool AdjustedHoursEdited = false;

		public int MonthlyTotalHrs;

		public int MonthlyTotalMins;
	}
}
