import { ToManyRelation } from '../src/relations/to-many';
import { RelationConfiguration } from '../src/relations/relation-configuration';
import { ToOneRelation } from '../src/relations/to-one';

describe('ToOneRelation, ToManyRelation and RelationConfiguration', () => {
	it('are defined', () => {
		expect(ToManyRelation).toBeDefined();
		expect(ToOneRelation).toBeDefined();
		expect(RelationConfiguration).toBeDefined();
	});
});
