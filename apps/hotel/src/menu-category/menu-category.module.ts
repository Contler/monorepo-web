import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuCategoryComponent } from './page/menu-category/menu-category.component';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, RestaurantService } from '@contler/core';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MenuCategoryRoutingModule } from './menu-category-routing.module';
import { ModalEditMenuCategoryComponent } from './components/modal/modal-edit-menu-category/modal-edit-menu-category.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [MenuCategoryComponent, ModalEditMenuCategoryComponent],
  imports: [
    CommonModule,
    MenuCategoryRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
  ],
  providers: [RestaurantService],
  entryComponents: [ModalEditMenuCategoryComponent],
})
export class MenuCategoryModule {}
