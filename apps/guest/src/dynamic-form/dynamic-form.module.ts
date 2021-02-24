import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormServicesComponent } from './dynamic-form-services.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@contler/core';

@NgModule({
  declarations: [DynamicFormServicesComponent],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    CommonComponentsModule,
    MatProgressSpinnerModule,
    DynamicServicesModule,
    DynamicTranslateModule,
    TranslateModule,
    MatButtonModule,
    CoreModule,
  ],
})
export class DynamicFormModule {}
