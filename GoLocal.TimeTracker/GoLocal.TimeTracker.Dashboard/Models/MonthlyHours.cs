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
    public class MonthlyHours
    {
		public string EmpName;

		//public int EmpID;

		public string ManagerName;

		public string Week1TotalHrMns;

		public string Week2TotalHrMns;

		public string Week3TotalHrMns;

		public string Week4TotalHrMns;

		public string Week5TotalHrMns;

		public string MonthlyTotalHrMns;


		//public Int32 ComputedHours { get; set; }
		//public Int32 AdjustedHours { get; set; }

		public static implicit operator List<object>(MonthlyHours v)
		{
			throw new NotImplementedException();
		}
	}
}
