/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Abstract } from './abstract-adapters';
import * as i0 from "@angular/core";
import * as i1 from "../resource.module";
/**
 * \@internal
 */
export class SimpleAdapter extends Abstract.SimpleAdapter {
}
SimpleAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ SimpleAdapter.ngInjectableDef = i0.defineInjectable({ factory: function SimpleAdapter_Factory() { return new i1.SimpleAdapter(); }, token: i1.SimpleAdapter, providedIn: "root" });
/**
 * \@internal
 */
export class ToOneAdapter extends Abstract.ToOneAdapter {
}
ToOneAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ ToOneAdapter.ngInjectableDef = i0.defineInjectable({ factory: function ToOneAdapter_Factory() { return new i1.ToOneAdapter(); }, token: i1.ToOneAdapter, providedIn: "root" });
/**
 * \@internal
 */
export class ToManyAdapter extends Abstract.ToManyAdapter {
}
ToManyAdapter.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ ToManyAdapter.ngInjectableDef = i0.defineInjectable({ factory: function ToManyAdapter_Factory() { return new i1.ToManyAdapter(); }, token: i1.ToManyAdapter, providedIn: "root" });
//# sourceMappingURL=default-adapters.js.map