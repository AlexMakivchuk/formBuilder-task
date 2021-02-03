import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormBuilderModel } from 'src/app/shared/models/form-builder.model';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private http: HttpClient) { }

  getFormBuilderById(id: number): Observable<FormBuilderModel> {
    return this.http.get(`http://localhost:3000/form-builder?userId=${id}`)
      .pipe(
        map((response: Response) => response[0]
      )
    );
  }

  saveFormBuilder(builder: FormBuilderModel): Observable<any> {
    return this.http.put(`http://localhost:3000/form-builder/${builder.id}`, builder);

  }

  addFormBuilder(builder: FormBuilderModel): Observable<any> {
    return this.http.post(`http://localhost:3000/form-builder/`, builder);
  }

}
