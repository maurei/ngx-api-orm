import { Provider, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import {
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpHeaderResponse,
	HttpProgressEvent,
	HttpResponse,
	HttpSentEvent,
	HttpUserEvent,
	HTTP_INTERCEPTORS
} from '@angular/common/http';

import { JsonApiAdapters } from './adapters';
import { JsonApiBuilders } from './builders';
import { SimpleAdapter, ToOneAdapter, ToManyAdapter } from '../default/adapters';
import { SimpleBuilder, ToOneBuilder, ToManyBuilder } from '../default/builders';


export class JsonApiInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const jsonApiReq = req.clone({
			headers: req.headers.set('Content-Type', 'application/vnd.api+json')
		});
		return next.handle(jsonApiReq);
	}
}

export const JsonApiDotOrg: Provider[] = [
	{ provide: SimpleAdapter, useClass: JsonApiAdapters.Simple },
	{ provide: ToOneAdapter, useClass: JsonApiAdapters.ToOne },
	{ provide: ToManyAdapter, useClass: JsonApiAdapters.ToMany },
	{ provide: SimpleBuilder, useClass: JsonApiBuilders.Simple },
	{ provide: ToOneBuilder, useClass: JsonApiBuilders.ToOne },
	{ provide: ToManyBuilder, useClass: JsonApiBuilders.ToMany },
	{ provide: HTTP_INTERCEPTORS, useClass: JsonApiInterceptor, multi: true }
];

