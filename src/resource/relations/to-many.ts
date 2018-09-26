import { RelationConfiguration } from './relation-configuration';
import { Resource } from '../resource.core';
import { METAKEYS, HttpClientOptions } from '../utils';
import { ToManyBuilder } from '../request-handlers/default/builders';
import { ToManyAdapter } from '../request-handlers/default/adapters';

// @dynamic
export class ToManyRelation<THost extends Resource, TRelated extends Resource> extends Array<TRelated> {
	constructor(
		private readonly _hostInstance: THost,
		private readonly _configuration: RelationConfiguration<THost, TRelated>,
		private readonly _adapter: ToManyAdapter,
		private readonly _builder: ToManyBuilder
	) {
		super();
		const rawObjects: Array<{}> = _hostInstance[_configuration.keyOnInstance] || null;
		if (rawObjects == null) {
			return;
		}
		const instances = Array.prototype.concat.apply([], [<TRelated[]>_configuration.RelatedResource.factory(rawObjects)]);
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
	public add = async (relatedInstance: TRelated, options: HttpClientOptions = {}): Promise<void> => {
		const hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
		const relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);

		if (!(relatedInstance instanceof this._configuration.RelatedResource)) {
			throw new TypeError('parameter relatedInstance must be of type ' + relatedName);
		}

		const body = this._adapter.add(relatedInstance, this._hostInstance);
		await this._builder.add(relatedName, hostName, body, this._hostInstance, options);
		this.push(relatedInstance);
	};

	/**
	 * Runs the delete pipeline of your model for a related resource using the To-Many request adapter and builder.
	 * @param  TRelated relatedInstance
	 * @param  any={} options
	 */
	public remove = async (relatedInstance: TRelated, options: HttpClientOptions = {}) => {
		const hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
		const relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);

		if (this.findIndex(ri => ri.id === relatedInstance.id) === -1) {
			throw new RangeError('parameter relatedInstance not included in this RelatedResourceCollection');
		}
		const body = this._adapter.remove(relatedInstance, this._hostInstance);
		await this._builder.remove(relatedName, hostName, body, this._hostInstance, options);
		this._removeInstance(relatedInstance);
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
