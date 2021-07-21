import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { ConfirmOrderComponent } from 'guest/product/pages/confirm-order/confirm-order.component';
import { FinishOrderComponent } from 'guest/product/pages/finish-order/finish-order.component';
import { OrderComponent } from 'guest/product/pages/order/order.component';
import { OrderDetailComponent } from 'guest/product/pages/order-detail/order-detail.component';

const routes: Routes = [
  { path: '', component: OrderComponent, data: { module: 'restaurant' } },
  { path: 'create', component: ProductComponent },
  { path: 'order', component: ConfirmOrderComponent },
  { path: 'finish', component: FinishOrderComponent },
  { path: ':id', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductOrderService],
})
export class ProductRoutingModule {}
