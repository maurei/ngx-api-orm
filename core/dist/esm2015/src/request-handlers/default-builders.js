/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class SimpleBuilder extends Abstract.SimpleBuilder {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        super(_http, _config);
    }
}
SimpleBuilder.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
SimpleBuilder.ctorParameters = () => [
    { type: HttpClient },
    { type: ResourceModuleConfiguration }
];
/** @nocollapse */ SimpleBuilder.ngInjectableDef = i0.defineInjectable({ factory: function SimpleBuilder_Factory() { return new i1.SimpleBuilder(i0.inject(i2.HttpClient), i0.inject(i1.ResourceModuleConfiguration)); }, token: i1.SimpleBuilder, providedIn: "root" });
/**
 * \@internal
 */
export class ToOneBuilder extends Abstract.ToOneBuilder {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        super(_http, _config);
    }
}
ToOneBuilder.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ToOneBuilder.ctorParameters = () => [
    { type: HttpClient },
    { type: ResourceModuleConfiguration }
];
/** @nocollapse */ ToOneBuilder.ngInjectableDef = i0.defineInjectable({ factory: function ToOneBuilder_Factory() { return new i1.ToOneBuilder(i0.inject(i2.HttpClient), i0.inject(i1.ResourceModuleConfiguration)); }, token: i1.ToOneBuilder, providedIn: "root" });
/**
 * \@internal
 */
export class ToManyBuilder extends Abstract.ToManyBuilder {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        super(_http, _config);
    }
}
ToManyBuilder.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ToManyBuilder.ctorParameters = () => [
    { type: HttpClient },
    { type: ResourceModuleConfiguration }
];
/** @nocollapse */ ToManyBuilder.ngInjectableDef = i0.defineInjectable({ factory: function ToManyBuilder_Factory() { return new i1.ToManyBuilder(i0.inject(i2.HttpClient), i0.inject(i1.ResourceModuleConfiguration)); }, token: i1.ToManyBuilder, providedIn: "root" });
//# sourceMappingURL=default-builders.js.map