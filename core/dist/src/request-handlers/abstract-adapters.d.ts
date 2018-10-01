/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */
export declare namespace Abstract {
    abstract class SimpleAdapter {
        save(instance: any): any;
        update(instance: any, affectedFields: {
            [field: string]: string | undefined | null;
        }): any;
        parseIncoming(rawInstances: Object): Object[];
        protected convertOutgoing(instance: any): any;
    }
    abstract class ToOneAdapter {
        add(targetInstance: any, relatedInstance: any): any;
        remove(targetInstance: any, relatedInstance: any): any;
    }
    abstract class ToManyAdapter {
        add(targetInstance: any, relatedInstance: any): any;
        remove(targetInstance: any, relatedInstance: any): any;
    }
}
