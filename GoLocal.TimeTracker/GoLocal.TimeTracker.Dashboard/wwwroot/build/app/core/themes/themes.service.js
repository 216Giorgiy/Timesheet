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
var themeA = require('../../shared/styles/themes/theme-a.scss');
var ThemesService = /** @class */ (function () {
    function ThemesService() {
        this.defaultTheme = 'A';
        this.createStyle();
        this.setTheme(this.defaultTheme);
    }
    ThemesService.prototype.createStyle = function () {
        var head = document.head || document.getElementsByTagName('head')[0];
        this.styleTag = document.createElement('style');
        this.styleTag.type = 'text/css';
        this.styleTag.id = 'appthemes';
        head.appendChild(this.styleTag);
    };
    ThemesService.prototype.setTheme = function (name) {
        switch (name) {
            case 'A':
                this.injectStylesheet(themeA);
                break;
        }
    };
    ThemesService.prototype.injectStylesheet = function (css) {
        this.styleTag.innerHTML = css;
    };
    ThemesService.prototype.getDefaultTheme = function () {
        return this.defaultTheme;
    };
    ThemesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ThemesService);
    return ThemesService;
}());
exports.ThemesService = ThemesService;
//# sourceMappingURL=themes.service.js.map