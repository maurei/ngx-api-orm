import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Abstract } from '../abstract/builders';

import { ResourceModuleConfiguration, HttpClientOptions, toPlural } from '../../utils';

/** @internal */
export namespace JsonApiBuilders {
	@Injectable({ providedIn: 'root' })
	export class Simple extends Abstract.SimpleBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		public update(targetName: string, body: any, options: HttpClientOptions): Promise<any> {
			const path = options.url || this.buildUrl(targetName, { id: body.data.id });
			delete options.url;
			const req = this._http.patch(path, body, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
	@Injectable({ providedIn: 'root' })
	export class ToOne extends Abstract.ToOneBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			delete options.url;
			const req = this._http.patch(path, body, Reflect.ownKeys(options).length ? options : undefined ).toPromise();
			return req.then(() => Promise.resolve());
		}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = this.config.rootPath || '' + `/${toPlural(relatedName)}/${relatedInstance.id}/relationships/${targetName}`;
			return path;
		}
	}
	@Injectable({ providedIn: 'root' })
	export class ToMany extends Abstract.ToManyBuilder {
		constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
			super(_http, _config);
		}
		protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string {
			const path = this.config.rootPath || '' + `/${toPlural(relatedName)}/${relatedInstance.id}/relationships/${toPlural(targetName)}`;
			return path;
		}
		public remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void> {
			const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
			options.body = body;
			delete options.url;
			const req = this._http.request('DELETE', path, Reflect.ownKeys(options).length ? options : undefined).toPromise();
			return req.then(() => Promise.resolve());
		}
	}
}
