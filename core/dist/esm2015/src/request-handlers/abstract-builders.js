/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { toPlural, HttpVerb } from '../utils';
export var Abstract;
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
    if (false) {
        /** @type {?} */
        BaseBuilder.prototype._http;
    }
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
    if (false) {
        /** @type {?} */
        SimpleBuilder.prototype._http;
        /** @type {?} */
        SimpleBuilder.prototype.config;
    }
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
    if (false) {
        /** @type {?} */
        ToOneBuilder.prototype._http;
        /** @type {?} */
        ToOneBuilder.prototype.config;
    }
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
    if (false) {
        /** @type {?} */
        ToManyBuilder.prototype._http;
        /** @type {?} */
        ToManyBuilder.prototype.config;
    }
})(Abstract || (Abstract = {}));
//# sourceMappingURL=abstract-builders.js.map