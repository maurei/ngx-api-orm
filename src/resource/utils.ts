import { Injector, Provider } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resource } from './resource.core';
import { RelationConfiguration, RelationType } from './relations/relation-configuration';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from './request-handlers/default/builders';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from './request-handlers/default/adapters';

export function toDash(name: string): string {
	const split = name.split('');
	split[0] = split[0].toLowerCase();
	const splitJoin = split.join('');
	return splitJoin.replace(/([A-Z])/g, $1 => {
		return '-' + $1.toLowerCase();
	});
}

export function toPluralDash(name: string) {
	return toPlural(toDash(name));
}

export function toPlural(name: string) {
	return name + 's';
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
				const updatedFields = Reflect.getMetadata(METAKEYS.UPDATED, instance);
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
	NAME: 'orm:name'
};

/** @internal */
export class ResourceModuleConfiguration {
	rootPath?: string;
}

export class ResourceModuleConfigurationWithProviders extends ResourceModuleConfiguration {
	/** Sets the API root of your app. */
	rootPath?: string;
	/** Allows to conveniently register a collection of request handlers. See the guide on extendability on how to use this. Can be set to {@link JsonApiDotOrg}. */
	requestHandlersProviders?: Provider[];
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
