import { Injectable } from '@angular/core';
import { ResourceModuleConfiguration } from '../utils';
import { HttpClient } from '@angular/common/http';

import { Abstract } from './abstract-builders';

/** @internal */
@Injectable({ providedIn: 'root' })
export class SimpleBuilder extends Abstract.SimpleBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
}
/** @internal */
@Injectable({ providedIn: 'root' })
export class ToOneBuilder extends Abstract.ToOneBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
}
/** @internal */
@Injectable({ providedIn: 'root' })
export class ToManyBuilder extends Abstract.ToManyBuilder {
	constructor(_http: HttpClient, _config: ResourceModuleConfiguration) {
		super(_http, _config);
	}
}

