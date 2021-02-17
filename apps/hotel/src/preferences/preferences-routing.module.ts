import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './preferences.component';
import { ImmediateRequestComponent } from './pages/inmediate-request/immediate-request.component';

const routes: Routes = [
  { path: '', component: PreferencesComponent },
  { path: 'immediate-request', component: ImmediateRequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRoutingModule {}
