import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';
import { UpdateInformationalMessageComponent } from './modals/update-informational-message/update-informational-message.component';
import { UiModule } from '@contler/ui';

@NgModule({
  declarations: [OrderComponent, ViewOrderComponent, UpdateInformationalMessageComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    OrderRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
    UiModule,
  ],
})
export class OrderModule {}
