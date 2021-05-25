import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';

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
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
  ],
})
export class ProductModule {}
