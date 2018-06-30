webpackJsonp([14],{

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(98);
var shared_module_1 = __webpack_require__(99);
var AppDashbaord_component_1 = __webpack_require__(872);
var routes = [
    { path: '', component: AppDashbaord_component_1.AppDashbaordComponent },
];
var AppDashbaordModule = (function () {
    function AppDashbaordModule() {
    }
    AppDashbaordModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes)
            ],
            declarations: [
                AppDashbaord_component_1.AppDashbaordComponent,
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppDashbaordModule);
    return AppDashbaordModule;
}());
exports.AppDashbaordModule = AppDashbaordModule;


/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(414);
var colors_service_1 = __webpack_require__(415);
var AppDashbaordComponent = (function () {
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
            template: __webpack_require__(873),
            styles: [__webpack_require__(874)]
        }),
        __metadata("design:paramtypes", [colors_service_1.ColorsService, http_1.HttpClient])
    ], AppDashbaordComponent);
    return AppDashbaordComponent;
}());
exports.AppDashbaordComponent = AppDashbaordComponent;


/***/ }),

/***/ 873:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col-md-12 content-heading \">\r\n        <div class=\" col-md-6 pull-left\">\r\n            Dashbaord\r\n        </div>\r\n        <div class=\" col-md-3  pull-right\">\r\n            <div class=\"ms-Persona ms-Persona--xs\">\r\n                <div class=\"ms-Persona-imageArea\">\r\n                    <img class=\"ms-Persona-image\" src=\"assets/img/user/01.jpg\">\r\n                </div>\r\n\r\n\r\n                <div class=\"ms-Persona-details\">\r\n                    <div class=\"ms-Persona-primaryText\">Takeru is your manager</div>\r\n                    <div class=\"row\">\r\n                       \r\n    <div class=\"col-md-12 mt30\">\r\n        <input class=\"form-control\" type=\"date\" formControlName=\"date\" />\r\n        \r\n\r\n    </div>\r\n       \r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- START widgets box-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Yesterday </div>\r\n                    <div class=\"h1 mt0 pt10\">8h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Last Week  </div>\r\n                    <div class=\"h1 mt0 pt10\">40h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">This Month  </div>\r\n                    <div class=\"h1 mt0 pt10\">200h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"danger\">100%</progressbar>\r\n                        <p class=\"Redfont\"> Over Worked   </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Last Month  </div>\r\n                    <div class=\"h1 mt0 pt10\">240h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"danger\">100%</progressbar>\r\n                        <p class=\"Redfont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 \">\r\n        <div class=\"panel WhiteBG col-md-12 \" id=\"panelChart2\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"panel-title\">Last Month </div>\r\n                </div>\r\n                <div class=\"panel-wrapper\">\r\n                    <div class=\"panel-body\">\r\n                        <div flot [dataset]=\"barData\" [options]=\"barOptions\" height=\"300\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <hr />\r\n            <div class=\"col-md-12 mt30 pb30\">\r\n\r\n                <div class=\"row \">\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Meeting Hours </p>\r\n                        <h3 class=\"m0 text-primary\">0h 45m</h3>\r\n                    </div>\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Email Hours</p>\r\n                        <h3 class=\"m0 text-primary\"> 0h 05m</h3>\r\n                    </div>\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Other Work Time</p>\r\n                        <h3 class=\"m0 text-primary\">7h 00m</h3>\r\n                    </div>\r\n\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Overtime </p>\r\n                        <h3 class=\"m0 text-primary\">1h 00m</h3>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n            </div>\r\n            <div class=\"col-md-12 pb30  \">\r\n                \r\n                <button class=\"ms-Button ms-Button--primary floatRight\">\r\n                    <span class=\"ms-Button-label\">Submitt</span>\r\n                </button>\r\n\r\n            </div>\r\n        </div>\r\n        \r\n\r\n    </div>\r\n    \r\n</div>\r\n<!-- END widgets box-->\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 874:
/***/ (function(module, exports) {

module.exports = ""

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9EYXNoYm9hcmQvQXBwRGFzaGJhb3JkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9EYXNoYm9hcmQvRGFzaGJvYXJkL0FwcERhc2hiYW9yZC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvRGFzaGJvYXJkL0Rhc2hib2FyZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvRGFzaGJvYXJkL0Rhc2hib2FyZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBeUM7QUFDekMsdUNBQXVEO0FBQ3ZELDhDQUEwRDtBQUUxRCx3REFBMkU7QUFHM0UsSUFBTSxNQUFNLEdBQVc7SUFFbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw4Q0FBcUIsRUFBRTtDQUVqRCxDQUFDO0FBZUY7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQWI5QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsNEJBQVk7Z0JBQ1oscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQ2hDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDhDQUFxQjthQUV4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxxQkFBWTthQUNmO1NBQ0osQ0FBQztPQUNXLGtCQUFrQixDQUFJO0lBQUQseUJBQUM7Q0FBQTtBQUF0QixnREFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUIvQixvQ0FBa0Q7QUFDbEQsc0NBQWtEO0FBR2xELGdEQUFzRTtBQU90RTtJQXNISSwrQkFBbUIsTUFBcUIsRUFBUyxJQUFnQjtRQUFqRSxpQkFLQztRQUxrQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVMsU0FB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O1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFySVEscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsbUJBQU8sQ0FBQyxHQUErQixDQUFDO1lBQ2xELE1BQU0sRUFBRSxDQUFDLG1CQUFPLENBQUMsR0FBK0IsQ0FBQyxDQUFDO1NBQ3JELENBQUM7eUNBdUg2Qiw4QkFBYSxFQUFlLGlCQUFVO09BdEh4RCxxQkFBcUIsQ0F1SWpDO0lBQUQsNEJBQUM7Q0FBQTtBQXZJWSxzREFBcUI7Ozs7Ozs7O0FDWGxDLGc3TDs7Ozs7OztBQ0FBLG1CIiwiZmlsZSI6IjE0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBBcHBEYXNoYmFvcmRDb21wb25lbnQgfSBmcm9tICcuL0Rhc2hib2FyZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50JztcclxuXHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuXHJcbiAgICB7IHBhdGg6ICcnLCBjb21wb25lbnQ6IEFwcERhc2hiYW9yZENvbXBvbmVudCB9LFxyXG5cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwRGFzaGJhb3JkQ29tcG9uZW50LFxyXG4gIFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcERhc2hiYW9yZE1vZHVsZSB7IH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGVyLWxvYWRlci9zcmMhLi9ub2RlX21vZHVsZXMvYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvRGFzaGJvYXJkL0FwcERhc2hiYW9yZC5tb2R1bGUudHMiLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5cclxuaW1wb3J0IHsgQ29sb3JzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb2xvcnMvY29sb3JzLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ0FwcERhc2hiYW9yZCcsXHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9BcHBEYXNoYmFvcmQuY29tcG9uZW50Lmh0bWwnKSxcclxuICAgIHN0eWxlczogW3JlcXVpcmUoJy4vQXBwRGFzaGJhb3JkLmNvbXBvbmVudC5zY3NzJyldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBEYXNoYmFvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHNwYXJrVmFsdWVzID0gWzEsMyw0LDcsNSw5LDQsNCw3LDUsOSw2LDRdO1xyXG5cclxuICAgIGVhc3lQaWVQZXJjZW50OiBudW1iZXIgPSA3MDtcclxuICAgIHBpZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgYW5pbWF0ZToge1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogODAwLFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiYXJDb2xvcjogdGhpcy5jb2xvcnMuYnlOYW1lKCdpbmZvJyksXHJcbiAgICAgICAgdHJhY2tDb2xvcjogJ3JnYmEoMjAwLDIwMCwyMDAsMC40KScsXHJcbiAgICAgICAgc2NhbGVDb2xvcjogZmFsc2UsXHJcbiAgICAgICAgbGluZVdpZHRoOiAxMCxcclxuICAgICAgICBsaW5lQ2FwOiAncm91bmQnLFxyXG4gICAgICAgIHNpemU6IDE0NVxyXG4gICAgfTtcclxuXHJcbiAgICBzcGFya09wdGlvbnMxID0ge1xyXG4gICAgICAgIGJhckNvbG9yOiB0aGlzLmNvbG9ycy5ieU5hbWUoJ2luZm8nKSxcclxuICAgICAgICBoZWlnaHQ6IDMwLFxyXG4gICAgICAgIGJhcldpZHRoOiAnNScsXHJcbiAgICAgICAgYmFyU3BhY2luZzogJzInXHJcbiAgICB9O1xyXG5cclxuICAgIHNwYXJrT3B0aW9uczIgPSB7XHJcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgIGhlaWdodDogODAsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBsaW5lV2lkdGg6IDIsXHJcbiAgICAgICAgbGluZUNvbG9yOiB0aGlzLmNvbG9ycy5ieU5hbWUoJ3B1cnBsZScpLFxyXG4gICAgICAgIHNwb3RDb2xvcjogJyM4ODgnLFxyXG4gICAgICAgIG1pblNwb3RDb2xvcjogdGhpcy5jb2xvcnMuYnlOYW1lKCdwdXJwbGUnKSxcclxuICAgICAgICBtYXhTcG90Q29sb3I6IHRoaXMuY29sb3JzLmJ5TmFtZSgncHVycGxlJyksXHJcbiAgICAgICAgZmlsbENvbG9yOiAnJyxcclxuICAgICAgICBoaWdobGlnaHRMaW5lQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICBzcG90UmFkaXVzOiAzLFxyXG4gICAgICAgIHJlc2l6ZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzcGxpbmVIZWlnaHQgPSAyODA7XHJcbiAgICBzcGxpbmVEYXRhOiBhbnk7XHJcbiAgICBzcGxpbmVPcHRpb25zID0ge1xyXG4gICAgICAgIHNlcmllczoge1xyXG4gICAgICAgICAgICBsaW5lczoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiA0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNwbGluZXM6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW5zaW9uOiAwLjQsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDEsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAwLjVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJyNlZWUnLFxyXG4gICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcclxuICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmNmY2ZjJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwT3B0czoge1xyXG4gICAgICAgICAgICBjb250ZW50OiAobGFiZWwsIHgsIHkpID0+IHsgcmV0dXJuIHggKyAnIDogJyArIHk7IH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHhheGlzOiB7XHJcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJyNmY2ZjZmMnLFxyXG4gICAgICAgICAgICBtb2RlOiAnY2F0ZWdvcmllcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlheGlzOiB7XHJcbiAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgbWF4OiAxNTAsIC8vIG9wdGlvbmFsOiB1c2UgaXQgZm9yIGEgY2xlYXIgcmVwcmVzZXRhdGlvblxyXG4gICAgICAgICAgICB0aWNrQ29sb3I6ICcjZWVlJyxcclxuICAgICAgICAgICAgLy8gcG9zaXRpb246ICgkc2NvcGUuYXBwLmxheW91dC5pc1JUTCA/ICdyaWdodCcgOiAnbGVmdCcpLFxyXG4gICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHYvKiArICcgdmlzaXRvcnMnKi87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoYWRvd1NpemU6IDBcclxuICAgIH07XHJcbiAgICAvLyBCQVJcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBiYXJEYXRhOiBhbnk7XHJcbiAgICBiYXJPcHRpb25zID0ge1xyXG4gICAgICAgIHNlcmllczoge1xyXG4gICAgICAgICAgICBiYXJzOiB7XHJcbiAgICAgICAgICAgICAgICBhbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYmFyV2lkdGg6IDAuNixcclxuICAgICAgICAgICAgICAgIGZpbGw6IDAuOVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2VlZScsXHJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxyXG4gICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmY2ZjZmMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXBPcHRzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uIChsYWJlbCwgeCwgeSkgeyByZXR1cm4geCArICcgOiAnICsgeTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeGF4aXM6IHtcclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2ZjZmNmYycsXHJcbiAgICAgICAgICAgIG1vZGU6ICdjYXRlZ29yaWVzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWF4aXM6IHtcclxuICAgICAgICAgICAgLy8gcG9zaXRpb246ICgkc2NvcGUuYXBwLmxheW91dC5pc1JUTCA/ICdyaWdodCcgOiAnbGVmdCcpLFxyXG4gICAgICAgICAgICB0aWNrQ29sb3I6ICcjZWVlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hhZG93U2l6ZTogMFxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbG9yczogQ29sb3JzU2VydmljZSwgcHVibGljIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgICAgICBodHRwLmdldCgnYXNzZXRzL3NlcnZlci9jaGFydC9zcGxpbmUuanNvbicpLnN1YnNjcmliZShkYXRhID0+IHRoaXMuc3BsaW5lRGF0YSA9IGRhdGEpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2hhcnREYXRhKCdhc3NldHMvc2VydmVyL2NoYXJ0L2Jhci5qc29uJykuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5iYXJEYXRhID0gZGF0YSk7XHJcblxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgICBnZXRDaGFydERhdGEodXJsKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbG9yQnlOYW1lKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xvcnMuYnlOYW1lKG5hbWUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZXItbG9hZGVyL3NyYyEuL25vZGVfbW9kdWxlcy9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9EYXNoYm9hcmQvRGFzaGJvYXJkL0FwcERhc2hiYW9yZC5jb21wb25lbnQudHMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiXFxyXFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyIGNvbnRlbnQtaGVhZGluZyBcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiIGNvbC1tZC02IHB1bGwtbGVmdFxcXCI+XFxyXFxuICAgICAgICAgICAgRGFzaGJhb3JkXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIiBjb2wtbWQtMyAgcHVsbC1yaWdodFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYSBtcy1QZXJzb25hLS14c1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlcnNvbmEtaW1hZ2VBcmVhXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcIm1zLVBlcnNvbmEtaW1hZ2VcXFwiIHNyYz1cXFwiYXNzZXRzL2ltZy91c2VyLzAxLmpwZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcblxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZXJzb25hLWRldGFpbHNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1wcmltYXJ5VGV4dFxcXCI+VGFrZXJ1IGlzIHlvdXIgbWFuYWdlcjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgIFxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTIgbXQzMFxcXCI+XFxyXFxuICAgICAgICA8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgdHlwZT1cXFwiZGF0ZVxcXCIgZm9ybUNvbnRyb2xOYW1lPVxcXCJkYXRlXFxcIiAvPlxcclxcbiAgICAgICAgXFxyXFxuXFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcbjwhLS0gU1RBUlQgd2lkZ2V0cyBib3gtLT5cXHJcXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMyBjb2wtc20tNlxcXCI+XFxyXFxuICAgICAgICA8IS0tIFNUQVJUIHdpZGdldC0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgd2lkZ2V0IFdoaXRlQkdcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBwdi1sZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCIgbXQwIGJvdHRvbUJvcmRlclxcXCI+WWVzdGVyZGF5IDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaDEgbXQwIHB0MTBcXFwiPjhoIDAwbSA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIlxcXCI+R29hbCAgOiAgOCBocnM8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBoIHB0MTAgbXQzMCBjb2wtbWQtNlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHByb2dyZXNzYmFyIGNsYXNzPVxcXCJtMCBwcm9ncmVzcy14c1xcXCIgdmFsdWU9XFxcIjEwMFxcXCIgdHlwZT1cXFwic3VjY2Vzc1xcXCI+MTAwJTwvcHJvZ3Jlc3NiYXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcIkdyZWVuRm9udFxcXCI+IE9uVGltZSAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMyBjb2wtc20tNlxcXCI+XFxyXFxuICAgICAgICA8IS0tIFNUQVJUIHdpZGdldC0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgd2lkZ2V0IFdoaXRlQkdcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBwdi1sZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCIgbXQwIGJvdHRvbUJvcmRlclxcXCI+TGFzdCBXZWVrICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImgxIG10MCBwdDEwXFxcIj40MGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJzdWNjZXNzXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiR3JlZW5Gb250XFxcIj4gT25UaW1lICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5UaGlzIE1vbnRoICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImgxIG10MCBwdDEwXFxcIj4yMDBoIDAwbSA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIlxcXCI+R29hbCAgOiAgOCBocnM8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBoIHB0MTAgbXQzMCBjb2wtbWQtNlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHByb2dyZXNzYmFyIGNsYXNzPVxcXCJtMCBwcm9ncmVzcy14c1xcXCIgdmFsdWU9XFxcIjEwMFxcXCIgdHlwZT1cXFwiZGFuZ2VyXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiUmVkZm9udFxcXCI+IE92ZXIgV29ya2VkICAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMyBjb2wtc20tNlxcXCI+XFxyXFxuICAgICAgICA8IS0tIFNUQVJUIHdpZGdldC0tPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgd2lkZ2V0IFdoaXRlQkdcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBwdi1sZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCIgbXQwIGJvdHRvbUJvcmRlclxcXCI+TGFzdCBNb250aCAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoMSBtdDAgcHQxMFxcXCI+MjQwaCAwMG0gPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJcXFwiPkdvYWwgIDogIDggaHJzPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwaCBwdDEwIG10MzAgY29sLW1kLTZcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcm9ncmVzc2JhciBjbGFzcz1cXFwibTAgcHJvZ3Jlc3MteHNcXFwiIHZhbHVlPVxcXCIxMDBcXFwiIHR5cGU9XFxcImRhbmdlclxcXCI+MTAwJTwvcHJvZ3Jlc3NiYXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcIlJlZGZvbnRcXFwiPiBPblRpbWUgIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctMTIgXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIFdoaXRlQkcgY29sLW1kLTEyIFxcXCIgaWQ9XFxcInBhbmVsQ2hhcnQyXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLXRpdGxlXFxcIj5MYXN0IE1vbnRoIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtd3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGZsb3QgW2RhdGFzZXRdPVxcXCJiYXJEYXRhXFxcIiBbb3B0aW9uc109XFxcImJhck9wdGlvbnNcXFwiIGhlaWdodD1cXFwiMzAwXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8aHIgLz5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTIgbXQzMCBwYjMwXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtM1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+TWVldGluZyBIb3VycyA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtMCB0ZXh0LXByaW1hcnlcXFwiPjBoIDQ1bTwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5FbWFpbCBIb3VyczwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm0wIHRleHQtcHJpbWFyeVxcXCI+IDBoIDA1bTwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5PdGhlciBXb3JrIFRpbWU8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtMCB0ZXh0LXByaW1hcnlcXFwiPjdoIDAwbTwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5PdmVydGltZSA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtMCB0ZXh0LXByaW1hcnlcXFwiPjFoIDAwbTwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyIHBiMzAgIFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVxcXCJtcy1CdXR0b24gbXMtQnV0dG9uLS1wcmltYXJ5IGZsb2F0UmlnaHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIm1zLUJ1dHRvbi1sYWJlbFxcXCI+U3VibWl0dDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIFxcclxcblxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgXFxyXFxuPC9kaXY+XFxyXFxuPCEtLSBFTkQgd2lkZ2V0cyBib3gtLT5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvRGFzaGJvYXJkL0Rhc2hib2FyZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDg3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9EYXNoYm9hcmQvRGFzaGJvYXJkL0FwcERhc2hiYW9yZC5jb21wb25lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gODc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiXSwic291cmNlUm9vdCI6IiJ9