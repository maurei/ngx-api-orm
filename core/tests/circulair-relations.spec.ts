import { Resource } from '../src/resource.core';
import { ResourceModule, ToOneRelation } from '../src/resource.module';
import { ResourceType } from '../src/utils';
import { Model, Field, ToOne, ToMany } from '../src/resource.decorators';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

function getModels() {
	@Model()
	class RelatedOne extends Resource {
		@Field()
		public id: number;
		@Field()
		public field: any;
		// @ToOne(Host)
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

		public notIncluded: any;
	}

	return {
		getHost: () => (Host as any) as ResourceType<Host>,
		getRelatedOne: () => (RelatedOne as any) as ResourceType<RelatedOne>
	};
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

fdescribe('Circular relationships', () => {
	fdescribe('ToOne', () => {
		it('relationship not populated', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const relatedCtor = ctors.getRelatedOne();
			const hostInstance = hostCtor.factory(notPopulated);
			expect(hostInstance.relatedInstance).toBeDefined();
		});
		it('relationship populated', () => {
			const ctors = getModels();
			const hostCtor = ctors.getHost();
			const relatedCtor = ctors.getRelatedOne();
			const hostInstance = hostCtor.factory(populated);
			const relatedInstance = relatedCtor.collection()[0];
			expect(hostInstance.relatedInstance).toBeDefined();
			expect(relatedInstance.host).toBeDefined();
			expect(relatedInstance.host.instance).toBe(hostInstance);
			expect(hostInstance.relatedInstance.instance).toBe(relatedInstance);
		});
	});
});
