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
var VectormapDirective = /** @class */ (function () {
    function VectormapDirective(element) {
        this.element = element;
    }
    VectormapDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.$element = $(this.element.nativeElement);
        this.$element.css('height', this.mapHeight);
        if (!this.$element.vectorMap) {
            return;
        }
        this.$element.vectorMap({
            map: this.mapName,
            backgroundColor: this.mapOptions.bgColor,
            zoomMin: 1,
            zoomMax: 8,
            zoomOnScroll: false,
            regionStyle: {
                initial: {
                    'fill': this.mapOptions.regionFill,
                    'fill-opacity': 1,
                    'stroke': 'none',
                    'stroke-width': 1.5,
                    'stroke-opacity': 1
                },
                hover: {
                    'fill-opacity': 0.8
                },
                selected: {
                    fill: 'blue'
                },
                selectedHover: {}
            },
            focusOn: { x: 0.4, y: 0.6, scale: this.mapOptions.scale },
            markerStyle: {
                initial: {
                    fill: this.mapOptions.markerColor,
                    stroke: this.mapOptions.markerColor
                }
            },
            onRegionLabelShow: function (e, el, code) {
                if (_this.seriesData && _this.seriesData[code]) {
                    el.html(el.html() + ': ' + _this.seriesData[code] + ' visitors');
                }
            },
            markers: this.markersData,
            series: {
                regions: [{
                        values: this.seriesData,
                        scale: this.mapOptions.scaleColors,
                        normalizeFunction: 'polynomial'
                    }]
            },
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], VectormapDirective.prototype, "mapHeight", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VectormapDirective.prototype, "mapName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VectormapDirective.prototype, "mapOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VectormapDirective.prototype, "seriesData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VectormapDirective.prototype, "markersData", void 0);
    VectormapDirective = __decorate([
        core_1.Directive({
            selector: '[vectormap]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], VectormapDirective);
    return VectormapDirective;
}());
exports.VectormapDirective = VectormapDirective;
//# sourceMappingURL=vectormap.directive.js.map