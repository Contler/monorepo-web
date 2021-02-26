import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InmediateRequestsPageRoutingModule } from './inmediate-requests-routing.module';

import { InmediateRequestsPage } from './inmediate-requests.page';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { CommonComponentsModule } from '../../common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InmediateRequestsPageRoutingModule,
    TranslateModule,
    DynamicTranslateModule,
    CommonComponentsModule,
  ],
  declarations: [InmediateRequestsPage],
})
export class InmediateRequestsPageModule {}
