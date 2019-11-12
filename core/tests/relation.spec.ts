import { ToManyRelation } from '../src/lib/relations/to-many';
import { RelationConfiguration } from '../src/lib/relations/relation-configuration';
import { ToOneRelation } from '../src/lib/relations/to-one';

describe('ToOneRelation, ToManyRelation and RelationConfiguration', () => {
	it('are defined', () => {
		expect(ToManyRelation).toBeDefined();
		expect(ToOneRelation).toBeDefined();
		expect(RelationConfiguration).toBeDefined();
	});
});
