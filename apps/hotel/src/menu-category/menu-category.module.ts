import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCategoryComponent } from './page/menu-category/menu-category.component';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, RestaurantService } from '@contler/core';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MenuCategoryRoutingModule } from './menu-category-routing.module';

@NgModule({
  declarations: [MenuCategoryComponent],
  imports: [
    CommonModule,
    MenuCategoryRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    CommonComponentsModule,
  ],
  providers: [RestaurantService],
  entryComponents: [],
})
export class MenuCategoryModule {}
