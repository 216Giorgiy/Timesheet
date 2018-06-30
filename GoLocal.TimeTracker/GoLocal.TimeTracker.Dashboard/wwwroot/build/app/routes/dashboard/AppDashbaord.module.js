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
var shared_module_1 = require("../../shared/shared.module");
var AppDashbaord_component_1 = require("./Dashboard/AppDashbaord.component");
var routes = [
    { path: '', component: AppDashbaord_component_1.AppDashbaordComponent },
];
var AppDashbaordModule = /** @class */ (function () {
    function AppDashbaordModule() {
    }
    AppDashbaordModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes)
            ],
            declarations: [
                AppDashbaord_component_1.AppDashbaordComponent,
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppDashbaordModule);
    return AppDashbaordModule;
}());
exports.AppDashbaordModule = AppDashbaordModule;
//# sourceMappingURL=AppDashbaord.module.js.map