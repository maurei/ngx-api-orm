import { NgModule, ModuleWithProviders, Injector, Provider } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Resource } from './resource.core';
import { ResourceField, ResourceToMany, ResourceToOne, ResourceModel } from './resource.decorators';
import { ToManyRelation } from './relations/to-many';
import { ToOneRelation } from './relations/to-one';
import { InjectorContainer, ResourceModuleConfiguration, ResourceModuleConfigurationWithProviders } from './utils';
import { Abstract as AbstractAdapters} from './request-handlers/abstract/adapters';
import { Abstract as AbstractBuilders} from './request-handlers/abstract/builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default/adapters';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default/builders';
import { JsonApiAdapters } from './request-handlers/jsonapidotorg/adapters';
import { JsonApiBuilders } from './request-handlers/jsonapidotorg/builders';
import { JsonApiDotOrg } from './request-handlers/jsonapidotorg/providers';


/** @internal */
@NgModule({ imports: [HttpClientModule] })
export class ResourceRootModule {
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
			providers: config.concat(options.requestHandlersProviders || [])
		};
	}
}

export {
	ResourceModule,
	Resource,
	ResourceField,
	ResourceToOne,
	ResourceToMany,
	ResourceModel,
	ToManyRelation,
	ToOneRelation,
	AbstractAdapters,
	AbstractBuilders,
	ResourceModuleConfigurationWithProviders,
	ToManyAdapter, ToOneAdapter, SimpleAdapter,
	ToManyBuilder, ToOneBuilder, SimpleBuilder,
	JsonApiAdapters, JsonApiBuilders, JsonApiDotOrg
};
