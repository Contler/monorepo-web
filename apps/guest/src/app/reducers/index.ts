import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as OrderReducer from './order/order.reducer';
import * as UserReducer from './user/user.reducer';

export interface State {
  [OrderReducer.orderFeatureKey]: OrderReducer.State;
  [UserReducer.userFeatureKey]: UserReducer.UserState;
}

export const reducers: ActionReducerMap<State> = {
  [OrderReducer.orderFeatureKey]: OrderReducer.reducer,
  [UserReducer.userFeatureKey]: UserReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
