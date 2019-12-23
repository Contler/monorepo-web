import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InmediateRequestsPageRoutingModule } from './inmediate-requests-routing.module';

import { InmediateRequestsPage } from './inmediate-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InmediateRequestsPageRoutingModule
  ],
  declarations: [InmediateRequestsPage]
})
export class InmediateRequestsPageModule {}
