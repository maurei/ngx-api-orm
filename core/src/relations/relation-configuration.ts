import { Resource } from '../resource.core';
import { ResourceType } from '../utils';

/** @internal */
export enum RelationType {
	ToOne = 'toOne',
	ToMany = 'toMany',
	None = 'none'
}

export interface IRelationConfiguration {
	readonly HostResource: ResourceType<any>;
	readonly keyOnInstance: any;
	readonly type: RelationType;
	RelatedResource: ResourceType<any>;
	readonly relatedResourceString?: string;
}

// @dynamic
/** @internal */
export class RelationConfiguration<THost extends Resource, TRelated extends Resource> implements IRelationConfiguration {
	public circular: RelationConfiguration<TRelated, THost> | undefined;
	constructor(
		public readonly HostResource: ResourceType<THost>,
		public readonly keyOnInstance: any,
		public readonly type: RelationType,
		public RelatedResource: ResourceType<TRelated>,
		public readonly relatedResourceString?: string,
	) {

	}
}
