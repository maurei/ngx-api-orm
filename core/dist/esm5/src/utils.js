/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @param {?} name
 * @return {?}
 */
export function toDash(name) {
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
export function toPluralDash(name) {
    return toPlural(toDash(name));
}
/**
 * @param {?} name
 * @return {?}
 */
export function toPlural(name) {
    return name + 's';
}
/** *
 * \@internal
  @type {?} */
export var InjectorContainer = { instance: undefined };
/**
 * \@internal
 * @param {?} token
 * @return {?}
 */
export function getDependencyInjectionEntries(token) {
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
export { HttpVerb };
/**
 * \@internal
 * @param {?} ctor
 * @return {?}
 */
export function initMetaData(ctor) {
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
export function updateInterceptProxyFactory(targetInstance) {
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
export function readOnlyArrayProxyFactory(targetArray) {
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
export var METAKEYS = {
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
var /**
 * \@internal
 */
ResourceModuleConfiguration = /** @class */ (function () {
    function ResourceModuleConfiguration() {
    }
    return ResourceModuleConfiguration;
}());
/**
 * \@internal
 */
export { ResourceModuleConfiguration };
if (false) {
    /** @type {?} */
    ResourceModuleConfiguration.prototype.rootPath;
}
var ResourceModuleConfigurationWithProviders = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceModuleConfigurationWithProviders, _super);
    function ResourceModuleConfigurationWithProviders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceModuleConfigurationWithProviders;
}(ResourceModuleConfiguration));
export { ResourceModuleConfigurationWithProviders };
if (false) {
    /**
     * Sets the API root of your app.
     * @type {?}
     */
    ResourceModuleConfigurationWithProviders.prototype.rootPath;
    /**
     * Allows to conveniently register a collection of request handlers. See the guide on extendability on how to use this. Can be set to {\@link JsonApiDotOrg}.
     * @type {?}
     */
    ResourceModuleConfigurationWithProviders.prototype.requestHandler;
}
/**
 * @record
 * @template T
 */
export function Instantiable() { }
/** @typedef {?} */
var Omit;
export { Omit };
/** @typedef {?} */
var RawInstanceTemplate;
export { RawInstanceTemplate };
/**
 * @record
 * @template T
 */
export function ResourceType() { }
/** @type {?} */
ResourceType.prototype._instances;
/** @type {?} */
ResourceType.prototype.collection;
/** @type {?} */
ResourceType.prototype.fetch;
/** @type {?} */
ResourceType.prototype.find;
/** @type {?} */
ResourceType.prototype.template;
/** @type {?} */
ResourceType.prototype.factory;
/** @type {?} */
ResourceType.prototype.factory;
/**
 * @record
 */
export function HttpClientOptions() { }
/** @type {?|undefined} */
HttpClientOptions.prototype.url;
/** @type {?|undefined} */
HttpClientOptions.prototype.body;
/** @type {?|undefined} */
HttpClientOptions.prototype.headers;
/** @type {?|undefined} */
HttpClientOptions.prototype.observe;
/** @type {?|undefined} */
HttpClientOptions.prototype.params;
/** @type {?|undefined} */
HttpClientOptions.prototype.responseType;
/** @type {?|undefined} */
HttpClientOptions.prototype.reportProgress;
/** @type {?|undefined} */
HttpClientOptions.prototype.withCredentials;
/** @typedef {?} */
var RequestHandlers;
export { RequestHandlers };
/** @typedef {?} */
var UnresolvedRequestHandlers;
export { UnresolvedRequestHandlers };
//# sourceMappingURL=utils.js.map