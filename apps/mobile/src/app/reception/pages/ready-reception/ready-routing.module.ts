import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadyComponent } from './ready.component';

const routes: Routes = [
  {
    path: '',
    component: ReadyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyRoutingModule {}
