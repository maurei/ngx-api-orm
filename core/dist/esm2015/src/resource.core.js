/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Optional } from '@angular/core';
import { getDependencyInjectionEntries, METAKEYS, updateInterceptProxyFactory, readOnlyArrayProxyFactory } from './utils';
import { ToManyRelation } from './relations/to-many';
import { RelationType } from './relations/relation-configuration';
import { ToOneRelation } from './relations/to-one';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
/**
 * A dummy class required to allow for an optional argument in the constructor of your model while keeping it compatible with Angular's dependency injection.
 *
 * There is no need to use this type anywhere explicitly.
 *
 * On the other hand, the type {\@link RawInstanceTemplate<T>} might come in handy when instantiating instances of your model from plain objects, e.g. when using the [factory method]{\@link Resource#factory}.
 *
 */
export class RawInstance {
}
export class Resource {
    /**
     * Do not override the constructor unless you're know what you're doing. If you think you need it, be sure the check out the source code to see make sure your implementation is not messing with anything internally.
     *
     * @param {?=} rawInstance
     * @param {?=} simpleAdapter
     * @param {?=} simpleBuilder
     * @param {?=} toOneAdapter
     * @param {?=} toOneBuilder
     * @param {?=} toManyAdapter
     * @param {?=} toManyBuilder
     */
    constructor(rawInstance /* need to figure out how to refer to inheriting type here */, simpleAdapter, simpleBuilder, toOneAdapter, toOneBuilder, toManyAdapter, toManyBuilder) {
        /** @type {?} */
        const requestHandlers = [
            simpleAdapter,
            simpleBuilder,
            toOneAdapter,
            toOneBuilder,
            toManyAdapter,
            toManyBuilder
        ];
        /** *
         * The constructor can be called by the dependency injector or by the user. In the former case, assuming that the user did not manually inject the requestHandlers, only the first parameter will be falsy. In the latter case, only the first parameter will be truthy, in which case we will retrieve the injections by getDependencyInjectionEntries (see _handleInjections internal method).
          @type {?} */
        const instantationByAngularDI = this._handleInjections(requestHandlers);
        if (instantationByAngularDI && rawInstance === null) {
            return this;
        }
        /** @type {?} */
        let _rawInstance;
        if (!rawInstance) {
            _rawInstance = this.ctor.template();
        }
        else {
            _rawInstance = rawInstance;
            _rawInstance.id = _rawInstance.id || undefined;
            /** @type {?} */
            const alreadyExisting = this.ctor.find(_rawInstance.id);
            if (alreadyExisting) {
                return alreadyExisting;
            }
        }
        this._populateFields(_rawInstance);
        this._populateRelations();
        this.onInit(_rawInstance);
        /** @type {?} */
        const proxyInstance = updateInterceptProxyFactory(this);
        Reflect.defineMetadata(METAKEYS.UPDATED, {}, proxyInstance);
        this._metaAdd(proxyInstance);
        return proxyInstance;
    }
    /**
     * Used internally for {\@link Resource#collection}. Don't use this one, use {\@link Resource#collection} instead.
     * @return {?} T[]
     */
    static get _instances() {
        return readOnlyArrayProxyFactory(Reflect.getMetadata(METAKEYS.INSTANCES, this));
    }
    /**
     * Retrieve an immutable list of all of the instances of your model.
     * @template T
     * @this {?}
     * @return {?} T[]
     */
    static collection() {
        return this._instances;
    }
    /**
     * @template T
     * @this {?}
     * @param {?} input
     * @return {?}
     */
    static factory(input) {
        if (input instanceof Array) {
            return /** @type {?} */ (input.map(ro => new this(ro)));
        }
        else if (input instanceof Object) {
            return /** @type {?} */ (new this(input));
        }
        else {
            throw new TypeError('Overload error');
        }
    }
    /**
     * Find a locally available instance of your model by id. Does not make any requests.
     * @template T
     * @this {?}
     * @param {?} id
     * @return {?} T
     */
    static find(id) {
        return this.collection().find((i) => i.id === id);
    }
    /**
     * Runs the fetch pipeline of your model for a single resource using the simple request adapter and builder.
     * @template T
     * @this {?}
     * @param {?=} options
     * @return {?} Promise<T>
     */
    static fetch(options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const injections = getDependencyInjectionEntries(this);
            /** @type {?} */
            const adapter = injections[0];
            /** @type {?} */
            const builder = injections[1];
            /** @type {?} */
            const resourceName = Reflect.getMetadata(METAKEYS.NAME, this);
            /** @type {?} */
            const response = yield builder.fetch(resourceName, options);
            /** @type {?} */
            const rawInstances = adapter.parseIncoming(response);
            return this.factory(rawInstances);
        });
    }
    /**
     * Call this method to get an empty template for your model. This can for example be useful to use as a model for forms.
     * @template T
     * @this {?}
     * @return {?} A raw instance template object.
     */
    static template() {
        /** @type {?} */
        const rawInstance = {};
        Reflect.getMetadata(METAKEYS.FIELDS, this).forEach((field) => (rawInstance[field] = undefined));
        return /** @type {?} */ ((/** @type {?} */ (rawInstance)));
    }
    /**
     * Do some business logic upon initialization. This method is called by the constructor; do not override constructor unless you know what you're doing
     * @param {?} rawInstance the raw instance template as consumed by the constructor
     * @return {?} void You cannot return anything from the onInit hook.
     */
    onInit(rawInstance) { }
    /**
     * Runs the save pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<T>
     */
    save(options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const name = Reflect.getMetadata(METAKEYS.NAME, this.constructor);
            /** @type {?} */
            const body = this._adapter.save(this);
            /** @type {?} */
            const response = yield this._builder.save(name, body, options);
            /** @type {?} */
            const rawInstance = this._adapter.parseIncoming(response);
            return this.ctor.factory(/** @type {?} */ (rawInstance));
        });
    }
    /**
     * Runs the update pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<void>
     */
    update(options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const name = Reflect.getMetadata(METAKEYS.NAME, this.constructor);
            /** @type {?} */
            const affectedKeys = Reflect.getMetadata(METAKEYS.UPDATED, this);
            /** @type {?} */
            const body = this._adapter.update(this, affectedKeys);
            yield this._builder.update(name, body, options);
        });
    }
    /**
     * Runs the delete pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<void>
     */
    delete(options = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const name = Reflect.getMetadata(METAKEYS.NAME, this.constructor);
            yield this._builder.delete(name, this, options);
            this._metaRemove();
        });
    }
    /**
     * \@internal
     * @return {?}
     */
    get ctor() {
        return /** @type {?} */ (this.constructor);
    }
    /**
     * \@internal
     * @param {?} rawInstance
     * @return {?}
     */
    _populateFields(rawInstance) {
        /** @type {?} */
        const fields = /** @type {?} */ (Reflect.getMetadata(METAKEYS.FIELDS, this.constructor));
        fields.forEach(field => {
            /** @type {?} */
            const map = Reflect.getMetadata(METAKEYS.MAP, this.constructor, field);
            if (map && rawInstance.hasOwnProperty(map)) {
                this[field] = rawInstance[map];
            }
            else if (rawInstance.hasOwnProperty(field)) {
                this[field] = rawInstance[field];
            }
            else if (!rawInstance.hasOwnProperty(field)) {
                throw Error(`Expected key ${field} for instance of class ${Reflect.getMetadata(METAKEYS.NAME, this.constructor)} but it wasn't included`);
            }
        });
    }
    /**
     * \@internal
     * @return {?}
     */
    _populateRelations() {
        /** @type {?} */
        const relations = Reflect.getMetadata(METAKEYS.RELATIONS, this.constructor);
        Reflect.ownKeys(relations).forEach(key => {
            /** @type {?} */
            const config = relations[key];
            switch (config.type) {
                case RelationType.ToOne:
                    this[key] = new ToOneRelation(this, config, this._toOneAdapter, this._toOneBuilder);
                    break;
                case RelationType.ToMany:
                    this[key] = new ToManyRelation(this, config, this._toManyAdapter, this._toManyBuilder);
                    break;
                default:
                    throw Error('shouldnt come here');
            }
        });
    }
    /**
     * \@internal add instance to the metadata instance list
     * @param {?} instance
     * @return {?}
     */
    _metaAdd(instance) {
        if (this.id) {
            /** @type {?} */
            const list = Reflect.getMetadata(METAKEYS.INSTANCES, this.constructor);
            list.push(instance);
        }
    }
    /**
     * \@internal remove instance from the metadata instance list
     * @return {?}
     */
    _metaRemove() {
        /** @type {?} */
        const list = Reflect.getMetadata(METAKEYS.INSTANCES, this.constructor);
        for (let n = 0; n < list.length; n++) {
            if (list[n].id === this.id) {
                list.splice(n, 1);
                break;
            }
        }
    }
    /**
     * \@internal
     * @param {?} dependencies
     * @return {?}
     */
    _handleInjections(dependencies) {
        /** @type {?} */
        const instantationByAngularDI = !dependencies.includes(undefined);
        if (!instantationByAngularDI) {
            dependencies = /** @type {?} */ (getDependencyInjectionEntries(this.ctor));
        }
        /** @type {?} */
        const filledDependencies = /** @type {?} */ (dependencies);
        this._adapter = filledDependencies[0];
        this._builder = filledDependencies[1];
        this._toOneAdapter = filledDependencies[2];
        this._toOneBuilder = filledDependencies[3];
        this._toManyAdapter = filledDependencies[4];
        this._toManyBuilder = filledDependencies[5];
        return instantationByAngularDI;
    }
}
/** @nocollapse */
Resource.ctorParameters = () => [
    { type: RawInstance /* need to figure out how to refer to inheriting type here */, decorators: [{ type: Optional }] },
    { type: SimpleAdapter },
    { type: SimpleBuilder },
    { type: ToOneAdapter },
    { type: ToOneBuilder },
    { type: ToManyAdapter },
    { type: ToManyBuilder }
];
if (false) {
    /** @type {?} */
    Resource.prototype._adapter;
    /** @type {?} */
    Resource.prototype._builder;
    /** @type {?} */
    Resource.prototype._toOneAdapter;
    /** @type {?} */
    Resource.prototype._toOneBuilder;
    /** @type {?} */
    Resource.prototype._toManyAdapter;
    /** @type {?} */
    Resource.prototype._toManyBuilder;
    /**
     * Primary key for your model.
     * @type {?}
     */
    Resource.prototype.id;
}
//# sourceMappingURL=resource.core.js.map