import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from 'ngx-validators';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_UP} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    user_name: [null, [Validators.required]],
    name: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirm_password: [],
  }, PasswordValidators.mismatchedPasswords('password', 'confirm_password'));

  constructor(private fb: FormBuilder,
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
}
