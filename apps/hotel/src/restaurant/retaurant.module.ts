import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './page/restaurant/restaurant.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantService } from './services/restaurant.service';
import { CoreModule } from '@contler/core';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';

// editable table
import { EditableComponent } from './editable/editable.component';
import { EditableOnEnterDirective } from './editable/edit-on-enter.directive';
import { EditModeDirective } from './editable/edit-mode.directive';
import { ViewModeDirective } from './editable/view-mode.directive';

@NgModule({
  declarations: [
    RestaurantComponent,
    EditableComponent,
    EditableOnEnterDirective,
    EditModeDirective,
    ViewModeDirective,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    CommonComponentsModule,
  ],
  providers: [RestaurantService],
  entryComponents: [
    EditableComponent,
    EditableOnEnterDirective,
    EditModeDirective,
    ViewModeDirective,
  ],
})
export class RestaurantModule {}
