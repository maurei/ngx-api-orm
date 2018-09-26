/* tslint:disable: no-non-null-assertion */
import { HttpParams } from '@angular/common/http';
import { Abstract } from '../src/resource/request-handlers/abstract/builders';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from '../src/resource/request-handlers/default/builders';
import { JsonApiBuilders } from '../src/resource/request-handlers/jsonapidotorg/builders';
import { ResourceModel, ResourceField, ResourceToMany, ResourceToOne } from '../src/resource/resource.decorators';
import { ResourceType } from '../src/resource/utils';
import { Resource } from '../src/resource/resource.core';
import { ResourceModule } from '../src/resource/resource.module';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonApiDotOrg } from '../src/resource/request-handlers/jsonapidotorg/providers';

function getModels() {
	@ResourceModel()
	class RelatedMany extends Resource {}

	@ResourceModel()
	class RelatedOne extends Resource {}

	@ResourceModel()
	class Host extends Resource {
		@ResourceField()
		public id: number;
		@ResourceField('fullName')
		public name: any;
		@ResourceField()
		public some: any;
		@ResourceField()
		public field: any;
		@ResourceToOne(RelatedOne)
		public relatedInstance: any;
		@ResourceToMany(RelatedMany)
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
	describe('Abstract builders', () => {
		it('are defined', () => {
			expect(Abstract.SimpleBuilder).toBeDefined();
			expect(Abstract.ToOneBuilder).toBeDefined();
			expect(Abstract.ToManyBuilder).toBeDefined();
		});
	});
	describe('Default', () => {
		let builder: SimpleBuilder;
		let toOneBuilder: ToOneBuilder;
		let toManyBuilder: ToManyBuilder;
		let injector: TestBed;
		let httpMock: HttpTestingController;
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [ResourceModule.forRoot(), HttpClientTestingModule],
				declarations: [],
				providers: []
			}).compileComponents();
			injector = getTestBed();
			httpMock = injector.get(HttpTestingController);
			builder = injector.get(SimpleBuilder);
			toOneBuilder = injector.get(ToOneBuilder);
			toManyBuilder = injector.get(ToManyBuilder);
		}));
		describe('Simple builder', () => {
			let instances: any;
			beforeAll(() => {
				instances = generateInstances();
			});
			it('is defined', () => {
				expect(SimpleBuilder).toBeDefined();
				expect(builder).toBeDefined();
			});
			it('can fetch', async () => {
				expect(builder.fetch).toBeDefined();
				const rv = {};
				const req = builder.fetch('host', {});
				expect(req instanceof Promise).toBe(true);
				req.then(_rv => {
					expect(rv).toBe(_rv);
				});
				const mock = httpMock.expectOne('/hosts');
				expect(mock.request.method).toBe('GET');
				mock.flush(rv);
			});
			it('can save', async () => {
				expect(builder.save).toBeDefined();
				const rv = {};
				const req = builder.save('host', instances.related, {});
				expect(req instanceof Promise).toBe(true);
				req.then(_rv => {
					expect(rv).toBe(_rv);
				});
				const mock = httpMock.expectOne('/hosts');
				expect(mock.request.method).toBe('POST');
				mock.flush(rv);
			});
			it('can update', async () => {
				expect(builder.update).toBeDefined();
				const req = builder.update('host', instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/hosts/' + instances.relatedWithValues.id);
				expect(mock.request.method).toBe('PATCH');
			});
			it('can delete', async () => {
				expect(builder.delete).toBeDefined();
				const req = builder.delete('host', instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/hosts/' + instances.relatedWithValues.id);
				expect(mock.request.method).toBe('DELETE');
			});
			it('can query a custom url', async () => {
				builder.fetch('host', { url: '/foo/bar' });
				const mock = httpMock.expectOne('/foo/bar');
				expect(mock.request.method).toBe('GET');
			});
			it('can query a with query params', async () => {
				const params = new HttpParams().set('page', '10').set('include', 'authors.comment');
				builder.fetch('host', { url: '/foo/bar', params: params });
				const mock = httpMock.expectOne('/foo/bar?page=10&include=authors.comment');
				expect(mock.request.params).toEqual(params);
				expect(mock.request.method).toBe('GET');
			});
		});
		describe('To One builder', () => {
			let instances: any;
			beforeAll(() => {
				instances = generateInstances();
			});
			it('is defined', () => {
				expect(ToOneBuilder).toBeDefined();
				expect(toOneBuilder).toBeDefined();
			});
			it('can add', () => {
				expect(toOneBuilder.add).toBeDefined();
				const req = toOneBuilder.add('to-one-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/to-one-target');
				expect(mock.request.method).toBe('PATCH');
			});
			it('can remove', () => {
				expect(toOneBuilder.remove).toBeDefined();
				const req = toOneBuilder.remove('to-one-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/to-one-target');
				expect(mock.request.method).toBe('DELETE');
			});
		});
		describe('To Many builder', () => {
			let instances: any;
			beforeAll(() => {
				instances = generateInstances();
			});
			it('is defined', () => {
				expect(ToManyBuilder).toBeDefined();
				expect(toManyBuilder).toBeDefined();
			});
			it('can add', () => {
				expect(toManyBuilder.add).toBeDefined();
				const req = toManyBuilder.add('to-many-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/to-many-targets');
				expect(mock.request.method).toBe('POST');
			});
			it('can remove', () => {
				expect(toManyBuilder.remove).toBeDefined();
				const req = toManyBuilder.remove('to-many-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/to-many-targets');
				expect(mock.request.method).toBe('DELETE');
			});
		});
	});
	describe('JsonApi.org,', () => {
		let builder: SimpleBuilder;
		let toOneBuilder: ToOneBuilder;
		let toManyBuilder: ToManyBuilder;
		let injector: TestBed;
		let httpMock: HttpTestingController;
		beforeEach(async(() => {
			TestBed.configureTestingModule({
				imports: [ResourceModule.forRoot({ requestHandlersProviders: JsonApiDotOrg }), HttpClientTestingModule],
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
			it('is has replaced default handler with JsonApi handler', () => {
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
				const req = toOneBuilder.add('to-one-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-one-target');
				expect(mock.request.method).toBe('PATCH');
			});
			it('can remove', () => {
				expect(toOneBuilder.remove).toBeDefined();
				const req = toOneBuilder.remove('to-one-target', 'related', {}, instances.relatedWithValues, {});
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
				const req = toManyBuilder.add('to-many-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-many-targets');
				expect(mock.request.method).toBe('POST');
			});
			it('can remove', () => {
				expect(toManyBuilder.remove).toBeDefined();
				const req = toManyBuilder.remove('to-many-target', 'related', {}, instances.relatedWithValues, {});
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/relationships/to-many-targets');
				expect(mock.request.method).toBe('DELETE');
			});
		});
	});
});
