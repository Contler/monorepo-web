import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialRequestsPageRoutingModule } from './special-requests-routing.module';

import { SpecialRequestsPage } from './special-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialRequestsPageRoutingModule
  ],
  declarations: [SpecialRequestsPage]
})
export class SpecialRequestsPageModule {}
