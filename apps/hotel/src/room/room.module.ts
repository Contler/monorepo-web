import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './page/room/room.component';
import { RoomRoutingModule } from './room-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { CoreModule } from '@contler/core';
import { RoomService } from 'hotel/room/services/room.service';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { MultiRoomComponent } from './components/multi-room/multi-room.component';
import { NgxMaskModule } from 'ngx-mask';

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
  ],
  providers: [ZoneService, RoomService],
  entryComponents: [],
})
export class RoomModule {}
