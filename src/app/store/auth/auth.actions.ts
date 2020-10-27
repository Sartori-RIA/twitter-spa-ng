import {createAction, props} from '@ngrx/store';
import {SignInPayload, User} from '../../core/models/user';

export const SIGN_IN = createAction('[AUTH/API] sign in', props<{ user: SignInPayload }>());

export const SIGN_IN_DONE = createAction('[AUTH/API] sign in done', props<{ user: User }>());

export const SIGN_IN_REFUSED = createAction('[AUTH/API] sign refused', props<{ errors: { error: string } }>());

export const SIGN_OUT = createAction('[AUTH/API] sign out');

export const ALREADY_LOGGED_IN = createAction('[AUTH/PAGE] already loggedIn', props<{ token: string }>());

export const SIGN_UP = createAction('[AUTH/API] sign up', props<{ user: User }>());

export const SIGN_UP_DONE = createAction('[AUTH/API] sign up done', props<{ user: User }>());

export const SIGN_UP_FAIL = createAction('[AUTH/API] sign up fail', props<{ errors: { error: string } }>());

export const LOAD_USER = createAction('[USER/API] fetch USER');

export const LOAD_USER_DONE = createAction('[USER/API] fetch USER done', props<{ user: User }>());

export const LOAD_USER_FAILED = createAction('[USER/API] fetch USER fail', props<{ errors: { error: string } }>());

export const UPDATE_USER = createAction('[USER/API] update USER', props<{ user: User }>());

export const UPDATE_USER_DONE = createAction('[USER/API] update USER done', props<{ user: User }>());

export const UPDATE_USER_FAILED = createAction('[USER/API] update USER fail', props<{ errors: { error: string } }>());
