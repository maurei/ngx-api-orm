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

import { JsonApiSimpleAdapter, JsonApiToOneAdapter, JsonApiToManyAdapter } from './adapters';
import { JsonApiSimpleBuilder, JsonApiToOneBuilder, JsonApiToManyBuilder } from './builders';
import { SimpleAdapter, ToOneAdapter, ToManyAdapter } from '@ngx-api-orm/core';
import { SimpleBuilder, ToOneBuilder, ToManyBuilder } from '@ngx-api-orm/core';
import { JsonApiInterceptor } from './interceptor';

export const JsonApi: Provider[] = [
	{ provide: SimpleAdapter, useClass: JsonApiSimpleAdapter },
	{ provide: ToOneAdapter, useClass: JsonApiToOneAdapter },
	{ provide: ToManyAdapter, useClass: JsonApiToManyAdapter },
	{ provide: SimpleBuilder, useClass: JsonApiSimpleBuilder },
	{ provide: ToOneBuilder, useClass: JsonApiToOneBuilder },
	{ provide: ToManyBuilder, useClass: JsonApiToManyBuilder },
	JsonApiInterceptor
];
