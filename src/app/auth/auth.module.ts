import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RecoverComponent} from './recover/recover.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {SharedModule} from '../shared/shared.module';
import { PinCodeComponent } from './pin-code/pin-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignInComponent,
    SignUpComponent,
    RecoverComponent,
    ConfirmComponent,
    PinCodeComponent,
    ResetPasswordComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
