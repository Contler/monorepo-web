import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { MatSortModule } from '@angular/material/sort';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { ModalReceptionComponent } from '../inmediate-requests/components/modal-reception/modal-reception.component';

@NgModule({
  declarations: [ReceptionComponent, ModalReceptionComponent],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    DirectivesModule,
    TranslateModule,
    FormsModule,
    DynamicTranslateModule,
    ReactiveFormsModule,
    MatSortModule,
    DynamicServicesModule,
  ],
})
export class ReceptionModule {}
