import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UnathorizedGuard implements CanActivate {

  constructor(private router: Router) {
  }
  id: number;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    // @ts-ignore
    if (token) {
      // @ts-ignore
      this.id = jwt_decode(token).sub;
    } else {
      this.router.navigate(['/login']);
    }
    return true;
  }

}
