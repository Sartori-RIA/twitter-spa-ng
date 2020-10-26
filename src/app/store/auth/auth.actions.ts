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
