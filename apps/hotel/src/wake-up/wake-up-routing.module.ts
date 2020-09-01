import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WakeUpComponent } from './wake-up.component';

const routes: Routes = [{ path: '', component: WakeUpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WakeUpRoutingModule { }
