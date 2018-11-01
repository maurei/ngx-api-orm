export type ParsedJsonApiResource = { [fieldName: string]: string | ParsedJsonApiResource | Array<ParsedJsonApiResource>; id: string } | null;

export type JsonApiMeta = any;

export interface JsonApiAttributes {
	[fieldName: string]: any;
}

export type UJsonApiResourceIdentifier = JsonApiResourceIdentifier | JsonApiResourceIdentifier[];

export interface JsonApiRelationship {
	[type: string]: JsonApiResponse<UJsonApiResourceIdentifier>;
}

export interface JsonApiLink {
	self?: string;
	next?: string;
	last?: string;
	related?: string;
}
export interface JsonApiResource {
	type: string;
	id?: string;
	meta?: JsonApiMeta;
	links?: JsonApiLink;
	attributes?: JsonApiAttributes;
	relationships?: JsonApiRelationship;
}

export interface JsonApiResourceIdentifier {
	type: string;
	id: string;
	meta?: JsonApiMeta;
	links?: JsonApiLink;
}

export interface JsonApiBaseResponse {
	meta?: JsonApiMeta;
	jsonapi?: any;
}

export type UJsonApiResource = JsonApiResource | Array<JsonApiResource>;

export interface JsonApiResponse<T = UJsonApiResource> extends JsonApiBaseResponse {
	data: T;
	links?: JsonApiLink;
	// included?: Array<JsonApiResource>;
	included?: any;
}
export interface JsonApiError extends JsonApiBaseResponse {
	error: any;
}
