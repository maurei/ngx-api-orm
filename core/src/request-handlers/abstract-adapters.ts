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
		public parseIncoming(rawInstances: Object): Object[] {
			return <Object[]>rawInstances;
		}
		protected convertOutgoing(instance: any): any {
			const rv = {};
			const fields = Reflect.getMetadata(METAKEYS.FIELDS, instance.constructor);
			fields.forEach((f: string) => {
				if (instance[f] instanceof ToOneRelation) {
					rv[f] = instance[f].instance === null ? null : this.convertOutgoing(instance[f].instance);
				} else if (instance[f] instanceof Array) {
					rv[f] = [];
					instance[f].forEach( (i: any) => rv[f].push(this.convertOutgoing(i)));
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
