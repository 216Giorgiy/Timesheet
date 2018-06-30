"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layout_component_1 = require("../layout/layout.component");
exports.routes = [
    {
        path: '',
        component: layout_component_1.LayoutComponent,
        children: [
            { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'MyTeamHours', loadChildren: './MyTeamHours/HomeDashboard.module#HomeDashboardModule' },
            { path: 'MonthlyHours', loadChildren: './MonthlyHours/MonthlyHours.module#MonthlyHoursModule' },
            { path: 'Dashboard', loadChildren: './Dashboard/AppDashbaord.module#AppDashbaordModule' },
            { path: 'WorkTimereport', loadChildren: './WorkTimereport/widgets.module#WidgetsModule' },
            { path: 'extras', loadChildren: './extras/extras.module#ExtrasModule' }
        ]
    },
    // Not lazy-loaded routes
    // Not found
    { path: '**', redirectTo: 'Dashboard' }
];
//# sourceMappingURL=routes.js.map