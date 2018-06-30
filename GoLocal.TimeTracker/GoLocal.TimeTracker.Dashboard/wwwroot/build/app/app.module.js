"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/platform-browser/animations"); // this is needed!
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var app_component_1 = require("./app.component");
var core_module_1 = require("./core/core.module");
var layout_module_1 = require("./layout/layout.module");
var shared_module_1 = require("./shared/shared.module");
var routes_module_1 = require("./routes/routes.module");
// https://github.com/ocombe/ng2-translate/issues/218
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent
            ],
            imports: [
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                core_module_1.CoreModule,
                layout_module_1.LayoutModule,
                shared_module_1.SharedModule.forRoot(),
                routes_module_1.RoutesModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [http_1.HttpClient]
                    }
                })
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map