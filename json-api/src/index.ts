import { JsonApiAdapters } from './adapters';
import { JsonApiBuilders } from './builders';
import { jsonApiInterceptor } from './interceptor';
import { JsonApi } from './providers';

const SimpleAdapter = JsonApiAdapters.Simple;
const ToOneAdapter = JsonApiAdapters.ToOne;
const ToManyAdapter = JsonApiAdapters.ToMany;
const SimpleBuilder = JsonApiBuilders.Simple;
const ToOneBuilder = JsonApiBuilders.ToOne;
const ToManyBuilder = JsonApiBuilders.ToMany;

export { SimpleAdapter, ToOneAdapter, ToManyAdapter, SimpleBuilder, ToOneBuilder, ToManyBuilder, jsonApiInterceptor, JsonApi };
