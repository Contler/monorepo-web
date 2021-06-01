import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRoomComponent } from './my-room.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { CleaningComponent } from './pages/cleaning/cleaning.component';
import { MaterialModule } from '../material/material.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MyRoomRoutingModule } from './my-room.routing.module';
import { UiModule } from '@contler/ui';
import { CoreModule } from '@contler/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DynamicTranslateModule } from '@contler/dynamic-translate';

@NgModule({
  declarations: [MyRoomComponent, MaintenanceComponent, CleaningComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
    MyRoomRoutingModule,
    UiModule,
    CoreModule,
    ReactiveFormsModule,
    TranslateModule,
    DynamicTranslateModule,
  ],
})
export class MyRoomModule {}
