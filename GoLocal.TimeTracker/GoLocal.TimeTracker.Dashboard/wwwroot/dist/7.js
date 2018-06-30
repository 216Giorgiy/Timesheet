webpackJsonp([7],{

/***/ 821:
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
var AppDashbaord_component_1 = __webpack_require__(916);
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

/***/ 916:
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
            template: __webpack_require__(917),
            styles: [__webpack_require__(918)]
        }),
        __metadata("design:paramtypes", [colors_service_1.ColorsService, http_1.HttpClient])
    ], AppDashbaordComponent);
    return AppDashbaordComponent;
}());
exports.AppDashbaordComponent = AppDashbaordComponent;


/***/ }),

/***/ 917:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col-md-12 content-heading \">\r\n        <div class=\" col-md-6 pull-left\">\r\n            Dashbaord\r\n        </div>\r\n        <div class=\" col-md-3  pull-right\">\r\n            <div class=\"ms-Persona ms-Persona--xs\">\r\n                <div class=\"ms-Persona-imageArea\">\r\n                    <img class=\"ms-Persona-image\" src=\"assets/img/user/01.jpg\">\r\n                </div>\r\n\r\n\r\n                <div class=\"ms-Persona-details\">\r\n                    <div class=\"ms-Persona-primaryText\">Takeru is your manager</div>\r\n                    <div class=\"row\">\r\n                       \r\n    <div class=\"col-md-12 mt30\">\r\n        <input class=\"form-control\" type=\"date\" formControlName=\"date\" />\r\n        \r\n\r\n    </div>\r\n       \r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- START widgets box-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Yesterday </div>\r\n                    <div class=\"h1 mt0 pt10\">8h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Last Week  </div>\r\n                    <div class=\"h1 mt0 pt10\">40h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">This Month  </div>\r\n                    <div class=\"h1 mt0 pt10\">200h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"danger\">100%</progressbar>\r\n                        <p class=\"Redfont\"> Over Worked   </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Last Month  </div>\r\n                    <div class=\"h1 mt0 pt10\">240h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"danger\">100%</progressbar>\r\n                        <p class=\"Redfont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 \">\r\n        <div class=\"panel WhiteBG col-md-12 \" id=\"panelChart2\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"panel-title\">Last Month </div>\r\n                </div>\r\n                <div class=\"panel-wrapper\">\r\n                    <div class=\"panel-body\">\r\n                        <div flot [dataset]=\"barData\" [options]=\"barOptions\" height=\"300\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <hr />\r\n            <div class=\"col-md-12 mt30 pb30\">\r\n\r\n                <div class=\"row \">\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Meeting Hours </p>\r\n                        <h3 class=\"m0 text-primary\">0h 45m</h3>\r\n                    </div>\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Email Hours</p>\r\n                        <h3 class=\"m0 text-primary\"> 0h 05m</h3>\r\n                    </div>\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Other Work Time</p>\r\n                        <h3 class=\"m0 text-primary\">7h 00m</h3>\r\n                    </div>\r\n\r\n                    <div class=\"col-xs-3\">\r\n                        <p>Overtime </p>\r\n                        <h3 class=\"m0 text-primary\">1h 00m</h3>\r\n                    </div>\r\n                </div>\r\n\r\n\r\n            </div>\r\n            <div class=\"col-md-12 pb30  \">\r\n                \r\n                <button class=\"ms-Button ms-Button--primary floatRight\">\r\n                    <span class=\"ms-Button-label\">Submitt</span>\r\n                </button>\r\n\r\n            </div>\r\n        </div>\r\n        \r\n\r\n    </div>\r\n    \r\n</div>\r\n<!-- END widgets box-->\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 918:
/***/ (function(module, exports) {

module.exports = ""

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBeUM7QUFDekMsdUNBQXVEO0FBQ3ZELDhDQUEwRDtBQUUxRCx3REFBOEU7QUFHOUUsSUFBTSxNQUFNLEdBQVc7SUFFbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSw4Q0FBcUIsRUFBRTtDQUVqRCxDQUFDO0FBZUY7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQWI5QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsNEJBQVk7Z0JBQ1oscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2FBQ2hDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDhDQUFxQjthQUV4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxxQkFBWTthQUNmO1NBQ0osQ0FBQztPQUNXLGtCQUFrQixDQUFJO0lBQUQseUJBQUM7Q0FBQTtBQUF0QixnREFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUIvQixvQ0FBa0Q7QUFDbEQsc0NBQWtEO0FBR2xELGdEQUFzRTtBQU90RTtJQXNISSwrQkFBbUIsTUFBcUIsRUFBUyxJQUFnQjtRQUFqRSxpQkFLQztRQUxrQixXQUFNLEdB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LDJDQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFySVEscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsbUJBQU8sQ0FBQyxHQUErQixDQUFDO1lBQ2xELE1BQU0sRUFBRSxDQUFDLG1CQUFPLENBQUMsR0FBK0IsQ0FBQyxDQUFDO1NBQ3JELENBQUM7eUNBdUg2Qiw4QkFBYSxFQUFlLGlCQUFVO09BdEh4RCxxQkFBcUIsQ0F1SWpDO0lBQUQsNEJBQUM7Q0FBQTtBQXZJWSxzREFBcUI7Ozs7Ozs7O0FDWGxDLGc3TDs7Ozs7OztBQ0FBLG1CIiwiZmlsZSI6IjcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IEFwcERhc2hiYW9yZENvbXBvbmVudCB9IGZyb20gJy4vQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5jb21wb25lbnQnO1xyXG5cclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG5cclxuICAgIHsgcGF0aDogJycsIGNvbXBvbmVudDogQXBwRGFzaGJhb3JkQ29tcG9uZW50IH0sXHJcblxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBEYXNoYmFvcmRDb21wb25lbnQsXHJcbiAgXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIFJvdXRlck1vZHVsZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwRGFzaGJhb3JkTW9kdWxlIHsgfVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZXItbG9hZGVyL3NyYyEuL25vZGVfbW9kdWxlcy9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkLm1vZHVsZS50cyIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcblxyXG5pbXBvcnQgeyBDb2xvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2NvbG9ycy9jb2xvcnMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnQXBwRGFzaGJhb3JkJyxcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL0FwcERhc2hiYW9yZC5jb21wb25lbnQuaHRtbCcpLFxyXG4gICAgc3R5bGVzOiBbcmVxdWlyZSgnLi9BcHBEYXNoYmFvcmQuY29tcG9uZW50LnNjc3MnKV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcERhc2hiYW9yZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgc3BhcmtWYWx1ZXMgPSBbMSwzLDQsNyw1LDksNCw0LDcsNSw5LDYsNF07XHJcblxyXG4gICAgZWFzeVBpZVBlcmNlbnQ6IG51bWJlciA9IDcwO1xyXG4gICAgcGllT3B0aW9ucyA9IHtcclxuICAgICAgICBhbmltYXRlOiB7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA4MDAsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJhckNvbG9yOiB0aGlzLmNvbG9ycy5ieU5hbWUoJ2luZm8nKSxcclxuICAgICAgICB0cmFja0NvbG9yOiAncmdiYSgyMDAsMjAwLDIwMCwwLjQpJyxcclxuICAgICAgICBzY2FsZUNvbG9yOiBmYWxzZSxcclxuICAgICAgICBsaW5lV2lkdGg6IDEwLFxyXG4gICAgICAgIGxpbmVDYXA6ICdyb3VuZCcsXHJcbiAgICAgICAgc2l6ZTogMTQ1XHJcbiAgICB9O1xyXG5cclxuICAgIHNwYXJrT3B0aW9uczEgPSB7XHJcbiAgICAgICAgYmFyQ29sb3I6IHRoaXMuY29sb3JzLmJ5TmFtZSgnaW5mbycpLFxyXG4gICAgICAgIGhlaWdodDogMzAsXHJcbiAgICAgICAgYmFyV2lkdGg6ICc1JyxcclxuICAgICAgICBiYXJTcGFjaW5nOiAnMidcclxuICAgIH07XHJcblxyXG4gICAgc3BhcmtPcHRpb25zMiA9IHtcclxuICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgaGVpZ2h0OiA4MCxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGxpbmVXaWR0aDogMixcclxuICAgICAgICBsaW5lQ29sb3I6IHRoaXMuY29sb3JzLmJ5TmFtZSgncHVycGxlJyksXHJcbiAgICAgICAgc3BvdENvbG9yOiAnIzg4OCcsXHJcbiAgICAgICAgbWluU3BvdENvbG9yOiB0aGlzLmNvbG9ycy5ieU5hbWUoJ3B1cnBsZScpLFxyXG4gICAgICAgIG1heFNwb3RDb2xvcjogdGhpcy5jb2xvcnMuYnlOYW1lKCdwdXJwbGUnKSxcclxuICAgICAgICBmaWxsQ29sb3I6ICcnLFxyXG4gICAgICAgIGhpZ2hsaWdodExpbmVDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgIHNwb3RSYWRpdXM6IDMsXHJcbiAgICAgICAgcmVzaXplOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHNwbGluZUhlaWdodCA9IDI4MDtcclxuICAgIHNwbGluZURhdGE6IGFueTtcclxuICAgIHNwbGluZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgc2VyaWVzOiB7XHJcbiAgICAgICAgICAgIGxpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3BsaW5lczoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbnNpb246IDAuNCxcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGZpbGw6IDAuNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2VlZScsXHJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxyXG4gICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmY2ZjZmMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXBPcHRzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IChsYWJlbCwgeCwgeSkgPT4geyByZXR1cm4geCArICcgOiAnICsgeTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeGF4aXM6IHtcclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2ZjZmNmYycsXHJcbiAgICAgICAgICAgIG1vZGU6ICdjYXRlZ29yaWVzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWF4aXM6IHtcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDE1MCwgLy8gb3B0aW9uYWw6IHVzZSBpdCBmb3IgYSBjbGVhciByZXByZXNldGF0aW9uXHJcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZWUnLFxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbjogKCRzY29wZS5hcHAubGF5b3V0LmlzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0JyksXHJcbiAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdi8qICsgJyB2aXNpdG9ycycqLztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hhZG93U2l6ZTogMFxyXG4gICAgfTtcclxuICAgIC8vIEJBUlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGJhckRhdGE6IGFueTtcclxuICAgIGJhck9wdGlvbnMgPSB7XHJcbiAgICAgICAgc2VyaWVzOiB7XHJcbiAgICAgICAgICAgIGJhcnM6IHtcclxuICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMCxcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBiYXJXaWR0aDogMC42LFxyXG4gICAgICAgICAgICAgICAgZmlsbDogMC45XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjZWVlJyxcclxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZjZmNmYydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcE9wdHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24gKGxhYmVsLCB4LCB5KSB7IHJldHVybiB4ICsgJyA6ICcgKyB5OyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB4YXhpczoge1xyXG4gICAgICAgICAgICB0aWNrQ29sb3I6ICcjZmNmY2ZjJyxcclxuICAgICAgICAgICAgbW9kZTogJ2NhdGVnb3JpZXMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YXhpczoge1xyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbjogKCRzY29wZS5hcHAubGF5b3V0LmlzUlRMID8gJ3JpZ2h0JyA6ICdsZWZ0JyksXHJcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFkb3dTaXplOiAwXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sb3JzOiBDb2xvcnNTZXJ2aWNlLCBwdWJsaWMgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIGh0dHAuZ2V0KCdhc3NldHMvc2VydmVyL2NoYXJ0L3NwbGluZS5qc29uJykuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5zcGxpbmVEYXRhID0gZGF0YSk7XHJcbiAgICAgICAgdGhpcy5nZXRDaGFydERhdGEoJ2Fzc2V0cy9zZXJ2ZXIvY2hhcnQvYmFyLmpzb24nKS5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLmJhckRhdGEgPSBkYXRhKTtcclxuXHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICAgIGdldENoYXJ0RGF0YSh1cmwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29sb3JCeU5hbWUobmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbG9ycy5ieU5hbWUobmFtZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJvdXRlci1sb2FkZXIvc3JjIS4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyLXRlbXBsYXRlLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvcm91dGVzL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkLmNvbXBvbmVudC50cyIsIm1vZHVsZS5leHBvcnRzID0gXCJcXHJcXG48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTIgY29udGVudC1oZWFkaW5nIFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCIgY29sLW1kLTYgcHVsbC1sZWZ0XFxcIj5cXHJcXG4gICAgICAgICAgICBEYXNoYmFvcmRcXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiIGNvbC1tZC0zICBwdWxsLXJpZ2h0XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZXJzb25hIG1zLVBlcnNvbmEtLXhzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZUFyZWFcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZVxcXCIgc3JjPVxcXCJhc3NldHMvaW1nL3VzZXIvMDEuanBnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlcnNvbmEtZGV0YWlsc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZXJzb25hLXByaW1hcnlUZXh0XFxcIj5UYWtlcnUgaXMgeW91ciBtYW5hZ2VyPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMiBtdDMwXFxcIj5cXHJcXG4gICAgICAgIDxpbnB1dCBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiB0eXBlPVxcXCJkYXRlXFxcIiBmb3JtQ29udHJvbE5hbWU9XFxcImRhdGVcXFwiIC8+XFxyXFxuICAgICAgICBcXHJcXG5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPCEtLSBTVEFSVCB3aWRnZXRzIGJveC0tPlxcclxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5ZZXN0ZXJkYXkgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoMSBtdDAgcHQxMFxcXCI+OGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJzdWNjZXNzXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiR3JlZW5Gb250XFxcIj4gT25UaW1lICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5MYXN0IFdlZWsgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaDEgbXQwIHB0MTBcXFwiPjQwaCAwMG0gPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJcXFwiPkdvYWwgIDogIDggaHJzPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwaCBwdDEwIG10MzAgY29sLW1kLTZcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwcm9ncmVzc2JhciBjbGFzcz1cXFwibTAgcHJvZ3Jlc3MteHNcXFwiIHZhbHVlPVxcXCIxMDBcXFwiIHR5cGU9XFxcInN1Y2Nlc3NcXFwiPjEwMCU8L3Byb2dyZXNzYmFyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJHcmVlbkZvbnRcXFwiPiBPblRpbWUgIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLWxnLTMgY29sLXNtLTZcXFwiPlxcclxcbiAgICAgICAgPCEtLSBTVEFSVCB3aWRnZXQtLT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIHdpZGdldCBXaGl0ZUJHXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTJcXFwiPlxcclxcblxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCIgcHYtbGdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIG10MCBib3R0b21Cb3JkZXJcXFwiPlRoaXMgTW9udGggIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaDEgbXQwIHB0MTBcXFwiPjIwMGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJkYW5nZXJcXFwiPjEwMCU8L3Byb2dyZXNzYmFyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJSZWRmb250XFxcIj4gT3ZlciBXb3JrZWQgICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5MYXN0IE1vbnRoICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImgxIG10MCBwdDEwXFxcIj4yNDBoIDAwbSA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIlxcXCI+R29hbCAgOiAgOCBocnM8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBoIHB0MTAgbXQzMCBjb2wtbWQtNlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPHByb2dyZXNzYmFyIGNsYXNzPVxcXCJtMCBwcm9ncmVzcy14c1xcXCIgdmFsdWU9XFxcIjEwMFxcXCIgdHlwZT1cXFwiZGFuZ2VyXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiUmVkZm9udFxcXCI+IE9uVGltZSAgPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlxcclxcblxcclxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0xMiBcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwgV2hpdGVCRyBjb2wtbWQtMTIgXFxcIiBpZD1cXFwicGFuZWxDaGFydDJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtdGl0bGVcXFwiPkxhc3QgTW9udGggPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZmxvdCBbZGF0YXNldF09XFxcImJhckRhdGFcXFwiIFtvcHRpb25zXT1cXFwiYmFyT3B0aW9uc1xcXCIgaGVpZ2h0PVxcXCIzMDBcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxociAvPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMiBtdDMwIHBiMzBcXFwiPlxcclxcblxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3cgXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5NZWV0aW5nIEhvdXJzIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm0wIHRleHQtcHJpbWFyeVxcXCI+MGggNDVtPC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkVtYWlsIEhvdXJzPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cXFwibTAgdGV4dC1wcmltYXJ5XFxcIj4gMGggMDVtPC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPk90aGVyIFdvcmsgVGltZTwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm0wIHRleHQtcHJpbWFyeVxcXCI+N2ggMDBtPC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPk92ZXJ0aW1lIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm0wIHRleHQtcHJpbWFyeVxcXCI+MWggMDBtPC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbWQtMTIgcGIzMCAgXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcIm1zLUJ1dHRvbiBtcy1CdXR0b24tLXByaW1hcnkgZmxvYXRSaWdodFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibXMtQnV0dG9uLWxhYmVsXFxcIj5TdWJtaXR0PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXHJcXG5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgXFxyXFxuXFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICBcXHJcXG48L2Rpdj5cXHJcXG48IS0tIEVORCB3aWRnZXRzIGJveC0tPlxcclxcblxcclxcblxcclxcblxcclxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gOTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gNyIsIm1vZHVsZS5leHBvcnRzID0gXCJcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDkxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDciXSwic291cmNlUm9vdCI6IiJ9