import {User} from '../../core/models/user';
import {Action, createReducer, on} from '@ngrx/store';
import {
  ALREADY_LOGGED_IN,
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
import {LocalStorage} from '../../utils/storage';

export const featureKey = 'auth';

export interface AuthState {
  user: User;
  token: string;
  errors: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  errors: undefined,
  loading: false
};

const authReducer = createReducer(initialState,
  on(SIGN_IN,
    SIGN_UP,
    LOAD_USER,
    UPDATE_USER,
    (state) => ({...state, loading: true})),
  on(SIGN_IN_DONE,
    SIGN_UP_DONE,
    (state, {user}) => ({...state, user, errors: undefined, loading: false})),
  on(SIGN_OUT, () => initialState),
  on(ALREADY_LOGGED_IN,
    (state, {token}) => ({...state, token, loading: false, user: LocalStorage.user()})),
  on(SIGN_IN_REFUSED,
    SIGN_UP_FAIL,
    LOAD_USER_FAILED,
    UPDATE_USER_FAILED,
    (state, {errors}) => ({...state, errors: errors.error, loading: false})),
  on(LOAD_USER_DONE,
    UPDATE_USER_DONE,
    (state, {user}) => ({...state, user, loading: false}))
);

export function reducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducer(state, action);
}
