import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './page/guest/guest.component';
import { CoreModule } from '@contler/core';
import { MaterialModule } from 'hotel/material/material.module';
import { ModelNewGuestComponent } from './components/model-new-guest/model-new-guest.component';
import { RoomService } from 'hotel/room/services/room.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GuestService } from 'hotel/guest/services/guest.service';


@NgModule({
  declarations: [GuestComponent, ModelNewGuestComponent],
  entryComponents: [ModelNewGuestComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [RoomService, GuestService]
})
export class GuestModule { }
