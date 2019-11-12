import { Injectable } from '@angular/core';
import { ResourceModuleConfiguration } from '../utils';
import { HttpClient } from '@angular/common/http';

import { Abstract } from './abstract-builders';

@Injectable({ providedIn: 'root' })
export class SimpleBuilder extends Abstract.SimpleBuilder {
	public static foo() {
		return 'bar';
	}
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
}
@Injectable({ providedIn: 'root' })
export class ToOneBuilder extends Abstract.ToOneBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
}
@Injectable({ providedIn: 'root' })
export class ToManyBuilder extends Abstract.ToManyBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
}



