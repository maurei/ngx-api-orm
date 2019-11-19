/* tslint:disable: no-non-null-assertion */
import { HttpParams } from '@angular/common/http';
import { Abstract } from '../src/lib/request-handlers/abstract-builders';
import { ToManyBuilder, ToOneBuilder, SimpleBuilder } from '../src/lib/request-handlers/default-builders';
// import { JsonApiBuilders } from '../src/request-handlers/jsonapidotorg/builders';
import { Model, Field, ToMany, ToOne } from '../src/lib/resource.decorators';
import { ResourceType } from '../src/lib/utils';
import { Resource } from '../src/lib/resource.core';
import { ResourceModule } from '../src/lib/resource.module';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
// import { JsonApiDotOrg } from '../src/request-handlers/jsonapidotorg/providers';

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
		@ToOne({relatedResource: RelatedOne})
		public relatedInstance: any;
		@ToMany({relatedResource: RelatedMany})
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
				const req = builder.fetch('hosts', {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				req.then( (_rv: Object[]) => {
					expect(rv).toBe(_rv);
				});
				const mock = httpMock.expectOne('/hosts');
				expect(mock.request.method).toBe('GET');
				mock.flush(rv);
			});
			it('can save', async () => {
				expect(builder.save).toBeDefined();
				const rv = {};
				const req = builder.save('hosts', instances.related, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				req.then( (_rv: Object) => {
					expect(rv).toBe(_rv);
				});
				const mock = httpMock.expectOne('/hosts');
				expect(mock.request.method).toBe('POST');
				mock.flush(rv);
			});
			it('can update', async () => {
				expect(builder.update).toBeDefined();
				const req = builder.update('hosts', instances.relatedWithValues, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/hosts/' + instances.relatedWithValues.id);
				expect(mock.request.method).toBe('PATCH');
			});
			it('can delete', async () => {
				expect(builder.delete).toBeDefined();
				const req = builder.delete('hosts', instances.relatedWithValues, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/hosts/' + instances.relatedWithValues.id);
				expect(mock.request.method).toBe('DELETE');
			});
			it('can query a custom url', async () => {
				builder.fetch('hosts', { url: '/foo/bar' }).toPromise();
				const mock = httpMock.expectOne('/foo/bar');
				expect(mock.request.method).toBe('GET');
			});
			it('can query a with query params', async () => {
				const params = new HttpParams().set('page', '10').set('include', 'authors.comment');
				builder.fetch('hosts', { url: '/foo/bar', params: params }).toPromise();
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
				const req = toOneBuilder.add('toOneTarget', 'relateds', {}, instances.relatedWithValues, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/toOneTarget');
				expect(mock.request.method).toBe('PATCH');
			});
			it('can remove', () => {
				expect(toOneBuilder.remove).toBeDefined();
				const req = toOneBuilder.remove('toOneTarget', 'relateds', {}, instances.relatedWithValues, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/toOneTarget');
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
				const req = toManyBuilder.add('toManyTargets', 'relateds', {}, instances.relatedWithValues, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/toManyTargets');
				expect(mock.request.method).toBe('POST');
			});
			it('can remove', () => {
				expect(toManyBuilder.remove).toBeDefined();
				const req = toManyBuilder.remove('toManyTargets', 'relateds', {}, instances.relatedWithValues, {}).toPromise();
				expect(req instanceof Promise).toBe(true);
				const mock = httpMock.expectOne('/relateds/' + instances.relatedWithValues.id + '/toManyTargets');
				expect(mock.request.method).toBe('DELETE');
			});
		});
	});
});
