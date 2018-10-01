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
export class ResourceRootModule {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        InjectorContainer["instance"] = injector;
    }
}
ResourceRootModule.decorators = [
    { type: NgModule, args: [{ imports: [HttpClientModule] },] }
];
/** @nocollapse */
ResourceRootModule.ctorParameters = () => [
    { type: Injector }
];
class ResourceModule {
    /**
     * @param {?=} options
     * @return {?}
     */
    static forRoot(options = {}) {
        /** @type {?} */
        const config = [{ provide: ResourceModuleConfiguration, useValue: { rootPath: options.rootPath } }];
        return {
            ngModule: ResourceRootModule,
            providers: config.concat(options.requestHandler || [])
        };
    }
}
ResourceModule.decorators = [
    { type: NgModule, args: [{ imports: [HttpClientModule] },] }
];
export { ResourceModule, Resource, Field, ToOne, ToMany, Model, ToManyRelation, ToOneRelation, AbstractAdapters, AbstractBuilders, ResourceModuleConfigurationWithProviders, ToManyAdapter, ToOneAdapter, SimpleAdapter, ToManyBuilder, ToOneBuilder, SimpleBuilder, ResourceModuleConfiguration, toPlural, toDash, toPluralDash, HttpVerb, METAKEYS };
//# sourceMappingURL=resource.module.js.map