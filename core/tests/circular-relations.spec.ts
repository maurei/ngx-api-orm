/*tslint:disable:no-non-null-assertion*/
import { Resource } from '../src/resource.core';
import { ResourceModule, ToOneRelation, ResourceRootModule, ToManyRelation } from '../src/resource.module';
import { ResourceType, METAKEYS } from '../src/utils';
import { Model, Field, ToOne, ToMany } from '../src/resource.decorators';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { getModels, IHostModel, IOneToOneModel, IOneToManyModel, IManyToManyModel } from './models';

fdescribe('Circular relationships', () => {
	describe('Metadata', () => {
		const { HostModel, OneToOneModel, OneToManyModel, ManyToManyModel } = getModels();
		console.log('break here');
		ResourceRootModule.processRelationships();
		// it('One to one relations', () => {
		// 	const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['oneToOneModel'];
		// 	const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToOneModel)['host'];
		// 	expect(hostConfig).toBeDefined();
		// 	expect(relatedConfig).toBeDefined();
		// 	expect(hostConfig.circular).toBe(relatedConfig);
		// 	expect(relatedConfig.circular).toBeTruthy(hostConfig);
		// });
		// it('One to many relations', () => {
		// 	const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['oneToManyModels'];
		// 	const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToManyModel)['host'];
		// 	expect(hostConfig).toBeDefined();
		// 	expect(relatedConfig).toBeDefined();
		// 	expect(hostConfig.circular).toBe(relatedConfig);
		// 	expect(relatedConfig.circular).toBeTruthy(hostConfig);
		// });
		// it('Many to many relations', () => {
		// 	const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['ManyToManyModels'];
		// 	const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, ManyToManyModel)['hosts'];
		// 	expect(hostConfig).toBeDefined();
		// 	expect(relatedConfig).toBeDefined();
		// 	expect(hostConfig.circular).toBe(relatedConfig);
		// 	expect(relatedConfig.circular).toBeTruthy(hostConfig);
		// });
	});
	// describe('Instantiation', () => {
	// 	describe('One to one ', () => {
	// 		const { HostModel, OneToOneModel } = getModels();
	// 		ResourceRootModule.processRelationships();
	// 		let hostInstance: IHostModel;
	// 		let oneToOneInstance: IOneToOneModel;
	// 		beforeAll(() => {
	// 			hostInstance = (HostModel.factory(oneToOneTemplate) as any) as IHostModel;
	// 			oneToOneInstance = (OneToOneModel.collection()[0] as any) as IOneToOneModel;
	// 		});

	// 		it('some sanity checks', () => {
	// 			expect(hostInstance.oneToOneModel).toBeDefined();
	// 			expect(oneToOneInstance.host).toBeDefined();
	// 		});
	// 		describe('half circular references', () => {
	// 			it('X -> Y', () => {
	// 				expect(hostInstance.oneToOneModel.instance).toBe(oneToOneInstance);
	// 			});
	// 			it('Y -> X', () => {
	// 				expect(oneToOneInstance.host.instance).toBe(hostInstance);
	// 			});
	// 		});
	// 		describe('full circular references', () => {
	// 			it('X -> Y -> X', () => {
	// 				expect(hostInstance.oneToOneModel.instance!.host.instance).toBe(hostInstance);
	// 			});
	// 			it('Y -> X -> Y', () => {
	// 				expect(oneToOneInstance.host.instance!.oneToOneModel.instance).toBe(oneToOneInstance);
	// 			});
	// 		});
	// 	});
	// 	describe('One to many ', () => {
	// 		const { HostModel, OneToManyModel } = getModels();
	// 		ResourceRootModule.processRelationships();
	// 		let hostInstance: IHostModel;
	// 		let oneToManyInstances: Array<IOneToManyModel>;
	// 		beforeAll(() => {
	// 			hostInstance = (HostModel.factory(oneToManyTemplate) as any) as IHostModel;
	// 			oneToManyInstances = (OneToManyModel.collection() as any) as Array<IOneToManyModel>;
	// 		});
	// 		it('some sanity checks', () => {
	// 			expect(hostInstance.oneToManyModels).toBeDefined();
	// 			oneToManyInstances.forEach(otmi => {
	// 				expect(otmi.host).toBeDefined();
	// 			});
	// 			expect(hostInstance.oneToManyModels.length).toBeGreaterThan(0);
	// 			expect(hostInstance.oneToManyModels.length).toEqual(oneToManyInstances.length);
	// 		});
	// 		describe('half circular references', () => {
	// 			it('X -> Y', () => {
	// 				hostInstance.oneToManyModels.forEach(otmi => expect(oneToManyInstances.includes(otmi)).toBeTruthy());
	// 			});
	// 			it('Y -> X', () => {
	// 				oneToManyInstances.forEach(otmi => expect(otmi.host.instance).toBe(hostInstance));
	// 			});
	// 		});
	// 		describe('full circular references', () => {
	// 			it('X -> Y -> X', () => {
	// 				hostInstance.oneToManyModels.forEach(otmi => expect(otmi.host.instance).toBe(hostInstance));
	// 			});
	// 			it('Y -> X -> Y', () => {
	// 				oneToManyInstances.forEach(otmi => {
	// 					otmi.host.instance!.oneToManyModels.forEach(_otmi => expect(oneToManyInstances.includes(_otmi)).toBeTruthy());
	// 				});
	// 			});
	// 		});
	// 	});
	// 	describe('Many to many ', () => {
	// 		const { HostModel, ManyToManyModel } = getModels();
	// 		ResourceRootModule.processRelationships();
	// 		let hostInstances: Array<IHostModel>;
	// 		let manyToManyInstances: Array<IManyToManyModel>;
	// 		beforeAll(() => {
	// 			hostInstances = (HostModel.factory(manyToManyTemplate) as any) as Array<IHostModel>;
	// 			manyToManyInstances = (ManyToManyModel.collection() as any) as Array<IManyToManyModel>;
	// 		});
	// 		it('some sanity checks', () => {
	// 			hostInstances.forEach(his => {
	// 				expect(his.oneToManyModels).toBeDefined();
	// 			});
	// 			manyToManyInstances.forEach(mtmi => {
	// 				expect(mtmi.hosts).toBeDefined();
	// 			});
	// 			expect(hostInstances.length).toBe(2);
	// 			expect(manyToManyInstances.length).toBe(6);
	// 		});
	// 		describe('half circular references', () => {
	// 			it('X -> Y', () => {
	// 				hostInstances.forEach(hi => {
	// 					expect(hi.manyToManyModels).toBeDefined();
	// 					const mtmiIds = hi.manyToManyModels.map(mtmi => mtmi.id).join('-');
	// 					if (hi.id === 1) {
	// 						expect(mtmiIds).toBe('40-41-42-43');
	// 					} else {
	// 						expect(mtmiIds).toBe('40-41-44-45');
	// 					}
	// 					hi.manyToManyModels.forEach(mtmi => {
	// 						expect(manyToManyInstances.includes(mtmi)).toBeTruthy();
	// 					});
	// 				});
	// 			});
	// 			it('Y -> X', () => {
	// 				manyToManyInstances.forEach(mtmi => {
	// 					expect(mtmi.hosts).toBeDefined();
	// 					if (mtmi.id === 40 || mtmi.id === 41) {
	// 						expect(mtmi.hosts.length).toBe(2);
	// 					} else {
	// 						expect(mtmi.hosts.length).toBe(1);
	// 					}
	// 					mtmi.hosts.forEach(hi => {
	// 						expect(hostInstances.includes(hi)).toBeTruthy();
	// 					});
	// 				});
	// 			});
	// 		});
	// 		describe('full circular references', () => {
	// 			it('X -> Y -> X', () => {
	// 				hostInstances.forEach(hi => {
	// 					hi.manyToManyModels.forEach(mtmi => {
	// 						expect(mtmi.hosts.includes(hi)).toBeTruthy();
	// 					});
	// 				});
	// 			});
	// 			it('Y -> X -> Y', () => {
	// 				manyToManyInstances.forEach(mtmi => {
	// 					mtmi.hosts.forEach(hi => {
	// 						expect(hi.manyToManyModels.includes(mtmi)).toBeTruthy();
	// 					});
	// 				});
	// 			});
	// 		});
	// 	});
	// });
});

const oneToOneTemplate = {
	id: 1,
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedOneToOneModel: {
		id: 20,
		field: 'one-to-one with id 20'
	},
	relatedOneToManies: null,
	relatedManyToManies: null
};

const oneToManyTemplate = {
	id: 1,
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedOneToOneModel: null,
	relatedOneToManies: [
		{
			id: 30,
			field: 'one-to-many with id 30'
		},
		{
			id: 31,
			field: 'one-to-many with id 31'
		},
		{
			id: 32,
			field: 'one-to-many with id 32'
		},
		{
			id: 33,
			field: 'one-to-many with id 33'
		}
	],
	relatedManyToManies: null
};

const manyToManyTemplate = [
	{
		id: 1,
		name: 'first',
		some: 'middle',
		field: 'last',
		relatedOneToOneModel: null,
		relatedOneToManies: null,
		relatedManyToManies: [
			{
				id: 40,
				field: 'many-to-many with id 40'
			},
			{
				id: 41,
				field: 'many-to-many with id 41'
			},
			{
				id: 42,
				field: 'many-to-many with id 42'
			},
			{
				id: 43,
				field: 'many-to-many with id 43'
			}
		]
	},
	{
		id: 2,
		name: 'another first',
		some: 'another middle',
		field: 'another last',
		relatedOneToOneModel: null,
		relatedOneToManies: null,
		relatedManyToManies: [
			{
				id: 40,
				field: 'many-to-many with id 40'
			},
			{
				id: 41,
				field: 'many-to-many with id 41'
			},
			{
				id: 44,
				field: 'many-to-many with id 42'
			},
			{
				id: 45,
				field: 'many-to-many with id 43'
			}
		]
	}
];
