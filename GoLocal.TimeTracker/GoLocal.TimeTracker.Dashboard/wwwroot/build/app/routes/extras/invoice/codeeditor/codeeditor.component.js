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
var http_1 = require("@angular/common/http");
var CodeMirror = require("codemirror");
var settings_service_1 = require("../../../../core/settings/settings.service");
var CodeeditorComponent = /** @class */ (function () {
    function CodeeditorComponent(settings, http) {
        var _this = this;
        this.settings = settings;
        this.http = http;
        this.nodes = null;
        this.customTemplateStringOptions = {
            isExpandedField: 'expanded',
        };
        this.editorThemes = ['3024-day', '3024-night', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant', 'erlang-dark', 'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'solarized', 'the-matrix', 'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'];
        this.editorOpts = {
            mode: 'javascript',
            lineNumbers: true,
            matchBrackets: true,
            theme: 'mbo',
            viewportMargin: Infinity
        };
        this.linkForThemes = null;
        this.code = '// Open a file from the left menu \n' +
            '// It will be requested to the server and loaded into the editor\n' +
            '// Also try adding a New File from the toolbar\n';
        this.settings.layout.useFullLayout = true;
        this.settings.layout.hiddenFooter = true;
        this.settings.layout.isCollapsed = true;
        this.http.get('assets/codemirror/filetree.json')
            .subscribe(function (data) { return _this.nodes = data; });
    }
    CodeeditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.instance = CodeMirror.fromTextArea(this.editor.nativeElement, this.editorOpts);
        this.updateEditor();
        this.instance.on('change', function () {
            _this.code = _this.instance.getValue();
        });
        this.loadTheme(); // load default theme
    };
    CodeeditorComponent.prototype.updateEditor = function () {
        this.instance.setValue(this.code);
    };
    CodeeditorComponent.prototype.loadTheme = function () {
        var themesBase = 'assets/codemirror/theme/';
        if (!this.linkForThemes) {
            this.linkForThemes = this.createCSS(themesBase + this.editorOpts.theme + '.css');
        }
        else {
            this.linkForThemes.setAttribute('href', themesBase + this.editorOpts.theme + '.css');
        }
        this.instance.setOption('theme', this.editorOpts.theme);
    };
    ;
    CodeeditorComponent.prototype.createCSS = function (path) {
        var link = document.createElement('link');
        link.href = path;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.id = 'cm_theme';
        return document.getElementsByTagName('head')[0].appendChild(link);
    };
    CodeeditorComponent.prototype.onSelectFile = function ($ev) {
        var _this = this;
        var sourcesBase = 'assets/codemirror/';
        var node = $ev.node;
        if (node.data.path) {
            this.http.get(sourcesBase + node.data.path, { responseType: 'text' })
                .subscribe(function (data) {
                console.log('Loaded.. ' + node.data.path);
                _this.code = data; // set the new code into the editor
                _this.updateEditor();
                _this.editorOpts.mode = _this.detectMode(node.data.path);
                console.log('Mode is: ' + _this.editorOpts.mode);
            });
        }
    };
    CodeeditorComponent.prototype.detectMode = function (file) {
        var ext = file.split('.');
        ext = ext ? ext[ext.length - 1] : '';
        switch (ext) {
            case 'html': return 'htmlmixed';
            case 'css': return 'css';
            default: return 'typescript';
        }
    };
    CodeeditorComponent.prototype.childrenCount = function (node) {
        return node && node.children ? "(" + node.children.length + ")" : '';
    };
    CodeeditorComponent.prototype.addNode = function (tree) {
        this.nodes[0].children.push({
            'name': 'another.html',
            'path': 'source/another.html'
        });
        tree.treeModel.update();
    };
    CodeeditorComponent.prototype.ngOnDestroy = function () {
        this.settings.layout.useFullLayout = false;
        this.settings.layout.hiddenFooter = false;
        this.settings.layout.isCollapsed = false;
        // remove link tag
        this.linkForThemes.parentNode.removeChild(this.linkForThemes);
    };
    __decorate([
        core_1.ViewChild('editor'),
        __metadata("design:type", Object)
    ], CodeeditorComponent.prototype, "editor", void 0);
    CodeeditorComponent = __decorate([
        core_1.Component({
            selector: 'app-codeeditor',
            templateUrl: './codeeditor.component.html',
            styleUrls: ['./codeeditor.component.scss']
        }),
        __metadata("design:paramtypes", [settings_service_1.SettingsService, http_1.HttpClient])
    ], CodeeditorComponent);
    return CodeeditorComponent;
}());
exports.CodeeditorComponent = CodeeditorComponent;
//# sourceMappingURL=codeeditor.component.js.map