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
ToManyRelation = /** @class */ (function (_super) {
    tslib_1.__extends(ToManyRelation, _super);
    function ToManyRelation(_hostInstance, _configuration, _adapter, _builder) {
        var _this = _super.call(this) || this;
        _this._hostInstance = _hostInstance;
        _this._configuration = _configuration;
        _this._adapter = _adapter;
        _this._builder = _builder;
        /**
         * Runs the add pipeline of your model for a related resource using the To-Many request adapter and builder.
         * @param TRelated relatedInstance
         * @param any={} options
         */
        _this.add = function (relatedInstance, options) {
            if (options === void 0) { options = {}; }
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var hostName, relatedName, body;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
                            relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
                            if (!(relatedInstance instanceof this._configuration.RelatedResource)) {
                                throw new TypeError('parameter relatedInstance must be of type ' + relatedName);
                            }
                            body = this._adapter.add(relatedInstance, this._hostInstance);
                            return [4 /*yield*/, this._builder.add(relatedName, hostName, body, this._hostInstance, options)];
                        case 1:
                            _a.sent();
                            this.push(relatedInstance);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Runs the delete pipeline of your model for a related resource using the To-Many request adapter and builder.
         * @param TRelated relatedInstance
         * @param any={} options
         */
        _this.remove = function (relatedInstance, options) {
            if (options === void 0) { options = {}; }
            return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var hostName, relatedName, body;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            hostName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.HostResource);
                            relatedName = Reflect.getMetadata(METAKEYS.NAME, this._configuration.RelatedResource);
                            if (this.findIndex(function (ri) { return ri.id === relatedInstance.id; }) === -1) {
                                throw new RangeError('parameter relatedInstance not included in this RelatedResourceCollection');
                            }
                            body = this._adapter.remove(relatedInstance, this._hostInstance);
                            return [4 /*yield*/, this._builder.remove(relatedName, hostName, body, this._hostInstance, options)];
                        case 1:
                            _a.sent();
                            this._removeInstance(relatedInstance);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * \@internal
         */
        _this._removeInstance = function (relatedInstance) {
            for (var n = 0; n < _this.length; n++) {
                if (_this[n].id === relatedInstance.id) {
                    _this.splice(n, 1);
                    break;
                }
            }
        };
        /** @type {?} */
        var rawObjects = _hostInstance[_configuration.keyOnInstance] || null;
        if (rawObjects == null) {
            return _this;
        }
        /** @type {?} */
        var instances = Array.prototype.concat.apply([], [/** @type {?} */ (_configuration.RelatedResource.factory(rawObjects))]);
        _this.push.apply(_this, instances);
        return _this;
    }
    return ToManyRelation;
}(Array));
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * @template THost, TRelated
 */
export { ToManyRelation };
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