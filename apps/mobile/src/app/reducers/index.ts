import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as userReducer from './user/user.reducer';
import * as requestReducer from './request/request.reducer';

export interface State {
  [userReducer.userFeatureKey]: userReducer.UserState;
  [requestReducer.requestFeatureKey]: requestReducer.RequestState;
}

export const reducers: ActionReducerMap<State> = {
  [userReducer.userFeatureKey]: userReducer.reducer,
  [requestReducer.requestFeatureKey]: requestReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
