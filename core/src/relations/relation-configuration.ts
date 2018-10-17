import { Resource } from '../resource.core';
import { ResourceType } from '../utils';

/** @internal */
export enum RelationType {
	ToOne = 'toOne',
	ToMany = 'toMany',
	None = 'none'
}

// @dynamic
/** @internal */
export class RelationConfiguration<THost extends Resource, TRelated extends Resource> {
	constructor(
		public readonly HostResource: ResourceType<THost>,
		public readonly keyOnInstance: any,
		public readonly type: RelationType,
		// public circular?: boolean
		public RelatedResource: ResourceType<TRelated>,
		public readonly relatedResourceString?: string,
	) {

	}
}
