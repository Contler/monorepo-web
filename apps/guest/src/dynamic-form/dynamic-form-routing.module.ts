import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicFormServicesComponent } from './dynamic-form-services.component';

const routes: Routes = [{ path: '', component: DynamicFormServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicFormRoutingModule {}
