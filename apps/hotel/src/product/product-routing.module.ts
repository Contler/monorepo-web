import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { EditProductComponent } from '@contler/hotel/product/pages/edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: ':id', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
