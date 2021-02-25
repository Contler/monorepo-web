import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { DynamicServicesModule } from '@contler/dynamic-services';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
    ReactiveFormsModule,
    MatSortModule,
    DynamicServicesModule,
  ],
})
export class MaintenanceModule {}
