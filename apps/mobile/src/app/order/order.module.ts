import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { CoreModule } from '@contler/core';
import { MaterialModule } from '../material/material.module';
import { OrderPendingComponent } from './pages/order-pending/order-pending.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [OrderComponent, OrderPendingComponent, OrderCompleteComponent, ItemComponent],
  imports: [CommonModule, OrderRoutingModule, CoreModule, MaterialModule, IonicModule],
})
export class OrderModule {}
