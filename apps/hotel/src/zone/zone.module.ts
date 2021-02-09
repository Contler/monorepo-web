import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './page/zone/zone.component';
import { ZoneRoutingModule } from './zone-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { CoreModule } from '@contler/core';
import { ModalEditZoneComponent } from './components/modal-edit-zone/modal-edit-zone.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { UiModule } from '@contler/ui';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [ZoneComponent, ModalEditZoneComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    DynamicTranslateModule,
    TranslateModule,
    UiModule,
    DirectivesModule,
  ],
  providers: [ZoneService],
  entryComponents: [ModalEditZoneComponent],
})
export class ZoneModule {}
