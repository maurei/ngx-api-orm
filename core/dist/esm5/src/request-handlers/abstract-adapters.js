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
    var /**
     * @abstract
     */
    SimpleAdapter = /** @class */ (function () {
        function SimpleAdapter() {
        }
        /**
         * @param {?} instance
         * @return {?}
         */
        SimpleAdapter.prototype.save = /**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            return this.convertOutgoing(instance);
        };
        /**
         * @param {?} instance
         * @param {?} affectedFields
         * @return {?}
         */
        SimpleAdapter.prototype.update = /**
         * @param {?} instance
         * @param {?} affectedFields
         * @return {?}
         */
        function (instance, affectedFields) {
            return this.convertOutgoing(instance);
        };
        /**
         * @param {?} rawInstances
         * @return {?}
         */
        SimpleAdapter.prototype.parseIncoming = /**
         * @param {?} rawInstances
         * @return {?}
         */
        function (rawInstances) {
            return /** @type {?} */ (rawInstances);
        };
        /**
         * @param {?} instance
         * @return {?}
         */
        SimpleAdapter.prototype.convertOutgoing = /**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            var _this = this;
            /** @type {?} */
            var rv = {};
            /** @type {?} */
            var fields = Reflect.getMetadata(METAKEYS.FIELDS, instance.constructor);
            fields.forEach(function (f) {
                if (instance[f] instanceof ToOneRelation) {
                    rv[f] = instance[f].instance === null ? null : _this.convertOutgoing(instance[f].instance);
                }
                else if (instance[f] instanceof Array) {
                    rv[f] = [];
                    instance[f].forEach(function (i) { return rv[f].push(_this.convertOutgoing(i)); });
                }
                else {
                    rv[f] = instance[f];
                }
            });
            Reflect.ownKeys(instance).forEach(function (property) {
                /** @type {?} */
                var map = Reflect.getMetadata(METAKEYS.MAP, instance.constructor, /** @type {?} */ (property));
                if (map) {
                    rv[map] = rv[property];
                    delete rv[property];
                }
            });
            return rv;
        };
        return SimpleAdapter;
    }());
    Abstract.SimpleAdapter = SimpleAdapter;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ToOneAdapter = /** @class */ (function () {
        function ToOneAdapter() {
        }
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        ToOneAdapter.prototype.add = /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        function (targetInstance, relatedInstance) {
            return { id: targetInstance.id };
        };
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        ToOneAdapter.prototype.remove = /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        function (targetInstance, relatedInstance) { };
        return ToOneAdapter;
    }());
    Abstract.ToOneAdapter = ToOneAdapter;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ToManyAdapter = /** @class */ (function () {
        function ToManyAdapter() {
        }
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        ToManyAdapter.prototype.add = /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        function (targetInstance, relatedInstance) {
            return { id: targetInstance.id };
        };
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        ToManyAdapter.prototype.remove = /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        function (targetInstance, relatedInstance) { };
        return ToManyAdapter;
    }());
    Abstract.ToManyAdapter = ToManyAdapter;
})(Abstract || (Abstract = {}));
//# sourceMappingURL=abstract-adapters.js.map