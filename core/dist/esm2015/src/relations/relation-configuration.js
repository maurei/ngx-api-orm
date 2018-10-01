/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
const RelationType = {
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
export class RelationConfiguration {
    /**
     * @param {?} HostResource
     * @param {?} RelatedResource
     * @param {?} keyOnInstance
     * @param {?} type
     */
    constructor(HostResource, RelatedResource, keyOnInstance, type) {
        this.HostResource = HostResource;
        this.RelatedResource = RelatedResource;
        this.keyOnInstance = keyOnInstance;
        this.type = type;
    }
}
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