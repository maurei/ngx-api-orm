import { Resource } from '../src/resource/resource.core';
import { ResourceModule } from '../src/resource/resource.module';
import { ResourceType } from '../src/resource/utils';
import { ResourceModel, ResourceField, ResourceToOne, ResourceToMany } from '../src/resource/resource.decorators';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonApiResponse } from '../src/resource/request-handlers/jsonapidotorg/declarations';
import { JsonApiDotOrg } from '../src/resource/request-handlers/jsonapidotorg/providers';

function getModels() {
	@ResourceModel()
	class RelatedMany extends Resource {
		@ResourceField()
		public id: number;
		@ResourceField('test')
		public experiment: any;
		@ResourceField()
		public field: any;
	}

	@ResourceModel()
	class RelatedOne extends Resource {
		@ResourceField()
		public id: number;
		@ResourceField()
		public field: any;
	}

	@ResourceModel()
	class Host extends Resource {
		@ResourceField()
		public id: number;
		@ResourceField('fullName')
		public name: any;
		@ResourceField()
		public some: any;
		@ResourceField()
		public field: any;
		@ResourceToOne(RelatedOne)
		public relatedInstance: any;
		@ResourceToMany(RelatedMany)
		public relatedInstances: any;

		public notIncluded: any;
	}
	return {
		getHost: () => (Host as any) as ResourceType<Host>,
		getRelatedOne: () => (RelatedOne as any) as ResourceType<RelatedOne>,
		getRelatedMany: () => (RelatedMany as any) as ResourceType<RelatedMany>
	};
}

const toOneNoId = {
	field: 'content'
};
const toOnePostResponse: JsonApiResponse = {
	data: {
		type: 'related-one',
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
			type: 'host',
			id: '1',
			attributes: {
				name: 'JSON API paints my bikeshed!',
				some: 'I dont like paint',
				fullName: 'I prefer blue',
				field: 'Red bikeshes are the bomb'
			},
			relationships: {
				relatedInstance: {
					data: { type: 'related-one', id: '20' }
				},
				relatedInstances: {
					data: [{ type: 'related-many', id: '30' }, { type: 'related-many', id: '31' }, { type: 'related-many', id: '32' }]
				}
			},
			links: {
				self: 'http://example.com/hosts/1'
			}
		},
		{
			type: 'host',
			id: '2',
			attributes: {
				name: 'JSON API paints my bikeshed!',
				some: 'I dont like paint',
				fullName: 'I prefer blue',
				field: 'Red bikeshes are the bomb'
			},
			relationships: {
				relatedInstance: {
					data: { type: 'related-one', id: '21' }
				},
				relatedInstances: {
					data: [{ type: 'related-many', id: '30' }, { type: 'related-many', id: '29' }]
				}
			},
			links: {
				self: 'http://example.com/hosts/2'
			}
		}
	],
	included: [
		{
			type: 'related-one',
			id: '20',
			attributes: {
				field: 'Dan'
			},
			links: {
				self: 'http://example.com/related-ones/20'
			}
		},
		{
			type: 'related-one',
			id: '21',
			attributes: {
				field: 'Bikeshed'
			},
			links: {
				self: 'http://example.com/related-ones/21'
			}
		},
		{
			type: 'related-many',
			id: '29',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manys/29'
			}
		},
		{
			type: 'related-many',
			id: '30',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manys/30'
			}
		},
		{
			type: 'related-many',
			id: '31',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manys/31'
			}
		},
		{
			type: 'related-many',
			id: '32',
			attributes: {
				test: 'I like XML better',
				field: 'Nah, prefer JSON API'
			},
			links: {
				self: 'http://example.com/related-manys/32'
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
	field: 'to-one content'
};
const toManyWithId = {
	id: 52,
	field: 'to-many',
	experiment: 'test content'
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
			imports: [ResourceModule.forRoot({ requestHandlersProviders: JsonApiDotOrg }), HttpClientTestingModule],
			declarations: [],
			providers: []
		}).compileComponents();
		injector = getTestBed();
		httpMock = injector.get(HttpTestingController);
	}));
	describe('save pipeline:', () => {
		beforeEach(() => {
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
			const mockreq = httpMock.expectOne('/hosts/1/relationships/related-manys');
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
			const mockreq = httpMock.expectOne(`/hosts/2/relationships/related-manys`);
			expect(mockreq.request.method).toBe('DELETE');
			expect(mockreq.request.body).toEqual({ data: { id: target.id.toString(), type: 'related-many' } });
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
		it('patching a nested resource', async () => {
			hostCtor.factory(nestedTemplate);
			const related = hostCtor.collection()[0].relatedInstance.instance;
			related.field = 'patched';
			const putPromise = related.update();
			const mockreq = httpMock.expectOne(`/related-ones/${related.id}`);
			expect(mockreq.request.method).toBe('PATCH');

			const body = {
				data: {
					id: related.id.toString(),
					type: 'related-one',
					attributes: { field: 'patched' }
				}
			};
			expect(mockreq.request.body).toEqual(body);
			mockreq.flush(null);
			putPromise.then(() => {
				expect(related.field).toBe('patched');
			});
		});
	});
});
