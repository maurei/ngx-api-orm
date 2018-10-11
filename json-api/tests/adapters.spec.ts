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
import { JsonApiAdapters } from '../src/adapters';
import { flatSingle, flatCollection, nestedSingle, nestedCollection } from './json-api-examples';
import { TestBed, getTestBed, async } from '@angular/core/testing';

import { JsonApiResource } from '../src/declarations';
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
			expect(JsonApiAdapters.Simple).toBeDefined();
			expect(JsonApiAdapters.ToOne).toBeDefined();
			expect(JsonApiAdapters.ToMany).toBeDefined();
			expect(simpleAdapter).toBeDefined();
			expect(toOneAdapter).toBeDefined();
			expect(toManyAdapter).toBeDefined();
			expect(simpleAdapter instanceof JsonApiAdapters.Simple).toBe(true);
			expect(toOneAdapter instanceof JsonApiAdapters.ToOne).toBe(true);
			expect(toManyAdapter instanceof JsonApiAdapters.ToMany).toBe(true);
		});
	});
	describe('Simple adapter', () => {
		let instances: any;
		let adapter: JsonApiAdapters.Simple;
		beforeAll(() => {
			instances = generateInstances();
			adapter = new JsonApiAdapters.Simple();
		});
		it('is defined', () => {
			expect(JsonApiAdapters.Simple).toBeDefined();
		});
		it('can save', () => {
			expect(adapter.save).toBeDefined();
			const data = adapter.save(instances.related);
			const resource = <JsonApiResource>data.data;
			expect(resource).toBeDefined();
			expect(resource.id).toBeUndefined();
			expect(resource.type).toBe('host');
			expect(resource.attributes!.some).toBeUndefined();
			expect(resource.attributes!.field).toBeUndefined();
		});
		it('can update', () => {
			expect(adapter.update).toBeDefined();
			const data = adapter.update(instances.relatedWithValues, { some: undefined });
			const resource = <JsonApiResource>data.data;
			expect(resource).toBeDefined();
			expect(resource.id).toBe('123');
			expect(resource.type).toBe('host');
			expect(resource.attributes!.some).toBe('stuff');
			expect(resource.attributes!.name).toBeUndefined();
			expect(resource.attributes!.fullName).toBeUndefined('more stuff');
			expect(resource.attributes!.field).toBeUndefined();
		});
		it('can parse a flat JsonApiResponse with a single item', () => {
			const parsed = adapter.parseIncoming(flatSingle);
			expect(parsed.length).toBe(1);
			expect(parsed[0].id).toBe('1');
			expect(parsed[0].title).toBe('JSON API paints my bikeshed!');
			expect(Object.getOwnPropertyNames(parsed[0]).length).toBe(2);
		});
		it('can parse a flat JsonApiResponse with a collection of items', () => {
			const parsed = adapter.parseIncoming(flatCollection);
			expect(parsed.length).toBe(2);
			expect(parsed[0].id).toBe('1');
			expect(parsed[1].id).toBe('2');
			expect(parsed[0].title).toBe('JSON API paints my bikeshed!');
			expect(parsed[1].title).toBe('JSON API paints my bikeshed: episode 2!');
			expect(Object.getOwnPropertyNames(parsed[0]).length).toBe(2);
			expect(Object.getOwnPropertyNames(parsed[1]).length).toBe(2);
		});
		it('can parse a nested JsonApiResponse with a single item', () => {
			const parsed = adapter.parseIncoming(nestedSingle);
			expect(parsed.length).toBe(1);
			expect(parsed[0].id).toBe('1');
			expect(parsed[0].title).toBe('JSON API paints my bikeshed!');
			expect(Object.getOwnPropertyNames(parsed[0]).length).toBe(4);
			expect(parsed[0].author.id).toBe('9');
			expect(parsed[0].author.firstName).toBe('Dan');
			expect(Object.getOwnPropertyNames(parsed[0].author).length).toBe(4);
			expect(parsed[0].comments.length).toBe(2);
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
		let adapter: JsonApiAdapters.ToOne;
		beforeAll(() => {
			instances = generateInstances();
			adapter = new JsonApiAdapters.ToOne();
		});
		it('is defined', () => {
			expect(JsonApiAdapters.ToOne).toBeDefined();
		});
		it('can add', () => {
			expect(adapter.add).toBeDefined();
			const rv = adapter.add(instances.toOneTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data.id).toBeDefined();
			expect(rv.data.type).toBeDefined();
			expect(rv.data.id).toBe(instances.toOneTargetWithValues.id.toString());
			const name = <string>Reflect.getMetadata(METAKEYS.NAME, instances.toOneTargetWithValues.constructor);
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
		let adapter: JsonApiAdapters.ToMany;
		beforeAll(() => {
			instances = generateInstances();
			adapter = new JsonApiAdapters.ToMany();
		});
		it('is defined', () => {
			expect(JsonApiAdapters.ToMany).toBeDefined();
		});
		it('can add', () => {
			expect(adapter.add).toBeDefined();
			const rv = adapter.add(instances.toManyTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data.id).toBeDefined();
			expect(rv.data.type).toBeDefined();
			expect(rv.data.id).toBe(instances.toManyTargetWithValues.id.toString());
			const name = <string>Reflect.getMetadata(METAKEYS.NAME, instances.toManyTargetWithValues.constructor);
			expect(rv.data.type).toBe(name);
		});
		it('can remove', () => {
			expect(adapter.remove).toBeDefined();
			const rv = adapter.remove(instances.toManyTargetWithValues, instances.related);
			expect(rv.data).toBeDefined();
			expect(rv.data.id).toBeDefined();
			expect(rv.data.type).toBeDefined();
			expect(rv.data.id).toBe(instances.toManyTargetWithValues.id.toString());
			const name = <string>Reflect.getMetadata(METAKEYS.NAME, instances.toManyTargetWithValues.constructor);
			expect(rv.data.type).toBe(name);
		});
	});
});
