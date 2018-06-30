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
var screenfull = require('screenfull');
var browser = require('jquery.browser');
var userblock_service_1 = require("../sidebar/userblock/userblock.service");
var settings_service_1 = require("../../core/settings/settings.service");
var menu_service_1 = require("../../core/menu/menu.service");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(menu, userblockService, settings) {
        this.menu = menu;
        this.userblockService = userblockService;
        this.settings = settings;
        this.navCollapsed = true; // for horizontal layout
        this.menuItems = []; // for horizontal layout
        // show only a few items on demo
        this.menuItems = menu.getMenu().slice(0, 4); // for horizontal layout
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.isNavSearchVisible = false;
        if (browser.msie) {
            this.fsbutton.nativeElement.style.display = 'none';
        }
    };
    HeaderComponent.prototype.toggleUserBlock = function (event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
    };
    HeaderComponent.prototype.openNavSearch = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    };
    HeaderComponent.prototype.setNavSearchVisible = function (stat) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    };
    HeaderComponent.prototype.getNavSearchVisible = function () {
        return this.isNavSearchVisible;
    };
    HeaderComponent.prototype.toggleOffsidebar = function () {
        this.settings.layout.offsidebarOpen = !this.settings.layout.offsidebarOpen;
    };
    HeaderComponent.prototype.toggleCollapsedSideabar = function () {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
    };
    HeaderComponent.prototype.isCollapsedText = function () {
        return this.settings.layout.isCollapsedText;
    };
    HeaderComponent.prototype.toggleFullScreen = function (event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
        // Switch icon indicator
        var el = $(this.fsbutton.nativeElement);
        if (screenfull.isFullscreen) {
            el.children('em').removeClass('fa-expand').addClass('fa-compress');
        }
        else {
            el.children('em').removeClass('fa-compress').addClass('fa-expand');
        }
    };
    __decorate([
        core_1.ViewChild('fsbutton'),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "fsbutton", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        }),
        __metadata("design:paramtypes", [menu_service_1.MenuService, userblock_service_1.UserblockService, settings_service_1.SettingsService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map