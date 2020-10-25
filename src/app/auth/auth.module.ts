import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecoverComponent } from './recover/recover.component';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
  declarations: [AuthLayoutComponent, SignInComponent, SignUpComponent, RecoverComponent, ConfirmComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
