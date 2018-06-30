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
var forms_1 = require("@angular/forms");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var moment = require("moment");
var InteractionComponent = /** @class */ (function () {
    // CONSTRUCTOR
    function InteractionComponent() {
        var _this = this;
        // CAROUSEL PROPS
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.slides = [];
        // TYPEAHEAD PROPS
        this.stateCtrl = new forms_1.FormControl();
        this.myForm = new forms_1.FormGroup({
            state: this.stateCtrl
        });
        this.customSelected = '';
        this.selected = '';
        this.asyncSelected = '';
        this.typeaheadLoading = false;
        this.typeaheadNoResults = false;
        this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
            'California', 'Colorado',
            'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
            'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico',
            'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
            'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington',
            'West Virginia', 'Wisconsin', 'Wyoming'];
        this.statesComplex = [
            { id: 1, name: 'Alabama' }, { id: 2, name: 'Alaska' }, { id: 3, name: 'Arizona' },
            { id: 4, name: 'Arkansas' }, { id: 5, name: 'California' },
            { id: 6, name: 'Colorado' }, { id: 7, name: 'Connecticut' },
            { id: 8, name: 'Delaware' }, { id: 9, name: 'Florida' },
            { id: 10, name: 'Georgia' }, { id: 11, name: 'Hawaii' },
            { id: 12, name: 'Idaho' }, { id: 13, name: 'Illinois' },
            { id: 14, name: 'Indiana' }, { id: 15, name: 'Iowa' },
            { id: 16, name: 'Kansas' }, { id: 17, name: 'Kentucky' },
            { id: 18, name: 'Louisiana' }, { id: 19, name: 'Maine' },
            { id: 21, name: 'Maryland' }, { id: 22, name: 'Massachusetts' },
            { id: 23, name: 'Michigan' }, { id: 24, name: 'Minnesota' },
            { id: 25, name: 'Mississippi' }, { id: 26, name: 'Missouri' },
            { id: 27, name: 'Montana' }, { id: 28, name: 'Nebraska' },
            { id: 29, name: 'Nevada' }, { id: 30, name: 'New Hampshire' },
            { id: 31, name: 'New Jersey' }, { id: 32, name: 'New Mexico' },
            { id: 33, name: 'New York' }, { id: 34, name: 'North Dakota' },
            { id: 35, name: 'North Carolina' }, { id: 36, name: 'Ohio' },
            { id: 37, name: 'Oklahoma' }, { id: 38, name: 'Oregon' },
            { id: 39, name: 'Pennsylvania' }, { id: 40, name: 'Rhode Island' },
            { id: 41, name: 'South Carolina' }, { id: 42, name: 'South Dakota' },
            { id: 43, name: 'Tennessee' }, { id: 44, name: 'Texas' },
            { id: 45, name: 'Utah' }, { id: 46, name: 'Vermont' },
            { id: 47, name: 'Virginia' }, { id: 48, name: 'Washington' },
            { id: 49, name: 'West Virginia' }, { id: 50, name: 'Wisconsin' },
            { id: 51, name: 'Wyoming' }
        ];
        // CALENDAR PROPS
        this.dt = new Date();
        this.minDate = void 0;
        this.formats = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
        this.format = this.formats[0];
        this.dateOptions = {
            formatYear: 'YY',
            startingDay: 1
        };
        this.opened = false;
        // TIMEPICKER PROPS
        this.hstep = 1;
        this.mstep = 15;
        this.ismeridian = true;
        this.isEnabled = true;
        this.mytime = new Date();
        this.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };
        // init carousel
        this.addSlide(4);
        this.addSlide(7);
        this.addSlide(8);
        // init typeahead
        this.dataSource = Observable_1.Observable.create(function (observer) {
            // Runs on every search
            observer.next(_this.asyncSelected);
        }).mergeMap(function (token) { return _this.getStatesAsObservable(token); });
        // init calendar
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
        (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
        this.events = [
            { date: this.tomorrow, status: 'full' },
            { date: this.afterTomorrow, status: 'partially' }
        ];
    }
    InteractionComponent.prototype.ngOnInit = function () { };
    // CAROUSEL METHODS
    InteractionComponent.prototype.addSlide = function (id) {
        if (id === void 0) { id = 8; }
        this.slides.push({
            image: 'assets/img/bg' + id + '.jpg',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4] + "\n      " + ['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]
        });
    };
    // TYPEAHEAD METHODS
    InteractionComponent.prototype.getStatesAsObservable = function (token) {
        var query = new RegExp(token, 'ig');
        return Observable_1.Observable.of(this.statesComplex.filter(function (state) {
            return query.test(state.name);
        }));
    };
    InteractionComponent.prototype.changeTypeaheadLoading = function (e) {
        this.typeaheadLoading = e;
    };
    InteractionComponent.prototype.changeTypeaheadNoResults = function (e) {
        this.typeaheadNoResults = e;
    };
    InteractionComponent.prototype.typeaheadOnSelect = function (e) {
        console.log('Selected value: ', e.item);
    };
    // CALENDAR METHODS
    InteractionComponent.prototype.getDate = function () {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    InteractionComponent.prototype.today = function () {
        this.dt = new Date();
    };
    InteractionComponent.prototype.d20090824 = function () {
        this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
    };
    // todo: implement custom class cases
    InteractionComponent.prototype.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
            for (var i = 0; i < this.events.length; i++) {
                var currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);
                if (dayToCheck === currentDay) {
                    return this.events[i].status;
                }
            }
        }
        return '';
    };
    InteractionComponent.prototype.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };
    InteractionComponent.prototype.open = function () {
        this.opened = !this.opened;
    };
    InteractionComponent.prototype.clear = function () {
        this.dt = void 0;
    };
    InteractionComponent.prototype.toggleMin = function () {
        this.dt = new Date(this.minDate.valueOf());
    };
    // TIMEPICKER METHODS
    InteractionComponent.prototype.toggleMode = function () {
        this.ismeridian = !this.ismeridian;
    };
    ;
    InteractionComponent.prototype.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        this.mytime = d;
    };
    ;
    InteractionComponent.prototype.changed = function () {
        console.log('Time changed to: ' + this.mytime);
    };
    ;
    InteractionComponent.prototype.clearTP = function () {
        this.mytime = void 0;
    };
    ;
    InteractionComponent = __decorate([
        core_1.Component({
            selector: 'app-interaction',
            templateUrl: './interaction.component.html',
            styleUrls: ['./interaction.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], InteractionComponent);
    return InteractionComponent;
}());
exports.InteractionComponent = InteractionComponent;
//# sourceMappingURL=interaction.component.js.map