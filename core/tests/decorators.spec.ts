import { Model, Field, ToMany, ToOne } from '../src/resource.decorators';
import { Resource } from '../src/resource.core';
import { METAKEYS, getPluralAndSingularNames as getName } from '../src/utils';
import { RelationConfiguration } from '../src/relations/relation-configuration';
import { RelationType } from '../src/relations/relation-configuration';

function modelWithResourceDecorator(name?: string): typeof Resource {
	@Model(name ? { camelCaseFullModelName: name } : undefined)
	class MyDummyResource {}
	return <any>MyDummyResource;
}

function modelWithFieldDecorators(): typeof Resource {
	class MyDummyResource {
		public myTestField0: any;
		@Field({ mapFrom: 'test-mapping-field' })
		public myTestField1: any;
		@Field()
		public myTestField2: any;
		@Field()
		public myTestField3: any;
	}
	return <any>MyDummyResource;
}

function modelWithOneToManyDecorators(): typeof Resource {
	class Related {}
	class AnotherRelated {}
	class Host {
		@ToMany({ relatedResource: Related })
		public relatedInstance: any;
		@ToMany({ relatedResource: AnotherRelated, mapFrom: 'someKey' })
		public anotherRelated: any;
	}
	return <any>Host;
}

function modelWithOneToOneDecorators(): typeof Resource {
	class Related {}
	class AnotherRelated {}
	class Host {
		@ToOne({ relatedResource: Related })
		public relatedInstance: any;
		@ToOne({ relatedResource: AnotherRelated, mapFrom: 'someKey' })
		public anotherRelated: any;
	}
	return <any>Host;
}

describe('Decorators: metaproperties fields, relations, list, resourceName, requestBuilder', () => {
	describe('getPluralAndSingularNames', () => {
		it('is defined', () => {
			expect(getName).toBeDefined();
		});
		it('default usecase works', () => {
			const short = getName(undefined, undefined, undefined, 'Model');
			const long = getName(undefined, undefined, undefined, 'SomeLongModelName');
			const deviating = getName(undefined, undefined, undefined, 'SomeActivity');
			expect(short).toEqual({ singular: 'model', plural: 'models' });
			expect(long).toEqual({ singular: 'some-long-model-name', plural: 'some-long-model-names' });
			expect(deviating).toEqual({ singular: 'some-activity', plural: 'some-activities' });
		});
		it('default usecase with plural class name to throw ', () => {
			const a = () => getName(undefined, undefined, undefined, 'Models');
			const b = () => getName(undefined, undefined, undefined, 'SomeLongModelNames');
			expect(a).toThrowError();
			expect(b).toThrowError();
		});
		it('custom constructor name case works', () => {
			const short = getName(undefined, undefined, 'Model', 'xyz123');
			const long = getName(undefined, undefined, 'SomeLongModelName', 'xyz123');
			const deviating = getName(undefined, undefined, 'SomeActivity', 'xyz123');
			expect(short).toEqual({ singular: 'model', plural: 'models' });
			expect(long).toEqual({ singular: 'some-long-model-name', plural: 'some-long-model-names' });
			expect(deviating).toEqual({ singular: 'some-activity', plural: 'some-activities' });
		});
		it('custom constructor name that is not singular throws an error', () => {
			const a = () => getName(undefined, undefined, 'Models', 'NotImportant');
			const b = () => getName(undefined, undefined, 'Activities', 'NotImportant');
			expect(a).toThrow();
			expect(b).toThrow();
		});
		it('custom constructor name with custom singular and plural throws an error', () => {
			const a = () => getName('some-thing', undefined, 'Model', 'NotImportant');
			const b = () => getName('some-thing', 'some-things', 'Model', 'NotImportant');
			const c = () => getName(undefined, 'some-things', 'Model', 'NotImportant');
			expect(a).toThrowError();
			expect(b).toThrowError();
			expect(c).toThrowError();
		});
		it('custom singular and plural names', () => {
			const both = getName('some-weird-form', 'some-weird-formae', undefined, 'xyz123');
			const noSingular = () => getName(undefined, 'some-models', undefined, 'xyz123');
			const noPlural = () => getName(undefined, 'some-models', undefined, 'xyz123');
			expect(noSingular).toThrowError();
			expect(noPlural).toThrowError();
			expect(both).toEqual({ singular: 'some-weird-form', plural: 'some-weird-formae' });
		});
	});
	describe('Model', () => {
		it('is defined', () => {
			expect(Model).toBeDefined();
			expect(Model().constructor.name).toBe('Function');
		});
		describe('it sets metadata correctly', () => {
			describe('getPluralAndSingularNames spec', () => {
				it('is defined', () => {
					expect(getName).toBeDefined();
				});
				it('default usecase works', () => {
					const short = getName(undefined, undefined, undefined, 'Model');
					const long = getName(undefined, undefined, undefined, 'SomeLongModelName');
					const deviating = getName(undefined, undefined, undefined, 'SomeActivity');
					expect(short).toEqual({ singular: 'model', plural: 'models' });
					expect(long).toEqual({ singular: 'some-long-model-name', plural: 'some-long-model-names' });
					expect(deviating).toEqual({ singular: 'some-activity', plural: 'some-activities' });
				});
				it('default usecase with plural class name to throw ', () => {
					const a = () => getName(undefined, undefined, undefined, 'Models');
					const b = () => getName(undefined, undefined, undefined, 'SomeLongModelNames');
					expect(a).toThrowError();
					expect(b).toThrowError();
				});
				it('custom constructor name case works', () => {
					const short = getName(undefined, undefined, 'Model', 'xyz123');
					const long = getName(undefined, undefined, 'SomeLongModelName', 'xyz123');
					const deviating = getName(undefined, undefined, 'SomeActivity', 'xyz123');
					expect(short).toEqual({ singular: 'model', plural: 'models' });
					expect(long).toEqual({ singular: 'some-long-model-name', plural: 'some-long-model-names' });
					expect(deviating).toEqual({ singular: 'some-activity', plural: 'some-activities' });
				});
				it('custom constructor name that is not singular throws an error', () => {
					const a = () => getName(undefined, undefined, 'Models', 'NotImportant');
					const b = () => getName(undefined, undefined, 'Activities', 'NotImportant');
					expect(a).toThrow();
					expect(b).toThrow();
				});
				it('custom constructor name with custom singular and plural throws an error', () => {
					const a = () => getName('some-thing', undefined, 'Model', 'NotImportant');
					const b = () => getName('some-thing', 'some-things', 'Model', 'NotImportant');
					const c = () => getName(undefined, 'some-things', 'Model', 'NotImportant');
					expect(a).toThrowError();
					expect(b).toThrowError();
					expect(c).toThrowError();
				});
				it('custom singular and plural names', () => {
					const both = getName('some-weird-form', 'some-weird-formae', undefined, 'xyz123');
					const noSingular = () => getName(undefined, 'some-models', undefined, 'xyz123');
					const noPlural = () => getName(undefined, 'some-models', undefined, 'xyz123');
					expect(noSingular).toThrowError();
					expect(noPlural).toThrowError();
					expect(both).toEqual({ singular: 'some-weird-form', plural: 'some-weird-formae' });
				});
			});
			it('inside the model decorator', () => {
				const ctor = modelWithResourceDecorator();
				const namedCtor = modelWithResourceDecorator('DifferentClassName');
				const anotherCtor = modelWithResourceDecorator('yet-another-different-class-name');
				expect(Reflect.getMetadata(METAKEYS.INSTANCES, ctor)).toBeDefined();
				expect(Reflect.getMetadata(METAKEYS.INSTANCES, namedCtor)).toBeDefined();

				expect(Reflect.getMetadata(METAKEYS.INSTANCES, ctor).length).toBe(0);
				expect(Reflect.getMetadata(METAKEYS.INSTANCES, namedCtor).length).toBe(0);

				expect(Reflect.getMetadata(METAKEYS.SINGULAR, ctor)).toBe('my-dummy-resource');
				expect(Reflect.getMetadata(METAKEYS.PLURAL, ctor)).toBe('my-dummy-resources');
				expect(Reflect.getMetadata(METAKEYS.SINGULAR, namedCtor)).toBe('different-class-name');
				expect(Reflect.getMetadata(METAKEYS.PLURAL, namedCtor)).toBe('different-class-names');
			});
		});
	});
	describe('Field', () => {
		it('is defined', () => {
			expect(Field).toBeDefined();
			expect(Field().constructor.name).toBe('Function');
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
	describe('ToOne', () => {
		it('is defined', () => {
			expect(ToOne).toBeDefined();
			expect(ToOne({ relatedResource: new Function() }).constructor.name).toBe('Function');
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
	describe('ToMany', () => {
		it('is defined', () => {
			expect(ToMany).toBeDefined();
			expect(ToMany({ relatedResource: new Function() }).constructor.name).toBe('Function');
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
