import { Model, Field, ToMany, ToOne } from '../src/resource/resource.decorators';
import { Resource } from '../src/resource/resource.core';
import { METAKEYS } from '../src/resource/utils';

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

describe('Decoraters integration', () => {
	it('Field, ToOne and ToMany set metadata correctly together', () => {
		const ctor = fullyDecoratedModel();
		const fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
		const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
		const relations = Object.keys(Reflect.getMetadata(METAKEYS.RELATIONS, ctor));
		expect(fields.length).toBe(attributes.length + relations.length);
	});

});
