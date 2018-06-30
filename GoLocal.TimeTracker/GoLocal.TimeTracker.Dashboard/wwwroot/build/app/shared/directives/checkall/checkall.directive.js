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
var CheckallDirective = /** @class */ (function () {
    function CheckallDirective(el) {
        this.el = el;
        var $element = $(el.nativeElement);
        $element.on('change', function () {
            var index = $element.index() + 1, checkbox = $element.find('input[type="checkbox"]'), table = $element.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                .prop('checked', checkbox[0].checked);
        });
    }
    CheckallDirective = __decorate([
        core_1.Directive({
            selector: '[checkAll]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], CheckallDirective);
    return CheckallDirective;
}());
exports.CheckallDirective = CheckallDirective;
//# sourceMappingURL=checkall.directive.js.map