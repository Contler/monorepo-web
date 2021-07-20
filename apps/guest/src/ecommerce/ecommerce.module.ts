import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';
import { CommonComponentsModule } from 'guest/common-components/common-components.module';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { MaterialModule } from 'guest/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EcommerceComponent],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    CommonComponentsModule,
    DynamicTranslateModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class EcommerceModule {}
