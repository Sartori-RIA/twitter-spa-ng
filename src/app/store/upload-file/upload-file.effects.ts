import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UPLOAD_CANCEL, UPLOAD_COMPLETED, UPLOAD_FAILURE, UPLOAD_PROGRESS, UPLOAD_REQUEST, UPLOAD_STARTED} from './upload-file.actions';
import {catchError, concatMap, map, takeUntil} from 'rxjs/operators';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../index';
import {TypedAction} from '@ngrx/store/src/models';
import {UsersService} from '../../core/api/users.service';
import {User} from '../../core/models/user';

@Injectable()
export class UploadFileEffects {
  sendAvatar$ = createEffect(() => this.actions$.pipe(
    ofType(UPLOAD_REQUEST),
    concatMap(({file, entityId, entityCouncil, entityState, type}) => {
      let observable: Observable<HttpEvent<User>>;
      if (type === 'avatar') {
        observable = this.userService.userImage(entityId, file);
      } else {
        observable = this.userService.userBanner(entityId, file);
      }
      return observable.pipe(
        takeUntil(this.actions$.pipe(ofType(UPLOAD_CANCEL))),
        map(event => this.getActionFromHttpEvent(event)),
        catchError(() => of(UPLOAD_FAILURE({error: ''})))
      );
    })
  ));

  sendBanner = createEffect(() => this.actions$.pipe(
    ofType(UPLOAD_REQUEST),
    concatMap(({file, entityId, entityCouncil, entityState}) => this.userService.userBanner(entityId, file).pipe(
      takeUntil(this.actions$.pipe(ofType(UPLOAD_CANCEL))),
      map(event => this.getActionFromHttpEvent(event)),
      catchError(() => of(UPLOAD_FAILURE({error: ''})))
    ))
  ));

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private userService: UsersService) {
  }

  private getActionFromHttpEvent(event: HttpEvent<any>): TypedAction<string> {
    console.log(event);
    switch (event.type) {
      case HttpEventType.Sent:
        return UPLOAD_STARTED();
      case HttpEventType.UploadProgress:
        return UPLOAD_PROGRESS({progress: Math.round((100 * event.loaded) / event.total)});
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response:
        if (event.status === 200) {
          return UPLOAD_COMPLETED();
        } else {
          return UPLOAD_FAILURE({error: event.statusText});
        }
      default:
        return UPLOAD_FAILURE({error: ''});
    }
  }
}
