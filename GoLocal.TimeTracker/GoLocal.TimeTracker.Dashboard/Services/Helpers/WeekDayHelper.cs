// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeTracker.Dashboard.ViewModels;
using GoLocal.TimeTracker.MiddleTier.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.Dashboard.Services.Helpers
{
    public class WeekDayHelper
    {
        public static Dictionary<string, DateTime> GetWeekStEndDate(DateTime date, string weekType, int startingDayNum)
        {

            Dictionary<string, DateTime> weekDates = new Dictionary<string, DateTime>();
            // Change here to use UserProfileRepository
            
            DayOfWeek weekStart = (DayOfWeek)startingDayNum; // or Sunday, or whenever
            DayOfWeek weekEnd = (DayOfWeek)((startingDayNum+6) % 7); 
            DateTime weekStartDate;
            DateTime weekEndDate;
            int mon = date.Month;
            weekStartDate = date;
            weekEndDate = date;

            switch (weekType)
            {
                case "current":
                    while (weekStartDate.DayOfWeek != weekStart)
                        weekStartDate = weekStartDate.AddDays(-1);
                    while (weekEndDate.DayOfWeek != weekEnd)
                        weekEndDate = weekEndDate.AddDays(1);

                    break;
                case "prev":
                    weekStartDate = date.AddDays(-7);
                    weekEndDate = date.AddDays(-7);
                    while (weekStartDate.DayOfWeek != weekStart)
                        weekStartDate = weekStartDate.AddDays(-1);
                    while (weekEndDate.DayOfWeek != weekEnd)
                        weekEndDate = weekEndDate.AddDays(1);

                    break;
                case "next":
                    weekStartDate = date.AddDays(7);
                    weekEndDate = date.AddDays(7);
                    while (weekStartDate.DayOfWeek != weekStart)
                        weekStartDate = weekStartDate.AddDays(-1);
                    while (weekEndDate.DayOfWeek != weekEnd)
                        weekEndDate = weekEndDate.AddDays(1);

                    break;
                default:
                    break;
            }

            weekDates.Add("weekStDate", weekStartDate);
            weekDates.Add("weekEndDate", weekEndDate);

            return weekDates;
        }
				
        public static DashBoardViewModel GetCurrentWeekData(DateTime startDate, DateTime endDate, IEnumerable<WorkHours> thisWeekHrs, DashBoardViewModel dashboardViewModel)
        {
            IEnumerable<WorkHours> ThisWeekHrs = new List<WorkHours>();
            //dashboardViewModel.ThisWeek = thisWeekHrs;
            DateTime start = startDate;
            int currentMonth = DateTime.Now.Month;
            using (var ThisDay = thisWeekHrs.GetEnumerator())
            {
                Int16 counter = 0;
                string isCurrent = "";
                while (ThisDay.MoveNext())
                {
                    //var DayNum = "day" + counter + "Hours";

                    decimal Mins = ThisDay.Current.Fields.EmailMinutes  +
                    ThisDay.Current.Fields.MeetingMinutes+
                    ThisDay.Current.Fields.OtherMinutes;

                    decimal ThisDayMins = Decimal.Divide(Mins, (decimal)60.00);
                    decimal Hrs = ThisDay.Current.Fields.EmailHours+
                    ThisDay.Current.Fields.MeetingHours+
                    ThisDay.Current.Fields.OtherHours;

                    var ThisDayHrs =Math.Round( Hrs + ThisDayMins,2);

					//AdjHours calculation
					/*
					decimal AdjMins = ThisDay.Current.Fields.EmailAdjustedMinutes +
					ThisDay.Current.Fields.MeetingAdjustedMinutes +
					ThisDay.Current.Fields.OtherAdjustedMinutes;
					*/
					decimal AdjMins = ThisDay.Current.Fields.GetFinalEmailMinutes() +
					ThisDay.Current.Fields.GetFinalMeetingMinutes() +
					ThisDay.Current.Fields.GetFinalOtherMinutes();

					decimal ThisDayAdjMins = Decimal.Divide(AdjMins, (decimal)60.00);
					/*
					decimal AdjHrs = ThisDay.Current.Fields.EmailAdjustedHours +
					ThisDay.Current.Fields.MeetingAdjustedHours +
					ThisDay.Current.Fields.OtherAdjustedHours;
					*/
					decimal AdjHrs = ThisDay.Current.Fields.GetFinalEmailHours() +
					ThisDay.Current.Fields.GetFinalMeetingHours() +
					ThisDay.Current.Fields.GetFinalOtherHours();
					var ThisDayAdjHrs = Math.Round(AdjHrs + ThisDayAdjMins, 2);

					if ((ThisDayAdjHrs == ThisDayHrs) && (ThisDayAdjMins == ThisDayMins))
					{
						ThisDayAdjHrs = 0;
						ThisDayAdjMins = 0;
					}


					DateTime dateCurrent = DateTime.ParseExact(ThisDay.Current.Fields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);
                    
                    if(currentMonth == dateCurrent.Month)
                    {
                        isCurrent = "true";
                    }
                    else
                    {
                        isCurrent = "false";
                    }

                    DateTime reportDate = DateTime.ParseExact(ThisDay.Current.Fields.Date, "yyyyMMdd", CultureInfo.InvariantCulture);

                    var delta = (reportDate.Date - start.Date).Days;
                    if (ThisDay.Current.Fields.SubmittedDate != default(DateTime))
                    {
						//dashboardViewModel.DayHours[delta] = new DayTotalHours { HoursDate = reportDate.ToString("ddd MM/dd"), Hours = ThisDayHrs, AdjHours= ThisAdjDayHrs, IsSubmited = "true", SubmitedDate = ThisDay.Current.Fields.SubmittedDate, IsCurrent = isCurrent };
						dashboardViewModel.DayHours[delta] = new DayTotalHours { HoursDate = reportDate.Date.ToShortDateString(), Hours = ThisDayHrs, AdjHours = ThisDayAdjHrs, IsSubmited = "true", SubmitedDate = ThisDay.Current.Fields.SubmittedDate, IsCurrent = isCurrent };
						

					}
                    else
                    {
						//dashboardViewModel.DayHours[delta] = new DayTotalHours { HoursDate = reportDate.ToString("ddd MM/dd"), Hours = ThisDayHrs, AdjHours = ThisAdjDayHrs,IsSubmited = "false", SubmitedDate = ThisDay.Current.Fields.SubmittedDate, IsCurrent = isCurrent };
						dashboardViewModel.DayHours[delta] = new DayTotalHours { HoursDate = reportDate.Date.ToShortDateString(), Hours = ThisDayHrs, AdjHours = ThisDayAdjHrs, IsSubmited = "false", SubmitedDate = ThisDay.Current.Fields.SubmittedDate, IsCurrent = isCurrent };
					}
                    
                    counter++;
                }

                for (int i = 0; i < 7; i++)
                {
                    if (dashboardViewModel.DayHours[i] == null)
                    {
                        if (currentMonth == startDate.Month)
                        {
                            isCurrent = "true";
                        }
                        else
                        {
                            isCurrent = "false";
                        }

						//dashboardViewModel.DayHours[i] = new DayTotalHours { HoursDate = startDate.ToString("ddd MM/dd"), Hours = 0, IsSubmited = "false", SubmitedDate = default(DateTime), IsCurrent = isCurrent };
						dashboardViewModel.DayHours[i] = new DayTotalHours { HoursDate = startDate.Date.ToShortDateString(), Hours = 0, IsSubmited = "false", SubmitedDate = default(DateTime), IsCurrent = isCurrent };
					}

                    startDate = startDate.AddDays(1);
                }
                
                return dashboardViewModel;
            }
        }
    }
}