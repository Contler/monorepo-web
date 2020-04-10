import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductOrderService } from 'guest/product/services/product-order.service';
import { ConfirmOrderComponent } from 'guest/product/pages/confirm-order/confirm-order.component';
import { FinishOrderComponent } from 'guest/product/pages/finish-order/finish-order.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'order', component: ConfirmOrderComponent },
  { path: 'finish', component: FinishOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProductOrderService],
})
export class ProductRoutingModule {}
