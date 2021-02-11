import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { getAuthMessage } from 'src/app/core/reducers';
import { messageAuth } from 'src/app/core/actions';
import { Message } from 'src/app/shared/models/message';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ]
})
export class AuthComponent implements OnInit, OnDestroy {

  message: Message = { type: '', text: '' };
  public ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.router.navigate([ '/login' ]);
    this.store.select(getAuthMessage)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(message => this.message = { ...message }),
        delay(5000),
        tap(() => this.message = { text: '', type: '' })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.store.dispatch(messageAuth({
      payload: { text: '', type: '' }
    }));
  }

}
