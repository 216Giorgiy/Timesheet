"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular_tree_component_1 = require("angular-tree-component");
var core_2 = require("@agm/core");
var ng2_select_1 = require("ng2-select");
var shared_module_1 = require("../../shared/shared.module");
var invoice_component_1 = require("./invoice/invoice.component");
var compose_component_1 = require("./mailbox/compose/compose.component");
var folder_component_1 = require("./mailbox/folder/folder.component");
var mailbox_component_1 = require("./mailbox/mailbox.component");
var view_component_1 = require("./mailbox/view/view.component");
var settings_component_1 = require("./settings/settings.component");
var routes = [
    { path: 'settings', component: settings_component_1.SettingsComponent },
    {
        path: 'mailbox',
        component: mailbox_component_1.MailboxComponent,
        children: [
            { path: '', redirectTo: 'folder/inbox' },
            { path: 'folder/:folder', component: folder_component_1.FolderComponent },
            { path: 'view/:mid', component: view_component_1.ViewComponent },
            { path: 'compose', component: compose_component_1.ComposeComponent }
        ]
    },
    { path: 'invoice', component: invoice_component_1.InvoiceComponent },
];
var ExtrasModule = /** @class */ (function () {
    function ExtrasModule() {
    }
    ExtrasModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                angular_tree_component_1.TreeModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA'
                }),
                ng2_select_1.SelectModule
            ],
            declarations: [
                invoice_component_1.InvoiceComponent,
                compose_component_1.ComposeComponent,
                folder_component_1.FolderComponent,
                mailbox_component_1.MailboxComponent,
                view_component_1.ViewComponent,
                settings_component_1.SettingsComponent,
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], ExtrasModule);
    return ExtrasModule;
}());
exports.ExtrasModule = ExtrasModule;
//# sourceMappingURL=extras.module.js.map