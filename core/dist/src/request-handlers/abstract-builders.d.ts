import { ResourceModuleConfiguration, HttpClientOptions, HttpVerb } from '../utils';
import { HttpClient } from '@angular/common/http';
export declare namespace Abstract {
    abstract class BaseBuilder {
        protected readonly _http: HttpClient;
        constructor(_http: HttpClient);
        request(method: HttpVerb, path: string, options: HttpClientOptions, body?: any): Promise<Object>;
    }
    abstract class SimpleBuilder extends BaseBuilder {
        protected readonly _http: HttpClient;
        protected readonly config: ResourceModuleConfiguration;
        constructor(_http: HttpClient, config: ResourceModuleConfiguration);
        protected buildUrl(targetName: string, targetInstance?: any): string;
        fetch(targetName: string, options: HttpClientOptions): Promise<Object>;
        save(targetName: string, body: any, options: HttpClientOptions): Promise<Object>;
        update(targetName: string, body: any, options: HttpClientOptions): Promise<any>;
        delete(targetName: string, instance: any, options: HttpClientOptions): Promise<any>;
    }
    abstract class ToOneBuilder extends BaseBuilder {
        protected readonly _http: HttpClient;
        protected readonly config: ResourceModuleConfiguration;
        constructor(_http: HttpClient, config: ResourceModuleConfiguration);
        protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string;
        add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void>;
        remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void>;
    }
    abstract class ToManyBuilder extends BaseBuilder {
        protected readonly _http: HttpClient;
        protected readonly config: ResourceModuleConfiguration;
        constructor(_http: HttpClient, config: ResourceModuleConfiguration);
        protected buildUrl(targetName: string, relatedName: string, relatedInstance: any): string;
        add(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void>;
        remove(targetName: string, relatedName: string, body: any, relatedInstance: any, options: HttpClientOptions): Promise<void>;
    }
}
