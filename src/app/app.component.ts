import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './store';
import {selectIsLoggedIn} from './store/auth/auth.selectors';
import {selectUser} from './store/user/user.selectors';
import {SIGN_OUT} from './store/auth/auth.actions';
import {MatDialog} from '@angular/material/dialog';
import {EditProfileComponent} from './shared/components/dialogs/edit-profile/edit-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-spa-ng';
  loggedIn$ = this.store.pipe(select(selectIsLoggedIn));
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<AppState>,
              private dialog: MatDialog) {
  }

  logout(): void {
    this.store.dispatch(SIGN_OUT());
  }

  editProfile(): void {
    this.dialog.open(EditProfileComponent, {
      minWidth: '50vh'
    });
  }
}
