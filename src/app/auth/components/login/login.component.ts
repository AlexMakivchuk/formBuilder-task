import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserService } from 'src/app/shared/services/user.service';
import { logIn } from 'src/app/core/actions';
import { State } from 'src/app/core/reducers';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null,  [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    const formData = this.form.value;
    if (this.form.valid) {
      this.store.dispatch(logIn({ payload: formData }));
    }
  }

  toRegistration(): void {
    this.router.navigate(['/registration']);
  }

}
