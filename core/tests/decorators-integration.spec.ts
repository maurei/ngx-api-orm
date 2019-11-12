import { Model, Field, ToMany, ToOne } from '../src/lib/resource.decorators';
import { Resource } from '../src/lib/resource.core';
import { METAKEYS } from '../src/lib/utils';
import { ResourceModule } from '../src/lib';

function fullyDecoratedModel(): typeof Resource {
	@Model()
	class RelatedMany {}

	@Model()
	class RelatedOne {}

	@Model()
	class HostTest {
		public notIncluded: any;
		@Field()
		public myTestField1: any;
		@Field()
		public myTestField2: any;
		@Field()
		public myTestField3: any;
		@ToOne(RelatedOne)
		public relatedInstance: any;
		@ToMany(RelatedMany)
		public relatedInstances: any;
	}
	return <any>HostTest;
}

function fullyDecoratedModelWithRelationshipsStrings() {
	@Model()
	class Related {}

	@Model()
	class AnotherRelated {}

	@Model()
	class Host {
		@ToOne('related')
		public relatedInstance: any;
		@ToOne({ relatedResource: 'another-related', mapFrom: 'someKey' })
		public anotherRelated: any;
	}
	return { Host, Related, AnotherRelated };
}

describe('Decoraters integration', () => {
	it('Field, ToOne and ToMany set metadata correctly together', () => {
		const ctor = fullyDecoratedModel();
		const fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
		const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
		const relations = Object.keys(Reflect.getMetadata(METAKEYS.RELATIONS, ctor));
		expect(fields.length).toBe(attributes.length + relations.length);
	});
	it('can be set using strings instead of constructors', () => {
		const { Host, Related, AnotherRelated } = fullyDecoratedModelWithRelationshipsStrings();
		ResourceModule.processRelationships();
		const config = Reflect.getMetadata(METAKEYS.RELATIONS, Host)['relatedInstance'];
		const anotherConfig = Reflect.getMetadata(METAKEYS.RELATIONS, Host)['anotherRelated'];
		expect(config).toBeDefined();
		expect(config.RelatedResource).toBeDefined();
		expect(config.RelatedResource).toBe(Related);
		expect(anotherConfig).toBeDefined();
		expect(anotherConfig.RelatedResource).toBeDefined();
		expect(anotherConfig.RelatedResource).toBe(AnotherRelated);
	});
});
