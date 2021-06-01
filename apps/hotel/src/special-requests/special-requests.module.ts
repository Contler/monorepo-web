import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialRequestsComponent } from './page/special-requests/special-requests.component';
import { SpecialRequestsRoutingModule } from './special-requests-routing.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [SpecialRequestsComponent],
  imports: [
    CommonModule,
    SpecialRequestsRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    FormsModule,
    DynamicTranslateModule,
    TranslateModule,
    DirectivesModule,
  ],
})
export class SpecialRequestsModule {}
