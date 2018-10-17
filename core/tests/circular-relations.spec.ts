import { Resource } from '../src/resource.core';
import { ResourceModule, ToOneRelation, ResourceRootModule, ToManyRelation } from '../src/resource.module';
import { ResourceType, METAKEYS } from '../src/utils';
import { Model, Field, ToOne, ToMany } from '../src/resource.decorators';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

function getModels() {
	@Model()
	class RelatedMany extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToMany('host')
		public hosts: ToManyRelation<RelatedMany, Host>;
	}
	@Model()
	class RelatedOne extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		@ToOne('host')
		public host: ToOneRelation<RelatedOne, Host>;
	}
	@Model()
	class Host extends Resource {
		@Field()
		public id: number;
		@Field('fullName')
		public name: any;
		@Field()
		public some: any;
		@Field()
		public field: any;
		@ToOne(RelatedOne)
		public relatedInstance: ToOneRelation<Host, RelatedOne>;
		@ToMany(RelatedMany)
		public relatedManies: ToManyRelation<Host, RelatedMany>;

		public notIncluded: any;
	}
	return { Host, RelatedOne, RelatedMany };
}

const notPopulated = {
	id: 1,
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedInstance: null
};

const populated = {
	id: 1,
	name: 'first',
	some: 'middle',
	field: 'last',
	relatedInstance: {
		id: 20,
		test: 'more content',
		field: 'content'
	}
};

const both = [notPopulated, populated];

describe('Circular relationships', () => {
	describe('Metadata', () => {
		fit('To one relations', () => {
			const { Host, RelatedOne } = getModels();
			ResourceRootModule.processRelationships();
			const hostToOneConfig = Reflect.getMetadata(METAKEYS.RELATIONS, Host)['relatedInstance'];
			const oneToHostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, RelatedOne)['host'];

			expect(hostToOneConfig).toBeDefined();
			expect(oneToHostConfig).toBeDefined();
			expect(hostToOneConfig.circular).toBeTruthy();
			expect(oneToHostConfig.circular).toBeTruthy();
		});
		fit('To one relations', () => {
			const { Host, RelatedOne, RelatedMany } = getModels();
			ResourceRootModule.processRelationships();
			const hostToManyConfig = Reflect.getMetadata(METAKEYS.RELATIONS, Host)['relatedManies'];
			const manyToHostConfig = Reflect.getMetadata(METAKEYS.RELATIONS, RelatedOne)['host'];

			expect(hostToManyConfig).toBeDefined();
			expect(manyToHostConfig).toBeDefined();
			expect(hostToManyConfig.circular).toBeTruthy();
			expect(manyToHostConfig.circular).toBeTruthy();
		});
	});
});
