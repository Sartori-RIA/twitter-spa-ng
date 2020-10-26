import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SIGN_IN, SIGN_IN_DONE, SIGN_IN_REFUSED, SIGN_OUT, SIGN_UP, SIGN_UP_DONE, SIGN_UP_FAIL} from './auth.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../core/api/auth.service';

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
    ofType(SIGN_IN_DONE),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {
  }

}
