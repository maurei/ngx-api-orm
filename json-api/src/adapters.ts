/* tslint:disable: no-non-null-assertion */
import 'reflect-metadata';
import { Injectable } from '@angular/core';
import {
	ParsedJsonApiResource,
	JsonApiMeta,
	JsonApiAttributes,
	UJsonApiResourceIdentifier,
	JsonApiRelationship,
	JsonApiLink,
	JsonApiResource,
	JsonApiResourceIdentifier,
	JsonApiBaseResponse,
	UJsonApiResource,
	JsonApiResponse,
	JsonApiError
} from './declarations';

import { AbstractAdapters as Abstract } from '@ngx-api-orm/core';
import { METAKEYS } from '@ngx-api-orm/core';

/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */

/** @internal */
export namespace JsonApiAdapters {
	/** @internal */
	@Injectable({ providedIn: 'root' })
	export class Simple extends Abstract.SimpleAdapter {
		public save(instance: any): JsonApiResponse<JsonApiResource> {
			const data = this.convertOutgoingToJsonApi(instance);
			return { data: data };
		}
		public update(instance: any, affectedFields: { [field: string]: string | undefined | null }): JsonApiResponse<JsonApiResource> {
			const data = this.convertOutgoingToJsonApi(instance, affectedFields);
			return { data: data };
		}

		private convertOutgoingToJsonApi(instance: any, affectedFields?: any): any {
			const raw = super.convertOutgoing(instance);
			const data = this._dataFactory(instance);
			if (affectedFields) {
				Object.keys(affectedFields).forEach(f => {
					if (f !== 'id') {
						const map = Reflect.getMetadata(METAKEYS.MAP, instance.constructor, f);
						data.attributes![map || f] = raw[map || f];
						delete affectedFields[f];
					}
				});
			} else {
				(<Array<string>>Reflect.getMetadata(METAKEYS.ATTRIBUTES, instance.constructor)).forEach(attr => {
					if (attr !== 'id') {
						data.attributes![attr] = raw[attr];
					}
				});
			}
			return data;
		}

		public parseIncoming(response: JsonApiResponse) {
			const included: JsonApiResource[] | undefined = response.included;
			const parsed: any[] = [];
			let resources: JsonApiResource[];
			response.data instanceof Array ? (resources = response.data) : (resources = [response.data]);
			resources.forEach(i => parsed.push(this._parseResources(i, included)));
			return parsed;
		}

		private _dataFactory(instance: any): JsonApiResource {
			return {
				id: instance.id ? instance.id.toString() : undefined,
				type: Reflect.getMetadata(METAKEYS.SINGULAR, instance.constructor),
				attributes: {}
			};
		}

		private _parseResources(data: JsonApiResource, included?: JsonApiResource[]): ParsedJsonApiResource {
			const instance: ParsedJsonApiResource = { id: data.id! };
			Object.assign(instance, data.attributes);
			if (data.relationships && included) {
				const relationships = data.relationships;
				Object.getOwnPropertyNames(data.relationships).forEach(r => {
					const target = relationships[r].data;
					let related;
					if (target) {
						target instanceof Array
							? (related = target.map(t => this._parseResourceIdentifier(t, included)).filter(p => !!p))
							: (related = this._parseResourceIdentifier(target, included));
					} else {
						related = null;
					}
					instance[r] = related;
				});
			}
			return instance;
		}
		private _parseResourceIdentifier(target: JsonApiResourceIdentifier, included: JsonApiResource[]): ParsedJsonApiResource | null {
			/* if we can be sure that the server returns included as a sorted list, we could do a binary search here to be faster. Maybe include an option for this later*/
			const match = included.find(incl => incl.id === target.id && incl.type === target.type);
			if (!match) {
				return null;
			}
			return match ? this._parseResources(match!) : null;
		}
	}
	/** @internal */
	@Injectable({ providedIn: 'root' })
	export class ToOne extends Abstract.ToOneAdapter {
		public add(targetInstance: any, relatedInstance: any): JsonApiResponse<JsonApiResourceIdentifier> {
			return {
				data: {
					type: Reflect.getMetadata(METAKEYS.SINGULAR, targetInstance.constructor),
					id: targetInstance.id.toString()
				}
			};
		}
		public remove(targetInstance: any, relatedInstance: any): JsonApiResponse<null> {
			return { data: null };
		}
	}
	/** @internal */
	@Injectable({ providedIn: 'root' })
	export class ToMany extends Abstract.ToManyAdapter {
		public add(targetInstance: any, relatedInstance: any): JsonApiResponse<JsonApiResourceIdentifier> {
			return {
				data: {
					type: Reflect.getMetadata(METAKEYS.SINGULAR, targetInstance.constructor),
					id: targetInstance.id.toString()
				}
			};
		}
		public remove(targetInstance: any, relatedInstance: any) {
			return {
				data: {
					type: Reflect.getMetadata(METAKEYS.SINGULAR, targetInstance.constructor),
					id: targetInstance.id.toString()
				}
			};
		}
	}
}
