import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceComponent } from './ecommerce.component';
import { EcommerceRoutingModule } from '@contler/hotel/ecommerce/ecommerce-routing.module';
import { PreferencesModule } from '@contler/hotel/preferences/preferences.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '@contler/hotel/directives/directives.module';
import { CreateEcommerceComponent } from './create-ecommerce/create-ecommerce.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { UiModule } from '@contler/ui';

@NgModule({
  declarations: [EcommerceComponent, CreateEcommerceComponent],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    PreferencesModule,
    TranslateModule,
    MaterialModule,
    DynamicTranslateModule,
    DirectivesModule,
    ReactiveFormsModule,
    NgxMaskModule,
    UiModule,
  ],
})
export class EcommerceModule {}
