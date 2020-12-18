import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialRequestsPageRoutingModule } from './special-requests-routing.module';

import { SpecialRequestsPage } from './special-requests.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SpecialRequestsPageRoutingModule, TranslateModule],
  declarations: [SpecialRequestsPage],
})
export class SpecialRequestsPageModule {}
