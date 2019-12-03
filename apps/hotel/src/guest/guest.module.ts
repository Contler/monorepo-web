import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './page/guest/guest.component';
import { CoreModule, UserService } from '@contler/core';
import { MaterialModule } from 'hotel/material/material.module';
import { ModelNewGuestComponent } from './components/model-new-guest/model-new-guest.component';
import { RoomService } from 'hotel/room/services/room.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GuestService } from 'hotel/guest/services/guest.service';
import { ModalEditGuestComponent } from './components/modal-edit-guest/modal-edit-guest.component';


@NgModule({
  declarations: [GuestComponent, ModelNewGuestComponent, ModalEditGuestComponent],
  entryComponents: [ModelNewGuestComponent, ModalEditGuestComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [RoomService, GuestService, UserService]
})
export class GuestModule { }
