/* tslint:disable: no-non-null-assertion */
import { HttpParams } from '@angular/common/http';
import {
	AbstractBuilders as Abstract,
	Model,
	Field,
	ToMany,
	ToOne,
	SimpleBuilder,
	ToOneBuilder,
	ToManyBuilder,
	ResourceType,
	Resource,
	ResourceModule
} from '@ngx-api-orm/core';
import { JsonApiBuilders } from '../src/builders';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonApi} from '../src/providers';

function getModels() {
	@Model()
	class RelatedMany extends Resource {}

	@Model()
	class RelatedOne extends Resource {}

	@Model()
	class Host extends Resource {
		@Field()
		public id: number;
		@Field({mapFrom: 'fullName'})
		public name: any;
		@Field()
		public some: any;
		@Field()
		public field: any;
		@ToOne(RelatedOne)
		public relatedInstance: any;
		@ToMany(RelatedMany)
		public relatedInstances: any;

		public notIncluded: any;
	}
	return {
		getHost: () => (Host as any) as ResourceType<Host>,
		getRelatedOne: () => (RelatedOne as any) as ResourceType<RelatedOne>,
		getRelatedMany: () => (RelatedMany as any) as ResourceType<RelatedMany>
	};
}

function generateInstances() {
	const ctors = getModels();
	const toOneTargetWithId = new (ctors.getRelatedOne())();
	toOneTargetWithId.id = 1337;
	const toManyTargetWithId = new (ctors.getRelatedMany())();
	toManyTargetWithId.id = 2674;

	const relatedWithValues = new (ctors.getHost())();
	relatedWithValues.id = 123;
	relatedWithValues.some = 'stuff';
	relatedWithValues.name = 'more stuff';

	const related = new (ctors.getHost())();
	const toOneTarget = new (ctors.getRelatedOne())();
	const toManyTarget = new (ctors.getRelatedMany())();

	return {
		related: related,
		toOneTargetWithValues: toOneTargetWithId,
		toManyTargetWithValues: toManyTargetWithId,
		relatedWithValues: relatedWithValues
	};
}

describe('Request builders', () => {
	let builder: SimpleBuilder;
	let toOneBuilder: ToOneBuilder;
	let toManyBuilder: ToManyBuilder;
	let injector: TestBed;
	let httpMock: HttpTestingController;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ResourceModule.forRoot({ requestHandler: JsonApi }), HttpClientTestingModule],
			declarations: [],
			providers: []
		}).compileComponents();
		injector = getTestBed();
		httpMock = injector.get(HttpTestingController);
		builder = injector.get(SimpleBuilder);
		toOneBuilder = injector.get(ToOneBuilder);
		toManyBuilder = injector.get(ToManyBuilder);
	}));
	describe('Extendability', () => {
		it('has replaced default handler with JsonApi handler', () => {
			expect(JsonApiBuilders.Simple).toBeDefined();
			expect(JsonApiBuilders.ToOne).toBeDefined();
			expect(JsonApiBuilders.ToMany).toBeDefined();
			expect(builder).toBeDefined();
			expect(toOneBuilder).toBeDefined();
			expect(toManyBuilder).toBeDefined();
			expect(builder instanceof JsonApiBuilders.Simple).toBe(true);
			expect(toOneBuilder instanceof JsonApiBuilders.ToOne).toBe(true);
			expect(toManyBuilder instanceof JsonApiBuilders.ToMany).toBe(true);
		});
	});
	describe('To One builder', () => {
		let instances: any;
		beforeAll(() => {
			instances = generateInstances();
		});
		it('can add', () => {
			expect(toOneBuilder.add).toBeDefined();
			const req = toOneBuilder.add('to-one-target', 'relateds', {}, instances.relatedWithValues, {});
			expect(req instanceof Promise).toBe(true);
			const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-one-target');
			expect(mock.request.method).toBe('PATCH');
		});
		it('can remove', () => {
			expect(toOneBuilder.remove).toBeDefined();
			const req = toOneBuilder.remove('to-one-target', 'relateds', {}, instances.relatedWithValues, {});
			expect(req instanceof Promise).toBe(true);
			const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-one-target');
			expect(mock.request.method).toBe('PATCH');
		});
	});
	describe('To Many builder', () => {
		let instances: any;
		beforeAll(() => {
			instances = generateInstances();
		});
		it('can add', () => {
			expect(toManyBuilder.add).toBeDefined();
			const req = toManyBuilder.add('to-many-targets', 'relateds', {}, instances.relatedWithValues, {});
			expect(req instanceof Promise).toBe(true);
			const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-many-targets');
			expect(mock.request.method).toBe('POST');
		});
		it('can remove', () => {
			expect(toManyBuilder.remove).toBeDefined();
			const req = toManyBuilder.remove('to-many-targets', 'relateds', {}, instances.relatedWithValues, {});
			expect(req instanceof Promise).toBe(true);
			const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-many-targets');
			expect(mock.request.method).toBe('DELETE');
		});
	});
});
