
/*tslint:disable:no-non-null-assertion*/
import { ResourceModule } from '../src/resource.module';
import { ResourceType } from '../src/utils';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IHostModel, IOneToOneModel, IOneToManyModel, getModels, TestCase, hostNoRelation, fullTemplateNoMTM, hostNoRelationNoId } from './models';


describe('Resource class integration', () => {
	let injector: TestBed;
	let httpMock: HttpTestingController;
	let Model: ResourceType<IHostModel>;
	let ToOneModel: ResourceType<IOneToOneModel>;
	let ToManyModel: ResourceType<IOneToManyModel>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ResourceModule.forRoot(), HttpClientTestingModule],
			declarations: [],
			providers: []
		}).compileComponents();
		injector = getTestBed();
		httpMock = injector.get(HttpTestingController);
	}));
	describe('save pipeline:', () => {
		beforeEach(() => {
			const { HostModel, OneToOneModel, OneToManyModel } = getModels(TestCase.Simple);
			Model = HostModel;
			ToOneModel = OneToOneModel;
			ToManyModel = OneToManyModel;
		});
		it('a new resource', async () => {
			const unsavedHost = new Model(hostNoRelationNoId);
			const savePromise = unsavedHost.save();
			const mockreq = httpMock.expectOne(`/host-models`);
			expect(mockreq.request.method).toBe('POST');
			const rv = Object.assign({}, hostNoRelation);
			mockreq.flush(rv);
			savePromise.then((savedInstance: any) => {
				expect(Model.collection().length).toBe(1);
				expect(Model.collection()[0].id).toBe(1);
			});
		});
		it('a to one resource', async () => {
			const hostInstance = new Model(hostNoRelation);
			const toOneInstance = new ToOneModel(toOneWithId);
			const addPromise = hostInstance.oneToOneModel.set(toOneInstance);
			addPromise.then(() => {
				expect(hostInstance.oneToOneModel.instance).toBe(toOneInstance);
			});
			const mockreq = httpMock.expectOne('/host-models/1/one-to-one-model');
			expect(mockreq.request.method).toBe('PATCH');
			mockreq.flush(null);
		});
		it('a to many resource', async () => {
			const hostInstance = new Model(hostNoRelation);
			const toManyInstance = new ToManyModel(toManyWithId);
			const addPromise = hostInstance.oneToManyModels.add(toManyInstance);
			addPromise.then(() => {
				expect(hostInstance.oneToManyModels[hostInstance.oneToManyModels.length - 1]).toBe(toManyInstance);
			});
			const mockreq = httpMock.expectOne('/host-models/1/one-to-many-models');
			expect(mockreq.request.method).toBe('POST');
			mockreq.flush(null);
		});
	});
	describe('delete pipeline:', () => {
		let nestedInstance: any;
		beforeEach(() => {
			const { HostModel, OneToOneModel, OneToManyModel } = getModels(TestCase.Simple);
			Model = HostModel;
			ToOneModel = OneToOneModel;
			ToManyModel = OneToManyModel;
			nestedInstance = Model.factory(fullTemplateNoMTM);
		});
		it('a resource', async () => {
			expect(Model.collection().length).toBe(2);
			const host = Model.collection()[0];
			const deletePromise = host.delete();
			const mockreq = httpMock.expectOne(`/host-models/1`);
			expect(mockreq.request.method).toBe('DELETE');
			mockreq.flush(null);
			deletePromise.then(() => {
				expect(Model.collection().length).toBe(1);
			});
		});
		it('a to one resource', async () => {
			const host = nestedInstance[0];
			const deletePromise = host.oneToOneModel.remove();
			deletePromise.then(() => {
				expect(host.oneToOneModel.instance).toBeNull();
			});
			const mockreq = httpMock.expectOne(`/host-models/1/one-to-one-model`);
			expect(mockreq.request.method).toBe('DELETE');
			mockreq.flush(null);
		});
		it('a to many resource', async () => {
			const host = nestedInstance[1];
			const target = host.oneToManyModels[0];
			const preLength = host.oneToManyModels.length;
			const deletePromise = host.oneToManyModels.remove(target);
			deletePromise.then(() => {
				expect(host.oneToManyModels.length).toBe(preLength - 1);
			});
			const mockreq = httpMock.expectOne(`/host-models/2/one-to-many-models`);
			expect(mockreq.request.method).toBe('DELETE');
			mockreq.flush(null);
		});
	});
	describe('fetch and update pipeline:', () => {
		beforeEach(() => {
			const { HostModel, OneToOneModel, OneToManyModel } = getModels(TestCase.Simple);
			Model = HostModel;
			ToOneModel = OneToOneModel;
			ToManyModel = OneToManyModel;
		});
		it('getting nested resources', async () => {
			const getPromise = Model.fetch();
			const mockreq = httpMock.expectOne('/host-models');
			expect(mockreq.request.method).toBe('GET');
			mockreq.flush(fullTemplateNoMTM);
			getPromise.then(() => {
				expect(Model.collection().length).toBe(2);
				expect(ToOneModel.collection().length).toBe(2);
				expect(ToManyModel.collection().length).toBe(6);
			});
		});
		it('patching a nested resource', async () => {
			Model.factory(fullTemplateNoMTM);
			const related = Model.collection()[0].oneToOneModel.instance!;
			related.field = 'patched';
			const putPromise = related.update();
			const mockreq = httpMock.expectOne(`/one-to-one-models/${related.id}`);
			expect(mockreq.request.method).toBe('PATCH');
			const expected = expect(mockreq.request.body).toEqual(patchExpected);
			mockreq.flush(null);
			putPromise.then(() => {
				expect(related.field).toBe('patched');
			});
		});
	});
});

const toOneWithId = {
	id: 20,
	experiment: 'more content',
	field: 'content',
	hosts: null
};

const toManyWithId = {
	id: 52,
	field: 'to-many',
	experiment: 'test content',
	hosts: null
};

const patchExpected = {
	id: 20,
	field: 'patched'
};
