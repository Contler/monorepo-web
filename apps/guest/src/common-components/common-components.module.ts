import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MarcoComponent } from './marco/marco.component';
import { ScoreComponent } from './score/score.component';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from 'guest/pipes/pipes.module';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent, MarcoComponent, ScoreComponent],
  imports: [CommonModule, MaterialModule, RatingModule, PipesModule],
  exports: [ToolbarComponent, SidebarComponent, MarcoComponent, ScoreComponent],
})
export class CommonComponentsModule {}
