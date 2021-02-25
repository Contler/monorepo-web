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
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { ModuleCardComponent } from './components/module-card/module-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../material/material.module';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { ImmediateCategoryComponent } from './components/immediate-category/immediate-category.component';
import { UiModule } from '@contler/ui';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceptionComponent } from './pages/reception/reception.component';
import { NewServiceWrapComponent } from './components/new-service-wrap/new-service-wrap.component';
import { ServiceReceptionComponent } from './pages/service-reception/service-reception.component';
import { RoomComponent } from './pages/room/room.component';
import { CreateRoomModuleComponent } from './pages/create-room-module/create-room-module.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { CreateMaintenanceModuleComponent } from './pages/create-maintenance-module/create-maintenance-module.component';
import { CleaningComponent } from './pages/cleaning/cleaning.component';
import { CreateCleaningModuleComponent } from './pages/create-cleaning-module/create-cleaning-module.component';

@NgModule({
  declarations: [
    PreferencesComponent,
    WelcomeComponent,
    ModuleListComponent,
    PreferencesHeaderComponent,
    ModuleCardComponent,
    PreferencesHeaderComponent,
    PreferencesComponent,
    ImmediateRequestComponent,
    ModuleLayoutComponent,
    ImmediateCategoryComponent,
    ReceptionComponent,
    NewServiceWrapComponent,
    ServiceReceptionComponent,
    RoomComponent,
    CreateRoomModuleComponent,
    MaintenanceComponent,
    CreateMaintenanceModuleComponent,
    CleaningComponent,
    CreateCleaningModuleComponent,
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
    ReactiveFormsModule,
  ],
})
export class PreferencesModule {}
