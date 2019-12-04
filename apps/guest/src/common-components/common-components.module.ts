import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MarcoComponent } from './marco/marco.component';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent, MarcoComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, SidebarComponent, MarcoComponent],
})
export class CommonComponentsModule {}
