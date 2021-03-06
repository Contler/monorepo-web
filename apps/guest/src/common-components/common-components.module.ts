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
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { OptionRequestComponent } from './option-request/option-request.component';
import { OptionGridComponent } from './option-grid/option-grid.component';
import { MatMenuModule } from '@angular/material/menu';
import { SwitchComponent } from './swith/switch.component';
import { FilterListComponent } from './filter-list/filter-list.component';
import { MatListModule } from '@angular/material/list';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

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
    OptionRequestComponent,
    OptionGridComponent,
    SwitchComponent,
    FilterListComponent,
    BottomBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RatingModule,
    PipesModule,
    UiModule,
    RouterModule,
    FormsModule,
    TranslateModule,
    DynamicTranslateModule,
    MatMenuModule,
    MatListModule,
  ],
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
    OptionRequestComponent,
    OptionGridComponent,
    SwitchComponent,
    BottomBarComponent,
  ],
  providers: [UserService, AvalibleUserGuard],
})
export class CommonComponentsModule {}
