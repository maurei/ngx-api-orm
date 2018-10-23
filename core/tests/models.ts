/*tslint:disable:no-shadowed-variable*/
import { Resource } from '../src/resource.core';
import { ToOneRelation, ToManyRelation, ResourceType } from '../src/resource.module';
import { Model, Field, ToOne, ToMany, OptionalToMany, OptionalToOne } from '../src/resource.decorators';

export function getModels() {
	@Model()
	class TestManyToManyModel extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@OptionalToMany('test-host-model')
		public hosts: ToManyRelation<TestManyToManyModel, TestHostModel>;
	}
	@Model()
	class TestOneToManyModel extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@OptionalToOne('test-host-model')
		public host: ToOneRelation<TestOneToManyModel, TestHostModel>;
	}
	@Model()
	class TestOneToOneModel extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToOne('test-h123ost-model')
		public host: ToOneRelation<TestOneToOneModel, TestHostModel>;
	}
	@Model()
	class TestHostModel extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@Field({ mapFrom: 'another-field' })
		public mappedField: any;

		@ToOne(TestOneToOneModel)
		public oneToOneModel: ToOneRelation<TestHostModel, TestOneToOneModel>;
		@ToMany(TestOneToManyModel)
		public oneToManyModels: ToManyRelation<TestHostModel, TestOneToManyModel>;
		@ToMany(TestManyToManyModel)
		public manyToManyModels: ToManyRelation<TestHostModel, TestManyToManyModel>;
	}
		const HostModel = TestHostModel as any as ResourceType<IHostModel>;
		const OneToOneModel = TestOneToOneModel as any as ResourceType<IOneToOneModel>;
		const OneToManyModel = TestOneToManyModel as any as ResourceType<IOneToManyModel>;
		const ManyToManyModel = TestManyToManyModel as any as ResourceType<IManyToManyModel>;
		return {
			HostModel,
			OneToOneModel,
			OneToManyModel,
			ManyToManyModel
	};
}

export interface IHostModel extends Resource {
	name: any;
	field: any;
	mappedField: any;
	oneToOneModel: ToOneRelation<IHostModel, IOneToOneModel>;
	oneToManyModels: ToManyRelation<IHostModel, IOneToManyModel>;
	manyToManyModels: ToManyRelation<IHostModel, IManyToManyModel>;
}
export interface IOneToOneModel extends Resource {
	field: any;
	host: ToOneRelation<IOneToOneModel, IHostModel>;
}
export interface IOneToManyModel extends Resource {
	field: any;
	host: ToOneRelation<IOneToManyModel, IHostModel>;
}
export interface IManyToManyModel extends Resource {
	field: any;
	hosts: ToManyRelation<IManyToManyModel, IHostModel>;
}
