import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {selectCurrentUser} from '../../../../store/auth/auth.selectors';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from 'ngx-validators';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user$ = this.store.pipe(select(selectCurrentUser));
  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    name: [null, Validators.required],
    password: [null, Validators.required, Validators.minLength(8)],
    confirm_password: []
  }, PasswordValidators.mismatchedPasswords('password', 'confirm_password'));

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onSubmit(): void {
    this.form.controls.password.setValidators([Validators.required, Validators.minLength(8)]);
    if (!!this.form.controls.password.value) {
      this.form.controls.password.clearValidators();
    }
    this.form.controls.password.updateValueAndValidity();
    if (this.form.valid) {

    }
    this.form.markAllAsTouched();
  }

  private updateForm() {
    this.user$.pipe(take(1)).subscribe((user) =>
      this.form.patchValue({
        email: user.email,
        name: user.name
      })
    );
  }
}
