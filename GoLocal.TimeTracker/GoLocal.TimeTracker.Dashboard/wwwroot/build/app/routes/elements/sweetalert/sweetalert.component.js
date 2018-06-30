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
var swal = require('sweetalert');
var SweetalertComponent = /** @class */ (function () {
    function SweetalertComponent() {
    }
    SweetalertComponent.prototype.ngOnInit = function () { };
    SweetalertComponent.prototype.sweetalertDemo1 = function () {
        swal('Here\'s a message');
    };
    SweetalertComponent.prototype.sweetalertDemo2 = function () {
        swal('Here\'s a message!', 'It\'s pretty, isn\'t it?');
    };
    SweetalertComponent.prototype.sweetalertDemo3 = function () {
        swal('Good job!', 'You clicked the button!', 'success');
    };
    SweetalertComponent.prototype.sweetalertDemo4 = function () {
        swal({
            title: 'Are you sure?',
            text: 'Your will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false
        }, function () {
            swal('Booyah!');
        });
    };
    SweetalertComponent.prototype.sweetalertDemo5 = function () {
        swal({
            title: 'Are you sure?',
            text: 'Your will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel plx!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                swal('Deleted!', 'Your imaginary file has been deleted.', 'success');
            }
            else {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    SweetalertComponent.prototype.sweetalertDemo6 = function () {
        swal({
            title: 'Sweet!',
            text: 'Here\'s a custom image.',
            imageUrl: 'assets/img/user/01.jpg'
        });
    };
    SweetalertComponent = __decorate([
        core_1.Component({
            selector: 'app-sweetalert',
            templateUrl: './sweetalert.component.html',
            styleUrls: ['./sweetalert.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SweetalertComponent);
    return SweetalertComponent;
}());
exports.SweetalertComponent = SweetalertComponent;
//# sourceMappingURL=sweetalert.component.js.map