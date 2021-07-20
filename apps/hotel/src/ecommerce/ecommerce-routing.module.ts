import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceComponent } from '@contler/hotel/ecommerce/ecommerce.component';
import { CreateEcommerceComponent } from '@contler/hotel/ecommerce/create-ecommerce/create-ecommerce.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
  },
  {
    path: 'new',
    component: CreateEcommerceComponent,
  },
  {
    path: ':id',
    component: CreateEcommerceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceRoutingModule {}
