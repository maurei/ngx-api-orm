/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ResourceModuleConfiguration } from '../utils';
import { HttpClient } from '@angular/common/http';
import { Abstract } from './abstract-builders';
import * as i0 from "@angular/core";
import * as i1 from "../resource.module";
import * as i2 from "@angular/common/http";
/**
 * \@internal
 */
var SimpleBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleBuilder, _super);
    function SimpleBuilder(_http, _config) {
        return _super.call(this, _http, _config) || this;
    }
    SimpleBuilder.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    SimpleBuilder.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ResourceModuleConfiguration }
    ]; };
    /** @nocollapse */ SimpleBuilder.ngInjectableDef = i0.defineInjectable({ factory: function SimpleBuilder_Factory() { return new i1.SimpleBuilder(i0.inject(i2.HttpClient), i0.inject(i1.ResourceModuleConfiguration)); }, token: i1.SimpleBuilder, providedIn: "root" });
    return SimpleBuilder;
}(Abstract.SimpleBuilder));
export { SimpleBuilder };
/**
 * \@internal
 */
var ToOneBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(ToOneBuilder, _super);
    function ToOneBuilder(_http, _config) {
        return _super.call(this, _http, _config) || this;
    }
    ToOneBuilder.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ToOneBuilder.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ResourceModuleConfiguration }
    ]; };
    /** @nocollapse */ ToOneBuilder.ngInjectableDef = i0.defineInjectable({ factory: function ToOneBuilder_Factory() { return new i1.ToOneBuilder(i0.inject(i2.HttpClient), i0.inject(i1.ResourceModuleConfiguration)); }, token: i1.ToOneBuilder, providedIn: "root" });
    return ToOneBuilder;
}(Abstract.ToOneBuilder));
export { ToOneBuilder };
/**
 * \@internal
 */
var ToManyBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(ToManyBuilder, _super);
    function ToManyBuilder(_http, _config) {
        return _super.call(this, _http, _config) || this;
    }
    ToManyBuilder.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ToManyBuilder.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ResourceModuleConfiguration }
    ]; };
    /** @nocollapse */ ToManyBuilder.ngInjectableDef = i0.defineInjectable({ factory: function ToManyBuilder_Factory() { return new i1.ToManyBuilder(i0.inject(i2.HttpClient), i0.inject(i1.ResourceModuleConfiguration)); }, token: i1.ToManyBuilder, providedIn: "root" });
    return ToManyBuilder;
}(Abstract.ToManyBuilder));
export { ToManyBuilder };
//# sourceMappingURL=default-builders.js.map