import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { EmployerEntity, HotelEntity } from '@contler/entity';

export const userFeatureKey = 'user';

export interface UserState {
  user: EmployerEntity;
  hotel: HotelEntity;
}

export const initialState: UserState = {
  user: null,
  hotel: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.setUser, (state, { employer }) => ({ ...state, user: employer, hotel: employer.hotel })),
);
