import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NameValueInterface } from '../models/name-value-interface';
import {FormBuilderModel} from '../models/form-builder.model';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private http: HttpClient) { }

  getFormBuilderById(id: number): Observable<NameValueInterface[]> {
    return this.http.get(`http://localhost:3000/form-builder?userId=${id}`)
      .pipe(
        map((response: Response) => response[0] ? response[0] : null) );

  }

  saveFormBulder(builder: FormBuilderModel): Observable<Response> {
    return this.http.put(`http://localhost:3000/form-builder/${builder.userId}`, builder)
      .pipe(
        map((response: Response) => response) );

  }


}
