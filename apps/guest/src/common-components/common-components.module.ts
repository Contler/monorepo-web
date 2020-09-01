import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MarcoComponent } from './marco/marco.component';
import { ScoreComponent } from './score/score.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from 'guest/pipes/pipes.module';
import { ColorHotelDirective } from './color-hotel.directive';
import { ColorBtnHotelDirective } from './color-btn-hotel.directive';
import { BtnMenuHotelDirective } from './btn-menu-hotel.directive';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    MarcoComponent,
    ScoreComponent,
    ColorHotelDirective,
    ColorBtnHotelDirective,
    BtnMenuHotelDirective,
  ],
  imports: [CommonModule, MaterialModule, RatingModule, PipesModule],
  exports: [
    ToolbarComponent,
    SidebarComponent,
    MarcoComponent,
    ScoreComponent,
    ColorHotelDirective,
    ColorBtnHotelDirective,
    BtnMenuHotelDirective
  ],
})
export class CommonComponentsModule {}
