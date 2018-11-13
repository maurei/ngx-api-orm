import { METAKEYS } from '../utils';
import { ToOneRelation } from '../relations/to-one';
import { ToManyRelation } from '../relations/to-many';

/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */
export namespace Abstract {
	export abstract class SimpleAdapter {
		public save(instance: any) {
			return this.convertOutgoing(instance);
		}
		public update(instance: any, affectedFields: { [field: string]: string | undefined | null }) {
			return this.convertOutgoing(instance);
		}
		public parseIncoming(rawInstances: Object): Object {
			return <Object>rawInstances;
		}
		private getBackPointingKey(instance: any) {
			const circular = instance._configuration.circular;
			if (circular) {
				return circular.keyOnInstance;
			} else {
				return '';
			}
		}
		protected convertOutgoing(instance: any, skipRelationKey = ''): any {
			const rv = {};
			const fields = Reflect.getMetadata(METAKEYS.FIELDS, instance.constructor);
			fields.forEach((f: string) => {
				if (skipRelationKey !== '' && f === skipRelationKey) {
					rv[f] = null;
				} else if (instance[f] instanceof ToOneRelation) {
					const backPointingKey = this.getBackPointingKey(instance[f]);
					rv[f] = instance[f].instance === null ? null : this.convertOutgoing(instance[f].instance, backPointingKey);
				} else if (instance[f] instanceof Array) {
					const backPointingKey = this.getBackPointingKey(instance[f]);
					rv[f] = [];
					instance[f].forEach((i: any) => rv[f].push(this.convertOutgoing(i, backPointingKey)));
				} else {
					rv[f] = instance[f];
				}
			});
			Reflect.ownKeys(instance).forEach(property => {
				const map = Reflect.getMetadata(METAKEYS.MAP, instance.constructor, <string>property);
				if (map) {
					rv[map] = rv[property];
					delete rv[property];
				}
			});
			return rv;
		}
	}
	export abstract class ToOneAdapter {
		public add(targetInstance: any, relatedInstance: any): any {
			return { id: targetInstance.id };
		}
		public remove(targetInstance: any, relatedInstance: any): any {}
	}
	export abstract class ToManyAdapter {
		public add(targetInstance: any, relatedInstance: any): any {
			return { id: targetInstance.id };
		}
		public remove(targetInstance: any, relatedInstance: any): any {}
	}
}
