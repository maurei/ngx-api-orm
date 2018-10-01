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
import { SimpleAdapter, ToOneAdapter, ToManyAdapter } from '@ngx-api-orm/core';
import { SimpleBuilder, ToOneBuilder, ToManyBuilder } from '@ngx-api-orm/core';
import { jsonApiInterceptor } from './interceptor';

export const JsonApi: Provider[] = [
	{ provide: SimpleAdapter, useClass: JsonApiAdapters.Simple },
	{ provide: ToOneAdapter, useClass: JsonApiAdapters.ToOne },
	{ provide: ToManyAdapter, useClass: JsonApiAdapters.ToMany },
	{ provide: SimpleBuilder, useClass: JsonApiBuilders.Simple },
	{ provide: ToOneBuilder, useClass: JsonApiBuilders.ToOne },
	{ provide: ToManyBuilder, useClass: JsonApiBuilders.ToMany },
	jsonApiInterceptor
];
