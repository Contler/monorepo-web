import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, SidebarComponent],
})
export class CommonComponentsModule {}
