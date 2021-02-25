import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleaningRoutingModule } from './cleaning-routing.module';
import { CleaningComponent } from './cleaning.component';
import { CleaningItemComponent } from './components/cleaning-item/cleaning-item.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { DynamicTranslateModule } from '@contler/dynamic-translate';

@NgModule({
  declarations: [CleaningComponent, CleaningItemComponent],
  imports: [
    CommonModule,
    CleaningRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
    DynamicServicesModule,
  ],
})
export class CleaningModule {}
