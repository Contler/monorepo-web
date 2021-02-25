import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialRequestsPageRoutingModule } from './special-requests-routing.module';

import { SpecialRequestsPage } from './special-requests.page';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@contler/ui';
import { CommonComponentsModule } from '../../common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialRequestsPageRoutingModule,
    TranslateModule,
    UiModule,
    CommonComponentsModule,
  ],
  declarations: [SpecialRequestsPage],
})
export class SpecialRequestsPageModule {}
