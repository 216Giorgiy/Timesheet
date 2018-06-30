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
var core_2 = require("@agm/core");
var shared_module_1 = require("../../shared/shared.module");
var widgets_component_1 = require("./widgets/widgets.component");
var routes = [
    { path: '', component: widgets_component_1.WidgetsComponent }
];
var WidgetsModule = /** @class */ (function () {
    function WidgetsModule() {
    }
    WidgetsModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA'
                })
            ],
            declarations: [widgets_component_1.WidgetsComponent],
            exports: [
                router_1.RouterModule
            ]
        })
    ], WidgetsModule);
    return WidgetsModule;
}());
exports.WidgetsModule = WidgetsModule;
//# sourceMappingURL=widgets.module.js.map