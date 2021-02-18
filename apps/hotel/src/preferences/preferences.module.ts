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

@NgModule({
  declarations: [PreferencesComponent, WelcomeComponent, PreferencesHeaderComponent],
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
