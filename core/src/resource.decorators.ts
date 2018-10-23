import { Injectable, Optional } from '@angular/core';
import { Resource } from './resource.core';
import { RelationType, RelationConfiguration } from './relations/relation-configuration';
import { initMetaData, METAKEYS, getPluralAndSingularNames } from './utils';

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
	camelCaseFullModelName?: string;
	dashedPluralName?: string;
	dashedSingularName?: string;
}

export interface RelationOptions {
	relatedResource: Function | string;
	mapFrom?: string;
	optional?: boolean;
}

export interface FieldOptions {
	mapFrom?: string;
	optional?: boolean;
}

export interface OptionalRelationOptions {
	relatedResource: Function | string;
	mapFrom?: string;
}

export interface OptionalFieldOptions {
	mapFrom?: string;
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
export function Model(options: ModelOptions = {}) {
	return <T extends Resource>(ctor: any) => {
		ctor = Injectable({ providedIn: 'root' })(ctor);
		initMetaData(ctor);

		const names = getPluralAndSingularNames(
			options.dashedSingularName,
			options.dashedPluralName,
			options.camelCaseFullModelName,
			ctor.name
		);
		Reflect.defineMetadata(METAKEYS.SINGULAR, names.singular, ctor);
		Reflect.defineMetadata(METAKEYS.PLURAL, names.plural, ctor);

		const fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
		const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
		Reflect.defineMetadata(METAKEYS.FIELDS, fields.concat(attributes), ctor);
		if (!Reflect.hasOwnMetadata(METAKEYS.RESOURCES, Resource)) {
			Reflect.defineMetadata(METAKEYS.RESOURCES, new Map(), Resource);
		}
		Reflect.getMetadata(METAKEYS.RESOURCES, Resource).set(names.singular, ctor);
		return ctor;
	};
}

/**
 * Use this field decorator to parse the corresponding field from a json response by your API.
 * @param FieldOptions options? mapFrom: an identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field({mapFrom: 'commentText'})`.
 * Optional: mark this field as optional.
 *  For example: the api response sometimes contains a certain key `authors` and sometimes it doesn't.
 * Then the useage is: `Field({optional: true})`.
 */
export function Field(options: FieldOptions = {}) {
	return <T extends Resource>(target: any, key: string) => {
		const ctor = target.constructor;
		initMetaData(ctor);
		Reflect.defineMetadata(METAKEYS.MAP, options.mapFrom, ctor, key);
		Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor).push(key);
		if (options.optional) {
			Reflect.getMetadata(METAKEYS.OPTIONAL_FIELDS, ctor).push(key);
		}
	};
}
/**
 * An alias for Field({optional: true}).
 * @param  OptionalFieldOptions={} options
 */
export function OptionalField(options: OptionalFieldOptions = {}) {
	const _options: FieldOptions = { optional: true };
	return Field(Object.assign(_options, options));
}

/**
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-One relationship.
 * @param Function | string RelatedResource The constructor function of the model that is targeted for the To-One relation.
 * Either pass a direct reference to the constructor function, or pass a string with the name of the model. For the latter:
 * this should be dashed singular form (eg MyFancyModelName => 'my-fancy-model-name'). Use string references to prevent circular references from occuring in your model definitions.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export function ToOne<TRelated extends Resource>(options: Function | string | RelationOptions) {
	return relationDecoratorFactory(options, RelationType.ToOne);
}

/**
 * Use this field decorator to parse the corresponding field from a json response by your API and to identify the key as a To-Many relationship.
 * @param Function | string RelatedResource The constructor function of the model that is targeted for the To-Many relation.
 * Either pass a direct reference to the constructor function, or pass a string with the name of the model. For the latter:
 * this should be dashed singular form (eg MyFancyModelName => 'my-fancy-model-name'). Use string references to prevent circular references from occuring in your model definitions.
 * @param string mapFrom? An identifier to map keys coming from an incoming json response to keys in your model.
 *  For example: the api response has a key `commentText: 'nice article!` but the key in the model is `commentContent`.
 * Then the decorator should be used as `Field('commentText').
 */
export function ToMany<TRelated extends Resource>(options: Function | string | RelationOptions) {
	return relationDecoratorFactory(options, RelationType.ToMany);
}

export function OptionalToOne<TRelated extends Resource>(options: Function | string | OptionalRelationOptions) {
	const _options = { optional: true };
	if (options instanceof Function || typeof options === 'string') {
		return relationDecoratorFactory(Object.assign(_options, { relatedResource: options }), RelationType.ToOne);
	} else {
		Object.assign(_options, options);
		return relationDecoratorFactory(Object.assign(_options, options), RelationType.ToOne);
	}
}
export function OptionalToMany<TRelated extends Resource>(options: Function | string | OptionalRelationOptions) {
	const _options = { optional: true };
	if (options instanceof Function || typeof options === 'string') {
		return relationDecoratorFactory(Object.assign(_options, { relatedResource: options }), RelationType.ToMany);
	} else {
		Object.assign(_options, options);
		return relationDecoratorFactory(Object.assign(_options, options), RelationType.ToMany);
	}
}

export function relationDecoratorFactory(options: RelationOptions | Function | string, type: RelationType) {
	return (target: any, key: string) => {
		let relatedResourceString;
		let relatedResource: any;
		let mapFrom;
		let optional;
		if (options instanceof Function) {
			relatedResource = options;
		} else if (typeof options === 'string') {
			relatedResourceString = options;
		} else {
			mapFrom = options.mapFrom;
			optional = options.optional;
			if (typeof options.relatedResource === 'function') {
				relatedResource = options.relatedResource;
			} else if (typeof options.relatedResource === 'string') {
				relatedResourceString = options.relatedResource;
			} else {
				throw Error(
					'The property "relatedResource" of argument options of type RelationOptions must be either a string or a constructor function.'
				);
			}
		}
		const ctor = target.constructor;
		initMetaData(ctor);
		Reflect.defineMetadata(METAKEYS.MAP, mapFrom, ctor, key);
		Reflect.getMetadata(METAKEYS.FIELDS, ctor).push(key);
		Reflect.getMetadata(METAKEYS.RELATIONS, ctor)[key] = new RelationConfiguration(ctor, key, type, relatedResource, relatedResourceString);
		if (optional) {
			Reflect.getMetadata(METAKEYS.OPTIONAL_FIELDS, ctor).push(key);
		}
	};
}
