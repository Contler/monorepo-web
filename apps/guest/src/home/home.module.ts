import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GuestRequestsComponent } from './pages/guest-requests/guest-requests.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { ZoneRequestComponent } from './pages/zone-request/zone-request.component';
import { CoreModule } from '@contler/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialRequestComponent } from './pages/special-request/special-request.component';
import { MyInmediateRequestsComponent } from './pages/my-inmediate-requests/my-inmediate-requests.component';
import { PipesModule } from 'guest/pipes/pipes.module';
import { InmediateRequestComponent } from './pages/inmediate-request/inmediate-request.component';
import { ModalQualifyComponent } from './components/modal-qualify/modal-qualify.component';
import { RatingModule } from 'ng-starrating';
import { MessagesModule } from 'guest/services/messages/messages.module';
import { WakeUpComponent } from './pages/wake-up/wake-up.component';
import { CreateWakeComponent } from './pages/create-wake/create-wake.component';
import { ModalBookingQualifyComponent } from './components/modal-booking-qualify/modal-booking-qualify.component';
import { ModalOrdersQuialifyComponent } from './components/modal-orders-quialify/modal-orders-quialify.component';
import { DrinkRequestComponent } from './pages/drink-request/drink-request.component';
import { UiModule } from '@contler/ui';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { ZoneItemComponent } from './pages/zone-request/zone-item/zone-item.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DirectivesModule } from '@contler/hotel/directives/directives.module';

@NgModule({
  declarations: [
    HomeComponent,
    GuestRequestsComponent,
    ZoneRequestComponent,
    SpecialRequestComponent,
    MyInmediateRequestsComponent,
    InmediateRequestComponent,
    ModalQualifyComponent,
    WakeUpComponent,
    CreateWakeComponent,
    ModalBookingQualifyComponent,
    ModalOrdersQuialifyComponent,
    DrinkRequestComponent,
    ZoneItemComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    RatingModule,
    MessagesModule,
    UiModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
  ],
  entryComponents: [ModalQualifyComponent, ModalBookingQualifyComponent, ModalOrdersQuialifyComponent],
})
export class HomeModule {}
