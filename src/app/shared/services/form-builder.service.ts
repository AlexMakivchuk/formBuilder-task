import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { FormBuilderModel } from 'src/app/shared/models/form-builder.model';
import * as actions from 'src/app/core/actions';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';

@Injectable()
export class FormBuilderService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getFormBuilderById(id: number): Observable<FormBuilderModel> {
    return this.http.get(`http://localhost:3000/form-builder?userId=${id}`).pipe(
      map((response: Response) => response[0])
    );
  }

  saveFormBuilder(builder: FormBuilderModel): Observable<any> {
    return this.http.put(`http://localhost:3000/form-builder/${builder.id}`, builder);
  }

  addFormBuilder(builder: FormBuilderModel): Observable<any> {
    return this.http.post(`http://localhost:3000/form-builder/`, builder);
  }

  setBuilderItemsToStore(value: FormBuilderModel, generalStyles: NameValueInterface, userId: number): FormBuilderModel {
    let builder: FormBuilderModel = { generalStyles: null, userId: null, builderArray: [], id: null };
    if (!value){
      builder.generalStyles = { ...generalStyles };
      builder.userId = userId;
      this.addFormBuilder(builder).subscribe(val => builder.id = val.id);
    } else {
      builder = JSON.parse(JSON.stringify(value));
    }
    this.store.dispatch(actions.updateFormItem(
      { payload: JSON.parse(JSON.stringify(builder.builderArray)) }
    ));
    this.store.dispatch(actions.addGeneralStyles(
      { payload: builder.generalStyles }
    ));
    return builder;
  }

}
