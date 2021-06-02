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
import { ImmediateItemComponent } from './components/inmediate-item/immediate-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { FilterSpecialPipe } from './pipes/filter-special.pipe';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FilterRequestPipe } from './pipes/filter-request.pipe';

@NgModule({
  declarations: [
    MyRequestComponent,
    RequestItemComponent,
    DetailRequestComponent,
    ImmediateItemComponent,
    FilterSpecialPipe,
    FilterRequestPipe,
  ],
  imports: [
    CommonModule,
    MyRequestRoutingModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
    DynamicServicesModule,
    MaterialModule,
    FormsModule,
    MatMenuModule,
    MatBottomSheetModule,
  ],
})
export class MyRequestModule {}
