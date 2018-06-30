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
var JqcloudDirective = /** @class */ (function () {
    function JqcloudDirective(element) {
        this.initialized = false; // flag to not update before plugin was initialized
        this.$elem = $(element.nativeElement);
        this.options = $.fn.jQCloud.defaults.get();
    }
    JqcloudDirective.prototype.ngOnInit = function () {
        var opts = {};
        if (this.width) {
            opts.width = this.width;
        }
        if (this.height) {
            opts.height = this.height;
        }
        if (this.steps) {
            opts.steps = this.steps;
        }
        $.extend(this.options, opts);
        this.$elem.jQCloud(this.words, opts);
        this.initialized = true;
    };
    JqcloudDirective.prototype.ngOnChanges = function (changes) {
        if (this.initialized && this.words && changes['words']) {
            this.$elem.jQCloud('update', this.words);
        }
    };
    JqcloudDirective.prototype.ngOnDestroy = function () {
        this.$elem.jQCloud('destroy');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JqcloudDirective.prototype, "words", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JqcloudDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JqcloudDirective.prototype, "height", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], JqcloudDirective.prototype, "steps", void 0);
    JqcloudDirective = __decorate([
        core_1.Directive({
            selector: '[jqcloud]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], JqcloudDirective);
    return JqcloudDirective;
}());
exports.JqcloudDirective = JqcloudDirective;
//# sourceMappingURL=jqcloud.directive.js.map