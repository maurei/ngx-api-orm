/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { toPlural, HttpVerb } from '../utils';
export var Abstract;
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
    if (false) {
        /** @type {?} */
        BaseBuilder.prototype._http;
    }
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    SimpleBuilder = /** @class */ (function (_super) {
        tslib_1.__extends(SimpleBuilder, _super);
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
    if (false) {
        /** @type {?} */
        SimpleBuilder.prototype._http;
        /** @type {?} */
        SimpleBuilder.prototype.config;
    }
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ToOneBuilder = /** @class */ (function (_super) {
        tslib_1.__extends(ToOneBuilder, _super);
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
    if (false) {
        /** @type {?} */
        ToOneBuilder.prototype._http;
        /** @type {?} */
        ToOneBuilder.prototype.config;
    }
    /**
     * @abstract
     */
    var /**
     * @abstract
     */
    ToManyBuilder = /** @class */ (function (_super) {
        tslib_1.__extends(ToManyBuilder, _super);
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
    if (false) {
        /** @type {?} */
        ToManyBuilder.prototype._http;
        /** @type {?} */
        ToManyBuilder.prototype.config;
    }
})(Abstract || (Abstract = {}));
//# sourceMappingURL=abstract-builders.js.map