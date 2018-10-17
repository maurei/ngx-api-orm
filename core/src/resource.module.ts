import 'reflect-metadata';
import { NgModule, ModuleWithProviders, Injector, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Resource } from './resource.core';
import { Field, ToMany, ToOne, Model } from './resource.decorators';
import { ToManyRelation } from './relations/to-many';
import { ToOneRelation } from './relations/to-one';
import {
	InjectorContainer,
	ResourceModuleConfiguration,
	ResourceModuleConfigurationWithProviders,
	HttpClientOptions,
	toDash,
	HttpVerb,
	METAKEYS,
	ResourceType
} from './utils';
import { Abstract as AbstractAdapters } from './request-handlers/abstract-adapters';
import { Abstract as AbstractBuilders } from './request-handlers/abstract-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
import { RelationConfiguration } from './relations/relation-configuration';

/** @internal */
@NgModule({ imports: [HttpClientModule] })
export class ResourceRootModule {
	public static processRelationships() {
		const resources = Reflect.getMetadata(METAKEYS.RESOURCES, Resource);
		if (!resources) {
			return;
		} else {
			this.setRelatedConstructors(resources);
		}
	}

	private static setRelatedConstructors(resources: Map<string, ResourceType<any>>) {
		for (const [singularName, ctor] of resources.entries()) {
			const relations = Reflect.getMetadata(METAKEYS.RELATIONS, ctor);
			Reflect.ownKeys(relations).forEach(r => {
				const config = relations[r];
				if (config.relatedResourceString) {
					config.RelatedResource = resources.get(config.relatedResourceString);
				}
			});
		}
	}
	constructor(injector: Injector) {
		InjectorContainer.instance = injector;
	}
}

@NgModule({ imports: [HttpClientModule] })
class ResourceModule {
	static forRoot(options: ResourceModuleConfigurationWithProviders = {}): ModuleWithProviders {
		const config: Provider[] = [{ provide: ResourceModuleConfiguration, useValue: { rootPath: options.rootPath } }];
		return {
			ngModule: ResourceRootModule,
			providers: config.concat(options.requestHandler || [])
		};
	}
}

export {
	ResourceModule,
	Resource,
	Field,
	ToOne,
	ToMany,
	Model,
	ToManyRelation,
	ToOneRelation,
	AbstractAdapters,
	AbstractBuilders,
	ResourceModuleConfigurationWithProviders,
	ToManyAdapter,
	ToOneAdapter,
	SimpleAdapter,
	ToManyBuilder,
	ToOneBuilder,
	SimpleBuilder,
	ResourceModuleConfiguration,
	HttpClientOptions,
	toDash,
	HttpVerb,
	METAKEYS,
	ResourceType
};
