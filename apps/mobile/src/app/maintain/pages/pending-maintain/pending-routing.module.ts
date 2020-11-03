import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingMaintainComponent } from './pending-maintain.component';

const routes: Routes = [
  {
    path: '',
    component: PendingMaintainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingMaintainRoutingModule {}
