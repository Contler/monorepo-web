import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LateCheckOutComponent } from './late-check-out.component';

const routes: Routes = [{ path: '', component: LateCheckOutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LateCheckOutRoutingModule { }
