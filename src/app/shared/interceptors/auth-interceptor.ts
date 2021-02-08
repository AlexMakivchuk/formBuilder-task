import {Injectable} from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler,
    HttpResponse, HttpErrorResponse, HttpEvent
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({
      headers: req.headers.set( 'Content-Type', 'application/json')
    });

    return next.handle(authReq).pipe(
      tap(
        event => {
        if (event instanceof HttpResponse) {
        }
      },
          err => {
        if (err instanceof HttpErrorResponse) {
          console.log('Error: ', err.status);
        }
      })
    );
  }
}
