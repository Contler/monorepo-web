import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './page/restaurant/restaurant.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, RestaurantService } from '@contler/core';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';

// editable table
import { EditableComponent } from './components/editable/editable.component';
import { EditModeDirective } from './components/directives/edit-mode.directive';
import { ViewModeDirective } from './components/directives/view-mode.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RestaurantComponent, EditableComponent, EditModeDirective, ViewModeDirective],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    TranslateModule,
  ],
  providers: [RestaurantService],
  entryComponents: [EditableComponent],
})
export class RestaurantModule {}
