// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Text;

namespace GoLocal.TimeWise.AzureFunctions.Helpers
{
    public class SharePointListsSchemaHelper
    {
        public static string GetWorkHoursJsonSchema(string displayName)
        {
            string json = @"
        {
          'displayName': '" + displayName + @"',
          'columns': [
            {
              'name': 'ObjectIdentifier',
              'text': {},
              'indexed': true
            },
            {
              'name': 'Date',
              'text': {},
              'indexed': true
            },
            {
              'name': 'MeetingHours',
              'number': {}
            },
            {
              'name': 'MeetingMinutes',
              'number': {}
            },
            {
              'name': 'MeetingAdjustedHours',
              'number': {}
            },
            {
              'name': 'MeetingAdjustedMinutes',
              'number': {}
            },
            {
              'name': 'EmailHours',
              'number': {}
            },
            {
              'name': 'EmailMinutes',
              'number': {}
            },
            {
              'name': 'EmailAdjustedHours',
              'number': {}
            },
            {
              'name': 'EmailAdjustedMinutes',
              'number': {}
            },
            {
              'name': 'OtherHours',
              'number': {}
            },
            {
              'name': 'OtherMinutes',
              'number': {}
            },
            {
              'name': 'OtherAdjustedHours',
              'number': {}
            },
            {
              'name': 'OtherAdjustedMinutes',
              'number': {}
            },
            {
              'name': 'AdjustedHoursReason',
              'text': {}
            },
            {
              'name': 'TeamHoursItemState',
              'text': {}
            },
            {
              'name': 'TeamHoursSubmittedDate',
              'dateTime': {}
            },
            {
              'name': 'ItemState',
              'text': {}
            },
            {
              'name': 'SubmittedDate',
              'dateTime': {}
            }
          ]
        }";

            return json;
        }

        public static string GetTeamHoursJsonSchema(string displayName)
        {
            string json = @"
{
  'displayName': '" + displayName + @"',
  'columns': [
    {
      'name': 'ObjectIdentifier',
      'text': {},
      'indexed': true
    },
    {
      'name': 'Date',
      'text': {},
      'indexed': true
    },
    {
      'name': 'MeetingHours',
      'number': {}
    },
    {
      'name': 'MeetingMinutes',
      'number': {}
    },
    {
      'name': 'MeetingAdjustedHours',
      'number': {}
    },
    {
      'name': 'MeetingAdjustedMinutes',
      'number': {}
    },
    {
      'name': 'EmailHours',
      'number': {}
    },
    {
      'name': 'EmailMinutes',
      'number': {}
    },
    {
      'name': 'EmailAdjustedHours',
      'number': {}
    },
    {
      'name': 'EmailAdjustedMinutes',
      'number': {}
    },
    {
      'name': 'OtherHours',
      'number': {}
    },
    {
      'name': 'OtherMinutes',
      'number': {}
    },
    {
      'name': 'OtherAdjustedHours',
      'number': {}
    },
    {
      'name': 'OtherAdjustedMinutes',
      'number': {}
    },
    {
      'name': 'AdjustedHoursReason',
      'text': {}
    },
    {
      'name': 'TeamHoursItemState',
      'text': {}
    },
    {
      'name': 'TeamHoursSubmittedDate',
      'dateTime': {}
    },
    {
      'name': 'ItemState',
      'text': {}
    },
    {
      'name': 'SubmittedDate',
      'dateTime': {}
    }
  ]
}";

            return json;
        }

        public static string GetReportHoursJsonSchema(string displayName)
        {
            string json = @"
{
  'displayName': '" + displayName + @"',
  'columns': [
    {
      'name': 'ObjectIdentifier',
      'text': {},
      'indexed': true
    },
    {
      'name': 'ManagerObjectIdentifier',
      'text': {},
      'indexed': true
    },
    {
      'name': 'Date',
      'text': {},
      'indexed': true
    },
    {
      'name': 'MeetingHours',
      'number': {}
    },
    {
      'name': 'MeetingMinutes',
      'number': {}
    },
    {
      'name': 'MeetingAdjustedHours',
      'number': {}
    },
    {
      'name': 'MeetingAdjustedMinutes',
      'number': {}
    },
    {
      'name': 'EmailHours',
      'number': {}
    },
    {
      'name': 'EmailMinutes',
      'number': {}
    },
    {
      'name': 'EmailAdjustedHours',
      'number': {}
    },
    {
      'name': 'EmailAdjustedMinutes',
      'number': {}
    },
    {
      'name': 'OtherHours',
      'number': {}
    },
    {
      'name': 'OtherMinutes',
      'number': {}
    },
    {
      'name': 'OtherAdjustedHours',
      'number': {}
    },
    {
      'name': 'OtherAdjustedMinutes',
      'number': {}
    },
    {
      'name': 'AdjustedHoursReason',
      'text': {}
    },
    {
      'name': 'TeamHoursItemState',
      'text': {}
    },
    {
      'name': 'TeamHoursSubmittedDate',
      'dateTime': {}
    },
    {
      'name': 'ItemState',
      'text': {}
    },
    {
      'name': 'SubmittedDate',
      'dateTime': {}
    }
  ]
}";

            return json;
        }

        public static string GetNotificationsJsonSchema(string displayName)
        {
            string json = @"
{
  'displayName': '" + displayName + @"',
  'columns': [
    {
      'name': 'SentToMail',
      'text': {}
    },
    {
      'name': 'SentToName',
      'text': {}
    },
    {
      'name': 'SentDate',
      'dateTime': {}
    },
    {
      'name': 'SentFromMail',
      'text': {}
    },
    {
      'name': 'SentFromName',
      'text': {}
    },
    {
      'name': 'ReadDate',
      'dateTime': {}
    },
    {
      'name': 'MessageBody',
      'text': {}
    }
  ]
}
";

            return json;
        }

        public static string GetGroupMembershipJsonSchema(string displayName)
        {
            string json = @"
{
  'displayName': '" + displayName + @"',
  'columns': [
    {
      'name': 'UserMail',
      'text': {},
      'indexed': true
    },
    {
      'name': 'GroupMembership',
      'text': {}
    }
  ]
}
";

            return json;
        }

        public static string GetUsersMembershipJsonSchema(string displayName)
        {
            string json = @"
{
  'displayName': '" + displayName + @"',
  'columns': [
    {
      'name': 'ObjectIdentifier',
      'text': {},
      'indexed': true
    },
    {
      'name': 'UserMail',
      'text': {},
      'indexed': true
    },
    {
      'name': 'FirstDayOfWeek',
      'text': {}
    },
    {
      'name': 'EmailNotificationsEnabled',
      'boolean': {},
      'defaultValue': { 'value': '1' }
    },
    {
      'name': 'AutoSubmitData',
      'text': {},
      'indexed': true
    },
     {
      'name': 'DailyUpdateStatus',
      'text': {},
      'indexed': true
    },
    {
      'name': 'UpdateDate',
      'dateTime': {}
    },
    {
      'name': 'AutoSubmitStatus',
      'text': {}
    },
    {
      'name': 'SubmitDate',
      'dateTime': {}
    }
  ]
}
";

            return json;
        }
        public static string GetTotalHoursJsonSchema(string displayName)
        {
            string json = @"
{
  'displayName': '" + displayName + @"',
  'columns': [
    {
      'name': 'ObjectIdentifier',
      'text': {},
      'indexed': true
    },
    {
      'name': 'Date',
      'text': {},
      'indexed': true
    },
    {
      'name': 'TotalHours',
      'number': {}
    },
    {
      'name': 'TotalMins',
      'number': {}
    },
     {
      'name': 'OTHours',
      'number': {}
    },
    {
      'name': 'OTMins',
      'number': {}
    },
     ]
}";
            return json;
        }

    }


    public enum ListSchema
    {
        WorkHoursListSchema,
        TeamHoursListSchema,
        ReportHoursListSchema,
        NotificationsListSchema,
        UsersListSchema,
        TotalHrsListSchema
    }
}
