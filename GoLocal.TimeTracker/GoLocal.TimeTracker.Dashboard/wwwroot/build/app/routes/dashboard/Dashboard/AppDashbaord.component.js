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
var colors_service_1 = require("../../../shared/colors/colors.service");
var AppDashbaordComponent = /** @class */ (function () {
    function AppDashbaordComponent(colors, http) {
        var _this = this;
        this.colors = colors;
        this.http = http;
        this.sparkValues = [1, 3, 4, 7, 5, 9, 4, 4, 7, 5, 9, 6, 4];
        this.easyPiePercent = 70;
        this.pieOptions = {
            animate: {
                duration: 800,
                enabled: true
            },
            barColor: this.colors.byName('info'),
            trackColor: 'rgba(200,200,200,0.4)',
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'round',
            size: 145
        };
        this.sparkOptions1 = {
            barColor: this.colors.byName('info'),
            height: 30,
            barWidth: '5',
            barSpacing: '2'
        };
        this.sparkOptions2 = {
            type: 'line',
            height: 80,
            width: '100%',
            lineWidth: 2,
            lineColor: this.colors.byName('purple'),
            spotColor: '#888',
            minSpotColor: this.colors.byName('purple'),
            maxSpotColor: this.colors.byName('purple'),
            fillColor: '',
            highlightLineColor: '#fff',
            spotRadius: 3,
            resize: true
        };
        this.splineHeight = 280;
        this.splineOptions = {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    radius: 4
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.5
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
                min: 0,
                max: 150,
                tickColor: '#eee',
                // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                tickFormatter: function (v) {
                    return v /* + ' visitors'*/;
                }
            },
            shadowSize: 0
        };
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
        http.get('assets/server/chart/spline.json').subscribe(function (data) { return _this.splineData = data; });
        this.getChartData('assets/server/chart/bar.json').subscribe(function (data) { return _this.barData = data; });
    }
    AppDashbaordComponent.prototype.ngOnInit = function () { };
    AppDashbaordComponent.prototype.getChartData = function (url) {
        return this.http.get(url);
    };
    AppDashbaordComponent.prototype.colorByName = function (name) {
        return this.colors.byName(name);
    };
    AppDashbaordComponent = __decorate([
        core_1.Component({
            selector: 'AppDashbaord',
            templateUrl: './AppDashbaord.component.html',
            styleUrls: ['./AppDashbaord.component.scss']
        }),
        __metadata("design:paramtypes", [colors_service_1.ColorsService, http_1.HttpClient])
    ], AppDashbaordComponent);
    return AppDashbaordComponent;
}());
exports.AppDashbaordComponent = AppDashbaordComponent;
//# sourceMappingURL=AppDashbaord.component.js.map