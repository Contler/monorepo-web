import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RangeComponent } from './components/range/range.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';
import { MatStepperModule } from '@angular/material/stepper';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatMenuModule,
  MatExpansionModule,
  MatListModule,
  MatTooltipModule,
  MatStepperModule,
];

@NgModule({
  declarations: [MenuComponent, MenuListItemComponent, RangeComponent],
  imports: [
    CommonModule,
    ...materialModules,
    RouterModule,
    NgxMaskModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DirectivesModule,
  ],
  exports: [...materialModules, MenuComponent, MenuListItemComponent, RangeComponent],
})
export class MaterialModule {}
