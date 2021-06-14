import { createAction, props } from '@ngrx/store';
import { GuestEntity } from '@contler/entity';

export const loadUsers = createAction('[User] Load User', props<{ uid: string }>());

export const setUser = createAction('[User] set user data', props<{ user: GuestEntity }>());
