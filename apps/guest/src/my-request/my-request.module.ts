import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRequestRoutingModule } from './my-request-routing.module';
import { MyRequestComponent } from './my-request.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { RequestItemComponent } from './components/request-item/request-item.component';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DetailRequestComponent } from './pages/detail-request/detail-request.component';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyRequestComponent, RequestItemComponent, DetailRequestComponent],
  imports: [
    CommonModule,
    MyRequestRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
    DynamicServicesModule,
    MaterialModule,
    FormsModule,
  ],
})
export class MyRequestModule {}
