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
var EasyPieChart = require('easy-pie-chart/dist/easypiechart.js');
var EasypiechartDirective = /** @class */ (function () {
    function EasypiechartDirective(element) {
        this.element = element;
        /**
         * default easy pie chart options
         * @type {Object}
         */
        this.defaultOptions = {
            barColor: '#ef1e25',
            trackColor: '#f9f9f9',
            scaleColor: '#dfe0e0',
            scaleLength: 5,
            lineCap: 'round',
            lineWidth: 3,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1000,
                enabled: true
            }
        };
        this.percent = this.percent || 0;
        this.options = $.extend({}, this.defaultOptions, this.options);
    }
    EasypiechartDirective.prototype.ngOnInit = function () {
        if (EasyPieChart) {
            this.pieChart = new EasyPieChart(this.element.nativeElement, this.options);
            this.pieChart.update(this.percent);
        }
    };
    EasypiechartDirective.prototype.ngOnChanges = function (changes) {
        if (this.pieChart && changes['percent']) {
            this.pieChart.update(this.percent);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EasypiechartDirective.prototype, "percent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], EasypiechartDirective.prototype, "options", void 0);
    EasypiechartDirective = __decorate([
        core_1.Directive({
            selector: '[easypiechart]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], EasypiechartDirective);
    return EasypiechartDirective;
}());
exports.EasypiechartDirective = EasypiechartDirective;
//# sourceMappingURL=easypiechart.directive.js.map