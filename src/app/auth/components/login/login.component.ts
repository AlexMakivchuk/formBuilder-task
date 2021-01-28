import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user';
import {Message} from '../../../shared/models/message';


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
      this.userService.getUserByEmail(formData.email).subscribe(
        (value: User) => {
          if (value) {
            if (value.password === this.form.controls[`password`].value) {
              localStorage.setItem('user', JSON.stringify(value));
              this.router.navigate(['/form-builder']);
            } else {
              this.showMessage({
                text : 'Пароль не верный',
                type : 'danger'
              });
            }
          } else {
            this.showMessage({
              text: 'Такого пользователя не существует',
              type: 'danger'
            });
          }
        }
      );
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
