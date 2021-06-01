import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './page/room/room.component';
import { RoomRoutingModule } from './room-routing.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoneService } from '@contler/hotel/zone/services/zone.service';
import { CoreModule } from '@contler/core';
import { RoomService } from '@contler/hotel/room/services/room.service';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { MultiRoomComponent } from './components/multi-room/multi-room.component';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '@contler/hotel/directives/directives.module';

@NgModule({
  declarations: [RoomComponent, SingleRoomComponent, MultiRoomComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CommonComponentsModule,
    NgxMaskModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
  ],
  providers: [ZoneService, RoomService],
  entryComponents: [],
})
export class RoomModule {}
