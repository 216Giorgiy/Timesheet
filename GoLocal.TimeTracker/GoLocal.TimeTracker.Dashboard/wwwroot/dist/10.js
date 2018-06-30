webpackJsonp([10],{

/***/ 820:
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
var core_2 = __webpack_require__(846);
var shared_module_1 = __webpack_require__(99);
var widgets_component_1 = __webpack_require__(875);
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

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsAPIWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_api_loader_maps_api_loader__ = __webpack_require__(824);



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

/***/ 824:
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

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarkerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);



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

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircleManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);



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

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoWindowManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__marker_manager__ = __webpack_require__(825);




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

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolygonManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);



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

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolylineManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);



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

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KmlLayerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);



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

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataLayerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(822);



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

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmInfoWindow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_info_window_manager__ = __webpack_require__(827);


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

/***/ 833:
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

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsScriptProtocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LAZY_MAPS_API_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LazyMapsAPILoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_browser_globals__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_api_loader__ = __webpack_require__(824);
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

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_google_maps_api_wrapper__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_managers_circle_manager__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_managers_info_window_manager__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_managers_marker_manager__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_managers_polygon_manager__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_managers_polyline_manager__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_managers_kml_layer_manager__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_managers_data_layer_manager__ = __webpack_require__(831);









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

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmCircle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__ = __webpack_require__(826);


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

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmKmlLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_kml_layer_manager__ = __webpack_require__(830);


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

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmDataLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_data_layer_manager__ = __webpack_require__(831);


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

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmMarker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_marker_manager__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info_window__ = __webpack_require__(832);



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

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolygon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_polygon_manager__ = __webpack_require__(828);


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

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolyline; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_polyline_manager__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyline_point__ = __webpack_require__(833);



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

/***/ 842:
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

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives__ = __webpack_require__(847);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmMap", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmCircle", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmInfoWindow", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmKmlLayer", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmDataLayer", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmMarker", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolygon", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolyline", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolylinePoint", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(848);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_module__ = __webpack_require__(850);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AgmCoreModule", function() { return __WEBPACK_IMPORTED_MODULE_2__core_module__["a"]; });
// main modules


// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_map__ = __webpack_require__(835);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__directives_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_circle__ = __webpack_require__(836);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__directives_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_info_window__ = __webpack_require__(832);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__directives_info_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_kml_layer__ = __webpack_require__(837);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__directives_kml_layer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_data_layer__ = __webpack_require__(838);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__directives_data_layer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_marker__ = __webpack_require__(839);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__directives_marker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_polygon__ = __webpack_require__(840);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__directives_polygon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_polyline__ = __webpack_require__(841);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__directives_polyline__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_polyline_point__ = __webpack_require__(833);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__directives_polyline_point__["a"]; });









//# sourceMappingURL=directives.js.map

/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_google_maps_api_wrapper__ = __webpack_require__(822);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__services_google_maps_api_wrapper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__ = __webpack_require__(826);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_managers_info_window_manager__ = __webpack_require__(827);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__services_managers_info_window_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_managers_marker_manager__ = __webpack_require__(825);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_3__services_managers_marker_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_managers_polygon_manager__ = __webpack_require__(828);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_4__services_managers_polygon_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_managers_polyline_manager__ = __webpack_require__(829);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_5__services_managers_polyline_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_managers_kml_layer_manager__ = __webpack_require__(830);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__services_managers_kml_layer_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_managers_data_layer_manager__ = __webpack_require__(831);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__services_managers_data_layer_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__(834);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_maps_api_loader_maps_api_loader__ = __webpack_require__(824);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__services_maps_api_loader_maps_api_loader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_noop_maps_api_loader__ = __webpack_require__(849);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_noop_maps_api_loader__["a"]; });











//# sourceMappingURL=services.js.map

/***/ }),

/***/ 849:
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

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export coreDirectives */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmCoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_map__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_circle__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_info_window__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_marker__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_polygon__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_polyline__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_polyline_point__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_kml_layer__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_data_layer__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_maps_api_loader_maps_api_loader__ = __webpack_require__(824);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_browser_globals__ = __webpack_require__(842);














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

/***/ }),

/***/ 875:
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
            template: __webpack_require__(876),
            styles: [__webpack_require__(877)]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], WidgetsComponent);
    return WidgetsComponent;
}());
exports.WidgetsComponent = WidgetsComponent;


/***/ }),

/***/ 876:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading\">Work Time Report</div>\r\n<!-- START row-->\r\n<div class=\"row\">\r\n\r\n    <div class=\"col-md-12\">\r\n        <div class=\"panel WhiteBG\" id=\"panelChart9\">\r\n          \r\n            <div class=\"panel-heading\">\r\n                <div class=\"panel-title\"> <h2>Your time trends </h2></div>\r\n                <p> Your stats are based on your email and calendarHow we calculate</p>\r\n            </div>\r\n            <div class=\"panel-wrapper\">\r\n                <div class=\"panel-body\">\r\n                    <div flot [dataset]=\"splineData\" [options]=\"splineOptions\" height=\"300\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n"

/***/ }),

/***/ 877:
/***/ (function(module, exports) {

module.exports = ""

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy93aWRnZXRzL3dpZGdldHMubW9kdWxlLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2luZm8td2luZG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9jaXJjbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2ttbC1sYXllci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvZGF0YS1sYXllci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvbWFya2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9wb2x5Z29uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9wb2x5bGluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3V0aWxzL2Jyb3dzZXItZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL25vb3AtbWFwcy1hcGktbG9hZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvY29yZS5tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvcm91dGVzL3dpZGdldHMvd2lkZ2V0cy93aWRnZXRzLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvcm91dGVzL3dpZGdldHMvd2lkZ2V0cy93aWRnZXRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXlDO0FBQ3pDLHVDQUF1RDtBQUN2RCxzQ0FBMEM7QUFFMUMsOENBQTBEO0FBQzFELG1EQUErRDtBQUUvRCxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLG9DQUFnQixFQUFFO0NBQzVDLENBQUM7QUFlRjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQWJ6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsNEJBQVk7Z0JBQ1oscUJBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM3QixvQkFBYSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsTUFBTSxFQUFFLHlDQUF5QztpQkFDcEQsQ0FBQzthQUNMO1lBQ0QsWUFBWSxFQUFFLENBQUMsb0NBQWdCLENBQUM7WUFDaEMsT0FBTyxFQUFFO2dCQUNMLHFCQUFZO2FBQ2Y7U0FDSixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQTtBQUFqQixzQ0FBYTs7Ozs7Ozs7Ozs7Ozs7QUN4Qkc7QUFDUjtBQUNHO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLDhCQUE4QixFQUFFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQ0FBcUMsdUJBQXVCLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxjQUFj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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0RBQW9EO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsK0JBQStCLDBDQUEwQyxFQUFFO0FBQzNFLGtDQUFrQyxpQ0FBaUMsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCx3QkFBd0IsRUFBRTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVB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O0FBQ0EscUM7Ozs7Ozs7Ozs7O0FDMUhpRDtBQUN0QjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVk7QUFDdkIsV0FBVyx1QkFBdUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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bUIiLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSBmcm9tICdAYWdtL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBXaWRnZXRzQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gICAgeyBwYXRoOiAnJywgY29tcG9uZW50OiBXaWRnZXRzQ29tcG9uZW50IH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpLFxyXG4gICAgICAgIEFnbUNvcmVNb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgICAgIGFwaUtleTogJ0FJemFTeUJOczQyUnRfQ3l4QXFkYklCSzBhNVV0ODNRaWF1RVNQQSdcclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1dpZGdldHNDb21wb25lbnRdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIFJvdXRlck1vZHVsZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2lkZ2V0c01vZHVsZSB7IH1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGVyLWxvYWRlci9zcmMhLi9ub2RlX21vZHVsZXMvYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzLm1vZHVsZS50cyIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcbi8qKlxuICogV3JhcHBlciBjbGFzcyB0aGF0IGhhbmRsZXMgdGhlIGNvbW11bmljYXRpb24gd2l0aCB0aGUgR29vZ2xlIE1hcHMgSmF2YXNjcmlwdFxuICogQVBJIHYzXG4gKi9cbnZhciBHb29nbGVNYXBzQVBJV3JhcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR29vZ2xlTWFwc0FQSVdyYXBwZXIoX2xvYWRlciwgX3pvbmUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbG9hZGVyID0gX2xvYWRlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9tYXAgPVxuICAgICAgICAgICAgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgX3RoaXMuX21hcFJlc29sdmVyID0gcmVzb2x2ZTsgfSk7XG4gICAgfVxuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVNYXAgPSBmdW5jdGlvbiAoZWwsIG1hcE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5sb2FkKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbCwgbWFwT3B0aW9ucyk7XG4gICAgICAgICAgICBfdGhpcy5fbWFwUmVzb2x2ZXIobWFwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuc2V0TWFwT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtKSB7IG0uc2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZ29vZ2xlIG1hcCBtYXJrZXIgd2l0aCB0aGUgbWFwIGNvbnRleHRcbiAgICAgKi9cbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlTWFya2VyID0gZnVuY3Rpb24gKG9wdGlvbnMsIGFkZFRvTWFwKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIGlmIChhZGRUb01hcCA9PT0gdm9pZCAwKSB7IGFkZFRvTWFwID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgaWYgKGFkZFRvTWFwKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5tYXAgPSBtYXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcihvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlSW5mb1dpbmRvdyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyhvcHRpb25zKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZ29vZ2xlLm1hcC5DaXJjbGUgZm9yIHRoZSBjdXJyZW50IG1hcC5cbiAgICAgKi9cbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlQ2lyY2xlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgIG9wdGlvbnMubWFwID0gbWFwO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5DaXJjbGUob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmNyZWF0ZVBvbHlsaW5lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlTWFwKCkudGhlbihmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShvcHRpb25zKTtcbiAgICAgICAgICAgIGxpbmUuc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlUG9seWdvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgdmFyIHBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihvcHRpb25zKTtcbiAgICAgICAgICAgIHBvbHlnb24uc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICByZXR1cm4gcG9seWdvbjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGdvb2dsZS5tYXAuRGF0YSBsYXllciBmb3IgdGhlIGN1cnJlbnQgbWFwXG4gICAgICovXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmNyZWF0ZURhdGFMYXllciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBuZXcgZ29vZ2xlLm1hcHMuRGF0YShvcHRpb25zKTtcbiAgICAgICAgICAgIGRhdGEuc2V0TWFwKG0pO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyBpZiBnaXZlbiBjb29yZGluYXRlcyBhcmUgaW5zaXRlIGEgUG9seWdvbiBwYXRoLlxuICAgICAqL1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jb250YWluc0xvY2F0aW9uID0gZnVuY3Rpb24gKGxhdExuZywgcG9seWdvbikge1xuICAgICAgICByZXR1cm4gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkucG9seS5jb250YWluc0xvY2F0aW9uKGxhdExuZywgcG9seWdvbik7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuc3Vic2NyaWJlVG9NYXBFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgX3RoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgbS5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChhcmcpIHsgX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoYXJnKTsgfSk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uIChsYXRMbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5zZXRDZW50ZXIobGF0TG5nKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuZ2V0Wm9vbSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5nZXRab29tKCk7IH0pOyB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAuZ2V0Qm91bmRzKCk7IH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLnNldFpvb20gPSBmdW5jdGlvbiAoem9vbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLnNldFpvb20oem9vbSk7IH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5nZXRDZW50ZXIoKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUucGFuVG8gPSBmdW5jdGlvbiAobGF0TG5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAucGFuVG8obGF0TG5nKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUucGFuQnkgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLnBhbkJ5KHgsIHkpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5maXRCb3VuZHMgPSBmdW5jdGlvbiAobGF0TG5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAuZml0Qm91bmRzKGxhdExuZyk7IH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLnBhblRvQm91bmRzID0gZnVuY3Rpb24gKGxhdExuZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLnBhblRvQm91bmRzKGxhdExuZyk7IH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmF0aXZlIEdvb2dsZSBNYXBzIE1hcCBpbnN0YW5jZS4gQmUgY2FyZWZ1bCB3aGVuIHVzaW5nIHRoaXMgaW5zdGFuY2UgZGlyZWN0bHkuXG4gICAgICovXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmdldE5hdGl2ZU1hcCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcDsgfTtcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB0aGUgZ2l2ZW4gZXZlbnQgbmFtZSBvbiB0aGUgbWFwIGluc3RhbmNlLlxuICAgICAqL1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS50cmlnZ2VyTWFwRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihtLCBldmVudE5hbWUpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBHb29nbGVNYXBzQVBJV3JhcHBlcjtcbn0oKSk7XG5leHBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9O1xuR29vZ2xlTWFwc0FQSVdyYXBwZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkdvb2dsZU1hcHNBUElXcmFwcGVyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogTWFwc0FQSUxvYWRlciwgfSxcbiAgICB7IHR5cGU6IE5nWm9uZSwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nb29nbGUtbWFwcy1hcGktd3JhcHBlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG52YXIgTWFwc0FQSUxvYWRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFwc0FQSUxvYWRlcigpIHtcbiAgICB9XG4gICAgcmV0dXJuIE1hcHNBUElMb2FkZXI7XG59KCkpO1xuZXhwb3J0IHsgTWFwc0FQSUxvYWRlciB9O1xuTWFwc0FQSUxvYWRlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuTWFwc0FQSUxvYWRlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy1hcGktbG9hZGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4MjRcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgTWFya2VyTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFya2VyTWFuYWdlcihfbWFwc1dyYXBwZXIsIF96b25lKSB7XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyID0gX21hcHNXcmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX21hcmtlcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLmRlbGV0ZU1hcmtlciA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBtYXJrZXIgYWxyZWFkeSBkZWxldGVkXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21hcmtlcnMuZGVsZXRlKG1hcmtlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVNYXJrZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRQb3NpdGlvbih7IGxhdDogbWFya2VyLmxhdGl0dWRlLCBsbmc6IG1hcmtlci5sb25naXR1ZGUgfSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlVGl0bGUgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0VGl0bGUobWFya2VyLnRpdGxlKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVMYWJlbCA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyBtLnNldExhYmVsKG1hcmtlci5sYWJlbCk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlRHJhZ2dhYmxlID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldERyYWdnYWJsZShtYXJrZXIuZHJhZ2dhYmxlKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldEljb24obWFya2VyLmljb25VcmwpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZU9wYWNpdHkgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0T3BhY2l0eShtYXJrZXIub3BhY2l0eSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlVmlzaWJsZSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRWaXNpYmxlKG1hcmtlci52aXNpYmxlKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVaSW5kZXggPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0WkluZGV4KG1hcmtlci56SW5kZXgpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZUNsaWNrYWJsZSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRDbGlja2FibGUobWFya2VyLmNsaWNrYWJsZSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICB2YXIgbWFya2VyUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZU1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbjogeyBsYXQ6IG1hcmtlci5sYXRpdHVkZSwgbG5nOiBtYXJrZXIubG9uZ2l0dWRlIH0sXG4gICAgICAgICAgICBsYWJlbDogbWFya2VyLmxhYmVsLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBtYXJrZXIuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgaWNvbjogbWFya2VyLmljb25VcmwsXG4gICAgICAgICAgICBvcGFjaXR5OiBtYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIHZpc2libGU6IG1hcmtlci52aXNpYmxlLFxuICAgICAgICAgICAgekluZGV4OiBtYXJrZXIuekluZGV4LFxuICAgICAgICAgICAgdGl0bGU6IG1hcmtlci50aXRsZSxcbiAgICAgICAgICAgIGNsaWNrYWJsZTogbWFya2VyLmNsaWNrYWJsZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zZXQobWFya2VyLCBtYXJrZXJQcm9taXNlKTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLmdldE5hdGl2ZU1hcmtlciA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcik7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBtYXJrZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgX3RoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIG0uYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNYXJrZXJNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IE1hcmtlck1hbmFnZXIgfTtcbk1hcmtlck1hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbk1hcmtlck1hbmFnZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgfSxcbiAgICB7IHR5cGU6IE5nWm9uZSwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXJrZXItbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgQ2lyY2xlTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2lyY2xlTWFuYWdlcihfYXBpV3JhcHBlciwgX3pvbmUpIHtcbiAgICAgICAgdGhpcy5fYXBpV3JhcHBlciA9IF9hcGlXcmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX2NpcmNsZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLmFkZENpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdGhpcy5fY2lyY2xlcy5zZXQoY2lyY2xlLCB0aGlzLl9hcGlXcmFwcGVyLmNyZWF0ZUNpcmNsZSh7XG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiBjaXJjbGUubGF0aXR1ZGUsIGxuZzogY2lyY2xlLmxvbmdpdHVkZSB9LFxuICAgICAgICAgICAgY2xpY2thYmxlOiBjaXJjbGUuY2xpY2thYmxlLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBjaXJjbGUuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgZWRpdGFibGU6IGNpcmNsZS5lZGl0YWJsZSxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogY2lyY2xlLmZpbGxDb2xvcixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiBjaXJjbGUuZmlsbE9wYWNpdHksXG4gICAgICAgICAgICByYWRpdXM6IGNpcmNsZS5yYWRpdXMsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogY2lyY2xlLnN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogY2lyY2xlLnN0cm9rZU9wYWNpdHksXG4gICAgICAgICAgICBzdHJva2VQb3NpdGlvbjogY2lyY2xlLnN0cm9rZVBvc2l0aW9uLFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBjaXJjbGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgdmlzaWJsZTogY2lyY2xlLnZpc2libGUsXG4gICAgICAgICAgICB6SW5kZXg6IGNpcmNsZS56SW5kZXhcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gY2lyY2xlIGZyb20gdGhlIG1hcC5cbiAgICAgKi9cbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVDaXJjbGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIGMuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgX3RoaXMuX2NpcmNsZXMuZGVsZXRlKGNpcmNsZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChjaXJjbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5nZXRCb3VuZHMoKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuZ2V0Q2VudGVyKCk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuZ2V0UmFkaXVzID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmdldFJhZGl1cygpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5zZXRDZW50ZXIoeyBsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlIH0pOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnNldEVkaXRhYmxlID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldEVkaXRhYmxlKGNpcmNsZS5lZGl0YWJsZSk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0RHJhZ2dhYmxlID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldERyYWdnYWJsZShjaXJjbGUuZHJhZ2dhYmxlKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5zZXRWaXNpYmxlID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldFZpc2libGUoY2lyY2xlLnZpc2libGUpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnNldFJhZGl1cyA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5zZXRSYWRpdXMoY2lyY2xlLnJhZGl1cyk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2lyY2xlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICBfdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBjLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENpcmNsZU1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgQ2lyY2xlTWFuYWdlciB9O1xuQ2lyY2xlTWFuYWdlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQ2lyY2xlTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpcmNsZS1tYW5hZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gODI2XG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuL21hcmtlci1tYW5hZ2VyJztcbnZhciBJbmZvV2luZG93TWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5mb1dpbmRvd01hbmFnZXIoX21hcHNXcmFwcGVyLCBfem9uZSwgX21hcmtlck1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlciA9IF9tYXJrZXJNYW5hZ2VyO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmRlbGV0ZUluZm9XaW5kb3cgPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaVdpbmRvdyA9IHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KTtcbiAgICAgICAgaWYgKGlXaW5kb3cgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gaW5mbyB3aW5kb3cgYWxyZWFkeSBkZWxldGVkXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlXaW5kb3cudGhlbihmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaS5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9pbmZvV2luZG93cy5kZWxldGUoaW5mb1dpbmRvdyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuc2V0UG9zaXRpb24oe1xuICAgICAgICAgICAgbGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLFxuICAgICAgICAgICAgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZVxuICAgICAgICB9KTsgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuc2V0WkluZGV4ID0gZnVuY3Rpb24gKGluZm9XaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuc2V0WkluZGV4KGluZm9XaW5kb3cuekluZGV4KTsgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uIChpbmZvV2luZG93KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAodykge1xuICAgICAgICAgICAgaWYgKGluZm9XaW5kb3cuaG9zdE1hcmtlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9tYXJrZXJNYW5hZ2VyLmdldE5hdGl2ZU1hcmtlcihpbmZvV2luZG93Lmhvc3RNYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gdy5vcGVuKG1hcCwgbWFya2VyKTsgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gdy5vcGVuKG1hcCk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIChpbmZvV2luZG93KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAodykgeyByZXR1cm4gdy5jbG9zZSgpOyB9KTtcbiAgICB9O1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKGluZm9XaW5kb3csIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLmFkZEluZm9XaW5kb3cgPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IGluZm9XaW5kb3cuY29udGVudCxcbiAgICAgICAgICAgIG1heFdpZHRoOiBpbmZvV2luZG93Lm1heFdpZHRoLFxuICAgICAgICAgICAgekluZGV4OiBpbmZvV2luZG93LnpJbmRleCxcbiAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiBpbmZvV2luZG93LmRpc2FibGVBdXRvUGFuXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgaW5mb1dpbmRvdy5sYXRpdHVkZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGluZm9XaW5kb3cubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHsgbGF0OiBpbmZvV2luZG93LmxhdGl0dWRlLCBsbmc6IGluZm9XaW5kb3cubG9uZ2l0dWRlIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZm9XaW5kb3dQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlSW5mb1dpbmRvdyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd3Muc2V0KGluZm9XaW5kb3csIGluZm9XaW5kb3dQcm9taXNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBHb29nbGUgTWFwcyBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIEluZm9XaW5kb3cgYXMgYW4gT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBpbmZvV2luZG93KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIGkuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBJbmZvV2luZG93TWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9O1xuSW5mb1dpbmRvd01hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkluZm9XaW5kb3dNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG4gICAgeyB0eXBlOiBNYXJrZXJNYW5hZ2VyLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZm8td2luZG93LW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgUG9seWdvbk1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvbHlnb25NYW5hZ2VyKF9tYXBzV3JhcHBlciwgX3pvbmUpIHtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fcG9seWdvbnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFBvbHlnb25NYW5hZ2VyLnByb3RvdHlwZS5hZGRQb2x5Z29uID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWdvbih7XG4gICAgICAgICAgICBjbGlja2FibGU6IHBhdGguY2xpY2thYmxlLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBwYXRoLmRyYWdnYWJsZSxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwYXRoLmVkaXRhYmxlLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBwYXRoLmZpbGxDb2xvcixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiBwYXRoLmZpbGxPcGFjaXR5LFxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBhdGguZ2VvZGVzaWMsXG4gICAgICAgICAgICBwYXRoczogcGF0aC5wYXRocyxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwYXRoLnN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogcGF0aC5zdHJva2VPcGFjaXR5LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwYXRoLnN0cm9rZVdlaWdodCxcbiAgICAgICAgICAgIHZpc2libGU6IHBhdGgudmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogcGF0aC56SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb2x5Z29ucy5zZXQocGF0aCwgcG9seWdvblByb21pc2UpO1xuICAgIH07XG4gICAgUG9seWdvbk1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVBvbHlnb24gPSBmdW5jdGlvbiAocG9seWdvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4oZnVuY3Rpb24gKGwpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IGwuc2V0UGF0aHMocG9seWdvbi5wYXRocyk7IH0pOyB9KTtcbiAgICB9O1xuICAgIFBvbHlnb25NYW5hZ2VyLnByb3RvdHlwZS5zZXRQb2x5Z29uT3B0aW9ucyA9IGZ1bmN0aW9uIChwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aCkudGhlbihmdW5jdGlvbiAobCkgeyBsLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgUG9seWdvbk1hbmFnZXIucHJvdG90eXBlLmRlbGV0ZVBvbHlnb24gPSBmdW5jdGlvbiAocGF0aHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aHMpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3BvbHlnb25zLmRlbGV0ZShwYXRocyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQb2x5Z29uTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgcGF0aCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgICAgICBsLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUG9seWdvbk1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgUG9seWdvbk1hbmFnZXIgfTtcblBvbHlnb25NYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5Qb2x5Z29uTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlnb24tbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4Mjhcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xudmFyIFBvbHlsaW5lTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9seWxpbmVNYW5hZ2VyKF9tYXBzV3JhcHBlciwgX3pvbmUpIHtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgICB2YXIgcGF0aCA9IGxpbmUuX2dldFBvaW50cygpLm1hcChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGxhdDogcG9pbnQubGF0aXR1ZGUsIGxuZzogcG9pbnQubG9uZ2l0dWRlIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUuYWRkUG9seWxpbmUgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgICB2YXIgcGF0aCA9IFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyhsaW5lKTtcbiAgICAgICAgdmFyIHBvbHlsaW5lUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZVBvbHlsaW5lKHtcbiAgICAgICAgICAgIGNsaWNrYWJsZTogbGluZS5jbGlja2FibGUsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGxpbmUuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgZWRpdGFibGU6IGxpbmUuZWRpdGFibGUsXG4gICAgICAgICAgICBnZW9kZXNpYzogbGluZS5nZW9kZXNpYyxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBsaW5lLnN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogbGluZS5zdHJva2VPcGFjaXR5LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBsaW5lLnN0cm9rZVdlaWdodCxcbiAgICAgICAgICAgIHZpc2libGU6IGxpbmUudmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogbGluZS56SW5kZXgsXG4gICAgICAgICAgICBwYXRoOiBwYXRoXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb2x5bGluZXMuc2V0KGxpbmUsIHBvbHlsaW5lUHJvbWlzZSk7XG4gICAgfTtcbiAgICBQb2x5bGluZU1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVBvbHlsaW5lUG9pbnRzID0gZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHBhdGggPSBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMobGluZSk7XG4gICAgICAgIHZhciBtID0gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4oZnVuY3Rpb24gKGwpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IGwuc2V0UGF0aChwYXRoKTsgfSk7IH0pO1xuICAgIH07XG4gICAgUG9seWxpbmVNYW5hZ2VyLnByb3RvdHlwZS5zZXRQb2x5bGluZU9wdGlvbnMgPSBmdW5jdGlvbiAobGluZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKS50aGVuKGZ1bmN0aW9uIChsKSB7IGwuc2V0T3B0aW9ucyhvcHRpb25zKTsgfSk7XG4gICAgfTtcbiAgICBQb2x5bGluZU1hbmFnZXIucHJvdG90eXBlLmRlbGV0ZVBvbHlsaW5lID0gZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3BvbHlsaW5lcy5kZWxldGUobGluZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQb2x5bGluZU1hbmFnZXIucHJvdG90eXBlLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpbmUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgX3RoaXMuX3BvbHlsaW5lcy5nZXQobGluZSkudGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgICAgIGwuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBQb2x5bGluZU1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH07XG5Qb2x5bGluZU1hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cblBvbHlsaW5lTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlsaW5lLW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbi8qKlxuICogTWFuYWdlcyBhbGwgS01MIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxuICovXG52YXIgS21sTGF5ZXJNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBLbWxMYXllck1hbmFnZXIoX3dyYXBwZXIsIF96b25lKSB7XG4gICAgICAgIHRoaXMuX3dyYXBwZXIgPSBfd3JhcHBlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9sYXllcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgS01MIExheWVyIHRvIHRoZSBtYXAuXG4gICAgICovXG4gICAgS21sTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5hZGRLbWxMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuS21sTGF5ZXIoe1xuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogbGF5ZXIuY2xpY2thYmxlLFxuICAgICAgICAgICAgICAgIG1hcDogbSxcbiAgICAgICAgICAgICAgICBwcmVzZXJ2ZVZpZXdwb3J0OiBsYXllci5wcmVzZXJ2ZVZpZXdwb3J0LFxuICAgICAgICAgICAgICAgIHNjcmVlbk92ZXJsYXlzOiBsYXllci5zY3JlZW5PdmVybGF5cyxcbiAgICAgICAgICAgICAgICBzdXBwcmVzc0luZm9XaW5kb3dzOiBsYXllci5zdXBwcmVzc0luZm9XaW5kb3dzLFxuICAgICAgICAgICAgICAgIHVybDogbGF5ZXIudXJsLFxuICAgICAgICAgICAgICAgIHpJbmRleDogbGF5ZXIuekluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcbiAgICB9O1xuICAgIEttbExheWVyTWFuYWdlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChsYXllciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7IHJldHVybiBsLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgS21sTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVLbWxMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICBsLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgIF90aGlzLl9sYXllcnMuZGVsZXRlKGxheWVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBLbWxMYXllciBhcyBhbiBPYnNlcnZhYmxlXG4gICAgICovXG4gICAgS21sTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIG0uYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBLbWxMYXllck1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH07XG5LbWxMYXllck1hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkttbExheWVyTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWttbC1sYXllci1tYW5hZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gODMwXG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuLyoqXG4gKiBNYW5hZ2VzIGFsbCBEYXRhIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxuICovXG52YXIgRGF0YUxheWVyTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGF0YUxheWVyTWFuYWdlcihfd3JhcHBlciwgX3pvbmUpIHtcbiAgICAgICAgdGhpcy5fd3JhcHBlciA9IF93cmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX2xheWVycyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBEYXRhIExheWVyIHRvIHRoZSBtYXAuXG4gICAgICovXG4gICAgRGF0YUxheWVyTWFuYWdlci5wcm90b3R5cGUuYWRkRGF0YUxheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlRGF0YUxheWVyKHtcbiAgICAgICAgICAgIHN0eWxlOiBsYXllci5zdHlsZVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGlmIChsYXllci5nZW9Kc29uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RGF0YUZlYXR1cmVzKGQsIGxheWVyLmdlb0pzb24pLnRoZW4oZnVuY3Rpb24gKGZlYXR1cmVzKSB7IHJldHVybiBkLmZlYXR1cmVzID0gZmVhdHVyZXM7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XG4gICAgfTtcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVEYXRhTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICBfdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0YUxheWVyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlR2VvSnNvbiA9IGZ1bmN0aW9uIChsYXllciwgZ2VvSnNvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBsLnJlbW92ZShmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBsLmZlYXR1cmVzLmluZGV4T2YoZmVhdHVyZSwgMCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbC5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuZ2V0RGF0YUZlYXR1cmVzKGwsIGdlb0pzb24pLnRoZW4oZnVuY3Rpb24gKGZlYXR1cmVzKSB7IHJldHVybiBsLmZlYXR1cmVzID0gZmVhdHVyZXM7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGFMYXllck1hbmFnZXIucHJvdG90eXBlLnNldERhdGFPcHRpb25zID0gZnVuY3Rpb24gKGxheWVyLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgIGwuc2V0Q29udHJvbFBvc2l0aW9uKG9wdGlvbnMuY29udHJvbFBvc2l0aW9uKTtcbiAgICAgICAgICAgIGwuc2V0Q29udHJvbHMob3B0aW9ucy5jb250cm9scyk7XG4gICAgICAgICAgICBsLnNldERyYXdpbmdNb2RlKG9wdGlvbnMuZHJhd2luZ01vZGUpO1xuICAgICAgICAgICAgbC5zZXRTdHlsZShvcHRpb25zLnN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBEYXRhTGF5ZXIgYXMgYW4gT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIERhdGFMYXllck1hbmFnZXIucHJvdG90eXBlLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxheWVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgZC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKTsgfSk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXh0cmFjdCBmZWF0dXJlcyBmcm9tIGEgZ2VvSnNvbiB1c2luZyBnb29nbGUubWFwcyBEYXRhIENsYXNzXG4gICAgICogQHBhcmFtIGQgOiBnb29nbGUubWFwcy5EYXRhIGNsYXNzIGluc3RhbmNlXG4gICAgICogQHBhcmFtIGdlb0pzb24gOiB1cmwgb3IgZ2VvanNvbiBvYmplY3RcbiAgICAgKi9cbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5nZXREYXRhRmVhdHVyZXMgPSBmdW5jdGlvbiAoZCwgZ2VvSnNvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBnZW9Kc29uID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IGQuYWRkR2VvSnNvbihnZW9Kc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZ2VvSnNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkLmxvYWRHZW9Kc29uKGdlb0pzb24sIG51bGwsIHJlc29sdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiSW1wb3NzaWJsZSB0byBleHRyYWN0IGZlYXR1cmVzIGZyb20gZ2VvSnNvbjogd3JvbmcgYXJndW1lbnQgdHlwZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGF0YUxheWVyTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH07XG5EYXRhTGF5ZXJNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5EYXRhTGF5ZXJNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YS1sYXllci1tYW5hZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcbnZhciBpbmZvV2luZG93SWQgPSAwO1xuLyoqXG4gKiBBZ21JbmZvV2luZG93IHJlbmRlcnMgYSBpbmZvIHdpbmRvdyBpbnNpZGUgYSB7QGxpbmsgQWdtTWFya2VyfSBvciBzdGFuZGFsb25lLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tbWFwLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbbGFiZWxdPVwiJ00nXCI+XG4gKiAgICAgICAgPGFnbS1pbmZvLXdpbmRvdyBbZGlzYWJsZUF1dG9QYW5dPVwidHJ1ZVwiPlxuICogICAgICAgICAgSGksIHRoaXMgaXMgdGhlIGNvbnRlbnQgb2YgdGhlIDxzdHJvbmc+aW5mbyB3aW5kb3c8L3N0cm9uZz5cbiAqICAgICAgICA8L2FnbS1pbmZvLXdpbmRvdz5cbiAqICAgICAgPC9hZ20tbWFya2VyPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqL1xudmFyIEFnbUluZm9XaW5kb3cgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbUluZm9XaW5kb3coX2luZm9XaW5kb3dNYW5hZ2VyLCBfZWwpIHtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIgPSBfaW5mb1dpbmRvd01hbmFnZXI7XG4gICAgICAgIHRoaXMuX2VsID0gX2VsO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgb3BlbiBzdGF0ZSBmb3IgdGhlIEluZm9XaW5kb3cuIFlvdSBjYW4gYWxzbyBjYWxsIHRoZSBvcGVuKCkgYW5kIGNsb3NlKCkgbWV0aG9kcy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBpbmZvIHdpbmRvdyBpcyBjbG9zZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluZm9XaW5kb3dDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lkID0gKGluZm9XaW5kb3dJZCsrKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWdtLWluZm8td2luZG93LWNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuYWRkSW5mb1dpbmRvdyh0aGlzKTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSAmJiB0eXBlb2YgdGhpcy5sYXRpdHVkZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLmxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLnNldFBvc2l0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd6SW5kZXgnXSkge1xuICAgICAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0WkluZGV4KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydpc09wZW4nXSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlT3BlblN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0SW5mb1dpbmRvd09wdGlvbnMoY2hhbmdlcyk7XG4gICAgfTtcbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5fcmVnaXN0ZXJFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdjbG9zZWNsaWNrJywgdGhpcykuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgX3RoaXMuaW5mb1dpbmRvd0Nsb3NlLmVtaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5fdXBkYXRlT3BlblN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzT3BlbiA/IHRoaXMub3BlbigpIDogdGhpcy5jbG9zZSgpO1xuICAgIH07XG4gICAgQWdtSW5mb1dpbmRvdy5wcm90b3R5cGUuX3NldEluZm9XaW5kb3dPcHRpb25zID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbUluZm9XaW5kb3cuX2luZm9XaW5kb3dPcHRpb25zSW5wdXRzLmluZGV4T2YoaykgIT09IC0xOyB9KTtcbiAgICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgaW5mbyB3aW5kb3cuXG4gICAgICovXG4gICAgQWdtSW5mb1dpbmRvdy5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLm9wZW4odGhpcyk7IH07XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLmNsb3NlKHRoaXMpLnRoZW4oZnVuY3Rpb24gKCkgeyBfdGhpcy5pbmZvV2luZG93Q2xvc2UuZW1pdCgpOyB9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdBZ21JbmZvV2luZG93LScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHsgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuZGVsZXRlSW5mb1dpbmRvdyh0aGlzKTsgfTtcbiAgICByZXR1cm4gQWdtSW5mb1dpbmRvdztcbn0oKSk7XG5leHBvcnQgeyBBZ21JbmZvV2luZG93IH07XG5BZ21JbmZvV2luZG93Ll9pbmZvV2luZG93T3B0aW9uc0lucHV0cyA9IFsnZGlzYWJsZUF1dG9QYW4nLCAnbWF4V2lkdGgnXTtcbkFnbUluZm9XaW5kb3cuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1pbmZvLXdpbmRvdycsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwiPGRpdiBjbGFzcz0nYWdtLWluZm8td2luZG93LWNvbnRlbnQnPlxcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cXG4gICAgPC9kaXY+XFxuICBcIlxuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21JbmZvV2luZG93LmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogSW5mb1dpbmRvd01hbmFnZXIsIH0sXG4gICAgeyB0eXBlOiBFbGVtZW50UmVmLCB9LFxuXTsgfTtcbkFnbUluZm9XaW5kb3cucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2xhdGl0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsb25naXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2Rpc2FibGVBdXRvUGFuJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6SW5kZXgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ21heFdpZHRoJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdpc09wZW4nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2luZm9XaW5kb3dDbG9zZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5mby13aW5kb3cuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cuanNcbi8vIG1vZHVsZSBpZCA9IDgzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBBZ21Qb2x5bGluZVBvaW50IHJlcHJlc2VudHMgb25lIGVsZW1lbnQgb2YgYSBwb2x5bGluZSB3aXRoaW4gYSAge0BsaW5rXG4gKiBTZW1iR29vZ2xlTWFwUG9seWxpbmV9XG4gKi9cbnZhciBBZ21Qb2x5bGluZVBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21Qb2x5bGluZVBvaW50KCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9pbnQgY2hhbmdlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICBBZ21Qb2x5bGluZVBvaW50LnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgbGF0OiBjaGFuZ2VzWydsYXRpdHVkZSddLmN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBsbmc6IGNoYW5nZXNbJ2xvbmdpdHVkZSddLmN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25DaGFuZ2VkLmVtaXQocG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQWdtUG9seWxpbmVQb2ludDtcbn0oKSk7XG5leHBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH07XG5BZ21Qb2x5bGluZVBvaW50LmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7IHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lLXBvaW50JyB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbVBvbHlsaW5lUG9pbnQuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbkFnbVBvbHlsaW5lUG9pbnQucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2xhdGl0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsb25naXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Bvc2l0aW9uQ2hhbmdlZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9seWxpbmUtcG9pbnQuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQuanNcbi8vIG1vZHVsZSBpZCA9IDgzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50UmVmLCBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi91dGlscy9icm93c2VyLWdsb2JhbHMnO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyJztcbmV4cG9ydCB2YXIgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sO1xuKGZ1bmN0aW9uIChHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wpIHtcbiAgICBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2xbR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW1wiSFRUUFwiXSA9IDFdID0gXCJIVFRQXCI7XG4gICAgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW0dvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtcIkhUVFBTXCJdID0gMl0gPSBcIkhUVFBTXCI7XG4gICAgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW0dvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtcIkFVVE9cIl0gPSAzXSA9IFwiQVVUT1wiO1xufSkoR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sIHx8IChHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wgPSB7fSkpO1xuLyoqXG4gKiBUb2tlbiBmb3IgdGhlIGNvbmZpZyBvZiB0aGUgTGF6eU1hcHNBUElMb2FkZXIuIFBsZWFzZSBwcm92aWRlIGFuIG9iamVjdCBvZiB0eXBlIHtAbGlua1xuICogTGF6eU1hcHNBUElMb2FkZXJDb25maWd9LlxuICovXG5leHBvcnQgdmFyIExBWllfTUFQU19BUElfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuKCdhbmd1bGFyLWdvb2dsZS1tYXBzIExBWllfTUFQU19BUElfQ09ORklHJyk7XG52YXIgTGF6eU1hcHNBUElMb2FkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMYXp5TWFwc0FQSUxvYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMYXp5TWFwc0FQSUxvYWRlcihjb25maWcsIHcsIGQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX2NvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgX3RoaXMuX3dpbmRvd1JlZiA9IHc7XG4gICAgICAgIF90aGlzLl9kb2N1bWVudFJlZiA9IGQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTGF6eU1hcHNBUElMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY3JpcHQgPSB0aGlzLl9kb2N1bWVudFJlZi5nZXROYXRpdmVEb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgICB2YXIgY2FsbGJhY2tOYW1lID0gXCJhbmd1bGFyMkdvb2dsZU1hcHNMYXp5TWFwc0FQSUxvYWRlclwiO1xuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5fZ2V0U2NyaXB0U3JjKGNhbGxiYWNrTmFtZSk7XG4gICAgICAgIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMuX3dpbmRvd1JlZi5nZXROYXRpdmVXaW5kb3coKVtjYWxsYmFja05hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcbiAgICB9O1xuICAgIExhenlNYXBzQVBJTG9hZGVyLnByb3RvdHlwZS5fZ2V0U2NyaXB0U3JjID0gZnVuY3Rpb24gKGNhbGxiYWNrTmFtZSkge1xuICAgICAgICB2YXIgcHJvdG9jb2xUeXBlID0gKHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcucHJvdG9jb2wpIHx8IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbC5IVFRQUztcbiAgICAgICAgdmFyIHByb3RvY29sO1xuICAgICAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuQVVUTzpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUDpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbC5IVFRQUzpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwczonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBob3N0QW5kUGF0aCA9IHRoaXMuX2NvbmZpZy5ob3N0QW5kUGF0aCB8fCAnbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcyc7XG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IHtcbiAgICAgICAgICAgIHY6IHRoaXMuX2NvbmZpZy5hcGlWZXJzaW9uIHx8ICczJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja05hbWUsXG4gICAgICAgICAgICBrZXk6IHRoaXMuX2NvbmZpZy5hcGlLZXksXG4gICAgICAgICAgICBjbGllbnQ6IHRoaXMuX2NvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgICAgIGNoYW5uZWw6IHRoaXMuX2NvbmZpZy5jaGFubmVsLFxuICAgICAgICAgICAgbGlicmFyaWVzOiB0aGlzLl9jb25maWcubGlicmFyaWVzLFxuICAgICAgICAgICAgcmVnaW9uOiB0aGlzLl9jb25maWcucmVnaW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuX2NvbmZpZy5sYW5ndWFnZVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcGFyYW1zID0gT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBxdWVyeVBhcmFtc1trXSAhPSBudWxsOyB9KVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGVtcHR5IGFycmF5c1xuICAgICAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSB8fFxuICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSAmJiBxdWVyeVBhcmFtc1trXS5sZW5ndGggPiAwKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIC8vIGpvaW4gYXJyYXlzIGFzIGNvbW1hIHNlcGVyYXRlZCBzdHJpbmdzXG4gICAgICAgICAgICB2YXIgaSA9IHF1ZXJ5UGFyYW1zW2tdO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBrZXk6IGssIHZhbHVlOiBpLmpvaW4oJywnKSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrLCB2YWx1ZTogcXVlcnlQYXJhbXNba10gfTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50cnkua2V5ICsgXCI9XCIgKyBlbnRyeS52YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcmJyk7XG4gICAgICAgIHJldHVybiBwcm90b2NvbCArIFwiLy9cIiArIGhvc3RBbmRQYXRoICsgXCI/XCIgKyBwYXJhbXM7XG4gICAgfTtcbiAgICByZXR1cm4gTGF6eU1hcHNBUElMb2FkZXI7XG59KE1hcHNBUElMb2FkZXIpKTtcbmV4cG9ydCB7IExhenlNYXBzQVBJTG9hZGVyIH07XG5MYXp5TWFwc0FQSUxvYWRlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuTGF6eU1hcHNBUElMb2FkZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiB1bmRlZmluZWQsIGRlY29yYXRvcnM6IFt7IHR5cGU6IEluamVjdCwgYXJnczogW0xBWllfTUFQU19BUElfQ09ORklHLF0gfSxdIH0sXG4gICAgeyB0eXBlOiBXaW5kb3dSZWYsIH0sXG4gICAgeyB0eXBlOiBEb2N1bWVudFJlZiwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXp5LW1hcHMtYXBpLWxvYWRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4MzRcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgQ2lyY2xlTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcbmltcG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvaW5mby13aW5kb3ctbWFuYWdlcic7XG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xuaW1wb3J0IHsgUG9seWdvbk1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XG5pbXBvcnQgeyBLbWxMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyJztcbmltcG9ydCB7IERhdGFMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2RhdGEtbGF5ZXItbWFuYWdlcic7XG4vKipcbiAqIEFnbU1hcCByZW5kZXJzIGEgR29vZ2xlIE1hcC5cbiAqICoqSW1wb3J0YW50IG5vdGUqKjogVG8gYmUgYWJsZSBzZWUgYSBtYXAgaW4gdGhlIGJyb3dzZXIsIHlvdSBoYXZlIHRvIGRlZmluZSBhIGhlaWdodCBmb3IgdGhlXG4gKiBlbGVtZW50IGBhZ20tbWFwYC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICBhZ20tbWFwIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG52YXIgQWdtTWFwID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21NYXAoX2VsZW0sIF9tYXBzV3JhcHBlcikge1xuICAgICAgICB0aGlzLl9lbGVtID0gX2VsZW07XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyID0gX21hcHNXcmFwcGVyO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxvbmdpdHVkZSB0aGF0IGRlZmluZXMgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxhdGl0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxhdGl0dWRlID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuIFRoZSBkZWZhdWx0IHpvb20gbGV2ZWwgaXMgOC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuem9vbSA9IDg7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGVzL2Rpc2FibGVzIGlmIG1hcCBpcyBkcmFnZ2FibGUuXG4gICAgICAgICAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgem9vbSBhbmQgY2VudGVyIG9uIGRvdWJsZSBjbGljay4gRW5hYmxlZCBieSBkZWZhdWx0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlRG91YmxlQ2xpY2tab29tID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbmFibGVzL2Rpc2FibGVzIGFsbCBkZWZhdWx0IFVJIG9mIHRoZSBHb29nbGUgbWFwLiBQbGVhc2Ugbm90ZTogV2hlbiB0aGUgbWFwIGlzIGNyZWF0ZWQsIHRoaXNcbiAgICAgICAgICogdmFsdWUgY2Fubm90IGdldCB1cGRhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlRGVmYXVsdFVJID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBmYWxzZSwgZGlzYWJsZXMgc2Nyb2xsd2hlZWwgem9vbWluZyBvbiB0aGUgbWFwLiBUaGUgc2Nyb2xsd2hlZWwgaXMgZW5hYmxlZCBieSBkZWZhdWx0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY3JvbGx3aGVlbCA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBmYWxzZSwgcHJldmVudHMgdGhlIG1hcCBmcm9tIGJlaW5nIGNvbnRyb2xsZWQgYnkgdGhlIGtleWJvYXJkLiBLZXlib2FyZCBzaG9ydGN1dHMgYXJlXG4gICAgICAgICAqIGVuYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMua2V5Ym9hcmRTaG9ydGN1dHMgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFpvb20gY29udHJvbC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3R5bGVzIHRvIGFwcGx5IHRvIGVhY2ggb2YgdGhlIGRlZmF1bHQgbWFwIHR5cGVzLiBOb3RlIHRoYXQgZm9yIFNhdGVsbGl0ZS9IeWJyaWQgYW5kIFRlcnJhaW5cbiAgICAgICAgICogbW9kZXMsIHRoZXNlIHN0eWxlcyB3aWxsIG9ubHkgYXBwbHkgdG8gbGFiZWxzIGFuZCBnZW9tZXRyeS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3R5bGVzID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGVuIHRydWUgYW5kIHRoZSBsYXRpdHVkZSBhbmQvb3IgbG9uZ2l0dWRlIHZhbHVlcyBjaGFuZ2VzLCB0aGUgR29vZ2xlIE1hcHMgcGFuVG8gbWV0aG9kIGlzXG4gICAgICAgICAqIHVzZWQgdG9cbiAgICAgICAgICogY2VudGVyIHRoZSBtYXAuIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvcmVmZXJlbmNlI01hcFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy51c2VQYW5uaW5nID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBTdHJlZXQgVmlldyBQZWdtYW4gY29udHJvbC5cbiAgICAgICAgICogVGhpcyBjb250cm9sIGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgVUksIGFuZCBzaG91bGQgYmUgc2V0IHRvIGZhbHNlIHdoZW4gZGlzcGxheWluZyBhIG1hcCB0eXBlXG4gICAgICAgICAqIG9uIHdoaWNoIHRoZSBTdHJlZXQgVmlldyByb2FkIG92ZXJsYXkgc2hvdWxkIG5vdCBhcHBlYXIgKGUuZy4gYSBub24tRWFydGggbWFwIHR5cGUpLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdHJlZXRWaWV3Q29udHJvbCA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSB2aWV3cG9ydCB0byBjb250YWluIHRoZSBnaXZlbiBib3VuZHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpdEJvdW5kcyA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBTY2FsZSBjb250cm9sLiBUaGlzIGlzIGRpc2FibGVkIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNjYWxlQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgTWFwIHR5cGUgY29udHJvbC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwVHlwZUNvbnRyb2wgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFBhbiBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYW5Db250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBSb3RhdGUgY29udHJvbC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucm90YXRlQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgRnVsbHNjcmVlbiBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1hcCBtYXBUeXBlSWQuIERlZmF1bHRzIHRvICdyb2FkbWFwJy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwVHlwZUlkID0gJ3JvYWRtYXAnO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hlbiBmYWxzZSwgbWFwIGljb25zIGFyZSBub3QgY2xpY2thYmxlLiBBIG1hcCBpY29uIHJlcHJlc2VudHMgYSBwb2ludCBvZiBpbnRlcmVzdCxcbiAgICAgICAgICogYWxzbyBrbm93biBhcyBhIFBPSS4gQnkgZGVmYXVsdCBtYXAgaWNvbnMgYXJlIGNsaWNrYWJsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xpY2thYmxlSWNvbnMgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBzZXR0aW5nIGNvbnRyb2xzIGhvdyBnZXN0dXJlcyBvbiB0aGUgbWFwIGFyZSBoYW5kbGVkLlxuICAgICAgICAgKiBBbGxvd2VkIHZhbHVlczpcbiAgICAgICAgICogLSAnY29vcGVyYXRpdmUnIChUd28tZmluZ2VyIHRvdWNoIGdlc3R1cmVzIHBhbiBhbmQgem9vbSB0aGUgbWFwLiBPbmUtZmluZ2VyIHRvdWNoIGdlc3R1cmVzIGFyZSBub3QgaGFuZGxlZCBieSB0aGUgbWFwLilcbiAgICAgICAgICogLSAnZ3JlZWR5JyAgICAgIChBbGwgdG91Y2ggZ2VzdHVyZXMgcGFuIG9yIHpvb20gdGhlIG1hcC4pXG4gICAgICAgICAqIC0gJ25vbmUnICAgICAgICAoVGhlIG1hcCBjYW5ub3QgYmUgcGFubmVkIG9yIHpvb21lZCBieSB1c2VyIGdlc3R1cmVzLilcbiAgICAgICAgICogLSAnYXV0bycgICAgICAgIFtkZWZhdWx0XSAoR2VzdHVyZSBoYW5kbGluZyBpcyBlaXRoZXIgY29vcGVyYXRpdmUgb3IgZ3JlZWR5LCBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgcGFnZSBpcyBzY3JvbGxhYmxlIG9yIG5vdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2VzdHVyZUhhbmRsaW5nID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGljayBvbiBhXG4gICAgICAgICAqIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgcmlnaHQtY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrXG4gICAgICAgICAqIG9uIGEgbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBSaWdodENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGRvdWJsZS1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICAgICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcERibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBjZW50ZXIgY2hhbmdlcy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2VudGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB2aWV3cG9ydCBib3VuZHMgaGF2ZSBjaGFuZ2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ib3VuZHNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1hcCBiZWNvbWVzIGlkbGUgYWZ0ZXIgcGFubmluZyBvciB6b29taW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pZGxlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB6b29tIGxldmVsIGhhcyBjaGFuZ2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56b29tQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBnb29nbGUgbWFwIGlzIGZ1bGx5IGluaXRpYWxpemVkLlxuICAgICAgICAgKiBZb3UgZ2V0IHRoZSBnb29nbGUubWFwcy5NYXAgaW5zdGFuY2UgYXMgYSByZXN1bHQgb2YgdGhpcyBFdmVudEVtaXR0ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcFJlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtTWFwLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gdG9kbzogdGhpcyBzaG91bGQgYmUgc29sdmVkIHdpdGggYSBuZXcgY29tcG9uZW50IGFuZCBhIHZpZXdDaGlsZCBkZWNvcmF0b3JcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuX2VsZW0ubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWdtLW1hcC1jb250YWluZXItaW5uZXInKTtcbiAgICAgICAgdGhpcy5faW5pdE1hcEluc3RhbmNlKGNvbnRhaW5lcik7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9pbml0TWFwSW5zdGFuY2UgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlTWFwKGVsLCB7XG4gICAgICAgICAgICBjZW50ZXI6IHsgbGF0OiB0aGlzLmxhdGl0dWRlIHx8IDAsIGxuZzogdGhpcy5sb25naXR1ZGUgfHwgMCB9LFxuICAgICAgICAgICAgem9vbTogdGhpcy56b29tLFxuICAgICAgICAgICAgbWluWm9vbTogdGhpcy5taW5ab29tLFxuICAgICAgICAgICAgbWF4Wm9vbTogdGhpcy5tYXhab29tLFxuICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdGhpcy5kaXNhYmxlRGVmYXVsdFVJLFxuICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdGhpcy5kaXNhYmxlRG91YmxlQ2xpY2tab29tLFxuICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IHRoaXMuc2Nyb2xsd2hlZWwsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiB0aGlzLmRyYWdnYWJsZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUN1cnNvcjogdGhpcy5kcmFnZ2FibGVDdXJzb3IsXG4gICAgICAgICAgICBkcmFnZ2luZ0N1cnNvcjogdGhpcy5kcmFnZ2luZ0N1cnNvcixcbiAgICAgICAgICAgIGtleWJvYXJkU2hvcnRjdXRzOiB0aGlzLmtleWJvYXJkU2hvcnRjdXRzLFxuICAgICAgICAgICAgc3R5bGVzOiB0aGlzLnN0eWxlcyxcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0aGlzLnpvb21Db250cm9sLFxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB0aGlzLnpvb21Db250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiB0aGlzLnN0cmVldFZpZXdDb250cm9sLFxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zOiB0aGlzLnN0cmVldFZpZXdDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbDogdGhpcy5zY2FsZUNvbnRyb2wsXG4gICAgICAgICAgICBzY2FsZUNvbnRyb2xPcHRpb25zOiB0aGlzLnNjYWxlQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogdGhpcy5tYXBUeXBlQ29udHJvbCxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczogdGhpcy5tYXBUeXBlQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgICBwYW5Db250cm9sOiB0aGlzLnBhbkNvbnRyb2wsXG4gICAgICAgICAgICBwYW5Db250cm9sT3B0aW9uczogdGhpcy5wYW5Db250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIHJvdGF0ZUNvbnRyb2w6IHRoaXMucm90YXRlQ29udHJvbCxcbiAgICAgICAgICAgIHJvdGF0ZUNvbnRyb2xPcHRpb25zOiB0aGlzLnJvdGF0ZUNvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IHRoaXMuZnVsbHNjcmVlbkNvbnRyb2wsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnM6IHRoaXMuZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgbWFwVHlwZUlkOiB0aGlzLm1hcFR5cGVJZCxcbiAgICAgICAgICAgIGNsaWNrYWJsZUljb25zOiB0aGlzLmNsaWNrYWJsZUljb25zLFxuICAgICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiB0aGlzLmdlc3R1cmVIYW5kbGluZ1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gX3RoaXMubWFwUmVhZHkuZW1pdChtYXApOyB9KTtcbiAgICAgICAgLy8gcmVnaXN0ZXIgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX2hhbmRsZU1hcENlbnRlckNoYW5nZSgpO1xuICAgICAgICB0aGlzLl9oYW5kbGVNYXBab29tQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU1hcE1vdXNlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUJvdW5kc0NoYW5nZSgpO1xuICAgICAgICB0aGlzLl9oYW5kbGVJZGxlRXZlbnQoKTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21NYXAucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIC8qIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcC5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLl91cGRhdGVNYXBPcHRpb25zQ2hhbmdlcyhjaGFuZ2VzKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24oY2hhbmdlcyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl91cGRhdGVNYXBPcHRpb25zQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvcHRpb25LZXlzID0gT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBBZ21NYXAuX21hcE9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xOyB9KTtcbiAgICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnNldE1hcE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyBhIHJlc2l6ZSBldmVudCBvbiB0aGUgZ29vZ2xlIG1hcCBpbnN0YW5jZS5cbiAgICAgKiBXaGVuIHJlY2VudGVyIGlzIHRydWUsIHRoZSBvZiB0aGUgZ29vZ2xlIG1hcCBnZXRzIGNhbGxlZCB3aXRoIHRoZSBjdXJyZW50IGxhdC9sbmcgdmFsdWVzIG9yIGZpdEJvdW5kcyB2YWx1ZSB0byByZWNlbnRlciB0aGUgbWFwLlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgZ2V0cyByZXNvbHZlZCBhZnRlciB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZC5cbiAgICAgKi9cbiAgICBBZ21NYXAucHJvdG90eXBlLnRyaWdnZXJSZXNpemUgPSBmdW5jdGlvbiAocmVjZW50ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHJlY2VudGVyID09PSB2b2lkIDApIHsgcmVjZW50ZXIgPSB0cnVlOyB9XG4gICAgICAgIC8vIE5vdGU6IFdoZW4gd2Ugd291bGQgdHJpZ2dlciB0aGUgcmVzaXplIGV2ZW50IGFuZCBzaG93IHRoZSBtYXAgaW4gdGhlIHNhbWUgdHVybiAod2hpY2ggaXMgYVxuICAgICAgICAvLyBjb21tb24gY2FzZSBmb3IgdHJpZ2dlcmluZyBhIHJlc2l6ZSBldmVudCksIHRoZW4gdGhlIHJlc2l6ZSBldmVudCB3b3VsZCBub3RcbiAgICAgICAgLy8gd29yayAodG8gc2hvdyB0aGUgbWFwKSwgc28gd2UgdHJpZ2dlciB0aGUgZXZlbnQgaW4gYSB0aW1lb3V0LlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fbWFwc1dyYXBwZXIudHJpZ2dlck1hcEV2ZW50KCdyZXNpemUnKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maXRCb3VuZHMgIT0gbnVsbCA/IF90aGlzLl9maXRCb3VuZHMoKSA6IF90aGlzLl9zZXRDZW50ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl91cGRhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddID09IG51bGwgJiYgY2hhbmdlc1snbG9uZ2l0dWRlJ10gPT0gbnVsbCAmJlxuICAgICAgICAgICAgY2hhbmdlc1snZml0Qm91bmRzJ10gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm8gcG9zaXRpb24gdXBkYXRlIG5lZWRlZFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHdlIHByZWZlciBmaXRCb3VuZHMgaW4gY2hhbmdlc1xuICAgICAgICBpZiAoY2hhbmdlc1snZml0Qm91bmRzJ10gJiYgdGhpcy5maXRCb3VuZHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZml0Qm91bmRzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmxhdGl0dWRlICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgdGhpcy5sb25naXR1ZGUgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0Q2VudGVyKCk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9zZXRDZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdDZW50ZXIgPSB7XG4gICAgICAgICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICAgICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5UbyhuZXdDZW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0Q2VudGVyKG5ld0NlbnRlcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2ZpdEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlUGFubmluZykge1xuICAgICAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIucGFuVG9Cb3VuZHModGhpcy5maXRCb3VuZHMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmZpdEJvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVNYXBDZW50ZXJDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudCgnY2VudGVyX2NoYW5nZWQnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX21hcHNXcmFwcGVyLmdldENlbnRlcigpLnRoZW4oZnVuY3Rpb24gKGNlbnRlcikge1xuICAgICAgICAgICAgICAgIF90aGlzLmxhdGl0dWRlID0gY2VudGVyLmxhdCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLmxvbmdpdHVkZSA9IGNlbnRlci5sbmcoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jZW50ZXJDaGFuZ2UuZW1pdCh7IGxhdDogX3RoaXMubGF0aXR1ZGUsIGxuZzogX3RoaXMubG9uZ2l0dWRlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgIH07XG4gICAgQWdtTWFwLnByb3RvdHlwZS5faGFuZGxlQm91bmRzQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ2JvdW5kc19jaGFuZ2VkJykuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9tYXBzV3JhcHBlci5nZXRCb3VuZHMoKS50aGVuKGZ1bmN0aW9uIChib3VuZHMpIHsgX3RoaXMuYm91bmRzQ2hhbmdlLmVtaXQoYm91bmRzKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgIH07XG4gICAgQWdtTWFwLnByb3RvdHlwZS5faGFuZGxlTWFwWm9vbUNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KCd6b29tX2NoYW5nZWQnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX21hcHNXcmFwcGVyLmdldFpvb20oKS50aGVuKGZ1bmN0aW9uICh6KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuem9vbSA9IHo7XG4gICAgICAgICAgICAgICAgX3RoaXMuem9vbUNoYW5nZS5lbWl0KHopO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgIH07XG4gICAgQWdtTWFwLnByb3RvdHlwZS5faGFuZGxlSWRsZUV2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ2lkbGUnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkgeyBfdGhpcy5pZGxlLmVtaXQodm9pZCAwKTsgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVNYXBNb3VzZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGV2ZW50cyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBDbGljayB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwUmlnaHRDbGljayB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZGJsY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcERibENsaWNrIH0sXG4gICAgICAgIF07XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgcyA9IF90aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KGUubmFtZSkuc3Vic2NyaWJlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHsgY29vcmRzOiB7IGxhdDogZXZlbnQubGF0TG5nLmxhdCgpLCBsbmc6IGV2ZW50LmxhdExuZy5sbmcoKSB9IH07XG4gICAgICAgICAgICAgICAgZS5lbWl0dGVyLmVtaXQodmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtTWFwO1xufSgpKTtcbmV4cG9ydCB7IEFnbU1hcCB9O1xuLyoqXG4gKiBNYXAgb3B0aW9uIGF0dHJpYnV0ZXMgdGhhdCBjYW4gY2hhbmdlIG92ZXIgdGltZVxuICovXG5BZ21NYXAuX21hcE9wdGlvbnNBdHRyaWJ1dGVzID0gW1xuICAgICdkaXNhYmxlRG91YmxlQ2xpY2tab29tJywgJ3Njcm9sbHdoZWVsJywgJ2RyYWdnYWJsZScsICdkcmFnZ2FibGVDdXJzb3InLCAnZHJhZ2dpbmdDdXJzb3InLFxuICAgICdrZXlib2FyZFNob3J0Y3V0cycsICd6b29tQ29udHJvbCcsICd6b29tQ29udHJvbE9wdGlvbnMnLCAnc3R5bGVzJywgJ3N0cmVldFZpZXdDb250cm9sJyxcbiAgICAnc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zJywgJ3pvb20nLCAnbWFwVHlwZUNvbnRyb2wnLCAnbWFwVHlwZUNvbnRyb2xPcHRpb25zJywgJ21pblpvb20nLFxuICAgICdtYXhab29tJywgJ3BhbkNvbnRyb2wnLCAncGFuQ29udHJvbE9wdGlvbnMnLCAncm90YXRlQ29udHJvbCcsICdyb3RhdGVDb250cm9sT3B0aW9ucycsXG4gICAgJ2Z1bGxzY3JlZW5Db250cm9sJywgJ2Z1bGxzY3JlZW5Db250cm9sT3B0aW9ucycsICdzY2FsZUNvbnRyb2wnLCAnc2NhbGVDb250cm9sT3B0aW9ucycsXG4gICAgJ21hcFR5cGVJZCcsICdjbGlja2FibGVJY29ucycsICdnZXN0dXJlSGFuZGxpbmcnXG5dO1xuQWdtTWFwLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20tbWFwJyxcbiAgICAgICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIsIE1hcmtlck1hbmFnZXIsIEluZm9XaW5kb3dNYW5hZ2VyLCBDaXJjbGVNYW5hZ2VyLCBQb2x5bGluZU1hbmFnZXIsXG4gICAgICAgICAgICAgICAgICAgIFBvbHlnb25NYW5hZ2VyLCBLbWxMYXllck1hbmFnZXIsIERhdGFMYXllck1hbmFnZXJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGhvc3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9kbzogZGVwcmVjYXRlZCAtIHdlIHdpbGwgcmVtb3ZlIGl0IHdpdGggdGhlIG5leHQgdmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAnW2NsYXNzLnNlYm0tZ29vZ2xlLW1hcC1jb250YWluZXJdJzogJ3RydWUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IFtcIlxcbiAgICAuYWdtLW1hcC1jb250YWluZXItaW5uZXIge1xcbiAgICAgIHdpZHRoOiBpbmhlcml0O1xcbiAgICAgIGhlaWdodDogaW5oZXJpdDtcXG4gICAgfVxcbiAgICAuYWdtLW1hcC1jb250ZW50IHtcXG4gICAgICBkaXNwbGF5Om5vbmU7XFxuICAgIH1cXG4gIFwiXSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJcXG4gICAgPGRpdiBjbGFzcz0nYWdtLW1hcC1jb250YWluZXItaW5uZXIgc2VibS1nb29nbGUtbWFwLWNvbnRhaW5lci1pbm5lcic+PC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9J2FnbS1tYXAtY29udGVudCc+XFxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxcbiAgICA8L2Rpdj5cXG4gIFwiXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbU1hcC5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEVsZW1lbnRSZWYsIH0sXG4gICAgeyB0eXBlOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgfSxcbl07IH07XG5BZ21NYXAucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2xvbmdpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbGF0aXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pvb20nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ21pblpvb20nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ21heFpvb20nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2RyYWdnYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ21hcERyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2Rpc2FibGVEZWZhdWx0VUknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Njcm9sbHdoZWVsJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdiYWNrZ3JvdW5kQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2RyYWdnYWJsZUN1cnNvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dpbmdDdXJzb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2tleWJvYXJkU2hvcnRjdXRzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6b29tQ29udHJvbCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnem9vbUNvbnRyb2xPcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHlsZXMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3VzZVBhbm5pbmcnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cmVldFZpZXdDb250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2ZpdEJvdW5kcyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc2NhbGVDb250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzY2FsZUNvbnRyb2xPcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdtYXBUeXBlQ29udHJvbCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWFwVHlwZUNvbnRyb2xPcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwYW5Db250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwYW5Db250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAncm90YXRlQ29udHJvbCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAncm90YXRlQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2Z1bGxzY3JlZW5Db250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdmdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ21hcFR5cGVJZCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnY2xpY2thYmxlSWNvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2dlc3R1cmVIYW5kbGluZyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWFwQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtYXBSaWdodENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbWFwRGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdjZW50ZXJDaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdib3VuZHNDaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdpZGxlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnem9vbUNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21hcFJlYWR5JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSA4MzVcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlcic7XG52YXIgQWdtQ2lyY2xlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21DaXJjbGUoX21hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IF9tYW5hZ2VyO1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBDaXJjbGUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBjaXJjbGUgb3ZlciB0aGUgbWFwLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIGNpcmNsZSBieSBkcmFnZ2luZyB0aGUgY29udHJvbCBwb2ludHMgc2hvd24gYXRcbiAgICAgICAgICogdGhlIGNlbnRlciBhbmQgYXJvdW5kIHRoZSBjaXJjdW1mZXJlbmNlIG9mIHRoZSBjaXJjbGUuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHJhZGl1cyBpbiBtZXRlcnMgb24gdGhlIEVhcnRoJ3Mgc3VyZmFjZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmFkaXVzID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzdHJva2UgcG9zaXRpb24uIERlZmF1bHRzIHRvIENFTlRFUi5cbiAgICAgICAgICogVGhpcyBwcm9wZXJ0eSBpcyBub3Qgc3VwcG9ydGVkIG9uIEludGVybmV0IEV4cGxvcmVyIDggYW5kIGVhcmxpZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0cm9rZVBvc2l0aW9uID0gJ0NFTlRFUic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc3Ryb2tlIHdpZHRoIGluIHBpeGVscy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3Ryb2tlV2VpZ2h0ID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhpcyBjaXJjbGUgaXMgdmlzaWJsZSBvbiB0aGUgbWFwLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgY2VudGVyIGlzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNlbnRlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2lyY2xlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNpcmNsZURibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgY2lyY2xlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW91dC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIGNpcmNsZSBtb3VzZW92ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlJ3MgcmFkaXVzIGlzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhZGl1c0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgY2lyY2xlIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRDaXJjbGUodGhpcyk7XG4gICAgICAgIHRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUNpcmNsZS5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuX2NpcmNsZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0Q2VudGVyKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydlZGl0YWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLnNldEVkaXRhYmxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXREcmFnZ2FibGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRWaXNpYmxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydyYWRpdXMnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRSYWRpdXModGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2lyY2xlT3B0aW9uc0NoYW5nZXMoY2hhbmdlcyk7XG4gICAgfTtcbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLl91cGRhdGVDaXJjbGVPcHRpb25zQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvcHRpb25LZXlzID0gT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBBZ21DaXJjbGUuX21hcE9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTE7IH0pO1xuICAgICAgICBvcHRpb25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgaWYgKG9wdGlvbktleXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgICAgICBldmVudHMuc2V0KCdjZW50ZXJfY2hhbmdlZCcsIHRoaXMuY2VudGVyQ2hhbmdlKTtcbiAgICAgICAgZXZlbnRzLnNldCgnY2xpY2snLCB0aGlzLmNpcmNsZUNsaWNrKTtcbiAgICAgICAgZXZlbnRzLnNldCgnZGJsY2xpY2snLCB0aGlzLmNpcmNsZURibENsaWNrKTtcbiAgICAgICAgZXZlbnRzLnNldCgnZHJhZycsIHRoaXMuZHJhZyk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmQpO1xuICAgICAgICBldmVudHMuc2V0KCdkcmFnU3RhcnQnLCB0aGlzLmRyYWdTdGFydCk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICAgICAgZXZlbnRzLnNldCgnbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgICAgICBldmVudHMuc2V0KCdtb3VzZW91dCcsIHRoaXMubW91c2VPdXQpO1xuICAgICAgICBldmVudHMuc2V0KCdtb3VzZW92ZXInLCB0aGlzLm1vdXNlT3Zlcik7XG4gICAgICAgIGV2ZW50cy5zZXQoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgICAgICBldmVudHMuc2V0KCdyYWRpdXNfY2hhbmdlZCcsIHRoaXMucmFkaXVzQ2hhbmdlKTtcbiAgICAgICAgZXZlbnRzLnNldCgncmlnaHRjbGljaycsIHRoaXMucmlnaHRDbGljayk7XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEVtaXR0ZXIsIGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgX3RoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5wdXNoKF90aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShldmVudE5hbWUsIF90aGlzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFkaXVzX2NoYW5nZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX21hbmFnZXIuZ2V0UmFkaXVzKF90aGlzKS50aGVuKGZ1bmN0aW9uIChyYWRpdXMpIHsgcmV0dXJuIGV2ZW50RW1pdHRlci5lbWl0KHJhZGl1cyk7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NlbnRlcl9jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9tYW5hZ2VyLmdldENlbnRlcihfdGhpcykudGhlbihmdW5jdGlvbiAoY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50RW1pdHRlci5lbWl0KHsgbGF0OiBjZW50ZXIubGF0KCksIGxuZzogY2VudGVyLmxuZygpIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50RW1pdHRlci5lbWl0KHsgY29vcmRzOiB7IGxhdDogdmFsdWUubGF0TG5nLmxhdCgpLCBsbmc6IHZhbHVlLmxhdExuZy5sbmcoKSB9IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICAgICAgdGhpcy5fZXZlbnRTdWJzY3JpcHRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbWFuYWdlci5yZW1vdmVDaXJjbGUodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBMYXRMbmdCb3VuZHMgb2YgdGhpcyBDaXJjbGUuXG4gICAgICovXG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYW5hZ2VyLmdldEJvdW5kcyh0aGlzKTsgfTtcbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hbmFnZXIuZ2V0Q2VudGVyKHRoaXMpOyB9O1xuICAgIHJldHVybiBBZ21DaXJjbGU7XG59KCkpO1xuZXhwb3J0IHsgQWdtQ2lyY2xlIH07XG5BZ21DaXJjbGUuX21hcE9wdGlvbnMgPSBbXG4gICAgJ2ZpbGxDb2xvcicsICdmaWxsT3BhY2l0eScsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVBvc2l0aW9uJywgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3Zpc2libGUnLCAnekluZGV4JywgJ2NsaWNrYWJsZSdcbl07XG5BZ21DaXJjbGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1jaXJjbGUnXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbUNpcmNsZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IENpcmNsZU1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtQ2lyY2xlLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdjbGlja2FibGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2RyYWdnYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ2NpcmNsZURyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2VkaXRhYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdmaWxsQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2ZpbGxPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdyYWRpdXMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZUNvbG9yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VQb3NpdGlvbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlV2VpZ2h0JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd2aXNpYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6SW5kZXgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2NlbnRlckNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2NpcmNsZUNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnY2lyY2xlRGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdkcmFnJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnZHJhZ0VuZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2RyYWdTdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlRG93bic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlTW92ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbW91c2VPdmVyJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbW91c2VVcCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3JhZGl1c0NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3JpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNpcmNsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9jaXJjbGUuanNcbi8vIG1vZHVsZSBpZCA9IDgzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlcic7XG52YXIgbGF5ZXJJZCA9IDA7XG52YXIgQWdtS21sTGF5ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbUttbExheWVyKF9tYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSBfbWFuYWdlcjtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0cnVlLCB0aGUgbGF5ZXIgcmVjZWl2ZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCeSBkZWZhdWx0LCB0aGUgaW5wdXQgbWFwIGlzIGNlbnRlcmVkIGFuZCB6b29tZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY29udGVudHMgb2YgdGhlXG4gICAgICAgICAqIGxheWVyLlxuICAgICAgICAgKiBJZiB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZSwgdGhlIHZpZXdwb3J0IGlzIGxlZnQgdW5jaGFuZ2VkLCB1bmxlc3MgdGhlIG1hcCdzIGNlbnRlciBhbmQgem9vbVxuICAgICAgICAgKiB3ZXJlIG5ldmVyIHNldC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucHJlc2VydmVWaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byByZW5kZXIgdGhlIHNjcmVlbiBvdmVybGF5cy4gRGVmYXVsdCB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY3JlZW5PdmVybGF5cyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdXBwcmVzcyB0aGUgcmVuZGVyaW5nIG9mIGluZm8gd2luZG93cyB3aGVuIGxheWVyIGZlYXR1cmVzIGFyZSBjbGlja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdXBwcmVzc0luZm9XaW5kb3dzID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgVVJMIG9mIHRoZSBLTUwgZG9jdW1lbnQgdG8gZGlzcGxheS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudXJsID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB6LWluZGV4IG9mIHRoZSBsYXllci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuekluZGV4ID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGZlYXR1cmUgaW4gdGhlIGxheWVyIGlzIGNsaWNrZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIEtNTCBsYXllcnMgZGVmYXVsdCB2aWV3cG9ydCBoYXMgY2hhbmdlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVmYXVsdFZpZXdwb3J0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBLTUwgbGF5ZXIgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAqIEF0IHRoaXMgcG9pbnQgaXQgaXMgc2FmZSB0byByZWFkIHRoZSBzdGF0dXMgcHJvcGVydHkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBsYXllciBsb2FkZWRcbiAgICAgICAgICogc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGF0dXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRLbWxMYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpO1xuICAgIH07XG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLl91cGRhdGVQb2x5Z29uT3B0aW9ucyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmtleXMoY2hhbmdlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbUttbExheWVyLl9rbWxMYXllck9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTE7IH0pXG4gICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChvYmosIGspIHtcbiAgICAgICAgICAgIG9ialtrXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBZ21LbWxMYXllci5wcm90b3R5cGUuX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxheWVyQ2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RlZmF1bHR2aWV3cG9ydF9jaGFuZ2VkJywgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuZGVmYXVsdFZpZXdwb3J0Q2hhbmdlLmVtaXQoKTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc3RhdHVzX2NoYW5nZWQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zdGF0dXNDaGFuZ2UuZW1pdCgpOyB9IH0sXG4gICAgICAgIF07XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBvcyA9IF90aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgX3RoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faWQ7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiQWdtS21sTGF5ZXItXCIgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21LbWxMYXllci5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlS21sTGF5ZXIodGhpcyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtS21sTGF5ZXI7XG59KCkpO1xuZXhwb3J0IHsgQWdtS21sTGF5ZXIgfTtcbkFnbUttbExheWVyLl9rbWxMYXllck9wdGlvbnMgPSBbJ2NsaWNrYWJsZScsICdwcmVzZXJ2ZVZpZXdwb3J0JywgJ3NjcmVlbk92ZXJsYXlzJywgJ3N1cHByZXNzSW5mb1dpbmRvd3MnLCAndXJsJywgJ3pJbmRleCddO1xuQWdtS21sTGF5ZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1rbWwtbGF5ZXInXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbUttbExheWVyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogS21sTGF5ZXJNYW5hZ2VyLCB9LFxuXTsgfTtcbkFnbUttbExheWVyLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdjbGlja2FibGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3ByZXNlcnZlVmlld3BvcnQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3NjcmVlbk92ZXJsYXlzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdXBwcmVzc0luZm9XaW5kb3dzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd1cmwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbGF5ZXJDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2RlZmF1bHRWaWV3cG9ydENoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3N0YXR1c0NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a21sLWxheWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2ttbC1sYXllci5qc1xuLy8gbW9kdWxlIGlkID0gODM3XG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXInO1xudmFyIGxheWVySWQgPSAwO1xuLyoqXG4gKiBBZ21EYXRhTGF5ZXIgZW5hYmxlcyB0aGUgdXNlciB0byBhZGQgZGF0YSBsYXllcnMgdG8gdGhlIG1hcC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQgeyBBZ21NYXAsIEFnbURhdGFMYXllciB9IGZyb21cbiAqICdhbmd1bGFyLWdvb2dsZS1tYXBzL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgZGlyZWN0aXZlczogW0FnbU1hcCwgQWdtRGF0YUxheWVyXSxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICAuYWdtLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogXHQgIDxhZ20tZGF0YS1sYXllciBbZ2VvSnNvbl09XCJnZW9Kc29uT2JqZWN0XCIgKGxheWVyQ2xpY2spPVwiY2xpY2tlZCgkZXZlbnQpXCIgW3N0eWxlXT1cInN0eWxlRnVuY1wiPlxuICogXHQgIDwvYWdtLWRhdGEtbGF5ZXI+XG4gKiA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBNeU1hcENtcCB7XG4gKiAgIGxhdDogbnVtYmVyID0gLTI1LjI3NDQ0OTtcbiAqICAgbG5nOiBudW1iZXIgPSAxMzMuNzc1MDYwO1xuICogICB6b29tOiBudW1iZXIgPSA1O1xuICpcbiAqIGNsaWNrZWQoY2xpY2tFdmVudCkge1xuICogICAgY29uc29sZS5sb2coY2xpY2tFdmVudCk7XG4gKiAgfVxuICpcbiAqICBzdHlsZUZ1bmMoZmVhdHVyZSkge1xuICogICAgcmV0dXJuICh7XG4gKiAgICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gKiAgICAgIGZpbGxDb2xvcjogZmVhdHVyZS5nZXRQcm9wZXJ0eSgnY29sb3InKSxcbiAqICAgICAgc3Ryb2tlV2VpZ2h0OiAxXG4gKiAgICB9KTtcbiAqICB9XG4gKlxuICogIGdlb0pzb25PYmplY3Q6IE9iamVjdCA9IHtcbiAqICAgIFwidHlwZVwiOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gKiAgICBcImZlYXR1cmVzXCI6IFtcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJHXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwiYmx1ZVwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiN1wiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjcxXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTIzLjYxLCAtMjIuMTRdLCBbMTIyLjM4LCAtMjEuNzNdLCBbMTIxLjA2LCAtMjEuNjldLCBbMTE5LjY2LCAtMjIuMjJdLCBbMTE5LjAwLCAtMjMuNDBdLFxuICogICAgICAgICAgICAgIFsxMTguNjUsIC0yNC43Nl0sIFsxMTguNDMsIC0yNi4wN10sIFsxMTguNzgsIC0yNy41Nl0sIFsxMTkuMjIsIC0yOC41N10sIFsxMjAuMjMsIC0yOS40OV0sXG4gKiAgICAgICAgICAgICAgWzEyMS43NywgLTI5Ljg3XSwgWzEyMy41NywgLTI5LjY0XSwgWzEyNC40NSwgLTI5LjAzXSwgWzEyNC43MSwgLTI3Ljk1XSwgWzEyNC44MCwgLTI2LjcwXSxcbiAqICAgICAgICAgICAgICBbMTI0LjgwLCAtMjUuNjBdLCBbMTIzLjYxLCAtMjUuNjRdLCBbMTIyLjU2LCAtMjUuNjRdLCBbMTIxLjcyLCAtMjUuNzJdLCBbMTIxLjgxLCAtMjYuNjJdLFxuICogICAgICAgICAgICAgIFsxMjEuODYsIC0yNi45OF0sIFsxMjIuNjAsIC0yNi45MF0sIFsxMjMuNTcsIC0yNy4wNV0sIFsxMjMuNTcsIC0yNy42OF0sIFsxMjMuMzUsIC0yOC4xOF0sXG4gKiAgICAgICAgICAgICAgWzEyMi41MSwgLTI4LjM4XSwgWzEyMS43NywgLTI4LjI2XSwgWzEyMS4wMiwgLTI3LjkxXSwgWzEyMC40OSwgLTI3LjIxXSwgWzEyMC4xNCwgLTI2LjUwXSxcbiAqICAgICAgICAgICAgICBbMTIwLjEwLCAtMjUuNjRdLCBbMTIwLjI3LCAtMjQuNTJdLCBbMTIwLjY3LCAtMjMuNjhdLCBbMTIxLjcyLCAtMjMuMzJdLCBbMTIyLjQzLCAtMjMuNDhdLFxuICogICAgICAgICAgICAgIFsxMjMuMDQsIC0yNC4wNF0sIFsxMjQuNTQsIC0yNC4yOF0sIFsxMjQuNTgsIC0yMy4yMF0sIFsxMjMuNjEsIC0yMi4xNF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJvXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwicmVkXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxNVwiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjExMVwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEyOC44NCwgLTI1Ljc2XSwgWzEyOC4xOCwgLTI1LjYwXSwgWzEyNy45NiwgLTI1LjUyXSwgWzEyNy44OCwgLTI1LjUyXSwgWzEyNy43MCwgLTI1LjYwXSxcbiAqICAgICAgICAgICAgICBbMTI3LjI2LCAtMjUuNzldLCBbMTI2LjYwLCAtMjYuMTFdLCBbMTI2LjE2LCAtMjYuNzhdLCBbMTI2LjEyLCAtMjcuNjhdLCBbMTI2LjIxLCAtMjguNDJdLFxuICogICAgICAgICAgICAgIFsxMjYuNjksIC0yOS40OV0sIFsxMjcuNzQsIC0yOS44MF0sIFsxMjguODAsIC0yOS43Ml0sIFsxMjkuNDEsIC0yOS4wM10sIFsxMjkuNzIsIC0yNy45NV0sXG4gKiAgICAgICAgICAgICAgWzEyOS42OCwgLTI3LjIxXSwgWzEyOS4zMywgLTI2LjIzXSwgWzEyOC44NCwgLTI1Ljc2XVxuICogICAgICAgICAgICBdLFxuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEyOC40NSwgLTI3LjQ0XSwgWzEyOC4zMiwgLTI2Ljk0XSwgWzEyNy43MCwgLTI2LjgyXSwgWzEyNy4zNSwgLTI3LjA1XSwgWzEyNy4xNywgLTI3LjgwXSxcbiAqICAgICAgICAgICAgICBbMTI3LjU3LCAtMjguMjJdLCBbMTI4LjEwLCAtMjguNDJdLCBbMTI4LjQ5LCAtMjcuODBdLCBbMTI4LjQ1LCAtMjcuNDRdXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwib1wiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcInllbGxvd1wiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTVcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMTFcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzEuODcsIC0yNS43Nl0sIFsxMzEuMzUsIC0yNi4wN10sIFsxMzAuOTUsIC0yNi43OF0sIFsxMzAuODIsIC0yNy42NF0sIFsxMzAuODYsIC0yOC41M10sXG4gKiAgICAgICAgICAgICAgWzEzMS4yNiwgLTI5LjIyXSwgWzEzMS45MiwgLTI5Ljc2XSwgWzEzMi40NSwgLTI5Ljg3XSwgWzEzMy4wNiwgLTI5Ljc2XSwgWzEzMy43MiwgLTI5LjM0XSxcbiAqICAgICAgICAgICAgICBbMTM0LjA3LCAtMjguODBdLCBbMTM0LjIwLCAtMjcuOTFdLCBbMTM0LjA3LCAtMjcuMjFdLCBbMTMzLjgxLCAtMjYuMzFdLCBbMTMzLjM3LCAtMjUuODNdLFxuICogICAgICAgICAgICAgIFsxMzIuNzEsIC0yNS42NF0sIFsxMzEuODcsIC0yNS43Nl1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzMuMTUsIC0yNy4xN10sIFsxMzIuNzEsIC0yNi44Nl0sIFsxMzIuMDksIC0yNi45MF0sIFsxMzEuNzQsIC0yNy41Nl0sIFsxMzEuNzksIC0yOC4yNl0sXG4gKiAgICAgICAgICAgICAgWzEzMi4zNiwgLTI4LjQ1XSwgWzEzMi45MywgLTI4LjM0XSwgWzEzMy4xNSwgLTI3Ljc2XSwgWzEzMy4xNSwgLTI3LjE3XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImdcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJibHVlXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI3XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTAzXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTM4LjEyLCAtMjUuMDRdLCBbMTM2Ljg0LCAtMjUuMTZdLCBbMTM1Ljk2LCAtMjUuMzZdLCBbMTM1LjI2LCAtMjUuOTldLCBbMTM1LCAtMjYuOTBdLFxuICogICAgICAgICAgICAgIFsxMzUuMDQsIC0yNy45MV0sIFsxMzUuMjYsIC0yOC44OF0sIFsxMzYuMDUsIC0yOS40NV0sIFsxMzcuMDIsIC0yOS40OV0sIFsxMzcuODEsIC0yOS40OV0sXG4gKiAgICAgICAgICAgICAgWzEzNy45NCwgLTI5Ljk5XSwgWzEzNy45MCwgLTMxLjIwXSwgWzEzNy44NSwgLTMyLjI0XSwgWzEzNi44OCwgLTMyLjY5XSwgWzEzNi40NSwgLTMyLjM2XSxcbiAqICAgICAgICAgICAgICBbMTM2LjI3LCAtMzEuODBdLCBbMTM0Ljk1LCAtMzEuODRdLCBbMTM1LjE3LCAtMzIuOTldLCBbMTM1LjUyLCAtMzMuNDNdLCBbMTM2LjE0LCAtMzMuNzZdLFxuICogICAgICAgICAgICAgIFsxMzcuMDYsIC0zMy44M10sIFsxMzguMTIsIC0zMy42NV0sIFsxMzguODYsIC0zMy4yMV0sIFsxMzkuMzAsIC0zMi4yOF0sIFsxMzkuMzAsIC0zMS4yNF0sXG4gKiAgICAgICAgICAgICAgWzEzOS4zMCwgLTMwLjE0XSwgWzEzOS4yMSwgLTI4Ljk2XSwgWzEzOS4xNywgLTI4LjIyXSwgWzEzOS4wOCwgLTI3LjQxXSwgWzEzOS4wOCwgLTI2LjQ3XSxcbiAqICAgICAgICAgICAgICBbMTM4Ljk5LCAtMjUuNDBdLCBbMTM4LjczLCAtMjUuMDBdLCBbMTM4LjEyLCAtMjUuMDRdXG4gKiAgICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTM3LjUwLCAtMjYuNTRdLCBbMTM2Ljk3LCAtMjYuNDddLCBbMTM2LjQ5LCAtMjYuNThdLCBbMTM2LjMxLCAtMjcuMTNdLCBbMTM2LjMxLCAtMjcuNzJdLFxuICogICAgICAgICAgICAgIFsxMzYuNTgsIC0yNy45OV0sIFsxMzcuNTAsIC0yOC4wM10sIFsxMzcuNjgsIC0yNy42OF0sIFsxMzcuNTksIC0yNi43OF0sIFsxMzcuNTAsIC0yNi41NF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJsXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwiZ3JlZW5cIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjEyXCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTA4XCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTQwLjE0LCAtMjEuMDRdLCBbMTQwLjMxLCAtMjkuNDJdLCBbMTQxLjY3LCAtMjkuNDldLCBbMTQxLjU5LCAtMjAuOTJdLCBbMTQwLjE0LCAtMjEuMDRdXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwiZVwiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcInJlZFwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiNVwiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjEwMVwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzE0NC4xNCwgLTI3LjQxXSwgWzE0NS42NywgLTI3LjUyXSwgWzE0Ni44NiwgLTI3LjA5XSwgWzE0Ni44MiwgLTI1LjY0XSwgWzE0Ni4yNSwgLTI1LjA0XSxcbiAqICAgICAgICAgICAgICBbMTQ1LjQ1LCAtMjQuNjhdLCBbMTQ0LjY2LCAtMjQuNjBdLCBbMTQ0LjA5LCAtMjQuNzZdLCBbMTQzLjQzLCAtMjUuMDhdLCBbMTQyLjk5LCAtMjUuNDBdLFxuICogICAgICAgICAgICAgIFsxNDIuNjQsIC0yNi4wM10sIFsxNDIuNjQsIC0yNy4wNV0sIFsxNDIuNjQsIC0yOC4yNl0sIFsxNDMuMzAsIC0yOS4xMV0sIFsxNDQuMTgsIC0yOS41N10sXG4gKiAgICAgICAgICAgICAgWzE0NS40MSwgLTI5LjY0XSwgWzE0Ni40NiwgLTI5LjE5XSwgWzE0Ni42NCwgLTI4LjcyXSwgWzE0Ni44MiwgLTI4LjE0XSwgWzE0NC44NCwgLTI4LjQyXSxcbiAqICAgICAgICAgICAgICBbMTQ0LjMxLCAtMjguMjZdLCBbMTQ0LjE0LCAtMjcuNDFdXG4gKiAgICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTQ0LjE4LCAtMjYuMzldLCBbMTQ0LjUzLCAtMjYuNThdLCBbMTQ1LjE5LCAtMjYuNjJdLCBbMTQ1LjcyLCAtMjYuMzVdLCBbMTQ1LjgxLCAtMjUuOTFdLFxuICogICAgICAgICAgICAgIFsxNDUuNDEsIC0yNS42OF0sIFsxNDQuOTcsIC0yNS42OF0sIFsxNDQuNDksIC0yNS42NF0sIFsxNDQsIC0yNS45OV0sIFsxNDQuMTgsIC0yNi4zOV1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfVxuICogICAgXVxuICogIH07XG4gKiB9XG4gKiBgYGBcbiAqL1xudmFyIEFnbURhdGFMYXllciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtRGF0YUxheWVyKF9tYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSBfbWFuYWdlcjtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gYSBmZWF0dXJlIGluIHRoZSBsYXllciBpcyBjbGlja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sYXllckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGdlb0pzb24gdG8gYmUgZGlzcGxheWVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmdlb0pzb24gPSBudWxsO1xuICAgIH1cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYW5hZ2VyLmFkZERhdGFMYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtRGF0YUxheWVyLnByb3RvdHlwZS5fYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGF5ZXJDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICBdO1xuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgb3MgPSBfdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUob2JqLm5hbWUsIF90aGlzKS5zdWJzY3JpYmUob2JqLmhhbmRsZXIpO1xuICAgICAgICAgICAgX3RoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChvcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbURhdGFMYXllci5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9pZDsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtRGF0YUxheWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiQWdtRGF0YUxheWVyLVwiICsgdGhpcy5faWQudG9TdHJpbmcoKTsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtRGF0YUxheWVyLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlci5kZWxldGVEYXRhTGF5ZXIodGhpcyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtRGF0YUxheWVyLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fYWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2VvSnNvbkNoYW5nZSA9IGNoYW5nZXNbJ2dlb0pzb24nXTtcbiAgICAgICAgaWYgKGdlb0pzb25DaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIudXBkYXRlR2VvSnNvbih0aGlzLCBnZW9Kc29uQ2hhbmdlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGFPcHRpb25zID0ge307XG4gICAgICAgIEFnbURhdGFMYXllci5fZGF0YU9wdGlvbnNBdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgcmV0dXJuIGRhdGFPcHRpb25zW2tdID0gY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eShrKSA/IGNoYW5nZXNba10uY3VycmVudFZhbHVlIDogX3RoaXNba107IH0pO1xuICAgICAgICB0aGlzLl9tYW5hZ2VyLnNldERhdGFPcHRpb25zKHRoaXMsIGRhdGFPcHRpb25zKTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21EYXRhTGF5ZXI7XG59KCkpO1xuZXhwb3J0IHsgQWdtRGF0YUxheWVyIH07XG5BZ21EYXRhTGF5ZXIuX2RhdGFPcHRpb25zQXR0cmlidXRlcyA9IFsnc3R5bGUnXTtcbkFnbURhdGFMYXllci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYWdtLWRhdGEtbGF5ZXInXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbURhdGFMYXllci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IERhdGFMYXllck1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtRGF0YUxheWVyLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdsYXllckNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnZ2VvSnNvbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3R5bGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YS1sYXllci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9kYXRhLWxheWVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4Mzhcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXInO1xuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4vaW5mby13aW5kb3cnO1xudmFyIG1hcmtlcklkID0gMDtcbi8qKlxuICogQWdtTWFya2VyIHJlbmRlcnMgYSBtYXAgbWFya2VyIGluc2lkZSBhIHtAbGluayBBZ21NYXB9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tbWFwLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbbGFiZWxdPVwiJ00nXCI+XG4gKiAgICAgIDwvYWdtLW1hcmtlcj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbnZhciBBZ21NYXJrZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbU1hcmtlcihfbWFya2VyTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyID0gX21hcmtlck1hbmFnZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0cnVlLCB0aGUgbWFya2VyIGNhbiBiZSBkcmFnZ2VkLiBEZWZhdWx0IHZhbHVlIGlzIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBpcyB2aXNpYmxlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byBhdXRvbWF0aWNhbGx5IG9wZW4gdGhlIGNoaWxkIGluZm8gd2luZG93IHdoZW4gdGhlIG1hcmtlciBpcyBjbGlja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcGVuSW5mb1dpbmRvdyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWFya2VyJ3Mgb3BhY2l0eSBiZXR3ZWVuIDAuMCBhbmQgMS4wLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vcGFjaXR5ID0gMTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbCBtYXJrZXJzIGFyZSBkaXNwbGF5ZWQgb24gdGhlIG1hcCBpbiBvcmRlciBvZiB0aGVpciB6SW5kZXgsIHdpdGggaGlnaGVyIHZhbHVlcyBkaXNwbGF5aW5nIGluXG4gICAgICAgICAqIGZyb250IG9mIG1hcmtlcnMgd2l0aCBsb3dlciB2YWx1ZXMuIEJ5IGRlZmF1bHQsIG1hcmtlcnMgYXJlIGRpc3BsYXllZCBhY2NvcmRpbmcgdG8gdGhlaXJcbiAgICAgICAgICogdmVydGljYWwgcG9zaXRpb24gb24gc2NyZWVuLCB3aXRoIGxvd2VyIG1hcmtlcnMgYXBwZWFyaW5nIGluIGZyb250IG9mIG1hcmtlcnMgZnVydGhlciB1cCB0aGVcbiAgICAgICAgICogc2NyZWVuLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56SW5kZXggPSAxO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgY2xpY2tlZC4gRGVmYXVsdCB2YWx1ZSBpcyB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcmtlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgbW91c2VzIG92ZXIgdGhlIG1hcmtlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VPdmVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIG1vdXNlcyBvdXRzaWRlIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQGludGVybmFsXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluZm9XaW5kb3cgPSBuZXcgUXVlcnlMaXN0KCk7XG4gICAgICAgIHRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5faWQgPSAobWFya2VySWQrKykudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgLyogQGludGVybmFsICovXG4gICAgQWdtTWFya2VyLnByb3RvdHlwZS5uZ0FmdGVyQ29udGVudEluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpO1xuICAgICAgICB0aGlzLmluZm9XaW5kb3cuY2hhbmdlcy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSgpOyB9KTtcbiAgICB9O1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUuaGFuZGxlSW5mb1dpbmRvd1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuaW5mb1dpbmRvdy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIG5vIG1vcmUgdGhhbiBvbmUgaW5mbyB3aW5kb3cuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmZvV2luZG93LmZvckVhY2goZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICAgICAgbWFya2VyLmhvc3RNYXJrZXIgPSBfdGhpcztcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtTWFya2VyLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5sYXRpdHVkZSAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHRoaXMubG9uZ2l0dWRlICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlcikge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci5hZGRNYXJrZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlTWFya2VyUG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3RpdGxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVGl0bGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhYmVsJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlTGFiZWwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2RyYWdnYWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZURyYWdnYWJsZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snaWNvblVybCddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUljb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ29wYWNpdHknXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVPcGFjaXR5KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlVmlzaWJsZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlWkluZGV4KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydjbGlja2FibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVDbGlja2FibGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUuX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgY3MgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wZW5JbmZvV2luZG93KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5mb1dpbmRvdy5mb3JFYWNoKGZ1bmN0aW9uIChpbmZvV2luZG93KSB7IHJldHVybiBpbmZvV2luZG93Lm9wZW4oKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5tYXJrZXJDbGljay5lbWl0KG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChjcyk7XG4gICAgICAgIHZhciBkcyA9IHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdkcmFnZW5kJywgdGhpcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIF90aGlzLmRyYWdFbmQuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKGRzKTtcbiAgICAgICAgdmFyIG1vdmVyID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ21vdXNlb3ZlcicsIHRoaXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBfdGhpcy5tb3VzZU92ZXIuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdmVyKTtcbiAgICAgICAgdmFyIG1vdXQgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnbW91c2VvdXQnLCB0aGlzKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMubW91c2VPdXQuZW1pdCh7IGNvb3JkczogeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKG1vdXQpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9pZDsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtTWFya2VyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdBZ21NYXJrZXItJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuZGVsZXRlTWFya2VyKHRoaXMpO1xuICAgICAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21NYXJrZXI7XG59KCkpO1xuZXhwb3J0IHsgQWdtTWFya2VyIH07XG5BZ21NYXJrZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1tYXJrZXInXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbU1hcmtlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IE1hcmtlck1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtTWFya2VyLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd0aXRsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbGFiZWwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2RyYWdnYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ21hcmtlckRyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2ljb25VcmwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Zpc2libGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ29wZW5JbmZvV2luZG93JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdvcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6SW5kZXgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2NsaWNrYWJsZSc6IFt7IHR5cGU6IElucHV0LCBhcmdzOiBbJ21hcmtlckNsaWNrYWJsZScsXSB9LF0sXG4gICAgJ21hcmtlckNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnZHJhZ0VuZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnaW5mb1dpbmRvdyc6IFt7IHR5cGU6IENvbnRlbnRDaGlsZHJlbiwgYXJnczogW0FnbUluZm9XaW5kb3csXSB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFya2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL21hcmtlci5qc1xuLy8gbW9kdWxlIGlkID0gODM5XG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG4vKipcbiAqIEFnbVBvbHlnb24gcmVuZGVycyBhIHBvbHlnb24gb24gYSB7QGxpbmsgQWdtTWFwfVxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIGFnbS1tYXAge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgICAgPGFnbS1wb2x5Z29uIFtwYXRoc109XCJwYXRoc1wiPlxuICogICAgICA8L2FnbS1wb2x5Z29uPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlNYXBDbXAge1xuICogICBsYXQ6IG51bWJlciA9IDA7XG4gKiAgIGxuZzogbnVtYmVyID0gMDtcbiAqICAgem9vbTogbnVtYmVyID0gMTA7XG4gKiAgIHBhdGhzOiBBcnJheTxMYXRMbmdMaXRlcmFsPiA9IFtcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfVxuICogICBdXG4gKiAgIC8vIE5lc3RpbmcgcGF0aHMgd2lsbCBjcmVhdGUgYSBob2xlIHdoZXJlIHRoZXkgb3ZlcmxhcDtcbiAqICAgbmVzdGVkUGF0aHM6IEFycmF5PEFycmF5PExhdExuZ0xpdGVyYWw+PiA9IFtbXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH1cbiAqICAgXSwgW1xuICogICAgIHsgbGF0OiAwLCBsbmc6IDE1IH0sXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogNSwgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiA1LCBsbmc6IDE1IH0sXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMTUgfVxuICogICBdXVxuICogfVxuICogYGBgXG4gKi9cbnZhciBBZ21Qb2x5Z29uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21Qb2x5Z29uKF9wb2x5Z29uTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9wb2x5Z29uTWFuYWdlciA9IF9wb2x5Z29uTWFuYWdlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgUG9seWdvbiBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xpY2thYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljXG4gICAgICAgICAqIHByb3BlcnR5IGRlZmluZXMgdGhlIG1vZGUgb2YgZHJhZ2dpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2xcbiAgICAgICAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsXG4gICAgICAgICAqIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlXG4gICAgICAgICAqIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS4gTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhXG4gICAgICAgICAqIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xuICAgICAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZW9kZXNpYyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG9yZGVyZWQgc2VxdWVuY2Ugb2YgY29vcmRpbmF0ZXMgdGhhdCBkZXNpZ25hdGVzIGEgY2xvc2VkIGxvb3AuXG4gICAgICAgICAqIFVubGlrZSBwb2x5bGluZXMsIGEgcG9seWdvbiBtYXkgY29uc2lzdCBvZiBvbmUgb3IgbW9yZSBwYXRocy5cbiAgICAgICAgICogIEFzIGEgcmVzdWx0LCB0aGUgcGF0aHMgcHJvcGVydHkgbWF5IHNwZWNpZnkgb25lIG9yIG1vcmUgYXJyYXlzIG9mXG4gICAgICAgICAqIExhdExuZyBjb29yZGluYXRlcy4gUGF0aHMgYXJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5OyBkbyBub3QgcmVwZWF0IHRoZVxuICAgICAgICAgKiBmaXJzdCB2ZXJ0ZXggb2YgdGhlIHBhdGggYXMgdGhlIGxhc3QgdmVydGV4LiBTaW1wbGUgcG9seWdvbnMgbWF5IGJlXG4gICAgICAgICAqIGRlZmluZWQgdXNpbmcgYSBzaW5nbGUgYXJyYXkgb2YgTGF0TG5ncy4gTW9yZSBjb21wbGV4IHBvbHlnb25zIG1heVxuICAgICAgICAgKiBzcGVjaWZ5IGFuIGFycmF5IG9mIGFycmF5cy4gQW55IHNpbXBsZSBhcnJheXMgYXJlIGNvbnZlcnRlZCBpbnRvIEFycmF5cy5cbiAgICAgICAgICogSW5zZXJ0aW5nIG9yIHJlbW92aW5nIExhdExuZ3MgZnJvbSB0aGUgQXJyYXkgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZVxuICAgICAgICAgKiB0aGUgcG9seWdvbiBvbiB0aGUgbWFwLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5RGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlEcmFnID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5RHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdXQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWdvbiBtb3VzZW92ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZSB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb25cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9seU1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW4gaXMgZmlyZWQgd2hlbiB0aGUgUG9seWdvbiBpcyByaWdodC1jbGlja2VkIG9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5UmlnaHRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLm5nQWZ0ZXJDb250ZW50SW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWdtUG9seWdvbi5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLnNldFBvbHlnb25PcHRpb25zKHRoaXMsIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpKTtcbiAgICB9O1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5hZGRQb2x5Z29uKHRoaXMpO1xuICAgICAgICB0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtUG9seWdvbi5wcm90b3R5cGUuX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaGFuZGxlcnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seUNsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmNsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RGJsQ2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlEcmFnLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RHJhZ0VuZC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RHJhZ1N0YXJ0LmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlNb3VzZURvd24uZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seU1vdXNlTW92ZS5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlNb3VzZU91dC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5TW91c2VPdmVyLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZXVwJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5TW91c2VVcC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seVJpZ2h0Q2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgXTtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgb3MgPSBfdGhpcy5fcG9seWdvbk1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCBfdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgICAgICAgIF90aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLl91cGRhdGVQb2x5Z29uT3B0aW9ucyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGFuZ2VzKVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gQWdtUG9seWdvbi5fcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xOyB9KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrKSB7XG4gICAgICAgICAgICBvYmpba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuZGVsZXRlUG9seWdvbih0aGlzKTtcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21Qb2x5Z29uO1xufSgpKTtcbmV4cG9ydCB7IEFnbVBvbHlnb24gfTtcbkFnbVBvbHlnb24uX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcyA9IFtcbiAgICAnY2xpY2thYmxlJywgJ2RyYWdnYWJsZScsICdlZGl0YWJsZScsICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnZ2VvZGVzaWMnLCAnaWNvbicsICdtYXAnLFxuICAgICdwYXRocycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsICd2aXNpYmxlJywgJ3pJbmRleCcsICdkcmFnZ2FibGUnLFxuICAgICdlZGl0YWJsZScsICd2aXNpYmxlJ1xuXTtcbkFnbVBvbHlnb24uZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1wb2x5Z29uJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Qb2x5Z29uLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogUG9seWdvbk1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtUG9seWdvbi5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnY2xpY2thYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydwb2x5RHJhZ2dhYmxlJyxdIH0sXSxcbiAgICAnZWRpdGFibGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2ZpbGxDb2xvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZmlsbE9wYWNpdHknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2dlb2Rlc2ljJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwYXRocyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZU9wYWNpdHknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZVdlaWdodCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndmlzaWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnekluZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwb2x5Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5RGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5RHJhZyc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlEcmFnRW5kJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seURyYWdTdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlNb3VzZURvd24nOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5TW91c2VNb3ZlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seU1vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seU1vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlNb3VzZVVwJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seVJpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlnb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWdvbi5qc1xuLy8gbW9kdWxlIGlkID0gODQwXG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsImltcG9ydCB7IENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvbHlsaW5lTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXInO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vcG9seWxpbmUtcG9pbnQnO1xudmFyIHBvbHlsaW5lSWQgPSAwO1xuLyoqXG4gKiBBZ21Qb2x5bGluZSByZW5kZXJzIGEgcG9seWxpbmUgb24gYSB7QGxpbmsgQWdtTWFwfVxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tbWFwLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLXBvbHlsaW5lPlxuICogICAgICAgICAgPGFnbS1wb2x5bGluZS1wb2ludCBbbGF0aXR1ZGVdPVwibGF0QVwiIFtsb25naXR1ZGVdPVwibG5nQVwiPlxuICogICAgICAgICAgPC9hZ20tcG9seWxpbmUtcG9pbnQ+XG4gKiAgICAgICAgICA8YWdtLXBvbHlsaW5lLXBvaW50IFtsYXRpdHVkZV09XCJsYXRCXCIgW2xvbmdpdHVkZV09XCJsbmdCXCI+XG4gKiAgICAgICAgICA8L2FnbS1wb2x5bGluZS1wb2ludD5cbiAqICAgICAgPC9hZ20tcG9seWxpbmU+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG52YXIgQWdtUG9seWxpbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbVBvbHlsaW5lKF9wb2x5bGluZU1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyID0gX3BvbHlsaW5lTWFuYWdlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgUG9seWxpbmUgaGFuZGxlcyBtb3VzZSBldmVudHMuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGRyYWcgdGhpcyBzaGFwZSBvdmVyIHRoZSBtYXAuIFRoZSBnZW9kZXNpYyBwcm9wZXJ0eSBkZWZpbmVzIHRoZVxuICAgICAgICAgKiBtb2RlIG9mIGRyYWdnaW5nLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZWRpdCB0aGlzIHNoYXBlIGJ5IGRyYWdnaW5nIHRoZSBjb250cm9sIHBvaW50cyBzaG93biBhdCB0aGVcbiAgICAgICAgICogdmVydGljZXMgYW5kIG9uIGVhY2ggc2VnbWVudC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGVuIHRydWUsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSBpbnRlcnByZXRlZCBhcyBnZW9kZXNpYyBhbmQgd2lsbCBmb2xsb3cgdGhlIGN1cnZhdHVyZSBvZlxuICAgICAgICAgKiB0aGUgRWFydGguIFdoZW4gZmFsc2UsIGVkZ2VzIG9mIHRoZSBwb2x5Z29uIGFyZSByZW5kZXJlZCBhcyBzdHJhaWdodCBsaW5lcyBpbiBzY3JlZW4gc3BhY2UuXG4gICAgICAgICAqIE5vdGUgdGhhdCB0aGUgc2hhcGUgb2YgYSBnZW9kZXNpYyBwb2x5Z29uIG1heSBhcHBlYXIgdG8gY2hhbmdlIHdoZW4gZHJhZ2dlZCwgYXMgdGhlIGRpbWVuc2lvbnNcbiAgICAgICAgICogYXJlIG1haW50YWluZWQgcmVsYXRpdmUgdG8gdGhlIHN1cmZhY2Ugb2YgdGhlIGVhcnRoLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2VvZGVzaWMgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhpcyBwb2x5bGluZSBpcyB2aXNpYmxlIG9uIHRoZSBtYXAuIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBkYmxjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgcG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVEcmFnID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZURyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBwb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZURyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lTW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW91dC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBQb2x5bGluZSBtb3VzZW92ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVNb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZSB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlsaW5lXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVNb3VzZVVwID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVuIGlzIGZpcmVkIHdoZW4gdGhlIFBvbHlsaW5lIGlzIHJpZ2h0LWNsaWNrZWQgb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVSaWdodENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5faWQgPSAocG9seWxpbmVJZCsrKS50b1N0cmluZygpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLm5nQWZ0ZXJDb250ZW50SW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMucG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IHBvaW50LnBvc2l0aW9uQ2hhbmdlZC5zdWJzY3JpYmUoZnVuY3Rpb24gKCkgeyBfdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKF90aGlzKTsgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzID0gdGhpcy5wb2ludHMuY2hhbmdlcy5zdWJzY3JpYmUoZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyhfdGhpcyk7IH0pO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lTWFuYWdlci51cGRhdGVQb2x5bGluZVBvaW50cyh0aGlzKTtcbiAgICB9O1xuICAgIEFnbVBvbHlsaW5lLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5fcG9seWxpbmVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcHRpb25zID0ge307XG4gICAgICAgIHZhciBvcHRpb25LZXlzID0gT2JqZWN0LmtleXMoY2hhbmdlcykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBBZ21Qb2x5bGluZS5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcy5pbmRleE9mKGspICE9PSAtMTsgfSk7XG4gICAgICAgIG9wdGlvbktleXMuZm9yRWFjaChmdW5jdGlvbiAoaykgeyByZXR1cm4gb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnNldFBvbHlsaW5lT3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9O1xuICAgIEFnbVBvbHlsaW5lLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmFkZFBvbHlsaW5lKHRoaXMpO1xuICAgICAgICB0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIEFnbVBvbHlsaW5lLnByb3RvdHlwZS5fYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBoYW5kbGVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lQ2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RibGNsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lRGJsQ2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEcmFnLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lRHJhZ0VuZC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lRHJhZ1N0YXJ0LmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVNb3VzZURvd24uZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZU1vdXNlTW92ZS5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVNb3VzZU91dC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lTW91c2VPdmVyLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZXVwJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lTW91c2VVcC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZVJpZ2h0Q2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgXTtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgb3MgPSBfdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgX3RoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLl9nZXRQb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnBvaW50cykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLnRvQXJyYXkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW107XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faWQ7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbVBvbHlsaW5lLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLmRlbGV0ZVBvbHlsaW5lKHRoaXMpO1xuICAgICAgICAvLyB1bnN1YnNjcmliZSBhbGwgcmVnaXN0ZXJlZCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEFnbVBvbHlsaW5lO1xufSgpKTtcbmV4cG9ydCB7IEFnbVBvbHlsaW5lIH07XG5BZ21Qb2x5bGluZS5fcG9seWxpbmVPcHRpb25zQXR0cmlidXRlcyA9IFtcbiAgICAnZHJhZ2dhYmxlJywgJ2VkaXRhYmxlJywgJ3Zpc2libGUnLCAnZ2VvZGVzaWMnLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VXZWlnaHQnLFxuICAgICd6SW5kZXgnXG5dO1xuQWdtUG9seWxpbmUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1wb2x5bGluZSdcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtUG9seWxpbmUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBQb2x5bGluZU1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtUG9seWxpbmUucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2NsaWNrYWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dhYmxlJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsncG9seWxpbmVEcmFnZ2FibGUnLF0gfSxdLFxuICAgICdlZGl0YWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZ2VvZGVzaWMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZUNvbG9yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VPcGFjaXR5JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VXZWlnaHQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3Zpc2libGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbGluZUNsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZURibENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZURyYWcnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lRHJhZ0VuZCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVEcmFnU3RhcnQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lTW91c2VEb3duJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZU1vdXNlTW92ZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVNb3VzZU91dCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVNb3VzZU92ZXInOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lTW91c2VVcCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVSaWdodENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9pbnRzJzogW3sgdHlwZTogQ29udGVudENoaWxkcmVuLCBhcmdzOiBbQWdtUG9seWxpbmVQb2ludCxdIH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2x5bGluZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9wb2x5bGluZS5qc1xuLy8gbW9kdWxlIGlkID0gODQxXG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsInZhciBXaW5kb3dSZWYgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFdpbmRvd1JlZigpIHtcbiAgICB9XG4gICAgV2luZG93UmVmLnByb3RvdHlwZS5nZXROYXRpdmVXaW5kb3cgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB3aW5kb3c7IH07XG4gICAgcmV0dXJuIFdpbmRvd1JlZjtcbn0oKSk7XG5leHBvcnQgeyBXaW5kb3dSZWYgfTtcbnZhciBEb2N1bWVudFJlZiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnRSZWYoKSB7XG4gICAgfVxuICAgIERvY3VtZW50UmVmLnByb3RvdHlwZS5nZXROYXRpdmVEb2N1bWVudCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRvY3VtZW50OyB9O1xuICAgIHJldHVybiBEb2N1bWVudFJlZjtcbn0oKSk7XG5leHBvcnQgeyBEb2N1bWVudFJlZiB9O1xuZXhwb3J0IHZhciBCUk9XU0VSX0dMT0JBTFNfUFJPVklERVJTID0gW1dpbmRvd1JlZiwgRG9jdW1lbnRSZWZdO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1nbG9iYWxzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS91dGlscy9icm93c2VyLWdsb2JhbHMuanNcbi8vIG1vZHVsZSBpZCA9IDg0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCIvLyBtYWluIG1vZHVsZXNcbmV4cG9ydCAqIGZyb20gJy4vZGlyZWN0aXZlcyc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzJztcbi8vIGNvcmUgbW9kdWxlXG4vLyB3ZSBleHBsaWNpdGx5IGV4cG9ydCB0aGUgbW9kdWxlIGhlcmUgdG8gcHJldmVudCB0aGlzIElvbmljIDIgYnVnOlxuLy8gaHR0cDovL3N0ZXZlbWljaGVsb3R0aS5jb20vaW50ZWdyYXRlLWFuZ3VsYXItMi1nb29nbGUtbWFwcy1pbnRvLWlvbmljLTIvXG5leHBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gZnJvbSAnLi9jb3JlLm1vZHVsZSc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDg0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDkgMTAiLCJleHBvcnQgeyBBZ21NYXAgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFwJztcbmV4cG9ydCB7IEFnbUNpcmNsZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9jaXJjbGUnO1xuZXhwb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4vZGlyZWN0aXZlcy9pbmZvLXdpbmRvdyc7XG5leHBvcnQgeyBBZ21LbWxMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9rbWwtbGF5ZXInO1xuZXhwb3J0IHsgQWdtRGF0YUxheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RhdGEtbGF5ZXInO1xuZXhwb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcmtlcic7XG5leHBvcnQgeyBBZ21Qb2x5Z29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xuZXhwb3J0IHsgQWdtUG9seWxpbmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUnO1xuZXhwb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmVzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NDdcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiZXhwb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuL3NlcnZpY2VzL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmV4cG9ydCB7IENpcmNsZU1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyJztcbmV4cG9ydCB7IEluZm9XaW5kb3dNYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcbmV4cG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyJztcbmV4cG9ydCB7IFBvbHlnb25NYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5Z29uLW1hbmFnZXInO1xuZXhwb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmV4cG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xuZXhwb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyJztcbmV4cG9ydCB7IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbCwgTEFaWV9NQVBTX0FQSV9DT05GSUcsIExhenlNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXInO1xuZXhwb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlcic7XG5leHBvcnQgeyBOb09wTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL25vb3AtbWFwcy1hcGktbG9hZGVyJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcnZpY2VzLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy5qc1xuLy8gbW9kdWxlIGlkID0gODQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gOSAxMCIsIi8qKlxuICogV2hlbiB1c2luZyB0aGUgTm9PcE1hcHNBUElMb2FkZXIsIHRoZSBHb29nbGUgTWFwcyBBUEkgbXVzdCBiZSBhZGRlZCB0byB0aGUgcGFnZSB2aWEgYSBgPHNjcmlwdD5gXG4gKiBUYWcuXG4gKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBHb29nbGUgTWFwcyBBUEkgc2NyaXB0IGdldHMgbG9hZGVkIGZpcnN0IG9uIHRoZSBwYWdlLlxuICovXG52YXIgTm9PcE1hcHNBUElMb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vT3BNYXBzQVBJTG9hZGVyKCkge1xuICAgIH1cbiAgICBOb09wTWFwc0FQSUxvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF3aW5kb3cuZ29vZ2xlIHx8ICF3aW5kb3cuZ29vZ2xlLm1hcHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR29vZ2xlIE1hcHMgQVBJIG5vdCBsb2FkZWQgb24gcGFnZS4gTWFrZSBzdXJlIHdpbmRvdy5nb29nbGUubWFwcyBpcyBhdmFpbGFibGUhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIE5vT3BNYXBzQVBJTG9hZGVyO1xufSgpKTtcbmV4cG9ydCB7IE5vT3BNYXBzQVBJTG9hZGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub29wLW1hcHMtYXBpLWxvYWRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL25vb3AtbWFwcy1hcGktbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NDlcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFnbU1hcCB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXAnO1xuaW1wb3J0IHsgQWdtQ2lyY2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NpcmNsZSc7XG5pbXBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9kaXJlY3RpdmVzL2luZm8td2luZG93JztcbmltcG9ydCB7IEFnbU1hcmtlciB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXJrZXInO1xuaW1wb3J0IHsgQWdtUG9seWdvbiB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5Z29uJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lJztcbmltcG9ydCB7IEFnbVBvbHlsaW5lUG9pbnQgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQnO1xuaW1wb3J0IHsgQWdtS21sTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMva21sLWxheWVyJztcbmltcG9ydCB7IEFnbURhdGFMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9kYXRhLWxheWVyJztcbmltcG9ydCB7IExhenlNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXInO1xuaW1wb3J0IHsgTEFaWV9NQVBTX0FQSV9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlcic7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcbmltcG9ydCB7IEJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMgfSBmcm9tICcuL3V0aWxzL2Jyb3dzZXItZ2xvYmFscyc7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29yZURpcmVjdGl2ZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgQWdtTWFwLCBBZ21NYXJrZXIsIEFnbUluZm9XaW5kb3csIEFnbUNpcmNsZSxcbiAgICAgICAgQWdtUG9seWdvbiwgQWdtUG9seWxpbmUsIEFnbVBvbHlsaW5lUG9pbnQsIEFnbUttbExheWVyLFxuICAgICAgICBBZ21EYXRhTGF5ZXJcbiAgICBdO1xufVxuLyoqXG4gKiBUaGUgYW5ndWxhci1nb29nbGUtbWFwcyBjb3JlIG1vZHVsZS4gQ29udGFpbnMgYWxsIERpcmVjdGl2ZXMvU2VydmljZXMvUGlwZXNcbiAqIG9mIHRoZSBjb3JlIG1vZHVsZS4gUGxlYXNlIHVzZSBgQWdtQ29yZU1vZHVsZS5mb3JSb290KClgIGluIHlvdXIgYXBwIG1vZHVsZS5cbiAqL1xudmFyIEFnbUNvcmVNb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbUNvcmVNb2R1bGUoKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBsZWFzZSB1c2UgdGhpcyBtZXRob2Qgd2hlbiB5b3UgcmVnaXN0ZXIgdGhlIG1vZHVsZSBhdCB0aGUgcm9vdCBsZXZlbC5cbiAgICAgKi9cbiAgICBBZ21Db3JlTW9kdWxlLmZvclJvb3QgPSBmdW5jdGlvbiAobGF6eU1hcHNBUElMb2FkZXJDb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBZ21Db3JlTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBCUk9XU0VSX0dMT0JBTFNfUFJPVklERVJTLmNvbmNhdChbXG4gICAgICAgICAgICAgICAgeyBwcm92aWRlOiBNYXBzQVBJTG9hZGVyLCB1c2VDbGFzczogTGF6eU1hcHNBUElMb2FkZXIgfSxcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IExBWllfTUFQU19BUElfQ09ORklHLCB1c2VWYWx1ZTogbGF6eU1hcHNBUElMb2FkZXJDb25maWcgfVxuICAgICAgICAgICAgXSksXG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gQWdtQ29yZU1vZHVsZTtcbn0oKSk7XG5leHBvcnQgeyBBZ21Db3JlTW9kdWxlIH07XG5BZ21Db3JlTW9kdWxlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBOZ01vZHVsZSwgYXJnczogW3sgZGVjbGFyYXRpb25zOiBjb3JlRGlyZWN0aXZlcygpLCBleHBvcnRzOiBjb3JlRGlyZWN0aXZlcygpIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtQ29yZU1vZHVsZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtdOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5tb2R1bGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2NvcmUubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA4NTBcbi8vIG1vZHVsZSBjaHVua3MgPSA5IDEwIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcblxyXG5pbXBvcnQgeyB9IGZyb20gJy4uLy4uL3NoYXJlZC9jb2xvcnMvY29sb3JzLnNlcnZpY2UnOyBcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnYXBwLXdpZGdldHMnLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vd2lkZ2V0cy5jb21wb25lbnQuaHRtbCcpLFxyXG4gICAgc3R5bGVzOiBbcmVxdWlyZSgnLi93aWRnZXRzLmNvbXBvbmVudC5zY3NzJyldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXaWRnZXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBsYXQ6IG51bWJlciA9IDMzLjc5MDgwNztcclxuICAgIGxuZzogbnVtYmVyID0gLTExNy44MzU3MzQ7XHJcbiAgICB6b29tOiBudW1iZXIgPSAxNDtcclxuICAgIHNjcm9sbHdoZWVsID0gZmFsc2U7XHJcblxyXG4gICAgXHJcblxyXG4gICAgc3BhcmtPcHRpb25zMiA9IHtcclxuICAgICAgICB0eXBlOiAnbGluZScsXHJcbiAgICAgICAgaGVpZ2h0OiA4MCxcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgIGxpbmVXaWR0aDogMixcclxuICAgICAgICBsaW5lQ29sb3I6ICcjZGRkZGRkJyxcclxuICAgICAgICBzcG90Q29sb3I6ICcjYmJiYmJiJyxcclxuICAgICAgICBmaWxsQ29sb3I6ICcnLFxyXG4gICAgICAgIGhpZ2hsaWdodExpbmVDb2xvcjogJyNmZmYnLFxyXG4gICAgICAgIHNwb3RSYWRpdXM6IDMsXHJcbiAgICAgICAgcmVzaXplOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHNwYXJrT3B0aW9uczMgPSB7XHJcbiAgICAgICAgYmFyQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICBoZWlnaHQ6IDUwLFxyXG4gICAgICAgIGJhcldpZHRoOiA2LFxyXG4gICAgICAgIGJhclNwYWNpbmc6IDZcclxuICAgIH07XHJcblxyXG4gICBcclxuXHJcblxyXG4gICAgLy8gU1BMSU5FXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgc3BsaW5lRGF0YTogYW55O1xyXG4gICAgc3BsaW5lT3B0aW9ucyA9IHtcclxuICAgICAgICBzZXJpZXM6IHtcclxuICAgICAgICAgICAgbGluZXM6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBvaW50czoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJhZGl1czogNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzcGxpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVuc2lvbjogMC40LFxyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogMC41XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjZWVlJyxcclxuICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXHJcbiAgICAgICAgICAgIGhvdmVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZjZmNmYydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvb2x0aXA6IHRydWUsXHJcbiAgICAgICAgdG9vbHRpcE9wdHM6IHtcclxuICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24gKGxhYmVsLCB4LCB5KSB7IHJldHVybiB4ICsgJyA6ICcgKyB5OyB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB4YXhpczoge1xyXG4gICAgICAgICAgICB0aWNrQ29sb3I6ICcjZmNmY2ZjJyxcclxuICAgICAgICAgICAgbW9kZTogJ2NhdGVnb3JpZXMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB5YXhpczoge1xyXG4gICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgIG1heDogMTUwLCAvLyBvcHRpb25hbDogdXNlIGl0IGZvciBhIGNsZWFyIHJlcHJlc2V0YXRpb25cclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2VlZScsXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uOiAoYXBwLmxheW91dC5pc1JUTCA/ICdyaWdodCcgOiAnbGVmdCcpLFxyXG4gICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHYvKiArICcgdmlzaXRvcnMnKi87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNoYWRvd1NpemU6IDBcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q2hhcnREYXRhKCdhc3NldHMvc2VydmVyL2NoYXJ0L3NwbGluZS5qc29uJykuc3Vic2NyaWJlKGRhdGEgPT4gdGhpcy5zcGxpbmVEYXRhID0gZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcnREYXRhKHVybCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGVyLWxvYWRlci9zcmMhLi9ub2RlX21vZHVsZXMvYW5ndWxhcjItdGVtcGxhdGUtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvd2lkZ2V0cy93aWRnZXRzL3dpZGdldHMuY29tcG9uZW50LnRzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImNvbnRlbnQtaGVhZGluZ1xcXCI+V29yayBUaW1lIFJlcG9ydDwvZGl2PlxcclxcbjwhLS0gU1RBUlQgcm93LS0+XFxyXFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIFdoaXRlQkdcXFwiIGlkPVxcXCJwYW5lbENoYXJ0OVxcXCI+XFxyXFxuICAgICAgICAgIFxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC10aXRsZVxcXCI+IDxoMj5Zb3VyIHRpbWUgdHJlbmRzIDwvaDI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxwPiBZb3VyIHN0YXRzIGFyZSBiYXNlZCBvbiB5b3VyIGVtYWlsIGFuZCBjYWxlbmRhckhvdyB3ZSBjYWxjdWxhdGU8L3A+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtd3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmbG90IFtkYXRhc2V0XT1cXFwic3BsaW5lRGF0YVxcXCIgW29wdGlvbnNdPVxcXCJzcGxpbmVPcHRpb25zXFxcIiBoZWlnaHQ9XFxcIjMwMFxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcblxcclxcblxcclxcbjwvZGl2PlxcclxcblxcclxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy93aWRnZXRzL3dpZGdldHMvd2lkZ2V0cy5jb21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gODc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL0NsaWVudEFwcC9hcHAvcm91dGVzL3dpZGdldHMvd2lkZ2V0cy93aWRnZXRzLmNvbXBvbmVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCJdLCJzb3VyY2VSb290IjoiIn0=