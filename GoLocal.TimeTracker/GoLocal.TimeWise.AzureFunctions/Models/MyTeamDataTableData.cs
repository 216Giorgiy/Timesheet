// Copyright(c) Microsoft Corporation. 
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
    public class MyTeamDataTableData
    {
        public MyTeamDataTableData()
        {
            data = new List<TeamHoursListData>();
        }

        public int draw { get; set; }
        public int recordsTotal { get; set; }
        public int recordsFiltered { get; set; }
        public List<TeamHoursListData> data { get; set; }

        public string SubmittedDate { get; set; } = string.Empty;
        public bool SubmitEnable { get; set; }
        public bool SubmitToHR { get; set; }
    }

    public class TeamHoursListData
    {
        public string Name { get; set; }
        public string ComputedHours { get; set; }
        public string AdjustedHours { get; set; }

        public string Status { get; set; }

        public string Action { get; set; }

        public string ObjectIdentifier { get; set; }
        public string Id { get; set; }
        public string Date { get; set; }
        public DateTime SubmittedDate { get; set; }
    }
}
