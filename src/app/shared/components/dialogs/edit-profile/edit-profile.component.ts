import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {selectCurrentUser} from '../../../../store/auth/auth.selectors';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidators} from 'ngx-validators';
import {take} from 'rxjs/operators';
import {CookieCodeValidators} from '../../../../utils/cookie-code.validators';
import {UsersService} from '../../../../core/api/users.service';
import {User} from '../../../../core/models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user$ = this.store.pipe(select(selectCurrentUser));
  form: FormGroup;

  constructor(private store: Store<AppState>,
              private userService: UsersService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      this.createForm(user);
      this.updateForm(user);
    });
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

  private updateForm(user: User): void {
    this.form.patchValue({
      email: user.email,
      name: user.name
    });
  }

  private createForm(user: User): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email], [CookieCodeValidators.uniqueEmail(this.userService, user.email)]],
      name: [null, Validators.required, [CookieCodeValidators.uniqueUsername(this.userService, user.user_name)]],
      password: [null, Validators.required, Validators.minLength(8)],
      confirm_password: []
    }, PasswordValidators.mismatchedPasswords('password', 'confirm_password'));
  }
}
