"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://angular.io/styleguide#!#04-12
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}
exports.throwIfAlreadyLoaded = throwIfAlreadyLoaded;
//# sourceMappingURL=module-import-guard.js.map