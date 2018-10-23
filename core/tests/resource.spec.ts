import { ResourceType } from '../src/utils';
import {
	getModels,
	IHostModel,
	IOneToOneModel,
	TestCase,
	hostNoRelation,
	hostNoRelationNoId,
	hostNoRelationIncomplete,
	IOneToManyModel,
	fullTemplateNoMTM
} from './models';

describe('Resource class:', () => {
	describe('General things', () => {
		const { HostModel } = getModels(TestCase.Simple);
		it('Inheritance and decorators do their job', () => {
			expect(HostModel._instances).toBeDefined();
			expect(HostModel.collection()).toBeDefined();
			expect(HostModel.fetch).toBeDefined();
			expect(HostModel.factory).toBeDefined();
		});
		it('Instance collection is readonly', () => {
			expect(() => HostModel.collection().push({} as any)).toThrow();
			expect(() => HostModel.collection().pop()).toThrow();
			expect(() => HostModel.collection().unshift({} as any)).toThrow();
			expect(() => HostModel.collection().shift()).toThrow();
		});
	});

	describe('Constructor can/cannot instantiate from', () => {
		describe('complete template that has id:', () => {
			const { HostModel } = getModels(TestCase.Simple);
			const testTemplate = Object.assign({}, hostNoRelation);
			it('with basic usage', () => {
				const instance = new HostModel(testTemplate);
				expect(HostModel.collection().length).toBe(1);
				expect(instance.id).toBe(1);
				expect(instance.field).toBe('some field');
				expect(instance.mappedField).toBe('mapped field');
				expect(instance.oneToOneModel.instance).toBe(null);
				expect(instance.oneToManyModels.length).toEqual(0);
				expect(instance.manyToManyModels.length).toEqual(0);
			});
			it('with overlapping ids', () => {
				const prevInstance = HostModel.collection()[0];
				const instance = new HostModel(testTemplate);
				expect(prevInstance).toBe(instance);
				expect(HostModel.collection().length).toBe(1);
			});
			it('without overlapping ids', () => {
				testTemplate.id++;
				const instance = new HostModel(testTemplate);
				const prevInstance = HostModel.collection()[1];
				expect(HostModel.collection().length).toBe(2);
				expect(prevInstance).toEqual(instance);
			});
			it('without optional fields', () => {
				delete testTemplate.notIncluded;
				testTemplate.id++;
				const instance = new HostModel(testTemplate);
				expect(HostModel.collection().length).toBe(3);
				expect((instance as any).notIncluded).not.toBeDefined();
			});
		});
		describe('other types of templates', () => {
			let Model: ResourceType<IHostModel>;
			beforeEach(() => {
				const { HostModel } = getModels(TestCase.Simple);
				Model = HostModel;
			});
			it('complete template that has no id', () => {
				const instance = new Model(hostNoRelationNoId);
				expect(Model.collection().length).toBe(0);
				expect(instance.id).not.toBeDefined();
				expect(instance.field).toBe('some field');
				expect(instance.mappedField).toBe('mapped field');
				expect(instance.oneToOneModel.instance).toBe(null);
				expect(instance.oneToManyModels.length).toEqual(0);
				expect(instance.manyToManyModels.length).toEqual(0);
			});
			it('incomplete template', () => {
				expect(() => new Model(hostNoRelationIncomplete)).toThrowError();
			});
			it('no template at all', () => {
				const instance = new Model();
				expect(instance.hasOwnProperty('id')).toBeTruthy();
				expect(instance.hasOwnProperty('field')).toBeTruthy();
				expect(instance.hasOwnProperty('mappedField')).toBeTruthy();
				expect(instance.hasOwnProperty('oneToOneModel')).toBeTruthy();
				expect(instance.hasOwnProperty('oneToManyModels')).toBeTruthy();
				expect(instance.hasOwnProperty('manyToManyModels')).toBeTruthy();
				expect(instance.hasOwnProperty('_adapter')).toBeTruthy();
				expect(instance.hasOwnProperty('_builder')).toBeTruthy();
				expect(instance.hasOwnProperty('_toOneAdapter')).toBeTruthy();
				expect(instance.hasOwnProperty('_toOneBuilder')).toBeTruthy();
				expect(instance.hasOwnProperty('_toManyAdapter')).toBeTruthy();
				expect(instance.hasOwnProperty('_toManyBuilder')).toBeTruthy();
			});
		});
	});
	describe('Factory methods can instantiate from', () => {
		let Model: ResourceType<IHostModel>;
		let ToOneModel: ResourceType<IOneToOneModel>;
		let ToManyModel: ResourceType<IOneToManyModel>;
		beforeEach(() => {
			const { HostModel, OneToOneModel, OneToManyModel } = getModels(TestCase.Simple);
			Model = HostModel;
			ToOneModel = OneToOneModel;
			ToManyModel = OneToManyModel;
		});
		it('single objects', () => {
			const instance = Model.factory(hostNoRelation);
			const sameInstance = new Model(hostNoRelation);
			expect(instance).toBe(sameInstance);
		});
		it('list of objects', () => {
			const list = [hostNoRelation, Object.assign({}, hostNoRelation)];
			list[1].id++;
			Model.factory(list);
			expect(Model.collection().length).toBe(2);
		});
		it('list of nested resources', () => {
			const nestedInstances = Model.factory(fullTemplateNoMTM);
			expect(Model.collection().length).toBe(2);
			expect(ToOneModel.collection().length).toBe(2);
			expect(ToManyModel.collection().length).toBe(6);
		});
	});
});
