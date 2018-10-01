import { Resource } from './resource.core';
/**
 * Options object that can be passed to the {@link Model} when decorating your model. Currently it is only possible to configure `name`, which is used in
 * generating the urls for requests.
 *
 * If you have a custom `uglify.config.js` file in which `mangle` is set to false, you do not need to use this.
 *
 * If you don't, then Angular's AOT will obfuscate `constructor.name`, and this library will not be able to construct URL according to the name of your model.
 * To prevent this from happening, you can pass `name` in the decorator options.
 *
 * Alternatively, you can use `name` to provide for a custom representation in the url.
 *
 * @example
 * // uglify.config.js with mangle = false
 * @Model() // will produce calls to .../my-dummy-models/...
 * class MyDummyModel extends Resource {}
 *
 * // without mangle = false
 * @Model() // will not work!
 * class MyDummyModel extends Resource {}
 *
 * // without mangle = false
 * @Model({name: 'MyDummyModel'}) // will produce calls to .../my-dummy-models/...
 * class MyDummyModel extends Resource {}
 *
 * // without mangle = false
 * @Model({name: 'MyAlternativeName'}) // will produce calls to .../my-alternative-name/...
 * class MyDummyModel extends Resource {}
 *
 * // without mangle = false
 * @Model({name: 'my-alternative-name'}) // will produce calls to .../my-alternative-name/...
 * class MyDummyModel extends Resource {}
 */
export interface ModelOptions {
    name?: string;
}
/**
 * Add this class decorator to your model to turn it into a `Resource` model, which means that it is considered as an endpoint on your API.
 *
 * See {@link ModelOptions} on how to configure the name used in URLs.
 *
 * This decorator is responsible for setting metadata, which is used internally, on the constructor of your class.
 *
 * @param  ModelOptions={} options
 */
export declare function Model(options?: ModelOptions): <T extends Resource>(ctor: any) => any;
/**
 * Use this field decorator to parse the corresponding field from a json response by your API.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export declare function Field(mapFrom?: string): <T extends Resource>(target: any, key: string) => void;
/**
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-One relationship.
 * @param Function RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export declare const ToOne: <TRelated extends Resource>(RelatedResource: any, mapFrom?: string | undefined) => (target: any, key: string) => void;
/**
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-Many relationship.
 * @param Function RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export declare const ToMany: <TRelated extends Resource>(RelatedResource: any, mapFrom?: string | undefined) => (target: any, key: string) => void;
