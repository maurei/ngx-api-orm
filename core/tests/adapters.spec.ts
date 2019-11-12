/* tslint:disable: no-non-null-assertion */
import { Abstract } from '../src/lib/request-handlers/abstract-adapters';
import { ToManyAdapter, ToOneAdapter, SimpleAdapter } from '../src/lib/request-handlers/default-adapters';
// import { JsonApiAdapters } from '../src/resource/request-handlers/jsonapidotorg/adapters';
// import { flatSingle, flatCollection, nestedSingle, nestedCollection } from './json-api-examples';
// import { JsonApiResource } from '../src/resource/request-handlers/jsonapidotorg/declarations';
import { Model, Field, ToMany, ToOne } from '../src/lib/resource.decorators';
import { ResourceType, METAKEYS } from '../src/lib/utils';
import { Resource } from '../src/lib/resource.core';

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
		@ToOne({relatedResource: RelatedOne})
		public relatedInstance: any;
		@ToMany({relatedResource: RelatedMany})
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
	describe('Abstract adapters', () => {
		it('are defined', () => {
			expect(Abstract.SimpleAdapter).toBeDefined();
			expect(Abstract.ToOneAdapter).toBeDefined();
			expect(Abstract.ToManyAdapter).toBeDefined();
		});
	});
	describe('Default', () => {
		describe('Simple adapter', () => {
			let instances: any;
			let adapter: SimpleAdapter;
			beforeAll(() => {
				instances = generateInstances();
				adapter = new SimpleAdapter();
			});
			it('is defined', () => {
				expect(SimpleAdapter).toBeDefined();
			});
			it('can save', () => {
				expect(adapter.save).toBeDefined();
				const body = adapter['convertOutgoing'](instances.related);
				const rv = adapter.save(instances.related);
				expect(rv).toBeDefined();
				expect(rv).toEqual(body);
			});
			it('can update', () => {
				expect(adapter.update).toBeDefined();
				const rv = adapter.update(instances.related, {});
				const body = adapter['convertOutgoing'](instances.related);
				expect(rv).toBeDefined();
				expect(rv).toEqual(body);
			});
			it('can parse response', () => {
				const rawInstances = [{}, {}, {}];
				expect(adapter.parseIncoming).toBeDefined();
				const rv = adapter.parseIncoming(rawInstances);
				expect(rv).toBeDefined();
				expect(rv).toBe(rawInstances);
			});
			it('can convert outgoing', () => {
				const nestedInstances = getModels()
					.getHost()
					.factory(nestedTemplate);
				const converted = adapter['convertOutgoing'](nestedInstances[1]);
				expect(converted.field).toBe('last');
				expect(converted.fullName).toBe('first');
				expect(converted.id).toBe(2);
				expect(converted.relatedInstance).toEqual({ id: 20, field: 'content' });
				expect(converted.relatedInstances).toEqual([
					{ id: 50, field: 'to-many', test: 'more content' },
					{ id: 51, field: 'to-many', test: 'more content' }
				]);
			});
		});
		describe('To One adapter', () => {
			let instances: any;
			let adapter: ToOneAdapter;
			beforeAll(() => {
				instances = generateInstances();
				adapter = new ToOneAdapter();
			});
			it('is defined', () => {
				expect(ToOneAdapter).toBeDefined();
			});
			it('can add', () => {
				expect(adapter.add).toBeDefined();
				const rv = adapter.add(instances.toOneTargetWithValues, instances.related);
				expect(rv).toBeDefined();
				expect(rv).toEqual({ id: instances.toOneTargetWithValues.id });
			});
			it('can remove', () => {
				expect(adapter.remove).toBeDefined();
				const rv = adapter.remove(instances.toOneTargetWithValues, instances.related);
				expect(rv).toBeUndefined();
			});
		});
		describe('To Many adapter', () => {
			let instances: any;
			let adapter: ToManyAdapter;
			beforeAll(() => {
				instances = generateInstances();
				adapter = new ToManyAdapter();
			});
			it('is defined', () => {
				expect(ToManyAdapter).toBeDefined();
			});
			it('can add', () => {
				expect(adapter.add).toBeDefined();
				const rv = adapter.add(instances.toManyTargetWithValues, instances.relatedWithValues);
				expect(rv).toBeDefined();
				expect(rv).toEqual({ id: instances.toManyTargetWithValues.id });
			});
			it('can remove', () => {
				expect(adapter.remove).toBeDefined();
				const rv = adapter.remove(instances.toManyTargetWithValues, instances.relatedWithValues);
				expect(rv).toBeUndefined();
			});
		});
	});
});
