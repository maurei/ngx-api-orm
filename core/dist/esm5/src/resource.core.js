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
var /**
 * A dummy class required to allow for an optional argument in the constructor of your model while keeping it compatible with Angular's dependency injection.
 *
 * There is no need to use this type anywhere explicitly.
 *
 * On the other hand, the type {\@link RawInstanceTemplate<T>} might come in handy when instantiating instances of your model from plain objects, e.g. when using the [factory method]{\@link Resource#factory}.
 *
 */
RawInstance = /** @class */ (function () {
    function RawInstance() {
    }
    return RawInstance;
}());
/**
 * A dummy class required to allow for an optional argument in the constructor of your model while keeping it compatible with Angular's dependency injection.
 *
 * There is no need to use this type anywhere explicitly.
 *
 * On the other hand, the type {\@link RawInstanceTemplate<T>} might come in handy when instantiating instances of your model from plain objects, e.g. when using the [factory method]{\@link Resource#factory}.
 *
 */
export { RawInstance };
var Resource = /** @class */ (function () {
    /**
     * Do not override the constructor unless you're know what you're doing. If you think you need it, be sure the check out the source code to see make sure your implementation is not messing with anything internally.
     *
     * @param RawInstance rawInstance A template from which a new instance of your model will be instantiate. If this parameter is omitted, the model will create an instance from the models metadata. If the parameter is included, it **MUST** minimally include all the keys as decorated with {@link Field}, {@link ToOne}, {@link ToMany} in the model definition with. The type `RawInstance` is just a dummy type that is required to make it work with Angular's dependency injection.
     * @param SimpleAdapter simpleAdapter The request content adapter for Simple resource requests.
     * @param SimpleBuilder simpleBuilder The request builder for Simple resource requests.
     * @param ToOneAdapter toOneAdapter The request content adapter for ToOne relationship requests
     * @param ToOneBuilder toOneBuilder The request builder for  ToOne relationship requests
     * @param ToManyAdapter toManyAdapter The request content adapter for ToMany relationship requests
     * @param ToManyBuilder toManyBuilder The request builder for  ToMany relationship requests
     */
    function Resource(rawInstance /* need to figure out how to refer to inheriting type here */, simpleAdapter, simpleBuilder, toOneAdapter, toOneBuilder, toManyAdapter, toManyBuilder) {
        /** @type {?} */
        var requestHandlers = [
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
        var instantationByAngularDI = this._handleInjections(requestHandlers);
        if (instantationByAngularDI && rawInstance === null) {
            return this;
        }
        /** @type {?} */
        var _rawInstance;
        if (!rawInstance) {
            _rawInstance = this.ctor.template();
        }
        else {
            _rawInstance = rawInstance;
            _rawInstance.id = _rawInstance.id || undefined;
            /** @type {?} */
            var alreadyExisting = this.ctor.find(_rawInstance.id);
            if (alreadyExisting) {
                return alreadyExisting;
            }
        }
        this._populateFields(_rawInstance);
        this._populateRelations();
        this.onInit(_rawInstance);
        /** @type {?} */
        var proxyInstance = updateInterceptProxyFactory(this);
        Reflect.defineMetadata(METAKEYS.UPDATED, {}, proxyInstance);
        this._metaAdd(proxyInstance);
        return proxyInstance;
    }
    Object.defineProperty(Resource, "_instances", {
        get: /**
         * Used internally for {\@link Resource#collection}. Don't use this one, use {\@link Resource#collection} instead.
         * @return {?} T[]
         */
        function () {
            return readOnlyArrayProxyFactory(Reflect.getMetadata(METAKEYS.INSTANCES, this));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieve an immutable list of all of the instances of your model.
     * @template T
     * @this {?}
     * @return {?} T[]
     */
    Resource.collection = /**
     * Retrieve an immutable list of all of the instances of your model.
     * @template T
     * @this {?}
     * @return {?} T[]
     */
    function () {
        return this._instances;
    };
    /**
     * @template T
     * @this {?}
     * @param {?} input
     * @return {?}
     */
    Resource.factory = /**
     * @template T
     * @this {?}
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (input instanceof Array) {
            return /** @type {?} */ (input.map(function (ro) { return new _this(ro); }));
        }
        else if (input instanceof Object) {
            return /** @type {?} */ (new this(input));
        }
        else {
            throw new TypeError('Overload error');
        }
    };
    /**
     * Find a locally available instance of your model by id. Does not make any requests.
     * @template T
     * @this {?}
     * @param {?} id
     * @return {?} T
     */
    Resource.find = /**
     * Find a locally available instance of your model by id. Does not make any requests.
     * @template T
     * @this {?}
     * @param {?} id
     * @return {?} T
     */
    function (id) {
        return this.collection().find(function (i) { return i.id === id; });
    };
    /**
     * Runs the fetch pipeline of your model for a single resource using the simple request adapter and builder.
     * @template T
     * @this {?}
     * @param {?=} options
     * @return {?} Promise<T>
     */
    Resource.fetch = /**
     * Runs the fetch pipeline of your model for a single resource using the simple request adapter and builder.
     * @template T
     * @this {?}
     * @param {?=} options
     * @return {?} Promise<T>
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var injections, adapter, builder, resourceName, response, rawInstances;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        injections = getDependencyInjectionEntries(this);
                        adapter = injections[0];
                        builder = injections[1];
                        resourceName = Reflect.getMetadata(METAKEYS.NAME, this);
                        return [4 /*yield*/, builder.fetch(resourceName, options)];
                    case 1:
                        response = _a.sent();
                        rawInstances = adapter.parseIncoming(response);
                        return [2 /*return*/, this.factory(rawInstances)];
                }
            });
        });
    };
    /**
     * Call this method to get an empty template for your model. This can for example be useful to use as a model for forms.
     * @template T
     * @this {?}
     * @return {?} A raw instance template object.
     */
    Resource.template = /**
     * Call this method to get an empty template for your model. This can for example be useful to use as a model for forms.
     * @template T
     * @this {?}
     * @return {?} A raw instance template object.
     */
    function () {
        /** @type {?} */
        var rawInstance = {};
        Reflect.getMetadata(METAKEYS.FIELDS, this).forEach(function (field) { return (rawInstance[field] = undefined); });
        return /** @type {?} */ ((/** @type {?} */ (rawInstance)));
    };
    /**
     * Do some business logic upon initialization. This method is called by the constructor; do not override constructor unless you know what you're doing
     * @param {?} rawInstance the raw instance template as consumed by the constructor
     * @return {?} void You cannot return anything from the onInit hook.
     */
    Resource.prototype.onInit = /**
     * Do some business logic upon initialization. This method is called by the constructor; do not override constructor unless you know what you're doing
     * @param {?} rawInstance the raw instance template as consumed by the constructor
     * @return {?} void You cannot return anything from the onInit hook.
     */
    function (rawInstance) { };
    /**
     * Runs the save pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<T>
     */
    Resource.prototype.save = /**
     * Runs the save pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<T>
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var name, body, response, rawInstance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = Reflect.getMetadata(METAKEYS.NAME, this.constructor);
                        body = this._adapter.save(this);
                        return [4 /*yield*/, this._builder.save(name, body, options)];
                    case 1:
                        response = _a.sent();
                        rawInstance = this._adapter.parseIncoming(response);
                        return [2 /*return*/, this.ctor.factory(/** @type {?} */ (rawInstance))];
                }
            });
        });
    };
    /**
     * Runs the update pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<void>
     */
    Resource.prototype.update = /**
     * Runs the update pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<void>
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var name, affectedKeys, body;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = Reflect.getMetadata(METAKEYS.NAME, this.constructor);
                        affectedKeys = Reflect.getMetadata(METAKEYS.UPDATED, this);
                        body = this._adapter.update(this, affectedKeys);
                        return [4 /*yield*/, this._builder.update(name, body, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Runs the delete pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<void>
     */
    Resource.prototype.delete = /**
     * Runs the delete pipeline of your model for a single resource using the simple request adapter and builder.
     * @param {?=} options
     * @return {?} Promise<void>
     */
    function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var name;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = Reflect.getMetadata(METAKEYS.NAME, this.constructor);
                        return [4 /*yield*/, this._builder.delete(name, this, options)];
                    case 1:
                        _a.sent();
                        this._metaRemove();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Resource.prototype, "ctor", {
        get: /**
         * \@internal
         * @return {?}
         */
        function () {
            return /** @type {?} */ (this.constructor);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * \@internal
     * @param {?} rawInstance
     * @return {?}
     */
    Resource.prototype._populateFields = /**
     * \@internal
     * @param {?} rawInstance
     * @return {?}
     */
    function (rawInstance) {
        var _this = this;
        /** @type {?} */
        var fields = /** @type {?} */ (Reflect.getMetadata(METAKEYS.FIELDS, this.constructor));
        fields.forEach(function (field) {
            /** @type {?} */
            var map = Reflect.getMetadata(METAKEYS.MAP, _this.constructor, field);
            if (map && rawInstance.hasOwnProperty(map)) {
                _this[field] = rawInstance[map];
            }
            else if (rawInstance.hasOwnProperty(field)) {
                _this[field] = rawInstance[field];
            }
            else if (!rawInstance.hasOwnProperty(field)) {
                throw Error("Expected key " + field + " for instance of class " + Reflect.getMetadata(METAKEYS.NAME, _this.constructor) + " but it wasn't included");
            }
        });
    };
    /**
     * \@internal
     * @return {?}
     */
    Resource.prototype._populateRelations = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var relations = Reflect.getMetadata(METAKEYS.RELATIONS, this.constructor);
        Reflect.ownKeys(relations).forEach(function (key) {
            /** @type {?} */
            var config = relations[key];
            switch (config.type) {
                case RelationType.ToOne:
                    _this[key] = new ToOneRelation(_this, config, _this._toOneAdapter, _this._toOneBuilder);
                    break;
                case RelationType.ToMany:
                    _this[key] = new ToManyRelation(_this, config, _this._toManyAdapter, _this._toManyBuilder);
                    break;
                default:
                    throw Error('shouldnt come here');
            }
        });
    };
    /**
     * \@internal add instance to the metadata instance list
     * @param {?} instance
     * @return {?}
     */
    Resource.prototype._metaAdd = /**
     * \@internal add instance to the metadata instance list
     * @param {?} instance
     * @return {?}
     */
    function (instance) {
        if (this.id) {
            /** @type {?} */
            var list = Reflect.getMetadata(METAKEYS.INSTANCES, this.constructor);
            list.push(instance);
        }
    };
    /**
     * \@internal remove instance from the metadata instance list
     * @return {?}
     */
    Resource.prototype._metaRemove = /**
     * \@internal remove instance from the metadata instance list
     * @return {?}
     */
    function () {
        /** @type {?} */
        var list = Reflect.getMetadata(METAKEYS.INSTANCES, this.constructor);
        for (var n = 0; n < list.length; n++) {
            if (list[n].id === this.id) {
                list.splice(n, 1);
                break;
            }
        }
    };
    /**
     * \@internal
     * @param {?} dependencies
     * @return {?}
     */
    Resource.prototype._handleInjections = /**
     * \@internal
     * @param {?} dependencies
     * @return {?}
     */
    function (dependencies) {
        /** @type {?} */
        var instantationByAngularDI = !dependencies.includes(undefined);
        if (!instantationByAngularDI) {
            dependencies = /** @type {?} */ (getDependencyInjectionEntries(this.ctor));
        }
        /** @type {?} */
        var filledDependencies = /** @type {?} */ (dependencies);
        this._adapter = filledDependencies[0];
        this._builder = filledDependencies[1];
        this._toOneAdapter = filledDependencies[2];
        this._toOneBuilder = filledDependencies[3];
        this._toManyAdapter = filledDependencies[4];
        this._toManyBuilder = filledDependencies[5];
        return instantationByAngularDI;
    };
    /** @nocollapse */
    Resource.ctorParameters = function () { return [
        { type: RawInstance /* need to figure out how to refer to inheriting type here */, decorators: [{ type: Optional }] },
        { type: SimpleAdapter },
        { type: SimpleBuilder },
        { type: ToOneAdapter },
        { type: ToOneBuilder },
        { type: ToManyAdapter },
        { type: ToManyBuilder }
    ]; };
    return Resource;
}());
export { Resource };
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