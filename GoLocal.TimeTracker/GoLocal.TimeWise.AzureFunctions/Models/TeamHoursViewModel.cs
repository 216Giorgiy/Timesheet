﻿// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoLocal.TimeWise.AzureFunctions.Models
{
    public class TeamHoursViewModel
    {
        public TeamHoursViewModel()
        {
            MyTeamDataTableData = new MyTeamDataTableData();
            PaginationInfo = new PaginationInfoViewModel();
        }

        public MyTeamDataTableData MyTeamDataTableData { get; set; }

        public string RequestRevision { get; set; }

        public string EditTeamHours { get; set; }

        public PaginationInfoViewModel PaginationInfo { get; set; }
    }
}
