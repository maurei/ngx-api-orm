import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractBuilders as Abstract } from '@ngx-api-orm/core';
import { ResourceModuleConfiguration, HttpClientOptions, HttpVerb } from '@ngx-api-orm/core';

/** @internal */
export namespace JsonApiBuilders {
	@Injectable({ providedIn: 'root' })
	export class Simple extends Abstract.SimpleBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
			console.log("wut");
		}
		public update(targetNamePlural: string, body: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetNamePlural, { id: body.data.id });
			return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
		}
	}
	@Injectable({ providedIn: 'root' })
	export class ToOne extends Abstract.ToOneBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		public remove(targetNameSingular: string, relatedNamePlural: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetNameSingular, relatedNamePlural, relatedInstance);
			return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
		}
		protected buildUrl(targetNameSingular: string, relatedNamePlural: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${relatedNamePlural}/${relatedInstance.id}/relationships/${targetNameSingular}`;
			return path;
		}
	}
	@Injectable({ providedIn: 'root' })
	export class ToMany extends Abstract.ToManyBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		protected buildUrl(targetNamePlural: string, relatedNamePlural: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${relatedNamePlural}/${relatedInstance.id}/relationships/${targetNamePlural}`;
			return path;
		}
		public remove(targetNamePlural: string, relatedNamePlural: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetNamePlural, relatedNamePlural, relatedInstance);
			return this.request(HttpVerb.DELETE, path, options, body).then(() => Promise.resolve());
		}
	}
}
