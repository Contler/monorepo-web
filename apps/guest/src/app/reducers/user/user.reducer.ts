import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { GuestEntity, HotelEntity } from '@contler/entity';

export const userFeatureKey = 'user';

export interface UserState {
  user: GuestEntity;
  hotel: HotelEntity;
}

export const initialState: UserState = {
  user: null,
  hotel: null,
};

export const reducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => state),
);
