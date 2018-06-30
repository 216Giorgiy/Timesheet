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
    public class MyMonthlyHoursDataTableData
    {
        public MyMonthlyHoursDataTableData()
        {
            Data = new List<MonthlyHoursListData>();
        }
        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<MonthlyHoursListData> Data { get; set; }
    }

    public class MonthlyHoursListData
    {
        public string EmpName { get; set; }
        
        public string ManagerName { get; set; }

        public string Week1TotalHrMns { get; set; }
       
        public string Week2TotalHrMns { get; set; }
        
        public string Week3TotalHrMns { get; set; }

        public string Week4TotalHrMns { get; set; }
        
        public string Week5TotalHrMns { get; set; }

        public string MonthlyTotalHrMns { get; set; }

        //public string ObjectIdentifier { get; set; }
    }
}
