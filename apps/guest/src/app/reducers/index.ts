import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as OrderReducer from './order/order.reducer';

export interface State {
  [OrderReducer.orderFeatureKey]: OrderReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  [OrderReducer.orderFeatureKey]: OrderReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
