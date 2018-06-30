// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeTracker.MiddleTier.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.Dashboard.Services.Helpers
{
    public static class HoursComputeHelper
    {
		// This method takes a Resport Hours object as input and returns the final hours(Adjusted/computed) along with the total
		public static Dictionary<string, short> GetFinalHrsMins(ReportHours wh)
		{
			Dictionary<string, short> FinalDictObj = new Dictionary<string, short>();

			//For Email Hours
			if (wh.Fields.EmailAdjustedHours > 0 || wh.Fields.EmailAdjustedMinutes > 0)
			{
				
				FinalDictObj.TryAdd("FinalEmailHrs", wh.Fields.EmailAdjustedHours);
				FinalDictObj.TryAdd("FinalEmailMins", wh.Fields.EmailAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalEmailHrs", wh.Fields.EmailHours);
				FinalDictObj.TryAdd("FinalEmailMins", wh.Fields.EmailMinutes);
				
			}
			//For Meeting Hours
			if (wh.Fields.MeetingAdjustedHours > 0 || wh.Fields.MeetingAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalMeetingHrs", wh.Fields.MeetingAdjustedHours);
				FinalDictObj.TryAdd("FinalMeetingMins", wh.Fields.MeetingAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalMeetingHrs", wh.Fields.MeetingHours);
				FinalDictObj.TryAdd("FinalMeetingMins", wh.Fields.MeetingMinutes);

			}
			//For Other Hours
			if (wh.Fields.OtherAdjustedHours > 0 || wh.Fields.OtherAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalOtherHrs", wh.Fields.OtherAdjustedHours);
				FinalDictObj.TryAdd("FinalOtherMins", wh.Fields.OtherAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalOtherHrs", wh.Fields.OtherHours);
				FinalDictObj.TryAdd("FinalOtherMins", wh.Fields.OtherMinutes);

			}

			// Total Calculation
			var Mins = FinalDictObj["FinalEmailMins"] + FinalDictObj["FinalMeetingMins"] + FinalDictObj["FinalOtherMins"];
			var totalMins = Mins % 60;
			var totalHrs = FinalDictObj["FinalEmailHrs"] + FinalDictObj["FinalMeetingHrs"] + FinalDictObj["FinalOtherHrs"] + Mins/60;

			FinalDictObj.TryAdd("FinalTotalHrs", (short)totalHrs);
			FinalDictObj.TryAdd("FinalTotalMins", (short)totalMins);

			return FinalDictObj;
		}

		public static Dictionary<string, short> GetFinalTeamHrsMins(TeamHours th)
		{
			Dictionary<string, short> FinalDictObj = new Dictionary<string, short>();

			//For Email Hours
			if (th.Fields.EmailAdjustedHours > 0 || th.Fields.EmailAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalEmailHrs", th.Fields.EmailAdjustedHours);
				FinalDictObj.TryAdd("FinalEmailMins", th.Fields.EmailAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalEmailHrs", th.Fields.EmailHours);
				FinalDictObj.TryAdd("FinalEmailMins", th.Fields.EmailMinutes);

			}
			//For Meeting Hours
			if (th.Fields.MeetingAdjustedHours > 0 || th.Fields.MeetingAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalMeetingHrs", th.Fields.MeetingAdjustedHours);
				FinalDictObj.TryAdd("FinalMeetingMins", th.Fields.MeetingAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalMeetingHrs", th.Fields.MeetingHours);
				FinalDictObj.TryAdd("FinalMeetingMins", th.Fields.MeetingMinutes);

			}
			//For Other Hours
			if (th.Fields.OtherAdjustedHours > 0 || th.Fields.OtherAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalOtherHrs", th.Fields.OtherAdjustedHours);
				FinalDictObj.TryAdd("FinalOtherMins", th.Fields.OtherAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalOtherHrs", th.Fields.OtherHours);
				FinalDictObj.TryAdd("FinalOtherMins", th.Fields.OtherMinutes);

			}

			// Total Calculation
			var Mins = FinalDictObj["FinalEmailMins"] + FinalDictObj["FinalMeetingMins"] + FinalDictObj["FinalOtherMins"];
			var totalMins = Mins % 60;
			var totalHrs = FinalDictObj["FinalEmailHrs"] + FinalDictObj["FinalMeetingHrs"] + FinalDictObj["FinalOtherHrs"] + Mins / 60;

			FinalDictObj.TryAdd("FinalTotalHrs", (short)totalHrs);
			FinalDictObj.TryAdd("FinalTotalMins", (short)totalMins);

			return FinalDictObj;
		}

		public static Dictionary<string, string> ComputeHoursAndMins(IEnumerable<WorkHours> WrkHoursList)
        {
			
			Dictionary<string, int> FinalDictObj = new Dictionary<string, int>();
			if (WrkHoursList.Count() == 0)
            {
                FinalDictObj.TryAdd("EmailMins", 0);
                FinalDictObj.TryAdd("EmailHrs", 0);
                FinalDictObj.TryAdd("EmailAdjustedMins", 0);
                FinalDictObj.TryAdd("EmailAdjustedHrs", 0);
                FinalDictObj.TryAdd("MeetingMins", 0);
                FinalDictObj.TryAdd("MeetingHrs", 0);
                FinalDictObj.TryAdd("MeetingAdjustedMins", 0);
                FinalDictObj.TryAdd("MeetingAdjustedHrs", 0);
                FinalDictObj.TryAdd("OtherMins", 0);
                FinalDictObj.TryAdd("OtherHrs", 0);
                FinalDictObj.TryAdd("OtherAdjustedMins", 0);
                FinalDictObj.TryAdd("OtherAdjustedHrs", 0);
                FinalDictObj.TryAdd("TotHrs",  0);
                FinalDictObj.TryAdd("TotMins", 0);
                
                
                return ConvertToStringOfStrings(FinalDictObj);
            }

            int Mins = 0;
            int TotalMins = 0;
            int TotalHrs = 0;

			//calculate total hrs and mins of this week
			
			Int16 fieldValue = 0;
			int dictValue = 0;

            //Email Hours and Mins Calc
            var totalEmailMinsForWeek = WrkHoursList.Sum(item => item.Fields.GetFinalEmailMinutes());
			
			FinalDictObj.Add("EmailMins", totalEmailMinsForWeek % 60);
			
			if (FinalDictObj.TryGetValue("EmailMins", out dictValue))
				Mins += dictValue;

			var totalEmailHrsforWeek = WrkHoursList.Sum(item => item.Fields.GetFinalEmailHours());
            
			FinalDictObj.Add("EmailHrs", totalEmailHrsforWeek + (totalEmailMinsForWeek / 60));

			if (FinalDictObj.TryGetValue("EmailHrs", out dictValue))
				TotalHrs += dictValue;

			//Meeting Hours and Mins Calc

			var totalMeetingMinsforWeek = WrkHoursList.Sum(item => item.Fields.GetFinalMeetingMinutes());

			FinalDictObj.Add("MeetingMins", totalMeetingMinsforWeek % 60);

			if (FinalDictObj.TryGetValue("MeetingMins", out dictValue))
				Mins += dictValue;

			var totalMeetingHrsforWeek = WrkHoursList.Sum(item => item.Fields.GetFinalMeetingHours());

			FinalDictObj.Add("MeetingHrs", totalMeetingHrsforWeek  + (totalMeetingMinsforWeek / 60));

			if (FinalDictObj.TryGetValue("MeetingHrs", out dictValue))
				TotalHrs += dictValue;

			//Other Hours and Mins Calc
			var totalOtherMinsforWeek = WrkHoursList.Sum(item => item.Fields.GetFinalOtherMinutes());

			FinalDictObj.Add("OtherMins", (totalOtherMinsforWeek) % 60);

			if (FinalDictObj.TryGetValue("OtherMins", out dictValue))
				Mins += dictValue;

			var totalOtherHrsforWeek = WrkHoursList.Sum(item => item.Fields.GetFinalOtherHours());

		
			FinalDictObj.Add("OtherHrs", totalOtherHrsforWeek + (totalOtherMinsforWeek / 60));

			if (FinalDictObj.TryGetValue("OtherHrs", out dictValue))
				TotalHrs += dictValue;

			TotalHrs += Mins / 60;
			TotalMins = Mins % 60;

            FinalDictObj.TryAdd("TotHrs", TotalHrs);
            FinalDictObj.TryAdd("TotMins", TotalMins);

            return ConvertToStringOfStrings(FinalDictObj);
        }

        public static Dictionary<string, short> ComputeDailyTotals(WorkHoursFields whf)
        {
			Dictionary<string, short> FinalDictObj = new Dictionary<string, short>();

			//For Email Hours
			if (whf.EmailAdjustedHours > 0 || whf.EmailAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalEmailHrs", whf.EmailAdjustedHours);
				FinalDictObj.TryAdd("FinalEmailMins", whf.EmailAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalEmailHrs", whf.EmailHours);
				FinalDictObj.TryAdd("FinalEmailMins", whf.EmailMinutes);

			}
			//For Meeting Hours
			if (whf.MeetingAdjustedHours > 0 || whf.MeetingAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalMeetingHrs", whf.MeetingAdjustedHours);
				FinalDictObj.TryAdd("FinalMeetingMins", whf.MeetingAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalMeetingHrs", whf.MeetingHours);
				FinalDictObj.TryAdd("FinalMeetingMins", whf.MeetingMinutes);

			}
			//For Other Hours
			if (whf.OtherAdjustedHours > 0 || whf.OtherAdjustedMinutes > 0)
			{

				FinalDictObj.TryAdd("FinalOtherHrs", whf.OtherAdjustedHours);
				FinalDictObj.TryAdd("FinalOtherMins", whf.OtherAdjustedMinutes);

			}
			else
			{
				FinalDictObj.TryAdd("FinalOtherHrs", whf.OtherHours);
				FinalDictObj.TryAdd("FinalOtherMins", whf.OtherMinutes);

			}

			// Total Calculation
			var Mins = FinalDictObj["FinalEmailMins"] + FinalDictObj["FinalMeetingMins"] + FinalDictObj["FinalOtherMins"];
			var totalMins = Mins % 60;
			var totalHrs = FinalDictObj["FinalEmailHrs"] + FinalDictObj["FinalMeetingHrs"] + FinalDictObj["FinalOtherHrs"] + Mins / 60;

			FinalDictObj.TryAdd("FinalTotalHrs", (short)totalHrs);
			FinalDictObj.TryAdd("FinalTotalMins", (short)totalMins);

			return FinalDictObj;
            
        }

        private static Dictionary<string, string> ConvertToStringOfStrings(Dictionary<string, int> input)
        {
            var retVal = new Dictionary<string, string>();
            foreach(var key in input.Keys)
            {
                retVal.Add(key, input[key].ToString());
            }

            return retVal;
        }
    }
}

