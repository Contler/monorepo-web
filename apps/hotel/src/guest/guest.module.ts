import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './page/guest/guest.component';
import { CoreModule, UserService } from '@contler/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalEditGuestComponent } from './components/modal-edit-guest/modal-edit-guest.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';
import { MaterialModule } from '../material/material.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { RoomService } from '../room/services/room.service';
import { GuestService } from './services/guest.service';
import { NewGuestComponent } from './components/new-guest/new-guest.component';

@NgModule({
  declarations: [GuestComponent, ModalEditGuestComponent, NewGuestComponent],
  entryComponents: [ModalEditGuestComponent],
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
    DirectivesModule,
  ],
  providers: [RoomService, GuestService, UserService],
})
export class GuestModule {}
