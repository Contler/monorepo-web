import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '@contler/ui';
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
import { ModalCompleteComponent } from './modal-complete/modal-complete.component';
import { RouterModule } from '@angular/router';
import { UserService } from '@contler/core';
import { AvalibleUserGuard } from './guards/avalible-user.guard';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    MarcoComponent,
    ScoreComponent,
    ColorHotelDirective,
    ColorBtnHotelDirective,
    BtnMenuHotelDirective,
    ModalCompleteComponent,
  ],
  imports: [CommonModule, MaterialModule, RatingModule, PipesModule, UiModule, RouterModule],
  exports: [
    ToolbarComponent,
    SidebarComponent,
    MarcoComponent,
    ScoreComponent,
    ColorHotelDirective,
    ColorBtnHotelDirective,
    BtnMenuHotelDirective,
    ModalCompleteComponent,
    UiModule,
    AvalibleUserGuard,
  ],
  providers: [UserService, AvalibleUserGuard],
})
export class CommonComponentsModule {}
