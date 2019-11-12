/*tslint:disable:no-shadowed-variable*/
import { Resource } from '../src/lib/resource.core';
import { ToOneRelation, ToManyRelation, ResourceType } from '../src/lib/resource.module';
import { Model, Field, ToOne, ToMany, OptionalToMany, OptionalToOne } from '../src/lib/resource.decorators';
import { ModelOptions } from '../src/lib/resource.decorators';

export enum TestCase {
	Circular,
	CircularComplex,
	Optional,
	Simple
}


export function getModels(testCase: TestCase) {
	if (testCase === TestCase.Optional) {
		@Model({camelCaseFullModelName: 'ManyToManyModel'})
		class TestManyToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@OptionalToMany('host-model')
			public hosts: ToManyRelation<TestManyToManyModel, TestHostModel>;
		}
		@Model({ camelCaseFullModelName: 'OneToManyModel' })
		class TestOneToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@OptionalToOne('host-model')
			public host: ToOneRelation<TestOneToManyModel, TestHostModel>;
		}
		@Model({camelCaseFullModelName: 'OneToOneModel'})
		class TestOneToOneModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@OptionalToOne('host-model')
			public host: ToOneRelation<TestOneToOneModel, TestHostModel>;
		}
		@Model({camelCaseFullModelName: 'HostModel'})
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
		const HostModel = (TestHostModel as any) as ResourceType<IHostModel>;
		const OneToOneModel = (TestOneToOneModel as any) as ResourceType<IOneToOneModel>;
		const OneToManyModel = (TestOneToManyModel as any) as ResourceType<IOneToManyModel>;
		const ManyToManyModel = (TestManyToManyModel as any) as ResourceType<IManyToManyModel>;
		return {
			HostModel,
			OneToOneModel,
			OneToManyModel,
			ManyToManyModel
		};
	} else if (testCase === TestCase.Circular) {
		@Model({ camelCaseFullModelName: 'ManyToManyModel' })
		class TestManyToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@ToMany('host-model')
			public hosts: ToManyRelation<TestManyToManyModel, TestHostModel>;
		}
		@Model({ camelCaseFullModelName: 'OneToManyModel' })
		class TestOneToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@ToOne('host-model')
			public host: ToOneRelation<TestOneToManyModel, TestHostModel>;
		}
		@Model({ camelCaseFullModelName: 'OneToOneModel' })
		class TestOneToOneModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@ToOne('host-model')
			public host: ToOneRelation<TestOneToOneModel, TestHostModel>;
		}
		@Model({ camelCaseFullModelName: 'HostModel' })
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
		const HostModel = (TestHostModel as any) as ResourceType<IHostModel>;
		const OneToOneModel = (TestOneToOneModel as any) as ResourceType<IOneToOneModel>;
		const OneToManyModel = (TestOneToManyModel as any) as ResourceType<IOneToManyModel>;
		const ManyToManyModel = (TestManyToManyModel as any) as ResourceType<IManyToManyModel>;
		return {
			HostModel,
			OneToOneModel,
			OneToManyModel,
			ManyToManyModel
		};
	} else if (testCase === TestCase.CircularComplex) {
		@Model({ camelCaseFullModelName: 'ManyToManyModel' })
		class TestManyToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@ToMany('host-model')
			public hosts: ToManyRelation<TestManyToManyModel, TestHostModel>;
			@ToOne('one-to-many-model')
			public oneToManyModel: ToOneRelation<TestManyToManyModel, TestOneToManyModel>;
		}
		@Model({ camelCaseFullModelName: 'OneToManyModel' })
		class TestOneToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@ToOne('host-model')
			public host: ToOneRelation<TestOneToManyModel, TestHostModel>;
			@ToMany(TestManyToManyModel)
			public manyToManyModels: ToManyRelation<TestOneToOneModel, TestManyToManyModel>;
		}
		@Model({ camelCaseFullModelName: 'OneToOneModel' })
		class TestOneToOneModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
			@ToOne('host-model')
			public host: ToOneRelation<TestOneToOneModel, TestHostModel>;
		}
		@Model({ camelCaseFullModelName: 'HostModel' })
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
		const HostModel = (TestHostModel as any) as ResourceType<IHostModel>;
		const OneToOneModel = (TestOneToOneModel as any) as ResourceType<IOneToOneModel>;
		const OneToManyModel = (TestOneToManyModel as any) as ResourceType<IOneToManyModel>;
		const ManyToManyModel = (TestManyToManyModel as any) as ResourceType<IManyToManyModel>;
		return {
			HostModel,
			OneToOneModel,
			OneToManyModel,
			ManyToManyModel
		};
	} else {
		@Model({camelCaseFullModelName: 'ManyToManyModel'})
		class TestManyToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
		}
		@Model({ camelCaseFullModelName: 'OneToManyModel' })
		class TestOneToManyModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
		}
		@Model({camelCaseFullModelName: 'OneToOneModel'})
		class TestOneToOneModel extends Resource {
			@Field()
			public id: number;
			@Field()
			public field: any;
		}
		@Model({camelCaseFullModelName: 'HostModel'})
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
		const HostModel = (TestHostModel as any) as ResourceType<IHostModel>;
		const OneToOneModel = (TestOneToOneModel as any) as ResourceType<IOneToOneModel>;
		const OneToManyModel = (TestOneToManyModel as any) as ResourceType<IOneToManyModel>;
		const ManyToManyModel = (TestManyToManyModel as any) as ResourceType<IManyToManyModel>;
		return {
			HostModel,
			OneToOneModel,
			OneToManyModel,
			ManyToManyModel
		};
	}
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
	manyToManyModels: ToManyRelation<IOneToManyModel, IManyToManyModel>;
}
export interface IManyToManyModel extends Resource {
	field: any;
	hosts: ToManyRelation<IManyToManyModel, IHostModel>;
	oneToManyModel: ToOneRelation<IManyToManyModel, IOneToManyModel>;
}

export const hostNoRelation = {
	id: 1,
	field: 'some field',
	'another-field': 'mapped field',
	oneToOneModel: null,
	oneToManyModels: [],
	manyToManyModels: [],
	notIncluded: 'content'
};
export const hostNoRelationNoId = {
	field: 'some field',
	'another-field': 'mapped field',
	oneToOneModel: null,
	oneToManyModels: [],
	manyToManyModels: []
};
export const hostNoRelationIncomplete = {
	id: 1,
	field: 'some field',
	oneToOneModel: null,
	oneToManyModels: null,
	manyToManyModels: null
};

export const fullComplexCircularTemplate = [{
	id: 1,
	field: 'name',
	'another-field': 'mapped field',
	oneToOneModel: {
		id: 20,
		field: 'one-to-one with id 20',
		host: null,
	},
	oneToManyModels: [{
		id: 30,
		field: 'one-to-many with id 30',
		host: null,
		manyToManyModels: null
	},
	{
		id: 31,
		field: 'one-to-many with id 31',
		host: null,
		manyToManyModels: null
	},
	{
		id: 32,
		field: 'one-to-many with id 32',
		host: null,
		manyToManyModels: null
	},
	{
		id: 33,
		field: 'one-to-many with id 33',
		host: null,
		manyToManyModels: null
	}
	],
	manyToManyModels: [
	{
		id: 40,
		field: 'many-to-many with id 40',
		hosts: null,
		oneToManyModel: null
	},
	{
		id: 41,
		field: 'many-to-many with id 41',
		hosts: null,
		oneToManyModel: null
	},
	{
		id: 42,
		field: 'many-to-many with id 42',
		hosts: null,
		oneToManyModel: null
	},
	{
		id: 43,
		field: 'many-to-many with id 43',
		hosts: null,
		oneToManyModel: null
	}
]
}, {
	id: 2,
	field: 'name',
	'another-field': 'mapped field',
	oneToOneModel: {
		id: 25,
		field: 'one-to-one with id 25',
		host: null,
	},
	oneToManyModels: [{
		id: 30,
		field: 'one-to-many with id 30',
		host: null,
		manyToManyModels: null
	},
	{
		id: 31,
		field: 'one-to-many with id 31',
		host: null,
		manyToManyModels: null
	},
	{
		id: 37,
		field: 'one-to-many with id 32',
		host: null,
		manyToManyModels: null
	},
	{
		id: 38,
		field: 'one-to-many with id 33',
		host: null,
		manyToManyModels: null
	}
	],
	manyToManyModels: [
	{
		id: 40,
		field: 'many-to-many with id 40',
		hosts: null,
		oneToManyModel: null
	},
	{
		id: 41,
		field: 'many-to-many with id 41',
		hosts: null,
		oneToManyModel: null
	},
	{
		id: 48,
		field: 'many-to-many with id 48',
		hosts: null,
		oneToManyModel: null
	},
	{
		id: 49,
		field: 'many-to-many with id 49',
		hosts: null,
		oneToManyModel: null
	}
]
}];







export const fullTemplateNoMTM = [{
	id: 1,
	field: 'name',
	'another-field': 'mapped field',
	oneToOneModel: {
		id: 20,
		field: 'one-to-one with id 20'
	},
	oneToManyModels: [{
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
	manyToManyModels: null
}, {
	id: 2,
	field: 'name',
	'another-field': 'mapped field',
	oneToOneModel: {
		id: 25,
		field: 'one-to-one with id 25'
	},
	oneToManyModels: [{
		id: 30,
		field: 'one-to-many with id 30'
	},
	{
		id: 31,
		field: 'one-to-many with id 31'
	},
	{
		id: 37,
		field: 'one-to-many with id 32'
	},
	{
		id: 38,
		field: 'one-to-many with id 33'
	}
	],
			manyToManyModels: [
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
}, {
	id: 1,
	field: 'name',
	'another-field': 'mapped field',
	oneToOneModel: {
		id: 25,
		field: 'one-to-one with id 25'
	},
	oneToManyModels: [{
		id: 30,
		field: 'one-to-many with id 30'
	},
	{
		id: 31,
		field: 'one-to-many with id 31'
	},
	{
		id: 37,
		field: 'one-to-many with id 37'
	},
	{
		id: 38,
		field: 'one-to-many with id 38'
	}
	],
	manyToManyModels: null
}];


export const oneToOneTemplate = {
	id: 1,
	field: 'some field',
	'another-field': 'mapped field',
	oneToOneModel: {
		id: 20,
		field: 'one-to-one with id 20'
	},
	oneToManyModels: null,
	manyToManyModels: null
};

export const oneToManyTemplate = {
	id: 1,
	field: 'name',
	'another-field': 'mapped field',
	oneToOneModel: null,
	oneToManyModels: [
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
	manyToManyModels: null
};

export const manyToManyTemplate = [
	{
		id: 1,
		field: 'name',
		'another-field': 'mapped field',
		oneToOneModel: null,
		oneToManyModels: null,
		manyToManyModels: [
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
		field: 'name',
		'another-field': 'mapped field',
		oneToOneModel: null,
		oneToManyModels: null,
		manyToManyModels: [
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
				field: 'many-to-many with id 44'
			},
			{
				id: 45,
				field: 'many-to-many with id 45'
			}
		]
	}
];
