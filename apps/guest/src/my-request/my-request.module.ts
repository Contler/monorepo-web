import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRequestRoutingModule } from './my-request-routing.module';
import { MyRequestComponent } from './my-request.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { RequestItemComponent } from './components/request-item/request-item.component';
import { DynamicTranslateModule } from '@contler/dynamic-translate';

@NgModule({
  declarations: [MyRequestComponent, RequestItemComponent],
  imports: [
    CommonModule,
    MyRequestRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
  ],
})
export class MyRequestModule {}
