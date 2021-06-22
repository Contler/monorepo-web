import { createAction, props } from '@ngrx/store';
import { EmployerEntity } from '@contler/entity';

export const loadUser = createAction('[User] Load Users', props<{ uid: string }>());

export const setUser = createAction('[User] Set user', props<{ employer: EmployerEntity }>());
