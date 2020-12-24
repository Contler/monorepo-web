import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveSpecialRequestsPageRoutingModule } from './active-special-requests-routing.module';

import { ActiveSpecialRequestsPage } from './active-special-requests.page';
import { ModalsModule } from '../../../modals/modals.module';
import { MaterialModule } from '../../../material/material.module';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@contler/ui';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveSpecialRequestsPageRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    PipesModule,
    ModalsModule,
    TranslateModule,
    UiModule,
  ],
  declarations: [ActiveSpecialRequestsPage],
})
export class ActiveSpecialRequestsPageModule {}
