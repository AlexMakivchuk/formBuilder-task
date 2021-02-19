import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserService } from 'src/app/shared/services/user.service';
import { logIn } from 'src/app/core/actions';
import { State } from 'src/app/core/reducers';
import { AUTH_INPUT_FIELDS_NAMES } from 'src/app/shared/constants/element-constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  public inputFields = AUTH_INPUT_FIELDS_NAMES;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    });
  }

  onSubmit(): void {
    this.store.dispatch(logIn({ payload: this.form.value }));
  }

  toRegistration(): void {
    this.router.navigate(['/registration']);
  }

}
