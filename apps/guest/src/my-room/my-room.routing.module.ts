import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRoomComponent } from './my-room.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { CleaningComponent } from './pages/cleaning/cleaning.component';

const routes: Routes = [
  { path: '', component: MyRoomComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'cleaning', component: CleaningComponent },
  { path: ':id', component: MyRoomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRoomRoutingModule {}
