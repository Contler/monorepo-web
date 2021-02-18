import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ModuleListComponent } from './module-list/module-list.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'modules', component: ModuleListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
