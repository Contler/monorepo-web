import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadyMaintainComponent } from './ready-maintain.component';

const routes: Routes = [
  {
    path: '',
    component: ReadyMaintainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyMaintainRoutingModule {}
