import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PreferencesHeaderComponent } from './components/preferences-header/preferences-header.component';
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
import { ImmediateCategoryComponent } from './components/immediate-category/immediate-category.component';
import { UiModule } from '@contler/ui';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PreferencesComponent,
    WelcomeComponent,
    PreferencesHeaderComponent,
    PreferencesComponent,
    ImmediateRequestComponent,
    ModuleLayoutComponent,
    ImmediateCategoryComponent,
  ],
  imports: [
    CommonModule,
    PreferencesRoutingModule,
    MaterialModule,
    DirectivesModule,
    CommonComponentsModule,
    CommonComponentsModule,
    TranslateModule,
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
    UiModule,
    DynamicTranslateModule,
    FormsModule,
  ],
})
export class PreferencesModule {}
