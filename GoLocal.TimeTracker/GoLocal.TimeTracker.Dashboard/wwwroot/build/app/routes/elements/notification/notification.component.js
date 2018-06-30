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
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent(toasterService) {
        this.toasterService = toasterService;
        this.toasterconfig = new angular2_toaster_1.ToasterConfig({
            positionClass: 'toast-bottom-right',
            showCloseButton: true
        });
        // ALERTs
        this.alerts = [
            {
                type: 'danger',
                msg: 'Oh snap! Change a few things up and try submitting again.'
            },
            {
                type: 'success',
                msg: 'Well done! You successfully read this important alert message.',
                closable: true
            }
        ];
        // PROGRESSBAR
        this.max = 200;
        this.stacked = [];
        // TOOLTIPS
        this.dynamicTooltip = 'Hello, World!';
        this.dynamicTooltipText = 'dynamic';
        this.htmlTooltip = 'I\'ve been made <b>bold</b>!';
        this.tooltipModel = { text: 'foo', index: 1 };
        this.ttcontent = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
        // RATINGS
        this.x = 5;
        this.y = 2;
        this.maxRat = 10;
        this.rate = 7;
        this.isReadonly = false;
        this.toaster = {
            type: 'success',
            title: 'Title',
            text: 'Message'
        };
        this.random();
        this.randomStacked();
    }
    NotificationComponent.prototype.ngOnInit = function () { };
    // TOSATER METHOD
    NotificationComponent.prototype.pop = function () {
        this.toasterService.pop(this.toaster.type, this.toaster.title, this.toaster.text);
    };
    ;
    // ALERT METHOD
    NotificationComponent.prototype.closeAlert = function (i) {
        this.alerts.splice(i, 1);
    };
    NotificationComponent.prototype.addAlert = function () {
        this.alerts.push({ msg: 'Another alert!', type: 'warning', closable: true });
    };
    // PROGRESSBAR METHODS
    NotificationComponent.prototype.random = function () {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;
        if (value < 25) {
            type = 'success';
        }
        else if (value < 50) {
            type = 'info';
        }
        else if (value < 75) {
            type = 'warning';
        }
        else {
            type = 'danger';
        }
        this.showWarning = (type === 'danger' || type === 'warning');
        this.dynamic = value;
        this.type = type;
    };
    ;
    NotificationComponent.prototype.randomStacked = function () {
        var types = ['success', 'info', 'warning', 'danger'];
        this.stacked = [];
        var total = 0;
        var n = Math.floor((Math.random() * 4) + 1);
        for (var i = 0; i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            var value = Math.floor((Math.random() * 30) + 1);
            total += value;
            this.stacked.push({
                value: value,
                max: value,
                type: types[index]
            });
        }
    };
    ;
    // TOOLTIPS METHODS
    NotificationComponent.prototype.tooltipStateChanged = function (state) {
        console.log("Tooltip is open: " + state);
    };
    // RATINGS METHODS
    NotificationComponent.prototype.hoveringOver = function (value) {
        this.overStar = value;
        this.percent = 100 * (value / this.maxRat);
    };
    ;
    NotificationComponent.prototype.resetStar = function () {
        this.overStar = void 0;
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'app-notification',
            templateUrl: './notification.component.html',
            styleUrls: ['./notification.component.scss']
        }),
        __metadata("design:paramtypes", [angular2_toaster_1.ToasterService])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notification.component.js.map