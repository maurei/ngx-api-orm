import { ResourceModel, ResourceField, ResourceToMany, ResourceToOne } from '../src/resource/resource.decorators';
import { Resource } from '../src/resource/resource.core';
import { METAKEYS } from '../src/resource/utils';

function fullyDecoratedModel(): typeof Resource {
	@ResourceModel()
	class RelatedMany {}

	@ResourceModel()
	class RelatedOne {}

	@ResourceModel()
	class HostTest {
		public notIncluded: any;
		@ResourceField()
		public myTestField1: any;
		@ResourceField()
		public myTestField2: any;
		@ResourceField()
		public myTestField3: any;
		@ResourceToOne(RelatedOne)
		public relatedInstance: any;
		@ResourceToMany(RelatedMany)
		public relatedInstances: any;
	}
	return <any>HostTest;
}

describe('Decoraters integration', () => {
	it('ResourceField, ResourceToOne and ResourceToMany set metadata correctly together', () => {
		const ctor = fullyDecoratedModel();
		const fields = Reflect.getMetadata(METAKEYS.FIELDS, ctor);
		const attributes = Reflect.getMetadata(METAKEYS.ATTRIBUTES, ctor);
		const relations = Object.keys(Reflect.getMetadata(METAKEYS.RELATIONS, ctor));
		expect(fields.length).toBe(attributes.length + relations.length);
	});

});
