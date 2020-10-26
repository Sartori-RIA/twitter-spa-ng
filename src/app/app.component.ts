import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './store';
import {selectIsLoggedIn} from './store/auth/auth.selectors';
import {selectUser} from './store/user/user.selectors';
import {SIGN_OUT} from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-spa-ng';
  loggedIn$ = this.store.pipe(select(selectIsLoggedIn));
  user$ = this.store.pipe(select(selectUser));

  constructor(private store: Store<AppState>) {
  }

  logout(): void {
    this.store.dispatch(SIGN_OUT());
  }
}
