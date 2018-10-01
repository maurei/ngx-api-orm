/**
 * @license ngx-api-orm
 * MIT license
 */

import { __awaiter } from 'tslib';
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
    const split = name.split('');
    split[0] = split[0].toLowerCase();
    /** @type {?} */
    const splitJoin = split.join('');
    return splitJoin.replace(/([A-Z])/g, $1 => {
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
let InjectorContainer = { instance: undefined };
/**
 * \@internal
 * @param {?} token
 * @return {?}
 */
function getDependencyInjectionEntries(token) {
    if (InjectorContainer["instance"] !== undefined) {
        /** @type {?} */
        const injector = InjectorContainer["instance"];
        /** @type {?} */
        const injectedInstance = injector.get(token);
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
const HttpVerb = {
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
    const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, targetInstance.constructor);
    return new Proxy(targetInstance, {
        /**
         * @param {?} instance
         * @param {?} key
         * @param {?} value
         * @param {?} proxy
         * @return {?}
         */
        set(instance, key, value, proxy) {
            if (attributes.indexOf(key) > -1) {
                /** @type {?} */
                const updatedFields = Reflect.getMetadata(METAKEYS.UPDATED, proxy);
                /** @type {?} */
                const map = Reflect.getMetadata(METAKEYS.MAP, instance, key);
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
    const forbiddenMethods = ['push', 'pop', 'shift', 'unshift'];
    return new Proxy(targetArray, {
        /**
         * @param {?} instance
         * @param {?} key
         * @param {?} proxy
         * @return {?}
         */
        get(instance, key, proxy) {
            if (forbiddenMethods.indexOf(key) > -1) {
                throw Error(`Operation ${key} not allowed on this readonly array!`);
            }
            return instance[key];
        }
    });
}
/** @type {?} */
const METAKEYS = {
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
class ResourceModuleConfiguration {
}
class ResourceModuleConfigurationWithProviders extends ResourceModuleConfiguration {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * @template THost, TRelated
 */
class ToManyRelation extends Array {
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
        this.add = (relatedInstance, options = {}) => __awaiter(this, void 0, void 0, function* () {
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
        this.remove = (relatedInstance, options = {}) => __awaiter(this, void 0, void 0, function* () {
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
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * \@internal
 * @template THost, TRelated
 */
class RelationConfiguration {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// unsupported: template constraints.
// unsupported: template constraints.
/**
 * @template THost, TRelated
 */
class ToOneRelation {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Abstract;
(function (Abstract) {
    /**
     * @abstract
     */
    class BaseBuilder {
        /**
         * @param {?} _http
         */
        constructor(_http) {
            this._http = _http;
        }
        /**
         * @param {?} method
         * @param {?} path
         * @param {?} options
         * @param {?=} body
         * @return {?}
         */
        request(method, path, options, body) {
            delete options.url;
            if (body) {
                options.body = body;
            }
            return this._http.request(method, path, options).toPromise();
        }
    }
    Abstract.BaseBuilder = BaseBuilder;
    /**
     * @abstract
     */
    class SimpleBuilder extends BaseBuilder {
        /**
         * @param {?} _http
         * @param {?} config
         */
        constructor(_http, config) {
            super(_http);
            this._http = _http;
            this.config = config;
        }
        /**
         * @param {?} targetName
         * @param {?=} targetInstance
         * @return {?}
         */
        buildUrl(targetName, targetInstance) {
            /** @type {?} */
            let path = (this.config.rootPath ? this.config.rootPath : '') + `/${toPlural(targetName)}/$targetId`;
            path = path.replace('/$targetId', targetInstance ? `/${targetInstance.id}` : '');
            return path;
        }
        /**
         * @param {?} targetName
         * @param {?} options
         * @return {?}
         */
        fetch(targetName, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName);
            return /** @type {?} */ (this.request(HttpVerb.GET, path, options));
        }
        /**
         * @param {?} targetName
         * @param {?} body
         * @param {?} options
         * @return {?}
         */
        save(targetName, body, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName);
            return this.request(HttpVerb.POST, path, options, body);
        }
        /**
         * @param {?} targetName
         * @param {?} body
         * @param {?} options
         * @return {?}
         */
        update(targetName, body, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName, body);
            return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
        }
        /**
         * @param {?} targetName
         * @param {?} instance
         * @param {?} options
         * @return {?}
         */
        delete(targetName, instance, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName, instance);
            return this.request(HttpVerb.DELETE, path, options).then(() => Promise.resolve());
        }
    }
    Abstract.SimpleBuilder = SimpleBuilder;
    /**
     * @abstract
     */
    class ToOneBuilder extends BaseBuilder {
        /**
         * @param {?} _http
         * @param {?} config
         */
        constructor(_http, config) {
            super(_http);
            this._http = _http;
            this.config = config;
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} relatedInstance
         * @return {?}
         */
        buildUrl(targetName, relatedName, relatedInstance) {
            /** @type {?} */
            const path = (this.config.rootPath ? this.config.rootPath : '') + `/${toPlural(relatedName)}/${relatedInstance.id}/${targetName}`;
            return path;
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        add(targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.PATCH, path, options, body).then(() => Promise.resolve());
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        remove(targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.DELETE, path, options).then(() => Promise.resolve());
        }
    }
    Abstract.ToOneBuilder = ToOneBuilder;
    /**
     * @abstract
     */
    class ToManyBuilder extends BaseBuilder {
        /**
         * @param {?} _http
         * @param {?} config
         */
        constructor(_http, config) {
            super(_http);
            this._http = _http;
            this.config = config;
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} relatedInstance
         * @return {?}
         */
        buildUrl(targetName, relatedName, relatedInstance) {
            /** @type {?} */
            const path = (this.config.rootPath ? this.config.rootPath : '') + `/${toPlural(relatedName)}/${relatedInstance.id}/${toPlural(targetName)}`;
            return path;
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        add(targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.POST, path, options, body).then(() => Promise.resolve());
        }
        /**
         * @param {?} targetName
         * @param {?} relatedName
         * @param {?} body
         * @param {?} relatedInstance
         * @param {?} options
         * @return {?}
         */
        remove(targetName, relatedName, body, relatedInstance, options) {
            /** @type {?} */
            const path = options.url || this.buildUrl(targetName, relatedName, relatedInstance);
            return this.request(HttpVerb.DELETE, path, options, body).then(() => Promise.resolve());
        }
    }
    Abstract.ToManyBuilder = ToManyBuilder;
})(Abstract || (Abstract = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@internal
 */
class SimpleBuilder$$1 extends Abstract.SimpleBuilder {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        super(_http, _config);
    }
}
SimpleBuilder$$1.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
SimpleBuilder$$1.ctorParameters = () => [
    { type: HttpClient },
    { type: ResourceModuleConfiguration }
];
/** @nocollapse */ SimpleBuilder$$1.ngInjectableDef = defineInjectable({ factory: function SimpleBuilder_Factory() { return new SimpleBuilder$$1(inject(HttpClient), inject(ResourceModuleConfiguration)); }, token: SimpleBuilder$$1, providedIn: "root" });
/**
 * \@internal
 */
class ToOneBuilder$$1 extends Abstract.ToOneBuilder {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        super(_http, _config);
    }
}
ToOneBuilder$$1.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ToOneBuilder$$1.ctorParameters = () => [
    { type: HttpClient },
    { type: ResourceModuleConfiguration }
];
/** @nocollapse */ ToOneBuilder$$1.ngInjectableDef = defineInjectable({ factory: function ToOneBuilder_Factory() { return new ToOneBuilder$$1(inject(HttpClient), inject(ResourceModuleConfiguration)); }, token: ToOneBuilder$$1, providedIn: "root" });
/**
 * \@internal
 */
class ToManyBuilder$$1 extends Abstract.ToManyBuilder {
    /**
     * @param {?} _http
     * @param {?} _config
     */
    constructor(_http, _config) {
        super(_http, _config);
    }
}
ToManyBuilder$$1.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
ToManyBuilder$$1.ctorParameters = () => [
    { type: HttpClient },
    { type: ResourceModuleConfiguration }
];
/** @nocollapse */ ToManyBuilder$$1.ngInjectableDef = defineInjectable({ factory: function ToManyBuilder_Factory() { return new ToManyBuilder$$1(inject(HttpClient), inject(ResourceModuleConfiguration)); }, token: ToManyBuilder$$1, providedIn: "root" });

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
    class SimpleAdapter {
        /**
         * @param {?} instance
         * @return {?}
         */
        save(instance) {
            return this.convertOutgoing(instance);
        }
        /**
         * @param {?} instance
         * @param {?} affectedFields
         * @return {?}
         */
        update(instance, affectedFields) {
            return this.convertOutgoing(instance);
        }
        /**
         * @param {?} rawInstances
         * @return {?}
         */
        parseIncoming(rawInstances) {
            return /** @type {?} */ (rawInstances);
        }
        /**
         * @param {?} instance
         * @return {?}
         */
        convertOutgoing(instance) {
            /** @type {?} */
            const rv = {};
            /** @type {?} */
            const fields = Reflect.getMetadata(METAKEYS.FIELDS, instance.constructor);
            fields.forEach((f) => {
                if (instance[f] instanceof ToOneRelation) {
                    rv[f] = instance[f].instance === null ? null : this.convertOutgoing(instance[f].instance);
                }
                else if (instance[f] instanceof Array) {
                    rv[f] = [];
                    instance[f].forEach((i) => rv[f].push(this.convertOutgoing(i)));
                }
                else {
                    rv[f] = instance[f];
                }
            });
            Reflect.ownKeys(instance).forEach(property => {
                /** @type {?} */
                const map = Reflect.getMetadata(METAKEYS.MAP, instance.constructor, /** @type {?} */ (property));
                if (map) {
                    rv[map] = rv[property];
                    delete rv[property];
                }
            });
            return rv;
        }
    }
    Abstract.SimpleAdapter = SimpleAdapter;
    /**
     * @abstract
     */
    class ToOneAdapter {
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        add(targetInstance, relatedInstance) {
            return { id: targetInstance.id };
        }
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        remove(targetInstance, relatedInstance) { }
    }
    Abstract.ToOneAdapter = ToOneAdapter;
    /**
     * @abstract
     */
    class ToManyAdapter {
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        add(targetInstance, relatedInstance) {
            return { id: targetInstance.id };
        }
        /**
         * @param {?} targetInstance
         * @param {?} relatedInstance
         * @return {?}
         */
        remove(targetInstance, relatedInstance) { }
    }
    Abstract.ToManyAdapter = ToManyAdapter;
})(Abstract$1 || (Abstract$1 = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * \@internal
 */
class SimpleAdapter$$1 extends Abstract$1.SimpleAdapter {
}
SimpleAdapter$$1.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ SimpleAdapter$$1.ngInjectableDef = defineInjectable({ factory: function SimpleAdapter_Factory() { return new SimpleAdapter$$1(); }, token: SimpleAdapter$$1, providedIn: "root" });
/**
 * \@internal
 */
class ToOneAdapter$$1 extends Abstract$1.ToOneAdapter {
}
ToOneAdapter$$1.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ ToOneAdapter$$1.ngInjectableDef = defineInjectable({ factory: function ToOneAdapter_Factory() { return new ToOneAdapter$$1(); }, token: ToOneAdapter$$1, providedIn: "root" });
/**
 * \@internal
 */
class ToManyAdapter$$1 extends Abstract$1.ToManyAdapter {
}
ToManyAdapter$$1.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ ToManyAdapter$$1.ngInjectableDef = defineInjectable({ factory: function ToManyAdapter_Factory() { return new ToManyAdapter$$1(); }, token: ToManyAdapter$$1, providedIn: "root" });

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
class RawInstance {
}
class Resource {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
    { type: SimpleAdapter$$1 },
    { type: SimpleBuilder$$1 },
    { type: ToOneAdapter$$1 },
    { type: ToOneBuilder$$1 },
    { type: ToManyAdapter$$1 },
    { type: ToManyBuilder$$1 }
];

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
    return (ctor) => {
        ctor = Injectable({ providedIn: 'root' })(ctor);
        initMetaData(ctor);
        /** @type {?} */
        const resourceName = options && options.name ? (options.name.includes('-') ? options.name : toDash(options.name)) : toDash(ctor.name);
        Reflect.defineMetadata(METAKEYS.NAME, resourceName, ctor);
        /** @type {?} */
        const fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
        /** @type {?} */
        const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
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
    return (target, key) => {
        /** @type {?} */
        const ctor = target.constructor;
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
const ToOne = function (RelatedResource, mapFrom) {
    return (target, key) => {
        /** @type {?} */
        const ctor = target.constructor;
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
const ToMany = function (RelatedResource, mapFrom) {
    return (target, key) => {
        /** @type {?} */
        const ctor = target.constructor;
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
class ResourceRootModule {
    /**
     * @param {?} injector
     */
    constructor(injector) {
        InjectorContainer["instance"] = injector;
    }
}
ResourceRootModule.decorators = [
    { type: NgModule, args: [{ imports: [HttpClientModule] },] }
];
/** @nocollapse */
ResourceRootModule.ctorParameters = () => [
    { type: Injector }
];
class ResourceModule {
    /**
     * @param {?=} options
     * @return {?}
     */
    static forRoot(options = {}) {
        /** @type {?} */
        const config = [{ provide: ResourceModuleConfiguration, useValue: { rootPath: options.rootPath } }];
        return {
            ngModule: ResourceRootModule,
            providers: config.concat(options.requestHandler || [])
        };
    }
}
ResourceModule.decorators = [
    { type: NgModule, args: [{ imports: [HttpClientModule] },] }
];

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
