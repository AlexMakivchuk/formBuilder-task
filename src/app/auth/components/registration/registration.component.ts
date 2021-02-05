import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserService } from 'src/app/shared/services/user.service';
import { registrateUser } from 'src/app/core/actions';
import { AUTH_INPUT_FIELDS_NAMES } from 'src/app/shared/constants/element-constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store
  ) {
  }
  public inputFields = { ...AUTH_INPUT_FIELDS_NAMES };
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
