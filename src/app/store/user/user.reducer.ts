import {Action, createReducer, on} from '@ngrx/store';
import {
  LOAD_USER,
  LOAD_USER_DONE,
  LOAD_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_DONE,
  UPDATE_USER_FAILED
} from './user.actions';
import {User} from '../../core/models/user';

export const featureKey = 'user';

export interface UserState {
  user: User;
  loading: boolean;
}

const profileInitialState: UserState = {
  user: undefined,
  loading: false,
};

const userReducer = createReducer(profileInitialState,
  on(LOAD_USER,
    UPDATE_USER,
    (state) => ({...state, loading: true})),
  on(LOAD_USER_FAILED,
    UPDATE_USER_FAILED,
    (state) => ({...state, loading: false})),
  on(LOAD_USER_DONE,
    UPDATE_USER_DONE, (state, {user}) => ({
      ...state,
      user,
      loading: false
    })
  ),
);

export function reducer(state: UserState | undefined, action: Action): UserState {
  return userReducer(state, action);
}
