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
    public class WeeklyHours
    {
        public string EmpName;

        //public int EmpID;

        public string MgrName;


        public int SundayHours;
        public int SundayMins;


        public int MondayHours;
        public int MondayMins;


        public int TuesdayHours;
        public int TuesdayMins;


        public int WednesdayHours;
        public int WednesdayMins;


        public int ThursdayHours;
        public int ThursdayMins;


        public int FridayHours;
        public int FridayMins;


        public int SaturdayHours;
        public int SaturdayMins;

        public int TotalHours;
        public int TotalMins;

        //	public void SetHours
        //{
        // logic to set the total hrs per month

        //}
    }
}
