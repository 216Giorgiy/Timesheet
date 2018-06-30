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
var userblock_service_1 = require("./userblock.service");
var UserblockComponent = /** @class */ (function () {
    function UserblockComponent(userblockService) {
        this.userblockService = userblockService;
        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
    }
    UserblockComponent.prototype.ngOnInit = function () {
    };
    UserblockComponent.prototype.userBlockIsVisible = function () {
        return this.userblockService.getVisibility();
    };
    UserblockComponent = __decorate([
        core_1.Component({
            selector: 'app-userblock',
            templateUrl: './userblock.component.html',
            styleUrls: ['./userblock.component.scss']
        }),
        __metadata("design:paramtypes", [userblock_service_1.UserblockService])
    ], UserblockComponent);
    return UserblockComponent;
}());
exports.UserblockComponent = UserblockComponent;
//# sourceMappingURL=userblock.component.js.map