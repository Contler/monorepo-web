import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { ImmediateRequestComponent } from './pages/inmediate-request/immediate-request.component';
import { ModuleLayoutComponent } from './components/module-layout/module-layout.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DirectivesModule } from '../directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../material/material.module';
import { DynamicServicesModule } from '@contler/dynamic-services';

@NgModule({
  declarations: [PreferencesComponent, ImmediateRequestComponent, ModuleLayoutComponent],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    CommonComponentsModule,
    MatSidenavModule,
    DirectivesModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MaterialModule,
    DynamicServicesModule,
  ],
})
export class PreferencesModule {}
