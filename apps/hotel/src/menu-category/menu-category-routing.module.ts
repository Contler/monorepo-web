import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuCategoryComponent } from './page/menu-category/menu-category.component';

const routes: Routes = [
  {
    path: '',
    component: MenuCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCategoryRoutingModule {}
