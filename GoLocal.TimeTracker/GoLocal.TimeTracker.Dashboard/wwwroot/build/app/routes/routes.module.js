"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var translator_service_1 = require("../core/translator/translator.service");
var menu_service_1 = require("../core/menu/menu.service");
var shared_module_1 = require("../shared/shared.module");
var menu_1 = require("./menu");
var routes_1 = require("./routes");
var RoutesModule = /** @class */ (function () {
    function RoutesModule(menuService, tr) {
        this.menuService = menuService;
        menuService.addMenu(menu_1.menu);
    }
    RoutesModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forRoot(routes_1.routes),
            ],
            declarations: [],
            exports: [
                router_1.RouterModule
            ]
        }),
        __metadata("design:paramtypes", [menu_service_1.MenuService, translator_service_1.TranslatorService])
    ], RoutesModule);
    return RoutesModule;
}());
exports.RoutesModule = RoutesModule;
//# sourceMappingURL=routes.module.js.map