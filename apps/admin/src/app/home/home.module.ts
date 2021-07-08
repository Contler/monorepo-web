import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { UiModule } from '@contler/ui';
import { ShareModule } from '../../share/share.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@contler/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelComponent } from './pages/hotel/hotel.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconsComponent } from './pages/icons/icons.component';
import { MetricsComponent } from './pages/metrics/metrics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'hotel/:id', component: HotelComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'metrics', component: MetricsComponent },
];

@NgModule({
  declarations: [HomeComponent, HotelComponent, IconsComponent, MetricsComponent],
  imports: [
    CommonModule,
    UiModule,
    ShareModule,
    CoreModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MaterialFileInputModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class HomeModule {}
