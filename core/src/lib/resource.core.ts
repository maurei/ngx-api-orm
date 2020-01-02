/*tslint:disable:max-line-length*/
import { Optional } from '@angular/core';
import {
	getDependencyInjectionEntries,
	METAKEYS,
	updateInterceptProxyFactory,
	readOnlyArrayProxyFactory,
	ResourceType,
	HttpClientOptions,
	RequestHandlers,
	UnresolvedRequestHandlers,
	RawInstanceTemplate
} from './utils';
import { ToManyRelation } from './relations/to-many';
import { RelationType } from './relations/relation-configuration';
import { ToOneRelation } from './relations/to-one';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
import 'reflect-metadata';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/** A dummy class required to allow for an optional argument in the constructor of your model while keeping it compatible with Angular's dependency injection.
 * There is no need to use this type anywhere explicitly.
 * On the other hand, the type {@link RawInstanceTemplate<T>} might come in handy when instantiating instances of your model from plain objects, e.g. when using the [factory method]{@link Resource#factory}.
 *
 */
export class RawInstance {}

// @dynamic
export class Resource {

	private _adapter: SimpleAdapter;
	private _builder: SimpleBuilder;
	private _toOneAdapter: ToOneAdapter;
	private _toOneBuilder: ToOneBuilder;
	private _toManyAdapter: ToManyAdapter;
	private _toManyBuilder: ToManyBuilder;
	/** Primary key for your model. */
	public id: string | number;

	/**
	 * Used internally for {@link Resource#collection}. Don't use this one, use {@link Resource#collection} instead.
	 * @returns T[]
	 */
	public static get _instances() {
		return readOnlyArrayProxyFactory(Reflect.getMetadata(METAKEYS.INSTANCES, this));
	}

	/**
	 * Retrieve an immutable list of all of the instances of your model.
	 * @returns T[]
	 */
	public static collection<T extends Resource>(this: ResourceType<T>): T[] {
		return this._instances;
	}

	/**
	 * Instantiate multiple instances from a collection of templates.
	 * @param  Array<{}> input
	 * @returns Array<T> An array of instances of your model.
	 */
	public static factory<T extends Resource>(this: ResourceType<T>, input: Array<{}>): Array<T>;
	public static factory<T extends Resource>(this: ResourceType<T>, input: {}): T;
	public static factory<T extends Resource>(this: ResourceType<T>, input: {} | Array<{}>): T | Array<T> {
		if (input instanceof Array) {
			return <T[]>input.map(ro => new this(ro));
		} else if (input instanceof Object) {
			return <T>new this(input);
		} else {
			throw new TypeError('Overload error');
		}
	}
	/**
	 * Find a locally available instance of your model by id. Does not make any requests.
	 * @param  number id
	 * @returns T
	 */
	public static find<T extends Resource>(this: ResourceType<T>, id: number): T | undefined {
		return this.collection().find((i: any) => i.id === id);
	}

	/**
	 * Runs the fetch pipeline of your model for a single resource using the simple request adapter and builder.
	 * @param  HttpClientOptions={} options
	 * @returns Promise<T>
	 */
	public static fetch<T extends Resource>(
		this: ResourceType<T>,
		options: HttpClientOptions = {}
	): Observable<T[]> {
		const injections = getDependencyInjectionEntries(this);
		const adapter = injections[0];
		const builder = injections[1];
		const resourceName = Reflect.getMetadata(METAKEYS.PLURAL, this);
		const $request = builder.fetch(resourceName, options).pipe(
			map((response: Object) => adapter.parseIncoming(response) as Object[]),
			map((rawInstances: Object[]) => this.factory<T>(rawInstances))
		);
		return $request;
	}

	/**
	 * Call this method to get an empty template for your model. This can for example be useful to use as a model for forms.
	 * @returns A raw instance template object.
	 */
	public static template<T extends Resource>(this: ResourceType<T>): RawInstanceTemplate<T> {
		const rawInstance = {};
		Reflect.getMetadata(METAKEYS.FIELDS, this).forEach((field: string) => (rawInstance[field] = undefined));
		return (rawInstance as any) as RawInstanceTemplate<T>;
	}

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
	constructor(
		@Optional() rawInstance?: RawInstance /* need to figure out how to refer to inheriting type here */,
		simpleAdapter?: SimpleAdapter,
		simpleBuilder?: SimpleBuilder,
		toOneAdapter?: ToOneAdapter,
		toOneBuilder?: ToOneBuilder,
		toManyAdapter?: ToManyAdapter,
		toManyBuilder?: ToManyBuilder
	) {
		const requestHandlers: UnresolvedRequestHandlers = [
			simpleAdapter,
			simpleBuilder,
			toOneAdapter,
			toOneBuilder,
			toManyAdapter,
			toManyBuilder
		];

		/**  The constructor can be called by the dependency injector or by the user. In the former case,
		 * assuming that the user did not manually inject the requestHandlers, only the first parameter will be falsy.
		 *  In the latter case, only the first parameter will be truthy, in which case we will retrieve the injections
		 *  by getDependencyInjectionEntries (see _handleInjections internal method).
		 */
		const instantationByAngularDI = this._handleInjections(requestHandlers);
		if (instantationByAngularDI && rawInstance === null) {
			return this;
		}
		let _rawInstance: any;
		if (!rawInstance) {
			_rawInstance = this.ctor.template();
		} else {
			_rawInstance = rawInstance;
			_rawInstance.id = _rawInstance.id || undefined;
			const alreadyExisting = this.ctor.find(_rawInstance.id);
			if (alreadyExisting) {
				// TODO: (OPTIONAL?) LOGIC TO overwrite fields from new source;
				return alreadyExisting;
			}
		}
		this._populateFields(_rawInstance);
		const proxyInstance = updateInterceptProxyFactory(this);
		this._populateRelations(proxyInstance);
		const init = this.onInit.bind(undefined);
		init(proxyInstance, _rawInstance);
		Reflect.defineMetadata(METAKEYS.UPDATED, {}, proxyInstance);
		this._metaAdd(proxyInstance);
		return proxyInstance;
	}

	/**
	 * Do some business logic upon initialization. This method is called by the constructor; do not override constructor unless you know what you're doing
	 * @param rawInstance the raw instance template as consumed by the constructor
	 * @returns void You cannot return anything from the onInit hook.
	 */
	public onInit(instance: this, rawInstance: RawInstanceTemplate<this>): void {}

	/**
	 * Runs the save pipeline of your model for a single resource using the simple request adapter and builder.
	 * @param  HttpClientOptions={} options
	 * @returns Promise<T>
	 */
	public save(options: HttpClientOptions = {}): Observable<void> {
		const name = Reflect.getMetadata(METAKEYS.PLURAL, this.constructor);
		const body = this._adapter.save(this);
		const $request = this._builder.save(name, body, options).pipe(
			map((response: Object) => this._adapter.parseIncoming(response)),
			tap((rawInstance: RawInstanceTemplate<any>) => {
				this.id = rawInstance.id;
				this._metaAdd(this);
			}),
			map(() => {})
			// there is no need to construct anything here, we only need to set the id to the current instance,
			// and add it to the internal collection, and then return this.
		);
		return $request;
	}
	/**

	 * Runs the update pipeline of your model for a single resource using the simple request adapter and builder.
	 * @param  HttpClientOptions={} options
	 * @returns Promise<void>
	 */
	public update(options: HttpClientOptions = {}): Observable<void> {
		const name = Reflect.getMetadata(METAKEYS.PLURAL, this.constructor);
		const affectedKeys = Reflect.getMetadata(METAKEYS.UPDATED, this);
		if (Object.keys(affectedKeys).length === 0) {
			return of();
		}
		const body = this._adapter.update(this, affectedKeys);
		const $request = this._builder.update(name, body, options);
		return $request.pipe(map(() => {}));
	}

	/**
	 * Runs the delete pipeline of your model for a single resource using the simple request adapter and builder.
	 * @param  HttpClientOptions={} options
	 * @returns Promise<void>
	 */
	public delete(options: HttpClientOptions = {}): Observable<void> {
		const name = Reflect.getMetadata(METAKEYS.PLURAL, this.constructor);
		const $request = this._builder.delete(name, this, options).pipe(tap(this._metaRemove.bind(this)));
		return $request.pipe(map(() => {}));
	}

	/** @internal */
	private get ctor(): ResourceType<this> {
		return <ResourceType<this>>this.constructor;
	}
	/** @internal */
	private _populateFields(rawInstance: any) {
		const fields = Reflect.getMetadata(METAKEYS.FIELDS, this.constructor) as Array<string>;
		fields.forEach(field => {
			const keyMap = Reflect.getMetadata(METAKEYS.MAP, this.constructor, field);
			if (keyMap && rawInstance.hasOwnProperty(keyMap)) {
				this._instantiateAttributeValue(field, rawInstance[keyMap]);
			} else if (rawInstance.hasOwnProperty(field)) {
				this._instantiateAttributeValue(field, rawInstance[field]);
			} else if (!rawInstance.hasOwnProperty(field)) {
				const optionalKeys = Reflect.getMetadata(METAKEYS.OPTIONAL_FIELDS, this.constructor);
				if (optionalKeys.includes(field)) {
					this._instantiateAttributeValue(field, undefined);
				} else {
					throw Error(
						`A non-optional key was missing when trying to create an instance of resource ${Reflect.getMetadata(
							METAKEYS.PLURAL,
							this.constructor
						)}.
					 Missing key: ${field}.
					 Mapped from api response: ${keyMap ? keyMap : 'not mapped'}.`
					);
				}
			}
		});
	}

	/** @internal */
	private _instantiateAttributeValue(field: any, value: any): any {
		const typeConstructor = Reflect.getMetadata('design:type', this, field);
		if (typeConstructor !== String && typeConstructor !== ToOneRelation && typeConstructor !== ToManyRelation ) {
			this[field] = new typeConstructor(value);
		} else {
			this[field] = value;
		}
	}
	/** @internal */
	private _populateRelations(host: this) {
		const relations = Reflect.getMetadata(METAKEYS.RELATIONS, host.constructor);
		Reflect.ownKeys(relations).forEach(key => {
			const config = relations[key];
			switch (config.type) {
				case RelationType.ToOne:
					host[key] = new ToOneRelation<this, any>(host, config, host._toOneAdapter, host._toOneBuilder);
					break;
				case RelationType.ToMany:
					host[key] = new ToManyRelation<this, any>(host, config, host._toManyAdapter, host._toManyBuilder);
					break;
				default:
					throw Error('shouldnt come here');
			}
		});
	}

	/** @internal add instance to the metadata instance list*/
	private _metaAdd(instance: this) {
		if (this.id) {
			const list = Reflect.getMetadata(METAKEYS.INSTANCES, this.constructor);
			list.push(instance);
		}
	}

	/** @internal remove instance from the metadata instance list*/
	private _metaRemove() {
		const list = Reflect.getMetadata(METAKEYS.INSTANCES, this.constructor);
		for (let n = 0; n < list.length; n++) {
			if (list[n].id === this.id) {
				list.splice(n, 1);
				break;
			}
		}
	}

	/** @internal */
	private _handleInjections(dependencies: UnresolvedRequestHandlers) {
		// the assumption is that if (at least one) of the injections was undefined, the
		// instantiation was not done by Angulars dependency injection.
		const instantationByAngularDI = !dependencies.includes(undefined);
		if (!instantationByAngularDI) {
			dependencies = getDependencyInjectionEntries(this.ctor) as RequestHandlers;
		}
		const filledDependencies = dependencies as RequestHandlers;
		this._adapter = filledDependencies[0];
		this._builder = filledDependencies[1];
		this._toOneAdapter = filledDependencies[2];
		this._toOneBuilder = filledDependencies[3];
		this._toManyAdapter = filledDependencies[4];
		this._toManyBuilder = filledDependencies[5];
		return instantationByAngularDI;
	}
}
