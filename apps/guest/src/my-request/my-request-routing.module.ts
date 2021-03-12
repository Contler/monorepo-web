import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyRequestComponent } from './my-request.component';

const routes: Routes = [{ path: '', component: MyRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRequestRoutingModule {}
