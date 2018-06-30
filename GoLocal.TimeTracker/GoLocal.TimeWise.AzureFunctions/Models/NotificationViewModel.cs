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
    public class NotificationViewModel
    {
        public UserProfile UserInfo { get; set; }

        public List<UserNotifications> MyUserNotifications { get; set; }

        public int UnReadCount
        {
            get
            {
                // var UnreadCount = MyNotifications.Sum(t => t.IsRead ? 0 : 1);
                DateTime initDateTime = new DateTime(1, 1, 1);
                var UnReadNotifications = MyUserNotifications.Sum(t => (t.Notifications.Fields.ReadDate.Date.Equals(initDateTime) ? 1 : 0));
                return UnReadNotifications;
            }
        }

        //public void MarkAsRead(int listIndex)
        //{
        //	MyNotifications[listIndex].IsRead = true;
        //	UnReadNotinCount = UnReadNotinCount - 1;
        //	//write back to API
        //}
    }

    public class UserNotifications
    {
        public Notifications Notifications { get; set; }
        public bool IsRead
        {
            get
            {
                DateTime newDateTime = new DateTime(1, 1, 1);
                return this.Notifications.Fields.ReadDate.Date.Equals(newDateTime) ? false : true;
            }
        }

    }


}
