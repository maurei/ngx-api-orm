import { toPlural, ResourceModuleConfiguration, HttpClientOptions } from '../../utils';
import { HttpClient } from '@angular/common/http';

export namespace Abstract {
	export abstract class SimpleBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {}
		protected buildUrl(targetName: string, targetInstance?: any): string {
			let path = (this.config.rootPath ? this.config.rootPath : '') + `/${toPlural(targetName)}/$targetId`;
			path = path.replace('/$targetId', targetInstance ? `/${targetInstance.id}` : '');
			return path;
		}

		public fetch(targetName: string, options: HttpClientOptions): Promise<Object> {
			const path = options.url || this.buildUrl(targetName);
			delete options.url;
			const req = this._http.get(path, Reflect.ownKeys(options).length ? options : undefined).toPromise();
			return <Promise<Object[]>>req;
		}
		public save(targetName: string, body: any, options: HttpClientOptions): Promise<Object> {
			const path = options.url || this.buildUrl(targetName);
			delete options.url;
			const req = this._http.post(path, body, Reflect.ownKeys(options).length ? options : undefined).toPromise();
			return <Promise<Object>>req;
		}
		public update(targetName: string, body: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, body);
			delete options.url;
			const req = this._http.patch(path, body, Reflect.ownKeys(options).length ? options : undefined).toPromise();
			return req.then(() => Promise.resolve());
		}
		public delete(targetName: string, instance: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, instance);
			delete options.url;
			const req = this._http.delete(path, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
	export abstract class ToOneBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = (this.config.rootPath ? this.config.rootPath : '') + `/${toPlural(relatedName)}/${relatedInstance.id}/${targetName}`;
			return path;
		}
		public add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			delete options.url;
			const req = this._http.patch(path, body, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			delete options.url;
			const req = this._http.delete(path, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
	export abstract class ToManyBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path =
				(this.config.rootPath ? this.config.rootPath : '') + `/${toPlural(relatedName)}/${relatedInstance.id}/${toPlural(targetName)}`;
			return path;
		}
		public add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			delete options.url;
			const req = this._http.post(path, body, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			delete options.url;
			const req = this._http.delete(path, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
}
