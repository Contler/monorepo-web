import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CleaningRoutingModule } from './cleaning-routing.module';
import { CleaningComponent } from './cleaning.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { DynamicServicesModule } from '@contler/dynamic-services';

@NgModule({
  declarations: [CleaningComponent],
  imports: [
    CommonModule,
    CleaningRoutingModule,
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
export class CleaningModule {}
