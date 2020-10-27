import {createAction, props} from '@ngrx/store';

export type UPLOAD_TYPE = 'banner' | 'avatar';

export const UPLOAD_REQUEST = createAction('[File Upload Form] Request', props<{
  file: File,
  entityId?: number,
  entityCouncil?: string,
  entityState?: string,
  fieldType?: UPLOAD_TYPE
}>());

export const UPLOAD_CANCEL = createAction('[File Upload Form] Cancel');

export const UPLOAD_RESET = createAction('[File Upload Form] Reset');

export const UPLOAD_STARTED = createAction('[File Upload Form] Started');

export const UPLOAD_COMPLETED = createAction('[File Upload Form] Success');

export const UPLOAD_PROGRESS = createAction('[File Upload Form] Progress', props<{ progress: number }>());

export const UPLOAD_FAILURE = createAction('[File Upload Form] Progress', props<{ error: string }>());
