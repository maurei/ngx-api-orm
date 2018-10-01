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
export class ToOneRelation {
    /**
     * @param {?} _hostInstance
     * @param {?} _configuration
     * @param {?} _adapter
     * @param {?} _builder
     */
    constructor(_hostInstance, _configuration, _adapter, _builder) {
        this._hostInstance = _hostInstance;
        this._configuration = _configuration;
        this._adapter = _adapter;
        this._builder = _builder;
        /** @type {?} */
        const rawObject = _hostInstance[_configuration.keyOnInstance] || null;
        this.instance = rawObject === null ? null : _configuration.RelatedResource.factory(rawObject);
    }
    /**
     * Synchronize the model without using explicitly using `set` or `add`. This way it is possible to update a relation using e.g. DOM interactions without making premature requests.
     * @return {?} Promise<void>
     */
    sync() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.instance === null) {
                yield this.remove();
            }
            else {
                yield this.set(this.instance);
            }
        });
    }
    /**
     * Runs the delete pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param {?=} options
     * @return {?} Promise
     */
    remove(options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.instance) {
                /** @type {?} */
                const hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
                /** @type {?} */
                const relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
                /** @type {?} */
                const body = this._adapter.remove(this.instance, this._hostInstance);
                yield this._builder.remove(relatedName, hostName, body, this._hostInstance, options);
                this.instance = null;
            }
        });
    }
    /**
     * Runs the add pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param {?} targetInstance
     * @param {?=} options
     * @return {?} Promise
     */
    set(targetInstance, options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
            /** @type {?} */
            const relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
            /** @type {?} */
            const body = this._adapter.add(targetInstance, this._hostInstance);
            yield this._builder.add(relatedName, hostName, body, this._hostInstance, options);
            this.instance = targetInstance;
        });
    }
}
if (false) {
    /**
     * The references to the related instance
     * @type {?}
     */
    ToOneRelation.prototype.instance;
    /** @type {?} */
    ToOneRelation.prototype._hostInstance;
    /** @type {?} */
    ToOneRelation.prototype._configuration;
    /** @type {?} */
    ToOneRelation.prototype._adapter;
    /** @type {?} */
    ToOneRelation.prototype._builder;
}
//# sourceMappingURL=to-one.js.map