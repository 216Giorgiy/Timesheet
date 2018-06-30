webpackJsonp([31],{

/***/ 1378:
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
var http_1 = __webpack_require__(483);
var colors_service_1 = __webpack_require__(484);
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
            template: __webpack_require__(1379),
            styles: [__webpack_require__(1380)]
        }),
        __metadata("design:paramtypes", [colors_service_1.ColorsService, http_1.HttpClient])
    ], AppDashbaordComponent);
    return AppDashbaordComponent;
}());
exports.AppDashbaordComponent = AppDashbaordComponent;


/***/ }),

/***/ 1379:
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col-md-12 content-heading \">\r\n        <div class=\" col-md-6 pull-left\">\r\n            New Dashbaord\r\n        </div>\r\n        <div class=\" col-md-3  pull-right\">\r\n            <div class=\"ms-Persona ms-Persona--xs\">\r\n                <div class=\"ms-Persona-imageArea\">\r\n                    <img class=\"ms-Persona-image\" src=\"assets/img/user/01.jpg\">\r\n                </div>\r\n\r\n\r\n                <div class=\"ms-Persona-details\">\r\n                    <div class=\"ms-Persona-primaryText\">Takeru is your manager</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- START widgets box-->\r\n<div class=\"row\">\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Yesterday </div>\r\n                    <div class=\"h1 mt0 pt10\">8h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Yesterday </div>\r\n                    <div class=\"h1 mt0 pt10\">8h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Yesterday </div>\r\n                    <div class=\"h1 mt0 pt10\">8h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-lg-3 col-sm-6\">\r\n        <!-- START widget-->\r\n        <div class=\"panel widget WhiteBG\">\r\n            <div class=\"col-md-12\">\r\n\r\n                <div class=\" pv-lg\">\r\n                    <div class=\" mt0 bottomBorder\">Yesterday </div>\r\n                    <div class=\"h1 mt0 pt10\">8h 00m </div>\r\n                    <div class=\"\">Goal  :  8 hrs</div>\r\n                    <div class=\"ph pt10 mt30 col-md-6\">\r\n                        <progressbar class=\"m0 progress-xs\" value=\"100\" type=\"success\">100%</progressbar>\r\n                        <p class=\"GreenFont\"> OnTime  </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n    <div class=\"col-lg-12 \">\r\n        <div class=\"panel WhiteBG col-md-12 \" id=\"panelChart2\">\r\n            <div class=\"col-md-12\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"panel-title\">Last Month </div>\r\n                </div>\r\n                <div class=\"panel-wrapper\">\r\n                    <div class=\"panel-body\">\r\n                        <div flot [dataset]=\"barData\" [options]=\"barOptions\" height=\"300\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <hr />\r\n                <div class=\"col-md-12 mt30 pb30\">\r\n\r\n                    <div class=\"row \">\r\n                        <div class=\"col-xs-3\">\r\n                            <p>Meeting Hours </p>\r\n                            <h3 class=\"m0 text-primary\">0h 45m</h3>\r\n                        </div>\r\n                        <div class=\"col-xs-3\">\r\n                            <p>Email Hours</p>\r\n                            <h3 class=\"m0 text-primary\"> 0h 05m</h3>\r\n                        </div>\r\n                        <div class=\"col-xs-3\">\r\n                            <p>Other Work Time</p>\r\n                            <h3 class=\"m0 text-primary\">7h 00m</h3>\r\n                        </div>\r\n\r\n                        <div class=\"col-xs-3\">\r\n                            <p>Overtime </p>\r\n                            <h3 class=\"m0 text-primary\">1h 00m</h3>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n</div>\r\n<!-- END widgets box-->\r\n\r\n\r\n\r\n"

/***/ }),

/***/ 1380:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 997:
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
var router_1 = __webpack_require__(62);
var shared_module_1 = __webpack_require__(83);
var AppDashbaord_component_1 = __webpack_require__(1378);
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


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQ0FBa0Q7QUFDbEQsc0NBQWtEO0FBR2xELGdEQUFzRTtBQU90RTtJQXNISSwrQkFBbUIsTUFBcUIsRUFBUyxJQUFnQjtRQUFqRSxpQkFLQztRQUxrQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQXBIakUsZ0JBQVcsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBQzVCLGVBQVUsR0FBRztZQUNULE9BQU8sRUFBRTtnQkFDTCxRQUFRLEVBQUUsR0FBRztnQkFDYixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEMsVUFBVSxFQUFFLHVCQUF1QjtZQUNuQyxVQUFVLEVBQUUs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MEQ7QUFFMUQseURBQThFO0FBRzlFLElBQU0sTUFBTSxHQUFXO0lBRW5CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsOENBQXFCLEVBQUU7Q0FFakQsQ0FBQztBQWVGO0lBQUE7SUFBa0MsQ0FBQztJQUF0QixrQkFBa0I7UUFiOUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLDRCQUFZO2dCQUNaLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUNoQztZQUNELFlBQVksRUFBRTtnQkFDViw4Q0FBcUI7YUFFeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wscUJBQVk7YUFDZjtTQUNKLENBQUM7T0FDVyxrQkFBa0IsQ0FBSTtJQUFELHlCQUFDO0NBQUE7QUFBdEIsZ0RBQWtCIiwiZmlsZSI6IjMxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuXHJcbmltcG9ydCB7IENvbG9yc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvY29sb3JzL2NvbG9ycy5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdBcHBEYXNoYmFvcmQnLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vQXBwRGFzaGJhb3JkLmNvbXBvbmVudC5odG1sJyksXHJcbiAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL0FwcERhc2hiYW9yZC5jb21wb25lbnQuc2NzcycpXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwRGFzaGJhb3JkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBzcGFya1ZhbHVlcyA9IFsxLDMsNCw3LDUsOSw0LDQsNyw1LDksNiw0XTtcclxuXHJcbiAgICBlYXN5UGllUGVyY2VudDogbnVtYmVyID0gNzA7XHJcbiAgICBwaWVPcHRpb25zID0ge1xyXG4gICAgICAgIGFuaW1hdGU6IHtcclxuICAgICAgICAgICAgZHVyYXRpb246IDgwMCxcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFyQ29sb3I6IHRoaXMuY29sb3JzLmJ5TmFtZSgnaW5mbycpLFxyXG4gICAgICAgIHRyYWNrQ29sb3I6ICdyZ2JhKDIwMCwyMDAsMjAwLDAuNCknLFxyXG4gICAgICAgIHNjYWxlQ29sb3I6IGZhbHNlLFxyXG4gICAgICAgIGxpbmVXaWR0aDogMTAsXHJcbiAgICAgICAgbGluZUNhcDogJ3JvdW5kJyxcclxuICAgICAgICBzaXplOiAxNDVcclxuICAgIH07XHJcblxyXG4gICAgc3BhcmtPcHRpb25zMSA9IHtcclxuICAgICAgICBiYXJDb2xvcjogdGhpcy5jb2xvcnMuYnlOYW1lKCdpbmZvJyksXHJcbiAgICAgICAgaGVpZ2h0OiAzMCxcclxuICAgICAgICBiYXJXaWR0aDogJzUnLFxyXG4gICAgICAgIGJhclNwYWNpbmc6ICcyJ1xyXG4gICAgfTtcclxuXHJcbiAgICBzcGFya09wdGlvbnMyID0ge1xyXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcclxuICAgICAgICBoZWlnaHQ6IDgwLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgbGluZVdpZHRoOiAyLFxyXG4gICAgICAgIGxpbmVDb2xvcjogdGhpcy5jb2xvcnMuYnlOYW1lKCdwdXJwbGUnKSxcclxuICAgICAgICBzcG90Q29sb3I6ICcjODg4JyxcclxuICAgICAgICBtaW5TcG90Q29sb3I6IHRoaXMuY29sb3JzLmJ5TmFtZSgncHVycGxlJyksXHJcbiAgICAgICAgbWF4U3BvdENvbG9yOiB0aGlzLmNvbG9ycy5ieU5hbWUoJ3B1cnBsZScpLFxyXG4gICAgICAgIGZpbGxDb2xvcjogJycsXHJcbiAgICAgICAgaGlnaGxpZ2h0TGluZUNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgc3BvdFJhZGl1czogMyxcclxuICAgICAgICByZXNpemU6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgc3BsaW5lSGVpZ2h0ID0gMjgwO1xyXG4gICAgc3BsaW5lRGF0YTogYW55O1xyXG4gICAgc3BsaW5lT3B0aW9ucyA9IHtcclxuICAgICAgICBzZXJpZXM6IHtcclxuICAgICAgICAgICAgbGluZXM6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBvaW50czoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJhZGl1czogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzcGxpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVuc2lvbjogMC40LFxyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogMC41XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjZWVlJyxcclxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZjZmNmYydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcE9wdHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogKGxhYmVsLCB4LCB5KSA9PiB7IHJldHVybiB4ICsgJyA6ICcgKyB5OyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB4YXhpczoge1xyXG4gICAgICAgICAgICB0aWNrQ29sb3I6ICcjZmNmY2ZjJyxcclxuICAgICAgICAgICAgbW9kZTogJ2NhdGVnb3JpZXMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YXhpczoge1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMTUwLCAvLyBvcHRpb25hbDogdXNlIGl0IGZvciBhIGNsZWFyIHJlcHJlc2V0YXRpb25cclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VlZScsXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uOiAoJHNjb3BlLmFwcC5sYXlvdXQuaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnKSxcclxuICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2LyogKyAnIHZpc2l0b3JzJyovO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFkb3dTaXplOiAwXHJcbiAgICB9O1xyXG4gICAgLy8gQkFSXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgYmFyRGF0YTogYW55O1xyXG4gICAgYmFyT3B0aW9ucyA9IHtcclxuICAgICAgICBzZXJpZXM6IHtcclxuICAgICAgICAgICAgYmFyczoge1xyXG4gICAgICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJhcldpZHRoOiAwLjYsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiAwLjlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJyNlZWUnLFxyXG4gICAgICAgICAgICBib3JkZXJXaWR0aDogMSxcclxuICAgICAgICAgICAgaG92ZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmNmY2ZjJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9vbHRpcDogdHJ1ZSxcclxuICAgICAgICB0b29sdGlwT3B0czoge1xyXG4gICAgICAgICAgICBjb250ZW50OiBmdW5jdGlvbiAobGFiZWwsIHgsIHkpIHsgcmV0dXJuIHggKyAnIDogJyArIHk7IH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHhheGlzOiB7XHJcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJyNmY2ZjZmMnLFxyXG4gICAgICAgICAgICBtb2RlOiAnY2F0ZWdvcmllcydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHlheGlzOiB7XHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uOiAoJHNjb3BlLmFwcC5sYXlvdXQuaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnKSxcclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VlZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoYWRvd1NpemU6IDBcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2xvcnM6IENvbG9yc1NlcnZpY2UsIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50KSB7XHJcbiAgICAgICAgaHR0cC5nZXQoJ2Fzc2V0cy9zZXJ2ZXIvY2hhcnQvc3BsaW5lLmpzb24nKS5zdWJzY3JpYmUoZGF0YSA9PiB0aGlzLnNwbGluZURhdGEgPSBkYXRhKTtcclxuICAgICAgICB0aGlzLmdldENoYXJ0RGF0YSgnYXNzZXRzL3NlcnZlci9jaGFydC9iYXIuanNvbicpLnN1YnNjcmliZShkYXRhID0+IHRoaXMuYmFyRGF0YSA9IGRhdGEpO1xyXG5cclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkgeyB9XHJcblxyXG4gICAgZ2V0Q2hhcnREYXRhKHVybCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xvckJ5TmFtZShuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JzLmJ5TmFtZShuYW1lKTtcclxuICAgIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGVyLWxvYWRlci9zcmMhLi9ub2RlX21vZHVsZXMvYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50LnRzIiwibW9kdWxlLmV4cG9ydHMgPSBcIlxcclxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMiBjb250ZW50LWhlYWRpbmcgXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcIiBjb2wtbWQtNiBwdWxsLWxlZnRcXFwiPlxcclxcbiAgICAgICAgICAgIE5ldyBEYXNoYmFvcmRcXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiIGNvbC1tZC0zICBwdWxsLXJpZ2h0XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZXJzb25hIG1zLVBlcnNvbmEtLXhzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZUFyZWFcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cXFwibXMtUGVyc29uYS1pbWFnZVxcXCIgc3JjPVxcXCJhc3NldHMvaW1nL3VzZXIvMDEuanBnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1zLVBlcnNvbmEtZGV0YWlsc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtcy1QZXJzb25hLXByaW1hcnlUZXh0XFxcIj5UYWtlcnUgaXMgeW91ciBtYW5hZ2VyPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuPCEtLSBTVEFSVCB3aWRnZXRzIGJveC0tPlxcclxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5ZZXN0ZXJkYXkgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoMSBtdDAgcHQxMFxcXCI+OGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJzdWNjZXNzXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiR3JlZW5Gb250XFxcIj4gT25UaW1lICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5ZZXN0ZXJkYXkgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoMSBtdDAgcHQxMFxcXCI+OGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJzdWNjZXNzXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiR3JlZW5Gb250XFxcIj4gT25UaW1lICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5ZZXN0ZXJkYXkgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoMSBtdDAgcHQxMFxcXCI+OGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJzdWNjZXNzXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiR3JlZW5Gb250XFxcIj4gT25UaW1lICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1sZy0zIGNvbC1zbS02XFxcIj5cXHJcXG4gICAgICAgIDwhLS0gU1RBUlQgd2lkZ2V0LS0+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCB3aWRnZXQgV2hpdGVCR1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiIHB2LWxnXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIiBtdDAgYm90dG9tQm9yZGVyXFxcIj5ZZXN0ZXJkYXkgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoMSBtdDAgcHQxMFxcXCI+OGggMDBtIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiXFxcIj5Hb2FsICA6ICA4IGhyczwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGggcHQxMCBtdDMwIGNvbC1tZC02XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cHJvZ3Jlc3NiYXIgY2xhc3M9XFxcIm0wIHByb2dyZXNzLXhzXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiB0eXBlPVxcXCJzdWNjZXNzXFxcIj4xMDAlPC9wcm9ncmVzc2Jhcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiR3JlZW5Gb250XFxcIj4gT25UaW1lICA8L3A+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXFxyXFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLWxnLTEyIFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBXaGl0ZUJHIGNvbC1tZC0xMiBcXFwiIGlkPVxcXCJwYW5lbENoYXJ0MlxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtaGVhZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC10aXRsZVxcXCI+TGFzdCBNb250aCA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtYm9keVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBmbG90IFtkYXRhc2V0XT1cXFwiYmFyRGF0YVxcXCIgW29wdGlvbnNdPVxcXCJiYXJPcHRpb25zXFxcIiBoZWlnaHQ9XFxcIjMwMFxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGhyIC8+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMiBtdDMwIHBiMzBcXFwiPlxcclxcblxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93IFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5NZWV0aW5nIEhvdXJzIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtMCB0ZXh0LXByaW1hcnlcXFwiPjBoIDQ1bTwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLXhzLTNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5FbWFpbCBIb3VyczwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtMCB0ZXh0LXByaW1hcnlcXFwiPiAwaCAwNW08L2gzPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC14cy0zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+T3RoZXIgV29yayBUaW1lPC9wPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcIm0wIHRleHQtcHJpbWFyeVxcXCI+N2ggMDBtPC9oMz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wteHMtM1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPk92ZXJ0aW1lIDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJtMCB0ZXh0LXByaW1hcnlcXFwiPjFoIDAwbTwvaDM+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG48IS0tIEVORCB3aWRnZXRzIGJveC0tPlxcclxcblxcclxcblxcclxcblxcclxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMTM3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDMxIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9BcHBEYXNoYmFvcmQvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5jb21wb25lbnQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTM4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDMxIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBBcHBEYXNoYmFvcmRDb21wb25lbnQgfSBmcm9tICcuL0FwcERhc2hiYW9yZC9BcHBEYXNoYmFvcmQuY29tcG9uZW50JztcclxuXHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuXHJcbiAgICB7IHBhdGg6ICcnLCBjb21wb25lbnQ6IEFwcERhc2hiYW9yZENvbXBvbmVudCB9LFxyXG5cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwRGFzaGJhb3JkQ29tcG9uZW50LFxyXG4gIFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcERhc2hiYW9yZE1vZHVsZSB7IH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGVyLWxvYWRlci9zcmMhLi9ub2RlX21vZHVsZXMvYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvQXBwRGFzaGJhb3JkL0FwcERhc2hiYW9yZC5tb2R1bGUudHMiXSwic291cmNlUm9vdCI6IiJ9