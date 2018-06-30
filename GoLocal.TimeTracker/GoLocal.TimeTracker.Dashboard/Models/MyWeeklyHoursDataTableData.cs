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
    public class MyWeeklyHoursDataTableData
    {
        public MyWeeklyHoursDataTableData()
        {
            data = new List<WeeklyHoursListData>();
        }
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<WeeklyHoursListData> data { get; set; }
    }

    public class WeeklyHoursListData
    {
        public string ENm { get; set; }
        //public int EmpID { get; set; }
        public string MNm { get; set; }



        public string suHM { get; set; }
        public string MonHM { get; set; }
        public string TuHM { get; set; }
        public string weHM { get; set; }
        public string ThHM { get; set; }
        public string frHM { get; set; }
        public string SaHM { get; set; }
        public string TotHM { get; set; }


    }
}
