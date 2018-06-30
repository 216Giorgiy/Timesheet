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
var http_1 = require("@angular/common/http");
var HomeDashboardComponent = /** @class */ (function () {
    function HomeDashboardComponent(http) {
        var _this = this;
        this.http = http;
        this.barOptions = {
            series: {
                bars: {
                    align: 'center',
                    lineWidth: 0,
                    show: true,
                    barWidth: 0.6,
                    fill: 0.9
                }
            },
            grid: {
                borderColor: '#eee',
                borderWidth: 1,
                hoverable: true,
                backgroundColor: '#fcfcfc'
            },
            tooltip: true,
            tooltipOpts: {
                content: function (label, x, y) { return x + ' : ' + y; }
            },
            xaxis: {
                tickColor: '#fcfcfc',
                mode: 'categories'
            },
            yaxis: {
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickColor: '#eee'
            },
            shadowSize: 0
        };
        this.getChartData('assets/server/chart/bar.json').subscribe(function (data) { return _this.barData = data; });
    }
    HomeDashboardComponent.prototype.ngOnInit = function () {
    };
    HomeDashboardComponent.prototype.getChartData = function (url) {
        return this.http.get(url);
    };
    HomeDashboardComponent = __decorate([
        core_1.Component({
            selector: 'HomeDashboard',
            templateUrl: './HomeDashboard.component.html',
            styleUrls: ['./HomeDashboard.component.scss']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], HomeDashboardComponent);
    return HomeDashboardComponent;
}());
exports.HomeDashboardComponent = HomeDashboardComponent;
//# sourceMappingURL=HomeDashboard.component.js.map