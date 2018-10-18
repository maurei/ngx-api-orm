import {
	Model,
	Field,
	ToMany,
	ToOne,
	SimpleBuilder,
	ToOneBuilder,
	ToManyBuilder,
	ResourceType,
	Resource,
	ResourceModule
} from '@ngx-api-orm/core';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonApiResponse } from '../src/declarations';
import { JsonApi } from '../src/providers';

function getModels() {
	@Model()
	class RelatedMany extends Resource {
		@Field()
		public id: number;
		@Field('test')
		public experiment: any;
		@Field()
		public field: any;
		@ToMany('host')
		public hosts: any;
	}

	@Model()
	class RelatedOne extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToOne('host')
		public host: any;
	}

	@Model()
	class Host extends Resource {
		@Field()
		public id: number;
		@Field('fullName')
		public name: any;
		@Field()
		public some: any;
		@Field()
		public field: any;
		@ToOne(RelatedOne)
		public relatedInstance: any;
		@ToMany(RelatedMany)
		public relatedInstances: any;

		public notIncluded: any;
	}
	(ResourceModule.forRoot().ngModule as any).processRelationships();
	return {
		getHost: () => (Host as any) as ResourceType<Host>,
		getRelatedOne: () => (RelatedOne as any) as ResourceType<RelatedOne>,
		getRelatedMany: () => (RelatedMany as any) as ResourceType<RelatedMany>
	};
}

const toOneNoId = {
	field: 'content',
	host: null
};
const toOnePostResponse: JsonApiResponse = {
	data: {
		type: 'related-ones',
		id: '1337',
		attributes: {
			field: 'Ember Hamster'
		},
		links: {
			self: 'http://example.com/related-one/1337'
		}
	}
};

const nestedJsonApiResponse: JsonApiResponse = {
	links: {
		self: 'http://example.com/hosts',
		next: 'http://example.com/hosts?page[offset]=2',
		last: 'http://example.com/hosts?page[offset]=10'
	},
	data: [
		{
			type: 'hosts',
			id: '1',
			attributes: {
				name: 'JSON API paints my bikeshed!',
				some: 'I dont like paint',
				fullName: 'I prefer blue',
				field: 'Red bikeshes are the bomb'
			},
			relationships: {
				relatedInstance: {
					data: { type: 'related-ones', id: '20' }
				},
				relatedInstances: {
					data: [{ type: 'related-manies', id: '30' }, { type: 'related-manies', id: '31' }, { type: 'related-manies', id: '32' }]
				}
			},
			links: {
				self: 'http://example.com/hosts/1'
			}
		},
		{
			type: 'hosts',
			id: '2',
			attributes: {
				name: 'JSON API paints my bikeshed!',
				some: 'I dont like paint',
				fullName: 'I prefer blue',
				field: 'Red bikeshes are the bomb'
			},
			relationships: {
				relatedInstance: {
					data: { type: 'related-ones', id: '21' }
				},
				relatedInstances: {
					data: [{ type: 'related-manies', id: '30' }, { type: 'related-manies', id: '29' }]
				}
			},
			links: {
				self: 'http://example.com/hosts/2'
			}
		}
	],
	included: [
		{
			type: 'related-ones',
			id: '20',
			attributes: {
				field: 'Dan'
			},
			links: {
				self: 'http://example.com/related-ones/20'
			}
		},
		{
			type: 'related-ones',
			id: '21',
			attributes: {
				field: 'Bikeshed'
			},
			links: {
				self: 'http://example.com/related-ones/21'
			}
		},
		{
			type: 'related-manies',
			id: '29',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manies/29'
			}
		},
		{
			type: 'related-manies',
			id: '30',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manies/30'
			}
		},
		{
			type: 'related-manies',
			id: '31',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manies/31'
			}
		},
		{
			type: 'related-manies',
			id: '32',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manies/32'
			}
		}
	]
};

const nestedTemplate = [
	{
		id: 1,
		name: 'first',
		some: 'middle',
		field: 'last',
		relatedInstance: {
			id: 20,
			test: 'more content',
			field: 'content'
		},
		relatedInstances: [],
		notIncluded: 'content'
	},
	{
		id: 2,
		name: 'first',
		some: 'middle',
		field: 'last',
		relatedInstance: {
			id: 20,
			experiment: 'more content',
			field: 'content'
		},
		relatedInstances: [{ id: 50, field: 'to-many', experiment: 'more content' }, { id: 51, field: 'to-many', experiment: 'more content' }],
		notIncluded: 'content'
	},
	{
		id: 3,
		name: 'first',
		some: 'middle',
		field: 'last',
		relatedInstance: null,
		relatedInstances: [
			{ id: 50, field: 'to-many', test: 'test content' },
			{
				id: 52,
				field: 'to-many',
				test: 'test content'
			}
		],
		notIncluded: 'content'
	}
];

const completeHostWithId = {
	id: 1,
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedInstance: null,
	relatedInstances: [],
	notIncluded: 'content'
};
const completeHostWithoutId = {
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedInstance: null,
	relatedInstances: []
};

const toOneWithId = {
	id: 2012,
	field: 'to-one content',
	host: null
};
const toManyWithId = {
	id: 52,
	field: 'to-many',
	experiment: 'test content',
	hosts: null
};

describe('JsonApi request handler integration', () => {
	let injector: TestBed;
	let httpMock: HttpTestingController;
	let ctors: any;
	let hostCtor: any;
	let toOneCtor: any;
	let toManyCtor: any;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ResourceModule.forRoot({ requestHandler: JsonApi }), HttpClientTestingModule],
			declarations: [],
			providers: []
		}).compileComponents();
		injector = getTestBed();
		httpMock = injector.get(HttpTestingController);
	}));

	describe('save pipeline:', () => {
		beforeEach(() => {
			console.log('break here');
			ctors = getModels();
			hostCtor = ctors.getHost();
			toOneCtor = ctors.getRelatedOne();
			toManyCtor = ctors.getRelatedMany();
		});
		it('a single resource', async () => {
			const unsavedToOne = new toOneCtor(toOneNoId);
			const savePromise = unsavedToOne.save();
			const mockreq = httpMock.expectOne(`/related-ones`);
			expect(mockreq.request.method).toBe('POST');
			const rv = Object.assign({}, completeHostWithId);
			mockreq.flush(toOnePostResponse);
			savePromise.then((savedInstance: any) => {
				expect(toOneCtor.collection()[0].id).toBe('1337');
			});
		});
		it('a to one resource', async () => {
			const hostInstance = new hostCtor(completeHostWithId);
			const toOneInstance = new toOneCtor(toOneWithId);
			const addPromise = hostInstance.relatedInstance.set(toOneInstance);
			addPromise.then(() => {
				expect(hostInstance.relatedInstance.instance).toBe(toOneInstance);
			});
			const mockreq = httpMock.expectOne('/hosts/1/relationships/related-one');
			expect(mockreq.request.method).toBe('PATCH');
			mockreq.flush(null);
		});
		it('a to many resource', async () => {
			const hostInstance = new hostCtor(completeHostWithId);
			const toManyInstance = new toManyCtor(toManyWithId);
			const addPromise = hostInstance.relatedInstances.add(toManyInstance);
			addPromise.then(() => {
				expect(hostInstance.relatedInstances[hostInstance.relatedInstances.length - 1]).toBe(toManyInstance);
			});
			const mockreq = httpMock.expectOne('/hosts/1/relationships/related-manies');
			expect(mockreq.request.method).toBe('POST');
			mockreq.flush(null);
		});
	});
	describe('delete pipeline:', () => {
		let nestedInstance: any;
		beforeEach(() => {
			ctors = getModels();
			hostCtor = ctors.getHost();
			toOneCtor = ctors.getRelatedOne();
			toManyCtor = ctors.getRelatedMany();
			nestedInstance = hostCtor.factory(nestedTemplate);
		});
		it('a single resource', async () => {
			expect(hostCtor.collection().length).toBe(3);
			const host = hostCtor.collection()[0];
			const deletePromise = host.delete();
			const mockreq = httpMock.expectOne(`/hosts/1`);
			expect(mockreq.request.method).toBe('DELETE');
			mockreq.flush(null);
			deletePromise.then(() => {
				expect(hostCtor.collection().length).toBe(2);
			});
		});
		it('a to one resource', async () => {
			const host = nestedInstance[0];
			const target = host.relatedInstance.instance;
			const deletePromise = host.relatedInstance.remove();
			deletePromise.then(() => {
				expect(host.relatedInstance.instance).toBeNull();
			});
			const mockreq = httpMock.expectOne(`/hosts/1/relationships/related-one`);
			expect(mockreq.request.method).toBe('PATCH');
			expect(mockreq.request.body).toEqual({ data: null });
			mockreq.flush(null);
		});
		it('a to many resource', async () => {
			const host = nestedInstance[1];
			const target = host.relatedInstances[0];
			const preLength = host.relatedInstances.length;
			const deletePromise = host.relatedInstances.remove(target);
			deletePromise.then(() => {
				expect(host.relatedInstances.length).toBe(preLength - 1);
			});
			const mockreq = httpMock.expectOne(`/hosts/2/relationships/related-manies`);
			expect(mockreq.request.method).toBe('DELETE');
			expect(mockreq.request.body).toEqual({ data: { id: target.id.toString(), type: 'related-manies' } });
			mockreq.flush(null);
		});
	});
	describe('fetch and update pipeline:', () => {
		beforeEach(() => {
			ctors = getModels();
			hostCtor = ctors.getHost();
			toOneCtor = ctors.getRelatedOne();
			toManyCtor = ctors.getRelatedMany();
		});
		it('getting nested resources', async () => {
			const getPromise = hostCtor.fetch();
			const mockreq = httpMock.expectOne('/hosts');
			expect(mockreq.request.method).toBe('GET');
			mockreq.flush(nestedJsonApiResponse);
			getPromise.then(() => {
				expect(hostCtor.collection().length).toBe(2);
				expect(toOneCtor.collection().length).toBe(2);
				expect(toManyCtor.collection().length).toBe(4);
			});
		});
		fit('patching a resource (only affected fields)', async () => {
			hostCtor.factory(nestedTemplate);
			const target = hostCtor.collection()[0];
			target.name = 'patched';
			const patchPromise = target.update();
			const mockreq = httpMock.expectOne(`/hosts/${target.id}`);
			expect(mockreq.request.method).toBe('PATCH');
			const body = {
				data: {
					id: target.id.toString(),
					type: 'hosts',
					attributes: { fullName: 'patched' }
				}
			};
			expect(mockreq.request.body).toEqual(body);
			mockreq.flush(null);
			patchPromise.then(() => {
				expect(target.name).toBe('patched');
			});
		});
		it('patching a nested resource', async () => {
			hostCtor.factory(nestedTemplate);
			const related = hostCtor.collection()[0].relatedInstance.instance;
			related.field = 'patched';
			const patchPromise = related.update();
			const mockreq = httpMock.expectOne(`/related-ones/${related.id}`);
			expect(mockreq.request.method).toBe('PATCH');

			const body = {
				data: {
					id: related.id.toString(),
					type: 'related-ones',
					attributes: { field: 'patched' }
				}
			};
			expect(mockreq.request.body).toEqual(body);
			mockreq.flush(null);
			patchPromise.then(() => {
				expect(related.field).toBe('patched');
			});
		});
	});
	describe('Builder', () => {
		let builder: SimpleBuilder;
		let toOneBuilder: ToOneBuilder;
		let toManyBuilder: ToManyBuilder;
		beforeEach(() => {
			builder = injector.get(SimpleBuilder);
			toOneBuilder = injector.get(ToOneBuilder);
			toManyBuilder = injector.get(ToManyBuilder);
		});
		it('sets the headers correctly', async () => {
			builder.fetch('hosts', {});
			const req = httpMock.expectOne('/hosts');
			const headers = req.request.headers;
			expect(headers.get('Content-Type')).toBe('application/vnd.api+json');
		});
	});
});
