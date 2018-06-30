// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using GoLocal.TimeTracker.MiddleTier.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace GoLocal.TimeTracker.MiddleTier.Utilities
{
    public class TimezoneHelper
    {
        private readonly ILogger _logger;
        private readonly TimeTrackerOptions _timeTrackerOptions;
        private readonly TimeZoneInfo _timeZone;

        public TimezoneHelper(
            ILogger<TimezoneHelper> logger,
            IOptionsSnapshot<TimeTrackerOptions> timeTrackerOptions)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _timeTrackerOptions = timeTrackerOptions.Value ?? throw new ArgumentNullException(nameof(timeTrackerOptions));
            _timeZone = GetValidatedTimezone();
        }

        public TimeZoneInfo timeZoneInfo
        {
            get
            {
                return _timeZone;
            }
        }

        private TimeZoneInfo GetValidatedTimezone()
        {
            if (_timeZone != null) return _timeZone;

            // Initialize the Time Zone based on appSettings value.
            ReadOnlyCollection<TimeZoneInfo> tzCollection; // Find time zones on this computer.
            String appSettingsZone = _timeTrackerOptions.TimeZone;
            tzCollection = TimeZoneInfo.GetSystemTimeZones();
            TimeZoneInfo definedZone = null; // Start with null value.
            foreach (TimeZoneInfo zone in tzCollection)
            {
                if (appSettingsZone == zone.Id) // If appSettings value is valid, use it.
                {
                    definedZone = TimeZoneInfo.FindSystemTimeZoneById(appSettingsZone);
                    break;
                }                
            }
            if (definedZone == null) // if no string matched.
            {
                // Value set in appsettings is incorrect
                throw new ArgumentOutOfRangeException("TimeZone parameter in appSettings contains an invalid value");
            }

            return definedZone;
        }
    }
}
