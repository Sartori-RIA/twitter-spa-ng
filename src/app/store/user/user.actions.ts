import {createAction, props} from '@ngrx/store';
import {User} from '../../core/models/user';

export const LOAD_USER = createAction('[USER/API] fetch USER');

export const LOAD_USER_DONE = createAction('[USER/API] fetch USER done', props<{ user: User }>());

export const LOAD_USER_FAILED = createAction('[USER/API] fetch USER fail');

export const UPDATE_USER = createAction('[USER/API] update USER', props<{ user: User }>());

export const UPDATE_USER_DONE = createAction('[USER/API] update USER done', props<{ user: User }>());

export const UPDATE_USER_FAILED = createAction('[USER/API] update USER fail');
