import 'reflect-metadata';
import { ModuleWithProviders } from '@angular/core';
import { Resource } from './resource.core';
import { Field, ToMany, ToOne, Model } from './resource.decorators';
import { ToManyRelation } from './relations/to-many';
import { ToOneRelation } from './relations/to-one';
import { ResourceModuleConfiguration, ResourceModuleConfigurationWithProviders, HttpClientOptions, toPlural, toDash, toPluralDash, HttpVerb, METAKEYS } from './utils';
import { Abstract as AbstractAdapters } from './request-handlers/abstract-adapters';
import { Abstract as AbstractBuilders } from './request-handlers/abstract-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
declare class ResourceModule {
    static forRoot(options?: ResourceModuleConfigurationWithProviders): ModuleWithProviders;
}
export { ResourceModule, Resource, Field, ToOne, ToMany, Model, ToManyRelation, ToOneRelation, AbstractAdapters, AbstractBuilders, ResourceModuleConfigurationWithProviders, ToManyAdapter, ToOneAdapter, SimpleAdapter, ToManyBuilder, ToOneBuilder, SimpleBuilder, ResourceModuleConfiguration, HttpClientOptions, toPlural, toDash, toPluralDash, HttpVerb, METAKEYS };
