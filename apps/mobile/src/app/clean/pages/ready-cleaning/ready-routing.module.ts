import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadyCleaningComponent } from './ready-cleaning.component';

const routes: Routes = [
  {
    path: '',
    component: ReadyCleaningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyCleaningRoutingModule {}
