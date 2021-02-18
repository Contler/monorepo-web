import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { PreferencesHeaderComponent } from './components/preferences-header/preferences-header.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { ModuleCardComponent } from './components/module-card/module-card.component';

@NgModule({
  declarations: [
    PreferencesComponent,
    WelcomeComponent,
    ModuleListComponent,
    PreferencesHeaderComponent,
    ModuleCardComponent,
  ],
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
