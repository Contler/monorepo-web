import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LogoComponent } from './logo/logo.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MaterialModule } from '../material/material.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { ColorHotelDirective } from './color-hotel.directive';
import { BtnHotelDirective } from './btn-hotel.directive';
import { ReceptionItemComponent } from './reception-item/reception-item.component';
import { RequestReceptionComponent } from './request-reception/request-reception.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DynamicItemComponent } from './dynamic-item/dynamic-item.component';
import { DynamicResultComponent } from './dynamicresult/dynamic-result.component';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { DynamicFilterPipe } from './dynamic-filter.pipe';
import { SearchListComponent } from './search-list/search-list.component';
import { RequestPendingComponent } from './request-pending/request-pending.component';
import { RequestCompleteComponent } from './request-complete/request-complete.component';
import { ModalInmediateRequestPage } from './modal-inmediate-request/modal-inmediate-request.page';
import { RatingModule } from 'ng-starrating';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ToolbarComponent,
    LogoComponent,
    SearchbarComponent,
    MenuItemComponent,
    ColorHotelDirective,
    BtnHotelDirective,
    ReceptionItemComponent,
    RequestReceptionComponent,
    DynamicItemComponent,
    DynamicResultComponent,
    DynamicFilterPipe,
    SearchListComponent,
    RequestPendingComponent,
    RequestCompleteComponent,
    ModalInmediateRequestPage,
  ],
  exports: [
    ToolbarComponent,
    LogoComponent,
    SearchbarComponent,
    MenuItemComponent,
    ColorHotelDirective,
    BtnHotelDirective,
    ReceptionItemComponent,
    DynamicItemComponent,
    DynamicFilterPipe,
    SearchListComponent,
    RequestPendingComponent,
    RequestCompleteComponent,
    ModalInmediateRequestPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    DynamicTranslateModule,
    DynamicServicesModule,
    RatingModule,
    MatDialogModule,
  ],
})
export class CommonComponentsModule {}
