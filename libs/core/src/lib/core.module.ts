import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreConfig } from '@contler/models';
import { ReservationService } from 'lib/lib/services/reservation.service';
import { FormsModule } from '@angular/forms';
import { LateCheckOutService } from 'lib/lib/services/late-check-out.service';
import { LateSearchPipe } from './pipes/late-search.pipe';
import { ProductService } from 'lib/lib/services/product.service';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { OrderItemComponent } from './components/order-item/order-item.component';

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
];


@NgModule({
  imports: [CommonModule, MatCheckboxModule, ...materialModules, FormsModule],
  declarations: [ButtonDirective, ZoneListComponent, LateSearchPipe, ProductItemComponent, OrderItemComponent],
  exports: [ButtonDirective, ZoneListComponent, ...materialModules, LateSearchPipe, ProductItemComponent, OrderItemComponent],
  entryComponents: [],
  providers: [ReservationService, LateCheckOutService, DatePipe, ProductService]
})
export class CoreModule {
  static forRoot(config: CoreConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: CoreConfig, useValue: config}
      ]
    }
  }
}
