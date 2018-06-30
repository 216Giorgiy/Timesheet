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
var settings_service_1 = require("../../core/settings/settings.service");
var themes_service_1 = require("../../core/themes/themes.service");
var translator_service_1 = require("../../core/translator/translator.service");
var OffsidebarComponent = /** @class */ (function () {
    function OffsidebarComponent(settings, themes, translator) {
        this.settings = settings;
        this.themes = themes;
        this.translator = translator;
        this.clickEvent = 'click.offsidebar';
        this.$doc = null;
        this.currentTheme = themes.getDefaultTheme();
        this.selectedLanguage = this.getLangs()[0].code;
    }
    OffsidebarComponent.prototype.ngOnInit = function () {
        this.anyClickClose();
    };
    OffsidebarComponent.prototype.setTheme = function () {
        this.themes.setTheme(this.currentTheme);
    };
    OffsidebarComponent.prototype.getLangs = function () {
        return this.translator.getAvailableLanguages();
    };
    OffsidebarComponent.prototype.setLang = function (value) {
        this.translator.useLanguage(value);
    };
    OffsidebarComponent.prototype.anyClickClose = function () {
        var _this = this;
        this.$doc = $(document).on(this.clickEvent, function (e) {
            if (!$(e.target).parents('.offsidebar').length) {
                _this.settings.layout.offsidebarOpen = false;
            }
        });
    };
    OffsidebarComponent.prototype.ngOnDestroy = function () {
        if (this.$doc)
            this.$doc.off(this.clickEvent);
    };
    OffsidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-offsidebar',
            templateUrl: './offsidebar.component.html',
            styleUrls: ['./offsidebar.component.scss']
        }),
        __metadata("design:paramtypes", [settings_service_1.SettingsService, themes_service_1.ThemesService, translator_service_1.TranslatorService])
    ], OffsidebarComponent);
    return OffsidebarComponent;
}());
exports.OffsidebarComponent = OffsidebarComponent;
//# sourceMappingURL=offsidebar.component.js.map