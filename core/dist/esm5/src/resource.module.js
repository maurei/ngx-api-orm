/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import 'reflect-metadata';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Resource } from './resource.core';
import { Field, ToMany, ToOne, Model } from './resource.decorators';
import { ToManyRelation } from './relations/to-many';
import { ToOneRelation } from './relations/to-one';
import { InjectorContainer, ResourceModuleConfiguration, ResourceModuleConfigurationWithProviders, toPlural, toDash, toPluralDash, HttpVerb, METAKEYS } from './utils';
import { Abstract as AbstractAdapters } from './request-handlers/abstract-adapters';
import { Abstract as AbstractBuilders } from './request-handlers/abstract-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
/**
 * \@internal
 */
var ResourceRootModule = /** @class */ (function () {
    function ResourceRootModule(injector) {
        InjectorContainer["instance"] = injector;
    }
    ResourceRootModule.decorators = [
        { type: NgModule, args: [{ imports: [HttpClientModule] },] }
    ];
    /** @nocollapse */
    ResourceRootModule.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return ResourceRootModule;
}());
export { ResourceRootModule };
var ResourceModule = /** @class */ (function () {
    function ResourceModule() {
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    ResourceModule.forRoot = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var config = [{ provide: ResourceModuleConfiguration, useValue: { rootPath: options.rootPath } }];
        return {
            ngModule: ResourceRootModule,
            providers: config.concat(options.requestHandler || [])
        };
    };
    ResourceModule.decorators = [
        { type: NgModule, args: [{ imports: [HttpClientModule] },] }
    ];
    return ResourceModule;
}());
export { ResourceModule, Resource, Field, ToOne, ToMany, Model, ToManyRelation, ToOneRelation, AbstractAdapters, AbstractBuilders, ResourceModuleConfigurationWithProviders, ToManyAdapter, ToOneAdapter, SimpleAdapter, ToManyBuilder, ToOneBuilder, SimpleBuilder, ResourceModuleConfiguration, toPlural, toDash, toPluralDash, HttpVerb, METAKEYS };
//# sourceMappingURL=resource.module.js.map