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
var sortable_product_1 = require("./sortable.product");
var SortableComponent = /** @class */ (function () {
    function SortableComponent() {
        this.availableProducts = [];
        this.shoppingBasket = [];
        this.listOne = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
        this.listBoxers = ['Sugar Ray Robinson', 'Muhammad Ali', 'George Foreman', 'Joe Frazier', 'Jake LaMotta', 'Joe Louis', 'Jack Dempsey', 'Rocky Marciano', 'Mike Tyson', 'Oscar De La Hoya'];
        this.listTeamOne = [];
        this.listTeamTwo = [];
        this.initProducts();
    }
    SortableComponent.prototype.initProducts = function () {
        this.availableProducts.push(new sortable_product_1.Product('Blue Shoes', 3, 35));
        this.availableProducts.push(new sortable_product_1.Product('Good Jacket', 1, 90));
        this.availableProducts.push(new sortable_product_1.Product('Red Shirt', 5, 12));
        this.availableProducts.push(new sortable_product_1.Product('Blue Jeans', 4, 60));
    };
    SortableComponent.prototype.orderedProduct = function ($event) {
        var orderedProduct = $event.dragData;
        orderedProduct.quantity--;
    };
    SortableComponent.prototype.addToBasket = function ($event) {
        var newProduct = $event.dragData;
        for (var indx in this.shoppingBasket) {
            var product = this.shoppingBasket[indx];
            if (product.name === newProduct.name) {
                product.quantity++;
                return;
            }
        }
        console.log('adding ' + newProduct);
        this.shoppingBasket.push(new sortable_product_1.Product(newProduct.name, 1, newProduct.cost));
    };
    SortableComponent.prototype.totalCost = function () {
        var cost = 0;
        for (var indx in this.shoppingBasket) {
            var product = this.shoppingBasket[indx];
            cost += (product.cost * product.quantity);
        }
        return cost;
    };
    SortableComponent.prototype.resetBasket = function () {
        this.availableProducts = [];
        this.shoppingBasket = [];
        this.initProducts();
    };
    SortableComponent.prototype.ngOnInit = function () {
    };
    SortableComponent = __decorate([
        core_1.Component({
            selector: 'app-sortable',
            templateUrl: './sortable.component.html',
            styleUrls: ['./sortable.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], SortableComponent);
    return SortableComponent;
}());
exports.SortableComponent = SortableComponent;
//# sourceMappingURL=sortable.component.js.map