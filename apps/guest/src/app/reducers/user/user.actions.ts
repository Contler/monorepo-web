import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load User', props<{ uid: string }>());
