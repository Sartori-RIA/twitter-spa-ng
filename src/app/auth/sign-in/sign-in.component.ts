import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {SIGN_IN} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const values = this.form.value;
      this.store.dispatch(SIGN_IN({
        user: {
          email: values.email,
          password: values.password
        }
      }));
    }
    this.form.markAllAsTouched();
  }
}
