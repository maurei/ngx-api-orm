import { RelationConfiguration } from './relation-configuration';
import { Resource } from '../resource.core';
import { HttpClientOptions } from '../utils';
import { ToOneBuilder } from '../request-handlers/default-builders';
import { ToOneAdapter } from '../request-handlers/default-adapters';
export declare class ToOneRelation<THost extends Resource, TRelated extends Resource> {
    private readonly _hostInstance;
    private readonly _configuration;
    private readonly _adapter;
    private readonly _builder;
    /** The references to the related instance */
    instance: TRelated | null;
    constructor(_hostInstance: THost, _configuration: RelationConfiguration<THost, TRelated>, _adapter: ToOneAdapter, _builder: ToOneBuilder);
    /**
     * Synchronize the model without using explicitly using `set` or `add`. This way it is possible to update a relation using e.g. DOM interactions without making premature requests.
     * @returns Promise<void>
     */
    sync(): Promise<void>;
    /**
     * Runs the delete pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param  TRelated targetInstance
     * @param  HttpClientOptions={} options
     * @returns Promise
     */
    remove(options?: HttpClientOptions): Promise<void>;
    /**
     * Runs the add pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param  TRelated targetInstance
     * @param  HttpClientOptions={} options
     * @returns Promise
     */
    set(targetInstance: TRelated, options?: HttpClientOptions): Promise<void>;
}
