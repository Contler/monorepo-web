import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IconsService } from './services/icons/icons.service';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  imports: [CommonModule, AngularFireDatabaseModule],
  providers: [IconsService],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class UiModule {}
