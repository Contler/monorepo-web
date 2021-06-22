import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { pipe } from 'rxjs';
import { filter, first } from 'rxjs/operators';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey);

export const selectEmployer = pipe(
  select(createSelector(selectUserState, (state) => state.user)),
  filter((user) => !!user),
  first(),
);

export const selectHotel = pipe(
  select(createSelector(selectUserState, (state) => state.hotel)),
  filter((hotel) => !!hotel),
  first(),
);
