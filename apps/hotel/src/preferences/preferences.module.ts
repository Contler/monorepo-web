import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { ModuleListComponent } from './module-list/module-list.component';
import { PreferencesHeaderComponent } from './preferences-header/preferences-header.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PreferencesComponent, WelcomeComponent, ModuleListComponent, PreferencesHeaderComponent],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    MaterialModule,
    DirectivesModule,
    CommonComponentsModule,
    CommonComponentsModule,
    TranslateModule,
  ],
})
export class PreferencesModule {}
