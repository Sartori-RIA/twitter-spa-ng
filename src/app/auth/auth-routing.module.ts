import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RecoverComponent} from './recover/recover.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {PinCodeComponent} from './pin-code/pin-code.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: 'entrar', component: SignInComponent},
      {path: 'registrar', component: SignUpComponent},
      {path: 'recuperar', component: RecoverComponent},
      {path: 'confirmar', component: ConfirmComponent},
      {path: 'codigo', component: PinCodeComponent},
      {path: 'nova-senha', component: ResetPasswordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
