import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from 'ngx-validators';
import {AuthService} from '../../core/api/auth.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {SIGN_IN_DONE} from '../../store/auth/auth.actions';
import {LocalStorage} from '../../utils/storage';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: FormGroup = this.fb.group({
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirm_password: []
  }, PasswordValidators.mismatchedPasswords('password', 'confirm_password'));

  private token: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {
    this.token = this.router.getCurrentNavigation()?.extras?.state?.token;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const values = this.form.value;
      this.authService.resetPassword(values.password, this.token)
        .pipe(take(1))
        .subscribe(({body: user}) => {
          LocalStorage.setJwt(`Bearer ${this.token}`);
          this.store.dispatch(SIGN_IN_DONE({user}));
        }, (e) => {
          console.log(e);
        });
    }
    this.form.markAllAsTouched();
  }

}
