import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'guest/app/reducers';
import { Store } from '@ngrx/store';
import * as OrderReducer from 'guest/app/reducers/order/order.reducer';
import { orderFeatureKey } from 'guest/app/reducers/order/order.reducer';
import { Observable } from 'rxjs';
import { ProductEntity } from '@contler/entity';
import * as OrderAction from 'guest/app/reducers/order/order.actions';

@Component({
  selector: 'contler-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent {
  products$: Observable<OrderReducer.ProductOrder[]>;
  total$: Observable<number>;

  constructor(private router: Router, private store: Store<State>) {
    this.products$ = this.store.select((state) => OrderReducer.selectAll(state[orderFeatureKey]));
    this.total$ = this.store.select((state) => state[orderFeatureKey].totalPrice);
  }

  updateProduct(product: ProductEntity, quantity: number) {
    this.store.dispatch(OrderAction.AddProduct({ product, quantity }));
  }

  nextStep() {
    this.router.navigate(['/home/product/finish']);
  }
}
