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
var ButtonsComponent = /** @class */ (function () {
    function ButtonsComponent() {
        // buttons
        this.singleModel = true;
        this.radioModel = 'Middle';
        this.checkModel = { left: false, middle: true, right: false };
        // pagination/pager
        this.totalItems = 64;
        this.currentPage = 4;
        this.maxSize = 5;
        this.bigTotalItems = 175;
        this.bigCurrentPage = 1;
    }
    ButtonsComponent.prototype.setPage = function (pageNo) {
        this.currentPage = pageNo;
    };
    ;
    ButtonsComponent.prototype.pageChanged = function (event) {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    };
    ;
    ButtonsComponent.prototype.ngOnInit = function () {
    };
    ButtonsComponent = __decorate([
        core_1.Component({
            selector: 'app-buttons',
            templateUrl: './buttons.component.html',
            styleUrls: ['./buttons.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ButtonsComponent);
    return ButtonsComponent;
}());
exports.ButtonsComponent = ButtonsComponent;
//# sourceMappingURL=buttons.component.js.map