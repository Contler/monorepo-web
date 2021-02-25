import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { ImmediateRequestComponent } from './pages/inmediate-request/immediate-request.component';
import { ReceptionComponent } from './pages/reception/reception.component';
import { ServiceReceptionComponent } from './pages/service-reception/service-reception.component';
import { RoomComponent } from './pages/room/room.component';
import { CreateRoomModuleComponent } from './pages/create-room-module/create-room-module.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { CreateMaintenanceModuleComponent } from './pages/create-maintenance-module/create-maintenance-module.component';
import { CleaningComponent } from './pages/cleaning/cleaning.component';
import { CreateCleaningModuleComponent } from './pages/create-cleaning-module/create-cleaning-module.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'modules', component: ModuleListComponent },
    ],
  },
  { path: 'immediate-request', component: ImmediateRequestComponent },
  { path: 'reception', component: ReceptionComponent },
  { path: 'reception/service', component: ServiceReceptionComponent },
  { path: 'room', component: RoomComponent },
  { path: 'room/service', component: CreateRoomModuleComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'maintenance/service', component: CreateMaintenanceModuleComponent },
  { path: 'cleaning', component: CleaningComponent },
  { path: 'cleaning/service', component: CreateCleaningModuleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
