import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from 'src/app/auth/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { RegistrationComponent } from 'src/app/auth/components/registration/registration.component';
import { LoginComponent } from 'src/app/auth/components/login/login.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
