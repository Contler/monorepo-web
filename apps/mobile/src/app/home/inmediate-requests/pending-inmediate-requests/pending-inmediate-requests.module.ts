import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingInmediateRequestsPageRoutingModule } from './pending-inmediate-requests-routing.module';

import { PendingInmediateRequestsPage } from './pending-inmediate-requests.page';
import { ModalsModule } from '../../../modals/modals.module';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { MaterialModule } from '../../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingInmediateRequestsPageRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    ModalsModule
  ],
  declarations: [PendingInmediateRequestsPage],
  entryComponents: []
})
export class PendingInmediateRequestsPageModule {}
