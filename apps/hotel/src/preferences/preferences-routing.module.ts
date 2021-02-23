import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { ImmediateRequestComponent } from './pages/inmediate-request/immediate-request.component';
import { ReceptionComponent } from './pages/reception/reception.component';
import { ServiceReceptionComponent } from './pages/service-reception/service-reception.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
