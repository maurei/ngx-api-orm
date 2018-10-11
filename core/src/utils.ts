import { Injector, Provider } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resource } from './resource.core';
import { RelationConfiguration, RelationType } from './relations/relation-configuration';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default-builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default-adapters';
import { plural, singular, isSingular } from 'pluralize';

export const toPlural = plural;
export const toSingular = singular;


export function getPluralAndSingularNames(
	_singular: string | undefined,
	_plural: string | undefined,
	customCtorName: string | undefined,
	ctorName: string
): { plural: string; singular: string } {
	if ((_singular && !_plural) || (!_singular && _plural)) {
		throw new Error(
			`Single or plural form is missing. If you supply a custom singular or plural name in @Model decorator, you must use supply BOTH the singular and plural forms.`
		);
	} else if (customCtorName && (_singular && _plural)) {
		throw new Error(`Was singular and/or plural included.
			If you supply a custom class name, (in this case: ${customCtorName}), you shouldn't also include custom singular and/or plural forms.`);
	} else if (customCtorName && !isSingular(customCtorName)) {
		throw new Error(
			`Custom class name not recognized as singular. If you supply a custom class name, (in this case: ${customCtorName}), it must be in a singular form.`
		);
	} else if (!customCtorName && ctorName && !isSingular(ctorName)) {
		throw new Error(
			`Class name not recognized as singular. Note: "${ctorName} extends Resource"
			should be "${toSingular(ctorName)} extends Resource": your class should be named in a singular form.`
		);
	}

	let singularName;
	let pluralName;
	if (_singular && _plural) {
		singularName = _singular;
		pluralName = _plural;
	} else if (customCtorName) {
		singularName = toDash(customCtorName);
		pluralName = toPlural(toDash(customCtorName));
	} else {
		singularName = toDash(ctorName);
		pluralName = toPlural(toDash(ctorName));
	}
	return { singular: singularName, plural: pluralName };
}

export function toDash(name: string): string {
	const split = name.split('');
	split[0] = split[0].toLowerCase();
	const splitJoin = split.join('');
	return splitJoin.replace(/([A-Z])/g, $1 => {
		return '-' + $1.toLowerCase();
	});
}

/** @internal */
export let InjectorContainer: { [instance: string]: Injector | undefined } = { instance: undefined };

/** @internal */
export function getDependencyInjectionEntries(token: any): RequestHandlers {
	if (InjectorContainer.instance !== undefined) {
		const injector = InjectorContainer.instance;
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
	return [] as any;
}

export enum HttpVerb {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	PATCH = 'patch',
	DELETE = 'delete'
}

/** @internal */
export function initMetaData(ctor: any) {
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

/** @internal */
export function updateInterceptProxyFactory(targetInstance: Resource) {
	const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, targetInstance.constructor);
	return new Proxy(targetInstance, {
		set(instance: any, key: string, value: any, proxy: any): boolean {
			if (attributes.indexOf(key) > -1) {
				const updatedFields = Reflect.getMetadata(METAKEYS.UPDATED, proxy);
				const map = Reflect.getMetadata(METAKEYS.MAP, instance, key);
				updatedFields[map || key] = instance[key];
			}
			instance[key] = value;
			return true;
		}
	});
}

/** @internal */
export function readOnlyArrayProxyFactory(targetArray: Array<any>) {
	const forbiddenMethods = ['push', 'pop', 'shift', 'unshift'];
	return new Proxy(targetArray, {
		get(instance: any, key: string, proxy: any): boolean {
			if (forbiddenMethods.indexOf(key) > -1) {
				throw Error(`Operation ${key} not allowed on this readonly array!`);
			}
			return instance[key];
		}
	});
}

export const METAKEYS = {
	FIELDS: 'orm:fields',
	ATTRIBUTES: 'orm:attributes',
	RELATIONS: 'orm:relations',
	MAP: 'orm:map',
	UPDATED: 'orm:updated',
	INSTANCES: 'orm:instances',
	PLURAL: 'orm:plural',
	SINGULAR: 'orm:singular'
};

/** @internal */
export class ResourceModuleConfiguration {
	rootPath?: string;
}

export class ResourceModuleConfigurationWithProviders extends ResourceModuleConfiguration {
	/** Sets the API root of your app. */
	rootPath?: string;
	/** Allows to conveniently register a collection of request handlers. See the guide on extendability on how to use this. Can be set to {@link JsonApiDotOrg}. */
	requestHandler?: Provider[];
}

export interface Instantiable<T> {
	new (...args: any[]): T;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RawInstanceTemplate<T extends Resource> = Omit<T, keyof Resource>;

export interface ResourceType<T> extends Instantiable<T> {
	_instances: T[];
	collection<U extends Resource>(this: ResourceType<U>): U[];
	fetch<U extends Resource>(this: ResourceType<U>): Promise<U[]>;
	find<U extends Resource>(this: ResourceType<U>, id: number): U | undefined;
	template<U extends Resource>(this: ResourceType<U>): RawInstanceTemplate<U>;
	factory<U extends Resource>(this: ResourceType<U>, rawInstance: Array<{}>): Array<U>;
	factory<U extends Resource>(this: ResourceType<U>, rawInstance: {}): U;
}

export interface HttpClientOptions {
	url?: string;
	body?: any;
	headers?: HttpHeaders | { [header: string]: string | string[] };
	observe?: 'body';
	params?: HttpParams | { [param: string]: string | string[] };
	responseType?: 'json';
	reportProgress?: boolean;
	withCredentials?: boolean;
}
/** @internal */
export type RequestHandlers = [SimpleAdapter, SimpleBuilder, ToOneAdapter, ToOneBuilder, ToManyAdapter, ToManyBuilder];

/** @internal */
export type UnresolvedRequestHandlers = [
	SimpleAdapter | undefined,
	SimpleBuilder | undefined,
	ToOneAdapter | undefined,
	ToOneBuilder | undefined,
	ToManyAdapter | undefined,
	ToManyBuilder | undefined
];
