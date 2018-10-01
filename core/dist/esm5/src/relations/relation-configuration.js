/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
var RelationType = {
    ToOne: 'toOne',
    ToMany: 'toMany',
    None: 'none',
};
export { RelationType };
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * \@internal
 * @template THost, TRelated
 */
var 
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * \@internal
 * @template THost, TRelated
 */
RelationConfiguration = /** @class */ (function () {
    function RelationConfiguration(HostResource, RelatedResource, keyOnInstance, type) {
        this.HostResource = HostResource;
        this.RelatedResource = RelatedResource;
        this.keyOnInstance = keyOnInstance;
        this.type = type;
    }
    return RelationConfiguration;
}());
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * \@internal
 * @template THost, TRelated
 */
export { RelationConfiguration };
if (false) {
    /** @type {?} */
    RelationConfiguration.prototype.HostResource;
    /** @type {?} */
    RelationConfiguration.prototype.RelatedResource;
    /** @type {?} */
    RelationConfiguration.prototype.keyOnInstance;
    /** @type {?} */
    RelationConfiguration.prototype.type;
}
//# sourceMappingURL=relation-configuration.js.map