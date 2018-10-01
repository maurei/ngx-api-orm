import { ResourceType, HttpClientOptions, RawInstanceTemplate } from './utils';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
/** A dummy class required to allow for an optional argument in the constructor of your model while keeping it compatible with Angular's dependency injection.
 *
 * There is no need to use this type anywhere explicitly.
 *
 * On the other hand, the type {@link RawInstanceTemplate<T>} might come in handy when instantiating instances of your model from plain objects, e.g. when using the [factory method]{@link Resource#factory}.
 *
 */
export declare class RawInstance {
}
export declare class Resource {
    private _adapter;
    private _builder;
    private _toOneAdapter;
    private _toOneBuilder;
    private _toManyAdapter;
    private _toManyBuilder;
    /** Primary key for your model. */
    id: string | number;
    /**
     * Used internally for {@link Resource#collection}. Don't use this one, use {@link Resource#collection} instead.
     * @returns T[]
     */
    static readonly _instances: any;
    /**
     * Retrieve an immutable list of all of the instances of your model.
     * @returns T[]
     */
    static collection<T extends Resource>(this: ResourceType<T>): T[];
    /**
     * Instantiate multiple instances from a collection of templates.
     * @param  Array<{}> input
     * @returns Array<T> An array of instances of your model.
     */
    static factory<T extends Resource>(this: ResourceType<T>, input: Array<{}>): Array<T>;
    static factory<T extends Resource>(this: ResourceType<T>, input: {}): T;
    /**
     * Find a locally available instance of your model by id. Does not make any requests.
     * @param  number id
     * @returns T
     */
    static find<T extends Resource>(this: ResourceType<T>, id: number): T | undefined;
    /**
     * Runs the fetch pipeline of your model for a single resource using the simple request adapter and builder.
     * @param  HttpClientOptions={} options
     * @returns Promise<T>
     */
    static fetch<T extends Resource>(this: ResourceType<T>, options?: HttpClientOptions): Promise<T[]>;
    /**
     * Call this method to get an empty template for your model. This can for example be useful to use as a model for forms.
     * @returns A raw instance template object.
     */
    static template<T extends Resource>(this: ResourceType<T>): RawInstanceTemplate<T>;
    /**
     * Do not override the constructor unless you're know what you're doing. If you think you need it, be sure the check out the source code to see make sure your implementation is not messing with anything internally.
     *
     * @param RawInstance rawInstance A template from which a new instance of your model will be instantiate. If this parameter is omitted, the model will create an instance from the models metadata. If the parameter is included, it **MUST** minimally include all the keys as decorated with {@link Field}, {@link ToOne}, {@link ToMany} in the model definition with. The type `RawInstance` is just a dummy type that is required to make it work with Angular's dependency injection.
     * @param SimpleAdapter simpleAdapter The request content adapter for Simple resource requests.
     * @param SimpleBuilder simpleBuilder The request builder for Simple resource requests.
     * @param ToOneAdapter toOneAdapter The request content adapter for ToOne relationship requests
     * @param ToOneBuilder toOneBuilder The request builder for  ToOne relationship requests
     * @param ToManyAdapter toManyAdapter The request content adapter for ToMany relationship requests
     * @param ToManyBuilder toManyBuilder The request builder for  ToMany relationship requests
     */
    constructor(rawInstance?: RawInstance, simpleAdapter?: SimpleAdapter, simpleBuilder?: SimpleBuilder, toOneAdapter?: ToOneAdapter, toOneBuilder?: ToOneBuilder, toManyAdapter?: ToManyAdapter, toManyBuilder?: ToManyBuilder);
    /**
     * Do some business logic upon initialization. This method is called by the constructor; do not override constructor unless you know what you're doing
     * @param rawInstance the raw instance template as consumed by the constructor
     * @returns void You cannot return anything from the onInit hook.
     */
    onInit(rawInstance: any): void;
    /**
     * Runs the save pipeline of your model for a single resource using the simple request adapter and builder.
     * @param  HttpClientOptions={} options
     * @returns Promise<T>
     */
    save(options?: HttpClientOptions): Promise<this>;
    /**
     * Runs the update pipeline of your model for a single resource using the simple request adapter and builder.
     * @param  HttpClientOptions={} options
     * @returns Promise<void>
     */
    update(options?: HttpClientOptions): Promise<void>;
    /**
     * Runs the delete pipeline of your model for a single resource using the simple request adapter and builder.
     * @param  HttpClientOptions={} options
     * @returns Promise<void>
     */
    delete(options?: HttpClientOptions): Promise<void>;
}
