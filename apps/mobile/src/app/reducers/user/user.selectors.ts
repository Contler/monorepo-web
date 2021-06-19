import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey);

export const selectEmployer = createSelector(selectUserState, (state) => state.user);

export const selectHotel = createSelector(selectUserState, (state) => state.hotel);
