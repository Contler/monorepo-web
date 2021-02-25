import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestRoomComponent } from './request-room.component';

const routes: Routes = [{ path: '', component: RequestRoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRoomRoutingModule {}
