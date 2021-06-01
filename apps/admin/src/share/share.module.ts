import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, MenuComponent],
  exports: [ToolbarComponent, MenuComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
})
export class ShareModule {}
