import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractBuilders as Abstract } from '@ngx-api-orm/core';
import { ResourceModuleConfiguration, HttpClientOptions, toPlural, HttpVerb } from '@ngx-api-orm/core';

/** @internal */
export namespace JsonApiBuilders {
	@Injectable({ providedIn: 'root' })
	export class Simple extends Abstract.SimpleBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		public update(targetName: string, body: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, { id: body.data.id });
			return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
		}
	}
	@Injectable({ providedIn: 'root' })
	export class ToOne extends Abstract.ToOneBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
		}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${toPlural(relatedName)}/${relatedInstance.id}/relationships/${targetName}`;
			return path;
		}
	}
	@Injectable({ providedIn: 'root' })
	export class ToMany extends Abstract.ToManyBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${toPlural(relatedName)}/${relatedInstance.id}/relationships/${toPlural(targetName)}`;
			return path;
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			return this.request(HttpVerb.DELETE, path, options, body).then(() => Promise.resolve());
		}
	}
}
