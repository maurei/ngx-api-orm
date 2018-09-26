import { Provider } from '@angular/core';
import { JsonApiAdapters } from './adapters';
import { JsonApiBuilders } from './builders';
import { SimpleAdapter, ToOneAdapter, ToManyAdapter } from '../default/adapters';
import { SimpleBuilder, ToOneBuilder, ToManyBuilder } from '../default/builders';


export const JsonApiDotOrg: Provider[] = [
	{ provide: SimpleAdapter, useClass: JsonApiAdapters.Simple },
	{ provide: ToOneAdapter, useClass: JsonApiAdapters.ToOne },
	{ provide: ToManyAdapter, useClass: JsonApiAdapters.ToMany },
	{ provide: SimpleBuilder, useClass: JsonApiBuilders.Simple },
	{ provide: ToOneBuilder, useClass: JsonApiBuilders.ToOne },
	{ provide: ToManyBuilder, useClass: JsonApiBuilders.ToMany },
];
