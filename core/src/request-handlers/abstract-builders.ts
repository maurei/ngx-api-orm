import { ResourceModuleConfiguration, HttpClientOptions, HttpVerb } from '../utils';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export namespace Abstract {
	export abstract class BaseBuilder {
		constructor(protected readonly _http: HttpClient) {}

		public request(method: HttpVerb, path: string, options: HttpClientOptions, body?: any): Observable<any> {
			delete options.url;
			if (body) {
				options.body = body;
			}
			return this._http.request(method, path, options)
		}
	}

	export abstract class SimpleBuilder extends BaseBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {
			super(_http);
		}
		protected buildUrl(targetNamePlural: string, targetInstance?: any): string {
			let path = (this.config.rootPath || '') + `/${targetNamePlural}/$targetId`;
			path = path.replace('/$targetId', targetInstance ? `/${targetInstance.id}` : '');
			return path;
		}

		public fetch(targetNamePlural: string, options: HttpClientOptions): Observable<Object[]> {
			const path = options.url || this.buildUrl(targetNamePlural);
			return this.request(HttpVerb.GET, path, options);
		}
		public save(targetNamePlural: string, body: any, options: HttpClientOptions): Observable<Object> {
			const path = options.url || this.buildUrl(targetNamePlural);
			return this.request(HttpVerb.POST, path, options, body);
		}
		public update(targetNamePlural: string, body: any, options: HttpClientOptions): Observable<Object> {
			const path = options.url || this.buildUrl(targetNamePlural, body);
			return this.request(HttpVerb.PATCH, path, options, body);
		}
		public delete(targetNamePlural: string, instance: any, options: HttpClientOptions): Observable<Object> {
			const path = options.url || this.buildUrl(targetNamePlural, instance);
			return this.request(HttpVerb.DELETE, path, options);
		}
	}
	export abstract class ToOneBuilder extends BaseBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {
			super(_http);
		}
		protected buildUrl(targetNameSingular: string, relatedNamePlural: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${relatedNamePlural}/${relatedInstance.id}/${targetNameSingular}`;
			return path;
		}
		public add(
			targetNameSingular: string,
			relatedNamePlural: string,
			body: any,
			relatedInstance: any,
			options: HttpClientOptions
		): Observable<void> {
			const path = options.url || this.buildUrl(targetNameSingular, relatedNamePlural, relatedInstance);
			return this.request(HttpVerb.PATCH, path, options, body) as Observable<void>;
		}
		public remove(
			targetNameSingular: string,
			relatedNamePlural: string,
			body: any,
			relatedInstance: any,
			options: HttpClientOptions
		): Observable<void> {
			const path = options.url || this.buildUrl(targetNameSingular, relatedNamePlural, relatedInstance);
			return this.request(HttpVerb.DELETE, path, options);
		}
	}
	export abstract class ToManyBuilder extends BaseBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {
			super(_http);
		}
		protected buildUrl(targetNamePlural: string, relatedNamePlural: string, relatedInstance: any): string {
			const path = (this.config.rootPath || '') + `/${relatedNamePlural}/${relatedInstance.id}/${targetNamePlural}`;
			return path;
		}
		public add(
			targetNamePlural: string,
			relatedNamePlural: string,
			body: any,
			relatedInstance: any,
			options: HttpClientOptions
		): Observable<void> {
			const path = options.url || this.buildUrl(targetNamePlural, relatedNamePlural, relatedInstance);
			return this.request(HttpVerb.POST, path, options, body);
		}
		public remove(
			targetNamePlural: string,
			relatedNamePlural: string,
			body: any,
			relatedInstance: any,
			options: HttpClientOptions
		): Observable<void> {
			const path = options.url || this.buildUrl(targetNamePlural, relatedNamePlural, relatedInstance);
			return this.request(HttpVerb.DELETE, path, options, body);
		}
	}
}
