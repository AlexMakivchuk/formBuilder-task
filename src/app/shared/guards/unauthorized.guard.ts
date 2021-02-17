import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.select(getAuthState)
      .pipe(first()).subscribe(authState => this.isAuth = authState);
    return this.isAuth;
  }
}
