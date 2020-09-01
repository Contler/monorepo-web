import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from './order.component';
import { ViewOrderComponent } from 'hotel/order/pages/view-order/view-order.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':id', component: ViewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
