import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { getAuthState } from 'src/app/core/reducers';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  id: number;
  isAuth: boolean;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    this.store.select(getAuthState)
      .pipe(first()).subscribe(authState => authState ?
      this.isAuth = authState :
      this.router.navigate([ '/login' ]));
    // @ts-ignore
    this.id = jwt_decode(token).sub;
    return this.isAuth;
  }
}
