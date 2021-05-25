import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DynamicServicesModule } from '@contler/dynamic-services';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
    DynamicServicesModule,
  ],
})
export class MaintenanceModule {}
