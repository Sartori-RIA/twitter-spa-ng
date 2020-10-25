import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './user.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UsersService} from '../../core/api/users.service';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_USER),
    mergeMap(() => this.userService.me()
      .pipe(
        map((user) => LOAD_USER_DONE({user})),
        catchError(() => of(LOAD_USER_FAILED()))
      ),
    )
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_USER),
    mergeMap((action) => this.userService.update(action.user)
      .pipe(
        map((user) => UPDATE_USER_DONE({user})),
        catchError(() => of(UPDATE_USER_FAILED()))
      ),
    )
  ));

  constructor(private actions$: Actions,
              private userService: UsersService) {
  }
}
