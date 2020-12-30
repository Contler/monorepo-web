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
import { RatingModule } from 'ng-starrating';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadyInmediateRequestsPageRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    PipesModule,
    ModalsModule,
    RatingModule,
    TranslateModule,
    DynamicTranslateModule,
  ],
  declarations: [ReadyInmediateRequestsPage],
  entryComponents: [],
})
export class ReadyInmediateRequestsPageModule {}
