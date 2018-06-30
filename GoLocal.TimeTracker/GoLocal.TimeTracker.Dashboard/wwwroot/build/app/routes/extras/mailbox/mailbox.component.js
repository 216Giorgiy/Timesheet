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
var MailboxComponent = /** @class */ (function () {
    function MailboxComponent(router) {
        this.router = router;
        this.mailboxMenuCollapsed = true;
        this.folders = [
            { name: 'Person', folder: 'inbox', alert: 42, icon: 'fa-inbox' },
            { name: 'Starred', folder: 'starred', alert: 10, icon: 'fa-star' },
            { name: 'Sent', folder: 'sent', alert: 0, icon: 'fa-paper-plane-o' },
            { name: 'Draft', folder: 'draft', alert: 5, icon: 'fa-edit' },
            { name: 'Trash', folder: 'trash', alert: 0, icon: 'fa-trash' }
        ];
        this.mail = {
            cc: false,
            bcc: false
        };
        // Mailbox editr initial content
        this.content = '<p>Type something..</p>';
    }
    MailboxComponent.prototype.routeIsActive = function (routePath) {
        return this.router.url == routePath;
    };
    MailboxComponent.prototype.ngOnInit = function () {
    };
    MailboxComponent = __decorate([
        core_1.Component({
            selector: 'app-mailbox',
            templateUrl: './mailbox.component.html',
            styleUrls: ['./mailbox.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], MailboxComponent);
    return MailboxComponent;
}());
exports.MailboxComponent = MailboxComponent;
//# sourceMappingURL=mailbox.component.js.map