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
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(router) {
        this.router = router;
        this.mailboxMenuCollapsed = true;
        this.folders = [
            { name: 'Inbox', folder: 'inbox', alert: 42, icon: 'fa-inbox' },
            { name: 'Starred', folder: 'starred', alert: 10, icon: 'fa-star' },
            { name: 'Sent', folder: 'sent', alert: 0, icon: 'fa-paper-plane-o' },
            { name: 'Draft', folder: 'draft', alert: 5, icon: 'fa-edit' },
            { name: 'Trash', folder: 'trash', alert: 0, icon: 'fa-trash' }
        ];
        this.labels = [
            { name: 'Red', color: 'danger' },
            { name: 'Pink', color: 'pink' },
            { name: 'Blue', color: 'info' },
            { name: 'Yellow', color: 'warning' }
        ];
        this.mail = {
            cc: false,
            bcc: false
        };
        // Mailbox editr initial content
        this.content = '<p>Type something..</p>';
    }
    NotificationComponent.prototype.routeIsActive = function (routePath) {
        return this.router.url == routePath;
    };
    NotificationComponent.prototype.ngOnInit = function () {
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'Notification ',
            templateUrl: './Notification.component.html',
            styleUrls: ['./Notification.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=Notification component.js.map