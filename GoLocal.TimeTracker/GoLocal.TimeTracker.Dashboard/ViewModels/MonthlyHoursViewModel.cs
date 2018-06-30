// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoLocal.TimeTracker.Dashboard.Models;

namespace GoLocal.TimeTracker.Dashboard.ViewModels
{
    public class MonthlyHoursViewModel
    {
        public MonthlyHoursViewModel()
        {
            MyMonthlyHoursDataTableData = new MyMonthlyHoursDataTableData();
            PaginationInfo = new PaginationInfoViewModel();
        }

        public MyMonthlyHoursDataTableData MyMonthlyHoursDataTableData { get; set; }

        //public string RequestRevision { get; set; }

        //public string EditTeamHours { get; set; }

        public PaginationInfoViewModel PaginationInfo { get; set; }
    }
}
