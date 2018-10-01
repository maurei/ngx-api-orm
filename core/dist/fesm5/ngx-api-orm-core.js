/**
 * @license ngx-api-orm
 * MIT license
 */

import { __awaiter, __generator, __extends } from 'tslib';
import { Injectable, NgModule, Injector, Optional, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'reflect-metadata';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} name
 * @return {?}
 */
function toDash(name) {
    /** @type {?} */
    var split = name.split('');
    split[0] = split[0].toLowerCase();
    /** @type {?} */
    var splitJoin = split.join('');
    return splitJoin.replace(/([A-Z])/g, function ($1) {
        return '-' + $1.toLowerCase();
    });
}
/**
 * @param {?} name
 * @return {?}
 */
function toPluralDash(name) {
    return toPlural(toDash(name));
}
/**
 * @param {?} name
 * @return {?}
 */
function toPlural(name) {
    return name + 's';
}
/** *
 * \@internal
  @type {?} */
var InjectorContainer = { instance: undefined };
/**
 * \@internal
 * @param {?} token
 * @return {?}
 */
function getDependencyInjectionEntries(token) {
    if (InjectorContainer["instance"] !== undefined) {
        /** @type {?} */
        var injector = InjectorContainer["instance"];
        /** @type {?} */
        var injectedInstance = injector.get(token);
        return [
            injectedInstance['_adapter'],
            injectedInstance['_builder'],
            injectedInstance['_toOneAdapter'],
            injectedInstance['_toOneBuilder'],
            injectedInstance['_toManyAdapter'],
            injectedInstance['_toManyBuilder']
        ];
    }
    return /** @type {?} */ ([]);
}
/** @enum {string} */
var HttpVerb = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
};
/**
 * \@internal
 * @param {?} ctor
 * @return {?}
 */
function initMetaData(ctor) {
    if (!Reflect.hasOwnMetadata(METAKEYS.FIELDS, ctor)) {
        Reflect.defineMetadata(METAKEYS.FIELDS, [], ctor);
    }
    if (!Reflect.hasOwnMetadata(METAKEYS.ATTRIBUTES, ctor)) {
        Reflect.defineMetadata(METAKEYS.ATTRIBUTES, [], ctor);
    }
    if (!Reflect.hasOwnMetadata(METAKEYS.RELATIONS, ctor)) {
        Reflect.defineMetadata(METAKEYS.RELATIONS, {}, ctor);
    }
    if (!Reflect.hasOwnMetadata(METAKEYS.INSTANCES, ctor)) {
        Reflect.defineMetadata(METAKEYS.INSTANCES, [], ctor);
    }
}
/**
 * \@internal
 * @param {?} targetInstance
 * @return {?}
 */
function updateInterceptProxyFactory(targetInstance) {
    /** @type {?} */
    var attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, targetInstance.constructor);
    return new Proxy(targetInstance, {
        set: /**
         * @param {?} instance
         * @param {?} key
         * @param {?} value
         * @param {?} proxy
         * @return {?}
         */
        function (instance, key, value, proxy) {
            if (attributes.indexOf(key) > -1) {
                /** @type {?} */
                var updatedFields = Reflect.getMetadata(METAKEYS.UPDATED, proxy);
                /** @type {?} */
                var map = Reflect.getMetadata(METAKEYS.MAP, instance, key);
                updatedFields[map || key] = instance[key];
            }
            instance[key] = value;
            return true;
        }
    });
}
/**
 * \@internal
 * @param {?} targetArray
 * @return {?}
 */
function readOnlyArrayProxyFactory(targetArray) {
    /** @type {?} */
    var forbiddenMethods = ['push', 'pop', 'shift', 'unshift'];
    return new Proxy(targetArray, {
        get: /**
         * @param {?} instance
         * @param {?} key
         * @param {?} proxy
         * @return {?}
         */
        function (instance, key, proxy) {
            if (forbiddenMethods.indexOf(key) > -1) {
                throw Error("Operation " + key + " not allowed on this readonly array!");
            }
            return instance[key];
        }
    });
}
/** @type {?} */
var METAKEYS = {
    FIELDS: 'orm:fields',
    ATTRIBUTES: 'orm:attributes',
    RELATIONS: 'orm:relations',
    MAP: 'orm:map',
    UPDATED: 'orm:updated',
    INSTANCES: 'orm:instances',
    NAME: 'orm:name'
};
/**
 * \@internal
 */
var  /**
 * \@internal
 */
ResourceModuleConfiguration = /** @class */ (function () {
    function ResourceModuleConfiguration() {
    }
    return ResourceModuleConfiguration;
}());
var ResourceModuleConfigurationWithProviders = /** @class */ (function (_super) {
    __extends(ResourceModuleConfigurationWithProviders, _super);
    function ResourceModuleConfigurationWithProviders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceModuleConfigurationWithProviders;
}(ResourceModuleConfiguration));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    __extends(ToManyRelation, _super);
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
            return __awaiter(_this, void 0, void 0, function () {
                var hostName, relatedName, body;
                return __generator(this, function (_a) {
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
            return __awaiter(_this, void 0, void 0, function () {
                var hostName, relatedName, body;
                return __generator(this, function (_a) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var hostName, relatedName, body;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var hostName, relatedName, body;
            return __generator(this, function (_a) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Abstract;
(function (Abstract) {
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    BaseBuilder = /** @class */ (function () {
        function BaseBuilder(_http) {
            this._http = _http;
        }
        /**
         * @param {?} method
         * @param {?} path
         * @param {?} options
         * @param {?=} body
         * @return {?}
         */
        BaseBuilder.prototype.request = /**
         * @param {?} method
         * @param {?} path
         * @param {?} options
         * @param {?=} body
         * @return {?}
         */
        function (method, path, options, body) {
            delete options.url;
            if (body) {
                options.body = body;
            }
            return this._http.request(method, path, options).toPromise();
        };
        return BaseBuilder;
    }());
    Abstract.BaseBuilder = BaseBuilder;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    SimpleBuilder = /** @class */ (function (_super) {
        __extends(SimpleBuilder, _super);
        function SimpleBuilder(_http, config) {
            var _this = _super.call(this, _http) || this;
            _this._http = _http;
            _this.config = config;
            return _this;
        }
        /**
         * @param {?} targetName
         * @param {?=} targetInstance
         * @return {?}
         */
        SimpleBuilder.prototype.buildUrl = /**
         * @param {?} targetName
         * @param {?=} targetInstance
         * @return {?}
         */
        function (targetName, targetInstance) {
            /** @type {?} */
            var path = (this.config.rootPath ? this.config.rootPath : '') + ("/" + toPlural(targetName) + "/$targetId");
            path = path.replace('/$targetId', targetInstance ? "/" + targetInstance.id : '');
            return path;
        };
        /**
         * @param {?} targetName
         * @param {?} options
         * @return {?}
         */
        SimpleBuilder.prototype.fetch = /**
         * @param {?} targetName
         * @param {?} options
         * @return {?}
         */
        function (targetName, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName);
            return /** @type {?} */ (this.request(HttpVerb.GET, path, options));
        };
        /**
         * @param {?} targetName
         * @param {?} body
         * @param {?} options
         * @return {?}
         */
        SimpleBuilder.prototype.save = /**
         * @param {?} targetName
         * @param {?} body
         * @param {?} options
         * @return {?}
         */
        function (targetName, body, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName);
            return this.request(HttpVerb.POST, path, options, body);
        };
        /**
         * @param {?} targetName
         * @param {?} body
         * @param {?} options
         * @return {?}
         */
        SimpleBuilder.prototype.update = /**
         * @param {?} targetName
         * @param {?} body
         * @param {?} options
         * @return {?}
         */
        function (targetName, body, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName, body);
            return this.request(HttpVerb.PATCH, path, options, body).then(function () { return Promise.resolve(); });
        };
        /**
         * @param {?} targetName
         * @param {?} instance
         * @param {?} options
         * @return {?}
         */
        SimpleBuilder.prototype.delete = /**
         * @param {?} targetName
         * @param {?} instance
         * @param {?} options
         * @return {?}
         */
        function (targetName, instance, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName, instance);
            return this.request(HttpVerb.DELETE, path, options).then(function () { return Promise.resolve(); });
        };
        return SimpleBuilder;
    }(BaseBuilder));
    Abstract.SimpleBuilder = SimpleBuilder;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ToOneBuilder = /** @class */ (function (_super) {
        __extends(ToOneBuilder, _super);
        function ToOneBuilder(_http, config) {
            var _this = _super.call(this, _http) || this;
            _this._http = _http;
            _this.config = config;
            return _this;
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} relatedInstance
         * @return {?}
         */
        ToOneBuilder.prototype.buildUrl = /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} relatedInstance
         * @return {?}
         */
        function (targetName, relatedName, relatedInstance) {
            /** @type {?} */
            var path = (this.config.rootPath ? this.config.rootPath : '') + ("/" + toPlural(relatedName) + "/" + relatedInstance.id + "/" + targetName);
            return path;
        };
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        ToOneBuilder.prototype.add = /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        function (targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.PATCH, path, options, body).then(function () { return Promise.resolve(); });
        };
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        ToOneBuilder.prototype.remove = /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        function (targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.DELETE, path, options).then(function () { return Promise.resolve(); });
        };
        return ToOneBuilder;
    }(BaseBuilder));
    Abstract.ToOneBuilder = ToOneBuilder;
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ToManyBuilder = /** @class */ (function (_super) {
        __extends(ToManyBuilder, _super);
        function ToManyBuilder(_http, config) {
            var _this = _super.call(this, _http) || this;
            _this._http = _http;
            _this.config = config;
            return _this;
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} relatedInstance
         * @return {?}
         */
        ToManyBuilder.prototype.buildUrl = /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} relatedInstance
         * @return {?}
         */
        function (targetName, relatedName, relatedInstance) {
            /** @type {?} */
            var path = (this.config.rootPath ? this.config.rootPath : '') + ("/" + toPlural(relatedName) + "/" + relatedInstance.id + "/" + toPlural(targetName));
            return path;
        };
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        ToManyBuilder.prototype.add = /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        function (targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.POST, path, options, body).then(function () { return Promise.resolve(); });
        };
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        ToManyBuilder.prototype.remove = /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        function (targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            var path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.DELETE, path, options, body).then(function () { return Promise.resolve(); });
        };
        return ToManyBuilder;
    }(BaseBuilder));
    Abstract.ToManyBuilder = ToManyBuilder;
})(Abstract || (Abstract = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@internal
 */
var SimpleBuilder$$1 = /** @class */ (function (_super) {
    __extends(SimpleBuilder$$1, _super);
    function SimpleBuilder$$1(_http, _config) {
        return _super.call(this, _http, _config) || this;
    }
    SimpleBuilder$$1.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    SimpleBuilder$$1.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ResourceModuleConfiguration }
    ]; };
    /** @nocollapse */ SimpleBuilder$$1.ngInjectableDef = defineInjectable({ factory: function SimpleBuilder_Factory() { return new SimpleBuilder$$1(inject(HttpClient), inject(ResourceModuleConfiguration)); }, token: SimpleBuilder$$1, providedIn: "root" });
    return SimpleBuilder$$1;
}(Abstract.SimpleBuilder));
/**
 * \@internal
 */
var ToOneBuilder$$1 = /** @class */ (function (_super) {
    __extends(ToOneBuilder$$1, _super);
    function ToOneBuilder$$1(_http, _config) {
        return _super.call(this, _http, _config) || this;
    }
    ToOneBuilder$$1.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ToOneBuilder$$1.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ResourceModuleConfiguration }
    ]; };
    /** @nocollapse */ ToOneBuilder$$1.ngInjectableDef = defineInjectable({ factory: function ToOneBuilder_Factory() { return new ToOneBuilder$$1(inject(HttpClient), inject(ResourceModuleConfiguration)); }, token: ToOneBuilder$$1, providedIn: "root" });
    return ToOneBuilder$$1;
}(Abstract.ToOneBuilder));
/**
 * \@internal
 */
var ToManyBuilder$$1 = /** @class */ (function (_super) {
    __extends(ToManyBuilder$$1, _super);
    function ToManyBuilder$$1(_http, _config) {
        return _super.call(this, _http, _config) || this;
    }
    ToManyBuilder$$1.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    ToManyBuilder$$1.ctorParameters = function () { return [
        { type: HttpClient },
        { type: ResourceModuleConfiguration }
    ]; };
    /** @nocollapse */ ToManyBuilder$$1.ngInjectableDef = defineInjectable({ factory: function ToManyBuilder_Factory() { return new ToManyBuilder$$1(inject(HttpClient), inject(ResourceModuleConfiguration)); }, token: ToManyBuilder$$1, providedIn: "root" });
    return ToManyBuilder$$1;
}(Abstract.ToManyBuilder));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * request adapters convert incoming bodies and outgoing bodies.
 * They do not touch options (headers and stuff).
 */
var Abstract$1;
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
})(Abstract$1 || (Abstract$1 = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@internal
 */
var SimpleAdapter$$1 = /** @class */ (function (_super) {
    __extends(SimpleAdapter$$1, _super);
    function SimpleAdapter$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleAdapter$$1.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ SimpleAdapter$$1.ngInjectableDef = defineInjectable({ factory: function SimpleAdapter_Factory() { return new SimpleAdapter$$1(); }, token: SimpleAdapter$$1, providedIn: "root" });
    return SimpleAdapter$$1;
}(Abstract$1.SimpleAdapter));
/**
 * \@internal
 */
var ToOneAdapter$$1 = /** @class */ (function (_super) {
    __extends(ToOneAdapter$$1, _super);
    function ToOneAdapter$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToOneAdapter$$1.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ ToOneAdapter$$1.ngInjectableDef = defineInjectable({ factory: function ToOneAdapter_Factory() { return new ToOneAdapter$$1(); }, token: ToOneAdapter$$1, providedIn: "root" });
    return ToOneAdapter$$1;
}(Abstract$1.ToOneAdapter));
/**
 * \@internal
 */
var ToManyAdapter$$1 = /** @class */ (function (_super) {
    __extends(ToManyAdapter$$1, _super);
    function ToManyAdapter$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToManyAdapter$$1.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ ToManyAdapter$$1.ngInjectableDef = defineInjectable({ factory: function ToManyAdapter_Factory() { return new ToManyAdapter$$1(); }, token: ToManyAdapter$$1, providedIn: "root" });
    return ToManyAdapter$$1;
}(Abstract$1.ToManyAdapter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * A dummy class required to allow for an optional argument in the constructor of your model while keeping it compatible with Angular's dependency injection.
 *
 * There is no need to use this type anywhere explicitly.
 *
 * On the other hand, the type {\@link RawInstanceTemplate<T>} might come in handy when instantiating instances of your model from plain objects, e.g. when using the [factory method]{\@link Resource#factory}.
 *
 */
var  /**
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
        return __awaiter(this, void 0, void 0, function () {
            var injections, adapter, builder, resourceName, response, rawInstances;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var name, body, response, rawInstance;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var name, affectedKeys, body;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
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
        { type: SimpleAdapter$$1 },
        { type: SimpleBuilder$$1 },
        { type: ToOneAdapter$$1 },
        { type: ToOneBuilder$$1 },
        { type: ToManyAdapter$$1 },
        { type: ToManyBuilder$$1 }
    ]; };
    return Resource;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Add this class decorator to your model to turn it into a `Resource` model, which means that it is considered as an endpoint on your API.
 *
 * See {\@link ModelOptions} on how to configure the name used in URLs.
 *
 * This decorator is responsible for setting metadata, which is used internally, on the constructor of your class.
 *
 * @param {?=} options
 * @return {?}
 */
function Model(options) {
    return function (ctor) {
        ctor = Injectable({ providedIn: 'root' })(ctor);
        initMetaData(ctor);
        /** @type {?} */
        var resourceName = options && options.name ? (options.name.includes('-') ? options.name : toDash(options.name)) : toDash(ctor.name);
        Reflect.defineMetadata(METAKEYS.NAME, resourceName, ctor);
        /** @type {?} */
        var fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
        /** @type {?} */
        var attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
        Reflect.defineMetadata(METAKEYS.FIELDS, fields.concat(attributes), ctor);
        return ctor;
    };
}
/**
 * Use this field decorator to parse the corresponding field from a json response by your API.
 * @param {?=} mapFrom
 * @return {?}
 */
function Field(mapFrom) {
    return function (target, key) {
        /** @type {?} */
        var ctor = target.constructor;
        initMetaData(ctor);
        Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
        Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor).push(key);
    };
}
/** *
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-One relationship.
 * \@param Function RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * \@param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
  @type {?} */
var ToOne = function (RelatedResource, mapFrom) {
    return function (target, key) {
        /** @type {?} */
        var ctor = target.constructor;
        initMetaData(ctor);
        Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
        Reflect.getMetadata(METAKEYS.FIELDS, ctor).push(key);
        Reflect.getMetadata(METAKEYS.RELATIONS, ctor)[key] = new RelationConfiguration(ctor, RelatedResource, key, RelationType.ToOne);
    };
};
/** *
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-Many relationship.
 * \@param Function RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * \@param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
  @type {?} */
var ToMany = function (RelatedResource, mapFrom) {
    return function (target, key) {
        /** @type {?} */
        var ctor = target.constructor;
        initMetaData(ctor);
        Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
        Reflect.getMetadata(METAKEYS.FIELDS, ctor).push(key);
        Reflect.getMetadata(METAKEYS.RELATIONS, ctor)[key] = new RelationConfiguration(ctor, RelatedResource, key, RelationType.ToMany);
    };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@internal
 */
var ResourceRootModule = /** @class */ (function () {
    function ResourceRootModule(injector) {
        InjectorContainer["instance"] = injector;
    }
    ResourceRootModule.decorators = [
        { type: NgModule, args: [{ imports: [HttpClientModule] },] }
    ];
    /** @nocollapse */
    ResourceRootModule.ctorParameters = function () { return [
        { type: Injector }
    ]; };
    return ResourceRootModule;
}());
var ResourceModule = /** @class */ (function () {
    function ResourceModule() {
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    ResourceModule.forRoot = /**
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var config = [{ provide: ResourceModuleConfiguration, useValue: { rootPath: options.rootPath } }];
        return {
            ngModule: ResourceRootModule,
            providers: config.concat(options.requestHandler || [])
        };
    };
    ResourceModule.decorators = [
        { type: NgModule, args: [{ imports: [HttpClientModule] },] }
    ];
    return ResourceModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { ResourceRootModule, ResourceModule, Resource, Field, ToOne, ToMany, Model, ToManyRelation, ToOneRelation, Abstract$1 as AbstractAdapters, Abstract as AbstractBuilders, ResourceModuleConfigurationWithProviders, ToManyAdapter$$1 as ToManyAdapter, ToOneAdapter$$1 as ToOneAdapter, SimpleAdapter$$1 as SimpleAdapter, ToManyBuilder$$1 as ToManyBuilder, ToOneBuilder$$1 as ToOneBuilder, SimpleBuilder$$1 as SimpleBuilder, ResourceModuleConfiguration, toPlural, toDash, toPluralDash, HttpVerb, METAKEYS, RelationConfiguration as ɵc, RawInstance as ɵa };
//# sourceMappingURL=ngx-api-orm-core.js.map
