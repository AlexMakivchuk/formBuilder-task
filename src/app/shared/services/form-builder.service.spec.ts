import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FormBuilderService } from 'src/app/shared/services/form-builder.service';
import { FormBuilderModel } from 'src/app/shared/models/form-builder.model';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

describe('FormBuilderService', () => {
  let store: Store;
  let service: FormBuilderService;

  const mockBuilder: FormBuilderModel = {
    id: 1,
    builderArray: [ { name: 'input', value: 'input', styles: { width: { value: '200', units: 'px' } } } ],
    generalStyles: { name: 'general', value: '', styles: { width: { value: '200', units: 'px' } } }
  };

  const initialState = {
    formItems: [],
    generalStyles: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilderService,
        provideMockStore({ initialState })
      ],
      imports: [ HttpClientTestingModule ]
    });
    // @ts-ignore
    store = TestBed.inject(MockStore);
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getFormBuilderById', inject(
    [ FormBuilderService, HttpTestingController ],
    (FBService: FormBuilderService, backend: HttpTestingController) => {
      FBService.getFormBuilderById(1).subscribe(builder => {
        expect(builder).toEqual(mockBuilder);
      });

      backend.expectOne('http://localhost:3000/form-builder?userId=1').flush([ mockBuilder ]);
      backend.verify();
    })
  );

  it('#getFormBuilderById with error', inject(
    [ FormBuilderService, HttpTestingController ],
    (FBService: FormBuilderService, backend: HttpTestingController) => {
      const emsg = '404 error';
      FBService.getFormBuilderById(1).subscribe(
        builder => fail('should fail with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        });

      backend.expectOne('http://localhost:3000/form-builder?userId=1').flush(
        emsg, { status: 404, statusText: 'Not Found' });
      backend.verify();
    })
  );

  it('#saveFormBuilder', inject(
    [ FormBuilderService, HttpTestingController ],
    (FBService: FormBuilderService, backend: HttpTestingController) => {
      FBService.saveFormBuilder(mockBuilder).subscribe(value => {
        expect(value).toEqual(true);
      });

      backend.expectOne(req => JSON.stringify(req.body) === JSON.stringify(mockBuilder)).flush(true);
      backend.verify();
    }));

  it('#saveFormBuilder with error', inject(
    [ FormBuilderService, HttpTestingController ],
    (FBService: FormBuilderService, backend: HttpTestingController) => {
      const emsg = '400 error Bad Request';
      FBService.saveFormBuilder(mockBuilder).subscribe(
        () => fail('should fail with 400 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400, 'status');
          expect(error.error).toEqual(emsg, 'message');
        });

      backend.expectOne(req => req.body !== {}).flush(
        emsg, { status: 400, statusText: 'Bad Request' });
      backend.verify();
    })
  );

  it('#addFormBuilder', inject(
    [ FormBuilderService, HttpTestingController ],
    (FBService: FormBuilderService, backend: HttpTestingController) => {
      FBService.addFormBuilder(mockBuilder).subscribe(value => {
        expect(value).toEqual(true);
      });

      backend.expectOne(req => JSON.stringify(req.body) === JSON.stringify(mockBuilder)).flush(true);
      backend.verify();
    })
  );

  it('#addFormBuilder with error', inject(
    [ FormBuilderService, HttpTestingController ],
    (FBService: FormBuilderService, backend: HttpTestingController) => {
      const emsg = '500 error Bad Gateway';
      FBService.saveFormBuilder(mockBuilder).subscribe(
        () => fail('should fail with 502 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(502, 'status');
          expect(error.error).toEqual(emsg, 'message');
        });

      backend.expectOne(req => req.body !== {}).flush(
        emsg, { status: 502, statusText: 'Bad Gateway' });
      backend.verify();
    })
  );

  it('#setBuilderItemsToStore, return builder', () => {
    expect(service.setBuilderItemsToStore(mockBuilder, mockBuilder.generalStyles)).toEqual(mockBuilder);
  });

});
