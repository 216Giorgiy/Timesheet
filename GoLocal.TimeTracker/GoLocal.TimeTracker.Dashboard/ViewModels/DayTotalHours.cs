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
    public class DayTotalHours
    {
        public decimal Hours { get; set; }
		public decimal AdjHours { get; set; }
		public string IsSubmited { get; set; }

        public string IsCurrent { get; set; }

        public string HoursDate { get; set; }

        public DateTime SubmitedDate { get; set; }
    }
}
