import { Resource } from '../src/resource/resource.core';
import { ToManyRelation } from 'src/resource/relations/to-many';
import { ToOneRelation } from 'src/resource/relations/to-one';
import { RelationConfiguration } from 'src/resource/relations/relation-configuration';
import { ResourceModel, ResourceField, ResourceToMany, ResourceToOne } from '../src/resource/resource.decorators';
import { ResourceType } from '../src/resource/utils';

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
const incompleteHost = {
	id: 1,
	name: 'first',
	some: 'middle',
	relatedInstance: null,
	relatedInstances: []
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
		relatedInstances: [{ id: 50, field: 'to-many', test: 'test content' }, {
			id: 52, field: 'to-many', test: 'test content' }],
		notIncluded: 'content'
	}
];

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

describe('Resource class:', () => {
	it('Inheritance and decorators do their job', () => {
		const ctors = getModels();
		const hostCtor = ctors.getHost();
		expect(hostCtor._instances).toBeDefined();
		expect(hostCtor.collection()).toBeDefined();
		expect(hostCtor.fetch).toBeDefined();
		expect(hostCtor.factory).toBeDefined();
	});
	it('Instance collection is readonly', () => {
		const ctors = getModels();
		const hostCtor = ctors.getHost();
		expect(() => hostCtor.collection().push({} as any)).toThrow();
		expect(() => hostCtor.collection().pop()).toThrow();
		expect(() => hostCtor.collection().unshift({} as any)).toThrow();
		expect(() => hostCtor.collection().shift()).toThrow();
	});
	describe('Constructor can/cannot instantiate from', () => {
		describe('complete template that has id:', () => {
			let ctors: any;
			let hostCtor: any;
			beforeAll( () => {
				ctors = getModels();
				hostCtor = ctors.getHost();
			});
			it('with basic usage', () => {
				const instance = new hostCtor(completeHostWithId);
				expect(hostCtor.collection().length).toBe(1);
				expect(instance.id).toBe(1);
				expect(instance.name).toBe('first');
				expect(instance.some).toBe('middle');
				expect(instance.field).toBe('last');
				expect(instance.relatedInstance.instance).toBe(null);
				expect(instance.relatedInstances.length).toEqual(0);
			});
			it('with overlapping ids', () => {
				const prevInstance = hostCtor.collection()[0];
				const instance = new hostCtor(completeHostWithId);
				expect(prevInstance).toBe(instance);
				expect(hostCtor.collection().length).toBe(1);
			});
			it('without overlapping ids', () => {
				completeHostWithId.id++;
				const instance = new hostCtor(completeHostWithId);
				const prevInstance = hostCtor.collection()[1];
				expect(hostCtor.collection().length).toBe(2);
				expect(prevInstance).toEqual(instance);
			});
			it('without optional fields', () => {
				delete completeHostWithId.notIncluded;
				completeHostWithId.id++;
				const instance = new hostCtor(completeHostWithId);
				expect(hostCtor.collection().length).toBe(3);
				expect(instance.notIncluded).not.toBeDefined();
			});
		});
		it('complete template that has no id', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const instance = new hostCtor(completeHostWithoutId);
			expect(hostCtor.collection().length).toBe(0);
			expect(instance.id).not.toBeDefined();
			expect(instance.name).toBe('first');
			expect(instance.some).toBe('middle');
			expect(instance.field).toBe('last');
			expect(instance.relatedInstance.instance).toBe(null);
			expect(instance.relatedInstances.length).toEqual(0);
		});
		it('incomplete template', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			expect(() => new hostCtor(incompleteHost)).toThrowError();
		});
		it('no template at all', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const instance = new hostCtor();
			expect(instance.hasOwnProperty('id')).toBeTruthy();
			expect(instance.hasOwnProperty('name')).toBeTruthy();
			expect(instance.hasOwnProperty('some')).toBeTruthy();
			expect(instance.hasOwnProperty('field')).toBeTruthy();
			expect(instance.hasOwnProperty('relatedInstance')).toBeTruthy();
			expect(instance.hasOwnProperty('relatedInstances')).toBeTruthy();
			expect(instance.hasOwnProperty('_adapter')).toBeTruthy();
			expect(instance.hasOwnProperty('_builder')).toBeTruthy();
			expect(instance.hasOwnProperty('_toOneAdapter')).toBeTruthy();
			expect(instance.hasOwnProperty('_toOneBuilder')).toBeTruthy();
			expect(instance.hasOwnProperty('_toManyAdapter')).toBeTruthy();
			expect(instance.hasOwnProperty('_toManyBuilder')).toBeTruthy();
		});
	});
	describe('Factory methods can instantiate from', () => {
		it('single objects', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const instance = hostCtor.factory(completeHostWithId);
			const sameInstance = new hostCtor(completeHostWithId);
			expect(instance).toBe(sameInstance);
		});
		it('list of objects', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const list = [completeHostWithId, Object.assign({}, completeHostWithId)];
			list[1].id++;
			hostCtor.factory(list);
			expect(hostCtor.collection().length).toBe(2);
		});
		it('list of nested resources', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const toOneCtor = ctors.getRelatedOne();
			const toManyCtor = ctors.getRelatedMany();
			const nestedInstances = hostCtor.factory(nestedTemplate);
			expect(hostCtor.collection().length).toBe(3);
			expect(toOneCtor.collection().length).toBe(1);
			expect(toManyCtor.collection().length).toBe(3);
		});
	});
});
