import { ToManyRelation } from '../src/resource/relations/to-many';
import { RelationConfiguration } from '../src/resource/relations/relation-configuration';
import { ToOneRelation } from '../src/resource/relations/to-one';

describe('ToOneRelation, ToManyRelation and RelationConfiguration', () => {
	it('are defined', () => {
		expect(ToManyRelation).toBeDefined();
		expect(ToOneRelation).toBeDefined();
		expect(RelationConfiguration).toBeDefined();
	});
});
