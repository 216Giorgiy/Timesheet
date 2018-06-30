webpackJsonp([19],{

/***/ 1184:
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
var WidgetsComponent = (function () {
    function WidgetsComponent(http) {
        var _this = this;
        this.http = http;
        this.lat = 33.790807;
        this.lng = -117.835734;
        this.zoom = 14;
        this.scrollwheel = false;
        this.sparkOptions2 = {
            type: 'line',
            height: 80,
            width: '100%',
            lineWidth: 2,
            lineColor: '#dddddd',
            spotColor: '#bbbbbb',
            fillColor: '',
            highlightLineColor: '#fff',
            spotRadius: 3,
            resize: true
        };
        this.sparkOptions3 = {
            barColor: '#fff',
            height: 50,
            barWidth: 6,
            barSpacing: 6
        };
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
                // position: (app.layout.isRTL ? 'right' : 'left'),
                tickFormatter: function (v) {
                    return v /* + ' visitors'*/;
                }
            },
            shadowSize: 0
        };
        this.getChartData('assets/server/chart/spline.json').subscribe(function (data) { return _this.splineData = data; });
    }
    WidgetsComponent.prototype.getChartData = function (url) {
        return this.http.get(url);
    };
    WidgetsComponent.prototype.ngOnInit = function () {
    };
    WidgetsComponent = __decorate([
        core_1.Component({
            selector: 'app-widgets',
            template: __webpack_require__(1185),
            styles: [__webpack_require__(1186)]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], WidgetsComponent);
    return WidgetsComponent;
}());
exports.WidgetsComponent = WidgetsComponent;


/***/ }),

/***/ 1185:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading\">Work Time Report</div>\r\n<!-- START row-->\r\n<div class=\"row\">\r\n\r\n    <div class=\"col-md-12\">\r\n        <div class=\"panel WhiteBG\" id=\"panelChart9\">\r\n          \r\n            <div class=\"panel-heading\">\r\n                <div class=\"panel-title\"> <h2>Your time trends </h2></div>\r\n                <p> Your stats are based on your email and calendarHow we calculate</p>\r\n            </div>\r\n            <div class=\"panel-wrapper\">\r\n                <div class=\"panel-body\">\r\n                    <div flot [dataset]=\"splineData\" [options]=\"splineOptions\" height=\"300\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n"

/***/ }),

/***/ 1186:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 822:
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
var core_2 = __webpack_require__(922);
var shared_module_1 = __webpack_require__(99);
var widgets_component_1 = __webpack_require__(1184);
var routes = [
    { path: '', component: widgets_component_1.WidgetsComponent }
];
var WidgetsModule = (function () {
    function WidgetsModule() {
    }
    WidgetsModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyBNs42Rt_CyxAqdbIBK0a5Ut83QiauESPA'
                })
            ],
            declarations: [widgets_component_1.WidgetsComponent],
            exports: [
                router_1.RouterModule
            ]
        })
    ], WidgetsModule);
    return WidgetsModule;
}());
exports.WidgetsModule = WidgetsModule;


/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsAPIWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_api_loader_maps_api_loader__ = __webpack_require__(847);



/**
 * Wrapper class that handles the communication with the Google Maps Javascript
 * API v3
 */
var GoogleMapsAPIWrapper = (function () {
    function GoogleMapsAPIWrapper(_loader, _zone) {
        var _this = this;
        this._loader = _loader;
        this._zone = _zone;
        this._map =
            new Promise(function (resolve) { _this._mapResolver = resolve; });
    }
    GoogleMapsAPIWrapper.prototype.createMap = function (el, mapOptions) {
        var _this = this;
        return this._loader.load().then(function () {
            var map = new google.maps.Map(el, mapOptions);
            _this._mapResolver(map);
            return;
        });
    };
    GoogleMapsAPIWrapper.prototype.setMapOptions = function (options) {
        this._map.then(function (m) { m.setOptions(options); });
    };
    /**
     * Creates a google map marker with the map context
     */
    GoogleMapsAPIWrapper.prototype.createMarker = function (options, addToMap) {
        if (options === void 0) { options = {}; }
        if (addToMap === void 0) { addToMap = true; }
        return this._map.then(function (map) {
            if (addToMap) {
                options.map = map;
            }
            return new google.maps.Marker(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createInfoWindow = function (options) {
        return this._map.then(function () { return new google.maps.InfoWindow(options); });
    };
    /**
     * Creates a google.map.Circle for the current map.
     */
    GoogleMapsAPIWrapper.prototype.createCircle = function (options) {
        return this._map.then(function (map) {
            options.map = map;
            return new google.maps.Circle(options);
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolyline = function (options) {
        return this.getNativeMap().then(function (map) {
            var line = new google.maps.Polyline(options);
            line.setMap(map);
            return line;
        });
    };
    GoogleMapsAPIWrapper.prototype.createPolygon = function (options) {
        return this.getNativeMap().then(function (map) {
            var polygon = new google.maps.Polygon(options);
            polygon.setMap(map);
            return polygon;
        });
    };
    /**
     * Creates a new google.map.Data layer for the current map
     */
    GoogleMapsAPIWrapper.prototype.createDataLayer = function (options) {
        return this._map.then(function (m) {
            var data = new google.maps.Data(options);
            data.setMap(m);
            return data;
        });
    };
    /**
     * Determines if given coordinates are insite a Polygon path.
     */
    GoogleMapsAPIWrapper.prototype.containsLocation = function (latLng, polygon) {
        return google.maps.geometry.poly.containsLocation(latLng, polygon);
    };
    GoogleMapsAPIWrapper.prototype.subscribeToMapEvent = function (eventName) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._map.then(function (m) {
                m.addListener(eventName, function (arg) { _this._zone.run(function () { return observer.next(arg); }); });
            });
        });
    };
    GoogleMapsAPIWrapper.prototype.setCenter = function (latLng) {
        return this._map.then(function (map) { return map.setCenter(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.getZoom = function () { return this._map.then(function (map) { return map.getZoom(); }); };
    GoogleMapsAPIWrapper.prototype.getBounds = function () {
        return this._map.then(function (map) { return map.getBounds(); });
    };
    GoogleMapsAPIWrapper.prototype.setZoom = function (zoom) {
        return this._map.then(function (map) { return map.setZoom(zoom); });
    };
    GoogleMapsAPIWrapper.prototype.getCenter = function () {
        return this._map.then(function (map) { return map.getCenter(); });
    };
    GoogleMapsAPIWrapper.prototype.panTo = function (latLng) {
        return this._map.then(function (map) { return map.panTo(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.panBy = function (x, y) {
        return this._map.then(function (map) { return map.panBy(x, y); });
    };
    GoogleMapsAPIWrapper.prototype.fitBounds = function (latLng) {
        return this._map.then(function (map) { return map.fitBounds(latLng); });
    };
    GoogleMapsAPIWrapper.prototype.panToBounds = function (latLng) {
        return this._map.then(function (map) { return map.panToBounds(latLng); });
    };
    /**
     * Returns the native Google Maps Map instance. Be careful when using this instance directly.
     */
    GoogleMapsAPIWrapper.prototype.getNativeMap = function () { return this._map; };
    /**
     * Triggers the given event name on the map instance.
     */
    GoogleMapsAPIWrapper.prototype.triggerMapEvent = function (eventName) {
        return this._map.then(function (m) { return google.maps.event.trigger(m, eventName); });
    };
    return GoogleMapsAPIWrapper;
}());

GoogleMapsAPIWrapper.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
GoogleMapsAPIWrapper.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__maps_api_loader_maps_api_loader__["a" /* MapsAPILoader */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=google-maps-api-wrapper.js.map

/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsAPILoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var MapsAPILoader = (function () {
    function MapsAPILoader() {
    }
    return MapsAPILoader;
}());

MapsAPILoader.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
MapsAPILoader.ctorParameters = function () { return []; };
//# sourceMappingURL=maps-api-loader.js.map

/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarkerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);



var MarkerManager = (function () {
    function MarkerManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markers = new Map();
    }
    MarkerManager.prototype.deleteMarker = function (marker) {
        var _this = this;
        var m = this._markers.get(marker);
        if (m == null) {
            // marker already deleted
            return Promise.resolve();
        }
        return m.then(function (m) {
            return _this._zone.run(function () {
                m.setMap(null);
                _this._markers.delete(marker);
            });
        });
    };
    MarkerManager.prototype.updateMarkerPosition = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setPosition({ lat: marker.latitude, lng: marker.longitude }); });
    };
    MarkerManager.prototype.updateTitle = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setTitle(marker.title); });
    };
    MarkerManager.prototype.updateLabel = function (marker) {
        return this._markers.get(marker).then(function (m) { m.setLabel(marker.label); });
    };
    MarkerManager.prototype.updateDraggable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setDraggable(marker.draggable); });
    };
    MarkerManager.prototype.updateIcon = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setIcon(marker.iconUrl); });
    };
    MarkerManager.prototype.updateOpacity = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setOpacity(marker.opacity); });
    };
    MarkerManager.prototype.updateVisible = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setVisible(marker.visible); });
    };
    MarkerManager.prototype.updateZIndex = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setZIndex(marker.zIndex); });
    };
    MarkerManager.prototype.updateClickable = function (marker) {
        return this._markers.get(marker).then(function (m) { return m.setClickable(marker.clickable); });
    };
    MarkerManager.prototype.addMarker = function (marker) {
        var markerPromise = this._mapsWrapper.createMarker({
            position: { lat: marker.latitude, lng: marker.longitude },
            label: marker.label,
            draggable: marker.draggable,
            icon: marker.iconUrl,
            opacity: marker.opacity,
            visible: marker.visible,
            zIndex: marker.zIndex,
            title: marker.title,
            clickable: marker.clickable
        });
        this._markers.set(marker, markerPromise);
    };
    MarkerManager.prototype.getNativeMarker = function (marker) {
        return this._markers.get(marker);
    };
    MarkerManager.prototype.createEventObservable = function (eventName, marker) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._markers.get(marker).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    return MarkerManager;
}());

MarkerManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
MarkerManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=marker-manager.js.map

/***/ }),

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircleManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);



var CircleManager = (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex
        }));
    };
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) { return c.setOptions(options); });
    };
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    return CircleManager;
}());

CircleManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
CircleManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=circle-manager.js.map

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoWindowManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__marker_manager__ = __webpack_require__(848);




var InfoWindowManager = (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].create(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    return InfoWindowManager;
}());

InfoWindowManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/** @nocollapse */
InfoWindowManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], },
    { type: __WEBPACK_IMPORTED_MODULE_3__marker_manager__["a" /* MarkerManager */], },
]; };
//# sourceMappingURL=info-window-manager.js.map

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolygonManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);



var PolygonManager = (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    return PolygonManager;
}());

PolygonManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
PolygonManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=polygon-manager.js.map

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolylineManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);



var PolylineManager = (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var path = PolylineManager._convertPoints(line);
        var polylinePromise = this._mapsWrapper.createPolyline({
            clickable: line.clickable,
            draggable: line.draggable,
            editable: line.editable,
            geodesic: line.geodesic,
            strokeColor: line.strokeColor,
            strokeOpacity: line.strokeOpacity,
            strokeWeight: line.strokeWeight,
            visible: line.visible,
            zIndex: line.zIndex,
            path: path
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    return PolylineManager;
}());

PolylineManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
PolylineManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=polyline-manager.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KmlLayerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);



/**
 * Manages all KML Layers for a Google Map instance.
 */
var KmlLayerManager = (function () {
    function KmlLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new KML Layer to the map.
     */
    KmlLayerManager.prototype.addKmlLayer = function (layer) {
        var newLayer = this._wrapper.getNativeMap().then(function (m) {
            return new google.maps.KmlLayer({
                clickable: layer.clickable,
                map: m,
                preserveViewport: layer.preserveViewport,
                screenOverlays: layer.screenOverlays,
                suppressInfoWindows: layer.suppressInfoWindows,
                url: layer.url,
                zIndex: layer.zIndex
            });
        });
        this._layers.set(layer, newLayer);
    };
    KmlLayerManager.prototype.setOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) { return l.setOptions(options); });
    };
    KmlLayerManager.prototype.deleteKmlLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Creates a Google Maps event listener for the given KmlLayer as an Observable
     */
    KmlLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._layers.get(layer).then(function (m) {
                m.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    return KmlLayerManager;
}());

KmlLayerManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
KmlLayerManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=kml-layer-manager.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataLayerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(836);



/**
 * Manages all Data Layers for a Google Map instance.
 */
var DataLayerManager = (function () {
    function DataLayerManager(_wrapper, _zone) {
        this._wrapper = _wrapper;
        this._zone = _zone;
        this._layers = new Map();
    }
    /**
     * Adds a new Data Layer to the map.
     */
    DataLayerManager.prototype.addDataLayer = function (layer) {
        var _this = this;
        var newLayer = this._wrapper.createDataLayer({
            style: layer.style
        })
            .then(function (d) {
            if (layer.geoJson) {
                _this.getDataFeatures(d, layer.geoJson).then(function (features) { return d.features = features; });
            }
            return d;
        });
        this._layers.set(layer, newLayer);
    };
    DataLayerManager.prototype.deleteDataLayer = function (layer) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.setMap(null);
            _this._layers.delete(layer);
        });
    };
    DataLayerManager.prototype.updateGeoJson = function (layer, geoJson) {
        var _this = this;
        this._layers.get(layer).then(function (l) {
            l.forEach(function (feature) {
                l.remove(feature);
                var index = l.features.indexOf(feature, 0);
                if (index > -1) {
                    l.features.splice(index, 1);
                }
            });
            _this.getDataFeatures(l, geoJson).then(function (features) { return l.features = features; });
        });
    };
    DataLayerManager.prototype.setDataOptions = function (layer, options) {
        this._layers.get(layer).then(function (l) {
            l.setControlPosition(options.controlPosition);
            l.setControls(options.controls);
            l.setDrawingMode(options.drawingMode);
            l.setStyle(options.style);
        });
    };
    /**
     * Creates a Google Maps event listener for the given DataLayer as an Observable
     */
    DataLayerManager.prototype.createEventObservable = function (eventName, layer) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._layers.get(layer).then(function (d) {
                d.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    /**
     * Extract features from a geoJson using google.maps Data Class
     * @param d : google.maps.Data class instance
     * @param geoJson : url or geojson object
     */
    DataLayerManager.prototype.getDataFeatures = function (d, geoJson) {
        return new Promise(function (resolve, reject) {
            if (typeof geoJson === 'object') {
                try {
                    var features = d.addGeoJson(geoJson);
                    resolve(features);
                }
                catch (e) {
                    reject(e);
                }
            }
            else if (typeof geoJson === 'string') {
                d.loadGeoJson(geoJson, null, resolve);
            }
            else {
                reject("Impossible to extract features from geoJson: wrong argument type");
            }
        });
    };
    return DataLayerManager;
}());

DataLayerManager.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
DataLayerManager.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], },
]; };
//# sourceMappingURL=data-layer-manager.js.map

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmInfoWindow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_info_window_manager__ = __webpack_require__(854);


var infoWindowId = 0;
/**
 * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <agm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </agm-info-window>
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmInfoWindow = (function () {
    function AgmInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    AgmInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    AgmInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    AgmInfoWindow.prototype._registerEventListeners = function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    AgmInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this.open() : this.close();
    };
    AgmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    AgmInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    AgmInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    AgmInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    AgmInfoWindow.prototype.toString = function () { return 'AgmInfoWindow-' + this._id.toString(); };
    /** @internal */
    AgmInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    return AgmInfoWindow;
}());

AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
AgmInfoWindow.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'agm-info-window',
                template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AgmInfoWindow.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_info_window_manager__["a" /* InfoWindowManager */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
]; };
AgmInfoWindow.propDecorators = {
    'latitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'longitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'disableAutoPan': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'maxWidth': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'isOpen': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'infoWindowClose': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=info-window.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolylinePoint; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
var AgmPolylinePoint = (function () {
    function AgmPolylinePoint() {
        /**
         * This event emitter gets emitted when the position of the point changed.
         */
        this.positionChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AgmPolylinePoint.prototype.ngOnChanges = function (changes) {
        if (changes['latitude'] || changes['longitude']) {
            var position = {
                lat: changes['latitude'].currentValue,
                lng: changes['longitude'].currentValue
            };
            this.positionChanged.emit(position);
        }
    };
    return AgmPolylinePoint;
}());

AgmPolylinePoint.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: 'agm-polyline-point' },] },
];
/** @nocollapse */
AgmPolylinePoint.ctorParameters = function () { return []; };
AgmPolylinePoint.propDecorators = {
    'latitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'longitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'positionChanged': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=polyline-point.js.map

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsScriptProtocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LAZY_MAPS_API_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LazyMapsAPILoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_browser_globals__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_api_loader__ = __webpack_require__(847);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var GoogleMapsScriptProtocol;
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
/**
 * Token for the config of the LazyMapsAPILoader. Please provide an object of type {@link
 * LazyMapsAPILoaderConfig}.
 */
var LAZY_MAPS_API_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('angular-google-maps LAZY_MAPS_API_CONFIG');
var LazyMapsAPILoader = (function (_super) {
    __extends(LazyMapsAPILoader, _super);
    function LazyMapsAPILoader(config, w, d) {
        var _this = _super.call(this) || this;
        _this._config = config || {};
        _this._windowRef = w;
        _this._documentRef = d;
        return _this;
    }
    LazyMapsAPILoader.prototype.load = function () {
        var _this = this;
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        var script = this._documentRef.getNativeDocument().createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        var callbackName = "angular2GoogleMapsLazyMapsAPILoader";
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise(function (resolve, reject) {
            _this._windowRef.getNativeWindow()[callbackName] = function () {
                resolve();
            };
            script.onerror = function (error) {
                reject(error);
            };
        });
        this._documentRef.getNativeDocument().body.appendChild(script);
        return this._scriptLoadingPromise;
    };
    LazyMapsAPILoader.prototype._getScriptSrc = function (callbackName) {
        var protocolType = (this._config && this._config.protocol) || GoogleMapsScriptProtocol.HTTPS;
        var protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        var hostAndPath = this._config.hostAndPath || 'maps.googleapis.com/maps/api/js';
        var queryParams = {
            v: this._config.apiVersion || '3',
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        var params = Object.keys(queryParams)
            .filter(function (k) { return queryParams[k] != null; })
            .filter(function (k) {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map(function (k) {
            // join arrays as comma seperated strings
            var i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map(function (entry) {
            return entry.key + "=" + entry.value;
        })
            .join('&');
        return protocol + "//" + hostAndPath + "?" + params;
    };
    return LazyMapsAPILoader;
}(__WEBPACK_IMPORTED_MODULE_2__maps_api_loader__["a" /* MapsAPILoader */]));

LazyMapsAPILoader.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
LazyMapsAPILoader.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"], args: [LAZY_MAPS_API_CONFIG,] },] },
    { type: __WEBPACK_IMPORTED_MODULE_1__utils_browser_globals__["c" /* WindowRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__utils_browser_globals__["b" /* DocumentRef */], },
]; };
//# sourceMappingURL=lazy-maps-api-loader.js.map

/***/ }),

/***/ 875:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_google_maps_api_wrapper__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_managers_circle_manager__ = __webpack_require__(853);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_managers_info_window_manager__ = __webpack_require__(854);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_managers_marker_manager__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_managers_polygon_manager__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_managers_polyline_manager__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_managers_kml_layer_manager__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_managers_data_layer_manager__ = __webpack_require__(858);









/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMap = (function () {
    function AgmMap(_elem, _mapsWrapper) {
        this._elem = _elem;
        this._mapsWrapper = _mapsWrapper;
        /**
         * The longitude that defines the center of the map.
         */
        this.longitude = 0;
        /**
         * The latitude that defines the center of the map.
         */
        this.latitude = 0;
        /**
         * The zoom level of the map. The default zoom level is 8.
         */
        this.zoom = 8;
        /**
         * Enables/disables if map is draggable.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = true;
        /**
         * Enables/disables zoom and center on double click. Enabled by default.
         */
        this.disableDoubleClickZoom = false;
        /**
         * Enables/disables all default UI of the Google map. Please note: When the map is created, this
         * value cannot get updated.
         */
        this.disableDefaultUI = false;
        /**
         * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
         */
        this.scrollwheel = true;
        /**
         * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
         * enabled by default.
         */
        this.keyboardShortcuts = true;
        /**
         * The enabled/disabled state of the Zoom control.
         */
        this.zoomControl = true;
        /**
         * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
         * modes, these styles will only apply to labels and geometry.
         */
        this.styles = [];
        /**
         * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
         * used to
         * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
         */
        this.usePanning = false;
        /**
         * The initial enabled/disabled state of the Street View Pegman control.
         * This control is part of the default UI, and should be set to false when displaying a map type
         * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
         */
        this.streetViewControl = true;
        /**
         * Sets the viewport to contain the given bounds.
         */
        this.fitBounds = null;
        /**
         * The initial enabled/disabled state of the Scale control. This is disabled by default.
         */
        this.scaleControl = false;
        /**
         * The initial enabled/disabled state of the Map type control.
         */
        this.mapTypeControl = false;
        /**
         * The initial enabled/disabled state of the Pan control.
         */
        this.panControl = false;
        /**
         * The initial enabled/disabled state of the Rotate control.
         */
        this.rotateControl = false;
        /**
         * The initial enabled/disabled state of the Fullscreen control.
         */
        this.fullscreenControl = false;
        /**
         * The map mapTypeId. Defaults to 'roadmap'.
         */
        this.mapTypeId = 'roadmap';
        /**
         * When false, map icons are not clickable. A map icon represents a point of interest,
         * also known as a POI. By default map icons are clickable.
         */
        this.clickableIcons = true;
        /**
         * This setting controls how gestures on the map are handled.
         * Allowed values:
         * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
         * - 'greedy'      (All touch gestures pan or zoom the map.)
         * - 'none'        (The map cannot be panned or zoomed by user gestures.)
         * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
         */
        this.gestureHandling = 'auto';
        this._observableSubscriptions = [];
        /**
         * This event emitter gets emitted when the user clicks on the map (but not when they click on a
         * marker or infoWindow).
         */
        this.mapClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event emitter gets emitted when the user right-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapRightClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event emitter gets emitted when the user double-clicks on the map (but not when they click
         * on a marker or infoWindow).
         */
        this.mapDblClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event emitter is fired when the map center changes.
         */
        this.centerChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the viewport bounds have changed.
         */
        this.boundsChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the map becomes idle after panning or zooming.
         */
        this.idle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the zoom level has changed.
         */
        this.zoomChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the google map is fully initialized.
         * You get the google.maps.Map instance as a result of this EventEmitter.
         */
        this.mapReady = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /** @internal */
    AgmMap.prototype.ngOnInit = function () {
        // todo: this should be solved with a new component and a viewChild decorator
        var container = this._elem.nativeElement.querySelector('.agm-map-container-inner');
        this._initMapInstance(container);
    };
    AgmMap.prototype._initMapInstance = function (el) {
        var _this = this;
        this._mapsWrapper.createMap(el, {
            center: { lat: this.latitude || 0, lng: this.longitude || 0 },
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            disableDefaultUI: this.disableDefaultUI,
            disableDoubleClickZoom: this.disableDoubleClickZoom,
            scrollwheel: this.scrollwheel,
            backgroundColor: this.backgroundColor,
            draggable: this.draggable,
            draggableCursor: this.draggableCursor,
            draggingCursor: this.draggingCursor,
            keyboardShortcuts: this.keyboardShortcuts,
            styles: this.styles,
            zoomControl: this.zoomControl,
            zoomControlOptions: this.zoomControlOptions,
            streetViewControl: this.streetViewControl,
            streetViewControlOptions: this.streetViewControlOptions,
            scaleControl: this.scaleControl,
            scaleControlOptions: this.scaleControlOptions,
            mapTypeControl: this.mapTypeControl,
            mapTypeControlOptions: this.mapTypeControlOptions,
            panControl: this.panControl,
            panControlOptions: this.panControlOptions,
            rotateControl: this.rotateControl,
            rotateControlOptions: this.rotateControlOptions,
            fullscreenControl: this.fullscreenControl,
            fullscreenControlOptions: this.fullscreenControlOptions,
            mapTypeId: this.mapTypeId,
            clickableIcons: this.clickableIcons,
            gestureHandling: this.gestureHandling
        })
            .then(function () { return _this._mapsWrapper.getNativeMap(); })
            .then(function (map) { return _this.mapReady.emit(map); });
        // register event listeners
        this._handleMapCenterChange();
        this._handleMapZoomChange();
        this._handleMapMouseEvents();
        this._handleBoundsChange();
        this._handleIdleEvent();
    };
    /** @internal */
    AgmMap.prototype.ngOnDestroy = function () {
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /* @internal */
    AgmMap.prototype.ngOnChanges = function (changes) {
        this._updateMapOptionsChanges(changes);
        this._updatePosition(changes);
    };
    AgmMap.prototype._updateMapOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmMap._mapOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._mapsWrapper.setMapOptions(options);
    };
    /**
     * Triggers a resize event on the google map instance.
     * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
     * Returns a promise that gets resolved after the event was triggered.
     */
    AgmMap.prototype.triggerResize = function (recenter) {
        var _this = this;
        if (recenter === void 0) { recenter = true; }
        // Note: When we would trigger the resize event and show the map in the same turn (which is a
        // common case for triggering a resize event), then the resize event would not
        // work (to show the map), so we trigger the event in a timeout.
        return new Promise(function (resolve) {
            setTimeout(function () {
                return _this._mapsWrapper.triggerMapEvent('resize').then(function () {
                    if (recenter) {
                        _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
                    }
                    resolve();
                });
            });
        });
    };
    AgmMap.prototype._updatePosition = function (changes) {
        if (changes['latitude'] == null && changes['longitude'] == null &&
            changes['fitBounds'] == null) {
            // no position update needed
            return;
        }
        // we prefer fitBounds in changes
        if (changes['fitBounds'] && this.fitBounds != null) {
            this._fitBounds();
            return;
        }
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        this._setCenter();
    };
    AgmMap.prototype._setCenter = function () {
        var newCenter = {
            lat: this.latitude,
            lng: this.longitude,
        };
        if (this.usePanning) {
            this._mapsWrapper.panTo(newCenter);
        }
        else {
            this._mapsWrapper.setCenter(newCenter);
        }
    };
    AgmMap.prototype._fitBounds = function () {
        if (this.usePanning) {
            this._mapsWrapper.panToBounds(this.fitBounds);
            return;
        }
        this._mapsWrapper.fitBounds(this.fitBounds);
    };
    AgmMap.prototype._handleMapCenterChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
            _this._mapsWrapper.getCenter().then(function (center) {
                _this.latitude = center.lat();
                _this.longitude = center.lng();
                _this.centerChange.emit({ lat: _this.latitude, lng: _this.longitude });
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleBoundsChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
            _this._mapsWrapper.getBounds().then(function (bounds) { _this.boundsChange.emit(bounds); });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapZoomChange = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
            _this._mapsWrapper.getZoom().then(function (z) {
                _this.zoom = z;
                _this.zoomChange.emit(z);
            });
        });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleIdleEvent = function () {
        var _this = this;
        var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () { _this.idle.emit(void 0); });
        this._observableSubscriptions.push(s);
    };
    AgmMap.prototype._handleMapMouseEvents = function () {
        var _this = this;
        var events = [
            { name: 'click', emitter: this.mapClick },
            { name: 'rightclick', emitter: this.mapRightClick },
            { name: 'dblclick', emitter: this.mapDblClick },
        ];
        events.forEach(function (e) {
            var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
                var value = { coords: { lat: event.latLng.lat(), lng: event.latLng.lng() } };
                e.emitter.emit(value);
            });
            _this._observableSubscriptions.push(s);
        });
    };
    return AgmMap;
}());

/**
 * Map option attributes that can change over time
 */
AgmMap._mapOptionsAttributes = [
    'disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor',
    'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl',
    'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom',
    'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions',
    'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions',
    'mapTypeId', 'clickableIcons', 'gestureHandling'
];
AgmMap.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'agm-map',
                providers: [
                    __WEBPACK_IMPORTED_MODULE_1__services_google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], __WEBPACK_IMPORTED_MODULE_4__services_managers_marker_manager__["a" /* MarkerManager */], __WEBPACK_IMPORTED_MODULE_3__services_managers_info_window_manager__["a" /* InfoWindowManager */], __WEBPACK_IMPORTED_MODULE_2__services_managers_circle_manager__["a" /* CircleManager */], __WEBPACK_IMPORTED_MODULE_6__services_managers_polyline_manager__["a" /* PolylineManager */],
                    __WEBPACK_IMPORTED_MODULE_5__services_managers_polygon_manager__["a" /* PolygonManager */], __WEBPACK_IMPORTED_MODULE_7__services_managers_kml_layer_manager__["a" /* KmlLayerManager */], __WEBPACK_IMPORTED_MODULE_8__services_managers_data_layer_manager__["a" /* DataLayerManager */]
                ],
                host: {
                    // todo: deprecated - we will remove it with the next version
                    '[class.sebm-google-map-container]': 'true'
                },
                styles: ["\n    .agm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "],
                template: "\n    <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n    <div class='agm-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
/** @nocollapse */
AgmMap.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__services_google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], },
]; };
AgmMap.propDecorators = {
    'longitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'latitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zoom': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'minZoom': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'maxZoom': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['mapDraggable',] },],
    'disableDoubleClickZoom': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'disableDefaultUI': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'scrollwheel': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'backgroundColor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggableCursor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggingCursor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'keyboardShortcuts': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zoomControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zoomControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'styles': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'usePanning': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'streetViewControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'streetViewControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fitBounds': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'scaleControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'scaleControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'mapTypeControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'mapTypeControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'panControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'panControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'rotateControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'rotateControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fullscreenControl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fullscreenControlOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'mapTypeId': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'clickableIcons': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'gestureHandling': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'mapClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mapRightClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mapDblClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'centerChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'boundsChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'idle': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'zoomChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mapReady': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmCircle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__ = __webpack_require__(853);


var AgmCircle = (function () {
    function AgmCircle(_manager) {
        this._manager = _manager;
        /**
         * Indicates whether this Circle handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this circle over the map. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this circle by dragging the control points shown at
         * the center and around the circumference of the circle. Defaults to false.
         */
        this.editable = false;
        /**
         * The radius in meters on the Earth's surface.
         */
        this.radius = 0;
        /**
         * The stroke position. Defaults to CENTER.
         * This property is not supported on Internet Explorer 8 and earlier.
         */
        this.strokePosition = 'CENTER';
        /**
         * The stroke width in pixels.
         */
        this.strokeWeight = 0;
        /**
         * Whether this circle is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the circle's center is changed.
         */
        this.centerChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event emitter gets emitted when the user clicks on the circle.
         */
        this.circleDblClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is repeatedly fired while the user drags the circle.
         */
        this.drag = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user stops dragging the circle.
         */
        this.dragEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user starts dragging the circle.
         */
        this.dragStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mousedown event is fired on the circle.
         */
        this.mouseDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mousemove event is fired on the circle.
         */
        this.mouseMove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired on circle mouseout.
         */
        this.mouseOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired on circle mouseover.
         */
        this.mouseOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mouseup event is fired on the circle.
         */
        this.mouseUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the circle's radius is changed.
         */
        this.radiusChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the circle is right-clicked on.
         */
        this.rightClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._circleAddedToManager = false;
        this._eventSubscriptions = [];
    }
    /** @internal */
    AgmCircle.prototype.ngOnInit = function () {
        this._manager.addCircle(this);
        this._circleAddedToManager = true;
        this._registerEventListeners();
    };
    /** @internal */
    AgmCircle.prototype.ngOnChanges = function (changes) {
        if (!this._circleAddedToManager) {
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._manager.setCenter(this);
        }
        if (changes['editable']) {
            this._manager.setEditable(this);
        }
        if (changes['draggable']) {
            this._manager.setDraggable(this);
        }
        if (changes['visible']) {
            this._manager.setVisible(this);
        }
        if (changes['radius']) {
            this._manager.setRadius(this);
        }
        this._updateCircleOptionsChanges(changes);
    };
    AgmCircle.prototype._updateCircleOptionsChanges = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmCircle._mapOptions.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        if (optionKeys.length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmCircle.prototype._registerEventListeners = function () {
        var _this = this;
        var events = new Map();
        events.set('center_changed', this.centerChange);
        events.set('click', this.circleClick);
        events.set('dblclick', this.circleDblClick);
        events.set('drag', this.drag);
        events.set('dragend', this.dragEnd);
        events.set('dragStart', this.dragStart);
        events.set('mousedown', this.mouseDown);
        events.set('mousemove', this.mouseMove);
        events.set('mouseout', this.mouseOut);
        events.set('mouseover', this.mouseOver);
        events.set('mouseup', this.mouseUp);
        events.set('radius_changed', this.radiusChange);
        events.set('rightclick', this.rightClick);
        events.forEach(function (eventEmitter, eventName) {
            _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
                switch (eventName) {
                    case 'radius_changed':
                        _this._manager.getRadius(_this).then(function (radius) { return eventEmitter.emit(radius); });
                        break;
                    case 'center_changed':
                        _this._manager.getCenter(_this).then(function (center) {
                            return eventEmitter.emit({ lat: center.lat(), lng: center.lng() });
                        });
                        break;
                    default:
                        eventEmitter.emit({ coords: { lat: value.latLng.lat(), lng: value.latLng.lng() } });
                }
            }));
        });
    };
    /** @internal */
    AgmCircle.prototype.ngOnDestroy = function () {
        this._eventSubscriptions.forEach(function (s) { s.unsubscribe(); });
        this._eventSubscriptions = null;
        this._manager.removeCircle(this);
    };
    /**
     * Gets the LatLngBounds of this Circle.
     */
    AgmCircle.prototype.getBounds = function () { return this._manager.getBounds(this); };
    AgmCircle.prototype.getCenter = function () { return this._manager.getCenter(this); };
    return AgmCircle;
}());

AgmCircle._mapOptions = [
    'fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight',
    'visible', 'zIndex', 'clickable'
];
AgmCircle.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'agm-circle'
            },] },
];
/** @nocollapse */
AgmCircle.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__["a" /* CircleManager */], },
]; };
AgmCircle.propDecorators = {
    'latitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'longitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'clickable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['circleDraggable',] },],
    'editable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fillColor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fillOpacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'radius': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeColor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeOpacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokePosition': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeWeight': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'visible': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'centerChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'circleClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'circleDblClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'drag': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'dragEnd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'dragStart': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseDown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseMove': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseOut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseOver': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseUp': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'radiusChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'rightClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=circle.js.map

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmKmlLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_kml_layer_manager__ = __webpack_require__(857);


var layerId = 0;
var AgmKmlLayer = (function () {
    function AgmKmlLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * If true, the layer receives mouse events. Default value is true.
         */
        this.clickable = true;
        /**
         * By default, the input map is centered and zoomed to the bounding box of the contents of the
         * layer.
         * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
         * were never set.
         */
        this.preserveViewport = false;
        /**
         * Whether to render the screen overlays. Default true.
         */
        this.screenOverlays = true;
        /**
         * Suppress the rendering of info windows when layer features are clicked.
         */
        this.suppressInfoWindows = false;
        /**
         * The URL of the KML document to display.
         */
        this.url = null;
        /**
         * The z-index of the layer.
         */
        this.zIndex = null;
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the KML layers default viewport has changed.
         */
        this.defaultViewportChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the KML layer has finished loading.
         * At this point it is safe to read the status property to determine if the layer loaded
         * successfully.
         */
        this.statusChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AgmKmlLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addKmlLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmKmlLayer.prototype.ngOnChanges = function (changes) {
        if (!this._addedToManager) {
            return;
        }
        this._updatePolygonOptions(changes);
    };
    AgmKmlLayer.prototype._updatePolygonOptions = function (changes) {
        var options = Object.keys(changes)
            .filter(function (k) { return AgmKmlLayer._kmlLayerOptions.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
        if (Object.keys(options).length > 0) {
            this._manager.setOptions(this, options);
        }
    };
    AgmKmlLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
            { name: 'defaultviewport_changed', handler: function () { return _this.defaultViewportChange.emit(); } },
            { name: 'status_changed', handler: function () { return _this.statusChange.emit(); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmKmlLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmKmlLayer.prototype.toString = function () { return "AgmKmlLayer-" + this._id.toString(); };
    /** @internal */
    AgmKmlLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteKmlLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return AgmKmlLayer;
}());

AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
AgmKmlLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'agm-kml-layer'
            },] },
];
/** @nocollapse */
AgmKmlLayer.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_kml_layer_manager__["a" /* KmlLayerManager */], },
]; };
AgmKmlLayer.propDecorators = {
    'clickable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'preserveViewport': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'screenOverlays': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'suppressInfoWindows': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'url': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'layerClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'defaultViewportChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'statusChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=kml-layer.js.map

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmDataLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_data_layer_manager__ = __webpack_require__(858);


var layerId = 0;
/**
 * AgmDataLayer enables the user to add data layers to the map.
 *
 * ### Example
 * ```typescript
 * import { Component } from 'angular2/core';
 * import { AgmMap, AgmDataLayer } from
 * 'angular-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [AgmMap, AgmDataLayer],
 *  styles: [`
 *    .agm-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 * <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 * 	  <agm-data-layer [geoJson]="geoJsonObject" (layerClick)="clicked($event)" [style]="styleFunc">
 * 	  </agm-data-layer>
 * </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = -25.274449;
 *   lng: number = 133.775060;
 *   zoom: number = 5;
 *
 * clicked(clickEvent) {
 *    console.log(clickEvent);
 *  }
 *
 *  styleFunc(feature) {
 *    return ({
 *      clickable: false,
 *      fillColor: feature.getProperty('color'),
 *      strokeWeight: 1
 *    });
 *  }
 *
 *  geoJsonObject: Object = {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "G",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "71"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40],
 *              [118.65, -24.76], [118.43, -26.07], [118.78, -27.56], [119.22, -28.57], [120.23, -29.49],
 *              [121.77, -29.87], [123.57, -29.64], [124.45, -29.03], [124.71, -27.95], [124.80, -26.70],
 *              [124.80, -25.60], [123.61, -25.64], [122.56, -25.64], [121.72, -25.72], [121.81, -26.62],
 *              [121.86, -26.98], [122.60, -26.90], [123.57, -27.05], [123.57, -27.68], [123.35, -28.18],
 *              [122.51, -28.38], [121.77, -28.26], [121.02, -27.91], [120.49, -27.21], [120.14, -26.50],
 *              [120.10, -25.64], [120.27, -24.52], [120.67, -23.68], [121.72, -23.32], [122.43, -23.48],
 *              [123.04, -24.04], [124.54, -24.28], [124.58, -23.20], [123.61, -22.14]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "red",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [128.84, -25.76], [128.18, -25.60], [127.96, -25.52], [127.88, -25.52], [127.70, -25.60],
 *              [127.26, -25.79], [126.60, -26.11], [126.16, -26.78], [126.12, -27.68], [126.21, -28.42],
 *              [126.69, -29.49], [127.74, -29.80], [128.80, -29.72], [129.41, -29.03], [129.72, -27.95],
 *              [129.68, -27.21], [129.33, -26.23], [128.84, -25.76]
 *            ],
 *            [
 *              [128.45, -27.44], [128.32, -26.94], [127.70, -26.82], [127.35, -27.05], [127.17, -27.80],
 *              [127.57, -28.22], [128.10, -28.42], [128.49, -27.80], [128.45, -27.44]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "o",
 *          "color": "yellow",
 *          "rank": "15",
 *          "ascii": "111"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [131.87, -25.76], [131.35, -26.07], [130.95, -26.78], [130.82, -27.64], [130.86, -28.53],
 *              [131.26, -29.22], [131.92, -29.76], [132.45, -29.87], [133.06, -29.76], [133.72, -29.34],
 *              [134.07, -28.80], [134.20, -27.91], [134.07, -27.21], [133.81, -26.31], [133.37, -25.83],
 *              [132.71, -25.64], [131.87, -25.76]
 *            ],
 *            [
 *              [133.15, -27.17], [132.71, -26.86], [132.09, -26.90], [131.74, -27.56], [131.79, -28.26],
 *              [132.36, -28.45], [132.93, -28.34], [133.15, -27.76], [133.15, -27.17]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "g",
 *          "color": "blue",
 *          "rank": "7",
 *          "ascii": "103"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [138.12, -25.04], [136.84, -25.16], [135.96, -25.36], [135.26, -25.99], [135, -26.90],
 *              [135.04, -27.91], [135.26, -28.88], [136.05, -29.45], [137.02, -29.49], [137.81, -29.49],
 *              [137.94, -29.99], [137.90, -31.20], [137.85, -32.24], [136.88, -32.69], [136.45, -32.36],
 *              [136.27, -31.80], [134.95, -31.84], [135.17, -32.99], [135.52, -33.43], [136.14, -33.76],
 *              [137.06, -33.83], [138.12, -33.65], [138.86, -33.21], [139.30, -32.28], [139.30, -31.24],
 *              [139.30, -30.14], [139.21, -28.96], [139.17, -28.22], [139.08, -27.41], [139.08, -26.47],
 *              [138.99, -25.40], [138.73, -25.00], [138.12, -25.04]
 *            ],
 *            [
 *              [137.50, -26.54], [136.97, -26.47], [136.49, -26.58], [136.31, -27.13], [136.31, -27.72],
 *              [136.58, -27.99], [137.50, -28.03], [137.68, -27.68], [137.59, -26.78], [137.50, -26.54]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "l",
 *          "color": "green",
 *          "rank": "12",
 *          "ascii": "108"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [140.14, -21.04], [140.31, -29.42], [141.67, -29.49], [141.59, -20.92], [140.14, -21.04]
 *            ]
 *          ]
 *        }
 *      },
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "letter": "e",
 *          "color": "red",
 *          "rank": "5",
 *          "ascii": "101"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [144.14, -27.41], [145.67, -27.52], [146.86, -27.09], [146.82, -25.64], [146.25, -25.04],
 *              [145.45, -24.68], [144.66, -24.60], [144.09, -24.76], [143.43, -25.08], [142.99, -25.40],
 *              [142.64, -26.03], [142.64, -27.05], [142.64, -28.26], [143.30, -29.11], [144.18, -29.57],
 *              [145.41, -29.64], [146.46, -29.19], [146.64, -28.72], [146.82, -28.14], [144.84, -28.42],
 *              [144.31, -28.26], [144.14, -27.41]
 *            ],
 *            [
 *              [144.18, -26.39], [144.53, -26.58], [145.19, -26.62], [145.72, -26.35], [145.81, -25.91],
 *              [145.41, -25.68], [144.97, -25.68], [144.49, -25.64], [144, -25.99], [144.18, -26.39]
 *            ]
 *          ]
 *        }
 *      }
 *    ]
 *  };
 * }
 * ```
 */
var AgmDataLayer = (function () {
    function AgmDataLayer(_manager) {
        this._manager = _manager;
        this._addedToManager = false;
        this._id = (layerId++).toString();
        this._subscriptions = [];
        /**
         * This event is fired when a feature in the layer is clicked.
         */
        this.layerClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * The geoJson to be displayed
         */
        this.geoJson = null;
    }
    AgmDataLayer.prototype.ngOnInit = function () {
        if (this._addedToManager) {
            return;
        }
        this._manager.addDataLayer(this);
        this._addedToManager = true;
        this._addEventListeners();
    };
    AgmDataLayer.prototype._addEventListeners = function () {
        var _this = this;
        var listeners = [
            { name: 'click', handler: function (ev) { return _this.layerClick.emit(ev); } },
        ];
        listeners.forEach(function (obj) {
            var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmDataLayer.prototype.id = function () { return this._id; };
    /** @internal */
    AgmDataLayer.prototype.toString = function () { return "AgmDataLayer-" + this._id.toString(); };
    /** @internal */
    AgmDataLayer.prototype.ngOnDestroy = function () {
        this._manager.deleteDataLayer(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /** @internal */
    AgmDataLayer.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this._addedToManager) {
            return;
        }
        var geoJsonChange = changes['geoJson'];
        if (geoJsonChange) {
            this._manager.updateGeoJson(this, geoJsonChange.currentValue);
        }
        var dataOptions = {};
        AgmDataLayer._dataOptionsAttributes.forEach(function (k) { return dataOptions[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : _this[k]; });
        this._manager.setDataOptions(this, dataOptions);
    };
    return AgmDataLayer;
}());

AgmDataLayer._dataOptionsAttributes = ['style'];
AgmDataLayer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'agm-data-layer'
            },] },
];
/** @nocollapse */
AgmDataLayer.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_data_layer_manager__["a" /* DataLayerManager */], },
]; };
AgmDataLayer.propDecorators = {
    'layerClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'geoJson': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'style': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
};
//# sourceMappingURL=data-layer.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmMarker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_marker_manager__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info_window__ = __webpack_require__(859);



var markerId = 0;
/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarker = (function () {
    function AgmMarker(_markerManager) {
        this._markerManager = _markerManager;
        /**
         * If true, the marker can be dragged. Default value is false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If true, the marker is visible
         */
        this.visible = true;
        /**
         * Whether to automatically open the child info window when the marker is clicked.
         */
        this.openInfoWindow = true;
        /**
         * The marker's opacity between 0.0 and 1.0.
         */
        this.opacity = 1;
        /**
         * All markers are displayed on the map in order of their zIndex, with higher values displaying in
         * front of markers with lower values. By default, markers are displayed according to their
         * vertical position on screen, with lower markers appearing in front of markers further up the
         * screen.
         */
        this.zIndex = 1;
        /**
         * If true, the marker can be clicked. Default value is true.
         */
        // tslint:disable-next-line:no-input-rename
        this.clickable = true;
        /**
         * This event emitter gets emitted when the user clicks on the marker.
         */
        this.markerClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user stops dragging the marker.
         */
        this.dragEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user mouses over the marker.
         */
        this.mouseOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user mouses outside the marker.
         */
        this.mouseOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * @internal
         */
        this.infoWindow = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]();
        this._markerAddedToManger = false;
        this._observableSubscriptions = [];
        this._id = (markerId++).toString();
    }
    /* @internal */
    AgmMarker.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.handleInfoWindowUpdate();
        this.infoWindow.changes.subscribe(function () { return _this.handleInfoWindowUpdate(); });
    };
    AgmMarker.prototype.handleInfoWindowUpdate = function () {
        var _this = this;
        if (this.infoWindow.length > 1) {
            throw new Error('Expected no more than one info window.');
        }
        this.infoWindow.forEach(function (marker) {
            marker.hostMarker = _this;
        });
    };
    /** @internal */
    AgmMarker.prototype.ngOnChanges = function (changes) {
        if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
            return;
        }
        if (!this._markerAddedToManger) {
            this._markerManager.addMarker(this);
            this._markerAddedToManger = true;
            this._addEventListeners();
            return;
        }
        if (changes['latitude'] || changes['longitude']) {
            this._markerManager.updateMarkerPosition(this);
        }
        if (changes['title']) {
            this._markerManager.updateTitle(this);
        }
        if (changes['label']) {
            this._markerManager.updateLabel(this);
        }
        if (changes['draggable']) {
            this._markerManager.updateDraggable(this);
        }
        if (changes['iconUrl']) {
            this._markerManager.updateIcon(this);
        }
        if (changes['opacity']) {
            this._markerManager.updateOpacity(this);
        }
        if (changes['visible']) {
            this._markerManager.updateVisible(this);
        }
        if (changes['zIndex']) {
            this._markerManager.updateZIndex(this);
        }
        if (changes['clickable']) {
            this._markerManager.updateClickable(this);
        }
    };
    AgmMarker.prototype._addEventListeners = function () {
        var _this = this;
        var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
            if (_this.openInfoWindow) {
                _this.infoWindow.forEach(function (infoWindow) { return infoWindow.open(); });
            }
            _this.markerClick.emit(null);
        });
        this._observableSubscriptions.push(cs);
        var ds = this._markerManager.createEventObservable('dragend', this)
            .subscribe(function (e) {
            _this.dragEnd.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(ds);
        var mover = this._markerManager.createEventObservable('mouseover', this)
            .subscribe(function (e) {
            _this.mouseOver.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mover);
        var mout = this._markerManager.createEventObservable('mouseout', this)
            .subscribe(function (e) {
            _this.mouseOut.emit({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() } });
        });
        this._observableSubscriptions.push(mout);
    };
    /** @internal */
    AgmMarker.prototype.id = function () { return this._id; };
    /** @internal */
    AgmMarker.prototype.toString = function () { return 'AgmMarker-' + this._id.toString(); };
    /** @internal */
    AgmMarker.prototype.ngOnDestroy = function () {
        this._markerManager.deleteMarker(this);
        // unsubscribe all registered observable subscriptions
        this._observableSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return AgmMarker;
}());

AgmMarker.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'agm-marker'
            },] },
];
/** @nocollapse */
AgmMarker.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_marker_manager__["a" /* MarkerManager */], },
]; };
AgmMarker.propDecorators = {
    'latitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'longitude': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'title': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'label': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['markerDraggable',] },],
    'iconUrl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'visible': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'openInfoWindow': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'opacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'clickable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['markerClickable',] },],
    'markerClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'dragEnd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseOver': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'mouseOut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'infoWindow': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"], args: [__WEBPACK_IMPORTED_MODULE_2__info_window__["a" /* AgmInfoWindow */],] },],
};
//# sourceMappingURL=marker.js.map

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolygon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_polygon_manager__ = __webpack_require__(855);


/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var AgmPolygon = (function () {
    function AgmPolygon(_polygonManager) {
        this._polygonManager = _polygonManager;
        /**
         * Indicates whether this Polygon handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic
         * property defines the mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control
         * points shown at the vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will
         * follow the curvature of the Earth. When false, edges of the polygon are
         * rendered as straight lines in screen space. Note that the shape of a
         * geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * The ordered sequence of coordinates that designates a closed loop.
         * Unlike polylines, a polygon may consist of one or more paths.
         *  As a result, the paths property may specify one or more arrays of
         * LatLng coordinates. Paths are closed automatically; do not repeat the
         * first vertex of the path as the last vertex. Simple polygons may be
         * defined using a single array of LatLngs. More complex polygons may
         * specify an array of arrays. Any simple arrays are converted into Arrays.
         * Inserting or removing LatLngs from the Array will automatically update
         * the polygon on the map.
         */
        this.paths = [];
        /**
         * This event is fired when the DOM click event is fired on the Polygon.
         */
        this.polyClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polygon.
         */
        this.polyDblClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is repeatedly fired while the user drags the polygon.
         */
        this.polyDrag = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user stops dragging the polygon.
         */
        this.polyDragEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user starts dragging the polygon.
         */
        this.polyDragStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polygon.
         */
        this.polyMouseDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polygon.
         */
        this.polyMouseMove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired on Polygon mouseout.
         */
        this.polyMouseOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired on Polygon mouseover.
         */
        this.polyMouseOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polygon
         */
        this.polyMouseUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This even is fired when the Polygon is right-clicked on.
         */
        this.polyRightClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._polygonAddedToManager = false;
        this._subscriptions = [];
    }
    /** @internal */
    AgmPolygon.prototype.ngAfterContentInit = function () {
        if (!this._polygonAddedToManager) {
            this._init();
        }
    };
    AgmPolygon.prototype.ngOnChanges = function (changes) {
        if (!this._polygonAddedToManager) {
            this._init();
            return;
        }
        this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
    };
    AgmPolygon.prototype._init = function () {
        this._polygonManager.addPolygon(this);
        this._polygonAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolygon.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.polyClick.emit(ev); } },
            { name: 'dbclick', handler: function (ev) { return _this.polyDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.polyDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.polyDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.polyDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.polyMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.polyMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.polyMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.polyMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.polyMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.polyRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    AgmPolygon.prototype._updatePolygonOptions = function (changes) {
        return Object.keys(changes)
            .filter(function (k) { return AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1; })
            .reduce(function (obj, k) {
            obj[k] = changes[k].currentValue;
            return obj;
        }, {});
    };
    /** @internal */
    AgmPolygon.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolygon.prototype.ngOnDestroy = function () {
        this._polygonManager.deletePolygon(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return AgmPolygon;
}());

AgmPolygon._polygonOptionsAttributes = [
    'clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map',
    'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable',
    'editable', 'visible'
];
AgmPolygon.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'agm-polygon'
            },] },
];
/** @nocollapse */
AgmPolygon.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_polygon_manager__["a" /* PolygonManager */], },
]; };
AgmPolygon.propDecorators = {
    'clickable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['polyDraggable',] },],
    'editable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fillColor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'fillOpacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'geodesic': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'paths': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeColor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeOpacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeWeight': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'visible': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'polyClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyDblClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyDrag': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyDragEnd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyDragStart': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyMouseDown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyMouseMove': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyMouseOut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyMouseOver': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyMouseUp': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'polyRightClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
};
//# sourceMappingURL=polygon.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolyline; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_polyline_manager__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyline_point__ = __webpack_require__(860);



var polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmPolyline = (function () {
    function AgmPolyline(_polylineManager) {
        this._polylineManager = _polylineManager;
        /**
         * Indicates whether this Polyline handles mouse events. Defaults to true.
         */
        this.clickable = true;
        /**
         * If set to true, the user can drag this shape over the map. The geodesic property defines the
         * mode of dragging. Defaults to false.
         */
        // tslint:disable-next-line:no-input-rename
        this.draggable = false;
        /**
         * If set to true, the user can edit this shape by dragging the control points shown at the
         * vertices and on each segment. Defaults to false.
         */
        this.editable = false;
        /**
         * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
         * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
         * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
         * are maintained relative to the surface of the earth. Defaults to false.
         */
        this.geodesic = false;
        /**
         * Whether this polyline is visible on the map. Defaults to true.
         */
        this.visible = true;
        /**
         * This event is fired when the DOM click event is fired on the Polyline.
         */
        this.lineClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM dblclick event is fired on the Polyline.
         */
        this.lineDblClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is repeatedly fired while the user drags the polyline.
         */
        this.lineDrag = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user stops dragging the polyline.
         */
        this.lineDragEnd = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the user starts dragging the polyline.
         */
        this.lineDragStart = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mousedown event is fired on the Polyline.
         */
        this.lineMouseDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired when the DOM mousemove event is fired on the Polyline.
         */
        this.lineMouseMove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired on Polyline mouseout.
         */
        this.lineMouseOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired on Polyline mouseover.
         */
        this.lineMouseOver = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This event is fired whe the DOM mouseup event is fired on the Polyline
         */
        this.lineMouseUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        /**
         * This even is fired when the Polyline is right-clicked on.
         */
        this.lineRightClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._polylineAddedToManager = false;
        this._subscriptions = [];
        this._id = (polylineId++).toString();
    }
    /** @internal */
    AgmPolyline.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.points.length) {
            this.points.forEach(function (point) {
                var s = point.positionChanged.subscribe(function () { _this._polylineManager.updatePolylinePoints(_this); });
                _this._subscriptions.push(s);
            });
        }
        if (!this._polylineAddedToManager) {
            this._init();
        }
        var s = this.points.changes.subscribe(function () { return _this._polylineManager.updatePolylinePoints(_this); });
        this._subscriptions.push(s);
        this._polylineManager.updatePolylinePoints(this);
    };
    AgmPolyline.prototype.ngOnChanges = function (changes) {
        if (!this._polylineAddedToManager) {
            this._init();
            return;
        }
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmPolyline._polylineOptionsAttributes.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { return options[k] = changes[k].currentValue; });
        this._polylineManager.setPolylineOptions(this, options);
    };
    AgmPolyline.prototype._init = function () {
        this._polylineManager.addPolyline(this);
        this._polylineAddedToManager = true;
        this._addEventListeners();
    };
    AgmPolyline.prototype._addEventListeners = function () {
        var _this = this;
        var handlers = [
            { name: 'click', handler: function (ev) { return _this.lineClick.emit(ev); } },
            { name: 'dblclick', handler: function (ev) { return _this.lineDblClick.emit(ev); } },
            { name: 'drag', handler: function (ev) { return _this.lineDrag.emit(ev); } },
            { name: 'dragend', handler: function (ev) { return _this.lineDragEnd.emit(ev); } },
            { name: 'dragstart', handler: function (ev) { return _this.lineDragStart.emit(ev); } },
            { name: 'mousedown', handler: function (ev) { return _this.lineMouseDown.emit(ev); } },
            { name: 'mousemove', handler: function (ev) { return _this.lineMouseMove.emit(ev); } },
            { name: 'mouseout', handler: function (ev) { return _this.lineMouseOut.emit(ev); } },
            { name: 'mouseover', handler: function (ev) { return _this.lineMouseOver.emit(ev); } },
            { name: 'mouseup', handler: function (ev) { return _this.lineMouseUp.emit(ev); } },
            { name: 'rightclick', handler: function (ev) { return _this.lineRightClick.emit(ev); } },
        ];
        handlers.forEach(function (obj) {
            var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);
            _this._subscriptions.push(os);
        });
    };
    /** @internal */
    AgmPolyline.prototype._getPoints = function () {
        if (this.points) {
            return this.points.toArray();
        }
        return [];
    };
    /** @internal */
    AgmPolyline.prototype.id = function () { return this._id; };
    /** @internal */
    AgmPolyline.prototype.ngOnDestroy = function () {
        this._polylineManager.deletePolyline(this);
        // unsubscribe all registered observable subscriptions
        this._subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    return AgmPolyline;
}());

AgmPolyline._polylineOptionsAttributes = [
    'draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight',
    'zIndex'
];
AgmPolyline.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: 'agm-polyline'
            },] },
];
/** @nocollapse */
AgmPolyline.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services_managers_polyline_manager__["a" /* PolylineManager */], },
]; };
AgmPolyline.propDecorators = {
    'clickable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'draggable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['polylineDraggable',] },],
    'editable': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'geodesic': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeColor': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeOpacity': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'strokeWeight': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'visible': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'zIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'lineClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineDblClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineDrag': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineDragEnd': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineDragStart': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineMouseDown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineMouseMove': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineMouseOut': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineMouseOver': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineMouseUp': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'lineRightClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'points': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"], args: [__WEBPACK_IMPORTED_MODULE_2__polyline_point__["a" /* AgmPolylinePoint */],] },],
};
//# sourceMappingURL=polyline.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return WindowRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DocumentRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BROWSER_GLOBALS_PROVIDERS; });
var WindowRef = (function () {
    function WindowRef() {
    }
    WindowRef.prototype.getNativeWindow = function () { return window; };
    return WindowRef;
}());

var DocumentRef = (function () {
    function DocumentRef() {
    }
    DocumentRef.prototype.getNativeDocument = function () { return document; };
    return DocumentRef;
}());

var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
//# sourceMappingURL=browser-globals.js.map

/***/ }),

/***/ 922:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives__ = __webpack_require__(923);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmMap", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmCircle", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmInfoWindow", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmKmlLayer", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmDataLayer", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmMarker", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolygon", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolyline", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolylinePoint", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(924);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GoogleMapsAPIWrapper", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CircleManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InfoWindowManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MarkerManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PolygonManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PolylineManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "KmlLayerManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DataLayerManager", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GoogleMapsScriptProtocol", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LAZY_MAPS_API_CONFIG", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LazyMapsAPILoader", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MapsAPILoader", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NoOpMapsAPILoader", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["k"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_module__ = __webpack_require__(926);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AgmCoreModule", function() { return __WEBPACK_IMPORTED_MODULE_2__core_module__["a"]; });
// main modules


// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_map__ = __webpack_require__(875);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__directives_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_circle__ = __webpack_require__(876);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__directives_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_info_window__ = __webpack_require__(859);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__directives_info_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_kml_layer__ = __webpack_require__(877);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__directives_kml_layer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_data_layer__ = __webpack_require__(878);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__directives_data_layer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_marker__ = __webpack_require__(879);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__directives_marker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_polygon__ = __webpack_require__(880);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__directives_polygon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_polyline__ = __webpack_require__(881);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__directives_polyline__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_polyline_point__ = __webpack_require__(860);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__directives_polyline_point__["a"]; });









//# sourceMappingURL=directives.js.map

/***/ }),

/***/ 924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_google_maps_api_wrapper__ = __webpack_require__(836);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__services_google_maps_api_wrapper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__ = __webpack_require__(853);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_managers_info_window_manager__ = __webpack_require__(854);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__services_managers_info_window_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_managers_marker_manager__ = __webpack_require__(848);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_3__services_managers_marker_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_managers_polygon_manager__ = __webpack_require__(855);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_4__services_managers_polygon_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_managers_polyline_manager__ = __webpack_require__(856);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_5__services_managers_polyline_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_managers_kml_layer_manager__ = __webpack_require__(857);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__services_managers_kml_layer_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_managers_data_layer_manager__ = __webpack_require__(858);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__services_managers_data_layer_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__(861);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_maps_api_loader_maps_api_loader__ = __webpack_require__(847);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__services_maps_api_loader_maps_api_loader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_noop_maps_api_loader__ = __webpack_require__(925);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_noop_maps_api_loader__["a"]; });











//# sourceMappingURL=services.js.map

/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoOpMapsAPILoader; });
/**
 * When using the NoOpMapsAPILoader, the Google Maps API must be added to the page via a `<script>`
 * Tag.
 * It's important that the Google Maps API script gets loaded first on the page.
 */
var NoOpMapsAPILoader = (function () {
    function NoOpMapsAPILoader() {
    }
    NoOpMapsAPILoader.prototype.load = function () {
        if (!window.google || !window.google.maps) {
            throw new Error('Google Maps API not loaded on page. Make sure window.google.maps is available!');
        }
        return Promise.resolve();
    };
    return NoOpMapsAPILoader;
}());

//# sourceMappingURL=noop-maps-api-loader.js.map

/***/ }),

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export coreDirectives */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmCoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_map__ = __webpack_require__(875);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_circle__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_info_window__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_marker__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_polygon__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_polyline__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_polyline_point__ = __webpack_require__(860);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_kml_layer__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_data_layer__ = __webpack_require__(878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_maps_api_loader_maps_api_loader__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_browser_globals__ = __webpack_require__(882);














/**
 * @internal
 */
function coreDirectives() {
    return [
        __WEBPACK_IMPORTED_MODULE_1__directives_map__["a" /* AgmMap */], __WEBPACK_IMPORTED_MODULE_4__directives_marker__["a" /* AgmMarker */], __WEBPACK_IMPORTED_MODULE_3__directives_info_window__["a" /* AgmInfoWindow */], __WEBPACK_IMPORTED_MODULE_2__directives_circle__["a" /* AgmCircle */],
        __WEBPACK_IMPORTED_MODULE_5__directives_polygon__["a" /* AgmPolygon */], __WEBPACK_IMPORTED_MODULE_6__directives_polyline__["a" /* AgmPolyline */], __WEBPACK_IMPORTED_MODULE_7__directives_polyline_point__["a" /* AgmPolylinePoint */], __WEBPACK_IMPORTED_MODULE_8__directives_kml_layer__["a" /* AgmKmlLayer */],
        __WEBPACK_IMPORTED_MODULE_9__directives_data_layer__["a" /* AgmDataLayer */]
    ];
}
/**
 * The angular-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
var AgmCoreModule = (function () {
    function AgmCoreModule() {
    }
    /**
     * Please use this method when you register the module at the root level.
     */
    AgmCoreModule.forRoot = function (lazyMapsAPILoaderConfig) {
        return {
            ngModule: AgmCoreModule,
            providers: __WEBPACK_IMPORTED_MODULE_12__utils_browser_globals__["a" /* BROWSER_GLOBALS_PROVIDERS */].concat([
                { provide: __WEBPACK_IMPORTED_MODULE_11__services_maps_api_loader_maps_api_loader__["a" /* MapsAPILoader */], useClass: __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_lazy_maps_api_loader__["c" /* LazyMapsAPILoader */] },
                { provide: __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_lazy_maps_api_loader__["b" /* LAZY_MAPS_API_CONFIG */], useValue: lazyMapsAPILoaderConfig }
            ]),
        };
    };
    return AgmCoreModule;
}());

AgmCoreModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{ declarations: coreDirectives(), exports: coreDirectives() },] },
];
/** @nocollapse */
AgmCoreModule.ctorParameters = function () { return []; };
//# sourceMappingURL=core.module.js.map

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy93aWRnZXRzL3dpZGdldHMvd2lkZ2V0cy5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvY2lyY2xlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9pbmZvLXdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvY2lyY2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9rbWwtbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2RhdGEtbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL21hcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWdvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWxpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS91dGlscy9icm93c2VyLWdsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9ub29wLW1hcHMtYXBpLWxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2NvcmUubW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQWtEO0FBRWxELHNDQUFrRDtBQVdsRDtJQStFSSwwQkFBbUIsSUFBZ0I7UUFBbkMsaUJBRUM7UUFGa0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQTdFbkMsUUFBRyxHQUFXLFNBQVMsQ0FBQztRQUN4QixRQUFHLEdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDMUIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUlwQixrQkFBYSxHQUFHO1lBQ1osSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLEtBQUssRUFBRSxNQUFNO1lBQ2IsU0FBUyxFQUFFLENBQUM7WUFDWixTQUFTLEVBQUUsU0FBUztZQUNwQixTQUFTLEVBQUUsU0FBUztZQUNwQixTQUFTLEVBQUUsRUFBRTtZQUNiLGtCQUFrQixFQUFFLE1BQU07WUFDMUIsVUFBVSxFQUFFLENBQUM7WUFDYixNQUFNLEVBQUUsSUFBSTtTQUNmLENBQUM7UUFFRixrQkFBYSxHQUFHO1lBQ1osUUFBUSxFQUFFLE1BQU07WUFDaEIsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUUsQ0FBQztZQUNYLFVBQVUsRUFBRSxDQUFDO1NBQ2hCLENBQUM7UUFRRixrQkFBYSxHQUFHO1lBQ1osTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsS0FBSztpQkFDZDtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFLElBQUk7b0JBQ1YsTUFBTSxFQUFFLENBQUM7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9EQUFvRDtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULCtCQUErQiwwQ0FBMEMsRUFBRTtBQUMzRSxrQ0FBa0MsaUNBQWlDLEVBQUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsd0JBQXdCLEVBQUU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNyQztBQUNBLHFDOzs7Ozs7Ozs7OztBQzFIaUQ7QUFDdEI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsdUJBQXVCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNB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QyIsImZpbGUiOiIxOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5cclxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29sb3JzL2NvbG9ycy5zZXJ2aWNlJzsgXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC13aWRnZXRzJyxcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3dpZGdldHMuY29tcG9uZW50Lmh0bWwnKSxcclxuICAgIHN0eWxlczogW3JlcXVpcmUoJy4vd2lkZ2V0cy5jb21wb25lbnQuc2NzcycpXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2lkZ2V0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgbGF0OiBudW1iZXIgPSAzMy43OTA4MDc7XHJcbiAgICBsbmc6IG51bWJlciA9IC0xMTcuODM1NzM0O1xyXG4gICAgem9vbTogbnVtYmVyID0gMTQ7XHJcbiAgICBzY3JvbGx3aGVlbCA9IGZhbHNlO1xyXG5cclxuICAgIFxyXG5cclxuICAgIHNwYXJrT3B0aW9uczIgPSB7XHJcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgIGhlaWdodDogODAsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBsaW5lV2lkdGg6IDIsXHJcbiAgICAgICAgbGluZUNvbG9yOiAnI2RkZGRkZCcsXHJcbiAgICAgICAgc3BvdENvbG9yOiAnI2JiYmJiYicsXHJcbiAgICAgICAgZmlsbENvbG9yOiAnJyxcclxuICAgICAgICBoaWdobGlnaHRMaW5lQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICBzcG90UmFkaXVzOiAzLFxyXG4gICAgICAgIHJlc2l6ZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzcGFya09wdGlvbnMzID0ge1xyXG4gICAgICAgIGJhckNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgaGVpZ2h0OiA1MCxcclxuICAgICAgICBiYXJXaWR0aDogNixcclxuICAgICAgICBiYXJTcGFjaW5nOiA2XHJcbiAgICB9O1xyXG5cclxuICAgXHJcblxyXG5cclxuICAgIC8vIFNQTElORVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHNwbGluZURhdGE6IGFueTtcclxuICAgIHNwbGluZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgc2VyaWVzOiB7XHJcbiAgICAgICAgICAgIGxpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3BsaW5lczoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbnNpb246IDAuNCxcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGZpbGw6IDAuNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2VlZScsXHJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxyXG4gICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmY2ZjZmMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXBPcHRzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uIChsYWJlbCwgeCwgeSkgeyByZXR1cm4geCArICcgOiAnICsgeTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeGF4aXM6IHtcclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2ZjZmNmYycsXHJcbiAgICAgICAgICAgIG1vZGU6ICdjYXRlZ29yaWVzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWF4aXM6IHtcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDE1MCwgLy8gb3B0aW9uYWw6IHVzZSBpdCBmb3IgYSBjbGVhciByZXByZXNldGF0aW9uXHJcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZWUnLFxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbjogKGFwcC5sYXlvdXQuaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnKSxcclxuICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2LyogKyAnIHZpc2l0b3JzJyovO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFkb3dTaXplOiAwXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLmdldENoYXJ0RGF0YSgnYXNzZXRzL3NlcnZlci9jaGFydC9zcGxpbmUuanNvbicpLnN1YnNjcmliZShkYXRhID0+IHRoaXMuc3BsaW5lRGF0YSA9IGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJ0RGF0YSh1cmwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJvdXRlci1sb2FkZXIvc3JjIS4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyLXRlbXBsYXRlLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvcm91dGVzL3dpZGdldHMvd2lkZ2V0cy93aWRnZXRzLmNvbXBvbmVudC50cyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjb250ZW50LWhlYWRpbmdcXFwiPldvcmsgVGltZSBSZXBvcnQ8L2Rpdj5cXHJcXG48IS0tIFNUQVJUIHJvdy0tPlxcclxcbjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0xMlxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbCBXaGl0ZUJHXFxcIiBpZD1cXFwicGFuZWxDaGFydDlcXFwiPlxcclxcbiAgICAgICAgICBcXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1oZWFkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtdGl0bGVcXFwiPiA8aDI+WW91ciB0aW1lIHRyZW5kcyA8L2gyPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8cD4gWW91ciBzdGF0cyBhcmUgYmFzZWQgb24geW91ciBlbWFpbCBhbmQgY2FsZW5kYXJIb3cgd2UgY2FsY3VsYXRlPC9wPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC1ib2R5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZmxvdCBbZGF0YXNldF09XFxcInNwbGluZURhdGFcXFwiIFtvcHRpb25zXT1cXFwic3BsaW5lT3B0aW9uc1xcXCIgaGVpZ2h0PVxcXCIzMDBcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDExODVcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsIm1vZHVsZS5leHBvcnRzID0gXCJcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDExODZcbi8vIG1vZHVsZSBjaHVua3MgPSAxOSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQWdtQ29yZU1vZHVsZSB9IGZyb20gJ0BhZ20vY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IFdpZGdldHNDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvd2lkZ2V0cy5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7IHBhdGg6ICcnLCBjb21wb25lbnQ6IFdpZGdldHNDb21wb25lbnQgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXHJcbiAgICAgICAgQWdtQ29yZU1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAgICAgYXBpS2V5OiAnQUl6YVN5Qk5zNDJSdF9DeXhBcWRiSUJLMGE1VXQ4M1FpYXVFU1BBJ1xyXG4gICAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbV2lkZ2V0c0NvbXBvbmVudF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaWRnZXRzTW9kdWxlIHsgfVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yb3V0ZXItbG9hZGVyL3NyYyEuL25vZGVfbW9kdWxlcy9hbmd1bGFyMi10ZW1wbGF0ZS1sb2FkZXIhLi9DbGllbnRBcHAvYXBwL3JvdXRlcy93aWRnZXRzL3dpZGdldHMubW9kdWxlLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgaGFuZGxlcyB0aGUgY29tbXVuaWNhdGlvbiB3aXRoIHRoZSBHb29nbGUgTWFwcyBKYXZhc2NyaXB0XG4gKiBBUEkgdjNcbiAqL1xudmFyIEdvb2dsZU1hcHNBUElXcmFwcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHb29nbGVNYXBzQVBJV3JhcHBlcihfbG9hZGVyLCBfem9uZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sb2FkZXIgPSBfbG9hZGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX21hcCA9XG4gICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyBfdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcbiAgICB9XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmNyZWF0ZU1hcCA9IGZ1bmN0aW9uIChlbCwgbWFwT3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsLCBtYXBPcHRpb25zKTtcbiAgICAgICAgICAgIF90aGlzLl9tYXBSZXNvbHZlcihtYXApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5zZXRNYXBPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG0pIHsgbS5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBnb29nbGUgbWFwIG1hcmtlciB3aXRoIHRoZSBtYXAgY29udGV4dFxuICAgICAqL1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbiAob3B0aW9ucywgYWRkVG9NYXApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgaWYgKGFkZFRvTWFwID09PSB2b2lkIDApIHsgYWRkVG9NYXAgPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICBpZiAoYWRkVG9NYXApIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm1hcCA9IG1hcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVJbmZvV2luZG93ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBnb29nbGUubWFwLkNpcmNsZSBmb3IgdGhlIGN1cnJlbnQgbWFwLlxuICAgICAqL1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgb3B0aW9ucy5tYXAgPSBtYXA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLkNpcmNsZShvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlUG9seWxpbmUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVNYXAoKS50aGVuKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG9wdGlvbnMpO1xuICAgICAgICAgICAgbGluZS5zZXRNYXAobWFwKTtcbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVQb2x5Z29uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlTWFwKCkudGhlbihmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICB2YXIgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKG9wdGlvbnMpO1xuICAgICAgICAgICAgcG9seWdvbi5zZXRNYXAobWFwKTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZ29vZ2xlLm1hcC5EYXRhIGxheWVyIGZvciB0aGUgY3VycmVudCBtYXBcbiAgICAgKi9cbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlRGF0YUxheWVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBnb29nbGUubWFwcy5EYXRhKG9wdGlvbnMpO1xuICAgICAgICAgICAgZGF0YS5zZXRNYXAobSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSBpbnNpdGUgYSBQb2x5Z29uIHBhdGguXG4gICAgICovXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmNvbnRhaW5zTG9jYXRpb24gPSBmdW5jdGlvbiAobGF0TG5nLCBwb2x5Z29uKSB7XG4gICAgICAgIHJldHVybiBnb29nbGUubWFwcy5nZW9tZXRyeS5wb2x5LmNvbnRhaW5zTG9jYXRpb24obGF0TG5nLCBwb2x5Z29uKTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5zdWJzY3JpYmVUb01hcEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGFyZykgeyBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChhcmcpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24gKGxhdExuZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLnNldENlbnRlcihsYXRMbmcpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5nZXRab29tID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLmdldFpvb20oKTsgfSk7IH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5nZXRCb3VuZHMoKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuc2V0Wm9vbSA9IGZ1bmN0aW9uICh6b29tKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAuc2V0Wm9vbSh6b29tKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLmdldENlbnRlcigpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5wYW5UbyA9IGZ1bmN0aW9uIChsYXRMbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5wYW5UbyhsYXRMbmcpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5wYW5CeSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAucGFuQnkoeCwgeSk7IH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmZpdEJvdW5kcyA9IGZ1bmN0aW9uIChsYXRMbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5maXRCb3VuZHMobGF0TG5nKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUucGFuVG9Cb3VuZHMgPSBmdW5jdGlvbiAobGF0TG5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAucGFuVG9Cb3VuZHMobGF0TG5nKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYXRpdmUgR29vZ2xlIE1hcHMgTWFwIGluc3RhbmNlLiBCZSBjYXJlZnVsIHdoZW4gdXNpbmcgdGhpcyBpbnN0YW5jZSBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuZ2V0TmF0aXZlTWFwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwOyB9O1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIHRoZSBnaXZlbiBldmVudCBuYW1lIG9uIHRoZSBtYXAgaW5zdGFuY2UuXG4gICAgICovXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLnRyaWdnZXJNYXBFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG0sIGV2ZW50TmFtZSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEdvb2dsZU1hcHNBUElXcmFwcGVyO1xufSgpKTtcbmV4cG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH07XG5Hb29nbGVNYXBzQVBJV3JhcHBlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuR29vZ2xlTWFwc0FQSVdyYXBwZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBNYXBzQVBJTG9hZGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdvb2dsZS1tYXBzLWFwaS13cmFwcGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlci5qc1xuLy8gbW9kdWxlIGlkID0gODM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG52YXIgTWFwc0FQSUxvYWRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFwc0FQSUxvYWRlcigpIHtcbiAgICB9XG4gICAgcmV0dXJuIE1hcHNBUElMb2FkZXI7XG59KCkpO1xuZXhwb3J0IHsgTWFwc0FQSUxvYWRlciB9O1xuTWFwc0FQSUxvYWRlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuTWFwc0FQSUxvYWRlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy1hcGktbG9hZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyAxOCAxOSIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xudmFyIE1hcmtlck1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hcmtlck1hbmFnZXIoX21hcHNXcmFwcGVyLCBfem9uZSkge1xuICAgICAgICB0aGlzLl9tYXBzV3JhcHBlciA9IF9tYXBzV3JhcHBlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9tYXJrZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVNYXJrZXIgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtID0gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbWFya2VyIGFscmVhZHkgZGVsZXRlZFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG0uc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9tYXJrZXJzLmRlbGV0ZShtYXJrZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlTWFya2VyUG9zaXRpb24gPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0UG9zaXRpb24oeyBsYXQ6IG1hcmtlci5sYXRpdHVkZSwgbG5nOiBtYXJrZXIubG9uZ2l0dWRlIH0pOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVRpdGxlID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldFRpdGxlKG1hcmtlci50aXRsZSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlTGFiZWwgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgbS5zZXRMYWJlbChtYXJrZXIubGFiZWwpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZURyYWdnYWJsZSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXREcmFnZ2FibGUobWFya2VyLmRyYWdnYWJsZSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlSWNvbiA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRJY29uKG1hcmtlci5pY29uVXJsKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVPcGFjaXR5ID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldE9wYWNpdHkobWFya2VyLm9wYWNpdHkpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVZpc2libGUgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0VmlzaWJsZShtYXJrZXIudmlzaWJsZSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlWkluZGV4ID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldFpJbmRleChtYXJrZXIuekluZGV4KTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVDbGlja2FibGUgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0Q2xpY2thYmxlKG1hcmtlci5jbGlja2FibGUpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLmFkZE1hcmtlciA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgdmFyIG1hcmtlclByb21pc2UgPSB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVNYXJrZXIoe1xuICAgICAgICAgICAgcG9zaXRpb246IHsgbGF0OiBtYXJrZXIubGF0aXR1ZGUsIGxuZzogbWFya2VyLmxvbmdpdHVkZSB9LFxuICAgICAgICAgICAgbGFiZWw6IG1hcmtlci5sYWJlbCxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogbWFya2VyLmRyYWdnYWJsZSxcbiAgICAgICAgICAgIGljb246IG1hcmtlci5pY29uVXJsLFxuICAgICAgICAgICAgb3BhY2l0eTogbWFya2VyLm9wYWNpdHksXG4gICAgICAgICAgICB2aXNpYmxlOiBtYXJrZXIudmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogbWFya2VyLnpJbmRleCxcbiAgICAgICAgICAgIHRpdGxlOiBtYXJrZXIudGl0bGUsXG4gICAgICAgICAgICBjbGlja2FibGU6IG1hcmtlci5jbGlja2FibGVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX21hcmtlcnMuc2V0KG1hcmtlciwgbWFya2VyUHJvbWlzZSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS5nZXROYXRpdmVNYXJrZXIgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbWFya2VyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFya2VyTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBNYXJrZXJNYW5hZ2VyIH07XG5NYXJrZXJNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5NYXJrZXJNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFya2VyLW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyAxOCAxOSIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbnZhciBDaXJjbGVNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaXJjbGVNYW5hZ2VyKF9hcGlXcmFwcGVyLCBfem9uZSkge1xuICAgICAgICB0aGlzLl9hcGlXcmFwcGVyID0gX2FwaVdyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fY2lyY2xlcyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuYWRkQ2lyY2xlID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICB0aGlzLl9jaXJjbGVzLnNldChjaXJjbGUsIHRoaXMuX2FwaVdyYXBwZXIuY3JlYXRlQ2lyY2xlKHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlIH0sXG4gICAgICAgICAgICBjbGlja2FibGU6IGNpcmNsZS5jbGlja2FibGUsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGNpcmNsZS5kcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogY2lyY2xlLmVkaXRhYmxlLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBjaXJjbGUuZmlsbENvbG9yLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IGNpcmNsZS5maWxsT3BhY2l0eSxcbiAgICAgICAgICAgIHJhZGl1czogY2lyY2xlLnJhZGl1cyxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBjaXJjbGUuc3Ryb2tlQ29sb3IsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBjaXJjbGUuc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgICAgIHN0cm9rZVBvc2l0aW9uOiBjaXJjbGUuc3Ryb2tlUG9zaXRpb24sXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IGNpcmNsZS5zdHJva2VXZWlnaHQsXG4gICAgICAgICAgICB2aXNpYmxlOiBjaXJjbGUudmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogY2lyY2xlLnpJbmRleFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBjaXJjbGUgZnJvbSB0aGUgbWFwLlxuICAgICAqL1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgYy5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICBfdGhpcy5fY2lyY2xlcy5kZWxldGUoY2lyY2xlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKGNpcmNsZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmdldEJvdW5kcygpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5nZXRDZW50ZXIoKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5nZXRSYWRpdXMgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuZ2V0UmFkaXVzKCk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldENlbnRlcih7IGxhdDogY2lyY2xlLmxhdGl0dWRlLCBsbmc6IGNpcmNsZS5sb25naXR1ZGUgfSk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0RWRpdGFibGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc2V0RWRpdGFibGUoY2lyY2xlLmVkaXRhYmxlKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5zZXREcmFnZ2FibGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc2V0RHJhZ2dhYmxlKGNpcmNsZS5kcmFnZ2FibGUpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnNldFZpc2libGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc2V0VmlzaWJsZShjaXJjbGUudmlzaWJsZSk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0UmFkaXVzID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldFJhZGl1cyhjaXJjbGUucmFkaXVzKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjaXJjbGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIF90aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2lyY2xlTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBDaXJjbGVNYW5hZ2VyIH07XG5DaXJjbGVNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5DaXJjbGVNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2lyY2xlLW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyAxOCAxOSIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuL21hcmtlci1tYW5hZ2VyJztcbnZhciBJbmZvV2luZG93TWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5mb1dpbmRvd01hbmFnZXIoX21hcHNXcmFwcGVyLCBfem9uZSwgX21hcmtlck1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlciA9IF9tYXJrZXJNYW5hZ2VyO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmRlbGV0ZUluZm9XaW5kb3cgPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaVdpbmRvdyA9IHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KTtcbiAgICAgICAgaWYgKGlXaW5kb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gaW5mbyB3aW5kb3cgYWxyZWFkeSBkZWxldGVkXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlXaW5kb3cudGhlbihmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9pbmZvV2luZG93cy5kZWxldGUoaW5mb1dpbmRvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuc2V0UG9zaXRpb24oe1xuICAgICAgICAgICAgbGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLFxuICAgICAgICAgICAgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZVxuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuc2V0WkluZGV4ID0gZnVuY3Rpb24gKGluZm9XaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuc2V0WkluZGV4KGluZm9XaW5kb3cuekluZGV4KTsgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChpbmZvV2luZG93KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAodykge1xuICAgICAgICAgICAgaWYgKGluZm9XaW5kb3cuaG9zdE1hcmtlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9tYXJrZXJNYW5hZ2VyLmdldE5hdGl2ZU1hcmtlcihpbmZvV2luZG93Lmhvc3RNYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gdy5vcGVuKG1hcCwgbWFya2VyKTsgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gdy5vcGVuKG1hcCk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChpbmZvV2luZG93KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAodykgeyByZXR1cm4gdy5jbG9zZSgpOyB9KTtcbiAgICB9O1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKGluZm9XaW5kb3csIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmFkZEluZm9XaW5kb3cgPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IGluZm9XaW5kb3cuY29udGVudCxcbiAgICAgICAgICAgIG1heFdpZHRoOiBpbmZvV2luZG93Lm1heFdpZHRoLFxuICAgICAgICAgICAgekluZGV4OiBpbmZvV2luZG93LnpJbmRleCxcbiAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiBpbmZvV2luZG93LmRpc2FibGVBdXRvUGFuXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgaW5mb1dpbmRvdy5sYXRpdHVkZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGluZm9XaW5kb3cubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHsgbGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLCBsbmc6IGluZm9XaW5kb3cubG9uZ2l0dWRlIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZm9XaW5kb3dQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd3Muc2V0KGluZm9XaW5kb3csIGluZm9XaW5kb3dQcm9taXNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHb29nbGUgTWFwcyBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIEluZm9XaW5kb3cgYXMgYW4gT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBpbmZvV2luZG93KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIGkuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmZvV2luZG93TWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9O1xuSW5mb1dpbmRvd01hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkluZm9XaW5kb3dNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG4gICAgeyB0eXBlOiBNYXJrZXJNYW5hZ2VyLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZm8td2luZG93LW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDg1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xudmFyIFBvbHlnb25NYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb2x5Z29uTWFuYWdlcihfbWFwc1dyYXBwZXIsIF96b25lKSB7XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyID0gX21hcHNXcmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX3BvbHlnb25zID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBQb2x5Z29uTWFuYWdlci5wcm90b3R5cGUuYWRkUG9seWdvbiA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZVBvbHlnb24oe1xuICAgICAgICAgICAgY2xpY2thYmxlOiBwYXRoLmNsaWNrYWJsZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogcGF0aC5kcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogcGF0aC5lZGl0YWJsZSxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogcGF0aC5maWxsQ29sb3IsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogcGF0aC5maWxsT3BhY2l0eSxcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBwYXRoLmdlb2Rlc2ljLFxuICAgICAgICAgICAgcGF0aHM6IHBhdGgucGF0aHMsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogcGF0aC5zdHJva2VDb2xvcixcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IHBhdGguc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogcGF0aC5zdHJva2VXZWlnaHQsXG4gICAgICAgICAgICB2aXNpYmxlOiBwYXRoLnZpc2libGUsXG4gICAgICAgICAgICB6SW5kZXg6IHBhdGguekluZGV4LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcG9seWdvbnMuc2V0KHBhdGgsIHBvbHlnb25Qcm9taXNlKTtcbiAgICB9O1xuICAgIFBvbHlnb25NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVQb2x5Z29uID0gZnVuY3Rpb24gKHBvbHlnb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbik7XG4gICAgICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS50aGVuKGZ1bmN0aW9uIChsKSB7IHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyBsLnNldFBhdGhzKHBvbHlnb24ucGF0aHMpOyB9KTsgfSk7XG4gICAgfTtcbiAgICBQb2x5Z29uTWFuYWdlci5wcm90b3R5cGUuc2V0UG9seWdvbk9wdGlvbnMgPSBmdW5jdGlvbiAocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24gKGwpIHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIFBvbHlnb25NYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVQb2x5Z29uID0gZnVuY3Rpb24gKHBhdGhzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGhzKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4oZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGwuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9wb2x5Z29ucy5kZWxldGUocGF0aHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUG9seWdvbk1hbmFnZXIucHJvdG90eXBlLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgX3RoaXMuX3BvbHlnb25zLmdldChwYXRoKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICAgICAgbC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKTsgfSk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFBvbHlnb25NYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IFBvbHlnb25NYW5hZ2VyIH07XG5Qb2x5Z29uTWFuYWdlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuUG9seWdvbk1hbmFnZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgfSxcbiAgICB7IHR5cGU6IE5nWm9uZSwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2x5Z29uLW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gODU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgUG9seWxpbmVNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb2x5bGluZU1hbmFnZXIoX21hcHNXcmFwcGVyLCBfem9uZSkge1xuICAgICAgICB0aGlzLl9tYXBzV3JhcHBlciA9IF9tYXBzV3JhcHBlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9wb2x5bGluZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHZhciBwYXRoID0gbGluZS5fZ2V0UG9pbnRzKCkubWFwKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbGF0OiBwb2ludC5sYXRpdHVkZSwgbG5nOiBwb2ludC5sb25naXR1ZGUgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH07XG4gICAgUG9seWxpbmVNYW5hZ2VyLnByb3RvdHlwZS5hZGRQb2x5bGluZSA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHZhciBwYXRoID0gUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0UG9pbnRzKGxpbmUpO1xuICAgICAgICB2YXIgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWxpbmUoe1xuICAgICAgICAgICAgY2xpY2thYmxlOiBsaW5lLmNsaWNrYWJsZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogbGluZS5kcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogbGluZS5lZGl0YWJsZSxcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBsaW5lLmdlb2Rlc2ljLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IGxpbmUuc3Ryb2tlQ29sb3IsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBsaW5lLnN0cm9rZU9wYWNpdHksXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IGxpbmUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgdmlzaWJsZTogbGluZS52aXNpYmxlLFxuICAgICAgICAgICAgekluZGV4OiBsaW5lLnpJbmRleCxcbiAgICAgICAgICAgIHBhdGg6IHBhdGhcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5zZXQobGluZSwgcG9seWxpbmVQcm9taXNlKTtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUudXBkYXRlUG9seWxpbmVQb2ludHMgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGF0aCA9IFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyhsaW5lKTtcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobCkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgbC5zZXRQYXRoKHBhdGgpOyB9KTsgfSk7XG4gICAgfTtcbiAgICBQb2x5bGluZU1hbmFnZXIucHJvdG90eXBlLnNldFBvbHlsaW5lT3B0aW9ucyA9IGZ1bmN0aW9uIChsaW5lLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpLnRoZW4oZnVuY3Rpb24gKGwpIHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUuZGVsZXRlUG9seWxpbmUgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcG9seWxpbmVzLmRlbGV0ZShsaW5lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGluZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICAgICAgbC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKTsgfSk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFBvbHlsaW5lTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfTtcblBvbHlsaW5lTWFuYWdlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuUG9seWxpbmVNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9seWxpbmUtbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gODU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbi8qKlxuICogTWFuYWdlcyBhbGwgS01MIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxuICovXG52YXIgS21sTGF5ZXJNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBLbWxMYXllck1hbmFnZXIoX3dyYXBwZXIsIF96b25lKSB7XG4gICAgICAgIHRoaXMuX3dyYXBwZXIgPSBfd3JhcHBlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9sYXllcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgS01MIExheWVyIHRvIHRoZSBtYXAuXG4gICAgICovXG4gICAgS21sTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5hZGRLbWxMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuS21sTGF5ZXIoe1xuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogbGF5ZXIuY2xpY2thYmxlLFxuICAgICAgICAgICAgICAgIG1hcDogbSxcbiAgICAgICAgICAgICAgICBwcmVzZXJ2ZVZpZXdwb3J0OiBsYXllci5wcmVzZXJ2ZVZpZXdwb3J0LFxuICAgICAgICAgICAgICAgIHNjcmVlbk92ZXJsYXlzOiBsYXllci5zY3JlZW5PdmVybGF5cyxcbiAgICAgICAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzOiBsYXllci5zdXBwcmVzc0luZm9XaW5kb3dzLFxuICAgICAgICAgICAgICAgIHVybDogbGF5ZXIudXJsLFxuICAgICAgICAgICAgICAgIHpJbmRleDogbGF5ZXIuekluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcbiAgICB9O1xuICAgIEttbExheWVyTWFuYWdlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChsYXllciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7IHJldHVybiBsLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgS21sTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVLbWxMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICBsLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgIF90aGlzLl9sYXllcnMuZGVsZXRlKGxheWVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBLbWxMYXllciBhcyBhbiBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgS21sTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIG0uYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBLbWxMYXllck1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH07XG5LbWxMYXllck1hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkttbExheWVyTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWttbC1sYXllci1tYW5hZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gODU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbi8qKlxuICogTWFuYWdlcyBhbGwgRGF0YSBMYXllcnMgZm9yIGEgR29vZ2xlIE1hcCBpbnN0YW5jZS5cbiAqL1xudmFyIERhdGFMYXllck1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGFMYXllck1hbmFnZXIoX3dyYXBwZXIsIF96b25lKSB7XG4gICAgICAgIHRoaXMuX3dyYXBwZXIgPSBfd3JhcHBlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9sYXllcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgRGF0YSBMYXllciB0byB0aGUgbWFwLlxuICAgICAqL1xuICAgIERhdGFMYXllck1hbmFnZXIucHJvdG90eXBlLmFkZERhdGFMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZURhdGFMYXllcih7XG4gICAgICAgICAgICBzdHlsZTogbGF5ZXIuc3R5bGVcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBpZiAobGF5ZXIuZ2VvSnNvbikge1xuICAgICAgICAgICAgICAgIF90aGlzLmdldERhdGFGZWF0dXJlcyhkLCBsYXllci5nZW9Kc29uKS50aGVuKGZ1bmN0aW9uIChmZWF0dXJlcykgeyByZXR1cm4gZC5mZWF0dXJlcyA9IGZlYXR1cmVzOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllciwgbmV3TGF5ZXIpO1xuICAgIH07XG4gICAgRGF0YUxheWVyTWFuYWdlci5wcm90b3R5cGUuZGVsZXRlRGF0YUxheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgIGwuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgX3RoaXMuX2xheWVycy5kZWxldGUobGF5ZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGFMYXllck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZUdlb0pzb24gPSBmdW5jdGlvbiAobGF5ZXIsIGdlb0pzb24pIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgbC5mb3JFYWNoKGZ1bmN0aW9uIChmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgbC5yZW1vdmUoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gbC5mZWF0dXJlcy5pbmRleE9mKGZlYXR1cmUsIDApO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGwuZmVhdHVyZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLmdldERhdGFGZWF0dXJlcyhsLCBnZW9Kc29uKS50aGVuKGZ1bmN0aW9uIChmZWF0dXJlcykgeyByZXR1cm4gbC5mZWF0dXJlcyA9IGZlYXR1cmVzOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5zZXREYXRhT3B0aW9ucyA9IGZ1bmN0aW9uIChsYXllciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICBsLnNldENvbnRyb2xQb3NpdGlvbihvcHRpb25zLmNvbnRyb2xQb3NpdGlvbik7XG4gICAgICAgICAgICBsLnNldENvbnRyb2xzKG9wdGlvbnMuY29udHJvbHMpO1xuICAgICAgICAgICAgbC5zZXREcmF3aW5nTW9kZShvcHRpb25zLmRyYXdpbmdNb2RlKTtcbiAgICAgICAgICAgIGwuc2V0U3R5bGUob3B0aW9ucy5zdHlsZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdvb2dsZSBNYXBzIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gRGF0YUxheWVyIGFzIGFuIE9ic2VydmFibGVcbiAgICAgKi9cbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIGQuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgZmVhdHVyZXMgZnJvbSBhIGdlb0pzb24gdXNpbmcgZ29vZ2xlLm1hcHMgRGF0YSBDbGFzc1xuICAgICAqIEBwYXJhbSBkIDogZ29vZ2xlLm1hcHMuRGF0YSBjbGFzcyBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSBnZW9Kc29uIDogdXJsIG9yIGdlb2pzb24gb2JqZWN0XG4gICAgICovXG4gICAgRGF0YUxheWVyTWFuYWdlci5wcm90b3R5cGUuZ2V0RGF0YUZlYXR1cmVzID0gZnVuY3Rpb24gKGQsIGdlb0pzb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZ2VvSnNvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmVhdHVyZXMgPSBkLmFkZEdlb0pzb24oZ2VvSnNvbik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmVhdHVyZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGdlb0pzb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZC5sb2FkR2VvSnNvbihnZW9Kc29uLCBudWxsLCByZXNvbHZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkltcG9zc2libGUgdG8gZXh0cmFjdCBmZWF0dXJlcyBmcm9tIGdlb0pzb246IHdyb25nIGFyZ3VtZW50IHR5cGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIERhdGFMYXllck1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9O1xuRGF0YUxheWVyTWFuYWdlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuRGF0YUxheWVyTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGEtbGF5ZXItbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NThcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyAxOCAxOSIsImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXInO1xudmFyIGluZm9XaW5kb3dJZCA9IDA7XG4vKipcbiAqIEFnbUluZm9XaW5kb3cgcmVuZGVycyBhIGluZm8gd2luZG93IGluc2lkZSBhIHtAbGluayBBZ21NYXJrZXJ9IG9yIHN0YW5kYWxvbmUuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cbiAqICAgICAgICA8YWdtLWluZm8td2luZG93IFtkaXNhYmxlQXV0b1Bhbl09XCJ0cnVlXCI+XG4gKiAgICAgICAgICBIaSwgdGhpcyBpcyB0aGUgY29udGVudCBvZiB0aGUgPHN0cm9uZz5pbmZvIHdpbmRvdzwvc3Ryb25nPlxuICogICAgICAgIDwvYWdtLWluZm8td2luZG93PlxuICogICAgICA8L2FnbS1tYXJrZXI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG52YXIgQWdtSW5mb1dpbmRvdyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtSW5mb1dpbmRvdyhfaW5mb1dpbmRvd01hbmFnZXIsIF9lbCkge1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlciA9IF9pbmZvV2luZG93TWFuYWdlcjtcbiAgICAgICAgdGhpcy5fZWwgPSBfZWw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBvcGVuIHN0YXRlIGZvciB0aGUgSW5mb1dpbmRvdy4gWW91IGNhbiBhbHNvIGNhbGwgdGhlIG9wZW4oKSBhbmQgY2xvc2UoKSBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGluZm8gd2luZG93IGlzIGNsb3NlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5mb1dpbmRvd0Nsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSAoaW5mb1dpbmRvd0lkKyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZ20taW5mby13aW5kb3ctY29udGVudCcpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5hZGRJbmZvV2luZG93KHRoaXMpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pICYmIHR5cGVvZiB0aGlzLmxhdGl0dWRlID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0UG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3pJbmRleCddKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5zZXRaSW5kZXgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2lzT3BlbiddKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzKTtcbiAgICB9O1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ2Nsb3NlY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBfdGhpcy5pbmZvV2luZG93Q2xvc2UuZW1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLl91cGRhdGVPcGVuU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XG4gICAgfTtcbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5fc2V0SW5mb1dpbmRvd09wdGlvbnMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gQWdtSW5mb1dpbmRvdy5faW5mb1dpbmRvd09wdGlvbnNJbnB1dHMuaW5kZXhPZihrKSAhPT0gLTE7IH0pO1xuICAgICAgICBvcHRpb25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faW5mb1dpbmRvd01hbmFnZXIub3Blbih0aGlzKTsgfTtcbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxuICAgICAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuY2xvc2UodGhpcykudGhlbihmdW5jdGlvbiAoKSB7IF90aGlzLmluZm9XaW5kb3dDbG9zZS5lbWl0KCk7IH0pO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faWQ7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0FnbUluZm9XaW5kb3ctJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5kZWxldGVJbmZvV2luZG93KHRoaXMpOyB9O1xuICAgIHJldHVybiBBZ21JbmZvV2luZG93O1xufSgpKTtcbmV4cG9ydCB7IEFnbUluZm9XaW5kb3cgfTtcbkFnbUluZm9XaW5kb3cuX2luZm9XaW5kb3dPcHRpb25zSW5wdXRzID0gWydkaXNhYmxlQXV0b1BhbicsICdtYXhXaWR0aCddO1xuQWdtSW5mb1dpbmRvdy5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYWdtLWluZm8td2luZG93JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdhZ20taW5mby13aW5kb3ctY29udGVudCc+XFxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxcbiAgICA8L2Rpdj5cXG4gIFwiXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbUluZm9XaW5kb3cuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBJbmZvV2luZG93TWFuYWdlciwgfSxcbiAgICB7IHR5cGU6IEVsZW1lbnRSZWYsIH0sXG5dOyB9O1xuQWdtSW5mb1dpbmRvdy5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbGF0aXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2xvbmdpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZGlzYWJsZUF1dG9QYW4nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWF4V2lkdGgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2lzT3Blbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnaW5mb1dpbmRvd0Nsb3NlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmZvLXdpbmRvdy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9pbmZvLXdpbmRvdy5qc1xuLy8gbW9kdWxlIGlkID0gODU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBBZ21Qb2x5bGluZVBvaW50IHJlcHJlc2VudHMgb25lIGVsZW1lbnQgb2YgYSBwb2x5bGluZSB3aXRoaW4gYSAge0BsaW5rXG4gKiBTZW1iR29vZ2xlTWFwUG9seWxpbmV9XG4gKi9cbnZhciBBZ21Qb2x5bGluZVBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21Qb2x5bGluZVBvaW50KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgY2hhbmdlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICBBZ21Qb2x5bGluZVBvaW50LnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbGF0OiBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBsbmc6IGNoYW5nZXNbJ2xvbmdpdHVkZSddLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkLmVtaXQocG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQWdtUG9seWxpbmVQb2ludDtcbn0oKSk7XG5leHBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH07XG5BZ21Qb2x5bGluZVBvaW50LmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7IHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lLXBvaW50JyB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbVBvbHlsaW5lUG9pbnQuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbkFnbVBvbHlsaW5lUG9pbnQucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2xhdGl0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsb25naXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Bvc2l0aW9uQ2hhbmdlZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9seWxpbmUtcG9pbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQuanNcbi8vIG1vZHVsZSBpZCA9IDg2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudFJlZiwgV2luZG93UmVmIH0gZnJvbSAnLi4vLi4vdXRpbHMvYnJvd3Nlci1nbG9iYWxzJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL21hcHMtYXBpLWxvYWRlcic7XG5leHBvcnQgdmFyIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbDtcbihmdW5jdGlvbiAoR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sKSB7XG4gICAgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW0dvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtcIkhUVFBcIl0gPSAxXSA9IFwiSFRUUFwiO1xuICAgIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2xbXCJIVFRQU1wiXSA9IDJdID0gXCJIVFRQU1wiO1xuICAgIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2xbXCJBVVRPXCJdID0gM10gPSBcIkFVVE9cIjtcbn0pKEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbCB8fCAoR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sID0ge30pKTtcbi8qKlxuICogVG9rZW4gZm9yIHRoZSBjb25maWcgb2YgdGhlIExhenlNYXBzQVBJTG9hZGVyLiBQbGVhc2UgcHJvdmlkZSBhbiBvYmplY3Qgb2YgdHlwZSB7QGxpbmtcbiAqIExhenlNYXBzQVBJTG9hZGVyQ29uZmlnfS5cbiAqL1xuZXhwb3J0IHZhciBMQVpZX01BUFNfQVBJX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbignYW5ndWxhci1nb29nbGUtbWFwcyBMQVpZX01BUFNfQVBJX0NPTkZJRycpO1xudmFyIExhenlNYXBzQVBJTG9hZGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTGF6eU1hcHNBUElMb2FkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTGF6eU1hcHNBUElMb2FkZXIoY29uZmlnLCB3LCBkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9jb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIF90aGlzLl93aW5kb3dSZWYgPSB3O1xuICAgICAgICBfdGhpcy5fZG9jdW1lbnRSZWYgPSBkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIExhenlNYXBzQVBJTG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2NyaXB0ID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNhbGxiYWNrTmFtZSA9IFwiYW5ndWxhcjJHb29nbGVNYXBzTGF6eU1hcHNBUElMb2FkZXJcIjtcbiAgICAgICAgc2NyaXB0LnNyYyA9IHRoaXMuX2dldFNjcmlwdFNyYyhjYWxsYmFja05hbWUpO1xuICAgICAgICB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLl93aW5kb3dSZWYuZ2V0TmF0aXZlV2luZG93KClbY2FsbGJhY2tOYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldE5hdGl2ZURvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NyaXB0TG9hZGluZ1Byb21pc2U7XG4gICAgfTtcbiAgICBMYXp5TWFwc0FQSUxvYWRlci5wcm90b3R5cGUuX2dldFNjcmlwdFNyYyA9IGZ1bmN0aW9uIChjYWxsYmFja05hbWUpIHtcbiAgICAgICAgdmFyIHByb3RvY29sVHlwZSA9ICh0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnByb3RvY29sKSB8fCBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUFM7XG4gICAgICAgIHZhciBwcm90b2NvbDtcbiAgICAgICAgc3dpdGNoIChwcm90b2NvbFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sLkFVVE86XG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sLkhUVFA6XG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnaHR0cDonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUFM6XG4gICAgICAgICAgICAgICAgcHJvdG9jb2wgPSAnaHR0cHM6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgaG9zdEFuZFBhdGggPSB0aGlzLl9jb25maWcuaG9zdEFuZFBhdGggfHwgJ21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuICAgICAgICB2YXIgcXVlcnlQYXJhbXMgPSB7XG4gICAgICAgICAgICB2OiB0aGlzLl9jb25maWcuYXBpVmVyc2lvbiB8fCAnMycsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tOYW1lLFxuICAgICAgICAgICAga2V5OiB0aGlzLl9jb25maWcuYXBpS2V5LFxuICAgICAgICAgICAgY2xpZW50OiB0aGlzLl9jb25maWcuY2xpZW50SWQsXG4gICAgICAgICAgICBjaGFubmVsOiB0aGlzLl9jb25maWcuY2hhbm5lbCxcbiAgICAgICAgICAgIGxpYnJhcmllczogdGhpcy5fY29uZmlnLmxpYnJhcmllcyxcbiAgICAgICAgICAgIHJlZ2lvbjogdGhpcy5fY29uZmlnLnJlZ2lvbixcbiAgICAgICAgICAgIGxhbmd1YWdlOiB0aGlzLl9jb25maWcubGFuZ3VhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IE9iamVjdC5rZXlzKHF1ZXJ5UGFyYW1zKVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gcXVlcnlQYXJhbXNba10gIT0gbnVsbDsgfSlcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBlbXB0eSBhcnJheXNcbiAgICAgICAgICAgIHJldHVybiAhQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgfHxcbiAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheShxdWVyeVBhcmFtc1trXSkgJiYgcXVlcnlQYXJhbXNba10ubGVuZ3RoID4gMCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAvLyBqb2luIGFycmF5cyBhcyBjb21tYSBzZXBlcmF0ZWQgc3RyaW5nc1xuICAgICAgICAgICAgdmFyIGkgPSBxdWVyeVBhcmFtc1trXTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrLCB2YWx1ZTogaS5qb2luKCcsJykgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGtleTogaywgdmFsdWU6IHF1ZXJ5UGFyYW1zW2tdIH07XG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmtleSArIFwiPVwiICsgZW50cnkudmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJicpO1xuICAgICAgICByZXR1cm4gcHJvdG9jb2wgKyBcIi8vXCIgKyBob3N0QW5kUGF0aCArIFwiP1wiICsgcGFyYW1zO1xuICAgIH07XG4gICAgcmV0dXJuIExhenlNYXBzQVBJTG9hZGVyO1xufShNYXBzQVBJTG9hZGVyKSk7XG5leHBvcnQgeyBMYXp5TWFwc0FQSUxvYWRlciB9O1xuTGF6eU1hcHNBUElMb2FkZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkxhenlNYXBzQVBJTG9hZGVyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogdW5kZWZpbmVkLCBkZWNvcmF0b3JzOiBbeyB0eXBlOiBJbmplY3QsIGFyZ3M6IFtMQVpZX01BUFNfQVBJX0NPTkZJRyxdIH0sXSB9LFxuICAgIHsgdHlwZTogV2luZG93UmVmLCB9LFxuICAgIHsgdHlwZTogRG9jdW1lbnRSZWYsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGF6eS1tYXBzLWFwaS1sb2FkZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlci5qc1xuLy8gbW9kdWxlIGlkID0gODYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBDaXJjbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvY2lyY2xlLW1hbmFnZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmltcG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xuaW1wb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyJztcbi8qKlxuICogQWdtTWFwIHJlbmRlcnMgYSBHb29nbGUgTWFwLlxuICogKipJbXBvcnRhbnQgbm90ZSoqOiBUbyBiZSBhYmxlIHNlZSBhIG1hcCBpbiB0aGUgYnJvd3NlciwgeW91IGhhdmUgdG8gZGVmaW5lIGEgaGVpZ2h0IGZvciB0aGVcbiAqIGVsZW1lbnQgYGFnbS1tYXBgLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIGFnbS1tYXAge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbnZhciBBZ21NYXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbU1hcChfZWxlbSwgX21hcHNXcmFwcGVyKSB7XG4gICAgICAgIHRoaXMuX2VsZW0gPSBfZWxlbTtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9uZ2l0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGF0aXR1ZGUgdGhhdCBkZWZpbmVzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gVGhlIGRlZmF1bHQgem9vbSBsZXZlbCBpcyA4LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56b29tID0gODtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgaWYgbWFwIGlzIGRyYWdnYWJsZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW5hYmxlcy9kaXNhYmxlcyB6b29tIGFuZCBjZW50ZXIgb24gZG91YmxlIGNsaWNrLiBFbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc2FibGVEb3VibGVDbGlja1pvb20gPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgYWxsIGRlZmF1bHQgVUkgb2YgdGhlIEdvb2dsZSBtYXAuIFBsZWFzZSBub3RlOiBXaGVuIHRoZSBtYXAgaXMgY3JlYXRlZCwgdGhpc1xuICAgICAgICAgKiB2YWx1ZSBjYW5ub3QgZ2V0IHVwZGF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc2FibGVEZWZhdWx0VUkgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGZhbHNlLCBkaXNhYmxlcyBzY3JvbGx3aGVlbCB6b29taW5nIG9uIHRoZSBtYXAuIFRoZSBzY3JvbGx3aGVlbCBpcyBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNjcm9sbHdoZWVsID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGZhbHNlLCBwcmV2ZW50cyB0aGUgbWFwIGZyb20gYmVpbmcgY29udHJvbGxlZCBieSB0aGUga2V5Ym9hcmQuIEtleWJvYXJkIHNob3J0Y3V0cyBhcmVcbiAgICAgICAgICogZW5hYmxlZCBieSBkZWZhdWx0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5rZXlib2FyZFNob3J0Y3V0cyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgWm9vbSBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdHlsZXMgdG8gYXBwbHkgdG8gZWFjaCBvZiB0aGUgZGVmYXVsdCBtYXAgdHlwZXMuIE5vdGUgdGhhdCBmb3IgU2F0ZWxsaXRlL0h5YnJpZCBhbmQgVGVycmFpblxuICAgICAgICAgKiBtb2RlcywgdGhlc2Ugc3R5bGVzIHdpbGwgb25seSBhcHBseSB0byBsYWJlbHMgYW5kIGdlb21ldHJ5LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdHlsZXMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdHJ1ZSBhbmQgdGhlIGxhdGl0dWRlIGFuZC9vciBsb25naXR1ZGUgdmFsdWVzIGNoYW5nZXMsIHRoZSBHb29nbGUgTWFwcyBwYW5UbyBtZXRob2QgaXNcbiAgICAgICAgICogdXNlZCB0b1xuICAgICAgICAgKiBjZW50ZXIgdGhlIG1hcC4gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9yZWZlcmVuY2UjTWFwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVzZVBhbm5pbmcgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFN0cmVldCBWaWV3IFBlZ21hbiBjb250cm9sLlxuICAgICAgICAgKiBUaGlzIGNvbnRyb2wgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBVSSwgYW5kIHNob3VsZCBiZSBzZXQgdG8gZmFsc2Ugd2hlbiBkaXNwbGF5aW5nIGEgbWFwIHR5cGVcbiAgICAgICAgICogb24gd2hpY2ggdGhlIFN0cmVldCBWaWV3IHJvYWQgb3ZlcmxheSBzaG91bGQgbm90IGFwcGVhciAoZS5nLiBhIG5vbi1FYXJ0aCBtYXAgdHlwZSkuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0cmVldFZpZXdDb250cm9sID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHZpZXdwb3J0IHRvIGNvbnRhaW4gdGhlIGdpdmVuIGJvdW5kcy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZml0Qm91bmRzID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFNjYWxlIGNvbnRyb2wuIFRoaXMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGVDb250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXAgdHlwZSBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBUeXBlQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgUGFuIGNvbnRyb2wuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhbkNvbnRyb2wgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFJvdGF0ZSBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yb3RhdGVDb250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBGdWxsc2NyZWVuIGNvbnRyb2wuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZ1bGxzY3JlZW5Db250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWFwIG1hcFR5cGVJZC4gRGVmYXVsdHMgdG8gJ3JvYWRtYXAnLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBUeXBlSWQgPSAncm9hZG1hcCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGVuIGZhbHNlLCBtYXAgaWNvbnMgYXJlIG5vdCBjbGlja2FibGUuIEEgbWFwIGljb24gcmVwcmVzZW50cyBhIHBvaW50IG9mIGludGVyZXN0LFxuICAgICAgICAgKiBhbHNvIGtub3duIGFzIGEgUE9JLiBCeSBkZWZhdWx0IG1hcCBpY29ucyBhcmUgY2xpY2thYmxlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbGlja2FibGVJY29ucyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIHNldHRpbmcgY29udHJvbHMgaG93IGdlc3R1cmVzIG9uIHRoZSBtYXAgYXJlIGhhbmRsZWQuXG4gICAgICAgICAqIEFsbG93ZWQgdmFsdWVzOlxuICAgICAgICAgKiAtICdjb29wZXJhdGl2ZScgKFR3by1maW5nZXIgdG91Y2ggZ2VzdHVyZXMgcGFuIGFuZCB6b29tIHRoZSBtYXAuIE9uZS1maW5nZXIgdG91Y2ggZ2VzdHVyZXMgYXJlIG5vdCBoYW5kbGVkIGJ5IHRoZSBtYXAuKVxuICAgICAgICAgKiAtICdncmVlZHknICAgICAgKEFsbCB0b3VjaCBnZXN0dXJlcyBwYW4gb3Igem9vbSB0aGUgbWFwLilcbiAgICAgICAgICogLSAnbm9uZScgICAgICAgIChUaGUgbWFwIGNhbm5vdCBiZSBwYW5uZWQgb3Igem9vbWVkIGJ5IHVzZXIgZ2VzdHVyZXMuKVxuICAgICAgICAgKiAtICdhdXRvJyAgICAgICAgW2RlZmF1bHRdIChHZXN0dXJlIGhhbmRsaW5nIGlzIGVpdGhlciBjb29wZXJhdGl2ZSBvciBncmVlZHksIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBwYWdlIGlzIHNjcm9sbGFibGUgb3Igbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZXN0dXJlSGFuZGxpbmcgPSAnYXV0byc7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrIG9uIGFcbiAgICAgICAgICogbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciByaWdodC1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICAgICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcFJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgICAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGNlbnRlciBjaGFuZ2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jZW50ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHZpZXdwb3J0IGJvdW5kcyBoYXZlIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJvdW5kc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGJlY29tZXMgaWRsZSBhZnRlciBwYW5uaW5nIG9yIHpvb21pbmcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlkbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHpvb20gbGV2ZWwgaGFzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnpvb21DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGdvb2dsZSBtYXAgaXMgZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAqIFlvdSBnZXQgdGhlIGdvb2dsZS5tYXBzLk1hcCBpbnN0YW5jZSBhcyBhIHJlc3VsdCBvZiB0aGlzIEV2ZW50RW1pdHRlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwUmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21NYXAucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0b2RvOiB0aGlzIHNob3VsZCBiZSBzb2x2ZWQgd2l0aCBhIG5ldyBjb21wb25lbnQgYW5kIGEgdmlld0NoaWxkIGRlY29yYXRvclxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZ20tbWFwLWNvbnRhaW5lci1pbm5lcicpO1xuICAgICAgICB0aGlzLl9pbml0TWFwSW5zdGFuY2UoY29udGFpbmVyKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2luaXRNYXBJbnN0YW5jZSA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVNYXAoZWwsIHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IHRoaXMubGF0aXR1ZGUgfHwgMCwgbG5nOiB0aGlzLmxvbmdpdHVkZSB8fCAwIH0sXG4gICAgICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICAgICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0aGlzLmRpc2FibGVEZWZhdWx0VUksXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0aGlzLmRpc2FibGVEb3VibGVDbGlja1pvb20sXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogdGhpcy5zY3JvbGx3aGVlbCxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHRoaXMuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgZHJhZ2dhYmxlQ3Vyc29yOiB0aGlzLmRyYWdnYWJsZUN1cnNvcixcbiAgICAgICAgICAgIGRyYWdnaW5nQ3Vyc29yOiB0aGlzLmRyYWdnaW5nQ3Vyc29yLFxuICAgICAgICAgICAga2V5Ym9hcmRTaG9ydGN1dHM6IHRoaXMua2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgICAgICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHRoaXMuem9vbUNvbnRyb2wsXG4gICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2wsXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0aGlzLnNjYWxlQ29udHJvbCxcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbE9wdGlvbnM6IHRoaXMuc2NhbGVDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiB0aGlzLm1hcFR5cGVDb250cm9sLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB0aGlzLm1hcFR5cGVDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIHBhbkNvbnRyb2w6IHRoaXMucGFuQ29udHJvbCxcbiAgICAgICAgICAgIHBhbkNvbnRyb2xPcHRpb25zOiB0aGlzLnBhbkNvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgcm90YXRlQ29udHJvbDogdGhpcy5yb3RhdGVDb250cm9sLFxuICAgICAgICAgICAgcm90YXRlQ29udHJvbE9wdGlvbnM6IHRoaXMucm90YXRlQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogdGhpcy5mdWxsc2NyZWVuQ29udHJvbCxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9uczogdGhpcy5mdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IHRoaXMubWFwVHlwZUlkLFxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IHRoaXMuY2xpY2thYmxlSWNvbnMsXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6IHRoaXMuZ2VzdHVyZUhhbmRsaW5nXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCk7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBfdGhpcy5tYXBSZWFkeS5lbWl0KG1hcCk7IH0pO1xuICAgICAgICAvLyByZWdpc3RlciBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5faGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU1hcFpvb21DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5faGFuZGxlTWFwTW91c2VFdmVudHMoKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQm91bmRzQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUlkbGVFdmVudCgpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcC5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgIH07XG4gICAgLyogQGludGVybmFsICovXG4gICAgQWdtTWFwLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihjaGFuZ2VzKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTE7IH0pO1xuICAgICAgICBvcHRpb25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0TWFwT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGEgcmVzaXplIGV2ZW50IG9uIHRoZSBnb29nbGUgbWFwIGluc3RhbmNlLlxuICAgICAqIFdoZW4gcmVjZW50ZXIgaXMgdHJ1ZSwgdGhlIG9mIHRoZSBnb29nbGUgbWFwIGdldHMgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbGF0L2xuZyB2YWx1ZXMgb3IgZml0Qm91bmRzIHZhbHVlIHRvIHJlY2VudGVyIHRoZSBtYXAuXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIGFmdGVyIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqL1xuICAgIEFnbU1hcC5wcm90b3R5cGUudHJpZ2dlclJlc2l6ZSA9IGZ1bmN0aW9uIChyZWNlbnRlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocmVjZW50ZXIgPT09IHZvaWQgMCkgeyByZWNlbnRlciA9IHRydWU7IH1cbiAgICAgICAgLy8gTm90ZTogV2hlbiB3ZSB3b3VsZCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQgYW5kIHNob3cgdGhlIG1hcCBpbiB0aGUgc2FtZSB0dXJuICh3aGljaCBpcyBhXG4gICAgICAgIC8vIGNvbW1vbiBjYXNlIGZvciB0cmlnZ2VyaW5nIGEgcmVzaXplIGV2ZW50KSwgdGhlbiB0aGUgcmVzaXplIGV2ZW50IHdvdWxkIG5vdFxuICAgICAgICAvLyB3b3JrICh0byBzaG93IHRoZSBtYXApLCBzbyB3ZSB0cmlnZ2VyIHRoZSBldmVudCBpbiBhIHRpbWVvdXQuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9tYXBzV3JhcHBlci50cmlnZ2VyTWFwRXZlbnQoJ3Jlc2l6ZScpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVjZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpdEJvdW5kcyAhPSBudWxsID8gX3RoaXMuX2ZpdEJvdW5kcygpIDogX3RoaXMuX3NldENlbnRlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX3VwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gPT0gbnVsbCAmJiBjaGFuZ2VzWydsb25naXR1ZGUnXSA9PSBudWxsICYmXG4gICAgICAgICAgICBjaGFuZ2VzWydmaXRCb3VuZHMnXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBubyBwb3NpdGlvbiB1cGRhdGUgbmVlZGVkXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgcHJlZmVyIGZpdEJvdW5kcyBpbiBjaGFuZ2VzXG4gICAgICAgIGlmIChjaGFuZ2VzWydmaXRCb3VuZHMnXSAmJiB0aGlzLmZpdEJvdW5kcyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9maXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLmxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRDZW50ZXIoKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX3NldENlbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld0NlbnRlciA9IHtcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnVzZVBhbm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnBhblRvKG5ld0NlbnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5zZXRDZW50ZXIobmV3Q2VudGVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWdtTWFwLnByb3RvdHlwZS5fZml0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5Ub0JvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZml0Qm91bmRzKHRoaXMuZml0Qm91bmRzKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2hhbmRsZU1hcENlbnRlckNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KCdjZW50ZXJfY2hhbmdlZCcpLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Q2VudGVyKCkudGhlbihmdW5jdGlvbiAoY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubGF0aXR1ZGUgPSBjZW50ZXIubGF0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9uZ2l0dWRlID0gY2VudGVyLmxuZygpO1xuICAgICAgICAgICAgICAgIF90aGlzLmNlbnRlckNoYW5nZS5lbWl0KHsgbGF0OiBfdGhpcy5sYXRpdHVkZSwgbG5nOiBfdGhpcy5sb25naXR1ZGUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVCb3VuZHNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudCgnYm91bmRzX2NoYW5nZWQnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX21hcHNXcmFwcGVyLmdldEJvdW5kcygpLnRoZW4oZnVuY3Rpb24gKGJvdW5kcykgeyBfdGhpcy5ib3VuZHNDaGFuZ2UuZW1pdChib3VuZHMpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVNYXBab29tQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ3pvb21fY2hhbmdlZCcpLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Wm9vbSgpLnRoZW4oZnVuY3Rpb24gKHopIHtcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tID0gejtcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tQ2hhbmdlLmVtaXQoeik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVJZGxlRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudCgnaWRsZScpLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7IF90aGlzLmlkbGUuZW1pdCh2b2lkIDApOyB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2hhbmRsZU1hcE1vdXNlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZXZlbnRzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcENsaWNrIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyaWdodGNsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBSaWdodENsaWNrIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwRGJsQ2xpY2sgfSxcbiAgICAgICAgXTtcbiAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBzID0gX3RoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoZS5uYW1lKS5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0geyBjb29yZHM6IHsgbGF0OiBldmVudC5sYXRMbmcubGF0KCksIGxuZzogZXZlbnQubGF0TG5nLmxuZygpIH0gfTtcbiAgICAgICAgICAgICAgICBlLmVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21NYXA7XG59KCkpO1xuZXhwb3J0IHsgQWdtTWFwIH07XG4vKipcbiAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGNhbiBjaGFuZ2Ugb3ZlciB0aW1lXG4gKi9cbkFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMgPSBbXG4gICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nLCAnc2Nyb2xsd2hlZWwnLCAnZHJhZ2dhYmxlJywgJ2RyYWdnYWJsZUN1cnNvcicsICdkcmFnZ2luZ0N1cnNvcicsXG4gICAgJ2tleWJvYXJkU2hvcnRjdXRzJywgJ3pvb21Db250cm9sJywgJ3pvb21Db250cm9sT3B0aW9ucycsICdzdHlsZXMnLCAnc3RyZWV0Vmlld0NvbnRyb2wnLFxuICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnLCAnem9vbScsICdtYXBUeXBlQ29udHJvbCcsICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnLCAnbWluWm9vbScsXG4gICAgJ21heFpvb20nLCAncGFuQ29udHJvbCcsICdwYW5Db250cm9sT3B0aW9ucycsICdyb3RhdGVDb250cm9sJywgJ3JvdGF0ZUNvbnRyb2xPcHRpb25zJyxcbiAgICAnZnVsbHNjcmVlbkNvbnRyb2wnLCAnZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zJywgJ3NjYWxlQ29udHJvbCcsICdzY2FsZUNvbnRyb2xPcHRpb25zJyxcbiAgICAnbWFwVHlwZUlkJywgJ2NsaWNrYWJsZUljb25zJywgJ2dlc3R1cmVIYW5kbGluZydcbl07XG5BZ21NYXAuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1tYXAnLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgICAgICBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFya2VyTWFuYWdlciwgSW5mb1dpbmRvd01hbmFnZXIsIENpcmNsZU1hbmFnZXIsIFBvbHlsaW5lTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgUG9seWdvbk1hbmFnZXIsIEttbExheWVyTWFuYWdlciwgRGF0YUxheWVyTWFuYWdlclxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBkZXByZWNhdGVkIC0gd2Ugd2lsbCByZW1vdmUgaXQgd2l0aCB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICdbY2xhc3Muc2VibS1nb29nbGUtbWFwLWNvbnRhaW5lcl0nOiAndHJ1ZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlczogW1wiXFxuICAgIC5hZ20tbWFwLWNvbnRhaW5lci1pbm5lciB7XFxuICAgICAgd2lkdGg6IGluaGVyaXQ7XFxuICAgICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICB9XFxuICAgIC5hZ20tbWFwLWNvbnRlbnQge1xcbiAgICAgIGRpc3BsYXk6bm9uZTtcXG4gICAgfVxcbiAgXCJdLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlxcbiAgICA8ZGl2IGNsYXNzPSdhZ20tbWFwLWNvbnRhaW5lci1pbm5lciBzZWJtLWdvb2dsZS1tYXAtY29udGFpbmVyLWlubmVyJz48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz0nYWdtLW1hcC1jb250ZW50Jz5cXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XFxuICAgIDwvZGl2PlxcbiAgXCJcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtTWFwLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogRWxlbWVudFJlZiwgfSxcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuXTsgfTtcbkFnbU1hcC5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnem9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWluWm9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWF4Wm9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dhYmxlJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsnbWFwRHJhZ2dhYmxlJyxdIH0sXSxcbiAgICAnZGlzYWJsZURvdWJsZUNsaWNrWm9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZGlzYWJsZURlZmF1bHRVSSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc2Nyb2xsd2hlZWwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2JhY2tncm91bmRDb2xvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dhYmxlQ3Vyc29yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2luZ0N1cnNvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAna2V5Ym9hcmRTaG9ydGN1dHMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pvb21Db250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6b29tQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0eWxlcyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndXNlUGFubmluZyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3RyZWV0Vmlld0NvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cmVldFZpZXdDb250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZml0Qm91bmRzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzY2FsZUNvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3NjYWxlQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ21hcFR5cGVDb250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3BhbkNvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3BhbkNvbnRyb2xPcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdyb3RhdGVDb250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdyb3RhdGVDb250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZnVsbHNjcmVlbkNvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2Z1bGxzY3JlZW5Db250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWFwVHlwZUlkJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdjbGlja2FibGVJY29ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZ2VzdHVyZUhhbmRsaW5nJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdtYXBDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21hcFJpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtYXBEYmxDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2NlbnRlckNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2JvdW5kc0NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2lkbGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICd6b29tQ2hhbmdlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbWFwUmVhZHknOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDg3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlcic7XG52YXIgQWdtQ2lyY2xlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21DaXJjbGUoX21hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IF9tYW5hZ2VyO1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBDaXJjbGUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBjaXJjbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIGNpcmNsZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbCBwb2ludHMgc2hvd24gYXRcbiAgICAgICAgICogdGhlIGNlbnRlciBhbmQgYXJvdW5kIHRoZSBjaXJjdW1mZXJlbmNlIG9mIHRoZSBjaXJjbGUuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHJhZGl1cyBpbiBtZXRlcnMgb24gdGhlIEVhcnRoJ3Mgc3VyZmFjZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmFkaXVzID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzdHJva2UgcG9zaXRpb24uIERlZmF1bHRzIHRvIENFTlRFUi5cbiAgICAgICAgICogVGhpcyBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0IEV4cGxvcmVyIDggYW5kIGVhcmxpZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0cm9rZVBvc2l0aW9uID0gJ0NFTlRFUic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3Ryb2tlV2VpZ2h0ID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhpcyBjaXJjbGUgaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgY2VudGVyIGlzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNlbnRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2lyY2xlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNpcmNsZURibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgY2lyY2xlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW91dC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW92ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgcmFkaXVzIGlzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhZGl1c0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRDaXJjbGUodGhpcyk7XG4gICAgICAgIHRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUNpcmNsZS5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0Q2VudGVyKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLnNldEVkaXRhYmxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRWaXNpYmxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydyYWRpdXMnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRSYWRpdXModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2lyY2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlcyk7XG4gICAgfTtcbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLl91cGRhdGVDaXJjbGVPcHRpb25zQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvcHRpb25LZXlzID0gT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBBZ21DaXJjbGUuX21hcE9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTE7IH0pO1xuICAgICAgICBvcHRpb25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgaWYgKG9wdGlvbktleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgICAgICBldmVudHMuc2V0KCdjZW50ZXJfY2hhbmdlZCcsIHRoaXMuY2VudGVyQ2hhbmdlKTtcbiAgICAgICAgZXZlbnRzLnNldCgnY2xpY2snLCB0aGlzLmNpcmNsZUNsaWNrKTtcbiAgICAgICAgZXZlbnRzLnNldCgnZGJsY2xpY2snLCB0aGlzLmNpcmNsZURibENsaWNrKTtcbiAgICAgICAgZXZlbnRzLnNldCgnZHJhZycsIHRoaXMuZHJhZyk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmQpO1xuICAgICAgICBldmVudHMuc2V0KCdkcmFnU3RhcnQnLCB0aGlzLmRyYWdTdGFydCk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICAgICAgZXZlbnRzLnNldCgnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgICAgICBldmVudHMuc2V0KCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQpO1xuICAgICAgICBldmVudHMuc2V0KCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3Zlcik7XG4gICAgICAgIGV2ZW50cy5zZXQoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgICAgICBldmVudHMuc2V0KCdyYWRpdXNfY2hhbmdlZCcsIHRoaXMucmFkaXVzQ2hhbmdlKTtcbiAgICAgICAgZXZlbnRzLnNldCgncmlnaHRjbGljaycsIHRoaXMucmlnaHRDbGljayk7XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEVtaXR0ZXIsIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgX3RoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKF90aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShldmVudE5hbWUsIF90aGlzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFkaXVzX2NoYW5nZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX21hbmFnZXIuZ2V0UmFkaXVzKF90aGlzKS50aGVuKGZ1bmN0aW9uIChyYWRpdXMpIHsgcmV0dXJuIGV2ZW50RW1pdHRlci5lbWl0KHJhZGl1cyk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl9jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9tYW5hZ2VyLmdldENlbnRlcihfdGhpcykudGhlbihmdW5jdGlvbiAoY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50RW1pdHRlci5lbWl0KHsgbGF0OiBjZW50ZXIubGF0KCksIGxuZzogY2VudGVyLmxuZygpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHsgY29vcmRzOiB7IGxhdDogdmFsdWUubGF0TG5nLmxhdCgpLCBsbmc6IHZhbHVlLmxhdExuZy5sbmcoKSB9IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWFuYWdlci5yZW1vdmVDaXJjbGUodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBMYXRMbmdCb3VuZHMgb2YgdGhpcyBDaXJjbGUuXG4gICAgICovXG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYW5hZ2VyLmdldEJvdW5kcyh0aGlzKTsgfTtcbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Q2VudGVyKHRoaXMpOyB9O1xuICAgIHJldHVybiBBZ21DaXJjbGU7XG59KCkpO1xuZXhwb3J0IHsgQWdtQ2lyY2xlIH07XG5BZ21DaXJjbGUuX21hcE9wdGlvbnMgPSBbXG4gICAgJ2ZpbGxDb2xvcicsICdmaWxsT3BhY2l0eScsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVBvc2l0aW9uJywgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3Zpc2libGUnLCAnekluZGV4JywgJ2NsaWNrYWJsZSdcbl07XG5BZ21DaXJjbGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1jaXJjbGUnXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbUNpcmNsZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IENpcmNsZU1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtQ2lyY2xlLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdjbGlja2FibGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2RyYWdnYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ2NpcmNsZURyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2VkaXRhYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdmaWxsQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2ZpbGxPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdyYWRpdXMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZUNvbG9yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VQb3NpdGlvbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlV2VpZ2h0JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd2aXNpYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6SW5kZXgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2NlbnRlckNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2NpcmNsZUNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnY2lyY2xlRGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdkcmFnJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnZHJhZ0VuZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2RyYWdTdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlRG93bic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlTW92ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbW91c2VPdmVyJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbW91c2VVcCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3JhZGl1c0NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3JpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpcmNsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9jaXJjbGUuanNcbi8vIG1vZHVsZSBpZCA9IDg3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xudmFyIGxheWVySWQgPSAwO1xudmFyIEFnbUttbExheWVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21LbWxMYXllcihfbWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyID0gX21hbmFnZXI7XG4gICAgICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lkID0gKGxheWVySWQrKykudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdHJ1ZSwgdGhlIGxheWVyIHJlY2VpdmVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbGlja2FibGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnkgZGVmYXVsdCwgdGhlIGlucHV0IG1hcCBpcyBjZW50ZXJlZCBhbmQgem9vbWVkIHRvIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIGNvbnRlbnRzIG9mIHRoZVxuICAgICAgICAgKiBsYXllci5cbiAgICAgICAgICogSWYgdGhpcyBvcHRpb24gaXMgc2V0IHRvIHRydWUsIHRoZSB2aWV3cG9ydCBpcyBsZWZ0IHVuY2hhbmdlZCwgdW5sZXNzIHRoZSBtYXAncyBjZW50ZXIgYW5kIHpvb21cbiAgICAgICAgICogd2VyZSBuZXZlciBzZXQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnByZXNlcnZlVmlld3BvcnQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdG8gcmVuZGVyIHRoZSBzY3JlZW4gb3ZlcmxheXMuIERlZmF1bHQgdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NyZWVuT3ZlcmxheXMgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3VwcHJlc3MgdGhlIHJlbmRlcmluZyBvZiBpbmZvIHdpbmRvd3Mgd2hlbiBsYXllciBmZWF0dXJlcyBhcmUgY2xpY2tlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3VwcHJlc3NJbmZvV2luZG93cyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIFVSTCBvZiB0aGUgS01MIGRvY3VtZW50IHRvIGRpc3BsYXkuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgei1pbmRleCBvZiB0aGUgbGF5ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnpJbmRleCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBmZWF0dXJlIGluIHRoZSBsYXllciBpcyBjbGlja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXllckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBLTUwgbGF5ZXJzIGRlZmF1bHQgdmlld3BvcnQgaGFzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlZmF1bHRWaWV3cG9ydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgS01MIGxheWVyIGhhcyBmaW5pc2hlZCBsb2FkaW5nLlxuICAgICAgICAgKiBBdCB0aGlzIHBvaW50IGl0IGlzIHNhZmUgdG8gcmVhZCB0aGUgc3RhdHVzIHByb3BlcnR5IHRvIGRldGVybWluZSBpZiB0aGUgbGF5ZXIgbG9hZGVkXG4gICAgICAgICAqIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3RhdHVzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICBBZ21LbWxMYXllci5wcm90b3R5cGUubmdPbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hbmFnZXIuYWRkS21sTGF5ZXIodGhpcyk7XG4gICAgICAgIHRoaXMuX2FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzKTtcbiAgICB9O1xuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS5fdXBkYXRlUG9seWdvbk9wdGlvbnMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBBZ21LbWxMYXllci5fa21sTGF5ZXJPcHRpb25zLmluZGV4T2YoaykgIT09IC0xOyB9KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrKSB7XG4gICAgICAgICAgICBvYmpba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9wdGlvbnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5sYXllckNsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkZWZhdWx0dmlld3BvcnRfY2hhbmdlZCcsIGhhbmRsZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmRlZmF1bHRWaWV3cG9ydENoYW5nZS5lbWl0KCk7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3N0YXR1c19jaGFuZ2VkJywgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuc3RhdHVzQ2hhbmdlLmVtaXQoKTsgfSB9LFxuICAgICAgICBdO1xuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgb3MgPSBfdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIF90aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgICAgICAgX3RoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21LbWxMYXllci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBcIkFnbUttbExheWVyLVwiICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZUttbExheWVyKHRoaXMpO1xuICAgICAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEFnbUttbExheWVyO1xufSgpKTtcbmV4cG9ydCB7IEFnbUttbExheWVyIH07XG5BZ21LbWxMYXllci5fa21sTGF5ZXJPcHRpb25zID0gWydjbGlja2FibGUnLCAncHJlc2VydmVWaWV3cG9ydCcsICdzY3JlZW5PdmVybGF5cycsICdzdXBwcmVzc0luZm9XaW5kb3dzJywgJ3VybCcsICd6SW5kZXgnXTtcbkFnbUttbExheWVyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20ta21sLWxheWVyJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21LbWxMYXllci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEttbExheWVyTWFuYWdlciwgfSxcbl07IH07XG5BZ21LbWxMYXllci5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnY2xpY2thYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwcmVzZXJ2ZVZpZXdwb3J0JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzY3JlZW5PdmVybGF5cyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3VwcHJlc3NJbmZvV2luZG93cyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndXJsJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6SW5kZXgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2xheWVyQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdkZWZhdWx0Vmlld3BvcnRDaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdzdGF0dXNDaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWttbC1sYXllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9rbWwtbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDg3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2RhdGEtbGF5ZXItbWFuYWdlcic7XG52YXIgbGF5ZXJJZCA9IDA7XG4vKipcbiAqIEFnbURhdGFMYXllciBlbmFibGVzIHRoZSB1c2VyIHRvIGFkZCBkYXRhIGxheWVycyB0byB0aGUgbWFwLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7IEFnbU1hcCwgQWdtRGF0YUxheWVyIH0gZnJvbVxuICogJ2FuZ3VsYXItZ29vZ2xlLW1hcHMvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBkaXJlY3RpdmVzOiBbQWdtTWFwLCBBZ21EYXRhTGF5ZXJdLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiBcdCAgPGFnbS1kYXRhLWxheWVyIFtnZW9Kc29uXT1cImdlb0pzb25PYmplY3RcIiAobGF5ZXJDbGljayk9XCJjbGlja2VkKCRldmVudClcIiBbc3R5bGVdPVwic3R5bGVGdW5jXCI+XG4gKiBcdCAgPC9hZ20tZGF0YS1sYXllcj5cbiAqIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15TWFwQ21wIHtcbiAqICAgbGF0OiBudW1iZXIgPSAtMjUuMjc0NDQ5O1xuICogICBsbmc6IG51bWJlciA9IDEzMy43NzUwNjA7XG4gKiAgIHpvb206IG51bWJlciA9IDU7XG4gKlxuICogY2xpY2tlZChjbGlja0V2ZW50KSB7XG4gKiAgICBjb25zb2xlLmxvZyhjbGlja0V2ZW50KTtcbiAqICB9XG4gKlxuICogIHN0eWxlRnVuYyhmZWF0dXJlKSB7XG4gKiAgICByZXR1cm4gKHtcbiAqICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAqICAgICAgZmlsbENvbG9yOiBmZWF0dXJlLmdldFByb3BlcnR5KCdjb2xvcicpLFxuICogICAgICBzdHJva2VXZWlnaHQ6IDFcbiAqICAgIH0pO1xuICogIH1cbiAqXG4gKiAgZ2VvSnNvbk9iamVjdDogT2JqZWN0ID0ge1xuICogICAgXCJ0eXBlXCI6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAqICAgIFwiZmVhdHVyZXNcIjogW1xuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIkdcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJibHVlXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI3XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiNzFcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMjMuNjEsIC0yMi4xNF0sIFsxMjIuMzgsIC0yMS43M10sIFsxMjEuMDYsIC0yMS42OV0sIFsxMTkuNjYsIC0yMi4yMl0sIFsxMTkuMDAsIC0yMy40MF0sXG4gKiAgICAgICAgICAgICAgWzExOC42NSwgLTI0Ljc2XSwgWzExOC40MywgLTI2LjA3XSwgWzExOC43OCwgLTI3LjU2XSwgWzExOS4yMiwgLTI4LjU3XSwgWzEyMC4yMywgLTI5LjQ5XSxcbiAqICAgICAgICAgICAgICBbMTIxLjc3LCAtMjkuODddLCBbMTIzLjU3LCAtMjkuNjRdLCBbMTI0LjQ1LCAtMjkuMDNdLCBbMTI0LjcxLCAtMjcuOTVdLCBbMTI0LjgwLCAtMjYuNzBdLFxuICogICAgICAgICAgICAgIFsxMjQuODAsIC0yNS42MF0sIFsxMjMuNjEsIC0yNS42NF0sIFsxMjIuNTYsIC0yNS42NF0sIFsxMjEuNzIsIC0yNS43Ml0sIFsxMjEuODEsIC0yNi42Ml0sXG4gKiAgICAgICAgICAgICAgWzEyMS44NiwgLTI2Ljk4XSwgWzEyMi42MCwgLTI2LjkwXSwgWzEyMy41NywgLTI3LjA1XSwgWzEyMy41NywgLTI3LjY4XSwgWzEyMy4zNSwgLTI4LjE4XSxcbiAqICAgICAgICAgICAgICBbMTIyLjUxLCAtMjguMzhdLCBbMTIxLjc3LCAtMjguMjZdLCBbMTIxLjAyLCAtMjcuOTFdLCBbMTIwLjQ5LCAtMjcuMjFdLCBbMTIwLjE0LCAtMjYuNTBdLFxuICogICAgICAgICAgICAgIFsxMjAuMTAsIC0yNS42NF0sIFsxMjAuMjcsIC0yNC41Ml0sIFsxMjAuNjcsIC0yMy42OF0sIFsxMjEuNzIsIC0yMy4zMl0sIFsxMjIuNDMsIC0yMy40OF0sXG4gKiAgICAgICAgICAgICAgWzEyMy4wNCwgLTI0LjA0XSwgWzEyNC41NCwgLTI0LjI4XSwgWzEyNC41OCwgLTIzLjIwXSwgWzEyMy42MSwgLTIyLjE0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIm9cIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJyZWRcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjE1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTExXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTI4Ljg0LCAtMjUuNzZdLCBbMTI4LjE4LCAtMjUuNjBdLCBbMTI3Ljk2LCAtMjUuNTJdLCBbMTI3Ljg4LCAtMjUuNTJdLCBbMTI3LjcwLCAtMjUuNjBdLFxuICogICAgICAgICAgICAgIFsxMjcuMjYsIC0yNS43OV0sIFsxMjYuNjAsIC0yNi4xMV0sIFsxMjYuMTYsIC0yNi43OF0sIFsxMjYuMTIsIC0yNy42OF0sIFsxMjYuMjEsIC0yOC40Ml0sXG4gKiAgICAgICAgICAgICAgWzEyNi42OSwgLTI5LjQ5XSwgWzEyNy43NCwgLTI5LjgwXSwgWzEyOC44MCwgLTI5LjcyXSwgWzEyOS40MSwgLTI5LjAzXSwgWzEyOS43MiwgLTI3Ljk1XSxcbiAqICAgICAgICAgICAgICBbMTI5LjY4LCAtMjcuMjFdLCBbMTI5LjMzLCAtMjYuMjNdLCBbMTI4Ljg0LCAtMjUuNzZdXG4gKiAgICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTI4LjQ1LCAtMjcuNDRdLCBbMTI4LjMyLCAtMjYuOTRdLCBbMTI3LjcwLCAtMjYuODJdLCBbMTI3LjM1LCAtMjcuMDVdLCBbMTI3LjE3LCAtMjcuODBdLFxuICogICAgICAgICAgICAgIFsxMjcuNTcsIC0yOC4yMl0sIFsxMjguMTAsIC0yOC40Ml0sIFsxMjguNDksIC0yNy44MF0sIFsxMjguNDUsIC0yNy40NF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJvXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwieWVsbG93XCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxNVwiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjExMVwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzMS44NywgLTI1Ljc2XSwgWzEzMS4zNSwgLTI2LjA3XSwgWzEzMC45NSwgLTI2Ljc4XSwgWzEzMC44MiwgLTI3LjY0XSwgWzEzMC44NiwgLTI4LjUzXSxcbiAqICAgICAgICAgICAgICBbMTMxLjI2LCAtMjkuMjJdLCBbMTMxLjkyLCAtMjkuNzZdLCBbMTMyLjQ1LCAtMjkuODddLCBbMTMzLjA2LCAtMjkuNzZdLCBbMTMzLjcyLCAtMjkuMzRdLFxuICogICAgICAgICAgICAgIFsxMzQuMDcsIC0yOC44MF0sIFsxMzQuMjAsIC0yNy45MV0sIFsxMzQuMDcsIC0yNy4yMV0sIFsxMzMuODEsIC0yNi4zMV0sIFsxMzMuMzcsIC0yNS44M10sXG4gKiAgICAgICAgICAgICAgWzEzMi43MSwgLTI1LjY0XSwgWzEzMS44NywgLTI1Ljc2XVxuICogICAgICAgICAgICBdLFxuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzMy4xNSwgLTI3LjE3XSwgWzEzMi43MSwgLTI2Ljg2XSwgWzEzMi4wOSwgLTI2LjkwXSwgWzEzMS43NCwgLTI3LjU2XSwgWzEzMS43OSwgLTI4LjI2XSxcbiAqICAgICAgICAgICAgICBbMTMyLjM2LCAtMjguNDVdLCBbMTMyLjkzLCAtMjguMzRdLCBbMTMzLjE1LCAtMjcuNzZdLCBbMTMzLjE1LCAtMjcuMTddXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwiZ1wiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcImJsdWVcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjdcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDNcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzguMTIsIC0yNS4wNF0sIFsxMzYuODQsIC0yNS4xNl0sIFsxMzUuOTYsIC0yNS4zNl0sIFsxMzUuMjYsIC0yNS45OV0sIFsxMzUsIC0yNi45MF0sXG4gKiAgICAgICAgICAgICAgWzEzNS4wNCwgLTI3LjkxXSwgWzEzNS4yNiwgLTI4Ljg4XSwgWzEzNi4wNSwgLTI5LjQ1XSwgWzEzNy4wMiwgLTI5LjQ5XSwgWzEzNy44MSwgLTI5LjQ5XSxcbiAqICAgICAgICAgICAgICBbMTM3Ljk0LCAtMjkuOTldLCBbMTM3LjkwLCAtMzEuMjBdLCBbMTM3Ljg1LCAtMzIuMjRdLCBbMTM2Ljg4LCAtMzIuNjldLCBbMTM2LjQ1LCAtMzIuMzZdLFxuICogICAgICAgICAgICAgIFsxMzYuMjcsIC0zMS44MF0sIFsxMzQuOTUsIC0zMS44NF0sIFsxMzUuMTcsIC0zMi45OV0sIFsxMzUuNTIsIC0zMy40M10sIFsxMzYuMTQsIC0zMy43Nl0sXG4gKiAgICAgICAgICAgICAgWzEzNy4wNiwgLTMzLjgzXSwgWzEzOC4xMiwgLTMzLjY1XSwgWzEzOC44NiwgLTMzLjIxXSwgWzEzOS4zMCwgLTMyLjI4XSwgWzEzOS4zMCwgLTMxLjI0XSxcbiAqICAgICAgICAgICAgICBbMTM5LjMwLCAtMzAuMTRdLCBbMTM5LjIxLCAtMjguOTZdLCBbMTM5LjE3LCAtMjguMjJdLCBbMTM5LjA4LCAtMjcuNDFdLCBbMTM5LjA4LCAtMjYuNDddLFxuICogICAgICAgICAgICAgIFsxMzguOTksIC0yNS40MF0sIFsxMzguNzMsIC0yNS4wMF0sIFsxMzguMTIsIC0yNS4wNF1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzcuNTAsIC0yNi41NF0sIFsxMzYuOTcsIC0yNi40N10sIFsxMzYuNDksIC0yNi41OF0sIFsxMzYuMzEsIC0yNy4xM10sIFsxMzYuMzEsIC0yNy43Ml0sXG4gKiAgICAgICAgICAgICAgWzEzNi41OCwgLTI3Ljk5XSwgWzEzNy41MCwgLTI4LjAzXSwgWzEzNy42OCwgLTI3LjY4XSwgWzEzNy41OSwgLTI2Ljc4XSwgWzEzNy41MCwgLTI2LjU0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImxcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJncmVlblwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTJcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDhcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDAuMTQsIC0yMS4wNF0sIFsxNDAuMzEsIC0yOS40Ml0sIFsxNDEuNjcsIC0yOS40OV0sIFsxNDEuNTksIC0yMC45Ml0sIFsxNDAuMTQsIC0yMS4wNF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJlXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwicmVkXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTAxXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTQ0LjE0LCAtMjcuNDFdLCBbMTQ1LjY3LCAtMjcuNTJdLCBbMTQ2Ljg2LCAtMjcuMDldLCBbMTQ2LjgyLCAtMjUuNjRdLCBbMTQ2LjI1LCAtMjUuMDRdLFxuICogICAgICAgICAgICAgIFsxNDUuNDUsIC0yNC42OF0sIFsxNDQuNjYsIC0yNC42MF0sIFsxNDQuMDksIC0yNC43Nl0sIFsxNDMuNDMsIC0yNS4wOF0sIFsxNDIuOTksIC0yNS40MF0sXG4gKiAgICAgICAgICAgICAgWzE0Mi42NCwgLTI2LjAzXSwgWzE0Mi42NCwgLTI3LjA1XSwgWzE0Mi42NCwgLTI4LjI2XSwgWzE0My4zMCwgLTI5LjExXSwgWzE0NC4xOCwgLTI5LjU3XSxcbiAqICAgICAgICAgICAgICBbMTQ1LjQxLCAtMjkuNjRdLCBbMTQ2LjQ2LCAtMjkuMTldLCBbMTQ2LjY0LCAtMjguNzJdLCBbMTQ2LjgyLCAtMjguMTRdLCBbMTQ0Ljg0LCAtMjguNDJdLFxuICogICAgICAgICAgICAgIFsxNDQuMzEsIC0yOC4yNl0sIFsxNDQuMTQsIC0yNy40MV1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDQuMTgsIC0yNi4zOV0sIFsxNDQuNTMsIC0yNi41OF0sIFsxNDUuMTksIC0yNi42Ml0sIFsxNDUuNzIsIC0yNi4zNV0sIFsxNDUuODEsIC0yNS45MV0sXG4gKiAgICAgICAgICAgICAgWzE0NS40MSwgLTI1LjY4XSwgWzE0NC45NywgLTI1LjY4XSwgWzE0NC40OSwgLTI1LjY0XSwgWzE0NCwgLTI1Ljk5XSwgWzE0NC4xOCwgLTI2LjM5XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICBdXG4gKiAgfTtcbiAqIH1cbiAqIGBgYFxuICovXG52YXIgQWdtRGF0YUxheWVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21EYXRhTGF5ZXIoX21hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IF9tYW5hZ2VyO1xuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pZCA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGZlYXR1cmUgaW4gdGhlIGxheWVyIGlzIGNsaWNrZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZ2VvSnNvbiB0byBiZSBkaXNwbGF5ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2VvSnNvbiA9IG51bGw7XG4gICAgfVxuICAgIEFnbURhdGFMYXllci5wcm90b3R5cGUubmdPbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hbmFnZXIuYWRkRGF0YUxheWVyKHRoaXMpO1xuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5sYXllckNsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgIF07XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBvcyA9IF90aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgX3RoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtRGF0YUxheWVyLnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gXCJBZ21EYXRhTGF5ZXItXCIgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZURhdGFMYXllcih0aGlzKTtcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZW9Kc29uQ2hhbmdlID0gY2hhbmdlc1snZ2VvSnNvbiddO1xuICAgICAgICBpZiAoZ2VvSnNvbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci51cGRhdGVHZW9Kc29uKHRoaXMsIGdlb0pzb25DaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSB7fTtcbiAgICAgICAgQWdtRGF0YUxheWVyLl9kYXRhT3B0aW9uc0F0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAoaykgeyByZXR1cm4gZGF0YU9wdGlvbnNba10gPSBjaGFuZ2VzLmhhc093blByb3BlcnR5KGspID8gY2hhbmdlc1trXS5jdXJyZW50VmFsdWUgOiBfdGhpc1trXTsgfSk7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuc2V0RGF0YU9wdGlvbnModGhpcywgZGF0YU9wdGlvbnMpO1xuICAgIH07XG4gICAgcmV0dXJuIEFnbURhdGFMYXllcjtcbn0oKSk7XG5leHBvcnQgeyBBZ21EYXRhTGF5ZXIgfTtcbkFnbURhdGFMYXllci5fZGF0YU9wdGlvbnNBdHRyaWJ1dGVzID0gWydzdHlsZSddO1xuQWdtRGF0YUxheWVyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20tZGF0YS1sYXllcidcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtRGF0YUxheWVyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogRGF0YUxheWVyTWFuYWdlciwgfSxcbl07IH07XG5BZ21EYXRhTGF5ZXIucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2xheWVyQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdnZW9Kc29uJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHlsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhLWxheWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2RhdGEtbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDg3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4vaW5mby13aW5kb3cnO1xudmFyIG1hcmtlcklkID0gMDtcbi8qKlxuICogQWdtTWFya2VyIHJlbmRlcnMgYSBtYXAgbWFya2VyIGluc2lkZSBhIHtAbGluayBBZ21NYXB9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tbWFwLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbbGFiZWxdPVwiJ00nXCI+XG4gKiAgICAgIDwvYWdtLW1hcmtlcj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbnZhciBBZ21NYXJrZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbU1hcmtlcihfbWFya2VyTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyID0gX21hcmtlck1hbmFnZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGNhbiBiZSBkcmFnZ2VkLiBEZWZhdWx0IHZhbHVlIGlzIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBpcyB2aXNpYmxlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG9wZW4gdGhlIGNoaWxkIGluZm8gd2luZG93IHdoZW4gdGhlIG1hcmtlciBpcyBjbGlja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcGVuSW5mb1dpbmRvdyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWFya2VyJ3Mgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbCBtYXJrZXJzIGFyZSBkaXNwbGF5ZWQgb24gdGhlIG1hcCBpbiBvcmRlciBvZiB0aGVpciB6SW5kZXgsIHdpdGggaGlnaGVyIHZhbHVlcyBkaXNwbGF5aW5nIGluXG4gICAgICAgICAqIGZyb250IG9mIG1hcmtlcnMgd2l0aCBsb3dlciB2YWx1ZXMuIEJ5IGRlZmF1bHQsIG1hcmtlcnMgYXJlIGRpc3BsYXllZCBhY2NvcmRpbmcgdG8gdGhlaXJcbiAgICAgICAgICogdmVydGljYWwgcG9zaXRpb24gb24gc2NyZWVuLCB3aXRoIGxvd2VyIG1hcmtlcnMgYXBwZWFyaW5nIGluIGZyb250IG9mIG1hcmtlcnMgZnVydGhlciB1cCB0aGVcbiAgICAgICAgICogc2NyZWVuLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56SW5kZXggPSAxO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgY2xpY2tlZC4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcmtlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgbW91c2VzIG92ZXIgdGhlIG1hcmtlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIG1vdXNlcyBvdXRzaWRlIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGludGVybmFsXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgUXVlcnlMaXN0KCk7XG4gICAgICAgIHRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5faWQgPSAobWFya2VySWQrKykudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgLyogQGludGVybmFsICovXG4gICAgQWdtTWFya2VyLnByb3RvdHlwZS5uZ0FmdGVyQ29udGVudEluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpO1xuICAgICAgICB0aGlzLmluZm9XaW5kb3cuY2hhbmdlcy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpOyB9KTtcbiAgICB9O1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuaW5mb1dpbmRvdy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG5vIG1vcmUgdGhhbiBvbmUgaW5mbyB3aW5kb3cuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmZvV2luZG93LmZvckVhY2goZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICAgICAgbWFya2VyLmhvc3RNYXJrZXIgPSBfdGhpcztcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtTWFya2VyLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXRpdHVkZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHRoaXMubG9uZ2l0dWRlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcikge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5hZGRNYXJrZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlTWFya2VyUG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3RpdGxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVGl0bGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhYmVsJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlTGFiZWwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2RyYWdnYWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZURyYWdnYWJsZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snaWNvblVybCddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUljb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ29wYWNpdHknXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVPcGFjaXR5KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVmlzaWJsZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlWkluZGV4KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydjbGlja2FibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVDbGlja2FibGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUuX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY3MgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wZW5JbmZvV2luZG93KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5mb1dpbmRvdy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvV2luZG93KSB7IHJldHVybiBpbmZvV2luZG93Lm9wZW4oKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5tYXJrZXJDbGljay5lbWl0KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChjcyk7XG4gICAgICAgIHZhciBkcyA9IHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdkcmFnZW5kJywgdGhpcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIF90aGlzLmRyYWdFbmQuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGRzKTtcbiAgICAgICAgdmFyIG1vdmVyID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ21vdXNlb3ZlcicsIHRoaXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZU92ZXIuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdmVyKTtcbiAgICAgICAgdmFyIG1vdXQgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnbW91c2VvdXQnLCB0aGlzKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMubW91c2VPdXQuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdXQpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9pZDsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtTWFya2VyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdBZ21NYXJrZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuZGVsZXRlTWFya2VyKHRoaXMpO1xuICAgICAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21NYXJrZXI7XG59KCkpO1xuZXhwb3J0IHsgQWdtTWFya2VyIH07XG5BZ21NYXJrZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1tYXJrZXInXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbU1hcmtlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IE1hcmtlck1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtTWFya2VyLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd0aXRsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbGFiZWwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2RyYWdnYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ21hcmtlckRyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2ljb25VcmwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Zpc2libGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ29wZW5JbmZvV2luZG93JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdvcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6SW5kZXgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2NsaWNrYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ21hcmtlckNsaWNrYWJsZScsXSB9LF0sXG4gICAgJ21hcmtlckNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnZHJhZ0VuZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnaW5mb1dpbmRvdyc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZHJlbiwgYXJnczogW0FnbUluZm9XaW5kb3csXSB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFya2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL21hcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gODc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9seWdvbk1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xuLyoqXG4gKiBBZ21Qb2x5Z29uIHJlbmRlcnMgYSBwb2x5Z29uIG9uIGEge0BsaW5rIEFnbU1hcH1cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICBhZ20tbWFwIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tcG9seWdvbiBbcGF0aHNdPVwicGF0aHNcIj5cbiAqICAgICAgPC9hZ20tcG9seWdvbj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15TWFwQ21wIHtcbiAqICAgbGF0OiBudW1iZXIgPSAwO1xuICogICBsbmc6IG51bWJlciA9IDA7XG4gKiAgIHpvb206IG51bWJlciA9IDEwO1xuICogICBwYXRoczogQXJyYXk8TGF0TG5nTGl0ZXJhbD4gPSBbXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH1cbiAqICAgXVxuICogICAvLyBOZXN0aW5nIHBhdGhzIHdpbGwgY3JlYXRlIGEgaG9sZSB3aGVyZSB0aGV5IG92ZXJsYXA7XG4gKiAgIG5lc3RlZFBhdGhzOiBBcnJheTxBcnJheTxMYXRMbmdMaXRlcmFsPj4gPSBbW1xuICogICAgIHsgbGF0OiAwLCAgbG5nOiAxMCB9LFxuICogICAgIHsgbGF0OiAwLCAgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiAxMCwgbG5nOiAxMCB9LFxuICogICAgIHsgbGF0OiAwLCAgbG5nOiAxMCB9XG4gKiAgIF0sIFtcbiAqICAgICB7IGxhdDogMCwgbG5nOiAxNSB9LFxuICogICAgIHsgbGF0OiAwLCBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDUsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogNSwgbG5nOiAxNSB9LFxuICogICAgIHsgbGF0OiAwLCBsbmc6IDE1IH1cbiAqICAgXV1cbiAqIH1cbiAqIGBgYFxuICovXG52YXIgQWdtUG9seWdvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtUG9seWdvbihfcG9seWdvbk1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fcG9seWdvbk1hbmFnZXIgPSBfcG9seWdvbk1hbmFnZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIFBvbHlnb24gaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBzaGFwZSBvdmVyIHRoZSBtYXAuIFRoZSBnZW9kZXNpY1xuICAgICAgICAgKiBwcm9wZXJ0eSBkZWZpbmVzIHRoZSBtb2RlIG9mIGRyYWdnaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHNoYXBlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sXG4gICAgICAgICAqIHBvaW50cyBzaG93biBhdCB0aGUgdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGVuIHRydWUsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSBpbnRlcnByZXRlZCBhcyBnZW9kZXNpYyBhbmQgd2lsbFxuICAgICAgICAgKiBmb2xsb3cgdGhlIGN1cnZhdHVyZSBvZiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZVxuICAgICAgICAgKiByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYVxuICAgICAgICAgKiBnZW9kZXNpYyBwb2x5Z29uIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcbiAgICAgICAgICogYXJlIG1haW50YWluZWQgcmVsYXRpdmUgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVhcnRoLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2VvZGVzaWMgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvcmRlcmVkIHNlcXVlbmNlIG9mIGNvb3JkaW5hdGVzIHRoYXQgZGVzaWduYXRlcyBhIGNsb3NlZCBsb29wLlxuICAgICAgICAgKiBVbmxpa2UgcG9seWxpbmVzLCBhIHBvbHlnb24gbWF5IGNvbnNpc3Qgb2Ygb25lIG9yIG1vcmUgcGF0aHMuXG4gICAgICAgICAqICBBcyBhIHJlc3VsdCwgdGhlIHBhdGhzIHByb3BlcnR5IG1heSBzcGVjaWZ5IG9uZSBvciBtb3JlIGFycmF5cyBvZlxuICAgICAgICAgKiBMYXRMbmcgY29vcmRpbmF0ZXMuIFBhdGhzIGFyZSBjbG9zZWQgYXV0b21hdGljYWxseTsgZG8gbm90IHJlcGVhdCB0aGVcbiAgICAgICAgICogZmlyc3QgdmVydGV4IG9mIHRoZSBwYXRoIGFzIHRoZSBsYXN0IHZlcnRleC4gU2ltcGxlIHBvbHlnb25zIG1heSBiZVxuICAgICAgICAgKiBkZWZpbmVkIHVzaW5nIGEgc2luZ2xlIGFycmF5IG9mIExhdExuZ3MuIE1vcmUgY29tcGxleCBwb2x5Z29ucyBtYXlcbiAgICAgICAgICogc3BlY2lmeSBhbiBhcnJheSBvZiBhcnJheXMuIEFueSBzaW1wbGUgYXJyYXlzIGFyZSBjb252ZXJ0ZWQgaW50byBBcnJheXMuXG4gICAgICAgICAqIEluc2VydGluZyBvciByZW1vdmluZyBMYXRMbmdzIGZyb20gdGhlIEFycmF5IHdpbGwgYXV0b21hdGljYWxseSB1cGRhdGVcbiAgICAgICAgICogdGhlIHBvbHlnb24gb24gdGhlIG1hcC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGF0aHMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWdvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9seURibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5RHJhZyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgcG9seWdvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9seURyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5RHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5TW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vtb3ZlIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5TW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5Z29uIG1vdXNlb3V0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5TW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5TW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGUgdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVuIGlzIGZpcmVkIHdoZW4gdGhlIFBvbHlnb24gaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9seVJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gW107XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5uZ0FmdGVyQ29udGVudEluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5zZXRQb2x5Z29uT3B0aW9ucyh0aGlzLCB0aGlzLl91cGRhdGVQb2x5Z29uT3B0aW9ucyhjaGFuZ2VzKSk7XG4gICAgfTtcbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuYWRkUG9seWdvbih0aGlzKTtcbiAgICAgICAgdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZGJjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seURibENsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RHJhZy5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ2VuZCcsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seURyYWdFbmQuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdzdGFydCcsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seURyYWdTdGFydC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vkb3duJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5TW91c2VEb3duLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW1vdmUnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlNb3VzZU1vdmUuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3V0JywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5TW91c2VPdXQuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlb3ZlcicsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seU1vdXNlT3Zlci5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2V1cCcsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seU1vdXNlVXAuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JpZ2h0Y2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlSaWdodENsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgIF07XG4gICAgICAgIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgdmFyIG9zID0gX3RoaXMuX3BvbHlnb25NYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgX3RoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5fdXBkYXRlUG9seWdvbk9wdGlvbnMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY2hhbmdlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbVBvbHlnb24uX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMTsgfSlcbiAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwgaykge1xuICAgICAgICAgICAgb2JqW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9LCB7fSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWdvbi5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9pZDsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWdvbi5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLmRlbGV0ZVBvbHlnb24odGhpcyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtUG9seWdvbjtcbn0oKSk7XG5leHBvcnQgeyBBZ21Qb2x5Z29uIH07XG5BZ21Qb2x5Z29uLl9wb2x5Z29uT3B0aW9uc0F0dHJpYnV0ZXMgPSBbXG4gICAgJ2NsaWNrYWJsZScsICdkcmFnZ2FibGUnLCAnZWRpdGFibGUnLCAnZmlsbENvbG9yJywgJ2ZpbGxPcGFjaXR5JywgJ2dlb2Rlc2ljJywgJ2ljb24nLCAnbWFwJyxcbiAgICAncGF0aHMnLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VXZWlnaHQnLCAndmlzaWJsZScsICd6SW5kZXgnLCAnZHJhZ2dhYmxlJyxcbiAgICAnZWRpdGFibGUnLCAndmlzaWJsZSdcbl07XG5BZ21Qb2x5Z29uLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20tcG9seWdvbidcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtUG9seWdvbi5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IFBvbHlnb25NYW5hZ2VyLCB9LFxuXTsgfTtcbkFnbVBvbHlnb24ucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2NsaWNrYWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dhYmxlJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsncG9seURyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2VkaXRhYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdmaWxsQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2ZpbGxPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdnZW9kZXNpYyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAncGF0aHMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZUNvbG9yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VXZWlnaHQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Zpc2libGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAncG9seUNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seURibENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seURyYWcnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5RHJhZ0VuZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlEcmFnU3RhcnQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5TW91c2VEb3duJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seU1vdXNlTW92ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlNb3VzZU91dCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlNb3VzZU92ZXInOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5TW91c2VVcCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlSaWdodENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2x5Z29uLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL3BvbHlnb24uanNcbi8vIG1vZHVsZSBpZCA9IDg4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiaW1wb3J0IHsgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9wb2x5bGluZS1wb2ludCc7XG52YXIgcG9seWxpbmVJZCA9IDA7XG4vKipcbiAqIEFnbVBvbHlsaW5lIHJlbmRlcnMgYSBwb2x5bGluZSBvbiBhIHtAbGluayBBZ21NYXB9XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tcG9seWxpbmU+XG4gKiAgICAgICAgICA8YWdtLXBvbHlsaW5lLXBvaW50IFtsYXRpdHVkZV09XCJsYXRBXCIgW2xvbmdpdHVkZV09XCJsbmdBXCI+XG4gKiAgICAgICAgICA8L2FnbS1wb2x5bGluZS1wb2ludD5cbiAqICAgICAgICAgIDxhZ20tcG9seWxpbmUtcG9pbnQgW2xhdGl0dWRlXT1cImxhdEJcIiBbbG9uZ2l0dWRlXT1cImxuZ0JcIj5cbiAqICAgICAgICAgIDwvYWdtLXBvbHlsaW5lLXBvaW50PlxuICogICAgICA8L2FnbS1wb2x5bGluZT5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbnZhciBBZ21Qb2x5bGluZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtUG9seWxpbmUoX3BvbHlsaW5lTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIgPSBfcG9seWxpbmVNYW5hZ2VyO1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBQb2x5bGluZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xpY2thYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljIHByb3BlcnR5IGRlZmluZXMgdGhlXG4gICAgICAgICAqIG1vZGUgb2YgZHJhZ2dpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0IHRoZVxuICAgICAgICAgKiB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mXG4gICAgICAgICAqIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS5cbiAgICAgICAgICogTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xuICAgICAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZW9kZXNpYyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGlzIHBvbHlsaW5lIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZURibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZURyYWcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVNb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3V0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lTW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3Zlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW4gaXMgZmlyZWQgd2hlbiB0aGUgUG9seWxpbmUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZVJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLl9pZCA9IChwb2x5bGluZUlkKyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5bGluZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gcG9pbnQucG9zaXRpb25DaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7IF90aGlzLl9wb2x5bGluZU1hbmFnZXIudXBkYXRlUG9seWxpbmVQb2ludHMoX3RoaXMpOyB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHMgPSB0aGlzLnBvaW50cy5jaGFuZ2VzLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKF90aGlzKTsgfSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKHRoaXMpO1xuICAgIH07XG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbVBvbHlsaW5lLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xOyB9KTtcbiAgICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IHJldHVybiBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuc2V0UG9seWxpbmVPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuYWRkUG9seWxpbmUodGhpcyk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEYmxDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZURyYWcuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdlbmQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEcmFnRW5kLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnc3RhcnQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEcmFnU3RhcnQuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZU1vdXNlRG93bi5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lTW91c2VNb3ZlLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZU1vdXNlT3V0LmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVNb3VzZU92ZXIuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVNb3VzZVVwLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyaWdodGNsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lUmlnaHRDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICBdO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBvcyA9IF90aGlzLl9wb2x5bGluZU1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCBfdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgICAgICAgIF90aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5bGluZS5wcm90b3R5cGUuX2dldFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9pbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMudG9BcnJheSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5bGluZS5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9pZDsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuZGVsZXRlUG9seWxpbmUodGhpcyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtUG9seWxpbmU7XG59KCkpO1xuZXhwb3J0IHsgQWdtUG9seWxpbmUgfTtcbkFnbVBvbHlsaW5lLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzID0gW1xuICAgICdkcmFnZ2FibGUnLCAnZWRpdGFibGUnLCAndmlzaWJsZScsICdnZW9kZXNpYycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3pJbmRleCdcbl07XG5BZ21Qb2x5bGluZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Qb2x5bGluZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IFBvbHlsaW5lTWFuYWdlciwgfSxcbl07IH07XG5BZ21Qb2x5bGluZS5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnY2xpY2thYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydwb2x5bGluZURyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2VkaXRhYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdnZW9kZXNpYyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZU9wYWNpdHknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZVdlaWdodCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndmlzaWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnekluZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsaW5lQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lRGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lRHJhZyc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVEcmFnRW5kJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZURyYWdTdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVNb3VzZURvd24nOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lTW91c2VNb3ZlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZU1vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZU1vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVNb3VzZVVwJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZVJpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2ludHMnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGRyZW4sIGFyZ3M6IFtBZ21Qb2x5bGluZVBvaW50LF0gfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlsaW5lLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL3BvbHlsaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA4ODFcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyAxOCAxOSIsInZhciBXaW5kb3dSZWYgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdpbmRvd1JlZigpIHtcbiAgICB9XG4gICAgV2luZG93UmVmLnByb3RvdHlwZS5nZXROYXRpdmVXaW5kb3cgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3c7IH07XG4gICAgcmV0dXJuIFdpbmRvd1JlZjtcbn0oKSk7XG5leHBvcnQgeyBXaW5kb3dSZWYgfTtcbnZhciBEb2N1bWVudFJlZiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnRSZWYoKSB7XG4gICAgfVxuICAgIERvY3VtZW50UmVmLnByb3RvdHlwZS5nZXROYXRpdmVEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50OyB9O1xuICAgIHJldHVybiBEb2N1bWVudFJlZjtcbn0oKSk7XG5leHBvcnQgeyBEb2N1bWVudFJlZiB9O1xuZXhwb3J0IHZhciBCUk9XU0VSX0dMT0JBTFNfUFJPVklERVJTID0gW1dpbmRvd1JlZiwgRG9jdW1lbnRSZWZdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1nbG9iYWxzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS91dGlscy9icm93c2VyLWdsb2JhbHMuanNcbi8vIG1vZHVsZSBpZCA9IDg4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiLy8gbWFpbiBtb2R1bGVzXG5leHBvcnQgKiBmcm9tICcuL2RpcmVjdGl2ZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcyc7XG4vLyBjb3JlIG1vZHVsZVxuLy8gd2UgZXhwbGljaXRseSBleHBvcnQgdGhlIG1vZHVsZSBoZXJlIHRvIHByZXZlbnQgdGhpcyBJb25pYyAyIGJ1Zzpcbi8vIGh0dHA6Ly9zdGV2ZW1pY2hlbG90dGkuY29tL2ludGVncmF0ZS1hbmd1bGFyLTItZ29vZ2xlLW1hcHMtaW50by1pb25pYy0yL1xuZXhwb3J0IHsgQWdtQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS5tb2R1bGUnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5MjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyAxOCAxOSIsImV4cG9ydCB7IEFnbU1hcCB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXAnO1xuZXhwb3J0IHsgQWdtQ2lyY2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NpcmNsZSc7XG5leHBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9kaXJlY3RpdmVzL2luZm8td2luZG93JztcbmV4cG9ydCB7IEFnbUttbExheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ttbC1sYXllcic7XG5leHBvcnQgeyBBZ21EYXRhTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGF0YS1sYXllcic7XG5leHBvcnQgeyBBZ21NYXJrZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFya2VyJztcbmV4cG9ydCB7IEFnbVBvbHlnb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWdvbic7XG5leHBvcnQgeyBBZ21Qb2x5bGluZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZSc7XG5leHBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDkyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5IiwiZXhwb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmV4cG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcbmV4cG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcbmV4cG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyJztcbmV4cG9ydCB7IFBvbHlnb25NYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xuZXhwb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmV4cG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xuZXhwb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyJztcbmV4cG9ydCB7IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbCwgTEFaWV9NQVBTX0FQSV9DT05GSUcsIExhenlNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXInO1xuZXhwb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlcic7XG5leHBvcnQgeyBOb09wTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL25vb3AtbWFwcy1hcGktbG9hZGVyJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy5qc1xuLy8gbW9kdWxlIGlkID0gOTI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCIvKipcbiAqIFdoZW4gdXNpbmcgdGhlIE5vT3BNYXBzQVBJTG9hZGVyLCB0aGUgR29vZ2xlIE1hcHMgQVBJIG11c3QgYmUgYWRkZWQgdG8gdGhlIHBhZ2UgdmlhIGEgYDxzY3JpcHQ+YFxuICogVGFnLlxuICogSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgR29vZ2xlIE1hcHMgQVBJIHNjcmlwdCBnZXRzIGxvYWRlZCBmaXJzdCBvbiB0aGUgcGFnZS5cbiAqL1xudmFyIE5vT3BNYXBzQVBJTG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOb09wTWFwc0FQSUxvYWRlcigpIHtcbiAgICB9XG4gICAgTm9PcE1hcHNBUElMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghd2luZG93Lmdvb2dsZSB8fCAhd2luZG93Lmdvb2dsZS5tYXBzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dvb2dsZSBNYXBzIEFQSSBub3QgbG9hZGVkIG9uIHBhZ2UuIE1ha2Ugc3VyZSB3aW5kb3cuZ29vZ2xlLm1hcHMgaXMgYXZhaWxhYmxlIScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBOb09wTWFwc0FQSUxvYWRlcjtcbn0oKSk7XG5leHBvcnQgeyBOb09wTWFwc0FQSUxvYWRlciB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9vcC1tYXBzLWFwaS1sb2FkZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9ub29wLW1hcHMtYXBpLWxvYWRlci5qc1xuLy8gbW9kdWxlIGlkID0gOTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMTcgMTggMTkiLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWdtTWFwIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcCc7XG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2lyY2xlJztcbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcmtlcic7XG5pbXBvcnQgeyBBZ21Qb2x5Z29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xuaW1wb3J0IHsgQWdtUG9seWxpbmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUnO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludCc7XG5pbXBvcnQgeyBBZ21LbWxMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9rbWwtbGF5ZXInO1xuaW1wb3J0IHsgQWdtRGF0YUxheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RhdGEtbGF5ZXInO1xuaW1wb3J0IHsgTGF6eU1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlcic7XG5pbXBvcnQgeyBMQVpZX01BUFNfQVBJX0NPTkZJRyB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuaW1wb3J0IHsgQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUyB9IGZyb20gJy4vdXRpbHMvYnJvd3Nlci1nbG9iYWxzJztcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JlRGlyZWN0aXZlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBBZ21NYXAsIEFnbU1hcmtlciwgQWdtSW5mb1dpbmRvdywgQWdtQ2lyY2xlLFxuICAgICAgICBBZ21Qb2x5Z29uLCBBZ21Qb2x5bGluZSwgQWdtUG9seWxpbmVQb2ludCwgQWdtS21sTGF5ZXIsXG4gICAgICAgIEFnbURhdGFMYXllclxuICAgIF07XG59XG4vKipcbiAqIFRoZSBhbmd1bGFyLWdvb2dsZS1tYXBzIGNvcmUgbW9kdWxlLiBDb250YWlucyBhbGwgRGlyZWN0aXZlcy9TZXJ2aWNlcy9QaXBlc1xuICogb2YgdGhlIGNvcmUgbW9kdWxlLiBQbGVhc2UgdXNlIGBBZ21Db3JlTW9kdWxlLmZvclJvb3QoKWAgaW4geW91ciBhcHAgbW9kdWxlLlxuICovXG52YXIgQWdtQ29yZU1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtQ29yZU1vZHVsZSgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGxlYXNlIHVzZSB0aGlzIG1ldGhvZCB3aGVuIHlvdSByZWdpc3RlciB0aGUgbW9kdWxlIGF0IHRoZSByb290IGxldmVsLlxuICAgICAqL1xuICAgIEFnbUNvcmVNb2R1bGUuZm9yUm9vdCA9IGZ1bmN0aW9uIChsYXp5TWFwc0FQSUxvYWRlckNvbmZpZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFnbUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IEJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMuY29uY2F0KFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE1hcHNBUElMb2FkZXIsIHVzZUNsYXNzOiBMYXp5TWFwc0FQSUxvYWRlciB9LFxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogTEFaWV9NQVBTX0FQSV9DT05GSUcsIHVzZVZhbHVlOiBsYXp5TWFwc0FQSUxvYWRlckNvbmZpZyB9XG4gICAgICAgICAgICBdKSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21Db3JlTW9kdWxlO1xufSgpKTtcbmV4cG9ydCB7IEFnbUNvcmVNb2R1bGUgfTtcbkFnbUNvcmVNb2R1bGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbeyBkZWNsYXJhdGlvbnM6IGNvcmVEaXJlY3RpdmVzKCksIGV4cG9ydHM6IGNvcmVEaXJlY3RpdmVzKCkgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Db3JlTW9kdWxlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLm1vZHVsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvY29yZS5tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDkyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IDE4IDE5Il0sInNvdXJjZVJvb3QiOiIifQ==