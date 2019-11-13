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
import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

export class HeadersInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const jsonApiReq = req.clone({
			headers: req.headers.set('Content-Type', 'application/vnd.api+json')
		});
		return next.handle(jsonApiReq);
	}
}

export const JsonApiInterceptor = { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true };
