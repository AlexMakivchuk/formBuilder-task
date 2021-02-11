import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user';
import { JsonServerResponse } from 'src/app/shared/models/json-server-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userLogin(user): Observable<string> {
    return this.http.post(`http://localhost:3000/login`, user).pipe(
      map((res: JsonServerResponse) => res.accessToken)
    );
  }

  createNewUser(user: User): Observable<string> {
    return this.http.post('http://localhost:3000/users', user).pipe(
      map((res: JsonServerResponse) => res.accessToken)
    );
  }

}
