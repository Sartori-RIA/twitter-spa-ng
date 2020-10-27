import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  SIGN_IN,
  SIGN_IN_DONE,
  SIGN_IN_REFUSED,
  SIGN_OUT,
  SIGN_UP,
  SIGN_UP_DONE,
  SIGN_UP_FAIL,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../core/api/auth.service';
import {UsersService} from '../../core/api/users.service';

@Injectable()
export class AuthEffects {

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_IN),
    mergeMap((action) => this.authService.onSignIn(action.user)
      .pipe(
        map((user) => SIGN_IN_DONE({user})),
        catchError((err) => of(SIGN_IN_REFUSED({errors: err.error})))
      )
    ),
  ));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_UP),
    mergeMap((action) => this.authService.onSignUp(action.user)
      .pipe(
        map((user) => SIGN_UP_DONE({user})),
        catchError((err) => of(SIGN_UP_FAIL({errors: err.error})))
      )
    ),
  ));

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_OUT),
    mergeMap(() => this.authService.onSignOut()),
    tap(() => {
      this.router.navigate(['/'], {replaceUrl: true});
    })
  ), {dispatch: false});

  navigateAfterSignIn$ = createEffect(() => this.actions$.pipe(
    ofType(SIGN_IN_DONE, SIGN_UP_DONE),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), {dispatch: false});

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_USER),
    mergeMap(() => this.userService.me()
      .pipe(
        map((user) => LOAD_USER_DONE({user})),
        catchError((e) => of(LOAD_USER_FAILED({errors: e.error})))
      ),
    )
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_USER),
    mergeMap((action) => this.userService.update(action.user)
      .pipe(
        map((user) => UPDATE_USER_DONE({user})),
        catchError((e) => of(UPDATE_USER_FAILED({errors: e.error})))
      ),
    )
  ));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private userService: UsersService,
              private router: Router) {
  }

}
