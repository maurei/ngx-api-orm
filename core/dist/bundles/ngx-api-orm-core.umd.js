(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@ngx-api-orm/core', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['ngx-api-orm-core'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,rxjs,operators,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @license Angular v6.1.8
     * (c) 2010-2018 Google, Inc. https://angular.io/
     * License: MIT
     */

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
     * `HttpResponse`.
     *
     * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
     * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
     * `HttpBackend`.
     *
     * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
     *
     *
     */
    var HttpHandler = /** @class */ (function () {
        function HttpHandler() {
        }
        return HttpHandler;
    }());
    /**
     * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
     *
     * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
     *
     * When injected, `HttpBackend` dispatches requests directly to the backend, without going
     * through the interceptor chain.
     *
     *
     */
    var HttpBackend = /** @class */ (function () {
        function HttpBackend() {
        }
        return HttpBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Immutable set of Http headers, with lazy parsing.
     *
     */
    var HttpHeaders = /** @class */ (function () {
        function HttpHeaders(headers) {
            var _this = this;
            /**
             * Internal map of lowercased header names to the normalized
             * form of the name (the form seen first).
             */
            this.normalizedNames = new Map();
            /**
             * Queued updates to be materialized the next initialization.
             */
            this.lazyUpdate = null;
            if (!headers) {
                this.headers = new Map();
            }
            else if (typeof headers === 'string') {
                this.lazyInit = function () {
                    _this.headers = new Map();
                    headers.split('\n').forEach(function (line) {
                        var index = line.indexOf(':');
                        if (index > 0) {
                            var name_1 = line.slice(0, index);
                            var key = name_1.toLowerCase();
                            var value = line.slice(index + 1).trim();
                            _this.maybeSetNormalizedName(name_1, key);
                            if (_this.headers.has(key)) {
                                _this.headers.get(key).push(value);
                            }
                            else {
                                _this.headers.set(key, [value]);
                            }
                        }
                    });
                };
            }
            else {
                this.lazyInit = function () {
                    _this.headers = new Map();
                    Object.keys(headers).forEach(function (name) {
                        var values = headers[name];
                        var key = name.toLowerCase();
                        if (typeof values === 'string') {
                            values = [values];
                        }
                        if (values.length > 0) {
                            _this.headers.set(key, values);
                            _this.maybeSetNormalizedName(name, key);
                        }
                    });
                };
            }
        }
        /**
         * Checks for existence of header by given name.
         */
        HttpHeaders.prototype.has = function (name) {
            this.init();
            return this.headers.has(name.toLowerCase());
        };
        /**
         * Returns first header that matches given name.
         */
        HttpHeaders.prototype.get = function (name) {
            this.init();
            var values = this.headers.get(name.toLowerCase());
            return values && values.length > 0 ? values[0] : null;
        };
        /**
         * Returns the names of the headers
         */
        HttpHeaders.prototype.keys = function () {
            this.init();
            return Array.from(this.normalizedNames.values());
        };
        /**
         * Returns list of header values for a given name.
         */
        HttpHeaders.prototype.getAll = function (name) {
            this.init();
            return this.headers.get(name.toLowerCase()) || null;
        };
        HttpHeaders.prototype.append = function (name, value) {
            return this.clone({ name: name, value: value, op: 'a' });
        };
        HttpHeaders.prototype.set = function (name, value) {
            return this.clone({ name: name, value: value, op: 's' });
        };
        HttpHeaders.prototype.delete = function (name, value) {
            return this.clone({ name: name, value: value, op: 'd' });
        };
        HttpHeaders.prototype.maybeSetNormalizedName = function (name, lcName) {
            if (!this.normalizedNames.has(lcName)) {
                this.normalizedNames.set(lcName, name);
            }
        };
        HttpHeaders.prototype.init = function () {
            var _this = this;
            if (!!this.lazyInit) {
                if (this.lazyInit instanceof HttpHeaders) {
                    this.copyFrom(this.lazyInit);
                }
                else {
                    this.lazyInit();
                }
                this.lazyInit = null;
                if (!!this.lazyUpdate) {
                    this.lazyUpdate.forEach(function (update) { return _this.applyUpdate(update); });
                    this.lazyUpdate = null;
                }
            }
        };
        HttpHeaders.prototype.copyFrom = function (other) {
            var _this = this;
            other.init();
            Array.from(other.headers.keys()).forEach(function (key) {
                _this.headers.set(key, other.headers.get(key));
                _this.normalizedNames.set(key, other.normalizedNames.get(key));
            });
        };
        HttpHeaders.prototype.clone = function (update) {
            var clone = new HttpHeaders();
            clone.lazyInit =
                (!!this.lazyInit && this.lazyInit instanceof HttpHeaders) ? this.lazyInit : this;
            clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
            return clone;
        };
        HttpHeaders.prototype.applyUpdate = function (update) {
            var key = update.name.toLowerCase();
            switch (update.op) {
                case 'a':
                case 's':
                    var value = update.value;
                    if (typeof value === 'string') {
                        value = [value];
                    }
                    if (value.length === 0) {
                        return;
                    }
                    this.maybeSetNormalizedName(update.name, key);
                    var base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                    base.push.apply(base, __spread(value));
                    this.headers.set(key, base);
                    break;
                case 'd':
                    var toDelete_1 = update.value;
                    if (!toDelete_1) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        var existing = this.headers.get(key);
                        if (!existing) {
                            return;
                        }
                        existing = existing.filter(function (value) { return toDelete_1.indexOf(value) === -1; });
                        if (existing.length === 0) {
                            this.headers.delete(key);
                            this.normalizedNames.delete(key);
                        }
                        else {
                            this.headers.set(key, existing);
                        }
                    }
                    break;
            }
        };
        /**
         * @internal
         */
        HttpHeaders.prototype.forEach = function (fn) {
            var _this = this;
            this.init();
            Array.from(this.normalizedNames.keys())
                .forEach(function (key) { return fn(_this.normalizedNames.get(key), _this.headers.get(key)); });
        };
        return HttpHeaders;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A `HttpParameterCodec` that uses `encodeURIComponent` and `decodeURIComponent` to
     * serialize and parse URL parameter keys and values.
     *
     *
     */
    var HttpUrlEncodingCodec = /** @class */ (function () {
        function HttpUrlEncodingCodec() {
        }
        HttpUrlEncodingCodec.prototype.encodeKey = function (key) { return standardEncoding(key); };
        HttpUrlEncodingCodec.prototype.encodeValue = function (value) { return standardEncoding(value); };
        HttpUrlEncodingCodec.prototype.decodeKey = function (key) { return decodeURIComponent(key); };
        HttpUrlEncodingCodec.prototype.decodeValue = function (value) { return decodeURIComponent(value); };
        return HttpUrlEncodingCodec;
    }());
    function paramParser(rawParams, codec) {
        var map$$1 = new Map();
        if (rawParams.length > 0) {
            var params = rawParams.split('&');
            params.forEach(function (param) {
                var eqIdx = param.indexOf('=');
                var _a = __read(eqIdx == -1 ?
                    [codec.decodeKey(param), ''] :
                    [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))], 2), key = _a[0], val = _a[1];
                var list = map$$1.get(key) || [];
                list.push(val);
                map$$1.set(key, list);
            });
        }
        return map$$1;
    }
    function standardEncoding(v) {
        return encodeURIComponent(v)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/gi, '$')
            .replace(/%2C/gi, ',')
            .replace(/%3B/gi, ';')
            .replace(/%2B/gi, '+')
            .replace(/%3D/gi, '=')
            .replace(/%3F/gi, '?')
            .replace(/%2F/gi, '/');
    }
    /**
     * An HTTP request/response body that represents serialized parameters,
     * per the MIME type `application/x-www-form-urlencoded`.
     *
     * This class is immutable - all mutation operations return a new instance.
     *
     *
     */
    var HttpParams = /** @class */ (function () {
        function HttpParams(options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this.updates = null;
            this.cloneFrom = null;
            this.encoder = options.encoder || new HttpUrlEncodingCodec();
            if (!!options.fromString) {
                if (!!options.fromObject) {
                    throw new Error("Cannot specify both fromString and fromObject.");
                }
                this.map = paramParser(options.fromString, this.encoder);
            }
            else if (!!options.fromObject) {
                this.map = new Map();
                Object.keys(options.fromObject).forEach(function (key) {
                    var value = options.fromObject[key];
                    _this.map.set(key, Array.isArray(value) ? value : [value]);
                });
            }
            else {
                this.map = null;
            }
        }
        /**
         * Check whether the body has one or more values for the given parameter name.
         */
        HttpParams.prototype.has = function (param) {
            this.init();
            return this.map.has(param);
        };
        /**
         * Get the first value for the given parameter name, or `null` if it's not present.
         */
        HttpParams.prototype.get = function (param) {
            this.init();
            var res = this.map.get(param);
            return !!res ? res[0] : null;
        };
        /**
         * Get all values for the given parameter name, or `null` if it's not present.
         */
        HttpParams.prototype.getAll = function (param) {
            this.init();
            return this.map.get(param) || null;
        };
        /**
         * Get all the parameter names for this body.
         */
        HttpParams.prototype.keys = function () {
            this.init();
            return Array.from(this.map.keys());
        };
        /**
         * Construct a new body with an appended value for the given parameter name.
         */
        HttpParams.prototype.append = function (param, value) { return this.clone({ param: param, value: value, op: 'a' }); };
        /**
         * Construct a new body with a new value for the given parameter name.
         */
        HttpParams.prototype.set = function (param, value) { return this.clone({ param: param, value: value, op: 's' }); };
        /**
         * Construct a new body with either the given value for the given parameter
         * removed, if a value is given, or all values for the given parameter removed
         * if not.
         */
        HttpParams.prototype.delete = function (param, value) { return this.clone({ param: param, value: value, op: 'd' }); };
        /**
         * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
         * separated by `&`s.
         */
        HttpParams.prototype.toString = function () {
            var _this = this;
            this.init();
            return this.keys()
                .map(function (key) {
                var eKey = _this.encoder.encodeKey(key);
                return _this.map.get(key).map(function (value) { return eKey + '=' + _this.encoder.encodeValue(value); })
                    .join('&');
            })
                .join('&');
        };
        HttpParams.prototype.clone = function (update) {
            var clone = new HttpParams({ encoder: this.encoder });
            clone.cloneFrom = this.cloneFrom || this;
            clone.updates = (this.updates || []).concat([update]);
            return clone;
        };
        HttpParams.prototype.init = function () {
            var _this = this;
            if (this.map === null) {
                this.map = new Map();
            }
            if (this.cloneFrom !== null) {
                this.cloneFrom.init();
                this.cloneFrom.keys().forEach(function (key) { return _this.map.set(key, _this.cloneFrom.map.get(key)); });
                this.updates.forEach(function (update) {
                    switch (update.op) {
                        case 'a':
                        case 's':
                            var base = (update.op === 'a' ? _this.map.get(update.param) : undefined) || [];
                            base.push(update.value);
                            _this.map.set(update.param, base);
                            break;
                        case 'd':
                            if (update.value !== undefined) {
                                var base_1 = _this.map.get(update.param) || [];
                                var idx = base_1.indexOf(update.value);
                                if (idx !== -1) {
                                    base_1.splice(idx, 1);
                                }
                                if (base_1.length > 0) {
                                    _this.map.set(update.param, base_1);
                                }
                                else {
                                    _this.map.delete(update.param);
                                }
                            }
                            else {
                                _this.map.delete(update.param);
                                break;
                            }
                    }
                });
                this.cloneFrom = null;
            }
        };
        return HttpParams;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Determine whether the given HTTP method may include a body.
     */
    function mightHaveBody(method) {
        switch (method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'OPTIONS':
            case 'JSONP':
                return false;
            default:
                return true;
        }
    }
    /**
     * Safely assert whether the given value is an ArrayBuffer.
     *
     * In some execution environments ArrayBuffer is not defined.
     */
    function isArrayBuffer(value) {
        return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
    }
    /**
     * Safely assert whether the given value is a Blob.
     *
     * In some execution environments Blob is not defined.
     */
    function isBlob(value) {
        return typeof Blob !== 'undefined' && value instanceof Blob;
    }
    /**
     * Safely assert whether the given value is a FormData instance.
     *
     * In some execution environments FormData is not defined.
     */
    function isFormData(value) {
        return typeof FormData !== 'undefined' && value instanceof FormData;
    }
    /**
     * An outgoing HTTP request with an optional typed body.
     *
     * `HttpRequest` represents an outgoing request, including URL, method,
     * headers, body, and other request configuration options. Instances should be
     * assumed to be immutable. To modify a `HttpRequest`, the `clone`
     * method should be used.
     *
     *
     */
    var HttpRequest = /** @class */ (function () {
        function HttpRequest(method, url, third, fourth) {
            this.url = url;
            /**
             * The request body, or `null` if one isn't set.
             *
             * Bodies are not enforced to be immutable, as they can include a reference to any
             * user-defined data type. However, interceptors should take care to preserve
             * idempotence by treating them as such.
             */
            this.body = null;
            /**
             * Whether this request should be made in a way that exposes progress events.
             *
             * Progress events are expensive (change detection runs on each event) and so
             * they should only be requested if the consumer intends to monitor them.
             */
            this.reportProgress = false;
            /**
             * Whether this request should be sent with outgoing credentials (cookies).
             */
            this.withCredentials = false;
            /**
             * The expected response type of the server.
             *
             * This is used to parse the response appropriately before returning it to
             * the requestee.
             */
            this.responseType = 'json';
            this.method = method.toUpperCase();
            // Next, need to figure out which argument holds the HttpRequestInit
            // options, if any.
            var options;
            // Check whether a body argument is expected. The only valid way to omit
            // the body argument is to use a known no-body method like GET.
            if (mightHaveBody(this.method) || !!fourth) {
                // Body is the third argument, options are the fourth.
                this.body = (third !== undefined) ? third : null;
                options = fourth;
            }
            else {
                // No body required, options are the third argument. The body stays null.
                options = third;
            }
            // If options have been passed, interpret them.
            if (options) {
                // Normalize reportProgress and withCredentials.
                this.reportProgress = !!options.reportProgress;
                this.withCredentials = !!options.withCredentials;
                // Override default response type of 'json' if one is provided.
                if (!!options.responseType) {
                    this.responseType = options.responseType;
                }
                // Override headers if they're provided.
                if (!!options.headers) {
                    this.headers = options.headers;
                }
                if (!!options.params) {
                    this.params = options.params;
                }
            }
            // If no headers have been passed in, construct a new HttpHeaders instance.
            if (!this.headers) {
                this.headers = new HttpHeaders();
            }
            // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
            if (!this.params) {
                this.params = new HttpParams();
                this.urlWithParams = url;
            }
            else {
                // Encode the parameters to a string in preparation for inclusion in the URL.
                var params = this.params.toString();
                if (params.length === 0) {
                    // No parameters, the visible URL is just the URL given at creation time.
                    this.urlWithParams = url;
                }
                else {
                    // Does the URL already have query parameters? Look for '?'.
                    var qIdx = url.indexOf('?');
                    // There are 3 cases to handle:
                    // 1) No existing parameters -> append '?' followed by params.
                    // 2) '?' exists and is followed by existing query string ->
                    //    append '&' followed by params.
                    // 3) '?' exists at the end of the url -> append params directly.
                    // This basically amounts to determining the character, if any, with
                    // which to join the URL and parameters.
                    var sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                    this.urlWithParams = url + sep + params;
                }
            }
        }
        /**
         * Transform the free-form body into a serialized format suitable for
         * transmission to the server.
         */
        HttpRequest.prototype.serializeBody = function () {
            // If no body is present, no need to serialize it.
            if (this.body === null) {
                return null;
            }
            // Check whether the body is already in a serialized form. If so,
            // it can just be returned directly.
            if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
                typeof this.body === 'string') {
                return this.body;
            }
            // Check whether the body is an instance of HttpUrlEncodedParams.
            if (this.body instanceof HttpParams) {
                return this.body.toString();
            }
            // Check whether the body is an object or array, and serialize with JSON if so.
            if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
                Array.isArray(this.body)) {
                return JSON.stringify(this.body);
            }
            // Fall back on toString() for everything else.
            return this.body.toString();
        };
        /**
         * Examine the body and attempt to infer an appropriate MIME type
         * for it.
         *
         * If no such type can be inferred, this method will return `null`.
         */
        HttpRequest.prototype.detectContentTypeHeader = function () {
            // An empty body has no content type.
            if (this.body === null) {
                return null;
            }
            // FormData bodies rely on the browser's content type assignment.
            if (isFormData(this.body)) {
                return null;
            }
            // Blobs usually have their own content type. If it doesn't, then
            // no type can be inferred.
            if (isBlob(this.body)) {
                return this.body.type || null;
            }
            // Array buffers have unknown contents and thus no type can be inferred.
            if (isArrayBuffer(this.body)) {
                return null;
            }
            // Technically, strings could be a form of JSON data, but it's safe enough
            // to assume they're plain strings.
            if (typeof this.body === 'string') {
                return 'text/plain';
            }
            // `HttpUrlEncodedParams` has its own content-type.
            if (this.body instanceof HttpParams) {
                return 'application/x-www-form-urlencoded;charset=UTF-8';
            }
            // Arrays, objects, and numbers will be encoded as JSON.
            if (typeof this.body === 'object' || typeof this.body === 'number' ||
                Array.isArray(this.body)) {
                return 'application/json';
            }
            // No type could be inferred.
            return null;
        };
        HttpRequest.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            // For method, url, and responseType, take the current value unless
            // it is overridden in the update hash.
            var method = update.method || this.method;
            var url = update.url || this.url;
            var responseType = update.responseType || this.responseType;
            // The body is somewhat special - a `null` value in update.body means
            // whatever current body is present is being overridden with an empty
            // body, whereas an `undefined` value in update.body implies no
            // override.
            var body = (update.body !== undefined) ? update.body : this.body;
            // Carefully handle the boolean options to differentiate between
            // `false` and `undefined` in the update args.
            var withCredentials = (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
            var reportProgress = (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;
            // Headers and params may be appended to if `setHeaders` or
            // `setParams` are used.
            var headers = update.headers || this.headers;
            var params = update.params || this.params;
            // Check whether the caller has asked to add headers.
            if (update.setHeaders !== undefined) {
                // Set every requested header.
                headers =
                    Object.keys(update.setHeaders)
                        .reduce(function (headers, name) { return headers.set(name, update.setHeaders[name]); }, headers);
            }
            // Check whether the caller has asked to set params.
            if (update.setParams) {
                // Set every requested param.
                params = Object.keys(update.setParams)
                    .reduce(function (params, param) { return params.set(param, update.setParams[param]); }, params);
            }
            // Finally, construct the new HttpRequest using the pieces from above.
            return new HttpRequest(method, url, body, {
                params: params, headers: headers, reportProgress: reportProgress, responseType: responseType, withCredentials: withCredentials,
            });
        };
        return HttpRequest;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Type enumeration for the different kinds of `HttpEvent`.
     *
     *
     */
    var HttpEventType;
    (function (HttpEventType) {
        /**
         * The request was sent out over the wire.
         */
        HttpEventType[HttpEventType["Sent"] = 0] = "Sent";
        /**
         * An upload progress event was received.
         */
        HttpEventType[HttpEventType["UploadProgress"] = 1] = "UploadProgress";
        /**
         * The response status code and headers were received.
         */
        HttpEventType[HttpEventType["ResponseHeader"] = 2] = "ResponseHeader";
        /**
         * A download progress event was received.
         */
        HttpEventType[HttpEventType["DownloadProgress"] = 3] = "DownloadProgress";
        /**
         * The full response including the body was received.
         */
        HttpEventType[HttpEventType["Response"] = 4] = "Response";
        /**
         * A custom event from an interceptor or a backend.
         */
        HttpEventType[HttpEventType["User"] = 5] = "User";
    })(HttpEventType || (HttpEventType = {}));
    /**
     * Base class for both `HttpResponse` and `HttpHeaderResponse`.
     *
     *
     */
    var HttpResponseBase = /** @class */ (function () {
        /**
         * Super-constructor for all responses.
         *
         * The single parameter accepted is an initialization hash. Any properties
         * of the response passed there will override the default values.
         */
        function HttpResponseBase(init, defaultStatus, defaultStatusText) {
            if (defaultStatus === void 0) { defaultStatus = 200; }
            if (defaultStatusText === void 0) { defaultStatusText = 'OK'; }
            // If the hash has values passed, use them to initialize the response.
            // Otherwise use the default values.
            this.headers = init.headers || new HttpHeaders();
            this.status = init.status !== undefined ? init.status : defaultStatus;
            this.statusText = init.statusText || defaultStatusText;
            this.url = init.url || null;
            // Cache the ok value to avoid defining a getter.
            this.ok = this.status >= 200 && this.status < 300;
        }
        return HttpResponseBase;
    }());
    /**
     * A partial HTTP response which only includes the status and header data,
     * but no response body.
     *
     * `HttpHeaderResponse` is a `HttpEvent` available on the response
     * event stream, only when progress events are requested.
     *
     *
     */
    var HttpHeaderResponse = /** @class */ (function (_super) {
        __extends(HttpHeaderResponse, _super);
        /**
         * Create a new `HttpHeaderResponse` with the given parameters.
         */
        function HttpHeaderResponse(init) {
            if (init === void 0) { init = {}; }
            var _this = _super.call(this, init) || this;
            _this.type = HttpEventType.ResponseHeader;
            return _this;
        }
        /**
         * Copy this `HttpHeaderResponse`, overriding its contents with the
         * given parameter hash.
         */
        HttpHeaderResponse.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            // Perform a straightforward initialization of the new HttpHeaderResponse,
            // overriding the current parameters with new ones if given.
            return new HttpHeaderResponse({
                headers: update.headers || this.headers,
                status: update.status !== undefined ? update.status : this.status,
                statusText: update.statusText || this.statusText,
                url: update.url || this.url || undefined,
            });
        };
        return HttpHeaderResponse;
    }(HttpResponseBase));
    /**
     * A full HTTP response, including a typed response body (which may be `null`
     * if one was not returned).
     *
     * `HttpResponse` is a `HttpEvent` available on the response event
     * stream.
     *
     *
     */
    var HttpResponse = /** @class */ (function (_super) {
        __extends(HttpResponse, _super);
        /**
         * Construct a new `HttpResponse`.
         */
        function HttpResponse(init) {
            if (init === void 0) { init = {}; }
            var _this = _super.call(this, init) || this;
            _this.type = HttpEventType.Response;
            _this.body = init.body !== undefined ? init.body : null;
            return _this;
        }
        HttpResponse.prototype.clone = function (update) {
            if (update === void 0) { update = {}; }
            return new HttpResponse({
                body: (update.body !== undefined) ? update.body : this.body,
                headers: update.headers || this.headers,
                status: (update.status !== undefined) ? update.status : this.status,
                statusText: update.statusText || this.statusText,
                url: update.url || this.url || undefined,
            });
        };
        return HttpResponse;
    }(HttpResponseBase));
    /**
     * A response that represents an error or failure, either from a
     * non-successful HTTP status, an error while executing the request,
     * or some other failure which occurred during the parsing of the response.
     *
     * Any error returned on the `Observable` response stream will be
     * wrapped in an `HttpErrorResponse` to provide additional context about
     * the state of the HTTP layer when the error occurred. The error property
     * will contain either a wrapped Error object or the error response returned
     * from the server.
     *
     *
     */
    var HttpErrorResponse = /** @class */ (function (_super) {
        __extends(HttpErrorResponse, _super);
        function HttpErrorResponse(init) {
            var _this = 
            // Initialize with a default status of 0 / Unknown Error.
            _super.call(this, init, 0, 'Unknown Error') || this;
            _this.name = 'HttpErrorResponse';
            /**
             * Errors are never okay, even when the status code is in the 2xx success range.
             */
            _this.ok = false;
            // If the response was successful, then this was a parse error. Otherwise, it was
            // a protocol-level failure of some sort. Either the request failed in transit
            // or the server returned an unsuccessful status code.
            if (_this.status >= 200 && _this.status < 300) {
                _this.message = "Http failure during parsing for " + (init.url || '(unknown url)');
            }
            else {
                _this.message =
                    "Http failure response for " + (init.url || '(unknown url)') + ": " + init.status + " " + init.statusText;
            }
            _this.error = init.error || null;
            return _this;
        }
        return HttpErrorResponse;
    }(HttpResponseBase));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Construct an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
     * the given `body`. Basically, this clones the object and adds the body.
     */
    function addBody(options, body) {
        return {
            body: body,
            headers: options.headers,
            observe: options.observe,
            params: options.params,
            reportProgress: options.reportProgress,
            responseType: options.responseType,
            withCredentials: options.withCredentials,
        };
    }
    /**
     * Perform HTTP requests.
     *
     * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
     * Each request method has multiple signatures, and the return type varies according to which
     * signature is called (mainly the values of `observe` and `responseType`).
     *
     *
     */
    var HttpClient = /** @class */ (function () {
        function HttpClient(handler) {
            this.handler = handler;
        }
        /**
         * Constructs an `Observable` for a particular HTTP request that, when subscribed,
         * fires the request through the chain of registered interceptors and on to the
         * server.
         *
         * This method can be called in one of two ways. Either an `HttpRequest`
         * instance can be passed directly as the only parameter, or a method can be
         * passed as the first parameter, a string URL as the second, and an
         * options hash as the third.
         *
         * If a `HttpRequest` object is passed directly, an `Observable` of the
         * raw `HttpEvent` stream will be returned.
         *
         * If a request is instead built by providing a URL, the options object
         * determines the return type of `request()`. In addition to configuring
         * request parameters such as the outgoing headers and/or the body, the options
         * hash specifies two key pieces of information about the request: the
         * `responseType` and what to `observe`.
         *
         * The `responseType` value determines how a successful response body will be
         * parsed. If `responseType` is the default `json`, a type interface for the
         * resulting object may be passed as a type parameter to `request()`.
         *
         * The `observe` value determines the return type of `request()`, based on what
         * the consumer is interested in observing. A value of `events` will return an
         * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
         * including progress events by default. A value of `response` will return an
         * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
         * depends on the `responseType` and any optionally provided type parameter.
         * A value of `body` will return an `Observable<T>` with the same `T` body type.
         */
        HttpClient.prototype.request = function (first, url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var req;
            // Firstly, check whether the primary argument is an instance of `HttpRequest`.
            if (first instanceof HttpRequest) {
                // It is. The other arguments must be undefined (per the signatures) and can be
                // ignored.
                req = first;
            }
            else {
                // It's a string, so it represents a URL. Construct a request based on it,
                // and incorporate the remaining arguments (assuming GET unless a method is
                // provided.
                // Figure out the headers.
                var headers = undefined;
                if (options.headers instanceof HttpHeaders) {
                    headers = options.headers;
                }
                else {
                    headers = new HttpHeaders(options.headers);
                }
                // Sort out parameters.
                var params = undefined;
                if (!!options.params) {
                    if (options.params instanceof HttpParams) {
                        params = options.params;
                    }
                    else {
                        params = new HttpParams({ fromObject: options.params });
                    }
                }
                // Construct the request.
                req = new HttpRequest(first, url, (options.body !== undefined ? options.body : null), {
                    headers: headers,
                    params: params,
                    reportProgress: options.reportProgress,
                    // By default, JSON is assumed to be returned for all calls.
                    responseType: options.responseType || 'json',
                    withCredentials: options.withCredentials,
                });
            }
            // Start with an Observable.of() the initial request, and run the handler (which
            // includes all interceptors) inside a concatMap(). This way, the handler runs
            // inside an Observable chain, which causes interceptors to be re-run on every
            // subscription (this also makes retries re-run the handler, including interceptors).
            var events$ = rxjs.of(req).pipe(operators.concatMap(function (req) { return _this.handler.handle(req); }));
            // If coming via the API signature which accepts a previously constructed HttpRequest,
            // the only option is to get the event stream. Otherwise, return the event stream if
            // that is what was requested.
            if (first instanceof HttpRequest || options.observe === 'events') {
                return events$;
            }
            // The requested stream contains either the full response or the body. In either
            // case, the first step is to filter the event stream to extract a stream of
            // responses(s).
            var res$ = events$.pipe(operators.filter(function (event) { return event instanceof HttpResponse; }));
            // Decide which stream to return.
            switch (options.observe || 'body') {
                case 'body':
                    // The requested stream is the body. Map the response stream to the response
                    // body. This could be done more simply, but a misbehaving interceptor might
                    // transform the response body into a different format and ignore the requested
                    // responseType. Guard against this by validating that the response is of the
                    // requested type.
                    switch (req.responseType) {
                        case 'arraybuffer':
                            return res$.pipe(operators.map(function (res) {
                                // Validate that the body is an ArrayBuffer.
                                if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                    throw new Error('Response is not an ArrayBuffer.');
                                }
                                return res.body;
                            }));
                        case 'blob':
                            return res$.pipe(operators.map(function (res) {
                                // Validate that the body is a Blob.
                                if (res.body !== null && !(res.body instanceof Blob)) {
                                    throw new Error('Response is not a Blob.');
                                }
                                return res.body;
                            }));
                        case 'text':
                            return res$.pipe(operators.map(function (res) {
                                // Validate that the body is a string.
                                if (res.body !== null && typeof res.body !== 'string') {
                                    throw new Error('Response is not a string.');
                                }
                                return res.body;
                            }));
                        case 'json':
                        default:
                            // No validation needed for JSON responses, as they can be of any type.
                            return res$.pipe(operators.map(function (res) { return res.body; }));
                    }
                case 'response':
                    // The response stream was requested directly, so return it.
                    return res$;
                default:
                    // Guard against new future observe types being added.
                    throw new Error("Unreachable: unhandled observe type " + options.observe + "}");
            }
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * DELETE request to be executed on the server. See the individual overloads for
         * details of `delete()`'s return type based on the provided options.
         */
        HttpClient.prototype.delete = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('DELETE', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * GET request to be executed on the server. See the individual overloads for
         * details of `get()`'s return type based on the provided options.
         */
        HttpClient.prototype.get = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('GET', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * HEAD request to be executed on the server. See the individual overloads for
         * details of `head()`'s return type based on the provided options.
         */
        HttpClient.prototype.head = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('HEAD', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause a request
         * with the special method `JSONP` to be dispatched via the interceptor pipeline.
         *
         * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
         * If no such interceptor is reached, then the `JSONP` request will likely be
         * rejected by the configured backend.
         */
        HttpClient.prototype.jsonp = function (url, callbackParam) {
            return this.request('JSONP', url, {
                params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
                observe: 'body',
                responseType: 'json',
            });
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * OPTIONS request to be executed on the server. See the individual overloads for
         * details of `options()`'s return type based on the provided options.
         */
        HttpClient.prototype.options = function (url, options) {
            if (options === void 0) { options = {}; }
            return this.request('OPTIONS', url, options);
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * PATCH request to be executed on the server. See the individual overloads for
         * details of `patch()`'s return type based on the provided options.
         */
        HttpClient.prototype.patch = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('PATCH', url, addBody(options, body));
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * POST request to be executed on the server. See the individual overloads for
         * details of `post()`'s return type based on the provided options.
         */
        HttpClient.prototype.post = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('POST', url, addBody(options, body));
        };
        /**
         * Constructs an `Observable` which, when subscribed, will cause the configured
         * PUT request to be executed on the server. See the individual overloads for
         * details of `put()`'s return type based on the provided options.
         */
        HttpClient.prototype.put = function (url, body, options) {
            if (options === void 0) { options = {}; }
            return this.request('PUT', url, addBody(options, body));
        };
        HttpClient = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [HttpHandler])
        ], HttpClient);
        return HttpClient;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
     *
     *
     */
    var HttpInterceptorHandler = /** @class */ (function () {
        function HttpInterceptorHandler(next, interceptor) {
            this.next = next;
            this.interceptor = interceptor;
        }
        HttpInterceptorHandler.prototype.handle = function (req) {
            return this.interceptor.intercept(req, this.next);
        };
        return HttpInterceptorHandler;
    }());
    /**
     * A multi-provider token which represents the array of `HttpInterceptor`s that
     * are registered.
     *
     *
     */
    var HTTP_INTERCEPTORS = new core.InjectionToken('HTTP_INTERCEPTORS');
    var NoopInterceptor = /** @class */ (function () {
        function NoopInterceptor() {
        }
        NoopInterceptor.prototype.intercept = function (req, next) {
            return next.handle(req);
        };
        NoopInterceptor = __decorate([
            core.Injectable()
        ], NoopInterceptor);
        return NoopInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Every request made through JSONP needs a callback name that's unique across the
    // whole page. Each request is assigned an id and the callback name is constructed
    // from that. The next id to be assigned is tracked in a global variable here that
    // is shared among all applications on the page.
    var nextRequestId = 0;
    // Error text given when a JSONP script is injected, but doesn't invoke the callback
    // passed in its URL.
    var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
    // Error text given when a request is passed to the JsonpClientBackend that doesn't
    // have a request method JSONP.
    var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use JSONP request method.';
    var JSONP_ERR_WRONG_RESPONSE_TYPE = 'JSONP requests must use Json response type.';
    /**
     * DI token/abstract type representing a map of JSONP callbacks.
     *
     * In the browser, this should always be the `window` object.
     *
     *
     */
    var JsonpCallbackContext = /** @class */ (function () {
        function JsonpCallbackContext() {
        }
        return JsonpCallbackContext;
    }());
    /**
     * `HttpBackend` that only processes `HttpRequest` with the JSONP method,
     * by performing JSONP style requests.
     *
     *
     */
    var JsonpClientBackend = /** @class */ (function () {
        function JsonpClientBackend(callbackMap, document) {
            this.callbackMap = callbackMap;
            this.document = document;
        }
        /**
         * Get the name of the next callback method, by incrementing the global `nextRequestId`.
         */
        JsonpClientBackend.prototype.nextCallback = function () { return "ng_jsonp_callback_" + nextRequestId++; };
        /**
         * Process a JSONP request and return an event stream of the results.
         */
        JsonpClientBackend.prototype.handle = function (req) {
            var _this = this;
            // Firstly, check both the method and response type. If either doesn't match
            // then the request was improperly routed here and cannot be handled.
            if (req.method !== 'JSONP') {
                throw new Error(JSONP_ERR_WRONG_METHOD);
            }
            else if (req.responseType !== 'json') {
                throw new Error(JSONP_ERR_WRONG_RESPONSE_TYPE);
            }
            // Everything else happens inside the Observable boundary.
            return new rxjs.Observable(function (observer) {
                // The first step to make a request is to generate the callback name, and replace the
                // callback placeholder in the URL with the name. Care has to be taken here to ensure
                // a trailing &, if matched, gets inserted back into the URL in the correct place.
                var callback = _this.nextCallback();
                var url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, "=" + callback + "$1");
                // Construct the <script> tag and point it at the URL.
                var node = _this.document.createElement('script');
                node.src = url;
                // A JSONP request requires waiting for multiple callbacks. These variables
                // are closed over and track state across those callbacks.
                // The response object, if one has been received, or null otherwise.
                var body = null;
                // Whether the response callback has been called.
                var finished = false;
                // Whether the request has been cancelled (and thus any other callbacks)
                // should be ignored.
                var cancelled = false;
                // Set the response callback in this.callbackMap (which will be the window
                // object in the browser. The script being loaded via the <script> tag will
                // eventually call this callback.
                _this.callbackMap[callback] = function (data) {
                    // Data has been received from the JSONP script. Firstly, delete this callback.
                    delete _this.callbackMap[callback];
                    // Next, make sure the request wasn't cancelled in the meantime.
                    if (cancelled) {
                        return;
                    }
                    // Set state to indicate data was received.
                    body = data;
                    finished = true;
                };
                // cleanup() is a utility closure that removes the <script> from the page and
                // the response callback from the window. This logic is used in both the
                // success, error, and cancellation paths, so it's extracted out for convenience.
                var cleanup = function () {
                    // Remove the <script> tag if it's still on the page.
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                    // Remove the response callback from the callbackMap (window object in the
                    // browser).
                    delete _this.callbackMap[callback];
                };
                // onLoad() is the success callback which runs after the response callback
                // if the JSONP script loads successfully. The event itself is unimportant.
                // If something went wrong, onLoad() may run without the response callback
                // having been invoked.
                var onLoad = function (event) {
                    // Do nothing if the request has been cancelled.
                    if (cancelled) {
                        return;
                    }
                    // Cleanup the page.
                    cleanup();
                    // Check whether the response callback has run.
                    if (!finished) {
                        // It hasn't, something went wrong with the request. Return an error via
                        // the Observable error path. All JSONP errors have status 0.
                        observer.error(new HttpErrorResponse({
                            url: url,
                            status: 0,
                            statusText: 'JSONP Error',
                            error: new Error(JSONP_ERR_NO_CALLBACK),
                        }));
                        return;
                    }
                    // Success. body either contains the response body or null if none was
                    // returned.
                    observer.next(new HttpResponse({
                        body: body,
                        status: 200,
                        statusText: 'OK', url: url,
                    }));
                    // Complete the stream, the response is over.
                    observer.complete();
                };
                // onError() is the error callback, which runs if the script returned generates
                // a Javascript error. It emits the error via the Observable error channel as
                // a HttpErrorResponse.
                var onError = function (error) {
                    // If the request was already cancelled, no need to emit anything.
                    if (cancelled) {
                        return;
                    }
                    cleanup();
                    // Wrap the error in a HttpErrorResponse.
                    observer.error(new HttpErrorResponse({
                        error: error,
                        status: 0,
                        statusText: 'JSONP Error', url: url,
                    }));
                };
                // Subscribe to both the success (load) and error events on the <script> tag,
                // and add it to the page.
                node.addEventListener('load', onLoad);
                node.addEventListener('error', onError);
                _this.document.body.appendChild(node);
                // The request has now been successfully sent.
                observer.next({ type: HttpEventType.Sent });
                // Cancellation handler.
                return function () {
                    // Track the cancellation so event listeners won't do anything even if already scheduled.
                    cancelled = true;
                    // Remove the event listeners so they won't run if the events later fire.
                    node.removeEventListener('load', onLoad);
                    node.removeEventListener('error', onError);
                    // And finally, clean up the page.
                    cleanup();
                };
            });
        };
        JsonpClientBackend = __decorate([
            core.Injectable(),
            __param(1, core.Inject(common.DOCUMENT)),
            __metadata("design:paramtypes", [JsonpCallbackContext, Object])
        ], JsonpClientBackend);
        return JsonpClientBackend;
    }());
    /**
     * An `HttpInterceptor` which identifies requests with the method JSONP and
     * shifts them to the `JsonpClientBackend`.
     *
     *
     */
    var JsonpInterceptor = /** @class */ (function () {
        function JsonpInterceptor(jsonp) {
            this.jsonp = jsonp;
        }
        JsonpInterceptor.prototype.intercept = function (req, next) {
            if (req.method === 'JSONP') {
                return this.jsonp.handle(req);
            }
            // Fall through for normal HTTP requests.
            return next.handle(req);
        };
        JsonpInterceptor = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [JsonpClientBackend])
        ], JsonpInterceptor);
        return JsonpInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var XSSI_PREFIX = /^\)\]\}',?\n/;
    /**
     * Determine an appropriate URL for the response, by checking either
     * XMLHttpRequest.responseURL or the X-Request-URL header.
     */
    function getResponseUrl(xhr) {
        if ('responseURL' in xhr && xhr.responseURL) {
            return xhr.responseURL;
        }
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
            return xhr.getResponseHeader('X-Request-URL');
        }
        return null;
    }
    /**
     * A wrapper around the `XMLHttpRequest` constructor.
     *
     *
     */
    var XhrFactory = /** @class */ (function () {
        function XhrFactory() {
        }
        return XhrFactory;
    }());
    /**
     * A factory for @{link HttpXhrBackend} that uses the `XMLHttpRequest` browser API.
     *
     *
     */
    var BrowserXhr = /** @class */ (function () {
        function BrowserXhr() {
        }
        BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
        BrowserXhr = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], BrowserXhr);
        return BrowserXhr;
    }());
    /**
     * An `HttpBackend` which uses the XMLHttpRequest API to send
     * requests to a backend server.
     *
     *
     */
    var HttpXhrBackend = /** @class */ (function () {
        function HttpXhrBackend(xhrFactory) {
            this.xhrFactory = xhrFactory;
        }
        /**
         * Process a request and return a stream of response events.
         */
        HttpXhrBackend.prototype.handle = function (req) {
            var _this = this;
            // Quick check to give a better error message when a user attempts to use
            // HttpClient.jsonp() without installing the JsonpClientModule
            if (req.method === 'JSONP') {
                throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
            }
            // Everything happens on Observable subscription.
            return new rxjs.Observable(function (observer) {
                // Start by setting up the XHR object with request method, URL, and withCredentials flag.
                var xhr = _this.xhrFactory.build();
                xhr.open(req.method, req.urlWithParams);
                if (!!req.withCredentials) {
                    xhr.withCredentials = true;
                }
                // Add all the requested headers.
                req.headers.forEach(function (name, values) { return xhr.setRequestHeader(name, values.join(',')); });
                // Add an Accept header if one isn't present already.
                if (!req.headers.has('Accept')) {
                    xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
                }
                // Auto-detect the Content-Type header if one isn't present already.
                if (!req.headers.has('Content-Type')) {
                    var detectedType = req.detectContentTypeHeader();
                    // Sometimes Content-Type detection fails.
                    if (detectedType !== null) {
                        xhr.setRequestHeader('Content-Type', detectedType);
                    }
                }
                // Set the responseType if one was requested.
                if (req.responseType) {
                    var responseType = req.responseType.toLowerCase();
                    // JSON responses need to be processed as text. This is because if the server
                    // returns an XSSI-prefixed JSON response, the browser will fail to parse it,
                    // xhr.response will be null, and xhr.responseText cannot be accessed to
                    // retrieve the prefixed JSON data in order to strip the prefix. Thus, all JSON
                    // is parsed by first requesting text and then applying JSON.parse.
                    xhr.responseType = ((responseType !== 'json') ? responseType : 'text');
                }
                // Serialize the request body if one is present. If not, this will be set to null.
                var reqBody = req.serializeBody();
                // If progress events are enabled, response headers will be delivered
                // in two events - the HttpHeaderResponse event and the full HttpResponse
                // event. However, since response headers don't change in between these
                // two events, it doesn't make sense to parse them twice. So headerResponse
                // caches the data extracted from the response whenever it's first parsed,
                // to ensure parsing isn't duplicated.
                var headerResponse = null;
                // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
                // state, and memoizes it into headerResponse.
                var partialFromXhr = function () {
                    if (headerResponse !== null) {
                        return headerResponse;
                    }
                    // Read status and normalize an IE9 bug (http://bugs.jquery.com/ticket/1450).
                    var status = xhr.status === 1223 ? 204 : xhr.status;
                    var statusText = xhr.statusText || 'OK';
                    // Parse headers from XMLHttpRequest - this step is lazy.
                    var headers = new HttpHeaders(xhr.getAllResponseHeaders());
                    // Read the response URL from the XMLHttpResponse instance and fall back on the
                    // request URL.
                    var url = getResponseUrl(xhr) || req.url;
                    // Construct the HttpHeaderResponse and memoize it.
                    headerResponse = new HttpHeaderResponse({ headers: headers, status: status, statusText: statusText, url: url });
                    return headerResponse;
                };
                // Next, a few closures are defined for the various events which XMLHttpRequest can
                // emit. This allows them to be unregistered as event listeners later.
                // First up is the load event, which represents a response being fully available.
                var onLoad = function () {
                    // Read response state from the memoized partial data.
                    var _a = partialFromXhr(), headers = _a.headers, status = _a.status, statusText = _a.statusText, url = _a.url;
                    // The body will be read out if present.
                    var body = null;
                    if (status !== 204) {
                        // Use XMLHttpRequest.response if set, responseText otherwise.
                        body = (typeof xhr.response === 'undefined') ? xhr.responseText : xhr.response;
                    }
                    // Normalize another potential bug (this one comes from CORS).
                    if (status === 0) {
                        status = !!body ? 200 : 0;
                    }
                    // ok determines whether the response will be transmitted on the event or
                    // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                    // but a successful status code can still result in an error if the user
                    // asked for JSON data and the body cannot be parsed as such.
                    var ok = status >= 200 && status < 300;
                    // Check whether the body needs to be parsed as JSON (in many cases the browser
                    // will have done that already).
                    if (req.responseType === 'json' && typeof body === 'string') {
                        // Save the original body, before attempting XSSI prefix stripping.
                        var originalBody = body;
                        body = body.replace(XSSI_PREFIX, '');
                        try {
                            // Attempt the parse. If it fails, a parse error should be delivered to the user.
                            body = body !== '' ? JSON.parse(body) : null;
                        }
                        catch (error) {
                            // Since the JSON.parse failed, it's reasonable to assume this might not have been a
                            // JSON response. Restore the original body (including any XSSI prefix) to deliver
                            // a better error response.
                            body = originalBody;
                            // If this was an error request to begin with, leave it as a string, it probably
                            // just isn't JSON. Otherwise, deliver the parsing error to the user.
                            if (ok) {
                                // Even though the response status was 2xx, this is still an error.
                                ok = false;
                                // The parse error contains the text of the body that failed to parse.
                                body = { error: error, text: body };
                            }
                        }
                    }
                    if (ok) {
                        // A successful response is delivered on the event stream.
                        observer.next(new HttpResponse({
                            body: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || undefined,
                        }));
                        // The full body has been received and delivered, no further events
                        // are possible. This request is complete.
                        observer.complete();
                    }
                    else {
                        // An unsuccessful request is delivered on the error channel.
                        observer.error(new HttpErrorResponse({
                            // The error in this case is the response body (error from the server).
                            error: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || undefined,
                        }));
                    }
                };
                // The onError callback is called when something goes wrong at the network level.
                // Connection timeout, DNS error, offline, etc. These are actual errors, and are
                // transmitted on the error channel.
                var onError = function (error) {
                    var res = new HttpErrorResponse({
                        error: error,
                        status: xhr.status || 0,
                        statusText: xhr.statusText || 'Unknown Error',
                    });
                    observer.error(res);
                };
                // The sentHeaders flag tracks whether the HttpResponseHeaders event
                // has been sent on the stream. This is necessary to track if progress
                // is enabled since the event will be sent on only the first download
                // progerss event.
                var sentHeaders = false;
                // The download progress event handler, which is only registered if
                // progress events are enabled.
                var onDownProgress = function (event) {
                    // Send the HttpResponseHeaders event if it hasn't been sent already.
                    if (!sentHeaders) {
                        observer.next(partialFromXhr());
                        sentHeaders = true;
                    }
                    // Start building the download progress event to deliver on the response
                    // event stream.
                    var progressEvent = {
                        type: HttpEventType.DownloadProgress,
                        loaded: event.loaded,
                    };
                    // Set the total number of bytes in the event if it's available.
                    if (event.lengthComputable) {
                        progressEvent.total = event.total;
                    }
                    // If the request was for text content and a partial response is
                    // available on XMLHttpRequest, include it in the progress event
                    // to allow for streaming reads.
                    if (req.responseType === 'text' && !!xhr.responseText) {
                        progressEvent.partialText = xhr.responseText;
                    }
                    // Finally, fire the event.
                    observer.next(progressEvent);
                };
                // The upload progress event handler, which is only registered if
                // progress events are enabled.
                var onUpProgress = function (event) {
                    // Upload progress events are simpler. Begin building the progress
                    // event.
                    var progress = {
                        type: HttpEventType.UploadProgress,
                        loaded: event.loaded,
                    };
                    // If the total number of bytes being uploaded is available, include
                    // it.
                    if (event.lengthComputable) {
                        progress.total = event.total;
                    }
                    // Send the event.
                    observer.next(progress);
                };
                // By default, register for load and error events.
                xhr.addEventListener('load', onLoad);
                xhr.addEventListener('error', onError);
                // Progress events are only enabled if requested.
                if (req.reportProgress) {
                    // Download progress is always enabled if requested.
                    xhr.addEventListener('progress', onDownProgress);
                    // Upload progress depends on whether there is a body to upload.
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.addEventListener('progress', onUpProgress);
                    }
                }
                // Fire the request, and notify the event stream that it was fired.
                xhr.send(reqBody);
                observer.next({ type: HttpEventType.Sent });
                // This is the return from the Observable function, which is the
                // request cancellation handler.
                return function () {
                    // On a cancellation, remove all registered event listeners.
                    xhr.removeEventListener('error', onError);
                    xhr.removeEventListener('load', onLoad);
                    if (req.reportProgress) {
                        xhr.removeEventListener('progress', onDownProgress);
                        if (reqBody !== null && xhr.upload) {
                            xhr.upload.removeEventListener('progress', onUpProgress);
                        }
                    }
                    // Finally, abort the in-flight request.
                    xhr.abort();
                };
            });
        };
        HttpXhrBackend = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [XhrFactory])
        ], HttpXhrBackend);
        return HttpXhrBackend;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var XSRF_COOKIE_NAME = new core.InjectionToken('XSRF_COOKIE_NAME');
    var XSRF_HEADER_NAME = new core.InjectionToken('XSRF_HEADER_NAME');
    /**
     * Retrieves the current XSRF token to use with the next outgoing request.
     *
     *
     */
    var HttpXsrfTokenExtractor = /** @class */ (function () {
        function HttpXsrfTokenExtractor() {
        }
        return HttpXsrfTokenExtractor;
    }());
    /**
     * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
     */
    var HttpXsrfCookieExtractor = /** @class */ (function () {
        function HttpXsrfCookieExtractor(doc, platform, cookieName) {
            this.doc = doc;
            this.platform = platform;
            this.cookieName = cookieName;
            this.lastCookieString = '';
            this.lastToken = null;
            /**
             * @internal for testing
             */
            this.parseCount = 0;
        }
        HttpXsrfCookieExtractor.prototype.getToken = function () {
            if (this.platform === 'server') {
                return null;
            }
            var cookieString = this.doc.cookie || '';
            if (cookieString !== this.lastCookieString) {
                this.parseCount++;
                this.lastToken = common.ɵparseCookieValue(cookieString, this.cookieName);
                this.lastCookieString = cookieString;
            }
            return this.lastToken;
        };
        HttpXsrfCookieExtractor = __decorate([
            core.Injectable(),
            __param(0, core.Inject(common.DOCUMENT)), __param(1, core.Inject(core.PLATFORM_ID)),
            __param(2, core.Inject(XSRF_COOKIE_NAME)),
            __metadata("design:paramtypes", [Object, String, String])
        ], HttpXsrfCookieExtractor);
        return HttpXsrfCookieExtractor;
    }());
    /**
     * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
     */
    var HttpXsrfInterceptor = /** @class */ (function () {
        function HttpXsrfInterceptor(tokenService, headerName) {
            this.tokenService = tokenService;
            this.headerName = headerName;
        }
        HttpXsrfInterceptor.prototype.intercept = function (req, next) {
            var lcUrl = req.url.toLowerCase();
            // Skip both non-mutating requests and absolute URLs.
            // Non-mutating requests don't require a token, and absolute URLs require special handling
            // anyway as the cookie set
            // on our origin is not the same as the token expected by another origin.
            if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
                lcUrl.startsWith('https://')) {
                return next.handle(req);
            }
            var token = this.tokenService.getToken();
            // Be careful not to overwrite an existing header of the same name.
            if (token !== null && !req.headers.has(this.headerName)) {
                req = req.clone({ headers: req.headers.set(this.headerName, token) });
            }
            return next.handle(req);
        };
        HttpXsrfInterceptor = __decorate([
            core.Injectable(),
            __param(1, core.Inject(XSRF_HEADER_NAME)),
            __metadata("design:paramtypes", [HttpXsrfTokenExtractor, String])
        ], HttpXsrfInterceptor);
        return HttpXsrfInterceptor;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An injectable `HttpHandler` that applies multiple interceptors
     * to a request before passing it to the given `HttpBackend`.
     *
     * The interceptors are loaded lazily from the injector, to allow
     * interceptors to themselves inject classes depending indirectly
     * on `HttpInterceptingHandler` itself.
     * @see `HttpInterceptor`
     */
    var HttpInterceptingHandler = /** @class */ (function () {
        function HttpInterceptingHandler(backend, injector) {
            this.backend = backend;
            this.injector = injector;
            this.chain = null;
        }
        HttpInterceptingHandler.prototype.handle = function (req) {
            if (this.chain === null) {
                var interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
                this.chain = interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptorHandler(next, interceptor); }, this.backend);
            }
            return this.chain.handle(req);
        };
        HttpInterceptingHandler = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [HttpBackend, core.Injector])
        ], HttpInterceptingHandler);
        return HttpInterceptingHandler;
    }());
    /**
     * Factory function that determines where to store JSONP callbacks.
     *
     * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
     * in test environments. In that case, callbacks are stored on an anonymous object instead.
     *
     *
     */
    function jsonpCallbackContext() {
        if (typeof window === 'object') {
            return window;
        }
        return {};
    }
    /**
     * Configures XSRF protection support for outgoing requests.
     *
     * For a server that supports a cookie-based XSRF protection system,
     * use directly to configure XSRF protection with the correct
     * cookie and header names.
     *
     * If no names are supplied, the default cookie name is `XSRF-TOKEN`
     * and the default header name is `X-XSRF-TOKEN`.
     *
     *
     */
    var HttpClientXsrfModule = /** @class */ (function () {
        function HttpClientXsrfModule() {
        }
        HttpClientXsrfModule_1 = HttpClientXsrfModule;
        /**
         * Disable the default XSRF protection.
         */
        HttpClientXsrfModule.disable = function () {
            return {
                ngModule: HttpClientXsrfModule_1,
                providers: [
                    { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
                ],
            };
        };
        /**
         * Configure XSRF protection.
         * @param options An object that can specify either or both
         * cookie name or header name.
         * - Cookie name default is `XSRF-TOKEN`.
         * - Header name default is `X-XSRF-TOKEN`.
         *
         */
        HttpClientXsrfModule.withOptions = function (options) {
            if (options === void 0) { options = {}; }
            return {
                ngModule: HttpClientXsrfModule_1,
                providers: [
                    options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                    options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
                ],
            };
        };
        var HttpClientXsrfModule_1;
        HttpClientXsrfModule = HttpClientXsrfModule_1 = __decorate([
            core.NgModule({
                providers: [
                    HttpXsrfInterceptor,
                    { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
                    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
                    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
                    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
                ],
            })
        ], HttpClientXsrfModule);
        return HttpClientXsrfModule;
    }());
    /**
     * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
     * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
     *
     * You can add interceptors to the chain behind `HttpClient` by binding them to the
     * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
     *
     *
     */
    var HttpClientModule = /** @class */ (function () {
        function HttpClientModule() {
        }
        HttpClientModule = __decorate([
            core.NgModule({
                /**
                 * Optional configuration for XSRF protection.
                 */
                imports: [
                    HttpClientXsrfModule.withOptions({
                        cookieName: 'XSRF-TOKEN',
                        headerName: 'X-XSRF-TOKEN',
                    }),
                ],
                /**
                 * Configures the [dependency injector](guide/glossary#injector) where it is imported
                 * with supporting services for HTTP communications.
                 */
                providers: [
                    HttpClient,
                    { provide: HttpHandler, useClass: HttpInterceptingHandler },
                    HttpXhrBackend,
                    { provide: HttpBackend, useExisting: HttpXhrBackend },
                    BrowserXhr,
                    { provide: XhrFactory, useExisting: BrowserXhr },
                ],
            })
        ], HttpClientModule);
        return HttpClientModule;
    }());
    /**
     * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
     * with supporting services for JSONP.
     * Without this module, Jsonp requests reach the backend
     * with method JSONP, where they are rejected.
     *
     * You can add interceptors to the chain behind `HttpClient` by binding them to the
     * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
     *
     *
     */
    var HttpClientJsonpModule = /** @class */ (function () {
        function HttpClientJsonpModule() {
        }
        HttpClientJsonpModule = __decorate([
            core.NgModule({
                providers: [
                    JsonpClientBackend,
                    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
                    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
                ],
            })
        ], HttpClientJsonpModule);
        return HttpClientJsonpModule;
    }());

    /*! *****************************************************************************
    Copyright (C) Microsoft. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var Reflect$1;
    (function (Reflect) {
        // Metadata Proposal
        // https://rbuckton.github.io/reflect-metadata/
        (function (factory) {
            var root = typeof global === "object" ? global :
                typeof self === "object" ? self :
                    typeof this === "object" ? this :
                        Function("return this;")();
            var exporter = makeExporter(Reflect);
            if (typeof root.Reflect === "undefined") {
                root.Reflect = Reflect;
            }
            else {
                exporter = makeExporter(root.Reflect, exporter);
            }
            factory(exporter);
            function makeExporter(target, previous) {
                return function (key, value) {
                    if (typeof target[key] !== "function") {
                        Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                    }
                    if (previous)
                        previous(key, value);
                };
            }
        })(function (exporter) {
            var hasOwn = Object.prototype.hasOwnProperty;
            // feature test for Symbol support
            var supportsSymbol = typeof Symbol === "function";
            var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
            var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
            var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
            var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
            var downLevel = !supportsCreate && !supportsProto;
            var HashMap = {
                // create an object in dictionary mode (a.k.a. "slow" mode in v8)
                create: supportsCreate
                    ? function () { return MakeDictionary(Object.create(null)); }
                    : supportsProto
                        ? function () { return MakeDictionary({ __proto__: null }); }
                        : function () { return MakeDictionary({}); },
                has: downLevel
                    ? function (map, key) { return hasOwn.call(map, key); }
                    : function (map, key) { return key in map; },
                get: downLevel
                    ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                    : function (map, key) { return map[key]; },
            };
            // Load global or shim versions of Map, Set, and WeakMap
            var functionPrototype = Object.getPrototypeOf(Function);
            var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
            var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
            var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
            var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
            // [[Metadata]] internal slot
            // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
            var Metadata = new _WeakMap();
            /**
             * Applies a set of decorators to a property of a target object.
             * @param decorators An array of decorators.
             * @param target The target object.
             * @param propertyKey (Optional) The property key to decorate.
             * @param attributes (Optional) The property descriptor for the target key.
             * @remarks Decorators are applied in reverse order.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     Example = Reflect.decorate(decoratorsArray, Example);
             *
             *     // property (on constructor)
             *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
             *
             *     // property (on prototype)
             *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
             *
             *     // method (on constructor)
             *     Object.defineProperty(Example, "staticMethod",
             *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
             *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
             *
             *     // method (on prototype)
             *     Object.defineProperty(Example.prototype, "method",
             *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
             *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
             *
             */
            function decorate(decorators, target, propertyKey, attributes) {
                if (!IsUndefined(propertyKey)) {
                    if (!IsArray(decorators))
                        throw new TypeError();
                    if (!IsObject(target))
                        throw new TypeError();
                    if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                        throw new TypeError();
                    if (IsNull(attributes))
                        attributes = undefined;
                    propertyKey = ToPropertyKey(propertyKey);
                    return DecorateProperty(decorators, target, propertyKey, attributes);
                }
                else {
                    if (!IsArray(decorators))
                        throw new TypeError();
                    if (!IsConstructor(target))
                        throw new TypeError();
                    return DecorateConstructor(decorators, target);
                }
            }
            exporter("decorate", decorate);
            // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
            // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
            /**
             * A default metadata decorator factory that can be used on a class, class member, or parameter.
             * @param metadataKey The key for the metadata entry.
             * @param metadataValue The value for the metadata entry.
             * @returns A decorator function.
             * @remarks
             * If `metadataKey` is already defined for the target and target key, the
             * metadataValue for that key will be overwritten.
             * @example
             *
             *     // constructor
             *     @Reflect.metadata(key, value)
             *     class Example {
             *     }
             *
             *     // property (on constructor, TypeScript only)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         static staticProperty;
             *     }
             *
             *     // property (on prototype, TypeScript only)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         property;
             *     }
             *
             *     // method (on constructor)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         static staticMethod() { }
             *     }
             *
             *     // method (on prototype)
             *     class Example {
             *         @Reflect.metadata(key, value)
             *         method() { }
             *     }
             *
             */
            function metadata(metadataKey, metadataValue) {
                function decorator(target, propertyKey) {
                    if (!IsObject(target))
                        throw new TypeError();
                    if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                        throw new TypeError();
                    OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
                }
                return decorator;
            }
            exporter("metadata", metadata);
            /**
             * Define a unique metadata entry on the target.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param metadataValue A value that contains attached metadata.
             * @param target The target object on which to define metadata.
             * @param propertyKey (Optional) The property key for the target.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     Reflect.defineMetadata("custom:annotation", options, Example);
             *
             *     // property (on constructor)
             *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
             *
             *     // property (on prototype)
             *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
             *
             *     // method (on constructor)
             *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
             *
             *     // method (on prototype)
             *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
             *
             *     // decorator factory as metadata-producing annotation.
             *     function MyAnnotation(options): Decorator {
             *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
             *     }
             *
             */
            function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            exporter("defineMetadata", defineMetadata);
            /**
             * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.hasMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function hasMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryHasMetadata(metadataKey, target, propertyKey);
            }
            exporter("hasMetadata", hasMetadata);
            /**
             * Gets a value indicating whether the target object has the provided metadata key defined.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function hasOwnMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
            }
            exporter("hasOwnMetadata", hasOwnMetadata);
            /**
             * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function getMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryGetMetadata(metadataKey, target, propertyKey);
            }
            exporter("getMetadata", getMetadata);
            /**
             * Gets the metadata value for the provided metadata key on the target object.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getOwnMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function getOwnMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
            }
            exporter("getOwnMetadata", getOwnMetadata);
            /**
             * Gets the metadata keys defined on the target object or its prototype chain.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns An array of unique metadata keys.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getMetadataKeys(Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getMetadataKeys(Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getMetadataKeys(Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getMetadataKeys(Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getMetadataKeys(Example.prototype, "method");
             *
             */
            function getMetadataKeys(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryMetadataKeys(target, propertyKey);
            }
            exporter("getMetadataKeys", getMetadataKeys);
            /**
             * Gets the unique metadata keys defined on the target object.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns An array of unique metadata keys.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.getOwnMetadataKeys(Example);
             *
             *     // property (on constructor)
             *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
             *
             */
            function getOwnMetadataKeys(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                return OrdinaryOwnMetadataKeys(target, propertyKey);
            }
            exporter("getOwnMetadataKeys", getOwnMetadataKeys);
            /**
             * Deletes the metadata entry from the target object with the provided key.
             * @param metadataKey A key used to store and retrieve metadata.
             * @param target The target object on which the metadata is defined.
             * @param propertyKey (Optional) The property key for the target.
             * @returns `true` if the metadata entry was found and deleted; otherwise, false.
             * @example
             *
             *     class Example {
             *         // property declarations are not part of ES6, though they are valid in TypeScript:
             *         // static staticProperty;
             *         // property;
             *
             *         constructor(p) { }
             *         static staticMethod(p) { }
             *         method(p) { }
             *     }
             *
             *     // constructor
             *     result = Reflect.deleteMetadata("custom:annotation", Example);
             *
             *     // property (on constructor)
             *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
             *
             *     // property (on prototype)
             *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
             *
             *     // method (on constructor)
             *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
             *
             *     // method (on prototype)
             *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
             *
             */
            function deleteMetadata(metadataKey, target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey))
                    propertyKey = ToPropertyKey(propertyKey);
                var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return false;
                if (!metadataMap.delete(metadataKey))
                    return false;
                if (metadataMap.size > 0)
                    return true;
                var targetMetadata = Metadata.get(target);
                targetMetadata.delete(propertyKey);
                if (targetMetadata.size > 0)
                    return true;
                Metadata.delete(target);
                return true;
            }
            exporter("deleteMetadata", deleteMetadata);
            function DecorateConstructor(decorators, target) {
                for (var i = decorators.length - 1; i >= 0; --i) {
                    var decorator = decorators[i];
                    var decorated = decorator(target);
                    if (!IsUndefined(decorated) && !IsNull(decorated)) {
                        if (!IsConstructor(decorated))
                            throw new TypeError();
                        target = decorated;
                    }
                }
                return target;
            }
            function DecorateProperty(decorators, target, propertyKey, descriptor) {
                for (var i = decorators.length - 1; i >= 0; --i) {
                    var decorator = decorators[i];
                    var decorated = decorator(target, propertyKey, descriptor);
                    if (!IsUndefined(decorated) && !IsNull(decorated)) {
                        if (!IsObject(decorated))
                            throw new TypeError();
                        descriptor = decorated;
                    }
                }
                return descriptor;
            }
            function GetOrCreateMetadataMap(O, P, Create) {
                var targetMetadata = Metadata.get(O);
                if (IsUndefined(targetMetadata)) {
                    if (!Create)
                        return undefined;
                    targetMetadata = new _Map();
                    Metadata.set(O, targetMetadata);
                }
                var metadataMap = targetMetadata.get(P);
                if (IsUndefined(metadataMap)) {
                    if (!Create)
                        return undefined;
                    metadataMap = new _Map();
                    targetMetadata.set(P, metadataMap);
                }
                return metadataMap;
            }
            // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
            function OrdinaryHasMetadata(MetadataKey, O, P) {
                var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
                if (hasOwn)
                    return true;
                var parent = OrdinaryGetPrototypeOf(O);
                if (!IsNull(parent))
                    return OrdinaryHasMetadata(MetadataKey, parent, P);
                return false;
            }
            // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
            function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return false;
                return ToBoolean(metadataMap.has(MetadataKey));
            }
            // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
            function OrdinaryGetMetadata(MetadataKey, O, P) {
                var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
                if (hasOwn)
                    return OrdinaryGetOwnMetadata(MetadataKey, O, P);
                var parent = OrdinaryGetPrototypeOf(O);
                if (!IsNull(parent))
                    return OrdinaryGetMetadata(MetadataKey, parent, P);
                return undefined;
            }
            // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
            function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return undefined;
                return metadataMap.get(MetadataKey);
            }
            // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
            function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
                metadataMap.set(MetadataKey, MetadataValue);
            }
            // 3.1.6.1 OrdinaryMetadataKeys(O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
            function OrdinaryMetadataKeys(O, P) {
                var ownKeys = OrdinaryOwnMetadataKeys(O, P);
                var parent = OrdinaryGetPrototypeOf(O);
                if (parent === null)
                    return ownKeys;
                var parentKeys = OrdinaryMetadataKeys(parent, P);
                if (parentKeys.length <= 0)
                    return ownKeys;
                if (ownKeys.length <= 0)
                    return parentKeys;
                var set = new _Set();
                var keys = [];
                for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                    var key = ownKeys_1[_i];
                    var hasKey = set.has(key);
                    if (!hasKey) {
                        set.add(key);
                        keys.push(key);
                    }
                }
                for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                    var key = parentKeys_1[_a];
                    var hasKey = set.has(key);
                    if (!hasKey) {
                        set.add(key);
                        keys.push(key);
                    }
                }
                return keys;
            }
            // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
            // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
            function OrdinaryOwnMetadataKeys(O, P) {
                var keys = [];
                var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
                if (IsUndefined(metadataMap))
                    return keys;
                var keysObj = metadataMap.keys();
                var iterator = GetIterator(keysObj);
                var k = 0;
                while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                        keys.length = k;
                        return keys;
                    }
                    var nextValue = IteratorValue(next);
                    try {
                        keys[k] = nextValue;
                    }
                    catch (e) {
                        try {
                            IteratorClose(iterator);
                        }
                        finally {
                            throw e;
                        }
                    }
                    k++;
                }
            }
            // 6 ECMAScript Data Typ0es and Values
            // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
            function Type(x) {
                if (x === null)
                    return 1 /* Null */;
                switch (typeof x) {
                    case "undefined": return 0 /* Undefined */;
                    case "boolean": return 2 /* Boolean */;
                    case "string": return 3 /* String */;
                    case "symbol": return 4 /* Symbol */;
                    case "number": return 5 /* Number */;
                    case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                    default: return 6 /* Object */;
                }
            }
            // 6.1.1 The Undefined Type
            // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
            function IsUndefined(x) {
                return x === undefined;
            }
            // 6.1.2 The Null Type
            // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
            function IsNull(x) {
                return x === null;
            }
            // 6.1.5 The Symbol Type
            // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
            function IsSymbol(x) {
                return typeof x === "symbol";
            }
            // 6.1.7 The Object Type
            // https://tc39.github.io/ecma262/#sec-object-type
            function IsObject(x) {
                return typeof x === "object" ? x !== null : typeof x === "function";
            }
            // 7.1 Type Conversion
            // https://tc39.github.io/ecma262/#sec-type-conversion
            // 7.1.1 ToPrimitive(input [, PreferredType])
            // https://tc39.github.io/ecma262/#sec-toprimitive
            function ToPrimitive(input, PreferredType) {
                switch (Type(input)) {
                    case 0 /* Undefined */: return input;
                    case 1 /* Null */: return input;
                    case 2 /* Boolean */: return input;
                    case 3 /* String */: return input;
                    case 4 /* Symbol */: return input;
                    case 5 /* Number */: return input;
                }
                var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
                var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
                if (exoticToPrim !== undefined) {
                    var result = exoticToPrim.call(input, hint);
                    if (IsObject(result))
                        throw new TypeError();
                    return result;
                }
                return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
            }
            // 7.1.1.1 OrdinaryToPrimitive(O, hint)
            // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
            function OrdinaryToPrimitive(O, hint) {
                if (hint === "string") {
                    var toString_1 = O.toString;
                    if (IsCallable(toString_1)) {
                        var result = toString_1.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                    var valueOf = O.valueOf;
                    if (IsCallable(valueOf)) {
                        var result = valueOf.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                }
                else {
                    var valueOf = O.valueOf;
                    if (IsCallable(valueOf)) {
                        var result = valueOf.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                    var toString_2 = O.toString;
                    if (IsCallable(toString_2)) {
                        var result = toString_2.call(O);
                        if (!IsObject(result))
                            return result;
                    }
                }
                throw new TypeError();
            }
            // 7.1.2 ToBoolean(argument)
            // https://tc39.github.io/ecma262/2016/#sec-toboolean
            function ToBoolean(argument) {
                return !!argument;
            }
            // 7.1.12 ToString(argument)
            // https://tc39.github.io/ecma262/#sec-tostring
            function ToString(argument) {
                return "" + argument;
            }
            // 7.1.14 ToPropertyKey(argument)
            // https://tc39.github.io/ecma262/#sec-topropertykey
            function ToPropertyKey(argument) {
                var key = ToPrimitive(argument, 3 /* String */);
                if (IsSymbol(key))
                    return key;
                return ToString(key);
            }
            // 7.2 Testing and Comparison Operations
            // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
            // 7.2.2 IsArray(argument)
            // https://tc39.github.io/ecma262/#sec-isarray
            function IsArray(argument) {
                return Array.isArray
                    ? Array.isArray(argument)
                    : argument instanceof Object
                        ? argument instanceof Array
                        : Object.prototype.toString.call(argument) === "[object Array]";
            }
            // 7.2.3 IsCallable(argument)
            // https://tc39.github.io/ecma262/#sec-iscallable
            function IsCallable(argument) {
                // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
                return typeof argument === "function";
            }
            // 7.2.4 IsConstructor(argument)
            // https://tc39.github.io/ecma262/#sec-isconstructor
            function IsConstructor(argument) {
                // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
                return typeof argument === "function";
            }
            // 7.2.7 IsPropertyKey(argument)
            // https://tc39.github.io/ecma262/#sec-ispropertykey
            function IsPropertyKey(argument) {
                switch (Type(argument)) {
                    case 3 /* String */: return true;
                    case 4 /* Symbol */: return true;
                    default: return false;
                }
            }
            // 7.3 Operations on Objects
            // https://tc39.github.io/ecma262/#sec-operations-on-objects
            // 7.3.9 GetMethod(V, P)
            // https://tc39.github.io/ecma262/#sec-getmethod
            function GetMethod(V, P) {
                var func = V[P];
                if (func === undefined || func === null)
                    return undefined;
                if (!IsCallable(func))
                    throw new TypeError();
                return func;
            }
            // 7.4 Operations on Iterator Objects
            // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
            function GetIterator(obj) {
                var method = GetMethod(obj, iteratorSymbol);
                if (!IsCallable(method))
                    throw new TypeError(); // from Call
                var iterator = method.call(obj);
                if (!IsObject(iterator))
                    throw new TypeError();
                return iterator;
            }
            // 7.4.4 IteratorValue(iterResult)
            // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
            function IteratorValue(iterResult) {
                return iterResult.value;
            }
            // 7.4.5 IteratorStep(iterator)
            // https://tc39.github.io/ecma262/#sec-iteratorstep
            function IteratorStep(iterator) {
                var result = iterator.next();
                return result.done ? false : result;
            }
            // 7.4.6 IteratorClose(iterator, completion)
            // https://tc39.github.io/ecma262/#sec-iteratorclose
            function IteratorClose(iterator) {
                var f = iterator["return"];
                if (f)
                    f.call(iterator);
            }
            // 9.1 Ordinary Object Internal Methods and Internal Slots
            // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
            // 9.1.1.1 OrdinaryGetPrototypeOf(O)
            // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
            function OrdinaryGetPrototypeOf(O) {
                var proto = Object.getPrototypeOf(O);
                if (typeof O !== "function" || O === functionPrototype)
                    return proto;
                // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
                // Try to determine the superclass constructor. Compatible implementations
                // must either set __proto__ on a subclass constructor to the superclass constructor,
                // or ensure each class has a valid `constructor` property on its prototype that
                // points back to the constructor.
                // If this is not the same as Function.[[Prototype]], then this is definately inherited.
                // This is the case when in ES6 or when using __proto__ in a compatible browser.
                if (proto !== functionPrototype)
                    return proto;
                // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
                var prototype = O.prototype;
                var prototypeProto = prototype && Object.getPrototypeOf(prototype);
                if (prototypeProto == null || prototypeProto === Object.prototype)
                    return proto;
                // If the constructor was not a function, then we cannot determine the heritage.
                var constructor = prototypeProto.constructor;
                if (typeof constructor !== "function")
                    return proto;
                // If we have some kind of self-reference, then we cannot determine the heritage.
                if (constructor === O)
                    return proto;
                // we have a pretty good guess at the heritage.
                return constructor;
            }
            // naive Map shim
            function CreateMapPolyfill() {
                var cacheSentinel = {};
                var arraySentinel = [];
                var MapIterator = (function () {
                    function MapIterator(keys, values, selector) {
                        this._index = 0;
                        this._keys = keys;
                        this._values = values;
                        this._selector = selector;
                    }
                    MapIterator.prototype["@@iterator"] = function () { return this; };
                    MapIterator.prototype[iteratorSymbol] = function () { return this; };
                    MapIterator.prototype.next = function () {
                        var index = this._index;
                        if (index >= 0 && index < this._keys.length) {
                            var result = this._selector(this._keys[index], this._values[index]);
                            if (index + 1 >= this._keys.length) {
                                this._index = -1;
                                this._keys = arraySentinel;
                                this._values = arraySentinel;
                            }
                            else {
                                this._index++;
                            }
                            return { value: result, done: false };
                        }
                        return { value: undefined, done: true };
                    };
                    MapIterator.prototype.throw = function (error) {
                        if (this._index >= 0) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        throw error;
                    };
                    MapIterator.prototype.return = function (value) {
                        if (this._index >= 0) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        return { value: value, done: true };
                    };
                    return MapIterator;
                }());
                return (function () {
                    function Map() {
                        this._keys = [];
                        this._values = [];
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    }
                    Object.defineProperty(Map.prototype, "size", {
                        get: function () { return this._keys.length; },
                        enumerable: true,
                        configurable: true
                    });
                    Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                    Map.prototype.get = function (key) {
                        var index = this._find(key, /*insert*/ false);
                        return index >= 0 ? this._values[index] : undefined;
                    };
                    Map.prototype.set = function (key, value) {
                        var index = this._find(key, /*insert*/ true);
                        this._values[index] = value;
                        return this;
                    };
                    Map.prototype.delete = function (key) {
                        var index = this._find(key, /*insert*/ false);
                        if (index >= 0) {
                            var size = this._keys.length;
                            for (var i = index + 1; i < size; i++) {
                                this._keys[i - 1] = this._keys[i];
                                this._values[i - 1] = this._values[i];
                            }
                            this._keys.length--;
                            this._values.length--;
                            if (key === this._cacheKey) {
                                this._cacheKey = cacheSentinel;
                                this._cacheIndex = -2;
                            }
                            return true;
                        }
                        return false;
                    };
                    Map.prototype.clear = function () {
                        this._keys.length = 0;
                        this._values.length = 0;
                        this._cacheKey = cacheSentinel;
                        this._cacheIndex = -2;
                    };
                    Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                    Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                    Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                    Map.prototype["@@iterator"] = function () { return this.entries(); };
                    Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                    Map.prototype._find = function (key, insert) {
                        if (this._cacheKey !== key) {
                            this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                        }
                        if (this._cacheIndex < 0 && insert) {
                            this._cacheIndex = this._keys.length;
                            this._keys.push(key);
                            this._values.push(undefined);
                        }
                        return this._cacheIndex;
                    };
                    return Map;
                }());
                function getKey(key, _) {
                    return key;
                }
                function getValue(_, value) {
                    return value;
                }
                function getEntry(key, value) {
                    return [key, value];
                }
            }
            // naive Set shim
            function CreateSetPolyfill() {
                return (function () {
                    function Set() {
                        this._map = new _Map();
                    }
                    Object.defineProperty(Set.prototype, "size", {
                        get: function () { return this._map.size; },
                        enumerable: true,
                        configurable: true
                    });
                    Set.prototype.has = function (value) { return this._map.has(value); };
                    Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                    Set.prototype.delete = function (value) { return this._map.delete(value); };
                    Set.prototype.clear = function () { this._map.clear(); };
                    Set.prototype.keys = function () { return this._map.keys(); };
                    Set.prototype.values = function () { return this._map.values(); };
                    Set.prototype.entries = function () { return this._map.entries(); };
                    Set.prototype["@@iterator"] = function () { return this.keys(); };
                    Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                    return Set;
                }());
            }
            // naive WeakMap shim
            function CreateWeakMapPolyfill() {
                var UUID_SIZE = 16;
                var keys = HashMap.create();
                var rootKey = CreateUniqueKey();
                return (function () {
                    function WeakMap() {
                        this._key = CreateUniqueKey();
                    }
                    WeakMap.prototype.has = function (target) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                        return table !== undefined ? HashMap.has(table, this._key) : false;
                    };
                    WeakMap.prototype.get = function (target) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                        return table !== undefined ? HashMap.get(table, this._key) : undefined;
                    };
                    WeakMap.prototype.set = function (target, value) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                        table[this._key] = value;
                        return this;
                    };
                    WeakMap.prototype.delete = function (target) {
                        var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                        return table !== undefined ? delete table[this._key] : false;
                    };
                    WeakMap.prototype.clear = function () {
                        // NOTE: not a real clear, just makes the previous data unreachable
                        this._key = CreateUniqueKey();
                    };
                    return WeakMap;
                }());
                function CreateUniqueKey() {
                    var key;
                    do
                        key = "@@WeakMap@@" + CreateUUID();
                    while (HashMap.has(keys, key));
                    keys[key] = true;
                    return key;
                }
                function GetOrCreateWeakMapTable(target, create) {
                    if (!hasOwn.call(target, rootKey)) {
                        if (!create)
                            return undefined;
                        Object.defineProperty(target, rootKey, { value: HashMap.create() });
                    }
                    return target[rootKey];
                }
                function FillRandomBytes(buffer, size) {
                    for (var i = 0; i < size; ++i)
                        buffer[i] = Math.random() * 0xff | 0;
                    return buffer;
                }
                function GenRandomBytes(size) {
                    if (typeof Uint8Array === "function") {
                        if (typeof crypto !== "undefined")
                            return crypto.getRandomValues(new Uint8Array(size));
                        if (typeof msCrypto !== "undefined")
                            return msCrypto.getRandomValues(new Uint8Array(size));
                        return FillRandomBytes(new Uint8Array(size), size);
                    }
                    return FillRandomBytes(new Array(size), size);
                }
                function CreateUUID() {
                    var data = GenRandomBytes(UUID_SIZE);
                    // mark as random - RFC 4122 § 4.4
                    data[6] = data[6] & 0x4f | 0x40;
                    data[8] = data[8] & 0xbf | 0x80;
                    var result = "";
                    for (var offset = 0; offset < UUID_SIZE; ++offset) {
                        var byte = data[offset];
                        if (offset === 4 || offset === 6 || offset === 8)
                            result += "-";
                        if (byte < 16)
                            result += "0";
                        result += byte.toString(16).toLowerCase();
                    }
                    return result;
                }
            }
            // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
            function MakeDictionary(obj) {
                obj.__ = undefined;
                delete obj.__;
                return obj;
            }
        });
    })(Reflect$1 || (Reflect$1 = {}));

    /**
     * @license ngx-api-orm
     * MIT license
     */

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
    var   /**
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
    })(exports.AbstractBuilders || (exports.AbstractBuilders = {}));

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
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        SimpleBuilder$$1.ctorParameters = function () { return [
            { type: HttpClient },
            { type: ResourceModuleConfiguration }
        ]; };
        /** @nocollapse */ SimpleBuilder$$1.ngInjectableDef = core.defineInjectable({ factory: function SimpleBuilder_Factory() { return new SimpleBuilder$$1(core.inject(HttpClient), core.inject(ResourceModuleConfiguration)); }, token: SimpleBuilder$$1, providedIn: "root" });
        return SimpleBuilder$$1;
    }(exports.AbstractBuilders.SimpleBuilder));
    /**
     * \@internal
     */
    var ToOneBuilder$$1 = /** @class */ (function (_super) {
        __extends(ToOneBuilder$$1, _super);
        function ToOneBuilder$$1(_http, _config) {
            return _super.call(this, _http, _config) || this;
        }
        ToOneBuilder$$1.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        ToOneBuilder$$1.ctorParameters = function () { return [
            { type: HttpClient },
            { type: ResourceModuleConfiguration }
        ]; };
        /** @nocollapse */ ToOneBuilder$$1.ngInjectableDef = core.defineInjectable({ factory: function ToOneBuilder_Factory() { return new ToOneBuilder$$1(core.inject(HttpClient), core.inject(ResourceModuleConfiguration)); }, token: ToOneBuilder$$1, providedIn: "root" });
        return ToOneBuilder$$1;
    }(exports.AbstractBuilders.ToOneBuilder));
    /**
     * \@internal
     */
    var ToManyBuilder$$1 = /** @class */ (function (_super) {
        __extends(ToManyBuilder$$1, _super);
        function ToManyBuilder$$1(_http, _config) {
            return _super.call(this, _http, _config) || this;
        }
        ToManyBuilder$$1.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        ToManyBuilder$$1.ctorParameters = function () { return [
            { type: HttpClient },
            { type: ResourceModuleConfiguration }
        ]; };
        /** @nocollapse */ ToManyBuilder$$1.ngInjectableDef = core.defineInjectable({ factory: function ToManyBuilder_Factory() { return new ToManyBuilder$$1(core.inject(HttpClient), core.inject(ResourceModuleConfiguration)); }, token: ToManyBuilder$$1, providedIn: "root" });
        return ToManyBuilder$$1;
    }(exports.AbstractBuilders.ToManyBuilder));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * request adapters convert incoming bodies and outgoing bodies.
     * They do not touch options (headers and stuff).
     */

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
    })(exports.AbstractAdapters || (exports.AbstractAdapters = {}));

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
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */ SimpleAdapter$$1.ngInjectableDef = core.defineInjectable({ factory: function SimpleAdapter_Factory() { return new SimpleAdapter$$1(); }, token: SimpleAdapter$$1, providedIn: "root" });
        return SimpleAdapter$$1;
    }(exports.AbstractAdapters.SimpleAdapter));
    /**
     * \@internal
     */
    var ToOneAdapter$$1 = /** @class */ (function (_super) {
        __extends(ToOneAdapter$$1, _super);
        function ToOneAdapter$$1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ToOneAdapter$$1.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */ ToOneAdapter$$1.ngInjectableDef = core.defineInjectable({ factory: function ToOneAdapter_Factory() { return new ToOneAdapter$$1(); }, token: ToOneAdapter$$1, providedIn: "root" });
        return ToOneAdapter$$1;
    }(exports.AbstractAdapters.ToOneAdapter));
    /**
     * \@internal
     */
    var ToManyAdapter$$1 = /** @class */ (function (_super) {
        __extends(ToManyAdapter$$1, _super);
        function ToManyAdapter$$1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ToManyAdapter$$1.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */ ToManyAdapter$$1.ngInjectableDef = core.defineInjectable({ factory: function ToManyAdapter_Factory() { return new ToManyAdapter$$1(); }, token: ToManyAdapter$$1, providedIn: "root" });
        return ToManyAdapter$$1;
    }(exports.AbstractAdapters.ToManyAdapter));

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
    var   /**
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
            { type: RawInstance /* need to figure out how to refer to inheriting type here */, decorators: [{ type: core.Optional }] },
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
            ctor = core.Injectable({ providedIn: 'root' })(ctor);
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
            { type: core.NgModule, args: [{ imports: [HttpClientModule] },] }
        ];
        /** @nocollapse */
        ResourceRootModule.ctorParameters = function () { return [
            { type: core.Injector }
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
            { type: core.NgModule, args: [{ imports: [HttpClientModule] },] }
        ];
        return ResourceModule;
    }());

    exports.ResourceRootModule = ResourceRootModule;
    exports.ResourceModule = ResourceModule;
    exports.Resource = Resource;
    exports.Field = Field;
    exports.ToOne = ToOne;
    exports.ToMany = ToMany;
    exports.Model = Model;
    exports.ToManyRelation = ToManyRelation;
    exports.ToOneRelation = ToOneRelation;
    exports.ResourceModuleConfigurationWithProviders = ResourceModuleConfigurationWithProviders;
    exports.ToManyAdapter = ToManyAdapter$$1;
    exports.ToOneAdapter = ToOneAdapter$$1;
    exports.SimpleAdapter = SimpleAdapter$$1;
    exports.ToManyBuilder = ToManyBuilder$$1;
    exports.ToOneBuilder = ToOneBuilder$$1;
    exports.SimpleBuilder = SimpleBuilder$$1;
    exports.ResourceModuleConfiguration = ResourceModuleConfiguration;
    exports.toPlural = toPlural;
    exports.toDash = toDash;
    exports.toPluralDash = toPluralDash;
    exports.HttpVerb = HttpVerb;
    exports.METAKEYS = METAKEYS;
    exports.ɵc = RelationConfiguration;
    exports.ɵa = RawInstance;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-api-orm-core.umd.js.map
