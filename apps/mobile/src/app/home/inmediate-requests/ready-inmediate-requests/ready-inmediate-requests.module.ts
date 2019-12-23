import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadyInmediateRequestsPageRoutingModule } from './ready-inmediate-requests-routing.module';

import { ReadyInmediateRequestsPage } from './ready-inmediate-requests.page';
import { ModalsModule } from '../../../modals/modals.module';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { MaterialModule } from '../../../material/material.module';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadyInmediateRequestsPageRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    PipesModule,
    ModalsModule
  ],
  declarations: [ReadyInmediateRequestsPage],
  entryComponents: []
})
export class ReadyInmediateRequestsPageModule {}
