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
import { RelationConfiguration } from 'dist/nao-core/lib/relations/relation-configuration';


export class JsonApiResponseDeserializer {

	public parseIncoming(response: JsonApiResponse) {
		const included: JsonApiResource[] | undefined = response.included;
		const parsed: any[] = [];
		let resources: JsonApiResource[];
		response.data instanceof Array ? (resources = response.data) : (resources = [response.data]);
		resources.forEach(i => parsed.push(this._parseResources(i, included)));
		if (!(response.data instanceof Array)) {
			return parsed[0];
		}
		return parsed;
	}

	private _parseResources(data: JsonApiResource, included?: JsonApiResource[]): ParsedJsonApiResource {
		const instance: ParsedJsonApiResource = { id: data.id! };
		Object.assign(instance, data.attributes);
		if (data.relationships) {
			included = included || [];
			const relationships = data.relationships;
			Object.getOwnPropertyNames(data.relationships).forEach(r => {
				const target = relationships[r].data;
				let related;
				if (target) {
					target instanceof Array
						? (related = target.map(t => this._parseResourceIdentifier(t, included!)).filter(p => !!p))
						: (related = this._parseResourceIdentifier(target, included!));
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


/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */
/** @internal */
@Injectable({ providedIn: 'root' })
export class JsonApiSimpleAdapter extends Abstract.SimpleAdapter {

	private responseDeserializer = new JsonApiResponseDeserializer();

	public save(instance: any): JsonApiResponse<JsonApiResource> {
		const relationships: RelationConfiguration<any, any>[] = [];
		const relationshipConfigs = Reflect.getMetadata(METAKEYS.RELATIONS, instance.constructor);
		for (const [key, value] of Object.entries(relationshipConfigs)) {
			const config = value as RelationConfiguration<any, any>;
			const type = config.type;
			if (type === 'toOne' && instance[key].instance) {
				relationships.push(config);
			} else if (instance[key].length) {
				relationships.push(config);
			}
		}
		const data = this.convertOutgoingToJsonApi(instance, null, relationships);
		return { data: data };
	}
	public update(instance: any, affectedFields: { [field: string]: string | undefined | null }): JsonApiResponse<JsonApiResource> {
		const data = this.convertOutgoingToJsonApi(instance, affectedFields);
		return { data: data };
	}

	public parseIncoming(response: JsonApiResponse) {
		return this.responseDeserializer.parseIncoming(response);
	}

	private convertOutgoingToJsonApi(instance: any, affectedFields?: any, relationshipConfigs?: RelationConfiguration<any, any>[]): any {
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
			const attributes = (<Array<string>>Reflect.getMetadata(METAKEYS.ATTRIBUTES, instance.constructor));
			attributes.forEach(attr => {
				if (attr !== 'id') {
					data.attributes![attr] = raw[attr];
				}
			});
			if (relationshipConfigs != null && relationshipConfigs.length) {
				data.relationships = {};
				for (const config of relationshipConfigs) {
					if (config.type === 'toOne') {
						const id = instance[config.keyOnInstance].instance.id;
						const type = Reflect.getMetadata(METAKEYS.PLURAL, config.RelatedResource);
						data.relationships[config.keyOnInstance] = { data: { id, type } };
					}
				}

			}
		}
		return data;
	}

	private _dataFactory(instance: any): JsonApiResource {
		return {
			id: instance.id ? instance.id.toString() : undefined,
			type: Reflect.getMetadata(METAKEYS.PLURAL, instance.constructor),
			attributes: {}
		};
	}
}

/** @internal */
@Injectable({ providedIn: 'root' })
export class JsonApiToOneAdapter extends Abstract.ToOneAdapter {
	/** need to inject this using DI */
	private responseDeserializer = new JsonApiResponseDeserializer();

	public add(targetInstance: any, relatedInstance: any): JsonApiResponse<JsonApiResourceIdentifier> {
		return {
			data: {
				type: Reflect.getMetadata(METAKEYS.PLURAL, targetInstance.constructor),
				id: targetInstance.id.toString()
			}
		};
	}
	public remove(targetInstance: any, relatedInstance: any): JsonApiResponse<null> {
		return { data: null };
	}

	public parseIncoming(response: JsonApiResponse) {
		return this.responseDeserializer.parseIncoming(response);
	}
}

/** @internal */
@Injectable({ providedIn: 'root' })
export class JsonApiToManyAdapter extends Abstract.ToManyAdapter {
	/** need to inject this using DI */
	private responseDeserializer = new JsonApiResponseDeserializer();

	public add(targetInstance: any, relatedInstance: any): JsonApiResponse<JsonApiResourceIdentifier> {
		return {
			data: {
				type: Reflect.getMetadata(METAKEYS.PLURAL, targetInstance.constructor),
				id: targetInstance.id.toString()
			}
		};
	}
	public remove(targetInstance: any, relatedInstance: any) {
		return {
			data: {
				type: Reflect.getMetadata(METAKEYS.PLURAL, targetInstance.constructor),
				id: targetInstance.id.toString()
			}
		};
	}

	public parseIncoming(response: JsonApiResponse) {
		return this.responseDeserializer.parseIncoming(response);
	}

}
