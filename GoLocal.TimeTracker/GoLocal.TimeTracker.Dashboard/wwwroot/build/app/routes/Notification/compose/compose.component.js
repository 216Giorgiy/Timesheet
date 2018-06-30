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
var ComposeComponent = /** @class */ (function () {
    function ComposeComponent() {
        this.showCC = false;
        this.showBCC = false;
    }
    ComposeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Summernote is currently not ported as a native angular2 module
        // For a quick use it we use the component a wrapper
        // Plugin events can be used to keep component props
        // in sync with the editor content
        $('#summernote').summernote({
            height: 230,
            dialogsInBody: true,
            callbacks: {
                onChange: function (contents, $editable) {
                    _this.contents = contents;
                    // console.log(contents);
                }
            }
        });
    };
    ComposeComponent = __decorate([
        core_1.Component({
            selector: 'app-compose',
            templateUrl: './compose.component.html',
            styleUrls: ['./compose.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], ComposeComponent);
    return ComposeComponent;
}());
exports.ComposeComponent = ComposeComponent;
//# sourceMappingURL=compose.component.js.map