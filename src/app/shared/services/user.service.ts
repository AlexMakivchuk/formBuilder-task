import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((response: Response) => response[0] ? response[0] : null) );

  }

  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
      .pipe(
        map((response: Response) => response[0] ? response[0].id : null) );
  }

  createNewUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users', user)
      .pipe(
        map((response: Response) => response) );

  }

}
