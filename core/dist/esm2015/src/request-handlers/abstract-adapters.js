/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { METAKEYS } from '../utils';
import { ToOneRelation } from '../relations/to-one';
/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */
export var Abstract;
/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */
(function (Abstract) {
    /**
     * @abstract
     */
    class SimpleAdapter {
        /**
         * @param {?} instance
         * @return {?}
         */
        save(instance) {
            return this.convertOutgoing(instance);
        }
        /**
         * @param {?} instance
         * @param {?} affectedFields
         * @return {?}
         */
        update(instance, affectedFields) {
            return this.convertOutgoing(instance);
        }
        /**
         * @param {?} rawInstances
         * @return {?}
         */
        parseIncoming(rawInstances) {
            return /** @type {?} */ (rawInstances);
        }
        /**
         * @param {?} instance
         * @return {?}
         */
        convertOutgoing(instance) {
            /** @type {?} */
            const rv = {};
            /** @type {?} */
            const fields = Reflect.getMetadata(METAKEYS.FIELDS, instance.constructor);
            fields.forEach((f) => {
                if (instance[f] instanceof ToOneRelation) {
                    rv[f] = instance[f].instance === null ? null : this.convertOutgoing(instance[f].instance);
                }
                else if (instance[f] instanceof Array) {
                    rv[f] = [];
                    instance[f].forEach((i) => rv[f].push(this.convertOutgoing(i)));
                }
                else {
                    rv[f] = instance[f];
                }
            });
            Reflect.ownKeys(instance).forEach(property => {
                /** @type {?} */
                const map = Reflect.getMetadata(METAKEYS.MAP, instance.constructor, /** @type {?} */ (property));
                if (map) {
                    rv[map] = rv[property];
                    delete rv[property];
                }
            });
            return rv;
        }
    }
    Abstract.SimpleAdapter = SimpleAdapter;
    /**
     * @abstract
     */
    class ToOneAdapter {
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        add(targetInstance, relatedInstance) {
            return { id: targetInstance.id };
        }
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        remove(targetInstance, relatedInstance) { }
    }
    Abstract.ToOneAdapter = ToOneAdapter;
    /**
     * @abstract
     */
    class ToManyAdapter {
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        add(targetInstance, relatedInstance) {
            return { id: targetInstance.id };
        }
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        remove(targetInstance, relatedInstance) { }
    }
    Abstract.ToManyAdapter = ToManyAdapter;
})(Abstract || (Abstract = {}));
//# sourceMappingURL=abstract-adapters.js.map