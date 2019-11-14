/* tslint:disable: no-non-null-assertion */
import {
	AbstractAdapters as Abstract,
	Model,
	Field,
	ToMany,
	ToOne,
	ResourceType,
	METAKEYS,
	Resource,
	SimpleAdapter,
	ToOneAdapter,
	ToManyAdapter,
	ResourceModule
} from '@ngx-api-orm/core';

import { flatSingle, flatCollection, nestedSingle, nestedCollection } from './json-api-examples';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { JsonApiSimpleAdapter, JsonApiToOneAdapter, JsonApiToManyAdapter } from '../src/lib';
import { JsonApiResource } from '../src/lib/declarations';
import { JsonApi } from '../src/lib/providers';


function getModels() {
	@Model()
	class RelatedMany extends Resource {
		@Field()
		public id: number;
		@Field({mapFrom: 'test'})
		public experiment: any;
		@Field()
		public field: any;
	}

	@Model()
	class RelatedOne extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
	}

	@Model()
	class Host extends Resource {
		@Field()
		public id: number;
		@Field({mapFrom: 'fullName'})
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
	return {
		getHost: () => (Host as any) as ResourceType<Host>,
		getRelatedOne: () => (RelatedOne as any) as ResourceType<RelatedOne>,
		getRelatedMany: () => (RelatedMany as any) as ResourceType<RelatedMany>
	};
}

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

function generateInstances() {
	const ctors = getModels();
	const toOneTargetWithValues = new (ctors.getRelatedOne())();
	toOneTargetWithValues.id = 1337;
	toOneTargetWithValues.field = true;
	const toManyTargetWithValues = new (ctors.getRelatedMany())();
	toManyTargetWithValues.id = 2674;
	toManyTargetWithValues.field = false;
	toManyTargetWithValues.experiment = 'test';

	const relatedWithValues = new (ctors.getHost())();
	relatedWithValues.id = 123;
	relatedWithValues.some = 'stuff';
	relatedWithValues.name = 'more stuff';

	const related = new (ctors.getHost())();

	return {
		related: related,
		toOneTargetWithValues: toOneTargetWithValues,
		toManyTargetWithValues: toManyTargetWithValues,
		relatedWithValues: relatedWithValues
	};
}

describe('Request adapters', () => {
	let simpleAdapter: SimpleAdapter;
	let toOneAdapter: ToOneAdapter;
	let toManyAdapter: ToManyAdapter;
	let injector: TestBed;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ResourceModule.forRoot({ requestHandler: JsonApi })],
			declarations: [],
			providers: []
		}).compileComponents();
		injector = getTestBed();
		simpleAdapter = injector.get(SimpleAdapter);
		toOneAdapter = injector.get(ToOneAdapter);
		toManyAdapter = injector.get(ToManyAdapter);
	}));
	describe('Extendability', () => {
		it('has replaced default handler with JsonApi handler', () => {
			expect(JsonApiSimpleAdapter).toBeDefined();
			expect(JsonApiToOneAdapter).toBeDefined();
			expect(JsonApiToManyAdapter).toBeDefined();
			expect(simpleAdapter).toBeDefined();
			expect(toOneAdapter).toBeDefined();
			expect(toManyAdapter).toBeDefined();
			expect(simpleAdapter instanceof JsonApiSimpleAdapter).toBe(true);
			expect(toOneAdapter instanceof JsonApiToOneAdapter).toBe(true);
			expect(toManyAdapter instanceof JsonApiToManyAdapter).toBe(true);
		});
	});
	describe('Simple adapter', () => {
		let instances: any;
		let adapter: JsonApiSimpleAdapter;
		beforeAll(() => {
			instances = generateInstances();
			adapter = new JsonApiSimpleAdapter();
		});
		it('is defined', () => {
			expect(JsonApiSimpleAdapter).toBeDefined();
		});
		it('can save', () => {
			expect(adapter.save).toBeDefined();
			const data = adapter.save(instances.related);
			const resource = <JsonApiResource>data.data;
			expect(resource).toBeDefined();
			expect(resource.id).toBeUndefined();
			expect(resource.type).toBe('hosts');
			expect(resource.attributes!.some).toBeUndefined();
			expect(resource.attributes!.field).toBeUndefined();
		});
		it('can update', () => {
			expect(adapter.update).toBeDefined();
			const data = adapter.update(instances.relatedWithValues, { some: undefined });
			const resource = <JsonApiResource>data.data;
			expect(resource).toBeDefined();
			expect(resource.id).toBe('123');
			expect(resource.type).toBe('hosts');
			expect(resource.attributes!.some).toBe('stuff');
			expect(resource.attributes!.name).toBeUndefined();
			expect(resource.attributes!.fullName).toBeUndefined('more stuff');
			expect(resource.attributes!.field).toBeUndefined();
		});
		it('can parse a flat JsonApiResponse with a single item', () => {
			const parsed = adapter.parseIncoming(flatSingle);
			expect(parsed.id).toBe('1');
			expect(parsed.title).toBe('JSON API paints my bikeshed!');
			expect(Object.getOwnPropertyNames(parsed).length).toBe(4);
		});
		it('can parse a flat JsonApiResponse with a collection of items', () => {
			const parsed = adapter.parseIncoming(flatCollection);
			expect(parsed.length).toBe(2);
			expect(parsed[0].id).toBe('1');
			expect(parsed[1].id).toBe('2');
			expect(parsed[0].title).toBe('JSON API paints my bikeshed!');
			expect(parsed[1].title).toBe('JSON API paints my bikeshed: episode 2!');
			expect(Object.getOwnPropertyNames(parsed[0]).length).toBe(4);
			expect(Object.getOwnPropertyNames(parsed[1]).length).toBe(4);
		});
		it('can parse a nested JsonApiResponse with a single item', () => {
			const parsed = adapter.parseIncoming(nestedSingle);
			expect(parsed.id).toBe('1');
			expect(parsed.title).toBe('JSON API paints my bikeshed!');
			expect(Object.getOwnPropertyNames(parsed).length).toBe(4);
			expect(parsed.author.id).toBe('9');
			expect(parsed.author.firstName).toBe('Dan');
			expect(Object.getOwnPropertyNames(parsed.author).length).toBe(4);
			expect(parsed.comments.length).toBe(2);
		});
		it('can parse a nested JsonApiResponse with a collection of items (where some nested items are missing from include)', () => {
			const parsed = adapter.parseIncoming(nestedCollection);
			expect(parsed.length).toBe(2);
			expect(parsed[0].id).toBe('1');
			expect(parsed[1].id).toBe('2');
			expect(parsed[0].title).toBe('JSON API paints my bikeshed!');
			expect(parsed[1].title).toBe('JSON API paints my bikeshed: episode 2!');
			expect(parsed[0].author).not.toBeNull();
			expect(parsed[0].comments).not.toEqual([]);
			expect(Object.getOwnPropertyNames(parsed[0]).length).toBe(4);
			expect(parsed[1].author).toBeNull();
			expect(parsed[1].comments).toEqual([]);
			expect(Object.getOwnPropertyNames(parsed[1]).length).toBe(4);
		});
	});
	describe('To One adapter', () => {
		let instances: any;
		let adapter: JsonApiToOneAdapter;
		beforeAll(() => {
			instances = generateInstances();
			adapter = new JsonApiToOneAdapter();
		});
		it('is defined', () => {
			expect(JsonApiToOneAdapter).toBeDefined();
		});
		it('can add', () => {
			expect(adapter.add).toBeDefined();
			const rv = adapter.add(instances.toOneTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data.id).toBeDefined();
			expect(rv.data.type).toBeDefined();
			expect(rv.data.id).toBe(instances.toOneTargetWithValues.id.toString());
			const name = <string>Reflect.getMetadata(METAKEYS.PLURAL, instances.toOneTargetWithValues.constructor);
			expect(rv.data.type).toBe(name);
		});
		it('can remove', () => {
			expect(adapter.remove).toBeDefined();
			const rv = adapter.remove(instances.toOneTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data).toBeNull();
		});
	});
	describe('To Many adapter', () => {
		let instances: any;
		let adapter: JsonApiToManyAdapter;
		beforeAll(() => {
			instances = generateInstances();
			adapter = new JsonApiToManyAdapter();
		});
		it('is defined', () => {
			expect(JsonApiToManyAdapter).toBeDefined();
		});
		it('can add', () => {
			expect(adapter.add).toBeDefined();
			const rv = adapter.add(instances.toManyTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data.id).toBeDefined();
			expect(rv.data.type).toBeDefined();
			expect(rv.data.id).toBe(instances.toManyTargetWithValues.id.toString());
			const name = <string>Reflect.getMetadata(METAKEYS.PLURAL, instances.toManyTargetWithValues.constructor);
			expect(rv.data.type).toBe(name);
		});
		it('can remove', () => {
			expect(adapter.remove).toBeDefined();
			const rv = adapter.remove(instances.toManyTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data.id).toBeDefined();
			expect(rv.data.type).toBeDefined();
			expect(rv.data.id).toBe(instances.toManyTargetWithValues.id.toString());
			const name = <string>Reflect.getMetadata(METAKEYS.PLURAL, instances.toManyTargetWithValues.constructor);
			expect(rv.data.type).toBe(name);
		});
	});
});
