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
    public static class WorkHoursFieldsExtentions
    {
        public static short GetFinalMeetingHours(this WorkHoursFields whf)
        {
            if (whf.MeetingAdjustedHours > 0 || whf.MeetingAdjustedMinutes > 0)
            {
                return whf.MeetingAdjustedHours;
            }

            return whf.MeetingHours;
        }

        public static short GetFinalMeetingMinutes(this WorkHoursFields whf)
        {
            if (whf.MeetingAdjustedMinutes > 0 || whf.MeetingAdjustedHours > 0)
            {
                return whf.MeetingAdjustedMinutes;
            }

            return whf.MeetingMinutes;
        }

        public static short GetFinalEmailHours(this WorkHoursFields whf)
        {
            if (whf.EmailAdjustedHours > 0 || whf.EmailAdjustedMinutes > 0)
            {
                return whf.EmailAdjustedHours;
            }

            return whf.EmailHours;
        }

        public static short GetFinalEmailMinutes(this WorkHoursFields whf)
        {
            if (whf.EmailAdjustedHours > 0 || whf.EmailAdjustedMinutes > 0)
            {
                return whf.EmailAdjustedMinutes;
            }

            return whf.EmailMinutes;
        }

        public static short GetFinalOtherMinutes(this WorkHoursFields whf)
        {
            if (whf.OtherAdjustedMinutes > 0 || whf.OtherAdjustedHours > 0)
            {
                return whf.OtherAdjustedMinutes;
            }

            return whf.OtherMinutes;
        }

        public static short GetFinalOtherHours(this WorkHoursFields whf)
        {
            if (whf.OtherAdjustedMinutes > 0 || whf.OtherAdjustedHours > 0)
            {
                return whf.OtherAdjustedHours;
            }

            return whf.OtherHours;
        }
    }
}
