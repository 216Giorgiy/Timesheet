// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoLocal.TimeTracker.Dashboard
{
    public class LogEvents
    {
		public const int GenerateItems = 1000;
		public const int ListItems = 1001;
		public const int GetItem = 1002;
		public const int InsertItem = 1003;
		public const int UpdateItem = 1004;
		public const int DeleteItem = 1005;

		public const int AuthRelated = 2000;

		public const int GetItemNotFound = 4000;
		public const int UpdateItemNotFound = 4001;

	}
}
