import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IconsService } from './services/icons/icons.service';
import { IconComponent } from './components/icon/icon.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  imports: [CommonModule, AngularFireDatabaseModule],
  providers: [IconsService],
  declarations: [IconComponent, StartComponent],
  exports: [IconComponent, StartComponent],
})
export class UiModule {}
