import { createAction, props } from '@ngrx/store';
import { ProductEntity } from '@contler/entity';

export const loadOrders = createAction('[Order] Load Orders');

export const AddProduct = createAction(
  '[Order] add product',
  props<{ product: ProductEntity; quantity: number }>(),
);
