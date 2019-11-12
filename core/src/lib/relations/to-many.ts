import { RelationConfiguration } from './relation-configuration';
import { Resource } from '../resource.core';
import { METAKEYS, HttpClientOptions } from '../utils';
import { ToManyBuilder } from '../request-handlers/default-builders';
import { ToManyAdapter } from '../request-handlers/default-adapters';
import { ToOneRelation } from './to-one';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// @dynamic
export class ToManyRelation<THost extends Resource, TRelated extends Resource> extends Array<
	TRelated
> {
	constructor(
		private readonly _hostInstance: THost,
		private readonly _configuration: RelationConfiguration<THost, TRelated>,
		private readonly _adapter: ToManyAdapter,
		private readonly _builder: ToManyBuilder,
	) {
		super();
		let rawObjects: Array<{}> | null = _hostInstance[_configuration.keyOnInstance];
		if (rawObjects != null && !rawObjects.length) {
			rawObjects = null;
		}
		const backPointingConfig = _configuration.circular;
		if (rawObjects == null) {
			return;
		}
		if (backPointingConfig) {
			rawObjects.forEach(ro => (ro[backPointingConfig.keyOnInstance] = null));
		}
		const instances = Array.prototype.concat.apply([], [<TRelated[]>_configuration.RelatedResource.factory(rawObjects)]);

		if (backPointingConfig) {
			instances.forEach((i: TRelated) => {
				const relatedInstance = i[backPointingConfig.keyOnInstance];
				if (relatedInstance instanceof ToOneRelation) {
					relatedInstance.instance = _hostInstance;
				} else {
					relatedInstance.push(_hostInstance);
				}
			});
		}

		this.push(...instances);
	}
	// TODO: IMPLEMENT FETCH (LAZY GETTING OF RELATIONS)
	// TODO: IMPLEMENT SET (LAZY SYNC OF CHANGES: COMPLETE REPLACE)

	/*tslint:disable semicolon*/
	/**
	 * Runs the add pipeline of your model for a related resource using the To-Many request adapter and builder.
	 * @param  TRelated relatedInstance
	 * @param  any={} options
	 */
	public add = (relatedInstance: TRelated, options: HttpClientOptions = {}): Observable<void> => {
		const hostName = Reflect.getMetadata(METAKEYS.PLURAL, this._configuration.HostResource);
		const relatedName = Reflect.getMetadata(METAKEYS.PLURAL, this._configuration.RelatedResource);

		if (!(relatedInstance instanceof this._configuration.RelatedResource)) {
			throw new TypeError('parameter relatedInstance must be of type ' + relatedName);
		}
		const body = this._adapter.add(relatedInstance, this._hostInstance);
		const $request = this._builder
			.add(relatedName, hostName, body, this._hostInstance, options)
			.pipe(tap(() => this.push(relatedInstance)));
		return $request;
	};

	/**
	 * Runs the delete pipeline of your model for a related resource using the To-Many request adapter and builder.
	 * @param  TRelated relatedInstance
	 * @param  any={} options
	 */
	public remove = (relatedInstance: TRelated, options: HttpClientOptions = {}): Observable<void> => {
		const hostName = Reflect.getMetadata(METAKEYS.PLURAL, this._configuration.HostResource);
		const relatedName = Reflect.getMetadata(METAKEYS.PLURAL, this._configuration.RelatedResource);

		if (this.findIndex(ri => ri.id === relatedInstance.id) === -1) {
			throw new RangeError('parameter relatedInstance not included in this RelatedResourceCollection');
		}
		const body = this._adapter.remove(relatedInstance, this._hostInstance);
		const $request = this._builder
			.remove(relatedName, hostName, body, this._hostInstance, options)
			.pipe(tap(() => this._removeInstance(relatedInstance)));
		return $request;

	};

	/** @internal */
	private _removeInstance = (relatedInstance: TRelated) => {
		for (let n = 0; n < this.length; n++) {
			if (this[n].id === relatedInstance.id) {
				this.splice(n, 1);
				break;
			}
		}
	};
	/*tslint:enable semicolon*/
}

