import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from 'ngx-validators';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_UP} from '../../store/auth/auth.actions';
import {CookieCodeValidators} from '../../utils/cookie-code.validators';
import {UsersService} from '../../core/api/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = this.mountForm();

  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const values = this.form.value;
      this.store.dispatch(SIGN_UP({
        user: {
          name: values.name,
          email: values.email,
          user_name: values.user_name,
          password: values.password
        }
      }));
    }
    this.form.markAllAsTouched();
  }

  private mountForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email], [CookieCodeValidators.uniqueEmail(this.userService)]],
      user_name: [null, [Validators.required], [CookieCodeValidators.uniqueUsername(this.userService)]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirm_password: [],
    }, PasswordValidators.mismatchedPasswords('password', 'confirm_password'));
  }
}
