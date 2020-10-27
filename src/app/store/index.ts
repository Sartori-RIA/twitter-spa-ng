import {ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import {routerReducer} from '@ngrx/router-store';
import * as fromAuth from './auth/auth.reducer';
import {AuthState} from './auth/auth.reducer';
import * as fromUser from './user/user.reducer';
import {UserState} from './user/user.reducer';
import * as fromUploadFile from './upload-file/upload-file.reducer';
import {UploadFileState} from './upload-file/upload-file.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  auth: AuthState;
  user: UserState;
  upload_files: UploadFileState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  user: fromUser.reducer,
  upload_files: fromUploadFile.reducer
};

export const selectRouter = createFeatureSelector<AppState, fromRouter.RouterReducerState<any>>('router');

export const {
  selectCurrentRoute,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteParam,
  selectRouteParams,
  selectUrl
} = fromRouter.getSelectors(selectRouter);

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
