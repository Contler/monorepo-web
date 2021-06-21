import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey);

export const selectEmployer = pipe(
  select(createSelector(selectUserState, (state) => state.user)),
  filter((user) => !!user),
);

export const selectHotel = pipe(
  select(createSelector(selectUserState, (state) => state.hotel)),
  filter((hotel) => !!hotel),
);
