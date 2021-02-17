import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { ImmediateRequestComponent } from './pages/inmediate-request/immediate-request.component';
import { ModuleLayoutComponent } from './components/module-layout/module-layout.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from '../directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PreferencesComponent, ImmediateRequestComponent, ModuleLayoutComponent],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    CommonComponentsModule,
    MatSidenavModule,
    MaterialModule,
    DirectivesModule,
    TranslateModule,
  ],
})
export class PreferencesModule {}
