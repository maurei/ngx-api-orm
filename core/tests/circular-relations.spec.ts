/*tslint:disable:no-non-null-assertion*/
import { Resource } from '../src/resource.core';
import { ResourceModule, ToOneRelation, ResourceRootModule, ToManyRelation } from '../src/resource.module';
import { ResourceType, METAKEYS } from '../src/utils';
import { Model, Field, ToOne, ToMany } from '../src/resource.decorators';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

fdescribe('Circular relationships', () => {
	describe('Metadata', () => {
		const { HostModel, OneToOne, OneToMany, ManyToMany } = getCircularModels();
		ResourceRootModule.processRelationships();
		it('One to one relations', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['relatedOneToOne'];
			const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToOne)['host'];
			expect(hostConfig).toBeDefined();
			expect(relatedConfig).toBeDefined();
			expect(hostConfig.circular).toBe(relatedConfig);
			expect(relatedConfig.circular).toBeTruthy(hostConfig);
		});
		it('One to many relations', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['relatedOneToManies'];
			const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, OneToMany)['host'];
			expect(hostConfig).toBeDefined();
			expect(relatedConfig).toBeDefined();
			expect(hostConfig.circular).toBe(relatedConfig);
			expect(relatedConfig.circular).toBeTruthy(hostConfig);
		});
		it('Many to many relations', () => {
			const hostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, HostModel)['relatedManyToManies'];
			const relatedConfig = Reflect.getMetadata(METAKEYS.RELATIONS, ManyToMany)['hosts'];
			expect(hostConfig).toBeDefined();
			expect(relatedConfig).toBeDefined();
			expect(hostConfig.circular).toBe(relatedConfig);
			expect(relatedConfig.circular).toBeTruthy(hostConfig);
		});
	});
	describe('Instantiation', () => {
		describe('One to one ', () => {
			const { HostModel, OneToOne } = getCircularModels();
			ResourceRootModule.processRelationships();
			let hostInstance: IHostModel;
			let oneToOneInstance: IOneToOne;
			beforeAll(() => {
				hostInstance = (HostModel.factory(oneToOneTemplate) as any) as IHostModel;
				oneToOneInstance = (OneToOne.collection()[0] as any) as IOneToOne;
			});

			it('some sanity checks', () => {
				expect(hostInstance.relatedOneToOne).toBeDefined();
				expect(oneToOneInstance.host).toBeDefined();
			});
			describe('half circular references', () => {
				it('X -> Y', () => {
					expect(hostInstance.relatedOneToOne.instance).toBe(oneToOneInstance);
				});
				it('Y -> X', () => {
					expect(oneToOneInstance.host.instance).toBe(hostInstance);
				});
			});
			describe('full circular references', () => {
				it('X -> Y -> X', () => {
					expect(hostInstance.relatedOneToOne.instance!.host.instance).toBe(hostInstance);
				});
				it('Y -> X -> Y', () => {
					expect(oneToOneInstance.host.instance!.relatedOneToOne.instance).toBe(oneToOneInstance);
				});
			});
		});
		describe('One to many ', () => {
			const { HostModel, OneToMany } = getCircularModels();
			ResourceRootModule.processRelationships();
			let hostInstance: IHostModel;
			let oneToManyInstances: Array<IOneToMany>;
			beforeAll(() => {
				hostInstance = (HostModel.factory(oneToManyTemplate) as any) as IHostModel;
				oneToManyInstances = (OneToMany.collection() as any) as Array<IOneToMany>;
			});
			it('some sanity checks', () => {
				expect(hostInstance.relatedOneToManies).toBeDefined();
				oneToManyInstances.forEach(otmi => {
					expect(otmi.host).toBeDefined();
				});
				expect(hostInstance.relatedOneToManies.length).toBeGreaterThan(0);
				expect(hostInstance.relatedOneToManies.length).toEqual(oneToManyInstances.length);
			});
			describe('half circular references', () => {
				it('X -> Y', () => {
					hostInstance.relatedOneToManies.forEach(otmi => expect(oneToManyInstances.includes(otmi)).toBeTruthy());
				});
				it('Y -> X', () => {
					oneToManyInstances.forEach(otmi => expect(otmi.host.instance).toBe(hostInstance));
				});
			});
			describe('full circular references', () => {
				it('X -> Y -> X', () => {
					hostInstance.relatedOneToManies.forEach(otmi => expect(otmi.host.instance).toBe(hostInstance));
				});
				it('Y -> X -> Y', () => {
					oneToManyInstances.forEach(otmi => {
						otmi.host.instance!.relatedOneToManies.forEach(_otmi => expect(oneToManyInstances.includes(_otmi)).toBeTruthy());
					});
				});
			});
		});
		describe('Many to many ', () => {
			const { HostModel, ManyToMany } = getCircularModels();
			ResourceRootModule.processRelationships();
			let hostInstances: Array<IHostModel>;
			let manyToManyInstances: Array<IManyToMany>;
			beforeAll(() => {
				hostInstances = (HostModel.factory(manyToManyTemplate) as any) as Array<IHostModel>;
				manyToManyInstances = (ManyToMany.collection() as any) as Array<IManyToMany>;
			});
			it('some sanity checks', () => {
				hostInstances.forEach(his => {
					expect(his.relatedOneToManies).toBeDefined();
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
						expect(hi.relatedManyToManies).toBeDefined();
						const mtmiIds = hi.relatedManyToManies.map(mtmi => mtmi.id).join('-');
						if (hi.id === 1) {
							expect(mtmiIds).toBe('40-41-42-43');
						} else {
							expect(mtmiIds).toBe('40-41-44-45');
						}
						hi.relatedManyToManies.forEach(mtmi => {
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
						hi.relatedManyToManies.forEach(mtmi => {
							expect(mtmi.hosts.includes(hi)).toBeTruthy();
						});
					});
				});
				it('Y -> X -> Y', () => {
					manyToManyInstances.forEach(mtmi => {
						mtmi.hosts.forEach(hi => {
							expect(hi.relatedManyToManies.includes(mtmi)).toBeTruthy();
						});
					});
				});
			});
		});
	});
});

function getCircularModels() {
	@Model()
	class ManyToMany extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToMany('host-model')
		public hosts: ToManyRelation<ManyToMany, HostModel>;
	}
	@Model()
	class OneToMany extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToOne('host-model')
		public host: ToOneRelation<OneToMany, HostModel>;
	}
	@Model()
	class OneToOne extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToOne('host-model')
		public host: ToOneRelation<OneToOne, HostModel>;
	}
	@Model()
	class HostModel extends Resource {
		@Field()
		public id: number;
		@Field('fullName')
		public name: any;
		@Field()
		public some: any;
		@Field()
		public field: any;
		@ToOne(OneToOne)
		public relatedOneToOne: ToOneRelation<HostModel, OneToOne>;
		@ToMany(OneToMany)
		public relatedOneToManies: ToManyRelation<HostModel, OneToMany>;
		@ToMany(ManyToMany)
		public relatedManyToManies: ToManyRelation<HostModel, ManyToMany>;
	}
	return { HostModel, OneToOne, OneToMany, ManyToMany };
}

interface IHostModel extends Resource {
	name: any;
	some: any;
	field: any;
	relatedOneToOne: ToOneRelation<IHostModel, IOneToOne>;
	relatedOneToManies: ToManyRelation<IHostModel, IOneToMany>;
	relatedManyToManies: ToManyRelation<IHostModel, IManyToMany>;
}

interface IOneToOne extends Resource {
	field: any;
	host: ToOneRelation<IOneToOne, IHostModel>;
}
interface IOneToMany extends Resource {
	field: any;
	host: ToOneRelation<IOneToMany, IHostModel>;
}
interface IManyToMany extends Resource {
	field: any;
	hosts: ToManyRelation<IManyToMany, IHostModel>;
}

const oneToOneTemplate = {
	id: 1,
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedOneToOne: {
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
	relatedOneToOne: null,
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
		relatedOneToOne: null,
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
		relatedOneToOne: null,
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
