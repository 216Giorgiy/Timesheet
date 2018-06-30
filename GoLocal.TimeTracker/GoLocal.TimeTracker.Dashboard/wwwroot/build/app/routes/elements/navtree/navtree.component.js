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
var angular_tree_component_1 = require("angular-tree-component");
var actionMapping = {
    mouse: {
        contextMenu: function (tree, node, $event) {
            $event.preventDefault();
            alert("context menu for " + node.data.name);
        },
        dblClick: angular_tree_component_1.TREE_ACTIONS.TOGGLE_EXPANDED,
        click: function (tree, node, $event) {
            $event.shiftKey
                ? angular_tree_component_1.TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
                : angular_tree_component_1.TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
    },
    keys: (_a = {},
        _a[angular_tree_component_1.KEYS.ENTER] = function (tree, node, $event) { return alert("This is " + node.data.name); },
        _a)
};
var NavtreeComponent = /** @class */ (function () {
    function NavtreeComponent() {
        var _this = this;
        this.nodes = null;
        this.asyncChildren = [
            {
                name: 'child2.1',
                subTitle: 'new and improved'
            }, {
                name: 'child2.2',
                subTitle: 'new and improved2'
            }
        ];
        this.customTemplateStringOptions = {
            // displayField: 'subTitle',
            isExpandedField: 'expanded',
            idField: 'uuid',
            getChildren: this.getChildren.bind(this),
            actionMapping: actionMapping,
            allowDrag: true
        };
        setTimeout(function () {
            _this.nodes = [
                {
                    expanded: true,
                    name: 'root expanded',
                    subTitle: 'the root',
                    children: [
                        {
                            name: 'child1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {
                            name: 'child2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'root2',
                    subTitle: 'the second root',
                    children: [
                        {
                            name: 'child2.1',
                            subTitle: 'new and improved',
                            hasChildren: false
                        }, {
                            name: 'child2.2',
                            subTitle: 'new and improved2',
                            children: [
                                {
                                    uuid: 1001,
                                    name: 'subsub',
                                    subTitle: 'subsub',
                                    hasChildren: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }
            ];
        }, 1);
    }
    NavtreeComponent.prototype.onEvent = function (msg) {
        console.log(msg);
    };
    NavtreeComponent.prototype.ngOnInit = function () {
    };
    NavtreeComponent.prototype.getChildren = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.asyncChildren.map(function (c) {
                return Object.assign({}, c, {
                    hasChildren: node.level < 5
                });
            })); }, 1000);
        });
    };
    NavtreeComponent.prototype.addNode = function (tree) {
        this.nodes[0].children.push({
            name: 'a new child'
        });
        tree.treeModel.update();
    };
    NavtreeComponent.prototype.childrenCount = function (node) {
        return node && node.children ? "(" + node.children.length + ")" : '';
    };
    NavtreeComponent.prototype.filterNodes = function (text, tree) {
        tree.treeModel.filterNodes(text, true);
    };
    NavtreeComponent.prototype.activateSubSub = function (tree) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001)
            .setActiveAndVisible();
    };
    NavtreeComponent.prototype.go = function ($event) {
        $event.stopPropagation();
        alert('this method is on the app component');
    };
    NavtreeComponent = __decorate([
        core_1.Component({
            selector: 'app-navtree',
            templateUrl: './navtree.component.html',
            styleUrls: ['./navtree.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], NavtreeComponent);
    return NavtreeComponent;
}());
exports.NavtreeComponent = NavtreeComponent;
var _a;
//# sourceMappingURL=navtree.component.js.map