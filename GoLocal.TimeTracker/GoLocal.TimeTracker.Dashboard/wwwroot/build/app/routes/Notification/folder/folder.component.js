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
var FolderComponent = /** @class */ (function () {
    function FolderComponent(route, http) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.folder = null;
        this.mails = [];
        this.http.get('assets/server/mails.json')
            .subscribe(function (data) {
            _this.mails = data.mails;
        });
        this.sub = this.route.params.subscribe(function (params) {
            _this.folder = params['folder'] === 'inbox' ? '' : params['folder'];
        });
    }
    FolderComponent.prototype.ngOnInit = function () {
    };
    FolderComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    FolderComponent.prototype.isMailOfFolder = function (mail) {
        return mail.folder === this.folder;
    };
    FolderComponent.prototype.folderMailsCount = function () {
        return this.folderMails().length;
    };
    FolderComponent.prototype.folderMails = function () {
        var _this = this;
        return this.mails.filter(function (m) { return (m.folder === _this.folder || _this.folder === ''); });
    };
    FolderComponent = __decorate([
        core_1.Component({
            selector: 'app-folder',
            templateUrl: './folder.component.html',
            styleUrls: ['./folder.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, http_1.HttpClient])
    ], FolderComponent);
    return FolderComponent;
}());
exports.FolderComponent = FolderComponent;
//# sourceMappingURL=folder.component.js.map