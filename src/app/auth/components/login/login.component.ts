import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { UserService } from 'src/app/shared/services/user.service';
import { Message } from 'src/app/shared/models/message';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  message: Message = { type: '', text: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
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
      this.userService.getUserToken(formData).subscribe(
        (token) => {
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['/form-builder']);
        },
         (error) => this.showMessage({
          text: error.error,
          type: 'danger'
        }));
    }
  }

  showMessage(message: Message): void {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  toRegistration(): void {
    this.router.navigate(['/registration']);
  }

  ngOnDestroy(): void {
  }
}
