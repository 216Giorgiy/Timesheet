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
var FlotDirective = /** @class */ (function () {
    function FlotDirective(el) {
        this.el = el;
        this.ready = new core_1.EventEmitter();
        this.element = $(this.el.nativeElement);
        if (!$.plot) {
            console.log('Flot chart no available.');
        }
        this.plot = null;
    }
    FlotDirective.prototype.ngOnInit = function () { };
    FlotDirective.prototype.ngOnChanges = function (changes) {
        if (!$.plot) {
            return;
        }
        if (changes['dataset']) {
            this.onDatasetChanged(this.dataset);
        }
        if (changes['series']) {
            this.onSerieToggled(this.series);
        }
    };
    FlotDirective.prototype.init = function () {
        var heightDefault = 220;
        this.width = this.attrWidth || '100%';
        this.height = this.height || heightDefault;
        this.element.css({
            width: this.width,
            height: this.height
        });
        var plotObj;
        if (!this.dataset || !this.options) {
            return;
        }
        plotObj = $.plot(this.el.nativeElement, this.dataset, this.options);
        if (this.ready) {
            this.ready.next({ plot: plotObj });
        }
        return plotObj;
    };
    FlotDirective.prototype.onDatasetChanged = function (dataset) {
        if (this.plot) {
            this.plot.setData(dataset);
            this.plot.setupGrid();
            return this.plot.draw();
        }
        else {
            this.plot = this.init();
            this.onSerieToggled(this.series);
            return this.plot;
        }
    };
    FlotDirective.prototype.onSerieToggled = function (series) {
        if (!this.plot || !series) {
            return;
        }
        var someData = this.plot.getData();
        for (var sName in series) {
            series[sName].forEach(toggleFor(sName));
        }
        this.plot.setData(someData);
        this.plot.draw();
        function toggleFor(sName) {
            return function (s, i) {
                if (someData[i] && someData[i][sName]) {
                    someData[i][sName].show = s;
                }
            };
        }
    };
    FlotDirective.prototype.ngOnDestroy = function () {
        if (this.plot) {
            this.plot.shutdown();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FlotDirective.prototype, "dataset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FlotDirective.prototype, "options", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FlotDirective.prototype, "attrWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FlotDirective.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FlotDirective.prototype, "series", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FlotDirective.prototype, "ready", void 0);
    FlotDirective = __decorate([
        core_1.Directive({
            selector: '[flot]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], FlotDirective);
    return FlotDirective;
}());
exports.FlotDirective = FlotDirective;
//# sourceMappingURL=flot.directive.js.map