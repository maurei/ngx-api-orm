/*tslint:disable:no-non-null-assertion*/
import { ResourceModule } from '../src/resource.module';
import { METAKEYS } from '../src/utils';
import {
	getModels,
	IHostModel,
	IOneToOneModel,
	IOneToManyModel,
	IManyToManyModel,
	oneToOneTemplate,
	oneToManyTemplate,
	manyToManyTemplate,
	TestCase,
	fullComplexCircularTemplate
} from './models';
import { RelationConfiguration } from '../src/relations/relation-configuration';
import { ToOneRelation } from '../src/relations/to-one';

describe('Circular relationships: X <-> Y', () => {
	describe('Metadata', () => {
		const { HostModel, OneToOneModel, OneToManyModel, ManyToManyModel } = getModels(TestCase.Circular);
		ResourceModule.processRelationships();
		it('One to one relations', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['oneToOneModel'];
			const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToOneModel)['host'];
			expect(hostConfig).toBeDefined();
			expect(relatedConfig).toBeDefined();
			expect(hostConfig.circular).toBe(relatedConfig);
			expect(relatedConfig.circular).toBeTruthy(hostConfig);
		});
		it('One to many relations', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['oneToManyModels'];
			const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToManyModel)['host'];
			expect(hostConfig).toBeDefined();
			expect(relatedConfig).toBeDefined();
			expect(hostConfig.circular).toBe(relatedConfig);
			expect(relatedConfig.circular).toBeTruthy(hostConfig);
		});
		it('Many to many relations', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['manyToManyModels'];
			const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, ManyToManyModel)['hosts'];
			expect(hostConfig).toBeDefined();
			expect(relatedConfig).toBeDefined();
			expect(hostConfig.circular).toBe(relatedConfig);
			expect(relatedConfig.circular).toBeTruthy(hostConfig);
		});
	});
	describe('Instantiation', () => {
		describe('One to one ', () => {
			const { HostModel, OneToOneModel } = getModels(TestCase.Circular);
			ResourceModule.processRelationships();
			let hostInstance: IHostModel;
			let oneToOneInstance: IOneToOneModel;
			beforeAll(() => {
				hostInstance = HostModel.factory(oneToOneTemplate);
				oneToOneInstance = OneToOneModel.collection()[0];
			});

			it('some sanity checks', () => {
				expect(hostInstance.oneToOneModel).toBeDefined();
				expect(oneToOneInstance.host).toBeDefined();
			});
			describe('half circular references', () => {
				it('X -> Y', () => {
					expect(hostInstance.oneToOneModel.instance).toBe(oneToOneInstance);
				});
				it('Y -> X', () => {
					expect(oneToOneInstance.host.instance).toBe(hostInstance);
				});
			});
			describe('full circular references', () => {
				it('X -> Y -> X', () => {
					expect(hostInstance.oneToOneModel.instance!.host.instance).toBe(hostInstance);
				});
				it('Y -> X -> Y', () => {
					expect(oneToOneInstance.host.instance!.oneToOneModel.instance).toBe(oneToOneInstance);
				});
			});
		});
		describe('One to many ', () => {
			const { HostModel, OneToManyModel } = getModels(TestCase.Circular);
			ResourceModule.processRelationships();
			let hostInstance: IHostModel;
			let oneToManyInstances: Array<IOneToManyModel>;
			beforeAll(() => {
				hostInstance = (HostModel.factory(oneToManyTemplate) as any) as IHostModel;
				oneToManyInstances = (OneToManyModel.collection() as any) as Array<IOneToManyModel>;
			});
			it('some sanity checks', () => {
				expect(hostInstance.oneToManyModels).toBeDefined();
				oneToManyInstances.forEach(otmi => {
					expect(otmi.host).toBeDefined();
				});
				expect(hostInstance.oneToManyModels.length).toBeGreaterThan(0);
				expect(hostInstance.oneToManyModels.length).toEqual(oneToManyInstances.length);
			});
			describe('half circular references', () => {
				it('X -> Y', () => {
					hostInstance.oneToManyModels.forEach(otmi => expect(oneToManyInstances.includes(otmi)).toBeTruthy());
				});
				it('Y -> X', () => {
					oneToManyInstances.forEach(otmi => expect(otmi.host.instance).toBe(hostInstance));
				});
			});
			describe('full circular references', () => {
				it('X -> Y -> X', () => {
					hostInstance.oneToManyModels.forEach(otmi => expect(otmi.host.instance).toBe(hostInstance));
				});
				it('Y -> X -> Y', () => {
					oneToManyInstances.forEach(otmi => {
						otmi.host.instance!.oneToManyModels.forEach(_otmi => expect(oneToManyInstances.includes(_otmi)).toBeTruthy());
					});
				});
			});
		});
		describe('Many to many ', () => {
			const { HostModel, ManyToManyModel } = getModels(TestCase.Circular);
			ResourceModule.processRelationships();
			let hostInstances: Array<IHostModel>;
			let manyToManyInstances: Array<IManyToManyModel>;
			beforeAll(() => {
				hostInstances = (HostModel.factory(manyToManyTemplate) as any) as Array<IHostModel>;
				manyToManyInstances = (ManyToManyModel.collection() as any) as Array<IManyToManyModel>;
			});
			it('some sanity checks', () => {
				hostInstances.forEach(his => {
					expect(his.oneToManyModels).toBeDefined();
				});
				manyToManyInstances.forEach(mtmi => {
					expect(mtmi.hosts).toBeDefined();
				});
				expect(hostInstances.length).toBe(2);
				expect(manyToManyInstances.length).toBe(6);
			});
			describe('half circular references', () => {
				it('X -> Y', () => {
					hostInstances.forEach(hi => {
						expect(hi.manyToManyModels).toBeDefined();
						const mtmiIds = hi.manyToManyModels.map(mtmi => mtmi.id).join('-');
						if (hi.id === 1) {
							expect(mtmiIds).toBe('40-41-42-43');
						} else {
							expect(mtmiIds).toBe('40-41-44-45');
						}
						hi.manyToManyModels.forEach(mtmi => {
							expect(manyToManyInstances.includes(mtmi)).toBeTruthy();
						});
					});
				});
				it('Y -> X', () => {
					manyToManyInstances.forEach(mtmi => {
						expect(mtmi.hosts).toBeDefined();
						if (mtmi.id === 40 || mtmi.id === 41) {
							expect(mtmi.hosts.length).toBe(2);
						} else {
							expect(mtmi.hosts.length).toBe(1);
						}
						mtmi.hosts.forEach(hi => {
							expect(hostInstances.includes(hi)).toBeTruthy();
						});
					});
				});
			});
			describe('full circular references', () => {
				it('X -> Y -> X', () => {
					hostInstances.forEach(hi => {
						hi.manyToManyModels.forEach(mtmi => {
							expect(mtmi.hosts.includes(hi)).toBeTruthy();
						});
					});
				});
				it('Y -> X -> Y', () => {
					manyToManyInstances.forEach(mtmi => {
						mtmi.hosts.forEach(hi => {
							expect(hi.manyToManyModels.includes(mtmi)).toBeTruthy();
						});
					});
				});
			});
		});
	});
});

describe('Complex circular relationships: X <-> ( Y <-> Z )', () => {
	describe('Metadata', () => {
		const { HostModel, OneToOneModel, OneToManyModel, ManyToManyModel } = getModels(TestCase.CircularComplex);
		ResourceModule.processRelationships();
		it('Total config count', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel);
			const oneToOneModelConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToOneModel);
			const oneToManyModelConfigs = Reflect.getMetadata(METAKEYS.RELATIONS, OneToManyModel);
			const manyToManyModelConfigs = Reflect.getMetadata(METAKEYS.RELATIONS, ManyToManyModel);
			expect(Reflect.ownKeys(hostConfig).length).toBe(3);
			expect(Reflect.ownKeys(oneToOneModelConfig).length).toBe(1);
			expect(Reflect.ownKeys(oneToManyModelConfigs).length).toBe(2);
			expect(Reflect.ownKeys(manyToManyModelConfigs).length).toBe(2);
		});
		it('Complex circular configs set correctly', () => {
			const oneToManyModelConfigs = Reflect.getMetadata(METAKEYS.RELATIONS, OneToManyModel);
			const manyToManyModelConfigs = Reflect.getMetadata(METAKEYS.RELATIONS, ManyToManyModel);

			const otmmc = Reflect.ownKeys(oneToManyModelConfigs).map(k => oneToManyModelConfigs[k]);
			const mtmmc = Reflect.ownKeys(manyToManyModelConfigs).map(k => manyToManyModelConfigs[k]);
			expect(otmmc[0].RelatedResource).toBe(HostModel);
			expect(mtmmc[0].RelatedResource).toBe(HostModel);

			expect(otmmc[1].RelatedResource).toBe(ManyToManyModel);
			expect(mtmmc[1].RelatedResource).toBe(OneToManyModel);
		});
	});
	describe('Instantiation', () => {
		describe('full complex circular relation', () => {
			const { HostModel, OneToOneModel, ManyToManyModel, OneToManyModel } = getModels(TestCase.CircularComplex);
			ResourceModule.processRelationships();
			let hostInstances: IHostModel[];
			let oneToManyInstance: IOneToManyModel;
			let manyToManyInstance: IManyToManyModel;
			beforeAll(() => {
				hostInstances = HostModel.factory(fullComplexCircularTemplate);
				oneToManyInstance = OneToManyModel.collection()[0];
				manyToManyInstance = ManyToManyModel.collection()[0];
			});

			it('some sanity checks', () => {
				const hostInstance = hostInstances[0];
				expect(hostInstance.oneToOneModel).toBeDefined();
				expect(oneToManyInstance.host).toBeDefined();
				expect(manyToManyInstance.hosts).toBeDefined();
				expect(manyToManyInstance.oneToManyModel).toBeDefined();
			});
			describe('deep references', () => {
				it('X -> Y -> Z', () => {
					const hostInstance = hostInstances[0];
					expect(hostInstance.oneToManyModels[0].manyToManyModels instanceof Array).toBeTruthy();
					expect(hostInstance.manyToManyModels[0].oneToManyModel instanceof ToOneRelation).toBeDefined();
					expect(hostInstance.manyToManyModels[0].oneToManyModel.instance).toBeNull();
				});
				it('X <- Y -> Z', () => {
					const hostInstance = hostInstances[0];
					expect(oneToManyInstance.host instanceof ToOneRelation).toBeTruthy();
					expect(oneToManyInstance.host.instance).toBeDefined();
					expect(oneToManyInstance.manyToManyModels instanceof Array).toBeTruthy();
				});
			});
			describe('complex circular relations with pre-existing instances', () => {
				it('stuff', () => {
					OneToManyModel.factory(oneToManyModel);
				});
				it('X <- Y -> Z', () => {
					const hostInstance = hostInstances[0];
					expect(oneToManyInstance.host instanceof ToOneRelation).toBeTruthy();
					expect(oneToManyInstance.host.instance).toBeDefined();
					expect(oneToManyInstance.manyToManyModels instanceof Array).toBeTruthy();
				});
			});
		});
	});
	describe('Instantiation with pre existing instances', () => {
		describe('full complex circular relation', () => {
			const { HostModel, OneToOneModel, ManyToManyModel, OneToManyModel } = getModels(TestCase.CircularComplex);
			ResourceModule.processRelationships();
			beforeEach(() => {
				OneToManyModel.factory(oneToManyModel);
			});
			describe('sanity check', () => {
				it('collection count', () => {
					expect(OneToManyModel.collection().length).toBe(1);
					expect(ManyToManyModel.collection().length).toBe(1);
				});
				it('OTM -> MTM', () => {
					expect(OneToManyModel.collection()[0].manyToManyModels[0]).toBe(ManyToManyModel.collection()[0]);
				});
				it('OTM -> MTM -> OTM', () => {
					expect(OneToManyModel.collection()[0].manyToManyModels[0].oneToManyModel.instance).toBe(OneToManyModel.collection()[0]);
				});
				it('MTM -> OTM', () => {
					expect(ManyToManyModel.collection()[0].oneToManyModel.instance).toBe(OneToManyModel.collection()[0]);
				});
				it('MTM -> OTM -> MTM', () => {
					expect(ManyToManyModel.collection()[0].oneToManyModel.instance!.manyToManyModels[0]).toBe(ManyToManyModel.collection()[0]);
				});
			});
			describe('instantiation', () => {
				it('collection count', () => {
					const hostInstance = HostModel.factory(host);
					const otmm = hostInstance.oneToManyModels[0];
					expect(otmm).toBe(OneToManyModel.collection()[0]);
					expect(otmm.manyToManyModels.length).toBe(1);
				});
			});
		});
	});
});

const oneToManyModel = {
	id: 30,
	field: 'one-to-many with id 30',
	host: null,
	manyToManyModels: [
		{
			id: 40,
			field: 'many-to-many with id 40',
			hosts: null
		}
	]
};

const host = {
	id: 1,
	field: 'some field',
	'another-field': 'mapped field',
	oneToManyModels: [
		{
			id: 30,
			field: 'one-to-many with id 30',
			manyToManyModels: null
		}
	],
	oneToOneModel: null,
	manyToManyModels: null
};
