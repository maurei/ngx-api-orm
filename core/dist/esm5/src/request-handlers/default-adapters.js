/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Abstract } from './abstract-adapters';
import * as i0 from "@angular/core";
import * as i1 from "../resource.module";
/**
 * \@internal
 */
var SimpleAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(SimpleAdapter, _super);
    function SimpleAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleAdapter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ SimpleAdapter.ngInjectableDef = i0.defineInjectable({ factory: function SimpleAdapter_Factory() { return new i1.SimpleAdapter(); }, token: i1.SimpleAdapter, providedIn: "root" });
    return SimpleAdapter;
}(Abstract.SimpleAdapter));
export { SimpleAdapter };
/**
 * \@internal
 */
var ToOneAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(ToOneAdapter, _super);
    function ToOneAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToOneAdapter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ ToOneAdapter.ngInjectableDef = i0.defineInjectable({ factory: function ToOneAdapter_Factory() { return new i1.ToOneAdapter(); }, token: i1.ToOneAdapter, providedIn: "root" });
    return ToOneAdapter;
}(Abstract.ToOneAdapter));
export { ToOneAdapter };
/**
 * \@internal
 */
var ToManyAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(ToManyAdapter, _super);
    function ToManyAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToManyAdapter.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ ToManyAdapter.ngInjectableDef = i0.defineInjectable({ factory: function ToManyAdapter_Factory() { return new i1.ToManyAdapter(); }, token: i1.ToManyAdapter, providedIn: "root" });
    return ToManyAdapter;
}(Abstract.ToManyAdapter));
export { ToManyAdapter };
//# sourceMappingURL=default-adapters.js.map