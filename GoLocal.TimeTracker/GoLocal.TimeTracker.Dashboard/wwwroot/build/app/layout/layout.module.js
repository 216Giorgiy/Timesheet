"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var layout_component_1 = require("./layout.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var header_component_1 = require("./header/header.component");
var navsearch_component_1 = require("./header/navsearch/navsearch.component");
var offsidebar_component_1 = require("./offsidebar/offsidebar.component");
var userblock_component_1 = require("./sidebar/userblock/userblock.component");
var userblock_service_1 = require("./sidebar/userblock/userblock.service");
var shared_module_1 = require("../shared/shared.module");
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule
            ],
            providers: [
                userblock_service_1.UserblockService
            ],
            declarations: [
                layout_component_1.LayoutComponent,
                sidebar_component_1.SidebarComponent,
                userblock_component_1.UserblockComponent,
                header_component_1.HeaderComponent,
                navsearch_component_1.NavsearchComponent,
                offsidebar_component_1.OffsidebarComponent,
            ],
            exports: [
                layout_component_1.LayoutComponent,
                sidebar_component_1.SidebarComponent,
                userblock_component_1.UserblockComponent,
                header_component_1.HeaderComponent,
                navsearch_component_1.NavsearchComponent,
                offsidebar_component_1.OffsidebarComponent,
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());
exports.LayoutModule = LayoutModule;
//# sourceMappingURL=layout.module.js.map