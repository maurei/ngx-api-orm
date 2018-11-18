/*tslint:disable:no-non-null-assertion*/
import 'reflect-metadata';
import { NgModule, ModuleWithProviders, Injector, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Resource } from './resource.core';
import { Field, ToMany, ToOne, Model, OptionalToOne, OptionalRelationOptions, OptionalToMany, OptionalField } from './resource.decorators';
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
	ResourceType,
	Observables,
	Promises,
	AsyncReturnType,
	RawInstanceTemplate,
	AsyncModes,
	Return,
	ExtractGenericAsyncMode
} from './utils';
import { Abstract as AbstractAdapters } from './request-handlers/abstract-adapters';
import { Abstract as AbstractBuilders } from './request-handlers/abstract-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
import { RelationConfiguration, RelationType } from './relations/relation-configuration';

/** @internal */
// @dynamic
@NgModule({ imports: [HttpClientModule] })
export class ResourceRootModule {
	public static processRelationships() {
		const resources = Reflect.getMetadata(METAKEYS.RESOURCES, Resource);
		if (!resources) {
			return;
		} else {
			resources.forEach((ctor: any, singularName: string) => {
				const relations = Reflect.getMetadata(METAKEYS.RELATIONS, ctor);
				Reflect.ownKeys(relations).forEach(r => {
					const config = relations[r];
					this.setRelatedConstructors(config, resources);
					this.setCircularRelations(config, resources);
				});
			});
		}
	}

	private static setRelatedConstructors(config: RelationConfiguration<any, any>, resources: Map<string, ResourceType<any>>) {
		if (config.relatedResourceString) {
			const match = resources.get(config.relatedResourceString);
			if (!match) {
				throw Error(`A related resource string identifier could not be matched to one of your resource.
				identifier: ${config.relatedResourceString}
				where: "${(config.type === RelationType.ToMany ? '@ToOne(' : '@ToMany(') + config.relatedResourceString + ')'} ${
					config.keyOnInstance
				}" in class ${config.HostResource.name}.
				Make sure the key is singular and dashed. Eg: for a class named MyTestResourceName, use my-test-resource-name.`);
			} else {
				config.RelatedResource = match;
			}
		}
	}
	private static setCircularRelations(config: RelationConfiguration<any, any>, resources: Map<string, ResourceType<any>>) {
		const hostResource = config.HostResource;
		const relationsOfRelated = Reflect.getMetadata(METAKEYS.RELATIONS, config.RelatedResource);
		const potentialCircularMatches: RelationConfiguration<any, any>[] = [];
		Reflect.ownKeys(relationsOfRelated).forEach(rot => {
			const relatedRelationConfig = relationsOfRelated[rot];
			if (relatedRelationConfig.RelatedResource === hostResource) {
				potentialCircularMatches.push(relatedRelationConfig);
			}
		});
		if (potentialCircularMatches.length === 1) {
			config.circular = potentialCircularMatches[0];
		} else if (potentialCircularMatches.length > 1) {
			throw Error(
				'It seems that there is a model X for which a model Y has multiple foreign keys directed to it. This is not yet implemented'
			);
		}
	}
	constructor(injector: Injector) {
		InjectorContainer.instance = injector;
		ResourceRootModule.processRelationships();
	}
}

// @dynamic
@NgModule({ imports: [HttpClientModule] })
class ResourceModule {
	static forRoot(options: ResourceModuleConfigurationWithProviders = {}): ModuleWithProviders {
		return {
			ngModule: ResourceRootModule,
			providers: ([{ provide: ResourceModuleConfiguration, useValue: { rootPath: options.rootPath } }] as Provider[]).concat(
				options.requestHandler || []
			)
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
	ResourceType,
	Observables,
	Promises,
	AsyncReturnType,
	RelationType,
	RawInstanceTemplate,
	OptionalToOne,
	OptionalRelationOptions,
	OptionalToMany,
	OptionalField,
	AsyncModes,
	Return,
	ExtractGenericAsyncMode
};
