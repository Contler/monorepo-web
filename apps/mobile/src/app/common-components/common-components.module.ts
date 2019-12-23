import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LogoComponent } from './logo/logo.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ToolbarComponent, LogoComponent, SearchbarComponent],
  exports: [ToolbarComponent, LogoComponent, SearchbarComponent],
  imports: [CommonModule, IonicModule, MaterialModule]
})
export class CommonComponentsModule {}
