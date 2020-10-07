import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaintainComponent } from './maintain.component';

const routes: Routes = [{ path: '', component: MaintainComponent }];

@NgModule({
  declarations: [MaintainComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MaintainModule {}
