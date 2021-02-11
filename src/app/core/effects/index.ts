import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as coreActions from 'src/app/core/actions';
import { State } from 'src/app/core/reducers';
import { UserService } from 'src/app/shared/services/user.service';


@Injectable()
export class CoreEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<State>,
    private router: Router
  ) {
  }

  /**
   * Saves user's auth token to localStorage
   */
  login$ = createEffect(() => this.actions$.pipe(
    ofType(coreActions.logIn),
    switchMap(({ payload }) => this.userService.userLogin(payload).pipe(
      tap((token) => this.setTokenToLocalStorage(token)),
      map(() => coreActions.loginSuccess()),
      catchError((err) => of(coreActions.messageAuth({
          payload: { text: err.error, type: 'danger' }
        }))
      )
    ))
  ));

  registrate$ = createEffect(() => this.actions$.pipe(
    ofType(coreActions.registrateUser),
    switchMap(({ payload }) => this.userService.createNewUser(payload).pipe(
      map(() => coreActions.messageAuth({
          payload: { text: 'user registrated', type: '' }
        }
      )),
      catchError((err) => of(coreActions.messageAuth({
        payload: { text: err.error, type: 'danger' }
      })))
    ))
  ));

  private setTokenToLocalStorage(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigate([ '/form-builder' ]);
  }

}
