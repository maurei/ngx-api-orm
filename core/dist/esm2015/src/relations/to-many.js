/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { METAKEYS } from '../utils';
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * @template THost, TRelated
 */
export class ToManyRelation extends Array {
    /**
     * @param {?} _hostInstance
     * @param {?} _configuration
     * @param {?} _adapter
     * @param {?} _builder
     */
    constructor(_hostInstance, _configuration, _adapter, _builder) {
        super();
        this._hostInstance = _hostInstance;
        this._configuration = _configuration;
        this._adapter = _adapter;
        this._builder = _builder;
        /**
         * Runs the add pipeline of your model for a related resource using the To-Many request adapter and builder.
         * @param TRelated relatedInstance
         * @param any={} options
         */
        this.add = (relatedInstance, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
            /** @type {?} */
            const relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
            if (!(relatedInstance instanceof this._configuration.RelatedResource)) {
                throw new TypeError('parameter relatedInstance must be of type ' + relatedName);
            }
            /** @type {?} */
            const body = this._adapter.add(relatedInstance, this._hostInstance);
            yield this._builder.add(relatedName, hostName, body, this._hostInstance, options);
            this.push(relatedInstance);
        });
        /**
         * Runs the delete pipeline of your model for a related resource using the To-Many request adapter and builder.
         * @param TRelated relatedInstance
         * @param any={} options
         */
        this.remove = (relatedInstance, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
            /** @type {?} */
            const relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
            if (this.findIndex(ri => ri.id === relatedInstance.id) === -1) {
                throw new RangeError('parameter relatedInstance not included in this RelatedResourceCollection');
            }
            /** @type {?} */
            const body = this._adapter.remove(relatedInstance, this._hostInstance);
            yield this._builder.remove(relatedName, hostName, body, this._hostInstance, options);
            this._removeInstance(relatedInstance);
        });
        /**
         * \@internal
         */
        this._removeInstance = (relatedInstance) => {
            for (let n = 0; n < this.length; n++) {
                if (this[n].id === relatedInstance.id) {
                    this.splice(n, 1);
                    break;
                }
            }
        };
        /** @type {?} */
        const rawObjects = _hostInstance[_configuration.keyOnInstance] || null;
        if (rawObjects == null) {
            return;
        }
        /** @type {?} */
        const instances = Array.prototype.concat.apply([], [/** @type {?} */ (_configuration.RelatedResource.factory(rawObjects))]);
        this.push(...instances);
    }
}
if (false) {
    /**
     * Runs the add pipeline of your model for a related resource using the To-Many request adapter and builder.
     * \@param TRelated relatedInstance
     * \@param any={} options
     * @type {?}
     */
    ToManyRelation.prototype.add;
    /**
     * Runs the delete pipeline of your model for a related resource using the To-Many request adapter and builder.
     * \@param TRelated relatedInstance
     * \@param any={} options
     * @type {?}
     */
    ToManyRelation.prototype.remove;
    /**
     * \@internal
     * @type {?}
     */
    ToManyRelation.prototype._removeInstance;
    /** @type {?} */
    ToManyRelation.prototype._hostInstance;
    /** @type {?} */
    ToManyRelation.prototype._configuration;
    /** @type {?} */
    ToManyRelation.prototype._adapter;
    /** @type {?} */
    ToManyRelation.prototype._builder;
}
//# sourceMappingURL=to-many.js.map