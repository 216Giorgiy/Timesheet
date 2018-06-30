"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular_tree_component_1 = require("angular-tree-component");
var ng2_dnd_1 = require("ng2-dnd");
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var shared_module_1 = require("../../shared/shared.module");
var buttons_component_1 = require("./buttons/buttons.component");
var spinners_component_1 = require("./spinners/spinners.component");
var dropdown_component_1 = require("./dropdown/dropdown.component");
var grid_component_1 = require("./grid/grid.component");
var gridmasonry_component_1 = require("./gridmasonry/gridmasonry.component");
var typography_component_1 = require("./typography/typography.component");
var iconsfont_component_1 = require("./iconsfont/iconsfont.component");
var iconsweather_component_1 = require("./iconsweather/iconsweather.component");
var colors_component_1 = require("./colors/colors.component");
var interaction_component_1 = require("./interaction/interaction.component");
var notification_component_1 = require("./notification/notification.component");
var navtree_component_1 = require("./navtree/navtree.component");
var sortable_component_1 = require("./sortable/sortable.component");
var infinitescroll_component_1 = require("./infinitescroll/infinitescroll.component");
var sweetalert_component_1 = require("./sweetalert/sweetalert.component");
var routes = [
    { path: 'buttons', component: buttons_component_1.ButtonsComponent },
    { path: 'interaction', component: interaction_component_1.InteractionComponent },
    { path: 'notification', component: notification_component_1.NotificationComponent },
    { path: 'sweetalert', component: sweetalert_component_1.SweetalertComponent },
    { path: 'spinners', component: spinners_component_1.SpinnersComponent },
    { path: 'dropdown', component: dropdown_component_1.DropdownComponent },
    { path: 'navtree', component: navtree_component_1.NavtreeComponent },
    { path: 'sortable', component: sortable_component_1.SortableComponent },
    { path: 'grid', component: grid_component_1.GridComponent },
    { path: 'gridmasonry', component: gridmasonry_component_1.GridmasonryComponent },
    { path: 'typography', component: typography_component_1.TypographyComponent },
    { path: 'iconsfont', component: iconsfont_component_1.IconsfontComponent },
    { path: 'iconsweather', component: iconsweather_component_1.IconsweatherComponent },
    { path: 'colors', component: colors_component_1.ColorsComponent },
    { path: 'infinitescroll', component: infinitescroll_component_1.InfinitescrollComponent }
];
var ElementsModule = /** @class */ (function () {
    function ElementsModule() {
    }
    ElementsModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes),
                angular_tree_component_1.TreeModule,
                ng2_dnd_1.DndModule.forRoot(),
                ngx_infinite_scroll_1.InfiniteScrollModule
            ],
            declarations: [
                buttons_component_1.ButtonsComponent,
                spinners_component_1.SpinnersComponent,
                dropdown_component_1.DropdownComponent,
                grid_component_1.GridComponent,
                gridmasonry_component_1.GridmasonryComponent,
                typography_component_1.TypographyComponent,
                iconsfont_component_1.IconsfontComponent,
                iconsweather_component_1.IconsweatherComponent,
                colors_component_1.ColorsComponent,
                interaction_component_1.InteractionComponent,
                notification_component_1.NotificationComponent,
                navtree_component_1.NavtreeComponent,
                sortable_component_1.SortableComponent,
                infinitescroll_component_1.InfinitescrollComponent,
                sweetalert_component_1.SweetalertComponent
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], ElementsModule);
    return ElementsModule;
}());
exports.ElementsModule = ElementsModule;
//# sourceMappingURL=elements.module.js.map