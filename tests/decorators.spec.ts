import { ResourceModel, ResourceField, ResourceToMany, ResourceToOne } from '../src/resource/resource.decorators';
import { Resource } from '../src/resource/resource.core';
import { METAKEYS } from '../src/resource/utils';
import { RelationConfiguration } from '../src/resource/relations/relation-configuration';
import { RelationType } from '../src/resource/relations/relation-configuration';

function modelWithResourceDecorator(name?: string): typeof Resource {
	@ResourceModel(name ? { name: name } : undefined)
	class MyDummyResource {}
	return <any>MyDummyResource;
}

function modelWithFieldDecorators(): typeof Resource {
	class MyDummyResource {
		public myTestField0: any;
		@ResourceField('test-mapping-field')
		public myTestField1: any;
		@ResourceField()
		public myTestField2: any;
		@ResourceField()
		public myTestField3: any;
	}
	return <any>MyDummyResource;
}

function modelWithOneToManyDecorators(): typeof Resource {
	class Related {}
	class AnotherRelated {}
	class Host {
		@ResourceToMany(Related)
		public relatedInstance: any;
		@ResourceToMany(AnotherRelated, 'someKey')
		public anotherRelated: any;
	}
	return <any>Host;
}

function modelWithOneToOneDecorators(): typeof Resource {
	class Related {}
	class AnotherRelated {}
	class Host {
		@ResourceToOne(Related)
		public relatedInstance: any;
		@ResourceToOne(AnotherRelated, 'someKey')
		public anotherRelated: any;
	}
	return <any>Host;
}
describe('Decorators: metaproperties fields, relations, list, resourceName, requestBuilder', () => {
	describe('ResourceModel', () => {
		it('is defined', () => {
			expect(ResourceModel).toBeDefined();
			expect(ResourceModel().constructor.name).toBe('Function');
		});
		it('sets metadata correctly', () => {
			const ctor = modelWithResourceDecorator();
			const namedCtor = modelWithResourceDecorator('DifferentClassName');
			const anotherCtor = modelWithResourceDecorator('yet-another-different-class-name');
			expect(Reflect.getMetadata(METAKEYS.INSTANCES, ctor)).toBeDefined();
			expect(Reflect.getMetadata(METAKEYS.INSTANCES, namedCtor)).toBeDefined();
			expect(Reflect.getMetadata(METAKEYS.INSTANCES, anotherCtor)).toBeDefined();

			expect(Reflect.getMetadata(METAKEYS.INSTANCES, ctor).length).toBe(0);
			expect(Reflect.getMetadata(METAKEYS.INSTANCES, namedCtor).length).toBe(0);
			expect(Reflect.getMetadata(METAKEYS.INSTANCES, anotherCtor).length).toBe(0);

			expect(Reflect.getMetadata(METAKEYS.NAME, ctor)).toBe('my-dummy-resource');
			expect(Reflect.getMetadata(METAKEYS.NAME, namedCtor)).toBe('different-class-name');
			expect(Reflect.getMetadata(METAKEYS.NAME, anotherCtor)).toBe('yet-another-different-class-name');
		});
	});
	describe('ResourceField', () => {
		it('is defined', () => {
			expect(ResourceField).toBeDefined();
			expect(ResourceField().constructor.name).toBe('Function');
		});
		it('sets metadata correctly', () => {
			const ctor = modelWithFieldDecorators();
			expect(Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor)).toBeDefined();
			expect(Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor).length).toBe(3);
			expect(Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor)[0]).toBe('myTestField1');
			expect(Reflect.getMetadata(METAKEYS.MAP, ctor, 'myTestField1')).toBe('test-mapping-field');
			expect(Reflect.getMetadata(METAKEYS.MAP, ctor, 'myTestField2')).toBeUndefined();
		});
	});
	describe('ResourceToOne', () => {
		it('is defined', () => {
			expect(ResourceToOne).toBeDefined();
			expect(ResourceToOne({}).constructor.name).toBe('Function');
		});
		it('sets metadata correctly', () => {
			const host = modelWithOneToOneDecorators();
			const fields = Reflect.getMetadata(METAKEYS.FIELDS, host);
			expect(fields).toBeDefined();
			expect(fields.length).toBe(2);
			expect(fields[0]).toBe('relatedInstance');
			expect(fields[1]).toBe('anotherRelated');
			expect(Reflect.getMetadata(METAKEYS.MAP, host, 'anotherRelated')).toBe('someKey');
			expect(Reflect.getMetadata(METAKEYS.RELATIONS, host)).toBeDefined();
		});
		it('instantiates relationconfiguration correctly', () => {
			const host = modelWithOneToOneDecorators();
			const relations = Reflect.getMetadata(METAKEYS.RELATIONS, host);
			expect(relations).toBeDefined();
			const keys = Object.getOwnPropertyNames(relations);
			expect(keys.length).toBe(2);
			expect(keys[0]).toBe('relatedInstance');
			const config = relations['relatedInstance'];
			expect(config instanceof RelationConfiguration).toBe(true);
			expect(config.type).toBe(RelationType.ToOne);
		});
	});
	describe('ResourceToMany', () => {
		it('is defined', () => {
			expect(ResourceToMany).toBeDefined();
			expect(ResourceToMany({}).constructor.name).toBe('Function');
		});
		it('sets metadata correctly', () => {
			const host = modelWithOneToManyDecorators();
			const fields = Reflect.getMetadata(METAKEYS.FIELDS, host);
			expect(fields).toBeDefined();
			expect(fields.length).toBe(2);
			expect(fields[0]).toBe('relatedInstance');
			expect(fields[1]).toBe('anotherRelated');
			expect(Reflect.getMetadata(METAKEYS.MAP, host, 'anotherRelated')).toBe('someKey');
			expect(Reflect.getMetadata(METAKEYS.RELATIONS, host)).toBeDefined();
		});
		it('instantiates relationconfiguration correctly', () => {
			const host = modelWithOneToManyDecorators();
			const relations = Reflect.getMetadata(METAKEYS.RELATIONS, host);
			expect(relations).toBeDefined();
			const keys = Object.getOwnPropertyNames(relations);
			expect(keys.length).toBe(2);
			expect(keys[0]).toBe('relatedInstance');
			const config = relations['relatedInstance'];
			expect(config instanceof RelationConfiguration).toBe(true);
			expect(config.type).toBe(RelationType.ToMany);
		});
	});
});
