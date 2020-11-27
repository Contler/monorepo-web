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
import { FormsModule } from '@angular/forms';
import { HotelComponent } from './pages/hotel/hotel.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hotel', component: HotelComponent },
];

@NgModule({
  declarations: [HomeComponent, HotelComponent],
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
  ],
})
export class HomeModule {}
