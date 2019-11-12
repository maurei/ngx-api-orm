import { RelationConfiguration } from './relation-configuration';
import { Resource } from '../resource.core';
import { METAKEYS, HttpClientOptions } from '../utils';
import { ToOneBuilder } from '../request-handlers/default-builders';
import { ToOneAdapter } from '../request-handlers/default-adapters';
import { Observable, EMPTY } from 'rxjs';
import { tap } from 'rxjs/operators';

export class ToOneRelation<THost extends Resource, TRelated extends Resource> {
	/** The references to the related instance */
	public instance: TRelated | null;
	constructor(
		private readonly _hostInstance: THost,
		private readonly _configuration: RelationConfiguration<THost, TRelated>,
		private readonly _adapter: ToOneAdapter,
		private readonly _builder: ToOneBuilder
	) {
		const rawObject: {} = _hostInstance[_configuration.keyOnInstance] || null;

		let backPointingConfig: RelationConfiguration<TRelated, THost> | undefined;
		if (_configuration.circular && rawObject != null) {
			backPointingConfig = _configuration.circular;
			rawObject[backPointingConfig.keyOnInstance] = null;
		}

		this.instance = rawObject === null ? null : _configuration.RelatedResource.factory(rawObject);
		if (backPointingConfig && this.instance) {
			const relationWrapper = this.instance[backPointingConfig.keyOnInstance];
			if (relationWrapper instanceof ToOneRelation) {
				relationWrapper.instance = _hostInstance;
			} else {
				relationWrapper.push(_hostInstance);
			}
		}
	}

	// TODO: IMPLEMENT FETCH (LAZY GETTING OF RELATIONS)

	/**
	 * Synchronize the model without using explicitly using `set` or `add`. This way it is possible to update a relation using e.g. DOM interactions without making premature requests.
	 * @returns Promise<void>
	 */
	public sync(): Observable<void> {
		if (this.instance === null) {
			return this.remove();
		} else {
			return this.set(this.instance);
		}
	}

	/**
	 * Runs the delete pipeline of your model for a related resource using the To-One request adapter and builder.
	 * @param  TRelated targetInstance
	 * @param  HttpClientOptions={} options
	 * @returns Promise
	 */
	public remove(options: HttpClientOptions = {}): Observable<void> {
		let $request: Observable<void>;
		if (this.instance) {
			const hostName = Reflect.getMetadata(METAKEYS.PLURAL, this._configuration.HostResource);
			const relatedName = Reflect.getMetadata(METAKEYS.SINGULAR, this._configuration.RelatedResource);
			const body = this._adapter.remove(this.instance, this._hostInstance);
			$request = this._builder.remove(relatedName, hostName, body, this._hostInstance, options).pipe(tap(() => (this.instance = null)));
		} else {
			$request = EMPTY;
		}
		return $request;
	}
	/**
	 * Runs the add pipeline of your model for a related resource using the To-One request adapter and builder.
	 * @param  TRelated targetInstance
	 * @param  HttpClientOptions={} options
	 * @returns Promise
	 */
	public set(targetInstance: TRelated, options: HttpClientOptions = {}): Observable<void> {
		const hostName = Reflect.getMetadata(METAKEYS.PLURAL, this._configuration.HostResource);
		const relatedName = Reflect.getMetadata(METAKEYS.SINGULAR, this._configuration.RelatedResource);
		const body = this._adapter.add(targetInstance, this._hostInstance);
		const $request = this._builder
			.add(relatedName, hostName, body, this._hostInstance, options)
			.pipe(tap(() => (this.instance = targetInstance)));
		return $request;
	}
}
