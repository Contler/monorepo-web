import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LatecheckOutComponent } from './latecheck-out.component';

const routes: Routes = [{ path: '', component: LatecheckOutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LatecheckOutRoutingModule { }
