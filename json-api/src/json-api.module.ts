import { NgModule, ModuleWithProviders } from '@angular/core';
import { JsonApiSimpleAdapter, JsonApiToOneAdapter, JsonApiToManyAdapter } from './adapters';
import { JsonApiSimpleBuilder, JsonApiToOneBuilder, JsonApiToManyBuilder } from './builders';
import { ResourceModule } from '@ngx-api-orm/core';

@NgModule({
	providers: [
		JsonApiSimpleAdapter,
		JsonApiToOneAdapter,
		JsonApiToManyAdapter,
		JsonApiSimpleBuilder,
		JsonApiToOneBuilder,
		JsonApiToManyBuilder
	]
})
export class ResourceJsonApiModule {
	static forRoot(): ModuleWithProviders<ResourceModule> {
		return {
			ngModule: ResourceModule,
			providers: [
				JsonApiSimpleAdapter,
				JsonApiToOneAdapter,
				JsonApiToManyAdapter,
				JsonApiSimpleBuilder,
				JsonApiToOneBuilder,
				JsonApiToManyBuilder
			]
		};
	}
}
