import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ProductEntity } from '@contler/entity';
import * as OrderAction from './order.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const orderFeatureKey = 'order';

export interface ProductOrder {
  product: ProductEntity;
  quantity: number;
}

export interface State extends EntityState<ProductOrder> {
  totalPrice: number;
}

// ************************************************************************************************
// Entity adapter
// ************************************************************************************************

export const orderAdapter = createEntityAdapter<ProductOrder>({
  selectId: (pro) => pro.product.id,
});

export const initialState: State = orderAdapter.getInitialState({
  totalPrice: 0,
});

export const { selectAll, selectTotal } = orderAdapter.getSelectors();

// ************************************************************************************************
// Reducer
// ************************************************************************************************
export const reducer = createReducer(
  initialState,
  on(OrderAction.AddProduct, (state, { product, quantity }) => {
    let newState: State;
    if (quantity === 0) {
      newState = orderAdapter.removeOne(product.id, state);
    } else if (quantity === 1) {
      newState = state.entities[product.id]
        ? orderAdapter.updateOne({ id: product.id, changes: { quantity } }, state)
        : orderAdapter.addOne({ product, quantity }, state);
    } else {
      newState = orderAdapter.updateOne({ id: product.id, changes: { quantity } }, state);
    }
    const newPrices = selectAll(newState).reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.quantity * currentValue.product.value,
      0,
    );
    return { ...newState, totalPrice: newPrices };
  }),
);
