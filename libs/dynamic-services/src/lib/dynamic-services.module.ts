import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DynamicModuleService } from './services/dynamic-module.service';
import { NewInputComponent } from './components/new-input/new-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormComponent } from './components/dynamicform/dynamic-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateInputComponent } from './components/date-input/date-input.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [DynamicModuleService],
  declarations: [NewInputComponent, DynamicFormComponent, DateInputComponent],
  exports: [NewInputComponent, DynamicFormComponent],
})
export class DynamicServicesModule {}
