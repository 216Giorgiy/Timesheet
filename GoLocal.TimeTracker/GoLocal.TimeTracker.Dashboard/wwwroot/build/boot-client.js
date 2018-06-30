"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
require("./modernizr.js"); // 'npm run modernizr' to create this file
// Enable either Hot Module Reloading or production mode
/* tslint:disable */
if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(function () { });
}
else {
    core_1.enableProdMode();
}
var a = platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
a.then(function () { window.appBootstrap && window.appBootstrap(); });
//# sourceMappingURL=boot-client.js.map