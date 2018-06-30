webpackJsonp([1],{

/***/ 813:
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
var core_2 = __webpack_require__(839);
var shared_module_1 = __webpack_require__(99);
var widgets_component_1 = __webpack_require__(868);
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

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsAPIWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_api_loader_maps_api_loader__ = __webpack_require__(817);



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

/***/ 817:
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

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarkerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);



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

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CircleManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);



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

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoWindowManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__marker_manager__ = __webpack_require__(818);




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

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolygonManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);



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

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolylineManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);



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

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KmlLayerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);



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

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataLayerManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__google_maps_api_wrapper__ = __webpack_require__(815);



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

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmInfoWindow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_info_window_manager__ = __webpack_require__(820);


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

/***/ 826:
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

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsScriptProtocol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LAZY_MAPS_API_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LazyMapsAPILoader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_browser_globals__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps_api_loader__ = __webpack_require__(817);
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

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_google_maps_api_wrapper__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_managers_circle_manager__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_managers_info_window_manager__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_managers_marker_manager__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_managers_polygon_manager__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_managers_polyline_manager__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_managers_kml_layer_manager__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_managers_data_layer_manager__ = __webpack_require__(824);









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

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmCircle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__ = __webpack_require__(819);


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

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmKmlLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_kml_layer_manager__ = __webpack_require__(823);


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

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmDataLayer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_data_layer_manager__ = __webpack_require__(824);


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

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmMarker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_marker_manager__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info_window__ = __webpack_require__(825);



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

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolygon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_polygon_manager__ = __webpack_require__(821);


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

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmPolyline; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_polyline_manager__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyline_point__ = __webpack_require__(826);



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

/***/ 835:
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

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives__ = __webpack_require__(840);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmMap", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmCircle", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmInfoWindow", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmKmlLayer", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmDataLayer", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmMarker", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolygon", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolyline", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AgmPolylinePoint", function() { return __WEBPACK_IMPORTED_MODULE_0__directives__["i"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(841);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_module__ = __webpack_require__(843);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AgmCoreModule", function() { return __WEBPACK_IMPORTED_MODULE_2__core_module__["a"]; });
// main modules


// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_map__ = __webpack_require__(828);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__directives_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_circle__ = __webpack_require__(829);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__directives_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_info_window__ = __webpack_require__(825);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__directives_info_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_kml_layer__ = __webpack_require__(830);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__directives_kml_layer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_data_layer__ = __webpack_require__(831);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__directives_data_layer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_marker__ = __webpack_require__(832);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__directives_marker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_polygon__ = __webpack_require__(833);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__directives_polygon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_polyline__ = __webpack_require__(834);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__directives_polyline__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_polyline_point__ = __webpack_require__(826);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__directives_polyline_point__["a"]; });









//# sourceMappingURL=directives.js.map

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_google_maps_api_wrapper__ = __webpack_require__(815);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__services_google_maps_api_wrapper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__ = __webpack_require__(819);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__services_managers_circle_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_managers_info_window_manager__ = __webpack_require__(820);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__services_managers_info_window_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_managers_marker_manager__ = __webpack_require__(818);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_3__services_managers_marker_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_managers_polygon_manager__ = __webpack_require__(821);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_4__services_managers_polygon_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_managers_polyline_manager__ = __webpack_require__(822);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_5__services_managers_polyline_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_managers_kml_layer_manager__ = __webpack_require__(823);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__services_managers_kml_layer_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_managers_data_layer_manager__ = __webpack_require__(824);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__services_managers_data_layer_manager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__(827);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__services_maps_api_loader_lazy_maps_api_loader__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_maps_api_loader_maps_api_loader__ = __webpack_require__(817);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__services_maps_api_loader_maps_api_loader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_noop_maps_api_loader__ = __webpack_require__(842);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_noop_maps_api_loader__["a"]; });











//# sourceMappingURL=services.js.map

/***/ }),

/***/ 842:
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

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export coreDirectives */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgmCoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_map__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_circle__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_info_window__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_marker__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_polygon__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__directives_polyline__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__directives_polyline_point__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_kml_layer__ = __webpack_require__(830);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_data_layer__ = __webpack_require__(831);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_maps_api_loader_lazy_maps_api_loader__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_maps_api_loader_maps_api_loader__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_browser_globals__ = __webpack_require__(835);














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

/***/ 868:
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
            template: __webpack_require__(869),
            styles: [__webpack_require__(870)]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], WidgetsComponent);
    return WidgetsComponent;
}());
exports.WidgetsComponent = WidgetsComponent;


/***/ }),

/***/ 869:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-heading\">Work Time Report</div>\r\n<!-- START row-->\r\n<div class=\"row\">\r\n\r\n    <div class=\"col-md-12\">\r\n        <div class=\"panel WhiteBG\" id=\"panelChart9\">\r\n          \r\n            <div class=\"panel-heading\">\r\n                <div class=\"panel-title\"> <h2>Your time trends </h2></div>\r\n                <p> Your stats are based on your email and calendarHow we calculate</p>\r\n            </div>\r\n            <div class=\"panel-wrapper\">\r\n                <div class=\"panel-body\">\r\n                    <div flot [dataset]=\"splineData\" [options]=\"splineOptions\" height=\"300\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>\r\n\r\n"

/***/ }),

/***/ 870:
/***/ (function(module, exports) {

module.exports = ""

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9Xb3JrVGltZXJlcG9ydC93aWRnZXRzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvY2lyY2xlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9pbmZvLXdpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYXBzLWFwaS1sb2FkZXIvbGF6eS1tYXBzLWFwaS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvY2lyY2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9rbWwtbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2RhdGEtbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL21hcmtlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWdvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWxpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS91dGlscy9icm93c2VyLWdsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9ub29wLW1hcHMtYXBpLWxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2NvcmUubW9kdWxlLmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvcm91dGVzL1dvcmtUaW1lcmVwb3J0L1dvcmtUaW1lcmVwb3J0L3dpZGdldHMuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvcm91dGVzL1dvcmtUaW1lcmVwb3J0L1dvcmtUaW1lcmVwb3J0L3dpZGdldHMuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9yb3V0ZXMvV29ya1RpbWVyZXBvcnQvV29ya1RpbWVyZXBvcnQvd2lkZ2V0cy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUF5QztBQUN6Qyx1Q0FBdUQ7QUFDdkQsc0NBQTBDO0FBRTFDLDhDQUEwRDtBQUMxRCxtREFBc0U7QUFFdEUsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtDQUM1QyxDQUFDO0FBZUY7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFiekIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLDRCQUFZO2dCQUNaLHFCQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDN0Isb0JBQWEsQ0FBQyxPQUFPLENBQUM7b0JBQ2xCLE1BQU0sRUFBRSx5Q0FBeUM7aUJBQ3BELENBQUM7YUFDTDtZQUNELFlBQVksRUFBRSxDQUFDLG9DQUFnQixDQUFDO1lBQ2hDLE9BQU8sRUFBRTtnQkFDTCxxQkFBWTthQUNmO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUE7QUFBakIsc0NBQWE7Ozs7Ozs7Ozs7Ozs7O0FDeEJHO0FBQ1I7QUFDRztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyw4QkFBOEIsRUFBRTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EscUNBQXFDLHVCQUF1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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9EQUFvRDtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULCtCQUErQiwwQ0FBMEMsRUFBRTtBQUMzRSxrQ0FBa0MsaUNBQWlDLEVBQUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsd0JBQXdCLEVBQUU7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QUM7Q0FBQTtBQTFGWSw0Q0FBZ0I7Ozs7Ozs7O0FDYjdCLGt3Qjs7Ozs7OztBQ0FBLG1CIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSBmcm9tICdAYWdtL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBXaWRnZXRzQ29tcG9uZW50IH0gZnJvbSAnLi9Xb3JrVGltZXJlcG9ydC93aWRnZXRzLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICAgIHsgcGF0aDogJycsIGNvbXBvbmVudDogV2lkZ2V0c0NvbXBvbmVudCB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKSxcclxuICAgICAgICBBZ21Db3JlTW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICAgICAgICBhcGlLZXk6ICdBSXphU3lCTnM0MlJ0X0N5eEFxZGJJQkswYTVVdDgzUWlhdUVTUEEnXHJcbiAgICAgICAgfSlcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtXaWRnZXRzQ29tcG9uZW50XSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGVcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFdpZGdldHNNb2R1bGUgeyB9XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJvdXRlci1sb2FkZXIvc3JjIS4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyLXRlbXBsYXRlLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvcm91dGVzL1dvcmtUaW1lcmVwb3J0L3dpZGdldHMubW9kdWxlLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuLyoqXG4gKiBXcmFwcGVyIGNsYXNzIHRoYXQgaGFuZGxlcyB0aGUgY29tbXVuaWNhdGlvbiB3aXRoIHRoZSBHb29nbGUgTWFwcyBKYXZhc2NyaXB0XG4gKiBBUEkgdjNcbiAqL1xudmFyIEdvb2dsZU1hcHNBUElXcmFwcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHb29nbGVNYXBzQVBJV3JhcHBlcihfbG9hZGVyLCBfem9uZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sb2FkZXIgPSBfbG9hZGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX21hcCA9XG4gICAgICAgICAgICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyBfdGhpcy5fbWFwUmVzb2x2ZXIgPSByZXNvbHZlOyB9KTtcbiAgICB9XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmNyZWF0ZU1hcCA9IGZ1bmN0aW9uIChlbCwgbWFwT3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWQoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsLCBtYXBPcHRpb25zKTtcbiAgICAgICAgICAgIF90aGlzLl9tYXBSZXNvbHZlcihtYXApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5zZXRNYXBPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG0pIHsgbS5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBnb29nbGUgbWFwIG1hcmtlciB3aXRoIHRoZSBtYXAgY29udGV4dFxuICAgICAqL1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbiAob3B0aW9ucywgYWRkVG9NYXApIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgaWYgKGFkZFRvTWFwID09PSB2b2lkIDApIHsgYWRkVG9NYXAgPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICBpZiAoYWRkVG9NYXApIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm1hcCA9IG1hcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVJbmZvV2luZG93ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBnb29nbGUubWFwLkNpcmNsZSBmb3IgdGhlIGN1cnJlbnQgbWFwLlxuICAgICAqL1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVDaXJjbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgb3B0aW9ucy5tYXAgPSBtYXA7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLkNpcmNsZShvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlUG9seWxpbmUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVNYXAoKS50aGVuKGZ1bmN0aW9uIChtYXApIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKG9wdGlvbnMpO1xuICAgICAgICAgICAgbGluZS5zZXRNYXAobWFwKTtcbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5jcmVhdGVQb2x5Z29uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlTWFwKCkudGhlbihmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgICAgICB2YXIgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5Qb2x5Z29uKG9wdGlvbnMpO1xuICAgICAgICAgICAgcG9seWdvbi5zZXRNYXAobWFwKTtcbiAgICAgICAgICAgIHJldHVybiBwb2x5Z29uO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgZ29vZ2xlLm1hcC5EYXRhIGxheWVyIGZvciB0aGUgY3VycmVudCBtYXBcbiAgICAgKi9cbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuY3JlYXRlRGF0YUxheWVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5ldyBnb29nbGUubWFwcy5EYXRhKG9wdGlvbnMpO1xuICAgICAgICAgICAgZGF0YS5zZXRNYXAobSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIGdpdmVuIGNvb3JkaW5hdGVzIGFyZSBpbnNpdGUgYSBQb2x5Z29uIHBhdGguXG4gICAgICovXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmNvbnRhaW5zTG9jYXRpb24gPSBmdW5jdGlvbiAobGF0TG5nLCBwb2x5Z29uKSB7XG4gICAgICAgIHJldHVybiBnb29nbGUubWFwcy5nZW9tZXRyeS5wb2x5LmNvbnRhaW5zTG9jYXRpb24obGF0TG5nLCBwb2x5Z29uKTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5zdWJzY3JpYmVUb01hcEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGFyZykgeyBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChhcmcpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24gKGxhdExuZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLnNldENlbnRlcihsYXRMbmcpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5nZXRab29tID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLmdldFpvb20oKTsgfSk7IH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5nZXRCb3VuZHMoKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuc2V0Wm9vbSA9IGZ1bmN0aW9uICh6b29tKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAuc2V0Wm9vbSh6b29tKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuZ2V0Q2VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLnRoZW4oZnVuY3Rpb24gKG1hcCkgeyByZXR1cm4gbWFwLmdldENlbnRlcigpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5wYW5UbyA9IGZ1bmN0aW9uIChsYXRMbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5wYW5UbyhsYXRMbmcpOyB9KTtcbiAgICB9O1xuICAgIEdvb2dsZU1hcHNBUElXcmFwcGVyLnByb3RvdHlwZS5wYW5CeSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAucGFuQnkoeCwgeSk7IH0pO1xuICAgIH07XG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLmZpdEJvdW5kcyA9IGZ1bmN0aW9uIChsYXRMbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIG1hcC5maXRCb3VuZHMobGF0TG5nKTsgfSk7XG4gICAgfTtcbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUucGFuVG9Cb3VuZHMgPSBmdW5jdGlvbiAobGF0TG5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBtYXAucGFuVG9Cb3VuZHMobGF0TG5nKTsgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuYXRpdmUgR29vZ2xlIE1hcHMgTWFwIGluc3RhbmNlLiBCZSBjYXJlZnVsIHdoZW4gdXNpbmcgdGhpcyBpbnN0YW5jZSBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBHb29nbGVNYXBzQVBJV3JhcHBlci5wcm90b3R5cGUuZ2V0TmF0aXZlTWFwID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwOyB9O1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIHRoZSBnaXZlbiBldmVudCBuYW1lIG9uIHRoZSBtYXAgaW5zdGFuY2UuXG4gICAgICovXG4gICAgR29vZ2xlTWFwc0FQSVdyYXBwZXIucHJvdG90eXBlLnRyaWdnZXJNYXBFdmVudCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcC50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKG0sIGV2ZW50TmFtZSk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEdvb2dsZU1hcHNBUElXcmFwcGVyO1xufSgpKTtcbmV4cG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH07XG5Hb29nbGVNYXBzQVBJV3JhcHBlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuR29vZ2xlTWFwc0FQSVdyYXBwZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBNYXBzQVBJTG9hZGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdvb2dsZS1tYXBzLWFwaS13cmFwcGVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlci5qc1xuLy8gbW9kdWxlIGlkID0gODE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xudmFyIE1hcHNBUElMb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hcHNBUElMb2FkZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBNYXBzQVBJTG9hZGVyO1xufSgpKTtcbmV4cG9ydCB7IE1hcHNBUElMb2FkZXIgfTtcbk1hcHNBUElMb2FkZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbk1hcHNBUElMb2FkZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMtYXBpLWxvYWRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL21hcHMtYXBpLWxvYWRlci5qc1xuLy8gbW9kdWxlIGlkID0gODE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgTWFya2VyTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFya2VyTWFuYWdlcihfbWFwc1dyYXBwZXIsIF96b25lKSB7XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyID0gX21hcHNXcmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX21hcmtlcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLmRlbGV0ZU1hcmtlciA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBtYXJrZXIgYWxyZWFkeSBkZWxldGVkXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbS5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21hcmtlcnMuZGVsZXRlKG1hcmtlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVNYXJrZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRQb3NpdGlvbih7IGxhdDogbWFya2VyLmxhdGl0dWRlLCBsbmc6IG1hcmtlci5sb25naXR1ZGUgfSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlVGl0bGUgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0VGl0bGUobWFya2VyLnRpdGxlKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVMYWJlbCA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyBtLnNldExhYmVsKG1hcmtlci5sYWJlbCk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlRHJhZ2dhYmxlID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldERyYWdnYWJsZShtYXJrZXIuZHJhZ2dhYmxlKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVJY29uID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2Vycy5nZXQobWFya2VyKS50aGVuKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLnNldEljb24obWFya2VyLmljb25VcmwpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZU9wYWNpdHkgPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0T3BhY2l0eShtYXJrZXIub3BhY2l0eSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlVmlzaWJsZSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRWaXNpYmxlKG1hcmtlci52aXNpYmxlKTsgfSk7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVaSW5kZXggPSBmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJzLmdldChtYXJrZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uc2V0WkluZGV4KG1hcmtlci56SW5kZXgpOyB9KTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZUNsaWNrYWJsZSA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkgeyByZXR1cm4gbS5zZXRDbGlja2FibGUobWFya2VyLmNsaWNrYWJsZSk7IH0pO1xuICAgIH07XG4gICAgTWFya2VyTWFuYWdlci5wcm90b3R5cGUuYWRkTWFya2VyID0gZnVuY3Rpb24gKG1hcmtlcikge1xuICAgICAgICB2YXIgbWFya2VyUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZU1hcmtlcih7XG4gICAgICAgICAgICBwb3NpdGlvbjogeyBsYXQ6IG1hcmtlci5sYXRpdHVkZSwgbG5nOiBtYXJrZXIubG9uZ2l0dWRlIH0sXG4gICAgICAgICAgICBsYWJlbDogbWFya2VyLmxhYmVsLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBtYXJrZXIuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgaWNvbjogbWFya2VyLmljb25VcmwsXG4gICAgICAgICAgICBvcGFjaXR5OiBtYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIHZpc2libGU6IG1hcmtlci52aXNpYmxlLFxuICAgICAgICAgICAgekluZGV4OiBtYXJrZXIuekluZGV4LFxuICAgICAgICAgICAgdGl0bGU6IG1hcmtlci50aXRsZSxcbiAgICAgICAgICAgIGNsaWNrYWJsZTogbWFya2VyLmNsaWNrYWJsZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFya2Vycy5zZXQobWFya2VyLCBtYXJrZXJQcm9taXNlKTtcbiAgICB9O1xuICAgIE1hcmtlck1hbmFnZXIucHJvdG90eXBlLmdldE5hdGl2ZU1hcmtlciA9IGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcik7XG4gICAgfTtcbiAgICBNYXJrZXJNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBtYXJrZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgX3RoaXMuX21hcmtlcnMuZ2V0KG1hcmtlcikudGhlbihmdW5jdGlvbiAobSkge1xuICAgICAgICAgICAgICAgIG0uYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBNYXJrZXJNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IE1hcmtlck1hbmFnZXIgfTtcbk1hcmtlck1hbmFnZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IEluamVjdGFibGUgfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbk1hcmtlck1hbmFnZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgfSxcbiAgICB7IHR5cGU6IE5nWm9uZSwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXJrZXItbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvbWFya2VyLW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbnZhciBDaXJjbGVNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDaXJjbGVNYW5hZ2VyKF9hcGlXcmFwcGVyLCBfem9uZSkge1xuICAgICAgICB0aGlzLl9hcGlXcmFwcGVyID0gX2FwaVdyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fY2lyY2xlcyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuYWRkQ2lyY2xlID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICB0aGlzLl9jaXJjbGVzLnNldChjaXJjbGUsIHRoaXMuX2FwaVdyYXBwZXIuY3JlYXRlQ2lyY2xlKHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IGNpcmNsZS5sYXRpdHVkZSwgbG5nOiBjaXJjbGUubG9uZ2l0dWRlIH0sXG4gICAgICAgICAgICBjbGlja2FibGU6IGNpcmNsZS5jbGlja2FibGUsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IGNpcmNsZS5kcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogY2lyY2xlLmVkaXRhYmxlLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBjaXJjbGUuZmlsbENvbG9yLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IGNpcmNsZS5maWxsT3BhY2l0eSxcbiAgICAgICAgICAgIHJhZGl1czogY2lyY2xlLnJhZGl1cyxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBjaXJjbGUuc3Ryb2tlQ29sb3IsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBjaXJjbGUuc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgICAgIHN0cm9rZVBvc2l0aW9uOiBjaXJjbGUuc3Ryb2tlUG9zaXRpb24sXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IGNpcmNsZS5zdHJva2VXZWlnaHQsXG4gICAgICAgICAgICB2aXNpYmxlOiBjaXJjbGUudmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogY2lyY2xlLnpJbmRleFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBjaXJjbGUgZnJvbSB0aGUgbWFwLlxuICAgICAqL1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUNpcmNsZSA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgYy5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICBfdGhpcy5fY2lyY2xlcy5kZWxldGUoY2lyY2xlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gKGNpcmNsZSwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLmdldEJvdW5kcygpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uIChjaXJjbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy5nZXRDZW50ZXIoKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5nZXRSYWRpdXMgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuZ2V0UmFkaXVzKCk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0Q2VudGVyID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldENlbnRlcih7IGxhdDogY2lyY2xlLmxhdGl0dWRlLCBsbmc6IGNpcmNsZS5sb25naXR1ZGUgfSk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0RWRpdGFibGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc2V0RWRpdGFibGUoY2lyY2xlLmVkaXRhYmxlKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5zZXREcmFnZ2FibGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc2V0RHJhZ2dhYmxlKGNpcmNsZS5kcmFnZ2FibGUpOyB9KTtcbiAgICB9O1xuICAgIENpcmNsZU1hbmFnZXIucHJvdG90eXBlLnNldFZpc2libGUgPSBmdW5jdGlvbiAoY2lyY2xlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGMuc2V0VmlzaWJsZShjaXJjbGUudmlzaWJsZSk7IH0pO1xuICAgIH07XG4gICAgQ2lyY2xlTWFuYWdlci5wcm90b3R5cGUuc2V0UmFkaXVzID0gZnVuY3Rpb24gKGNpcmNsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnNldFJhZGl1cyhjaXJjbGUucmFkaXVzKTsgfSk7XG4gICAgfTtcbiAgICBDaXJjbGVNYW5hZ2VyLnByb3RvdHlwZS5jcmVhdGVFdmVudE9ic2VydmFibGUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjaXJjbGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIF90aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVyLm5leHQoZSk7IH0pOyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2lyY2xlTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBDaXJjbGVNYW5hZ2VyIH07XG5DaXJjbGVNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5DaXJjbGVNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2lyY2xlLW1hbmFnZXIuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL3NlcnZpY2VzL21hbmFnZXJzL2NpcmNsZS1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4MTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi9tYXJrZXItbWFuYWdlcic7XG52YXIgSW5mb1dpbmRvd01hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluZm9XaW5kb3dNYW5hZ2VyKF9tYXBzV3JhcHBlciwgX3pvbmUsIF9tYXJrZXJNYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX21hcHNXcmFwcGVyID0gX21hcHNXcmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIgPSBfbWFya2VyTWFuYWdlcjtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd3MgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVJbmZvV2luZG93ID0gZnVuY3Rpb24gKGluZm9XaW5kb3cpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGlXaW5kb3cgPSB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdyk7XG4gICAgICAgIGlmIChpV2luZG93ID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGluZm8gd2luZG93IGFscmVhZHkgZGVsZXRlZFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpV2luZG93LnRoZW4oZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGkuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5faW5mb1dpbmRvd3MuZGVsZXRlKGluZm9XaW5kb3cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gKGluZm9XaW5kb3cpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnNldFBvc2l0aW9uKHtcbiAgICAgICAgICAgIGxhdDogaW5mb1dpbmRvdy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogaW5mb1dpbmRvdy5sb25naXR1ZGVcbiAgICAgICAgfSk7IH0pO1xuICAgIH07XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLnNldFpJbmRleCA9IGZ1bmN0aW9uIChpbmZvV2luZG93KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnNldFpJbmRleChpbmZvV2luZG93LnpJbmRleCk7IH0pO1xuICAgIH07XG4gICAgSW5mb1dpbmRvd01hbmFnZXIucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICAgIGlmIChpbmZvV2luZG93Lmhvc3RNYXJrZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fbWFya2VyTWFuYWdlci5nZXROYXRpdmVNYXJrZXIoaW5mb1dpbmRvdy5ob3N0TWFya2VyKS50aGVuKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIHcub3BlbihtYXAsIG1hcmtlcik7IH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKGZ1bmN0aW9uIChtYXApIHsgcmV0dXJuIHcub3BlbihtYXApOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoaW5mb1dpbmRvdykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHcuY2xvc2UoKTsgfSk7XG4gICAgfTtcbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChpbmZvV2luZG93LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbihmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIEluZm9XaW5kb3dNYW5hZ2VyLnByb3RvdHlwZS5hZGRJbmZvV2luZG93ID0gZnVuY3Rpb24gKGluZm9XaW5kb3cpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjb250ZW50OiBpbmZvV2luZG93LmNvbnRlbnQsXG4gICAgICAgICAgICBtYXhXaWR0aDogaW5mb1dpbmRvdy5tYXhXaWR0aCxcbiAgICAgICAgICAgIHpJbmRleDogaW5mb1dpbmRvdy56SW5kZXgsXG4gICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogaW5mb1dpbmRvdy5kaXNhYmxlQXV0b1BhblxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIGluZm9XaW5kb3cubGF0aXR1ZGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBpbmZvV2luZG93LmxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucG9zaXRpb24gPSB7IGxhdDogaW5mb1dpbmRvdy5sYXRpdHVkZSwgbG5nOiBpbmZvV2luZG93LmxvbmdpdHVkZSB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmZvV2luZG93UHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZUluZm9XaW5kb3cob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3dzLnNldChpbmZvV2luZG93LCBpbmZvV2luZG93UHJvbWlzZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBJbmZvV2luZG93IGFzIGFuIE9ic2VydmFibGVcbiAgICAgKi9cbiAgICBJbmZvV2luZG93TWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaW5mb1dpbmRvdykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICBpLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5mb1dpbmRvd01hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfTtcbkluZm9XaW5kb3dNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5JbmZvV2luZG93TWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuICAgIHsgdHlwZTogTWFya2VyTWFuYWdlciwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmZvLXdpbmRvdy1tYW5hZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4MjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgUG9seWdvbk1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvbHlnb25NYW5hZ2VyKF9tYXBzV3JhcHBlciwgX3pvbmUpIHtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fcG9seWdvbnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFBvbHlnb25NYW5hZ2VyLnByb3RvdHlwZS5hZGRQb2x5Z29uID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIHBvbHlnb25Qcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWdvbih7XG4gICAgICAgICAgICBjbGlja2FibGU6IHBhdGguY2xpY2thYmxlLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiBwYXRoLmRyYWdnYWJsZSxcbiAgICAgICAgICAgIGVkaXRhYmxlOiBwYXRoLmVkaXRhYmxlLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBwYXRoLmZpbGxDb2xvcixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiBwYXRoLmZpbGxPcGFjaXR5LFxuICAgICAgICAgICAgZ2VvZGVzaWM6IHBhdGguZ2VvZGVzaWMsXG4gICAgICAgICAgICBwYXRoczogcGF0aC5wYXRocyxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBwYXRoLnN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogcGF0aC5zdHJva2VPcGFjaXR5LFxuICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiBwYXRoLnN0cm9rZVdlaWdodCxcbiAgICAgICAgICAgIHZpc2libGU6IHBhdGgudmlzaWJsZSxcbiAgICAgICAgICAgIHpJbmRleDogcGF0aC56SW5kZXgsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb2x5Z29ucy5zZXQocGF0aCwgcG9seWdvblByb21pc2UpO1xuICAgIH07XG4gICAgUG9seWdvbk1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZVBvbHlnb24gPSBmdW5jdGlvbiAocG9seWdvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbSA9IHRoaXMuX3BvbHlnb25zLmdldChwb2x5Z29uKTtcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtLnRoZW4oZnVuY3Rpb24gKGwpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IGwuc2V0UGF0aHMocG9seWdvbi5wYXRocyk7IH0pOyB9KTtcbiAgICB9O1xuICAgIFBvbHlnb25NYW5hZ2VyLnByb3RvdHlwZS5zZXRQb2x5Z29uT3B0aW9ucyA9IGZ1bmN0aW9uIChwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aCkudGhlbihmdW5jdGlvbiAobCkgeyBsLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICAgIH07XG4gICAgUG9seWdvbk1hbmFnZXIucHJvdG90eXBlLmRlbGV0ZVBvbHlnb24gPSBmdW5jdGlvbiAocGF0aHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9wb2x5Z29ucy5nZXQocGF0aHMpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3BvbHlnb25zLmRlbGV0ZShwYXRocyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQb2x5Z29uTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgcGF0aCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgICAgICBsLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUG9seWdvbk1hbmFnZXI7XG59KCkpO1xuZXhwb3J0IHsgUG9seWdvbk1hbmFnZXIgfTtcblBvbHlnb25NYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5Qb2x5Z29uTWFuYWdlci5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuICAgIHsgdHlwZTogTmdab25lLCB9LFxuXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlnb24tbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4MjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG52YXIgUG9seWxpbmVNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb2x5bGluZU1hbmFnZXIoX21hcHNXcmFwcGVyLCBfem9uZSkge1xuICAgICAgICB0aGlzLl9tYXBzV3JhcHBlciA9IF9tYXBzV3JhcHBlcjtcbiAgICAgICAgdGhpcy5fem9uZSA9IF96b25lO1xuICAgICAgICB0aGlzLl9wb2x5bGluZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHZhciBwYXRoID0gbGluZS5fZ2V0UG9pbnRzKCkubWFwKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbGF0OiBwb2ludC5sYXRpdHVkZSwgbG5nOiBwb2ludC5sb25naXR1ZGUgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH07XG4gICAgUG9seWxpbmVNYW5hZ2VyLnByb3RvdHlwZS5hZGRQb2x5bGluZSA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHZhciBwYXRoID0gUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0UG9pbnRzKGxpbmUpO1xuICAgICAgICB2YXIgcG9seWxpbmVQcm9taXNlID0gdGhpcy5fbWFwc1dyYXBwZXIuY3JlYXRlUG9seWxpbmUoe1xuICAgICAgICAgICAgY2xpY2thYmxlOiBsaW5lLmNsaWNrYWJsZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogbGluZS5kcmFnZ2FibGUsXG4gICAgICAgICAgICBlZGl0YWJsZTogbGluZS5lZGl0YWJsZSxcbiAgICAgICAgICAgIGdlb2Rlc2ljOiBsaW5lLmdlb2Rlc2ljLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IGxpbmUuc3Ryb2tlQ29sb3IsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiBsaW5lLnN0cm9rZU9wYWNpdHksXG4gICAgICAgICAgICBzdHJva2VXZWlnaHQ6IGxpbmUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICAgICAgdmlzaWJsZTogbGluZS52aXNpYmxlLFxuICAgICAgICAgICAgekluZGV4OiBsaW5lLnpJbmRleCxcbiAgICAgICAgICAgIHBhdGg6IHBhdGhcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lcy5zZXQobGluZSwgcG9seWxpbmVQcm9taXNlKTtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUudXBkYXRlUG9seWxpbmVQb2ludHMgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGF0aCA9IFBvbHlsaW5lTWFuYWdlci5fY29udmVydFBvaW50cyhsaW5lKTtcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgICAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0udGhlbihmdW5jdGlvbiAobCkgeyByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHsgbC5zZXRQYXRoKHBhdGgpOyB9KTsgfSk7XG4gICAgfTtcbiAgICBQb2x5bGluZU1hbmFnZXIucHJvdG90eXBlLnNldFBvbHlsaW5lT3B0aW9ucyA9IGZ1bmN0aW9uIChsaW5lLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpLnRoZW4oZnVuY3Rpb24gKGwpIHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUuZGVsZXRlUG9seWxpbmUgPSBmdW5jdGlvbiAobGluZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbSA9IHRoaXMuX3BvbHlsaW5lcy5nZXQobGluZSk7XG4gICAgICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuX3pvbmUucnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fcG9seWxpbmVzLmRlbGV0ZShsaW5lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBvbHlsaW5lTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGluZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBfdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICAgICAgbC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKTsgfSk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFBvbHlsaW5lTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfTtcblBvbHlsaW5lTWFuYWdlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuUG9seWxpbmVNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9seWxpbmUtbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gODIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi8uLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG4vKipcbiAqIE1hbmFnZXMgYWxsIEtNTCBMYXllcnMgZm9yIGEgR29vZ2xlIE1hcCBpbnN0YW5jZS5cbiAqL1xudmFyIEttbExheWVyTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gS21sTGF5ZXJNYW5hZ2VyKF93cmFwcGVyLCBfem9uZSkge1xuICAgICAgICB0aGlzLl93cmFwcGVyID0gX3dyYXBwZXI7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBfem9uZTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbmV3IEtNTCBMYXllciB0byB0aGUgbWFwLlxuICAgICAqL1xuICAgIEttbExheWVyTWFuYWdlci5wcm90b3R5cGUuYWRkS21sTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIG5ld0xheWVyID0gdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLkttbExheWVyKHtcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IGxheWVyLmNsaWNrYWJsZSxcbiAgICAgICAgICAgICAgICBtYXA6IG0sXG4gICAgICAgICAgICAgICAgcHJlc2VydmVWaWV3cG9ydDogbGF5ZXIucHJlc2VydmVWaWV3cG9ydCxcbiAgICAgICAgICAgICAgICBzY3JlZW5PdmVybGF5czogbGF5ZXIuc2NyZWVuT3ZlcmxheXMsXG4gICAgICAgICAgICAgICAgc3VwcHJlc3NJbmZvV2luZG93czogbGF5ZXIuc3VwcHJlc3NJbmZvV2luZG93cyxcbiAgICAgICAgICAgICAgICB1cmw6IGxheWVyLnVybCxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IGxheWVyLnpJbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XG4gICAgfTtcbiAgICBLbWxMYXllck1hbmFnZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAobGF5ZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobCkgeyByZXR1cm4gbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgICB9O1xuICAgIEttbExheWVyTWFuYWdlci5wcm90b3R5cGUuZGVsZXRlS21sTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICBfdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIEdvb2dsZSBNYXBzIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gS21sTGF5ZXIgYXMgYW4gT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEttbExheWVyTWFuYWdlci5wcm90b3R5cGUuY3JlYXRlRXZlbnRPYnNlcnZhYmxlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgX3RoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICBtLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIF90aGlzLl96b25lLnJ1bihmdW5jdGlvbiAoKSB7IHJldHVybiBvYnNlcnZlci5uZXh0KGUpOyB9KTsgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gS21sTGF5ZXJNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IEttbExheWVyTWFuYWdlciB9O1xuS21sTGF5ZXJNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5LbWxMYXllck1hbmFnZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgfSxcbiAgICB7IHR5cGU6IE5nWm9uZSwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rbWwtbGF5ZXItbWFuYWdlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4vLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuLyoqXG4gKiBNYW5hZ2VzIGFsbCBEYXRhIExheWVycyBmb3IgYSBHb29nbGUgTWFwIGluc3RhbmNlLlxuICovXG52YXIgRGF0YUxheWVyTWFuYWdlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGF0YUxheWVyTWFuYWdlcihfd3JhcHBlciwgX3pvbmUpIHtcbiAgICAgICAgdGhpcy5fd3JhcHBlciA9IF93cmFwcGVyO1xuICAgICAgICB0aGlzLl96b25lID0gX3pvbmU7XG4gICAgICAgIHRoaXMuX2xheWVycyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBEYXRhIExheWVyIHRvIHRoZSBtYXAuXG4gICAgICovXG4gICAgRGF0YUxheWVyTWFuYWdlci5wcm90b3R5cGUuYWRkRGF0YUxheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlRGF0YUxheWVyKHtcbiAgICAgICAgICAgIHN0eWxlOiBsYXllci5zdHlsZVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGlmIChsYXllci5nZW9Kc29uKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0RGF0YUZlYXR1cmVzKGQsIGxheWVyLmdlb0pzb24pLnRoZW4oZnVuY3Rpb24gKGZlYXR1cmVzKSB7IHJldHVybiBkLmZlYXR1cmVzID0gZmVhdHVyZXM7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XG4gICAgfTtcbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5kZWxldGVEYXRhTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihmdW5jdGlvbiAobCkge1xuICAgICAgICAgICAgbC5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICBfdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0YUxheWVyTWFuYWdlci5wcm90b3R5cGUudXBkYXRlR2VvSnNvbiA9IGZ1bmN0aW9uIChsYXllciwgZ2VvSnNvbikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgICAgICBsLmZvckVhY2goZnVuY3Rpb24gKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICBsLnJlbW92ZShmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBsLmZlYXR1cmVzLmluZGV4T2YoZmVhdHVyZSwgMCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbC5mZWF0dXJlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3RoaXMuZ2V0RGF0YUZlYXR1cmVzKGwsIGdlb0pzb24pLnRoZW4oZnVuY3Rpb24gKGZlYXR1cmVzKSB7IHJldHVybiBsLmZlYXR1cmVzID0gZmVhdHVyZXM7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERhdGFMYXllck1hbmFnZXIucHJvdG90eXBlLnNldERhdGFPcHRpb25zID0gZnVuY3Rpb24gKGxheWVyLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xheWVycy5nZXQobGF5ZXIpLnRoZW4oZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgIGwuc2V0Q29udHJvbFBvc2l0aW9uKG9wdGlvbnMuY29udHJvbFBvc2l0aW9uKTtcbiAgICAgICAgICAgIGwuc2V0Q29udHJvbHMob3B0aW9ucy5jb250cm9scyk7XG4gICAgICAgICAgICBsLnNldERyYXdpbmdNb2RlKG9wdGlvbnMuZHJhd2luZ01vZGUpO1xuICAgICAgICAgICAgbC5zZXRTdHlsZShvcHRpb25zLnN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgR29vZ2xlIE1hcHMgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBEYXRhTGF5ZXIgYXMgYW4gT2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIERhdGFMYXllck1hbmFnZXIucHJvdG90eXBlLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxheWVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIF90aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgZC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5fem9uZS5ydW4oZnVuY3Rpb24gKCkgeyByZXR1cm4gb2JzZXJ2ZXIubmV4dChlKTsgfSk7IH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXh0cmFjdCBmZWF0dXJlcyBmcm9tIGEgZ2VvSnNvbiB1c2luZyBnb29nbGUubWFwcyBEYXRhIENsYXNzXG4gICAgICogQHBhcmFtIGQgOiBnb29nbGUubWFwcy5EYXRhIGNsYXNzIGluc3RhbmNlXG4gICAgICogQHBhcmFtIGdlb0pzb24gOiB1cmwgb3IgZ2VvanNvbiBvYmplY3RcbiAgICAgKi9cbiAgICBEYXRhTGF5ZXJNYW5hZ2VyLnByb3RvdHlwZS5nZXREYXRhRmVhdHVyZXMgPSBmdW5jdGlvbiAoZCwgZ2VvSnNvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBnZW9Kc29uID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IGQuYWRkR2VvSnNvbihnZW9Kc29uKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZ2VvSnNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkLmxvYWRHZW9Kc29uKGdlb0pzb24sIG51bGwsIHJlc29sdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiSW1wb3NzaWJsZSB0byBleHRyYWN0IGZlYXR1cmVzIGZyb20gZ2VvSnNvbjogd3JvbmcgYXJndW1lbnQgdHlwZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGF0YUxheWVyTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBEYXRhTGF5ZXJNYW5hZ2VyIH07XG5EYXRhTGF5ZXJNYW5hZ2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBJbmplY3RhYmxlIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5EYXRhTGF5ZXJNYW5hZ2VyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIH0sXG4gICAgeyB0eXBlOiBOZ1pvbmUsIH0sXG5dOyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YS1sYXllci1tYW5hZ2VyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9zZXJ2aWNlcy9tYW5hZ2Vycy9kYXRhLWxheWVyLW1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXInO1xudmFyIGluZm9XaW5kb3dJZCA9IDA7XG4vKipcbiAqIEFnbUluZm9XaW5kb3cgcmVuZGVycyBhIGluZm8gd2luZG93IGluc2lkZSBhIHtAbGluayBBZ21NYXJrZXJ9IG9yIHN0YW5kYWxvbmUuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tbWFya2VyIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFtsYWJlbF09XCInTSdcIj5cbiAqICAgICAgICA8YWdtLWluZm8td2luZG93IFtkaXNhYmxlQXV0b1Bhbl09XCJ0cnVlXCI+XG4gKiAgICAgICAgICBIaSwgdGhpcyBpcyB0aGUgY29udGVudCBvZiB0aGUgPHN0cm9uZz5pbmZvIHdpbmRvdzwvc3Ryb25nPlxuICogICAgICAgIDwvYWdtLWluZm8td2luZG93PlxuICogICAgICA8L2FnbS1tYXJrZXI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG52YXIgQWdtSW5mb1dpbmRvdyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtSW5mb1dpbmRvdyhfaW5mb1dpbmRvd01hbmFnZXIsIF9lbCkge1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlciA9IF9pbmZvV2luZG93TWFuYWdlcjtcbiAgICAgICAgdGhpcy5fZWwgPSBfZWw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBvcGVuIHN0YXRlIGZvciB0aGUgSW5mb1dpbmRvdy4gWW91IGNhbiBhbHNvIGNhbGwgdGhlIG9wZW4oKSBhbmQgY2xvc2UoKSBtZXRob2RzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIGluZm8gd2luZG93IGlzIGNsb3NlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5mb1dpbmRvd0Nsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSAoaW5mb1dpbmRvd0lkKyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZ20taW5mby13aW5kb3ctY29udGVudCcpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5hZGRJbmZvV2luZG93KHRoaXMpO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbmZvV2luZG93QWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGNoYW5nZXNbJ2xhdGl0dWRlJ10gfHwgY2hhbmdlc1snbG9uZ2l0dWRlJ10pICYmIHR5cGVvZiB0aGlzLmxhdGl0dWRlID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgdHlwZW9mIHRoaXMubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0UG9zaXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3pJbmRleCddKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5zZXRaSW5kZXgodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2lzT3BlbiddKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzKTtcbiAgICB9O1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLl9yZWdpc3RlckV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ2Nsb3NlY2xpY2snLCB0aGlzKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBfdGhpcy5pbmZvV2luZG93Q2xvc2UuZW1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLl91cGRhdGVPcGVuU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XG4gICAgfTtcbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5fc2V0SW5mb1dpbmRvd09wdGlvbnMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gQWdtSW5mb1dpbmRvdy5faW5mb1dpbmRvd09wdGlvbnNJbnB1dHMuaW5kZXhPZihrKSAhPT0gLTE7IH0pO1xuICAgICAgICBvcHRpb25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBpbmZvIHdpbmRvdy5cbiAgICAgKi9cbiAgICBBZ21JbmZvV2luZG93LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faW5mb1dpbmRvd01hbmFnZXIub3Blbih0aGlzKTsgfTtcbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIGluZm8gd2luZG93LlxuICAgICAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd01hbmFnZXIuY2xvc2UodGhpcykudGhlbihmdW5jdGlvbiAoKSB7IF90aGlzLmluZm9XaW5kb3dDbG9zZS5lbWl0KCk7IH0pO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faWQ7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ0FnbUluZm9XaW5kb3ctJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUluZm9XaW5kb3cucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5kZWxldGVJbmZvV2luZG93KHRoaXMpOyB9O1xuICAgIHJldHVybiBBZ21JbmZvV2luZG93O1xufSgpKTtcbmV4cG9ydCB7IEFnbUluZm9XaW5kb3cgfTtcbkFnbUluZm9XaW5kb3cuX2luZm9XaW5kb3dPcHRpb25zSW5wdXRzID0gWydkaXNhYmxlQXV0b1BhbicsICdtYXhXaWR0aCddO1xuQWdtSW5mb1dpbmRvdy5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYWdtLWluZm8td2luZG93JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8ZGl2IGNsYXNzPSdhZ20taW5mby13aW5kb3ctY29udGVudCc+XFxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxcbiAgICA8L2Rpdj5cXG4gIFwiXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbUluZm9XaW5kb3cuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBJbmZvV2luZG93TWFuYWdlciwgfSxcbiAgICB7IHR5cGU6IEVsZW1lbnRSZWYsIH0sXG5dOyB9O1xuQWdtSW5mb1dpbmRvdy5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbGF0aXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2xvbmdpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZGlzYWJsZUF1dG9QYW4nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWF4V2lkdGgnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2lzT3Blbic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnaW5mb1dpbmRvd0Nsb3NlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmZvLXdpbmRvdy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9pbmZvLXdpbmRvdy5qc1xuLy8gbW9kdWxlIGlkID0gODI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogQWdtUG9seWxpbmVQb2ludCByZXByZXNlbnRzIG9uZSBlbGVtZW50IG9mIGEgcG9seWxpbmUgd2l0aGluIGEgIHtAbGlua1xuICogU2VtYkdvb2dsZU1hcFBvbHlsaW5lfVxuICovXG52YXIgQWdtUG9seWxpbmVQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtUG9seWxpbmVQb2ludCgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgcG9zaXRpb24gb2YgdGhlIHBvaW50IGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB9XG4gICAgQWdtUG9seWxpbmVQb2ludC5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIGxhdDogY2hhbmdlc1snbGF0aXR1ZGUnXS5jdXJyZW50VmFsdWUsXG4gICAgICAgICAgICAgICAgbG5nOiBjaGFuZ2VzWydsb25naXR1ZGUnXS5jdXJyZW50VmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uQ2hhbmdlZC5lbWl0KHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEFnbVBvbHlsaW5lUG9pbnQ7XG59KCkpO1xuZXhwb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9O1xuQWdtUG9seWxpbmVQb2ludC5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbeyBzZWxlY3RvcjogJ2FnbS1wb2x5bGluZS1wb2ludCcgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Qb2x5bGluZVBvaW50LmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG5BZ21Qb2x5bGluZVBvaW50LnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwb3NpdGlvbkNoYW5nZWQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlsaW5lLXBvaW50LmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50LmpzXG4vLyBtb2R1bGUgaWQgPSA4MjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50UmVmLCBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi91dGlscy9icm93c2VyLWdsb2JhbHMnO1xuaW1wb3J0IHsgTWFwc0FQSUxvYWRlciB9IGZyb20gJy4vbWFwcy1hcGktbG9hZGVyJztcbmV4cG9ydCB2YXIgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sO1xuKGZ1bmN0aW9uIChHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wpIHtcbiAgICBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2xbR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW1wiSFRUUFwiXSA9IDFdID0gXCJIVFRQXCI7XG4gICAgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW0dvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtcIkhUVFBTXCJdID0gMl0gPSBcIkhUVFBTXCI7XG4gICAgR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sW0dvb2dsZU1hcHNTY3JpcHRQcm90b2NvbFtcIkFVVE9cIl0gPSAzXSA9IFwiQVVUT1wiO1xufSkoR29vZ2xlTWFwc1NjcmlwdFByb3RvY29sIHx8IChHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wgPSB7fSkpO1xuLyoqXG4gKiBUb2tlbiBmb3IgdGhlIGNvbmZpZyBvZiB0aGUgTGF6eU1hcHNBUElMb2FkZXIuIFBsZWFzZSBwcm92aWRlIGFuIG9iamVjdCBvZiB0eXBlIHtAbGlua1xuICogTGF6eU1hcHNBUElMb2FkZXJDb25maWd9LlxuICovXG5leHBvcnQgdmFyIExBWllfTUFQU19BUElfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuKCdhbmd1bGFyLWdvb2dsZS1tYXBzIExBWllfTUFQU19BUElfQ09ORklHJyk7XG52YXIgTGF6eU1hcHNBUElMb2FkZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMYXp5TWFwc0FQSUxvYWRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMYXp5TWFwc0FQSUxvYWRlcihjb25maWcsIHcsIGQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX2NvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgX3RoaXMuX3dpbmRvd1JlZiA9IHc7XG4gICAgICAgIF90aGlzLl9kb2N1bWVudFJlZiA9IGQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTGF6eU1hcHNBUElMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY3JpcHQgPSB0aGlzLl9kb2N1bWVudFJlZi5nZXROYXRpdmVEb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuICAgICAgICB2YXIgY2FsbGJhY2tOYW1lID0gXCJhbmd1bGFyMkdvb2dsZU1hcHNMYXp5TWFwc0FQSUxvYWRlclwiO1xuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5fZ2V0U2NyaXB0U3JjKGNhbGxiYWNrTmFtZSk7XG4gICAgICAgIHRoaXMuX3NjcmlwdExvYWRpbmdQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMuX3dpbmRvd1JlZi5nZXROYXRpdmVXaW5kb3coKVtjYWxsYmFja05hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0TmF0aXZlRG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JpcHRMb2FkaW5nUHJvbWlzZTtcbiAgICB9O1xuICAgIExhenlNYXBzQVBJTG9hZGVyLnByb3RvdHlwZS5fZ2V0U2NyaXB0U3JjID0gZnVuY3Rpb24gKGNhbGxiYWNrTmFtZSkge1xuICAgICAgICB2YXIgcHJvdG9jb2xUeXBlID0gKHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcucHJvdG9jb2wpIHx8IEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbC5IVFRQUztcbiAgICAgICAgdmFyIHByb3RvY29sO1xuICAgICAgICBzd2l0Y2ggKHByb3RvY29sVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuQVVUTzpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wuSFRUUDpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwOic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEdvb2dsZU1hcHNTY3JpcHRQcm90b2NvbC5IVFRQUzpcbiAgICAgICAgICAgICAgICBwcm90b2NvbCA9ICdodHRwczonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBob3N0QW5kUGF0aCA9IHRoaXMuX2NvbmZpZy5ob3N0QW5kUGF0aCB8fCAnbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcyc7XG4gICAgICAgIHZhciBxdWVyeVBhcmFtcyA9IHtcbiAgICAgICAgICAgIHY6IHRoaXMuX2NvbmZpZy5hcGlWZXJzaW9uIHx8ICczJyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja05hbWUsXG4gICAgICAgICAgICBrZXk6IHRoaXMuX2NvbmZpZy5hcGlLZXksXG4gICAgICAgICAgICBjbGllbnQ6IHRoaXMuX2NvbmZpZy5jbGllbnRJZCxcbiAgICAgICAgICAgIGNoYW5uZWw6IHRoaXMuX2NvbmZpZy5jaGFubmVsLFxuICAgICAgICAgICAgbGlicmFyaWVzOiB0aGlzLl9jb25maWcubGlicmFyaWVzLFxuICAgICAgICAgICAgcmVnaW9uOiB0aGlzLl9jb25maWcucmVnaW9uLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuX2NvbmZpZy5sYW5ndWFnZVxuICAgICAgICB9O1xuICAgICAgICB2YXIgcGFyYW1zID0gT2JqZWN0LmtleXMocXVlcnlQYXJhbXMpXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBxdWVyeVBhcmFtc1trXSAhPSBudWxsOyB9KVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGVtcHR5IGFycmF5c1xuICAgICAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSB8fFxuICAgICAgICAgICAgICAgIChBcnJheS5pc0FycmF5KHF1ZXJ5UGFyYW1zW2tdKSAmJiBxdWVyeVBhcmFtc1trXS5sZW5ndGggPiAwKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIC8vIGpvaW4gYXJyYXlzIGFzIGNvbW1hIHNlcGVyYXRlZCBzdHJpbmdzXG4gICAgICAgICAgICB2YXIgaSA9IHF1ZXJ5UGFyYW1zW2tdO1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBrZXk6IGssIHZhbHVlOiBpLmpvaW4oJywnKSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrLCB2YWx1ZTogcXVlcnlQYXJhbXNba10gfTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gZW50cnkua2V5ICsgXCI9XCIgKyBlbnRyeS52YWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcmJyk7XG4gICAgICAgIHJldHVybiBwcm90b2NvbCArIFwiLy9cIiArIGhvc3RBbmRQYXRoICsgXCI/XCIgKyBwYXJhbXM7XG4gICAgfTtcbiAgICByZXR1cm4gTGF6eU1hcHNBUElMb2FkZXI7XG59KE1hcHNBUElMb2FkZXIpKTtcbmV4cG9ydCB7IExhenlNYXBzQVBJTG9hZGVyIH07XG5MYXp5TWFwc0FQSUxvYWRlci5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogSW5qZWN0YWJsZSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuTGF6eU1hcHNBUElMb2FkZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiB1bmRlZmluZWQsIGRlY29yYXRvcnM6IFt7IHR5cGU6IEluamVjdCwgYXJnczogW0xBWllfTUFQU19BUElfQ09ORklHLF0gfSxdIH0sXG4gICAgeyB0eXBlOiBXaW5kb3dSZWYsIH0sXG4gICAgeyB0eXBlOiBEb2N1bWVudFJlZiwgfSxcbl07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXp5LW1hcHMtYXBpLWxvYWRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4Mjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBDaXJjbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvY2lyY2xlLW1hbmFnZXInO1xuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcbmltcG9ydCB7IE1hcmtlck1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG5pbXBvcnQgeyBQb2x5bGluZU1hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9wb2x5bGluZS1tYW5hZ2VyJztcbmltcG9ydCB7IEttbExheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMva21sLWxheWVyLW1hbmFnZXInO1xuaW1wb3J0IHsgRGF0YUxheWVyTWFuYWdlciB9IGZyb20gJy4vLi4vc2VydmljZXMvbWFuYWdlcnMvZGF0YS1sYXllci1tYW5hZ2VyJztcbi8qKlxuICogQWdtTWFwIHJlbmRlcnMgYSBHb29nbGUgTWFwLlxuICogKipJbXBvcnRhbnQgbm90ZSoqOiBUbyBiZSBhYmxlIHNlZSBhIG1hcCBpbiB0aGUgYnJvd3NlciwgeW91IGhhdmUgdG8gZGVmaW5lIGEgaGVpZ2h0IGZvciB0aGVcbiAqIGVsZW1lbnQgYGFnbS1tYXBgLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIGFnbS1tYXAge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbnZhciBBZ21NYXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbU1hcChfZWxlbSwgX21hcHNXcmFwcGVyKSB7XG4gICAgICAgIHRoaXMuX2VsZW0gPSBfZWxlbTtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIgPSBfbWFwc1dyYXBwZXI7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbG9uZ2l0dWRlIHRoYXQgZGVmaW5lcyB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGF0aXR1ZGUgdGhhdCBkZWZpbmVzIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gVGhlIGRlZmF1bHQgem9vbSBsZXZlbCBpcyA4LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56b29tID0gODtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgaWYgbWFwIGlzIGRyYWdnYWJsZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogRW5hYmxlcy9kaXNhYmxlcyB6b29tIGFuZCBjZW50ZXIgb24gZG91YmxlIGNsaWNrLiBFbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc2FibGVEb3VibGVDbGlja1pvb20gPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuYWJsZXMvZGlzYWJsZXMgYWxsIGRlZmF1bHQgVUkgb2YgdGhlIEdvb2dsZSBtYXAuIFBsZWFzZSBub3RlOiBXaGVuIHRoZSBtYXAgaXMgY3JlYXRlZCwgdGhpc1xuICAgICAgICAgKiB2YWx1ZSBjYW5ub3QgZ2V0IHVwZGF0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc2FibGVEZWZhdWx0VUkgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGZhbHNlLCBkaXNhYmxlcyBzY3JvbGx3aGVlbCB6b29taW5nIG9uIHRoZSBtYXAuIFRoZSBzY3JvbGx3aGVlbCBpcyBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNjcm9sbHdoZWVsID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGZhbHNlLCBwcmV2ZW50cyB0aGUgbWFwIGZyb20gYmVpbmcgY29udHJvbGxlZCBieSB0aGUga2V5Ym9hcmQuIEtleWJvYXJkIHNob3J0Y3V0cyBhcmVcbiAgICAgICAgICogZW5hYmxlZCBieSBkZWZhdWx0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5rZXlib2FyZFNob3J0Y3V0cyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgWm9vbSBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdHlsZXMgdG8gYXBwbHkgdG8gZWFjaCBvZiB0aGUgZGVmYXVsdCBtYXAgdHlwZXMuIE5vdGUgdGhhdCBmb3IgU2F0ZWxsaXRlL0h5YnJpZCBhbmQgVGVycmFpblxuICAgICAgICAgKiBtb2RlcywgdGhlc2Ugc3R5bGVzIHdpbGwgb25seSBhcHBseSB0byBsYWJlbHMgYW5kIGdlb21ldHJ5LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdHlsZXMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdHJ1ZSBhbmQgdGhlIGxhdGl0dWRlIGFuZC9vciBsb25naXR1ZGUgdmFsdWVzIGNoYW5nZXMsIHRoZSBHb29nbGUgTWFwcyBwYW5UbyBtZXRob2QgaXNcbiAgICAgICAgICogdXNlZCB0b1xuICAgICAgICAgKiBjZW50ZXIgdGhlIG1hcC4gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9tYXBzL2RvY3VtZW50YXRpb24vamF2YXNjcmlwdC9yZWZlcmVuY2UjTWFwXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnVzZVBhbm5pbmcgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFN0cmVldCBWaWV3IFBlZ21hbiBjb250cm9sLlxuICAgICAgICAgKiBUaGlzIGNvbnRyb2wgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBVSSwgYW5kIHNob3VsZCBiZSBzZXQgdG8gZmFsc2Ugd2hlbiBkaXNwbGF5aW5nIGEgbWFwIHR5cGVcbiAgICAgICAgICogb24gd2hpY2ggdGhlIFN0cmVldCBWaWV3IHJvYWQgb3ZlcmxheSBzaG91bGQgbm90IGFwcGVhciAoZS5nLiBhIG5vbi1FYXJ0aCBtYXAgdHlwZSkuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0cmVldFZpZXdDb250cm9sID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHZpZXdwb3J0IHRvIGNvbnRhaW4gdGhlIGdpdmVuIGJvdW5kcy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZml0Qm91bmRzID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFNjYWxlIGNvbnRyb2wuIFRoaXMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGVDb250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBNYXAgdHlwZSBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBUeXBlQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGluaXRpYWwgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZSBvZiB0aGUgUGFuIGNvbnRyb2wuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhbkNvbnRyb2wgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBpbml0aWFsIGVuYWJsZWQvZGlzYWJsZWQgc3RhdGUgb2YgdGhlIFJvdGF0ZSBjb250cm9sLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yb3RhdGVDb250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgaW5pdGlhbCBlbmFibGVkL2Rpc2FibGVkIHN0YXRlIG9mIHRoZSBGdWxsc2NyZWVuIGNvbnRyb2wuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZ1bGxzY3JlZW5Db250cm9sID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWFwIG1hcFR5cGVJZC4gRGVmYXVsdHMgdG8gJ3JvYWRtYXAnLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBUeXBlSWQgPSAncm9hZG1hcCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGVuIGZhbHNlLCBtYXAgaWNvbnMgYXJlIG5vdCBjbGlja2FibGUuIEEgbWFwIGljb24gcmVwcmVzZW50cyBhIHBvaW50IG9mIGludGVyZXN0LFxuICAgICAgICAgKiBhbHNvIGtub3duIGFzIGEgUE9JLiBCeSBkZWZhdWx0IG1hcCBpY29ucyBhcmUgY2xpY2thYmxlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbGlja2FibGVJY29ucyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIHNldHRpbmcgY29udHJvbHMgaG93IGdlc3R1cmVzIG9uIHRoZSBtYXAgYXJlIGhhbmRsZWQuXG4gICAgICAgICAqIEFsbG93ZWQgdmFsdWVzOlxuICAgICAgICAgKiAtICdjb29wZXJhdGl2ZScgKFR3by1maW5nZXIgdG91Y2ggZ2VzdHVyZXMgcGFuIGFuZCB6b29tIHRoZSBtYXAuIE9uZS1maW5nZXIgdG91Y2ggZ2VzdHVyZXMgYXJlIG5vdCBoYW5kbGVkIGJ5IHRoZSBtYXAuKVxuICAgICAgICAgKiAtICdncmVlZHknICAgICAgKEFsbCB0b3VjaCBnZXN0dXJlcyBwYW4gb3Igem9vbSB0aGUgbWFwLilcbiAgICAgICAgICogLSAnbm9uZScgICAgICAgIChUaGUgbWFwIGNhbm5vdCBiZSBwYW5uZWQgb3Igem9vbWVkIGJ5IHVzZXIgZ2VzdHVyZXMuKVxuICAgICAgICAgKiAtICdhdXRvJyAgICAgICAgW2RlZmF1bHRdIChHZXN0dXJlIGhhbmRsaW5nIGlzIGVpdGhlciBjb29wZXJhdGl2ZSBvciBncmVlZHksIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBwYWdlIGlzIHNjcm9sbGFibGUgb3Igbm90LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZXN0dXJlSGFuZGxpbmcgPSAnYXV0byc7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBtYXAgKGJ1dCBub3Qgd2hlbiB0aGV5IGNsaWNrIG9uIGFcbiAgICAgICAgICogbWFya2VyIG9yIGluZm9XaW5kb3cpLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXBDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgZW1pdHRlciBnZXRzIGVtaXR0ZWQgd2hlbiB0aGUgdXNlciByaWdodC1jbGlja3Mgb24gdGhlIG1hcCAoYnV0IG5vdCB3aGVuIHRoZXkgY2xpY2tcbiAgICAgICAgICogb24gYSBtYXJrZXIgb3IgaW5mb1dpbmRvdykuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1hcFJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgZG91YmxlLWNsaWNrcyBvbiB0aGUgbWFwIChidXQgbm90IHdoZW4gdGhleSBjbGlja1xuICAgICAgICAgKiBvbiBhIG1hcmtlciBvciBpbmZvV2luZG93KS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGNlbnRlciBjaGFuZ2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jZW50ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHZpZXdwb3J0IGJvdW5kcyBoYXZlIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJvdW5kc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgbWFwIGJlY29tZXMgaWRsZSBhZnRlciBwYW5uaW5nIG9yIHpvb21pbmcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlkbGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHpvb20gbGV2ZWwgaGFzIGNoYW5nZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnpvb21DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGdvb2dsZSBtYXAgaXMgZnVsbHkgaW5pdGlhbGl6ZWQuXG4gICAgICAgICAqIFlvdSBnZXQgdGhlIGdvb2dsZS5tYXBzLk1hcCBpbnN0YW5jZSBhcyBhIHJlc3VsdCBvZiB0aGlzIEV2ZW50RW1pdHRlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwUmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21NYXAucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyB0b2RvOiB0aGlzIHNob3VsZCBiZSBzb2x2ZWQgd2l0aCBhIG5ldyBjb21wb25lbnQgYW5kIGEgdmlld0NoaWxkIGRlY29yYXRvclxuICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZWxlbS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZ20tbWFwLWNvbnRhaW5lci1pbm5lcicpO1xuICAgICAgICB0aGlzLl9pbml0TWFwSW5zdGFuY2UoY29udGFpbmVyKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2luaXRNYXBJbnN0YW5jZSA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5jcmVhdGVNYXAoZWwsIHtcbiAgICAgICAgICAgIGNlbnRlcjogeyBsYXQ6IHRoaXMubGF0aXR1ZGUgfHwgMCwgbG5nOiB0aGlzLmxvbmdpdHVkZSB8fCAwIH0sXG4gICAgICAgICAgICB6b29tOiB0aGlzLnpvb20sXG4gICAgICAgICAgICBtaW5ab29tOiB0aGlzLm1pblpvb20sXG4gICAgICAgICAgICBtYXhab29tOiB0aGlzLm1heFpvb20sXG4gICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0aGlzLmRpc2FibGVEZWZhdWx0VUksXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0aGlzLmRpc2FibGVEb3VibGVDbGlja1pvb20sXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogdGhpcy5zY3JvbGx3aGVlbCxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHRoaXMuZHJhZ2dhYmxlLFxuICAgICAgICAgICAgZHJhZ2dhYmxlQ3Vyc29yOiB0aGlzLmRyYWdnYWJsZUN1cnNvcixcbiAgICAgICAgICAgIGRyYWdnaW5nQ3Vyc29yOiB0aGlzLmRyYWdnaW5nQ3Vyc29yLFxuICAgICAgICAgICAga2V5Ym9hcmRTaG9ydGN1dHM6IHRoaXMua2V5Ym9hcmRTaG9ydGN1dHMsXG4gICAgICAgICAgICBzdHlsZXM6IHRoaXMuc3R5bGVzLFxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHRoaXMuem9vbUNvbnRyb2wsXG4gICAgICAgICAgICB6b29tQ29udHJvbE9wdGlvbnM6IHRoaXMuem9vbUNvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2wsXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnM6IHRoaXMuc3RyZWV0Vmlld0NvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0aGlzLnNjYWxlQ29udHJvbCxcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbE9wdGlvbnM6IHRoaXMuc2NhbGVDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiB0aGlzLm1hcFR5cGVDb250cm9sLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB0aGlzLm1hcFR5cGVDb250cm9sT3B0aW9ucyxcbiAgICAgICAgICAgIHBhbkNvbnRyb2w6IHRoaXMucGFuQ29udHJvbCxcbiAgICAgICAgICAgIHBhbkNvbnRyb2xPcHRpb25zOiB0aGlzLnBhbkNvbnRyb2xPcHRpb25zLFxuICAgICAgICAgICAgcm90YXRlQ29udHJvbDogdGhpcy5yb3RhdGVDb250cm9sLFxuICAgICAgICAgICAgcm90YXRlQ29udHJvbE9wdGlvbnM6IHRoaXMucm90YXRlQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQ29udHJvbDogdGhpcy5mdWxsc2NyZWVuQ29udHJvbCxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sT3B0aW9uczogdGhpcy5mdWxsc2NyZWVuQ29udHJvbE9wdGlvbnMsXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IHRoaXMubWFwVHlwZUlkLFxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IHRoaXMuY2xpY2thYmxlSWNvbnMsXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6IHRoaXMuZ2VzdHVyZUhhbmRsaW5nXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCk7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobWFwKSB7IHJldHVybiBfdGhpcy5tYXBSZWFkeS5lbWl0KG1hcCk7IH0pO1xuICAgICAgICAvLyByZWdpc3RlciBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5faGFuZGxlTWFwQ2VudGVyQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU1hcFpvb21DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5faGFuZGxlTWFwTW91c2VFdmVudHMoKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQm91bmRzQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUlkbGVFdmVudCgpO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcC5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgIH07XG4gICAgLyogQGludGVybmFsICovXG4gICAgQWdtTWFwLnByb3RvdHlwZS5uZ09uQ2hhbmdlcyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihjaGFuZ2VzKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX3VwZGF0ZU1hcE9wdGlvbnNDaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMuaW5kZXhPZihrKSAhPT0gLTE7IH0pO1xuICAgICAgICBvcHRpb25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgb3B0aW9uc1trXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlOyB9KTtcbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuc2V0TWFwT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGEgcmVzaXplIGV2ZW50IG9uIHRoZSBnb29nbGUgbWFwIGluc3RhbmNlLlxuICAgICAqIFdoZW4gcmVjZW50ZXIgaXMgdHJ1ZSwgdGhlIG9mIHRoZSBnb29nbGUgbWFwIGdldHMgY2FsbGVkIHdpdGggdGhlIGN1cnJlbnQgbGF0L2xuZyB2YWx1ZXMgb3IgZml0Qm91bmRzIHZhbHVlIHRvIHJlY2VudGVyIHRoZSBtYXAuXG4gICAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdCBnZXRzIHJlc29sdmVkIGFmdGVyIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkLlxuICAgICAqL1xuICAgIEFnbU1hcC5wcm90b3R5cGUudHJpZ2dlclJlc2l6ZSA9IGZ1bmN0aW9uIChyZWNlbnRlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocmVjZW50ZXIgPT09IHZvaWQgMCkgeyByZWNlbnRlciA9IHRydWU7IH1cbiAgICAgICAgLy8gTm90ZTogV2hlbiB3ZSB3b3VsZCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQgYW5kIHNob3cgdGhlIG1hcCBpbiB0aGUgc2FtZSB0dXJuICh3aGljaCBpcyBhXG4gICAgICAgIC8vIGNvbW1vbiBjYXNlIGZvciB0cmlnZ2VyaW5nIGEgcmVzaXplIGV2ZW50KSwgdGhlbiB0aGUgcmVzaXplIGV2ZW50IHdvdWxkIG5vdFxuICAgICAgICAvLyB3b3JrICh0byBzaG93IHRoZSBtYXApLCBzbyB3ZSB0cmlnZ2VyIHRoZSBldmVudCBpbiBhIHRpbWVvdXQuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9tYXBzV3JhcHBlci50cmlnZ2VyTWFwRXZlbnQoJ3Jlc2l6ZScpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVjZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpdEJvdW5kcyAhPSBudWxsID8gX3RoaXMuX2ZpdEJvdW5kcygpIDogX3RoaXMuX3NldENlbnRlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX3VwZGF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2xhdGl0dWRlJ10gPT0gbnVsbCAmJiBjaGFuZ2VzWydsb25naXR1ZGUnXSA9PSBudWxsICYmXG4gICAgICAgICAgICBjaGFuZ2VzWydmaXRCb3VuZHMnXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBubyBwb3NpdGlvbiB1cGRhdGUgbmVlZGVkXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgcHJlZmVyIGZpdEJvdW5kcyBpbiBjaGFuZ2VzXG4gICAgICAgIGlmIChjaGFuZ2VzWydmaXRCb3VuZHMnXSAmJiB0aGlzLmZpdEJvdW5kcyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9maXRCb3VuZHMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLmxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRDZW50ZXIoKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX3NldENlbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld0NlbnRlciA9IHtcbiAgICAgICAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogdGhpcy5sb25naXR1ZGUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnVzZVBhbm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcHNXcmFwcGVyLnBhblRvKG5ld0NlbnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5zZXRDZW50ZXIobmV3Q2VudGVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWdtTWFwLnByb3RvdHlwZS5fZml0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51c2VQYW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBzV3JhcHBlci5wYW5Ub0JvdW5kcyh0aGlzLmZpdEJvdW5kcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwc1dyYXBwZXIuZml0Qm91bmRzKHRoaXMuZml0Qm91bmRzKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2hhbmRsZU1hcENlbnRlckNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHMgPSB0aGlzLl9tYXBzV3JhcHBlci5zdWJzY3JpYmVUb01hcEV2ZW50KCdjZW50ZXJfY2hhbmdlZCcpLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Q2VudGVyKCkudGhlbihmdW5jdGlvbiAoY2VudGVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMubGF0aXR1ZGUgPSBjZW50ZXIubGF0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMubG9uZ2l0dWRlID0gY2VudGVyLmxuZygpO1xuICAgICAgICAgICAgICAgIF90aGlzLmNlbnRlckNoYW5nZS5lbWl0KHsgbGF0OiBfdGhpcy5sYXRpdHVkZSwgbG5nOiBfdGhpcy5sb25naXR1ZGUgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVCb3VuZHNDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudCgnYm91bmRzX2NoYW5nZWQnKS5zdWJzY3JpYmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX21hcHNXcmFwcGVyLmdldEJvdW5kcygpLnRoZW4oZnVuY3Rpb24gKGJvdW5kcykgeyBfdGhpcy5ib3VuZHNDaGFuZ2UuZW1pdChib3VuZHMpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVNYXBab29tQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcyA9IHRoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoJ3pvb21fY2hhbmdlZCcpLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fbWFwc1dyYXBwZXIuZ2V0Wm9vbSgpLnRoZW4oZnVuY3Rpb24gKHopIHtcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tID0gejtcbiAgICAgICAgICAgICAgICBfdGhpcy56b29tQ2hhbmdlLmVtaXQoeik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2gocyk7XG4gICAgfTtcbiAgICBBZ21NYXAucHJvdG90eXBlLl9oYW5kbGVJZGxlRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBzID0gdGhpcy5fbWFwc1dyYXBwZXIuc3Vic2NyaWJlVG9NYXBFdmVudCgnaWRsZScpLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7IF90aGlzLmlkbGUuZW1pdCh2b2lkIDApOyB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICB9O1xuICAgIEFnbU1hcC5wcm90b3R5cGUuX2hhbmRsZU1hcE1vdXNlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZXZlbnRzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBlbWl0dGVyOiB0aGlzLm1hcENsaWNrIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyaWdodGNsaWNrJywgZW1pdHRlcjogdGhpcy5tYXBSaWdodENsaWNrIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmxjbGljaycsIGVtaXR0ZXI6IHRoaXMubWFwRGJsQ2xpY2sgfSxcbiAgICAgICAgXTtcbiAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBzID0gX3RoaXMuX21hcHNXcmFwcGVyLnN1YnNjcmliZVRvTWFwRXZlbnQoZS5uYW1lKS5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0geyBjb29yZHM6IHsgbGF0OiBldmVudC5sYXRMbmcubGF0KCksIGxuZzogZXZlbnQubGF0TG5nLmxuZygpIH0gfTtcbiAgICAgICAgICAgICAgICBlLmVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF90aGlzLl9vYnNlcnZhYmxlU3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21NYXA7XG59KCkpO1xuZXhwb3J0IHsgQWdtTWFwIH07XG4vKipcbiAqIE1hcCBvcHRpb24gYXR0cmlidXRlcyB0aGF0IGNhbiBjaGFuZ2Ugb3ZlciB0aW1lXG4gKi9cbkFnbU1hcC5fbWFwT3B0aW9uc0F0dHJpYnV0ZXMgPSBbXG4gICAgJ2Rpc2FibGVEb3VibGVDbGlja1pvb20nLCAnc2Nyb2xsd2hlZWwnLCAnZHJhZ2dhYmxlJywgJ2RyYWdnYWJsZUN1cnNvcicsICdkcmFnZ2luZ0N1cnNvcicsXG4gICAgJ2tleWJvYXJkU2hvcnRjdXRzJywgJ3pvb21Db250cm9sJywgJ3pvb21Db250cm9sT3B0aW9ucycsICdzdHlsZXMnLCAnc3RyZWV0Vmlld0NvbnRyb2wnLFxuICAgICdzdHJlZXRWaWV3Q29udHJvbE9wdGlvbnMnLCAnem9vbScsICdtYXBUeXBlQ29udHJvbCcsICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnLCAnbWluWm9vbScsXG4gICAgJ21heFpvb20nLCAncGFuQ29udHJvbCcsICdwYW5Db250cm9sT3B0aW9ucycsICdyb3RhdGVDb250cm9sJywgJ3JvdGF0ZUNvbnRyb2xPcHRpb25zJyxcbiAgICAnZnVsbHNjcmVlbkNvbnRyb2wnLCAnZnVsbHNjcmVlbkNvbnRyb2xPcHRpb25zJywgJ3NjYWxlQ29udHJvbCcsICdzY2FsZUNvbnRyb2xPcHRpb25zJyxcbiAgICAnbWFwVHlwZUlkJywgJ2NsaWNrYWJsZUljb25zJywgJ2dlc3R1cmVIYW5kbGluZydcbl07XG5BZ21NYXAuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1tYXAnLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgICAgICBHb29nbGVNYXBzQVBJV3JhcHBlciwgTWFya2VyTWFuYWdlciwgSW5mb1dpbmRvd01hbmFnZXIsIENpcmNsZU1hbmFnZXIsIFBvbHlsaW5lTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgUG9seWdvbk1hbmFnZXIsIEttbExheWVyTWFuYWdlciwgRGF0YUxheWVyTWFuYWdlclxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgaG9zdDoge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBkZXByZWNhdGVkIC0gd2Ugd2lsbCByZW1vdmUgaXQgd2l0aCB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICdbY2xhc3Muc2VibS1nb29nbGUtbWFwLWNvbnRhaW5lcl0nOiAndHJ1ZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0eWxlczogW1wiXFxuICAgIC5hZ20tbWFwLWNvbnRhaW5lci1pbm5lciB7XFxuICAgICAgd2lkdGg6IGluaGVyaXQ7XFxuICAgICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICB9XFxuICAgIC5hZ20tbWFwLWNvbnRlbnQge1xcbiAgICAgIGRpc3BsYXk6bm9uZTtcXG4gICAgfVxcbiAgXCJdLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcIlxcbiAgICA8ZGl2IGNsYXNzPSdhZ20tbWFwLWNvbnRhaW5lci1pbm5lciBzZWJtLWdvb2dsZS1tYXAtY29udGFpbmVyLWlubmVyJz48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz0nYWdtLW1hcC1jb250ZW50Jz5cXG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XFxuICAgIDwvZGl2PlxcbiAgXCJcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtTWFwLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogRWxlbWVudFJlZiwgfSxcbiAgICB7IHR5cGU6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCB9LFxuXTsgfTtcbkFnbU1hcC5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbG9uZ2l0dWRlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsYXRpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnem9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWluWm9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWF4Wm9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dhYmxlJzogW3sgdHlwZTogSW5wdXQsIGFyZ3M6IFsnbWFwRHJhZ2dhYmxlJyxdIH0sXSxcbiAgICAnZGlzYWJsZURvdWJsZUNsaWNrWm9vbSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZGlzYWJsZURlZmF1bHRVSSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc2Nyb2xsd2hlZWwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2JhY2tncm91bmRDb2xvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZHJhZ2dhYmxlQ3Vyc29yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2luZ0N1cnNvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAna2V5Ym9hcmRTaG9ydGN1dHMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pvb21Db250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd6b29tQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0eWxlcyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndXNlUGFubmluZyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3RyZWV0Vmlld0NvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cmVldFZpZXdDb250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZml0Qm91bmRzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzY2FsZUNvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3NjYWxlQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ21hcFR5cGVDb250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdtYXBUeXBlQ29udHJvbE9wdGlvbnMnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3BhbkNvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3BhbkNvbnRyb2xPcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdyb3RhdGVDb250cm9sJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdyb3RhdGVDb250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZnVsbHNjcmVlbkNvbnRyb2wnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2Z1bGxzY3JlZW5Db250cm9sT3B0aW9ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbWFwVHlwZUlkJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdjbGlja2FibGVJY29ucyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZ2VzdHVyZUhhbmRsaW5nJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdtYXBDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21hcFJpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtYXBEYmxDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2NlbnRlckNoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2JvdW5kc0NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2lkbGUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICd6b29tQ2hhbmdlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbWFwUmVhZHknOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDgyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaXJjbGVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvY2lyY2xlLW1hbmFnZXInO1xudmFyIEFnbUNpcmNsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtQ2lyY2xlKF9tYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSBfbWFuYWdlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgQ2lyY2xlIGhhbmRsZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jbGlja2FibGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBkcmFnIHRoaXMgY2lyY2xlIG92ZXIgdGhlIG1hcC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICAgICAqL1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzZXQgdG8gdHJ1ZSwgdGhlIHVzZXIgY2FuIGVkaXQgdGhpcyBjaXJjbGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0XG4gICAgICAgICAqIHRoZSBjZW50ZXIgYW5kIGFyb3VuZCB0aGUgY2lyY3VtZmVyZW5jZSBvZiB0aGUgY2lyY2xlLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSByYWRpdXMgaW4gbWV0ZXJzIG9uIHRoZSBFYXJ0aCdzIHN1cmZhY2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc3Ryb2tlIHBvc2l0aW9uLiBEZWZhdWx0cyB0byBDRU5URVIuXG4gICAgICAgICAqIFRoaXMgcHJvcGVydHkgaXMgbm90IHN1cHBvcnRlZCBvbiBJbnRlcm5ldCBFeHBsb3JlciA4IGFuZCBlYXJsaWVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdHJva2VQb3NpdGlvbiA9ICdDRU5URVInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHN0cm9rZSB3aWR0aCBpbiBwaXhlbHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0cm9rZVdlaWdodCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoaXMgY2lyY2xlIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSdzIGNlbnRlciBpcyBjaGFuZ2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jZW50ZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGVtaXR0ZXIgZ2V0cyBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNpcmNsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgY2lyY2xlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jaXJjbGVEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgcmVwZWF0ZWRseSBmaXJlZCB3aGlsZSB0aGUgdXNlciBkcmFncyB0aGUgY2lyY2xlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kcmFnID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWdFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RhcnRzIGRyYWdnaW5nIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlZG93biBldmVudCBpcyBmaXJlZCBvbiB0aGUgY2lyY2xlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIGNpcmNsZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW91c2VNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBjaXJjbGUgbW91c2VvdXQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlT3V0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCBvbiBjaXJjbGUgbW91c2VvdmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZXVwIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBjaXJjbGUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSdzIHJhZGl1cyBpcyBjaGFuZ2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yYWRpdXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIGNpcmNsZSBpcyByaWdodC1jbGlja2VkIG9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yaWdodENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLl9jaXJjbGVBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUNpcmNsZS5wcm90b3R5cGUubmdPbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuYWRkQ2lyY2xlKHRoaXMpO1xuICAgICAgICB0aGlzLl9jaXJjbGVBZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21DaXJjbGUucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jaXJjbGVBZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLnNldENlbnRlcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snZWRpdGFibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRFZGl0YWJsZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snZHJhZ2dhYmxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0RHJhZ2dhYmxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0VmlzaWJsZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1sncmFkaXVzJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0UmFkaXVzKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNpcmNsZU9wdGlvbnNDaGFuZ2VzKGNoYW5nZXMpO1xuICAgIH07XG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5fdXBkYXRlQ2lyY2xlT3B0aW9uc0NoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICB2YXIgb3B0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gQWdtQ2lyY2xlLl9tYXBPcHRpb25zLmluZGV4T2YoaykgIT09IC0xOyB9KTtcbiAgICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IG9wdGlvbnNba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTsgfSk7XG4gICAgICAgIGlmIChvcHRpb25LZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX21hbmFnZXIuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5fcmVnaXN0ZXJFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgZXZlbnRzLnNldCgnY2VudGVyX2NoYW5nZWQnLCB0aGlzLmNlbnRlckNoYW5nZSk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ2NsaWNrJywgdGhpcy5jaXJjbGVDbGljayk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ2RibGNsaWNrJywgdGhpcy5jaXJjbGVEYmxDbGljayk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ2RyYWcnLCB0aGlzLmRyYWcpO1xuICAgICAgICBldmVudHMuc2V0KCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kKTtcbiAgICAgICAgZXZlbnRzLnNldCgnZHJhZ1N0YXJ0JywgdGhpcy5kcmFnU3RhcnQpO1xuICAgICAgICBldmVudHMuc2V0KCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgICAgIGV2ZW50cy5zZXQoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcbiAgICAgICAgZXZlbnRzLnNldCgnbW91c2VvdXQnLCB0aGlzLm1vdXNlT3V0KTtcbiAgICAgICAgZXZlbnRzLnNldCgnbW91c2VvdmVyJywgdGhpcy5tb3VzZU92ZXIpO1xuICAgICAgICBldmVudHMuc2V0KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgICAgICAgZXZlbnRzLnNldCgncmFkaXVzX2NoYW5nZWQnLCB0aGlzLnJhZGl1c0NoYW5nZSk7XG4gICAgICAgIGV2ZW50cy5zZXQoJ3JpZ2h0Y2xpY2snLCB0aGlzLnJpZ2h0Q2xpY2spO1xuICAgICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRFbWl0dGVyLCBldmVudE5hbWUpIHtcbiAgICAgICAgICAgIF90aGlzLl9ldmVudFN1YnNjcmlwdGlvbnMucHVzaChfdGhpcy5fbWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoZXZlbnROYW1lLCBfdGhpcykuc3Vic2NyaWJlKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGl1c19jaGFuZ2VkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9tYW5hZ2VyLmdldFJhZGl1cyhfdGhpcykudGhlbihmdW5jdGlvbiAocmFkaXVzKSB7IHJldHVybiBldmVudEVtaXR0ZXIuZW1pdChyYWRpdXMpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXJfY2hhbmdlZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fbWFuYWdlci5nZXRDZW50ZXIoX3RoaXMpLnRoZW4oZnVuY3Rpb24gKGNlbnRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudEVtaXR0ZXIuZW1pdCh7IGxhdDogY2VudGVyLmxhdCgpLCBsbmc6IGNlbnRlci5sbmcoKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudEVtaXR0ZXIuZW1pdCh7IGNvb3JkczogeyBsYXQ6IHZhbHVlLmxhdExuZy5sYXQoKSwgbG5nOiB2YWx1ZS5sYXRMbmcubG5nKCkgfSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUNpcmNsZS5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50U3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIHRoaXMuX21hbmFnZXIucmVtb3ZlQ2lyY2xlKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgTGF0TG5nQm91bmRzIG9mIHRoaXMgQ2lyY2xlLlxuICAgICAqL1xuICAgIEFnbUNpcmNsZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFuYWdlci5nZXRCb3VuZHModGhpcyk7IH07XG4gICAgQWdtQ2lyY2xlLnByb3RvdHlwZS5nZXRDZW50ZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYW5hZ2VyLmdldENlbnRlcih0aGlzKTsgfTtcbiAgICByZXR1cm4gQWdtQ2lyY2xlO1xufSgpKTtcbmV4cG9ydCB7IEFnbUNpcmNsZSB9O1xuQWdtQ2lyY2xlLl9tYXBPcHRpb25zID0gW1xuICAgICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnc3Ryb2tlQ29sb3InLCAnc3Ryb2tlT3BhY2l0eScsICdzdHJva2VQb3NpdGlvbicsICdzdHJva2VXZWlnaHQnLFxuICAgICd2aXNpYmxlJywgJ3pJbmRleCcsICdjbGlja2FibGUnXG5dO1xuQWdtQ2lyY2xlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20tY2lyY2xlJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21DaXJjbGUuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBDaXJjbGVNYW5hZ2VyLCB9LFxuXTsgfTtcbkFnbUNpcmNsZS5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbGF0aXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2xvbmdpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnY2xpY2thYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydjaXJjbGVEcmFnZ2FibGUnLF0gfSxdLFxuICAgICdlZGl0YWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZmlsbENvbG9yJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdmaWxsT3BhY2l0eSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAncmFkaXVzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHJva2VDb2xvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlT3BhY2l0eSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlUG9zaXRpb24nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZVdlaWdodCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndmlzaWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnekluZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdjZW50ZXJDaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdjaXJjbGVDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2NpcmNsZURibENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnZHJhZyc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2RyYWdFbmQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdkcmFnU3RhcnQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtb3VzZURvd24nOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtb3VzZU1vdmUnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtb3VzZU91dCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ21vdXNlVXAnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdyYWRpdXNDaGFuZ2UnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdyaWdodENsaWNrJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jaXJjbGUuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvY2lyY2xlLmpzXG4vLyBtb2R1bGUgaWQgPSA4Mjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS21sTGF5ZXJNYW5hZ2VyIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9tYW5hZ2Vycy9rbWwtbGF5ZXItbWFuYWdlcic7XG52YXIgbGF5ZXJJZCA9IDA7XG52YXIgQWdtS21sTGF5ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFnbUttbExheWVyKF9tYW5hZ2VyKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSBfbWFuYWdlcjtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSAobGF5ZXJJZCsrKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0cnVlLCB0aGUgbGF5ZXIgcmVjZWl2ZXMgbW91c2UgZXZlbnRzLiBEZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNsaWNrYWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCeSBkZWZhdWx0LCB0aGUgaW5wdXQgbWFwIGlzIGNlbnRlcmVkIGFuZCB6b29tZWQgdG8gdGhlIGJvdW5kaW5nIGJveCBvZiB0aGUgY29udGVudHMgb2YgdGhlXG4gICAgICAgICAqIGxheWVyLlxuICAgICAgICAgKiBJZiB0aGlzIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZSwgdGhlIHZpZXdwb3J0IGlzIGxlZnQgdW5jaGFuZ2VkLCB1bmxlc3MgdGhlIG1hcCdzIGNlbnRlciBhbmQgem9vbVxuICAgICAgICAgKiB3ZXJlIG5ldmVyIHNldC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucHJlc2VydmVWaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byByZW5kZXIgdGhlIHNjcmVlbiBvdmVybGF5cy4gRGVmYXVsdCB0cnVlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY3JlZW5PdmVybGF5cyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdXBwcmVzcyB0aGUgcmVuZGVyaW5nIG9mIGluZm8gd2luZG93cyB3aGVuIGxheWVyIGZlYXR1cmVzIGFyZSBjbGlja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdXBwcmVzc0luZm9XaW5kb3dzID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgVVJMIG9mIHRoZSBLTUwgZG9jdW1lbnQgdG8gZGlzcGxheS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudXJsID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB6LWluZGV4IG9mIHRoZSBsYXllci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuekluZGV4ID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGZlYXR1cmUgaW4gdGhlIGxheWVyIGlzIGNsaWNrZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIEtNTCBsYXllcnMgZGVmYXVsdCB2aWV3cG9ydCBoYXMgY2hhbmdlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGVmYXVsdFZpZXdwb3J0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBLTUwgbGF5ZXIgaGFzIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAqIEF0IHRoaXMgcG9pbnQgaXQgaXMgc2FmZSB0byByZWFkIHRoZSBzdGF0dXMgcHJvcGVydHkgdG8gZGV0ZXJtaW5lIGlmIHRoZSBsYXllciBsb2FkZWRcbiAgICAgICAgICogc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGF0dXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS5uZ09uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFuYWdlci5hZGRLbWxMYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpO1xuICAgIH07XG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLl91cGRhdGVQb2x5Z29uT3B0aW9ucyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmtleXMoY2hhbmdlcylcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbUttbExheWVyLl9rbWxMYXllck9wdGlvbnMuaW5kZXhPZihrKSAhPT0gLTE7IH0pXG4gICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChvYmosIGspIHtcbiAgICAgICAgICAgIG9ialtrXSA9IGNoYW5nZXNba10uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBZ21LbWxMYXllci5wcm90b3R5cGUuX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxheWVyQ2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RlZmF1bHR2aWV3cG9ydF9jaGFuZ2VkJywgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3RoaXMuZGVmYXVsdFZpZXdwb3J0Q2hhbmdlLmVtaXQoKTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnc3RhdHVzX2NoYW5nZWQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zdGF0dXNDaGFuZ2UuZW1pdCgpOyB9IH0sXG4gICAgICAgIF07XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBvcyA9IF90aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgX3RoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtS21sTGF5ZXIucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faWQ7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbUttbExheWVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFwiQWdtS21sTGF5ZXItXCIgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21LbWxMYXllci5wcm90b3R5cGUubmdPbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuZGVsZXRlS21sTGF5ZXIodGhpcyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtS21sTGF5ZXI7XG59KCkpO1xuZXhwb3J0IHsgQWdtS21sTGF5ZXIgfTtcbkFnbUttbExheWVyLl9rbWxMYXllck9wdGlvbnMgPSBbJ2NsaWNrYWJsZScsICdwcmVzZXJ2ZVZpZXdwb3J0JywgJ3NjcmVlbk92ZXJsYXlzJywgJ3N1cHByZXNzSW5mb1dpbmRvd3MnLCAndXJsJywgJ3pJbmRleCddO1xuQWdtS21sTGF5ZXIuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1rbWwtbGF5ZXInXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbkFnbUttbExheWVyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogS21sTGF5ZXJNYW5hZ2VyLCB9LFxuXTsgfTtcbkFnbUttbExheWVyLnByb3BEZWNvcmF0b3JzID0ge1xuICAgICdjbGlja2FibGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3ByZXNlcnZlVmlld3BvcnQnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3NjcmVlbk92ZXJsYXlzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdXBwcmVzc0luZm9XaW5kb3dzJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd1cmwnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3pJbmRleCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnbGF5ZXJDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2RlZmF1bHRWaWV3cG9ydENoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3N0YXR1c0NoYW5nZSc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a21sLWxheWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2ttbC1sYXllci5qc1xuLy8gbW9kdWxlIGlkID0gODMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFMYXllck1hbmFnZXIgfSBmcm9tICcuLy4uL3NlcnZpY2VzL21hbmFnZXJzL2RhdGEtbGF5ZXItbWFuYWdlcic7XG52YXIgbGF5ZXJJZCA9IDA7XG4vKipcbiAqIEFnbURhdGFMYXllciBlbmFibGVzIHRoZSB1c2VyIHRvIGFkZCBkYXRhIGxheWVycyB0byB0aGUgbWFwLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbiAqIGltcG9ydCB7IEFnbU1hcCwgQWdtRGF0YUxheWVyIH0gZnJvbVxuICogJ2FuZ3VsYXItZ29vZ2xlLW1hcHMvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBkaXJlY3RpdmVzOiBbQWdtTWFwLCBBZ21EYXRhTGF5ZXJdLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiBcdCAgPGFnbS1kYXRhLWxheWVyIFtnZW9Kc29uXT1cImdlb0pzb25PYmplY3RcIiAobGF5ZXJDbGljayk9XCJjbGlja2VkKCRldmVudClcIiBbc3R5bGVdPVwic3R5bGVGdW5jXCI+XG4gKiBcdCAgPC9hZ20tZGF0YS1sYXllcj5cbiAqIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIE15TWFwQ21wIHtcbiAqICAgbGF0OiBudW1iZXIgPSAtMjUuMjc0NDQ5O1xuICogICBsbmc6IG51bWJlciA9IDEzMy43NzUwNjA7XG4gKiAgIHpvb206IG51bWJlciA9IDU7XG4gKlxuICogY2xpY2tlZChjbGlja0V2ZW50KSB7XG4gKiAgICBjb25zb2xlLmxvZyhjbGlja0V2ZW50KTtcbiAqICB9XG4gKlxuICogIHN0eWxlRnVuYyhmZWF0dXJlKSB7XG4gKiAgICByZXR1cm4gKHtcbiAqICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAqICAgICAgZmlsbENvbG9yOiBmZWF0dXJlLmdldFByb3BlcnR5KCdjb2xvcicpLFxuICogICAgICBzdHJva2VXZWlnaHQ6IDFcbiAqICAgIH0pO1xuICogIH1cbiAqXG4gKiAgZ2VvSnNvbk9iamVjdDogT2JqZWN0ID0ge1xuICogICAgXCJ0eXBlXCI6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAqICAgIFwiZmVhdHVyZXNcIjogW1xuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIkdcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJibHVlXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI3XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiNzFcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMjMuNjEsIC0yMi4xNF0sIFsxMjIuMzgsIC0yMS43M10sIFsxMjEuMDYsIC0yMS42OV0sIFsxMTkuNjYsIC0yMi4yMl0sIFsxMTkuMDAsIC0yMy40MF0sXG4gKiAgICAgICAgICAgICAgWzExOC42NSwgLTI0Ljc2XSwgWzExOC40MywgLTI2LjA3XSwgWzExOC43OCwgLTI3LjU2XSwgWzExOS4yMiwgLTI4LjU3XSwgWzEyMC4yMywgLTI5LjQ5XSxcbiAqICAgICAgICAgICAgICBbMTIxLjc3LCAtMjkuODddLCBbMTIzLjU3LCAtMjkuNjRdLCBbMTI0LjQ1LCAtMjkuMDNdLCBbMTI0LjcxLCAtMjcuOTVdLCBbMTI0LjgwLCAtMjYuNzBdLFxuICogICAgICAgICAgICAgIFsxMjQuODAsIC0yNS42MF0sIFsxMjMuNjEsIC0yNS42NF0sIFsxMjIuNTYsIC0yNS42NF0sIFsxMjEuNzIsIC0yNS43Ml0sIFsxMjEuODEsIC0yNi42Ml0sXG4gKiAgICAgICAgICAgICAgWzEyMS44NiwgLTI2Ljk4XSwgWzEyMi42MCwgLTI2LjkwXSwgWzEyMy41NywgLTI3LjA1XSwgWzEyMy41NywgLTI3LjY4XSwgWzEyMy4zNSwgLTI4LjE4XSxcbiAqICAgICAgICAgICAgICBbMTIyLjUxLCAtMjguMzhdLCBbMTIxLjc3LCAtMjguMjZdLCBbMTIxLjAyLCAtMjcuOTFdLCBbMTIwLjQ5LCAtMjcuMjFdLCBbMTIwLjE0LCAtMjYuNTBdLFxuICogICAgICAgICAgICAgIFsxMjAuMTAsIC0yNS42NF0sIFsxMjAuMjcsIC0yNC41Ml0sIFsxMjAuNjcsIC0yMy42OF0sIFsxMjEuNzIsIC0yMy4zMl0sIFsxMjIuNDMsIC0yMy40OF0sXG4gKiAgICAgICAgICAgICAgWzEyMy4wNCwgLTI0LjA0XSwgWzEyNC41NCwgLTI0LjI4XSwgWzEyNC41OCwgLTIzLjIwXSwgWzEyMy42MSwgLTIyLjE0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcIm9cIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJyZWRcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjE1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTExXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTI4Ljg0LCAtMjUuNzZdLCBbMTI4LjE4LCAtMjUuNjBdLCBbMTI3Ljk2LCAtMjUuNTJdLCBbMTI3Ljg4LCAtMjUuNTJdLCBbMTI3LjcwLCAtMjUuNjBdLFxuICogICAgICAgICAgICAgIFsxMjcuMjYsIC0yNS43OV0sIFsxMjYuNjAsIC0yNi4xMV0sIFsxMjYuMTYsIC0yNi43OF0sIFsxMjYuMTIsIC0yNy42OF0sIFsxMjYuMjEsIC0yOC40Ml0sXG4gKiAgICAgICAgICAgICAgWzEyNi42OSwgLTI5LjQ5XSwgWzEyNy43NCwgLTI5LjgwXSwgWzEyOC44MCwgLTI5LjcyXSwgWzEyOS40MSwgLTI5LjAzXSwgWzEyOS43MiwgLTI3Ljk1XSxcbiAqICAgICAgICAgICAgICBbMTI5LjY4LCAtMjcuMjFdLCBbMTI5LjMzLCAtMjYuMjNdLCBbMTI4Ljg0LCAtMjUuNzZdXG4gKiAgICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTI4LjQ1LCAtMjcuNDRdLCBbMTI4LjMyLCAtMjYuOTRdLCBbMTI3LjcwLCAtMjYuODJdLCBbMTI3LjM1LCAtMjcuMDVdLCBbMTI3LjE3LCAtMjcuODBdLFxuICogICAgICAgICAgICAgIFsxMjcuNTcsIC0yOC4yMl0sIFsxMjguMTAsIC0yOC40Ml0sIFsxMjguNDksIC0yNy44MF0sIFsxMjguNDUsIC0yNy40NF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJvXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwieWVsbG93XCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCIxNVwiLFxuICogICAgICAgICAgXCJhc2NpaVwiOiBcIjExMVwiXG4gKiAgICAgICAgfSxcbiAqICAgICAgICBcImdlb21ldHJ5XCI6IHtcbiAqICAgICAgICAgIFwidHlwZVwiOiBcIlBvbHlnb25cIixcbiAqICAgICAgICAgIFwiY29vcmRpbmF0ZXNcIjogW1xuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzMS44NywgLTI1Ljc2XSwgWzEzMS4zNSwgLTI2LjA3XSwgWzEzMC45NSwgLTI2Ljc4XSwgWzEzMC44MiwgLTI3LjY0XSwgWzEzMC44NiwgLTI4LjUzXSxcbiAqICAgICAgICAgICAgICBbMTMxLjI2LCAtMjkuMjJdLCBbMTMxLjkyLCAtMjkuNzZdLCBbMTMyLjQ1LCAtMjkuODddLCBbMTMzLjA2LCAtMjkuNzZdLCBbMTMzLjcyLCAtMjkuMzRdLFxuICogICAgICAgICAgICAgIFsxMzQuMDcsIC0yOC44MF0sIFsxMzQuMjAsIC0yNy45MV0sIFsxMzQuMDcsIC0yNy4yMV0sIFsxMzMuODEsIC0yNi4zMV0sIFsxMzMuMzcsIC0yNS44M10sXG4gKiAgICAgICAgICAgICAgWzEzMi43MSwgLTI1LjY0XSwgWzEzMS44NywgLTI1Ljc2XVxuICogICAgICAgICAgICBdLFxuICogICAgICAgICAgICBbXG4gKiAgICAgICAgICAgICAgWzEzMy4xNSwgLTI3LjE3XSwgWzEzMi43MSwgLTI2Ljg2XSwgWzEzMi4wOSwgLTI2LjkwXSwgWzEzMS43NCwgLTI3LjU2XSwgWzEzMS43OSwgLTI4LjI2XSxcbiAqICAgICAgICAgICAgICBbMTMyLjM2LCAtMjguNDVdLCBbMTMyLjkzLCAtMjguMzRdLCBbMTMzLjE1LCAtMjcuNzZdLCBbMTMzLjE1LCAtMjcuMTddXG4gKiAgICAgICAgICAgIF1cbiAqICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgIH0sXG4gKiAgICAgIHtcbiAqICAgICAgICBcInR5cGVcIjogXCJGZWF0dXJlXCIsXG4gKiAgICAgICAgXCJwcm9wZXJ0aWVzXCI6IHtcbiAqICAgICAgICAgIFwibGV0dGVyXCI6IFwiZ1wiLFxuICogICAgICAgICAgXCJjb2xvclwiOiBcImJsdWVcIixcbiAqICAgICAgICAgIFwicmFua1wiOiBcIjdcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDNcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzguMTIsIC0yNS4wNF0sIFsxMzYuODQsIC0yNS4xNl0sIFsxMzUuOTYsIC0yNS4zNl0sIFsxMzUuMjYsIC0yNS45OV0sIFsxMzUsIC0yNi45MF0sXG4gKiAgICAgICAgICAgICAgWzEzNS4wNCwgLTI3LjkxXSwgWzEzNS4yNiwgLTI4Ljg4XSwgWzEzNi4wNSwgLTI5LjQ1XSwgWzEzNy4wMiwgLTI5LjQ5XSwgWzEzNy44MSwgLTI5LjQ5XSxcbiAqICAgICAgICAgICAgICBbMTM3Ljk0LCAtMjkuOTldLCBbMTM3LjkwLCAtMzEuMjBdLCBbMTM3Ljg1LCAtMzIuMjRdLCBbMTM2Ljg4LCAtMzIuNjldLCBbMTM2LjQ1LCAtMzIuMzZdLFxuICogICAgICAgICAgICAgIFsxMzYuMjcsIC0zMS44MF0sIFsxMzQuOTUsIC0zMS44NF0sIFsxMzUuMTcsIC0zMi45OV0sIFsxMzUuNTIsIC0zMy40M10sIFsxMzYuMTQsIC0zMy43Nl0sXG4gKiAgICAgICAgICAgICAgWzEzNy4wNiwgLTMzLjgzXSwgWzEzOC4xMiwgLTMzLjY1XSwgWzEzOC44NiwgLTMzLjIxXSwgWzEzOS4zMCwgLTMyLjI4XSwgWzEzOS4zMCwgLTMxLjI0XSxcbiAqICAgICAgICAgICAgICBbMTM5LjMwLCAtMzAuMTRdLCBbMTM5LjIxLCAtMjguOTZdLCBbMTM5LjE3LCAtMjguMjJdLCBbMTM5LjA4LCAtMjcuNDFdLCBbMTM5LjA4LCAtMjYuNDddLFxuICogICAgICAgICAgICAgIFsxMzguOTksIC0yNS40MF0sIFsxMzguNzMsIC0yNS4wMF0sIFsxMzguMTIsIC0yNS4wNF1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxMzcuNTAsIC0yNi41NF0sIFsxMzYuOTcsIC0yNi40N10sIFsxMzYuNDksIC0yNi41OF0sIFsxMzYuMzEsIC0yNy4xM10sIFsxMzYuMzEsIC0yNy43Ml0sXG4gKiAgICAgICAgICAgICAgWzEzNi41OCwgLTI3Ljk5XSwgWzEzNy41MCwgLTI4LjAzXSwgWzEzNy42OCwgLTI3LjY4XSwgWzEzNy41OSwgLTI2Ljc4XSwgWzEzNy41MCwgLTI2LjU0XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9LFxuICogICAgICB7XG4gKiAgICAgICAgXCJ0eXBlXCI6IFwiRmVhdHVyZVwiLFxuICogICAgICAgIFwicHJvcGVydGllc1wiOiB7XG4gKiAgICAgICAgICBcImxldHRlclwiOiBcImxcIixcbiAqICAgICAgICAgIFwiY29sb3JcIjogXCJncmVlblwiLFxuICogICAgICAgICAgXCJyYW5rXCI6IFwiMTJcIixcbiAqICAgICAgICAgIFwiYXNjaWlcIjogXCIxMDhcIlxuICogICAgICAgIH0sXG4gKiAgICAgICAgXCJnZW9tZXRyeVwiOiB7XG4gKiAgICAgICAgICBcInR5cGVcIjogXCJQb2x5Z29uXCIsXG4gKiAgICAgICAgICBcImNvb3JkaW5hdGVzXCI6IFtcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDAuMTQsIC0yMS4wNF0sIFsxNDAuMzEsIC0yOS40Ml0sIFsxNDEuNjcsIC0yOS40OV0sIFsxNDEuNTksIC0yMC45Ml0sIFsxNDAuMTQsIC0yMS4wNF1cbiAqICAgICAgICAgICAgXVxuICogICAgICAgICAgXVxuICogICAgICAgIH1cbiAqICAgICAgfSxcbiAqICAgICAge1xuICogICAgICAgIFwidHlwZVwiOiBcIkZlYXR1cmVcIixcbiAqICAgICAgICBcInByb3BlcnRpZXNcIjoge1xuICogICAgICAgICAgXCJsZXR0ZXJcIjogXCJlXCIsXG4gKiAgICAgICAgICBcImNvbG9yXCI6IFwicmVkXCIsXG4gKiAgICAgICAgICBcInJhbmtcIjogXCI1XCIsXG4gKiAgICAgICAgICBcImFzY2lpXCI6IFwiMTAxXCJcbiAqICAgICAgICB9LFxuICogICAgICAgIFwiZ2VvbWV0cnlcIjoge1xuICogICAgICAgICAgXCJ0eXBlXCI6IFwiUG9seWdvblwiLFxuICogICAgICAgICAgXCJjb29yZGluYXRlc1wiOiBbXG4gKiAgICAgICAgICAgIFtcbiAqICAgICAgICAgICAgICBbMTQ0LjE0LCAtMjcuNDFdLCBbMTQ1LjY3LCAtMjcuNTJdLCBbMTQ2Ljg2LCAtMjcuMDldLCBbMTQ2LjgyLCAtMjUuNjRdLCBbMTQ2LjI1LCAtMjUuMDRdLFxuICogICAgICAgICAgICAgIFsxNDUuNDUsIC0yNC42OF0sIFsxNDQuNjYsIC0yNC42MF0sIFsxNDQuMDksIC0yNC43Nl0sIFsxNDMuNDMsIC0yNS4wOF0sIFsxNDIuOTksIC0yNS40MF0sXG4gKiAgICAgICAgICAgICAgWzE0Mi42NCwgLTI2LjAzXSwgWzE0Mi42NCwgLTI3LjA1XSwgWzE0Mi42NCwgLTI4LjI2XSwgWzE0My4zMCwgLTI5LjExXSwgWzE0NC4xOCwgLTI5LjU3XSxcbiAqICAgICAgICAgICAgICBbMTQ1LjQxLCAtMjkuNjRdLCBbMTQ2LjQ2LCAtMjkuMTldLCBbMTQ2LjY0LCAtMjguNzJdLCBbMTQ2LjgyLCAtMjguMTRdLCBbMTQ0Ljg0LCAtMjguNDJdLFxuICogICAgICAgICAgICAgIFsxNDQuMzEsIC0yOC4yNl0sIFsxNDQuMTQsIC0yNy40MV1cbiAqICAgICAgICAgICAgXSxcbiAqICAgICAgICAgICAgW1xuICogICAgICAgICAgICAgIFsxNDQuMTgsIC0yNi4zOV0sIFsxNDQuNTMsIC0yNi41OF0sIFsxNDUuMTksIC0yNi42Ml0sIFsxNDUuNzIsIC0yNi4zNV0sIFsxNDUuODEsIC0yNS45MV0sXG4gKiAgICAgICAgICAgICAgWzE0NS40MSwgLTI1LjY4XSwgWzE0NC45NywgLTI1LjY4XSwgWzE0NC40OSwgLTI1LjY0XSwgWzE0NCwgLTI1Ljk5XSwgWzE0NC4xOCwgLTI2LjM5XVxuICogICAgICAgICAgICBdXG4gKiAgICAgICAgICBdXG4gKiAgICAgICAgfVxuICogICAgICB9XG4gKiAgICBdXG4gKiAgfTtcbiAqIH1cbiAqIGBgYFxuICovXG52YXIgQWdtRGF0YUxheWVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21EYXRhTGF5ZXIoX21hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFuYWdlciA9IF9tYW5hZ2VyO1xuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pZCA9IChsYXllcklkKyspLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiBhIGZlYXR1cmUgaW4gdGhlIGxheWVyIGlzIGNsaWNrZWQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxheWVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZ2VvSnNvbiB0byBiZSBkaXNwbGF5ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2VvSnNvbiA9IG51bGw7XG4gICAgfVxuICAgIEFnbURhdGFMYXllci5wcm90b3R5cGUubmdPbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hbmFnZXIuYWRkRGF0YUxheWVyKHRoaXMpO1xuICAgICAgICB0aGlzLl9hZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5sYXllckNsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgIF07XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBvcyA9IF90aGlzLl9tYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZShvYmoubmFtZSwgX3RoaXMpLnN1YnNjcmliZShvYmouaGFuZGxlcik7XG4gICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKG9zKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtRGF0YUxheWVyLnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gXCJBZ21EYXRhTGF5ZXItXCIgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYW5hZ2VyLmRlbGV0ZURhdGFMYXllcih0aGlzKTtcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21EYXRhTGF5ZXIucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZW9Kc29uQ2hhbmdlID0gY2hhbmdlc1snZ2VvSnNvbiddO1xuICAgICAgICBpZiAoZ2VvSnNvbkNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5fbWFuYWdlci51cGRhdGVHZW9Kc29uKHRoaXMsIGdlb0pzb25DaGFuZ2UuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSB7fTtcbiAgICAgICAgQWdtRGF0YUxheWVyLl9kYXRhT3B0aW9uc0F0dHJpYnV0ZXMuZm9yRWFjaChmdW5jdGlvbiAoaykgeyByZXR1cm4gZGF0YU9wdGlvbnNba10gPSBjaGFuZ2VzLmhhc093blByb3BlcnR5KGspID8gY2hhbmdlc1trXS5jdXJyZW50VmFsdWUgOiBfdGhpc1trXTsgfSk7XG4gICAgICAgIHRoaXMuX21hbmFnZXIuc2V0RGF0YU9wdGlvbnModGhpcywgZGF0YU9wdGlvbnMpO1xuICAgIH07XG4gICAgcmV0dXJuIEFnbURhdGFMYXllcjtcbn0oKSk7XG5leHBvcnQgeyBBZ21EYXRhTGF5ZXIgfTtcbkFnbURhdGFMYXllci5fZGF0YU9wdGlvbnNBdHRyaWJ1dGVzID0gWydzdHlsZSddO1xuQWdtRGF0YUxheWVyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20tZGF0YS1sYXllcidcbiAgICAgICAgICAgIH0sXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuQWdtRGF0YUxheWVyLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogRGF0YUxheWVyTWFuYWdlciwgfSxcbl07IH07XG5BZ21EYXRhTGF5ZXIucHJvcERlY29yYXRvcnMgPSB7XG4gICAgJ2xheWVyQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdnZW9Kc29uJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdzdHlsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhLWxheWVyLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL2RhdGEtbGF5ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFya2VyTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL21hcmtlci1tYW5hZ2VyJztcbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuL2luZm8td2luZG93JztcbnZhciBtYXJrZXJJZCA9IDA7XG4vKipcbiAqIEFnbU1hcmtlciByZW5kZXJzIGEgbWFwIG1hcmtlciBpbnNpZGUgYSB7QGxpbmsgQWdtTWFwfS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICdteS1tYXAtY21wJyxcbiAqICBzdHlsZXM6IFtgXG4gKiAgICAuYWdtLW1hcC1jb250YWluZXIge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgICAgPGFnbS1tYXJrZXIgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW2xhYmVsXT1cIidNJ1wiPlxuICogICAgICA8L2FnbS1tYXJrZXI+XG4gKiAgICA8L2FnbS1tYXA+XG4gKiAgYFxuICogfSlcbiAqIGBgYFxuICovXG52YXIgQWdtTWFya2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21NYXJrZXIoX21hcmtlck1hbmFnZXIpIHtcbiAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlciA9IF9tYXJrZXJNYW5hZ2VyO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdHJ1ZSwgdGhlIG1hcmtlciBjYW4gYmUgZHJhZ2dlZC4gRGVmYXVsdCB2YWx1ZSBpcyBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRydWUsIHRoZSBtYXJrZXIgaXMgdmlzaWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBvcGVuIHRoZSBjaGlsZCBpbmZvIHdpbmRvdyB3aGVuIHRoZSBtYXJrZXIgaXMgY2xpY2tlZC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub3BlbkluZm9XaW5kb3cgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1hcmtlcidzIG9wYWNpdHkgYmV0d2VlbiAwLjAgYW5kIDEuMC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub3BhY2l0eSA9IDE7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbGwgbWFya2VycyBhcmUgZGlzcGxheWVkIG9uIHRoZSBtYXAgaW4gb3JkZXIgb2YgdGhlaXIgekluZGV4LCB3aXRoIGhpZ2hlciB2YWx1ZXMgZGlzcGxheWluZyBpblxuICAgICAgICAgKiBmcm9udCBvZiBtYXJrZXJzIHdpdGggbG93ZXIgdmFsdWVzLiBCeSBkZWZhdWx0LCBtYXJrZXJzIGFyZSBkaXNwbGF5ZWQgYWNjb3JkaW5nIHRvIHRoZWlyXG4gICAgICAgICAqIHZlcnRpY2FsIHBvc2l0aW9uIG9uIHNjcmVlbiwgd2l0aCBsb3dlciBtYXJrZXJzIGFwcGVhcmluZyBpbiBmcm9udCBvZiBtYXJrZXJzIGZ1cnRoZXIgdXAgdGhlXG4gICAgICAgICAqIHNjcmVlbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuekluZGV4ID0gMTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRydWUsIHRoZSBtYXJrZXIgY2FuIGJlIGNsaWNrZWQuIERlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICAgICAgdGhpcy5jbGlja2FibGUgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBlbWl0dGVyIGdldHMgZW1pdHRlZCB3aGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgbWFya2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tYXJrZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdG9wcyBkcmFnZ2luZyB0aGUgbWFya2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kcmFnRW5kID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIG1vdXNlcyBvdmVyIHRoZSBtYXJrZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBtb3VzZXMgb3V0c2lkZSB0aGUgbWFya2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBpbnRlcm5hbFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbmZvV2luZG93ID0gbmV3IFF1ZXJ5TGlzdCgpO1xuICAgICAgICB0aGlzLl9tYXJrZXJBZGRlZFRvTWFuZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuX2lkID0gKG1hcmtlcklkKyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKTtcbiAgICAgICAgdGhpcy5pbmZvV2luZG93LmNoYW5nZXMuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUoKTsgfSk7XG4gICAgfTtcbiAgICBBZ21NYXJrZXIucHJvdG90eXBlLmhhbmRsZUluZm9XaW5kb3dVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmluZm9XaW5kb3cubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBubyBtb3JlIHRoYW4gb25lIGluZm8gd2luZG93LicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5mb1dpbmRvdy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgIG1hcmtlci5ob3N0TWFya2VyID0gX3RoaXM7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMubGF0aXR1ZGUgIT09ICdudW1iZXInIHx8IHR5cGVvZiB0aGlzLmxvbmdpdHVkZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX21hcmtlckFkZGVkVG9NYW5nZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIuYWRkTWFya2VyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyQWRkZWRUb01hbmdlciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydsYXRpdHVkZSddIHx8IGNoYW5nZXNbJ2xvbmdpdHVkZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZU1hcmtlclBvc2l0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWyd0aXRsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVRpdGxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydsYWJlbCddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZUxhYmVsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydkcmFnZ2FibGUnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVEcmFnZ2FibGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ2ljb25VcmwnXSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VyTWFuYWdlci51cGRhdGVJY29uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydvcGFjaXR5J10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlT3BhY2l0eSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1sndmlzaWJsZSddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVZpc2libGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXNbJ3pJbmRleCddKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLnVwZGF0ZVpJbmRleCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlc1snY2xpY2thYmxlJ10pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlck1hbmFnZXIudXBkYXRlQ2xpY2thYmxlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBZ21NYXJrZXIucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGNzID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ2NsaWNrJywgdGhpcykuc3Vic2NyaWJlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcGVuSW5mb1dpbmRvdykge1xuICAgICAgICAgICAgICAgIF90aGlzLmluZm9XaW5kb3cuZm9yRWFjaChmdW5jdGlvbiAoaW5mb1dpbmRvdykgeyByZXR1cm4gaW5mb1dpbmRvdy5vcGVuKCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMubWFya2VyQ2xpY2suZW1pdChudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLnB1c2goY3MpO1xuICAgICAgICB2YXIgZHMgPSB0aGlzLl9tYXJrZXJNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnZHJhZ2VuZCcsIHRoaXMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBfdGhpcy5kcmFnRW5kLmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChkcyk7XG4gICAgICAgIHZhciBtb3ZlciA9IHRoaXMuX21hcmtlck1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKCdtb3VzZW92ZXInLCB0aGlzKVxuICAgICAgICAgICAgLnN1YnNjcmliZShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgX3RoaXMubW91c2VPdmVyLmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3Zlcik7XG4gICAgICAgIHZhciBtb3V0ID0gdGhpcy5fbWFya2VyTWFuYWdlci5jcmVhdGVFdmVudE9ic2VydmFibGUoJ21vdXNlb3V0JywgdGhpcylcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIF90aGlzLm1vdXNlT3V0LmVtaXQoeyBjb29yZHM6IHsgbGF0OiBlLmxhdExuZy5sYXQoKSwgbG5nOiBlLmxhdExuZy5sbmcoKSB9IH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2YWJsZVN1YnNjcmlwdGlvbnMucHVzaChtb3V0KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21NYXJrZXIucHJvdG90eXBlLmlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5faWQ7IH07XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbU1hcmtlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnQWdtTWFya2VyLScgKyB0aGlzLl9pZC50b1N0cmluZygpOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21NYXJrZXIucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9tYXJrZXJNYW5hZ2VyLmRlbGV0ZU1hcmtlcih0aGlzKTtcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX29ic2VydmFibGVTdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtTWFya2VyO1xufSgpKTtcbmV4cG9ydCB7IEFnbU1hcmtlciB9O1xuQWdtTWFya2VyLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBEaXJlY3RpdmUsIGFyZ3M6IFt7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdhZ20tbWFya2VyJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21NYXJrZXIuY3RvclBhcmFtZXRlcnMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbXG4gICAgeyB0eXBlOiBNYXJrZXJNYW5hZ2VyLCB9LFxuXTsgfTtcbkFnbU1hcmtlci5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnbGF0aXR1ZGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2xvbmdpdHVkZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndGl0bGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2xhYmVsJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydtYXJrZXJEcmFnZ2FibGUnLF0gfSxdLFxuICAgICdpY29uVXJsJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICd2aXNpYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdvcGVuSW5mb1dpbmRvdyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnb3BhY2l0eSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnekluZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdjbGlja2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydtYXJrZXJDbGlja2FibGUnLF0gfSxdLFxuICAgICdtYXJrZXJDbGljayc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2RyYWdFbmQnOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtb3VzZU92ZXInOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdtb3VzZU91dCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2luZm9XaW5kb3cnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGRyZW4sIGFyZ3M6IFtBZ21JbmZvV2luZG93LF0gfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcmtlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvZGlyZWN0aXZlcy9tYXJrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDgzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4uL3NlcnZpY2VzL21hbmFnZXJzL3BvbHlnb24tbWFuYWdlcic7XG4vKipcbiAqIEFnbVBvbHlnb24gcmVuZGVycyBhIHBvbHlnb24gb24gYSB7QGxpbmsgQWdtTWFwfVxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIGFnbS1tYXAge1xuICogICAgICBoZWlnaHQ6IDMwMHB4O1xuICogICAgfVxuICogYF0sXG4gKiAgdGVtcGxhdGU6IGBcbiAqICAgIDxhZ20tbWFwIFtsYXRpdHVkZV09XCJsYXRcIiBbbG9uZ2l0dWRlXT1cImxuZ1wiIFt6b29tXT1cInpvb21cIj5cbiAqICAgICAgPGFnbS1wb2x5Z29uIFtwYXRoc109XCJwYXRoc1wiPlxuICogICAgICA8L2FnbS1wb2x5Z29uPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlNYXBDbXAge1xuICogICBsYXQ6IG51bWJlciA9IDA7XG4gKiAgIGxuZzogbnVtYmVyID0gMDtcbiAqICAgem9vbTogbnVtYmVyID0gMTA7XG4gKiAgIHBhdGhzOiBBcnJheTxMYXRMbmdMaXRlcmFsPiA9IFtcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogMTAsIGxuZzogMTAgfSxcbiAqICAgICB7IGxhdDogMCwgIGxuZzogMTAgfVxuICogICBdXG4gKiAgIC8vIE5lc3RpbmcgcGF0aHMgd2lsbCBjcmVhdGUgYSBob2xlIHdoZXJlIHRoZXkgb3ZlcmxhcDtcbiAqICAgbmVzdGVkUGF0aHM6IEFycmF5PEFycmF5PExhdExuZ0xpdGVyYWw+PiA9IFtbXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDIwIH0sXG4gKiAgICAgeyBsYXQ6IDEwLCBsbmc6IDEwIH0sXG4gKiAgICAgeyBsYXQ6IDAsICBsbmc6IDEwIH1cbiAqICAgXSwgW1xuICogICAgIHsgbGF0OiAwLCBsbmc6IDE1IH0sXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMjAgfSxcbiAqICAgICB7IGxhdDogNSwgbG5nOiAyMCB9LFxuICogICAgIHsgbGF0OiA1LCBsbmc6IDE1IH0sXG4gKiAgICAgeyBsYXQ6IDAsIGxuZzogMTUgfVxuICogICBdXVxuICogfVxuICogYGBgXG4gKi9cbnZhciBBZ21Qb2x5Z29uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBZ21Qb2x5Z29uKF9wb2x5Z29uTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9wb2x5Z29uTWFuYWdlciA9IF9wb2x5Z29uTWFuYWdlcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgUG9seWdvbiBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xpY2thYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljXG4gICAgICAgICAqIHByb3BlcnR5IGRlZmluZXMgdGhlIG1vZGUgb2YgZHJhZ2dpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2xcbiAgICAgICAgICogcG9pbnRzIHNob3duIGF0IHRoZSB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsXG4gICAgICAgICAqIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlXG4gICAgICAgICAqIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS4gTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhXG4gICAgICAgICAqIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xuICAgICAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZW9kZXNpYyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG9yZGVyZWQgc2VxdWVuY2Ugb2YgY29vcmRpbmF0ZXMgdGhhdCBkZXNpZ25hdGVzIGEgY2xvc2VkIGxvb3AuXG4gICAgICAgICAqIFVubGlrZSBwb2x5bGluZXMsIGEgcG9seWdvbiBtYXkgY29uc2lzdCBvZiBvbmUgb3IgbW9yZSBwYXRocy5cbiAgICAgICAgICogIEFzIGEgcmVzdWx0LCB0aGUgcGF0aHMgcHJvcGVydHkgbWF5IHNwZWNpZnkgb25lIG9yIG1vcmUgYXJyYXlzIG9mXG4gICAgICAgICAqIExhdExuZyBjb29yZGluYXRlcy4gUGF0aHMgYXJlIGNsb3NlZCBhdXRvbWF0aWNhbGx5OyBkbyBub3QgcmVwZWF0IHRoZVxuICAgICAgICAgKiBmaXJzdCB2ZXJ0ZXggb2YgdGhlIHBhdGggYXMgdGhlIGxhc3QgdmVydGV4LiBTaW1wbGUgcG9seWdvbnMgbWF5IGJlXG4gICAgICAgICAqIGRlZmluZWQgdXNpbmcgYSBzaW5nbGUgYXJyYXkgb2YgTGF0TG5ncy4gTW9yZSBjb21wbGV4IHBvbHlnb25zIG1heVxuICAgICAgICAgKiBzcGVjaWZ5IGFuIGFycmF5IG9mIGFycmF5cy4gQW55IHNpbXBsZSBhcnJheXMgYXJlIGNvbnZlcnRlZCBpbnRvIEFycmF5cy5cbiAgICAgICAgICogSW5zZXJ0aW5nIG9yIHJlbW92aW5nIExhdExuZ3MgZnJvbSB0aGUgQXJyYXkgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZVxuICAgICAgICAgKiB0aGUgcG9seWdvbiBvbiB0aGUgbWFwLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gY2xpY2sgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5RGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIHJlcGVhdGVkbHkgZmlyZWQgd2hpbGUgdGhlIHVzZXIgZHJhZ3MgdGhlIHBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlEcmFnID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHN0b3BzIGRyYWdnaW5nIHRoZSBwb2x5Z29uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5RHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlEcmFnU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZWRvd24gZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZURvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBtb3VzZW1vdmUgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlnb24gbW91c2VvdXQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZU91dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgb24gUG9seWdvbiBtb3VzZW92ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBvbHlNb3VzZU92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZSB0aGUgRE9NIG1vdXNldXAgZXZlbnQgaXMgZmlyZWQgb24gdGhlIFBvbHlnb25cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucG9seU1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW4gaXMgZmlyZWQgd2hlbiB0aGUgUG9seWdvbiBpcyByaWdodC1jbGlja2VkIG9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wb2x5UmlnaHRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5fcG9seWdvbkFkZGVkVG9NYW5hZ2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLm5nQWZ0ZXJDb250ZW50SW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQWdtUG9seWdvbi5wcm90b3R5cGUubmdPbkNoYW5nZXMgPSBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuX3BvbHlnb25BZGRlZFRvTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BvbHlnb25NYW5hZ2VyLnNldFBvbHlnb25PcHRpb25zKHRoaXMsIHRoaXMuX3VwZGF0ZVBvbHlnb25PcHRpb25zKGNoYW5nZXMpKTtcbiAgICB9O1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb2x5Z29uTWFuYWdlci5hZGRQb2x5Z29uKHRoaXMpO1xuICAgICAgICB0aGlzLl9wb2x5Z29uQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtUG9seWdvbi5wcm90b3R5cGUuX2FkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaGFuZGxlcnMgPSBbXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seUNsaWNrLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkYmNsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RGJsQ2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWcnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlEcmFnLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnZW5kJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RHJhZ0VuZC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZ3N0YXJ0JywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5RHJhZ1N0YXJ0LmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZWRvd24nLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlNb3VzZURvd24uZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlbW92ZScsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seU1vdXNlTW92ZS5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdXQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLnBvbHlNb3VzZU91dC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2VvdmVyJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5TW91c2VPdmVyLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZXVwJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5wb2x5TW91c2VVcC5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmlnaHRjbGljaycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMucG9seVJpZ2h0Q2xpY2suZW1pdChldik7IH0gfSxcbiAgICAgICAgXTtcbiAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICB2YXIgb3MgPSBfdGhpcy5fcG9seWdvbk1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCBfdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgICAgICAgIF90aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFnbVBvbHlnb24ucHJvdG90eXBlLl91cGRhdGVQb2x5Z29uT3B0aW9ucyA9IGZ1bmN0aW9uIChjaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjaGFuZ2VzKVxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gQWdtUG9seWdvbi5fcG9seWdvbk9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xOyB9KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrKSB7XG4gICAgICAgICAgICBvYmpba10gPSBjaGFuZ2VzW2tdLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2lkOyB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5Z29uLnByb3RvdHlwZS5uZ09uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcG9seWdvbk1hbmFnZXIuZGVsZXRlUG9seWdvbih0aGlzKTtcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgYWxsIHJlZ2lzdGVyZWQgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocykgeyByZXR1cm4gcy51bnN1YnNjcmliZSgpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21Qb2x5Z29uO1xufSgpKTtcbmV4cG9ydCB7IEFnbVBvbHlnb24gfTtcbkFnbVBvbHlnb24uX3BvbHlnb25PcHRpb25zQXR0cmlidXRlcyA9IFtcbiAgICAnY2xpY2thYmxlJywgJ2RyYWdnYWJsZScsICdlZGl0YWJsZScsICdmaWxsQ29sb3InLCAnZmlsbE9wYWNpdHknLCAnZ2VvZGVzaWMnLCAnaWNvbicsICdtYXAnLFxuICAgICdwYXRocycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsICd2aXNpYmxlJywgJ3pJbmRleCcsICdkcmFnZ2FibGUnLFxuICAgICdlZGl0YWJsZScsICd2aXNpYmxlJ1xuXTtcbkFnbVBvbHlnb24uZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3tcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2FnbS1wb2x5Z29uJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Qb2x5Z29uLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW1xuICAgIHsgdHlwZTogUG9seWdvbk1hbmFnZXIsIH0sXG5dOyB9O1xuQWdtUG9seWdvbi5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnY2xpY2thYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydwb2x5RHJhZ2dhYmxlJyxdIH0sXSxcbiAgICAnZWRpdGFibGUnOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2ZpbGxDb2xvcic6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnZmlsbE9wYWNpdHknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ2dlb2Rlc2ljJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwYXRocyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZU9wYWNpdHknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZVdlaWdodCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndmlzaWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnekluZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdwb2x5Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5RGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5RHJhZyc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlEcmFnRW5kJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seURyYWdTdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlNb3VzZURvd24nOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2x5TW91c2VNb3ZlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seU1vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seU1vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ3BvbHlNb3VzZVVwJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAncG9seVJpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlnb24uanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMvcG9seWdvbi5qc1xuLy8gbW9kdWxlIGlkID0gODMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHsgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9seWxpbmVNYW5hZ2VyIH0gZnJvbSAnLi4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XG5pbXBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9wb2x5bGluZS1wb2ludCc7XG52YXIgcG9seWxpbmVJZCA9IDA7XG4vKipcbiAqIEFnbVBvbHlsaW5lIHJlbmRlcnMgYSBwb2x5bGluZSBvbiBhIHtAbGluayBBZ21NYXB9XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogIHNlbGVjdG9yOiAnbXktbWFwLWNtcCcsXG4gKiAgc3R5bGVzOiBbYFxuICogICAgLmFnbS1tYXAtY29udGFpbmVyIHtcbiAqICAgICAgaGVpZ2h0OiAzMDBweDtcbiAqICAgIH1cbiAqIGBdLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8YWdtLW1hcCBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbem9vbV09XCJ6b29tXCI+XG4gKiAgICAgIDxhZ20tcG9seWxpbmU+XG4gKiAgICAgICAgICA8YWdtLXBvbHlsaW5lLXBvaW50IFtsYXRpdHVkZV09XCJsYXRBXCIgW2xvbmdpdHVkZV09XCJsbmdBXCI+XG4gKiAgICAgICAgICA8L2FnbS1wb2x5bGluZS1wb2ludD5cbiAqICAgICAgICAgIDxhZ20tcG9seWxpbmUtcG9pbnQgW2xhdGl0dWRlXT1cImxhdEJcIiBbbG9uZ2l0dWRlXT1cImxuZ0JcIj5cbiAqICAgICAgICAgIDwvYWdtLXBvbHlsaW5lLXBvaW50PlxuICogICAgICA8L2FnbS1wb2x5bGluZT5cbiAqICAgIDwvYWdtLW1hcD5cbiAqICBgXG4gKiB9KVxuICogYGBgXG4gKi9cbnZhciBBZ21Qb2x5bGluZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtUG9seWxpbmUoX3BvbHlsaW5lTWFuYWdlcikge1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIgPSBfcG9seWxpbmVNYW5hZ2VyO1xuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBQb2x5bGluZSBoYW5kbGVzIG1vdXNlIGV2ZW50cy4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xpY2thYmxlID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCB0byB0cnVlLCB0aGUgdXNlciBjYW4gZHJhZyB0aGlzIHNoYXBlIG92ZXIgdGhlIG1hcC4gVGhlIGdlb2Rlc2ljIHByb3BlcnR5IGRlZmluZXMgdGhlXG4gICAgICAgICAqIG1vZGUgb2YgZHJhZ2dpbmcuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc2V0IHRvIHRydWUsIHRoZSB1c2VyIGNhbiBlZGl0IHRoaXMgc2hhcGUgYnkgZHJhZ2dpbmcgdGhlIGNvbnRyb2wgcG9pbnRzIHNob3duIGF0IHRoZVxuICAgICAgICAgKiB2ZXJ0aWNlcyBhbmQgb24gZWFjaCBzZWdtZW50LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZWRpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZW4gdHJ1ZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIGludGVycHJldGVkIGFzIGdlb2Rlc2ljIGFuZCB3aWxsIGZvbGxvdyB0aGUgY3VydmF0dXJlIG9mXG4gICAgICAgICAqIHRoZSBFYXJ0aC4gV2hlbiBmYWxzZSwgZWRnZXMgb2YgdGhlIHBvbHlnb24gYXJlIHJlbmRlcmVkIGFzIHN0cmFpZ2h0IGxpbmVzIGluIHNjcmVlbiBzcGFjZS5cbiAgICAgICAgICogTm90ZSB0aGF0IHRoZSBzaGFwZSBvZiBhIGdlb2Rlc2ljIHBvbHlnb24gbWF5IGFwcGVhciB0byBjaGFuZ2Ugd2hlbiBkcmFnZ2VkLCBhcyB0aGUgZGltZW5zaW9uc1xuICAgICAgICAgKiBhcmUgbWFpbnRhaW5lZCByZWxhdGl2ZSB0byB0aGUgc3VyZmFjZSBvZiB0aGUgZWFydGguIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZW9kZXNpYyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGlzIHBvbHlsaW5lIGlzIHZpc2libGUgb24gdGhlIG1hcC4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIERPTSBjbGljayBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIGRibGNsaWNrIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZURibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyByZXBlYXRlZGx5IGZpcmVkIHdoaWxlIHRoZSB1c2VyIGRyYWdzIHRoZSBwb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZURyYWcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgc3RvcHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBzdGFydHMgZHJhZ2dpbmcgdGhlIHBvbHlsaW5lLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lRHJhZ1N0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBET00gbW91c2Vkb3duIGV2ZW50IGlzIGZpcmVkIG9uIHRoZSBQb2x5bGluZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgRE9NIG1vdXNlbW92ZSBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxpbmVNb3VzZU1vdmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3V0LlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5saW5lTW91c2VPdXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW50IGlzIGZpcmVkIG9uIFBvbHlsaW5lIG1vdXNlb3Zlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlT3ZlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlIHRoZSBET00gbW91c2V1cCBldmVudCBpcyBmaXJlZCBvbiB0aGUgUG9seWxpbmVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZU1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGV2ZW4gaXMgZmlyZWQgd2hlbiB0aGUgUG9seWxpbmUgaXMgcmlnaHQtY2xpY2tlZCBvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubGluZVJpZ2h0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLl9pZCA9IChwb2x5bGluZUlkKyspLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5bGluZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gcG9pbnQucG9zaXRpb25DaGFuZ2VkLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7IF90aGlzLl9wb2x5bGluZU1hbmFnZXIudXBkYXRlUG9seWxpbmVQb2ludHMoX3RoaXMpOyB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHMgPSB0aGlzLnBvaW50cy5jaGFuZ2VzLnN1YnNjcmliZShmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKF90aGlzKTsgfSk7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChzKTtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVNYW5hZ2VyLnVwZGF0ZVBvbHlsaW5lUG9pbnRzKHRoaXMpO1xuICAgIH07XG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wb2x5bGluZUFkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgdmFyIG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIEFnbVBvbHlsaW5lLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzLmluZGV4T2YoaykgIT09IC0xOyB9KTtcbiAgICAgICAgb3B0aW9uS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IHJldHVybiBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuc2V0UG9seWxpbmVPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuYWRkUG9seWxpbmUodGhpcyk7XG4gICAgICAgIHRoaXMuX3BvbHlsaW5lQWRkZWRUb01hbmFnZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH07XG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLl9hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZGJsY2xpY2snLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEYmxDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZHJhZycsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZURyYWcuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2RyYWdlbmQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEcmFnRW5kLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdkcmFnc3RhcnQnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVEcmFnU3RhcnQuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNlZG93bicsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZU1vdXNlRG93bi5lbWl0KGV2KTsgfSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbW91c2Vtb3ZlJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lTW91c2VNb3ZlLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW91dCcsIGhhbmRsZXI6IGZ1bmN0aW9uIChldikgeyByZXR1cm4gX3RoaXMubGluZU1vdXNlT3V0LmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtb3VzZW92ZXInLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVNb3VzZU92ZXIuZW1pdChldik7IH0gfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21vdXNldXAnLCBoYW5kbGVyOiBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIF90aGlzLmxpbmVNb3VzZVVwLmVtaXQoZXYpOyB9IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyaWdodGNsaWNrJywgaGFuZGxlcjogZnVuY3Rpb24gKGV2KSB7IHJldHVybiBfdGhpcy5saW5lUmlnaHRDbGljay5lbWl0KGV2KTsgfSB9LFxuICAgICAgICBdO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIHZhciBvcyA9IF90aGlzLl9wb2x5bGluZU1hbmFnZXIuY3JlYXRlRXZlbnRPYnNlcnZhYmxlKG9iai5uYW1lLCBfdGhpcykuc3Vic2NyaWJlKG9iai5oYW5kbGVyKTtcbiAgICAgICAgICAgIF90aGlzLl9zdWJzY3JpcHRpb25zLnB1c2gob3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5bGluZS5wcm90b3R5cGUuX2dldFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucG9pbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMudG9BcnJheSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBBZ21Qb2x5bGluZS5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9pZDsgfTtcbiAgICAvKiogQGludGVybmFsICovXG4gICAgQWdtUG9seWxpbmUucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wb2x5bGluZU1hbmFnZXIuZGVsZXRlUG9seWxpbmUodGhpcyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIGFsbCByZWdpc3RlcmVkIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQWdtUG9seWxpbmU7XG59KCkpO1xuZXhwb3J0IHsgQWdtUG9seWxpbmUgfTtcbkFnbVBvbHlsaW5lLl9wb2x5bGluZU9wdGlvbnNBdHRyaWJ1dGVzID0gW1xuICAgICdkcmFnZ2FibGUnLCAnZWRpdGFibGUnLCAndmlzaWJsZScsICdnZW9kZXNpYycsICdzdHJva2VDb2xvcicsICdzdHJva2VPcGFjaXR5JywgJ3N0cm9rZVdlaWdodCcsXG4gICAgJ3pJbmRleCdcbl07XG5BZ21Qb2x5bGluZS5kZWNvcmF0b3JzID0gW1xuICAgIHsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnYWdtLXBvbHlsaW5lJ1xuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Qb2x5bGluZS5jdG9yUGFyYW1ldGVycyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtcbiAgICB7IHR5cGU6IFBvbHlsaW5lTWFuYWdlciwgfSxcbl07IH07XG5BZ21Qb2x5bGluZS5wcm9wRGVjb3JhdG9ycyA9IHtcbiAgICAnY2xpY2thYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdkcmFnZ2FibGUnOiBbeyB0eXBlOiBJbnB1dCwgYXJnczogWydwb2x5bGluZURyYWdnYWJsZScsXSB9LF0sXG4gICAgJ2VkaXRhYmxlJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdnZW9kZXNpYyc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnc3Ryb2tlQ29sb3InOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZU9wYWNpdHknOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG4gICAgJ3N0cm9rZVdlaWdodCc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAndmlzaWJsZSc6IFt7IHR5cGU6IElucHV0IH0sXSxcbiAgICAnekluZGV4JzogW3sgdHlwZTogSW5wdXQgfSxdLFxuICAgICdsaW5lQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lRGJsQ2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lRHJhZyc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVEcmFnRW5kJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZURyYWdTdGFydCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVNb3VzZURvd24nOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdsaW5lTW91c2VNb3ZlJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZU1vdXNlT3V0JzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZU1vdXNlT3Zlcic6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4gICAgJ2xpbmVNb3VzZVVwJzogW3sgdHlwZTogT3V0cHV0IH0sXSxcbiAgICAnbGluZVJpZ2h0Q2xpY2snOiBbeyB0eXBlOiBPdXRwdXQgfSxdLFxuICAgICdwb2ludHMnOiBbeyB0eXBlOiBDb250ZW50Q2hpbGRyZW4sIGFyZ3M6IFtBZ21Qb2x5bGluZVBvaW50LF0gfSxdLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlsaW5lLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BhZ20vY29yZS9kaXJlY3RpdmVzL3BvbHlsaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA4MzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgV2luZG93UmVmID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXaW5kb3dSZWYoKSB7XG4gICAgfVxuICAgIFdpbmRvd1JlZi5wcm90b3R5cGUuZ2V0TmF0aXZlV2luZG93ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gd2luZG93OyB9O1xuICAgIHJldHVybiBXaW5kb3dSZWY7XG59KCkpO1xuZXhwb3J0IHsgV2luZG93UmVmIH07XG52YXIgRG9jdW1lbnRSZWYgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvY3VtZW50UmVmKCkge1xuICAgIH1cbiAgICBEb2N1bWVudFJlZi5wcm90b3R5cGUuZ2V0TmF0aXZlRG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudDsgfTtcbiAgICByZXR1cm4gRG9jdW1lbnRSZWY7XG59KCkpO1xuZXhwb3J0IHsgRG9jdW1lbnRSZWYgfTtcbmV4cG9ydCB2YXIgQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUyA9IFtXaW5kb3dSZWYsIERvY3VtZW50UmVmXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXItZ2xvYmFscy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvdXRpbHMvYnJvd3Nlci1nbG9iYWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBtYWluIG1vZHVsZXNcbmV4cG9ydCAqIGZyb20gJy4vZGlyZWN0aXZlcyc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzJztcbi8vIGNvcmUgbW9kdWxlXG4vLyB3ZSBleHBsaWNpdGx5IGV4cG9ydCB0aGUgbW9kdWxlIGhlcmUgdG8gcHJldmVudCB0aGlzIElvbmljIDIgYnVnOlxuLy8gaHR0cDovL3N0ZXZlbWljaGVsb3R0aS5jb20vaW50ZWdyYXRlLWFuZ3VsYXItMi1nb29nbGUtbWFwcy1pbnRvLWlvbmljLTIvXG5leHBvcnQgeyBBZ21Db3JlTW9kdWxlIH0gZnJvbSAnLi9jb3JlLm1vZHVsZSc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDgzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCB7IEFnbU1hcCB9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXAnO1xuZXhwb3J0IHsgQWdtQ2lyY2xlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NpcmNsZSc7XG5leHBvcnQgeyBBZ21JbmZvV2luZG93IH0gZnJvbSAnLi9kaXJlY3RpdmVzL2luZm8td2luZG93JztcbmV4cG9ydCB7IEFnbUttbExheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ttbC1sYXllcic7XG5leHBvcnQgeyBBZ21EYXRhTGF5ZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGF0YS1sYXllcic7XG5leHBvcnQgeyBBZ21NYXJrZXIgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbWFya2VyJztcbmV4cG9ydCB7IEFnbVBvbHlnb24gfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWdvbic7XG5leHBvcnQgeyBBZ21Qb2x5bGluZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZSc7XG5leHBvcnQgeyBBZ21Qb2x5bGluZVBvaW50IH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlsaW5lLXBvaW50Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZXMuanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQGFnbS9jb3JlL2RpcmVjdGl2ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDg0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5leHBvcnQgeyBDaXJjbGVNYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlcic7XG5leHBvcnQgeyBJbmZvV2luZG93TWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMvaW5mby13aW5kb3ctbWFuYWdlcic7XG5leHBvcnQgeyBNYXJrZXJNYW5hZ2VyIH0gZnJvbSAnLi9zZXJ2aWNlcy9tYW5hZ2Vycy9tYXJrZXItbWFuYWdlcic7XG5leHBvcnQgeyBQb2x5Z29uTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyJztcbmV4cG9ydCB7IFBvbHlsaW5lTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbWFuYWdlcnMvcG9seWxpbmUtbWFuYWdlcic7XG5leHBvcnQgeyBLbWxMYXllck1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hbmFnZXJzL2ttbC1sYXllci1tYW5hZ2VyJztcbmV4cG9ydCB7IERhdGFMYXllck1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hbmFnZXJzL2RhdGEtbGF5ZXItbWFuYWdlcic7XG5leHBvcnQgeyBHb29nbGVNYXBzU2NyaXB0UHJvdG9jb2wsIExBWllfTUFQU19BUElfQ09ORklHLCBMYXp5TWFwc0FQSUxvYWRlciB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyJztcbmV4cG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuZXhwb3J0IHsgTm9PcE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9ub29wLW1hcHMtYXBpLWxvYWRlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJ2aWNlcy5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMuanNcbi8vIG1vZHVsZSBpZCA9IDg0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKlxuICogV2hlbiB1c2luZyB0aGUgTm9PcE1hcHNBUElMb2FkZXIsIHRoZSBHb29nbGUgTWFwcyBBUEkgbXVzdCBiZSBhZGRlZCB0byB0aGUgcGFnZSB2aWEgYSBgPHNjcmlwdD5gXG4gKiBUYWcuXG4gKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBHb29nbGUgTWFwcyBBUEkgc2NyaXB0IGdldHMgbG9hZGVkIGZpcnN0IG9uIHRoZSBwYWdlLlxuICovXG52YXIgTm9PcE1hcHNBUElMb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE5vT3BNYXBzQVBJTG9hZGVyKCkge1xuICAgIH1cbiAgICBOb09wTWFwc0FQSUxvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF3aW5kb3cuZ29vZ2xlIHx8ICF3aW5kb3cuZ29vZ2xlLm1hcHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignR29vZ2xlIE1hcHMgQVBJIG5vdCBsb2FkZWQgb24gcGFnZS4gTWFrZSBzdXJlIHdpbmRvdy5nb29nbGUubWFwcyBpcyBhdmFpbGFibGUhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIE5vT3BNYXBzQVBJTG9hZGVyO1xufSgpKTtcbmV4cG9ydCB7IE5vT3BNYXBzQVBJTG9hZGVyIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub29wLW1hcHMtYXBpLWxvYWRlci5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL25vb3AtbWFwcy1hcGktbG9hZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWdtTWFwIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcCc7XG5pbXBvcnQgeyBBZ21DaXJjbGUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2lyY2xlJztcbmltcG9ydCB7IEFnbUluZm9XaW5kb3cgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xuaW1wb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21hcmtlcic7XG5pbXBvcnQgeyBBZ21Qb2x5Z29uIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xuaW1wb3J0IHsgQWdtUG9seWxpbmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvcG9seWxpbmUnO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4vZGlyZWN0aXZlcy9wb2x5bGluZS1wb2ludCc7XG5pbXBvcnQgeyBBZ21LbWxMYXllciB9IGZyb20gJy4vZGlyZWN0aXZlcy9rbWwtbGF5ZXInO1xuaW1wb3J0IHsgQWdtRGF0YUxheWVyIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RhdGEtbGF5ZXInO1xuaW1wb3J0IHsgTGF6eU1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9sYXp5LW1hcHMtYXBpLWxvYWRlcic7XG5pbXBvcnQgeyBMQVpZX01BUFNfQVBJX0NPTkZJRyB9IGZyb20gJy4vc2VydmljZXMvbWFwcy1hcGktbG9hZGVyL2xhenktbWFwcy1hcGktbG9hZGVyJztcbmltcG9ydCB7IE1hcHNBUElMb2FkZXIgfSBmcm9tICcuL3NlcnZpY2VzL21hcHMtYXBpLWxvYWRlci9tYXBzLWFwaS1sb2FkZXInO1xuaW1wb3J0IHsgQlJPV1NFUl9HTE9CQUxTX1BST1ZJREVSUyB9IGZyb20gJy4vdXRpbHMvYnJvd3Nlci1nbG9iYWxzJztcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JlRGlyZWN0aXZlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBBZ21NYXAsIEFnbU1hcmtlciwgQWdtSW5mb1dpbmRvdywgQWdtQ2lyY2xlLFxuICAgICAgICBBZ21Qb2x5Z29uLCBBZ21Qb2x5bGluZSwgQWdtUG9seWxpbmVQb2ludCwgQWdtS21sTGF5ZXIsXG4gICAgICAgIEFnbURhdGFMYXllclxuICAgIF07XG59XG4vKipcbiAqIFRoZSBhbmd1bGFyLWdvb2dsZS1tYXBzIGNvcmUgbW9kdWxlLiBDb250YWlucyBhbGwgRGlyZWN0aXZlcy9TZXJ2aWNlcy9QaXBlc1xuICogb2YgdGhlIGNvcmUgbW9kdWxlLiBQbGVhc2UgdXNlIGBBZ21Db3JlTW9kdWxlLmZvclJvb3QoKWAgaW4geW91ciBhcHAgbW9kdWxlLlxuICovXG52YXIgQWdtQ29yZU1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQWdtQ29yZU1vZHVsZSgpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGxlYXNlIHVzZSB0aGlzIG1ldGhvZCB3aGVuIHlvdSByZWdpc3RlciB0aGUgbW9kdWxlIGF0IHRoZSByb290IGxldmVsLlxuICAgICAqL1xuICAgIEFnbUNvcmVNb2R1bGUuZm9yUm9vdCA9IGZ1bmN0aW9uIChsYXp5TWFwc0FQSUxvYWRlckNvbmZpZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFnbUNvcmVNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IEJST1dTRVJfR0xPQkFMU19QUk9WSURFUlMuY29uY2F0KFtcbiAgICAgICAgICAgICAgICB7IHByb3ZpZGU6IE1hcHNBUElMb2FkZXIsIHVzZUNsYXNzOiBMYXp5TWFwc0FQSUxvYWRlciB9LFxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogTEFaWV9NQVBTX0FQSV9DT05GSUcsIHVzZVZhbHVlOiBsYXp5TWFwc0FQSUxvYWRlckNvbmZpZyB9XG4gICAgICAgICAgICBdKSxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBBZ21Db3JlTW9kdWxlO1xufSgpKTtcbmV4cG9ydCB7IEFnbUNvcmVNb2R1bGUgfTtcbkFnbUNvcmVNb2R1bGUuZGVjb3JhdG9ycyA9IFtcbiAgICB7IHR5cGU6IE5nTW9kdWxlLCBhcmdzOiBbeyBkZWNsYXJhdGlvbnM6IGNvcmVEaXJlY3RpdmVzKCksIGV4cG9ydHM6IGNvcmVEaXJlY3RpdmVzKCkgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5BZ21Db3JlTW9kdWxlLmN0b3JQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW107IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLm1vZHVsZS5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AYWdtL2NvcmUvY29yZS5tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDg0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5cclxuaW1wb3J0IHsgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29sb3JzL2NvbG9ycy5zZXJ2aWNlJzsgXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FwcC13aWRnZXRzJyxcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3dpZGdldHMuY29tcG9uZW50Lmh0bWwnKSxcclxuICAgIHN0eWxlczogW3JlcXVpcmUoJy4vd2lkZ2V0cy5jb21wb25lbnQuc2NzcycpXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2lkZ2V0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgbGF0OiBudW1iZXIgPSAzMy43OTA4MDc7XHJcbiAgICBsbmc6IG51bWJlciA9IC0xMTcuODM1NzM0O1xyXG4gICAgem9vbTogbnVtYmVyID0gMTQ7XHJcbiAgICBzY3JvbGx3aGVlbCA9IGZhbHNlO1xyXG5cclxuICAgIFxyXG5cclxuICAgIHNwYXJrT3B0aW9uczIgPSB7XHJcbiAgICAgICAgdHlwZTogJ2xpbmUnLFxyXG4gICAgICAgIGhlaWdodDogODAsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBsaW5lV2lkdGg6IDIsXHJcbiAgICAgICAgbGluZUNvbG9yOiAnI2RkZGRkZCcsXHJcbiAgICAgICAgc3BvdENvbG9yOiAnI2JiYmJiYicsXHJcbiAgICAgICAgZmlsbENvbG9yOiAnJyxcclxuICAgICAgICBoaWdobGlnaHRMaW5lQ29sb3I6ICcjZmZmJyxcclxuICAgICAgICBzcG90UmFkaXVzOiAzLFxyXG4gICAgICAgIHJlc2l6ZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzcGFya09wdGlvbnMzID0ge1xyXG4gICAgICAgIGJhckNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgaGVpZ2h0OiA1MCxcclxuICAgICAgICBiYXJXaWR0aDogNixcclxuICAgICAgICBiYXJTcGFjaW5nOiA2XHJcbiAgICB9O1xyXG5cclxuICAgXHJcblxyXG5cclxuICAgIC8vIFNQTElORVxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHNwbGluZURhdGE6IGFueTtcclxuICAgIHNwbGluZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgc2VyaWVzOiB7XHJcbiAgICAgICAgICAgIGxpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IDRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3BsaW5lczoge1xyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbnNpb246IDAuNCxcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGZpbGw6IDAuNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2VlZScsXHJcbiAgICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxyXG4gICAgICAgICAgICBob3ZlcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmY2ZjZmMnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b29sdGlwOiB0cnVlLFxyXG4gICAgICAgIHRvb2x0aXBPcHRzOiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uIChsYWJlbCwgeCwgeSkgeyByZXR1cm4geCArICcgOiAnICsgeTsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeGF4aXM6IHtcclxuICAgICAgICAgICAgdGlja0NvbG9yOiAnI2ZjZmNmYycsXHJcbiAgICAgICAgICAgIG1vZGU6ICdjYXRlZ29yaWVzJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeWF4aXM6IHtcclxuICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICBtYXg6IDE1MCwgLy8gb3B0aW9uYWw6IHVzZSBpdCBmb3IgYSBjbGVhciByZXByZXNldGF0aW9uXHJcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJyNlZWUnLFxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbjogKGFwcC5sYXlvdXQuaXNSVEwgPyAncmlnaHQnIDogJ2xlZnQnKSxcclxuICAgICAgICAgICAgdGlja0Zvcm1hdHRlcjogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2LyogKyAnIHZpc2l0b3JzJyovO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzaGFkb3dTaXplOiAwXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICAgICAgICB0aGlzLmdldENoYXJ0RGF0YSgnYXNzZXRzL3NlcnZlci9jaGFydC9zcGxpbmUuanNvbicpLnN1YnNjcmliZShkYXRhID0+IHRoaXMuc3BsaW5lRGF0YSA9IGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJ0RGF0YSh1cmwpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJvdXRlci1sb2FkZXIvc3JjIS4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyLXRlbXBsYXRlLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvcm91dGVzL1dvcmtUaW1lcmVwb3J0L1dvcmtUaW1lcmVwb3J0L3dpZGdldHMuY29tcG9uZW50LnRzIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImNvbnRlbnQtaGVhZGluZ1xcXCI+V29yayBUaW1lIFJlcG9ydDwvZGl2PlxcclxcbjwhLS0gU1RBUlQgcm93LS0+XFxyXFxuPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTEyXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsIFdoaXRlQkdcXFwiIGlkPVxcXCJwYW5lbENoYXJ0OVxcXCI+XFxyXFxuICAgICAgICAgIFxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYW5lbC10aXRsZVxcXCI+IDxoMj5Zb3VyIHRpbWUgdHJlbmRzIDwvaDI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxwPiBZb3VyIHN0YXRzIGFyZSBiYXNlZCBvbiB5b3VyIGVtYWlsIGFuZCBjYWxlbmRhckhvdyB3ZSBjYWxjdWxhdGU8L3A+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFuZWwtd3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBmbG90IFtkYXRhc2V0XT1cXFwic3BsaW5lRGF0YVxcXCIgW29wdGlvbnNdPVxcXCJzcGxpbmVPcHRpb25zXFxcIiBoZWlnaHQ9XFxcIjMwMFxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcblxcclxcblxcclxcbjwvZGl2PlxcclxcblxcclxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9Xb3JrVGltZXJlcG9ydC9Xb3JrVGltZXJlcG9ydC93aWRnZXRzLmNvbXBvbmVudC5odG1sXG4vLyBtb2R1bGUgaWQgPSA4Njlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9DbGllbnRBcHAvYXBwL3JvdXRlcy9Xb3JrVGltZXJlcG9ydC9Xb3JrVGltZXJlcG9ydC93aWRnZXRzLmNvbXBvbmVudC5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4NzBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==