import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './page/guest/guest.component';
import { CoreModule, UserService } from '@contler/core';
import { MaterialModule } from 'hotel/material/material.module';
import { ModelNewGuestComponent } from './components/model-new-guest/model-new-guest.component';
import { RoomService } from 'hotel/room/services/room.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestService } from 'hotel/guest/services/guest.service';
import { ModalEditGuestComponent } from './components/modal-edit-guest/modal-edit-guest.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';

@NgModule({
  declarations: [GuestComponent, ModelNewGuestComponent, ModalEditGuestComponent],
  entryComponents: [ModelNewGuestComponent, ModalEditGuestComponent],
  imports: [
    CommonModule,
    GuestRoutingModule,
    CoreModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    FormsModule,
    TranslateModule,
    DynamicTranslateModule,
  ],
  providers: [RoomService, GuestService, UserService],
})
export class GuestModule {}
