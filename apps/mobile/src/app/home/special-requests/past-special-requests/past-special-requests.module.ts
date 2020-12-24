import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastSpecialRequestsPageRoutingModule } from './past-special-requests-routing.module';

import { PastSpecialRequestsPage } from './past-special-requests.page';
import { ModalsModule } from '../../../modals/modals.module';
import { MaterialModule } from '../../../material/material.module';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PastSpecialRequestsPageRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    ModalsModule,
    TranslateModule,
    DynamicTranslateModule,
  ],
  declarations: [PastSpecialRequestsPage],
})
export class PastSpecialRequestsPageModule {}
