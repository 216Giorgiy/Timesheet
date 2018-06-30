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
    public class DashboardMonthHoursViewModel
    {
        public int TotalHours { get; set; } = 0;
        public int TotalMins { get; set; } = 0;
        public string GoalStatus { get; set; } = "";
        public int OverTimeHours { get; set; } = 0;
        public int OverTimeMins { get; set; } = 0;
    }
}
