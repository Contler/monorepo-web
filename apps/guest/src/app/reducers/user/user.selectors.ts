import { createFeatureSelector, select } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { pipe } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

export const selectUserState = pipe(
  select(createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey)),
  filter((data) => !!data && !!data.user),
  first(),
);
