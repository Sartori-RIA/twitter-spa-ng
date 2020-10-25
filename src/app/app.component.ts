import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from './store';
import {selectIsLoggedIn} from './store/auth/auth.selectors';
import {selectUser} from './store/user/user.selectors';

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
}
