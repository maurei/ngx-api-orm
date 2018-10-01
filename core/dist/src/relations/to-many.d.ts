import { RelationConfiguration } from './relation-configuration';
import { Resource } from '../resource.core';
import { HttpClientOptions } from '../utils';
import { ToManyBuilder } from '../request-handlers/default-builders';
import { ToManyAdapter } from '../request-handlers/default-adapters';
export declare class ToManyRelation<THost extends Resource, TRelated extends Resource> extends Array<TRelated> {
    private readonly _hostInstance;
    private readonly _configuration;
    private readonly _adapter;
    private readonly _builder;
    constructor(_hostInstance: THost, _configuration: RelationConfiguration<THost, TRelated>, _adapter: ToManyAdapter, _builder: ToManyBuilder);
    /**
     * Runs the add pipeline of your model for a related resource using the To-Many request adapter and builder.
     * @param  TRelated relatedInstance
     * @param  any={} options
     */
    add: (relatedInstance: TRelated, options?: HttpClientOptions) => Promise<void>;
    /**
     * Runs the delete pipeline of your model for a related resource using the To-Many request adapter and builder.
     * @param  TRelated relatedInstance
     * @param  any={} options
     */
    remove: (relatedInstance: TRelated, options?: HttpClientOptions) => Promise<void>;
}
