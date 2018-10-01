import { Provider } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Resource } from './resource.core';
export declare function toDash(name: string): string;
export declare function toPluralDash(name: string): string;
export declare function toPlural(name: string): string;
export declare enum HttpVerb {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete",
}
export declare const METAKEYS: {
    FIELDS: string;
    ATTRIBUTES: string;
    RELATIONS: string;
    MAP: string;
    UPDATED: string;
    INSTANCES: string;
    NAME: string;
};
export declare class ResourceModuleConfigurationWithProviders extends ResourceModuleConfiguration {
    /** Sets the API root of your app. */
    rootPath?: string;
    /** Allows to conveniently register a collection of request handlers. See the guide on extendability on how to use this. Can be set to {@link JsonApiDotOrg}. */
    requestHandler?: Provider[];
}
export interface Instantiable<T> {
    new (...args: any[]): T;
}
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type RawInstanceTemplate<T extends Resource> = Omit<T, keyof Resource>;
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
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    responseType?: 'json';
    reportProgress?: boolean;
    withCredentials?: boolean;
}
