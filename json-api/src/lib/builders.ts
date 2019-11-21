import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractBuilders as Abstract } from '@ngx-api-orm/core';
import { ResourceModuleConfiguration, HttpClientOptions, HttpVerb } from '@ngx-api-orm/core';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class JsonApiSimpleBuilder extends Abstract.SimpleBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
	public update(targetNamePlural: string, body: any, options: HttpClientOptions): Observable<any> {
		const path = options.url || this.buildUrl(targetNamePlural, { id: body.data.id });
		return this.request(HttpVerb.PATCH, path, options, body);
	}
}

@Injectable({ providedIn: 'root' })
export class JsonApiToOneBuilder extends Abstract.ToOneBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
	public remove(
		targetNameSingular: string,
		relatedNamePlural: string,
		body: any,
		relatedInstance: any,
		options: HttpClientOptions
	): Observable<void> {
		const path = options.url || this.buildUrl(targetNameSingular, relatedNamePlural, relatedInstance);
		return this.request(HttpVerb.PATCH, path, options, body);
	}
	protected buildUrl(targetNameSingular: string, relatedNamePlural: string, relatedInstance: any): string {
		const path = (this.config.endPoint || '') + `/${relatedNamePlural}/${relatedInstance.id}/relationships/${targetNameSingular}`;
		return path;
	}

	public load(
		navigation: string,
		relatedNamePlural: string,
		body: any,
		relatedInstance: any,
		options: HttpClientOptions
	): Observable<Object> {
		const path = options.url || this.buildUrl(navigation, relatedNamePlural, relatedInstance).replace('/relationships', '');
		return this.request(HttpVerb.GET, path, options, body);
	}
}

@Injectable({ providedIn: 'root' })
export class JsonApiToManyBuilder extends Abstract.ToManyBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}

	protected buildUrl(targetNamePlural: string, relatedNamePlural: string, relatedInstance: any): string {
		const path = (this.config.endPoint || '') + `/${relatedNamePlural}/${relatedInstance.id}/relationships/${targetNamePlural}`;
		return path;
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

	public load(
		targetNamePlural: string,
		relatedNamePlural: string,
		body: any,
		relatedInstance: any,
		options: HttpClientOptions
	): Observable<Object[]> {
		const path = options.url || this.buildUrl(targetNamePlural, relatedNamePlural, relatedInstance).replace('/relationships', '');
		return this.request(HttpVerb.GET, path, options, body);
	}
}
