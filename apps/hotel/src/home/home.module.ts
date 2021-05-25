import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '@contler/hotel/home/home-routing.module';
import { AdminHomeComponent } from '@contler/hotel/home/page/admin-home/admin-home.component';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    TranslateModule,
    DirectivesModule,
  ],
})
export class HomeModule {}
