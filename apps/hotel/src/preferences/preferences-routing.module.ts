import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: PreferencesComponent,
    children: [{ path: '', component: WelcomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
