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
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { FormsModule } from '@angular/forms';
import { CheckOrdersService } from './services/check-orders.service';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderComponent,
    OrderPendingComponent,
    OrderCompleteComponent,
    ItemComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CoreModule,
    MaterialModule,
    IonicModule,
    FormsModule,
    CommonComponentsModule,
    TranslateModule,
  ],
  providers: [CheckOrdersService],
})
export class OrderModule {}
