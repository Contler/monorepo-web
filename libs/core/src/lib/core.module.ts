import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [CommonModule, MatCheckboxModule],
  declarations: [ButtonDirective, ZoneListComponent],
  exports: [ButtonDirective, ZoneListComponent],
  entryComponents: []
})
export class CoreModule {}
