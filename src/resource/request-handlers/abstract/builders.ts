import { toPlural, ResourceModuleConfiguration, HttpClientOptions } from '../../utils';
import { HttpClient } from '@angular/common/http';

export namespace Abstract {
	export abstract class SimpleBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {}
		protected buildUrl(targetName: string, targetInstance?: any): string {
			let path = this.config.rootPath || '' + `/${toPlural(targetName)}/$targetId`;
			path = path.replace('/$targetId', targetInstance ? `/${targetInstance.id}` : '');
			return path;
		}

		public fetch(targetName: string, options: HttpClientOptions): Promise<Object> {
			const path = options.url || this.buildUrl(targetName);
			const req = this._http.get(path, options).toPromise();
			return <Promise<Object[]>>req;
		}
		public save(targetName: string, body: any, options: HttpClientOptions): Promise<Object> {
			const path = options.url || this.buildUrl(targetName);
			const req = this._http.post(path, body, options).toPromise();
			return <Promise<Object>>req;
		}
		public update(targetName: string, body: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, body);
			const req = this._http.patch(path, body, options).toPromise();
			return req.then(() => Promise.resolve());
		}
		public delete(targetName: string, instance: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, instance);
			const req = this._http.delete(path, options).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
	export abstract class ToOneBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = this.config.rootPath || '' + `/${toPlural(relatedName)}/${relatedInstance.id}/${targetName}`;
			return path;
		}
		public add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			const req = this._http.patch(path, body, options).toPromise();
			return req.then(() => Promise.resolve());
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			const req = this._http.delete(path, options).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
	export abstract class ToManyBuilder {
		constructor(protected readonly _http: HttpClient, protected readonly config: ResourceModuleConfiguration) {}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = this.config.rootPath || '' + `/${toPlural(relatedName)}/${relatedInstance.id}/${toPlural(targetName)}`;
			return path;
		}
		public add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			const req = this._http.post(path, body, options).toPromise();
			return req.then(() => Promise.resolve());
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			const req = this._http.delete(path, options).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
}
