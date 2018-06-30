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
var InfinitescrollComponent = /** @class */ (function () {
    function InfinitescrollComponent() {
        this.array = [];
        this.sum = 100;
        this.array2 = [];
        this.sum2 = 100;
        for (var i = 0; i < this.sum; ++i) {
            this.array.push(i);
        }
        for (var i = 0; i < this.sum2; ++i) {
            this.array2.push(i);
        }
    }
    InfinitescrollComponent.prototype.onScrollDown = function () {
        console.log('scrolled!!');
        // add another 20 items
        var start = this.sum;
        this.sum += 50;
        for (var i = start; i < this.sum; ++i) {
            this.array.push(i);
        }
    };
    InfinitescrollComponent.prototype.onScrollDown2 = function () {
        console.log('scrolled 2!!');
        // add another 20 items
        var start = this.sum2;
        this.sum2 += 50;
        for (var i = start; i < this.sum2; ++i) {
            this.array2.push(i);
        }
    };
    InfinitescrollComponent.prototype.onScrollUp = function () {
        console.log('scrolled up!!');
    };
    InfinitescrollComponent.prototype.ngOnInit = function () {
    };
    InfinitescrollComponent = __decorate([
        core_1.Component({
            selector: 'app-infinitescroll',
            templateUrl: './infinitescroll.component.html',
            styleUrls: ['./infinitescroll.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], InfinitescrollComponent);
    return InfinitescrollComponent;
}());
exports.InfinitescrollComponent = InfinitescrollComponent;
//# sourceMappingURL=infinitescroll.component.js.map