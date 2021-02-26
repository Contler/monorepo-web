import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningComponent } from './cleaning.component';

const routes: Routes = [{ path: '', component: CleaningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningRoutingModule {}
