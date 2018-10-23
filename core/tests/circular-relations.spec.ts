/*tslint:disable:no-non-null-assertion*/
import { ResourceRootModule} from '../src/resource.module';
import { METAKEYS } from '../src/utils';
import { getModels, IHostModel, IOneToOneModel, IOneToManyModel, IManyToManyModel, oneToOneTemplate, oneToManyTemplate, manyToManyTemplate, TestCase } from './models';

describe('Circular relationships', () => {
	describe('Metadata', () => {
		const { HostModel, OneToOneModel, OneToManyModel, ManyToManyModel } = getModels(TestCase.Circular);
		ResourceRootModule.processRelationships();
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
			ResourceRootModule.processRelationships();
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
			ResourceRootModule.processRelationships();
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
			ResourceRootModule.processRelationships();
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

