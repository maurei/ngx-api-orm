import { toPlural, ResourceModuleConfiguration, HttpClientOptions, HttpVerb } from '../utils';
import { HttpClient } from '@angular/common/http';

export namespace Abstract {
	export abstract class BaseBuilder {
		constructor(protected readonly _http: HttpClient) {}

		public request(method: HttpVerb, path: string, options: HttpClientOptions, body?: any): Promise<Object> {
			delete options.url;
			if (body) {
				options.body = body;
			}
			return this._http.request(method, path, options).toPromise();
		}
	}

	export abstract class SimpleBuilder extends BaseBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {
			super(_http);
		}
		protected buildUrl(targetName: string, targetInstance?: any): string {
			let path = (this.config.rootPath || '') + `/${toPlural(targetName)}/$targetId`;
			path = path.replace('/$targetId', targetInstance ? `/${targetInstance.id}` : '');
			return path;
		}

		public fetch(targetName: string, options: HttpClientOptions): Promise<Object> {
			const path = options.url || this.buildUrl(targetName);
			return <Promise<Object[]>>this.request(HttpVerb.GET, path, options);
		}
		public save(targetName: string, body: any, options: HttpClientOptions): Promise<Object> {
			const path = options.url || this.buildUrl(targetName);
			return this.request(HttpVerb.POST, path, options, body);
		}
		public update(targetName: string, body: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, body);
			return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
		}
		public delete(targetName: string, instance: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, instance);
			return this.request(HttpVerb.DELETE, path, options).then(() => Promise.resolve());
		}
	}
	export abstract class ToOneBuilder extends BaseBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {
			super(_http);
		}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${toPlural(relatedName)}/${relatedInstance.id}/${targetName}`;
			return path;
		}
		public add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			return this.request(HttpVerb.DELETE, path, options).then(() => Promise.resolve());
		}
	}
	export abstract class ToManyBuilder extends BaseBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {
			super(_http);
		}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path =
				(this.config.rootPath || '') + `/${toPlural(relatedName)}/${relatedInstance.id}/${toPlural(targetName)}`;
			return path;
		}
		public add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			return this.request(HttpVerb.POST, path, options, body).then(() => Promise.resolve());
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			return this.request(HttpVerb.DELETE, path, options, body).then(() => Promise.resolve());
		}
	}
}
