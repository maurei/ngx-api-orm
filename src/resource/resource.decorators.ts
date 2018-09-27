import 'reflect-metadata';
import { Injectable } from '@angular/core';
import { Resource } from './resource.core';
import { RelationType, RelationConfiguration } from './relations/relation-configuration';
import { toDash, initMetaData, METAKEYS } from './utils';

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
export function Model(options?: ModelOptions) {
	return <T extends Resource>(ctor: any) => {
		ctor = Injectable({ providedIn: 'root' })(ctor);
		initMetaData(ctor);
		const resourceName = options && options.name ? (options.name.includes('-') ? options.name : toDash(options.name)) : toDash(ctor.name);
		Reflect.defineMetadata(METAKEYS.NAME, resourceName, ctor);

		const fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
		const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
		Reflect.defineMetadata(METAKEYS.FIELDS, fields.concat(attributes), ctor);

		return ctor;
	};
}

/**
 * Use this field decorator to parse the corresponding field from a json response by your API.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export function Field(mapFrom?: string) {
	return <T extends Resource>(target: any, key: string) => {
		const ctor = target.constructor;
		initMetaData(ctor);
		Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
		Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor).push(key);
	};
}

/**
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-One relationship.
 * @param Function RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export const ToOne = function<TRelated extends Resource>(RelatedResource: any, mapFrom?: string) {
	return (target: any, key: string) => {
		const ctor = target.constructor;
		initMetaData(ctor);
		Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
		Reflect.getMetadata(METAKEYS.FIELDS, ctor).push(key);
		Reflect.getMetadata(METAKEYS.RELATIONS, ctor)[key] = new RelationConfiguration(ctor, RelatedResource, key, RelationType.ToOne);
	};
};

/**
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-Many relationship.
 * @param Function RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export const ToMany = function <TRelated extends Resource>(RelatedResource: any, mapFrom?: string) {
	return (target: any, key: string) => {
		const ctor = target.constructor;
		initMetaData(ctor);
		Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
		Reflect.getMetadata(METAKEYS.FIELDS, ctor).push(key);
		Reflect.getMetadata(METAKEYS.RELATIONS, ctor)[key] = new RelationConfiguration(ctor, RelatedResource, key, RelationType.ToMany);
	};
};
