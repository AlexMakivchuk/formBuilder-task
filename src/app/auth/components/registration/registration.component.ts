import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { UserService } from 'src/app/shared/services/user.service';
import { Message } from 'src/app/shared/models/message';
import { messageAuth, registrateUser } from 'src/app/core/actions';
import { getAuthMessage } from 'src/app/core/reducers';
import { delay, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(registrateUser( { payload: this.form.value }));
    }
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }

}
