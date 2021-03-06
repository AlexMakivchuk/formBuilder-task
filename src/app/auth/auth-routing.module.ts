import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { AuthComponent } from 'src/app/auth/auth.component';
import { RegistrationComponent } from 'src/app/auth/components/registration/registration.component';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent},
      { path: 'registration', component: RegistrationComponent },
    ]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
