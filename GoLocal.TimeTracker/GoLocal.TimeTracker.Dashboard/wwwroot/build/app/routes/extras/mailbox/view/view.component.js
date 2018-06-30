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
var http_1 = require("@angular/common/http");
var settings_service_1 = require("../../../../core/settings/settings.service");
var ViewComponent = /** @class */ (function () {
    function ViewComponent(route, http, settings) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.settings = settings;
        this.mail = {};
        this.sub = this.route.params.subscribe(function (params) {
            _this.http.get('assets/server/mails.json')
                .subscribe(function (data) {
                var mailsFound = data.mails.filter(function (m) { return (m.id === +params['mid']); });
                _this.mail = mailsFound.length ? mailsFound[0] : {};
            });
        });
    }
    ViewComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ViewComponent.prototype.ngOnInit = function () {
    };
    ViewComponent = __decorate([
        core_1.Component({
            selector: 'app-view',
            templateUrl: './view.component.html',
            styleUrls: ['./view.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.HttpClient, settings_service_1.SettingsService])
    ], ViewComponent);
    return ViewComponent;
}());
exports.ViewComponent = ViewComponent;
//# sourceMappingURL=view.component.js.map