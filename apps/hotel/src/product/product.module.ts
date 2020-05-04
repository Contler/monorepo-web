import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { EditProductComponent } from './pages/edit-product/edit-product.component';


@NgModule({
  declarations: [ProductComponent, ModalProductComponent, EditProductComponent],
  entryComponents: [ModalProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
  ],
})
export class ProductModule { }