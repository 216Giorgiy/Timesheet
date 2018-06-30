// Copyright(c) Microsoft Corporation. 
// All rights reserved.
//
// Licensed under the MIT license. See LICENSE file in the solution root folder for full license information.

using System;

namespace GoLocal.TimeTracker.Dashboard.Models
{
    public class ErrorViewModel
    {
        public string ErrorMessage { get; set; }
        public string RequestId { get; set; }

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

		
	}
}