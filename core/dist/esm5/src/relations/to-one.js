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
var 
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * @template THost, TRelated
 */
ToOneRelation = /** @class */ (function () {
    function ToOneRelation(_hostInstance, _configuration, _adapter, _builder) {
        this._hostInstance = _hostInstance;
        this._configuration = _configuration;
        this._adapter = _adapter;
        this._builder = _builder;
        /** @type {?} */
        var rawObject = _hostInstance[_configuration.keyOnInstance] || null;
        this.instance = rawObject === null ? null : _configuration.RelatedResource.factory(rawObject);
    }
    /**
     * Synchronize the model without using explicitly using `set` or `add`. This way it is possible to update a relation using e.g. DOM interactions without making premature requests.
     * @return {?} Promise<void>
     */
    ToOneRelation.prototype.sync = /**
     * Synchronize the model without using explicitly using `set` or `add`. This way it is possible to update a relation using e.g. DOM interactions without making premature requests.
     * @return {?} Promise<void>
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.instance === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.remove()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.set(this.instance)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Runs the delete pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param {?=} options
     * @return {?} Promise
     */
    ToOneRelation.prototype.remove = /**
     * Runs the delete pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param {?=} options
     * @return {?} Promise
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var hostName, relatedName, body;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.instance) return [3 /*break*/, 2];
                        hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
                        relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
                        body = this._adapter.remove(this.instance, this._hostInstance);
                        return [4 /*yield*/, this._builder.remove(relatedName, hostName, body, this._hostInstance, options)];
                    case 1:
                        _a.sent();
                        this.instance = null;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Runs the add pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param {?} targetInstance
     * @param {?=} options
     * @return {?} Promise
     */
    ToOneRelation.prototype.set = /**
     * Runs the add pipeline of your model for a related resource using the To-One request adapter and builder.
     * @param {?} targetInstance
     * @param {?=} options
     * @return {?} Promise
     */
    function (targetInstance, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var hostName, relatedName, body;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
                        relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
                        body = this._adapter.add(targetInstance, this._hostInstance);
                        return [4 /*yield*/, this._builder.add(relatedName, hostName, body, this._hostInstance, options)];
                    case 1:
                        _a.sent();
                        this.instance = targetInstance;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ToOneRelation;
}());
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * @template THost, TRelated
 */
export { ToOneRelation };
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