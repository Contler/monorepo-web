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
  ],
  exports: [
    ToolbarComponent,
    LogoComponent,
    SearchbarComponent,
    MenuItemComponent,
    ColorHotelDirective,
    BtnHotelDirective,
    ReceptionItemComponent,
  ],
  imports: [CommonModule, IonicModule, MaterialModule, FormsModule],
})
export class CommonComponentsModule {}
