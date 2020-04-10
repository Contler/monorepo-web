import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CommonComponentsModule } from "guest/common-components/common-components.module";
import { MaterialModule } from "guest/material/material.module";
import { CoreModule } from '@contler/core';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { FinishOrderComponent } from './pages/finish-order/finish-order.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductComponent, ConfirmOrderComponent, FinishOrderComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    CoreModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule { }
