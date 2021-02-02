import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Message } from 'src/app/shared/models/message';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  user: User;
  message: Message = { type: '', text: '' };

  constructor(
    private router: Router,
    private userService: UserService
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
    this.user = this.form.value;
    if (this.form.valid) {
      this.userService.createNewUser(this.user)
        .subscribe((v) => {
          this.showMessage({
            text: 'User registred',
            type: '-'
          });
        },
          (err) => {
            this.showMessage({
              text: err.error,
              type: 'danger'
            });
        });
    }
  }

  toLogin(): void {
    this.router.navigate(['/login']);
  }

  showMessage(message: Message): void {
    this.message = message;
    setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

}
