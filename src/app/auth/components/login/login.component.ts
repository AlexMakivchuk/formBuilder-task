import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UserService } from 'src/app/shared/services/user.service';
import { Message } from 'src/app/shared/models/message';
import { login } from 'src/app/core/actions';
import { getLoginError, State } from 'src/app/core/reducers';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  message: Message = { type: '', text: '' };
  public ngUnsubscribe = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(getLoginError)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(error => this.message = { ...error }),
        delay(5000),
        tap(() => this.message = { type: '', text: '' })
        ).subscribe();
    this.form = new FormGroup( {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,  [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid) {
      this.store.dispatch(login({ payload: formData }));
    }
  }

  toRegistration(): void {
    this.router.navigate(['/registration']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
