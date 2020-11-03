import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingCleaningComponent } from './pending-cleaning.component';

const routes: Routes = [
  {
    path: '',
    component: PendingCleaningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingCleaningRoutinModule {}
