import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CommonComponentsModule } from 'guest/common-components/common-components.module';
import { MaterialModule } from 'guest/material/material.module';
import { CoreModule } from '@contler/core';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { FinishOrderComponent } from './pages/finish-order/finish-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './pages/order/order.component';
import { ActiveOrderPipe } from 'guest/product/pipes/active-order.pipe';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompleteOrderModalComponent } from './components/complete-order-modal/complete-order-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductComponent,
    ConfirmOrderComponent,
    FinishOrderComponent,
    OrderComponent,
    ActiveOrderPipe,
    OrderDetailComponent,
    CompleteOrderModalComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    TranslateModule,
  ],
})
export class ProductModule {}
