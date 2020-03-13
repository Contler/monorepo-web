import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LogoComponent } from './logo/logo.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MaterialModule } from '../material/material.module';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  declarations: [ToolbarComponent, LogoComponent, SearchbarComponent, MenuItemComponent],
  exports: [ToolbarComponent, LogoComponent, SearchbarComponent, MenuItemComponent],
  imports: [CommonModule, IonicModule, MaterialModule]
})
export class CommonComponentsModule {}
