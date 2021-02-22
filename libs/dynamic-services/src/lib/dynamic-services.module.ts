import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DynamicModuleService } from './services/dynamic-module.service';
import { NewInputComponent } from './components/new-input/new-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  providers: [DynamicModuleService],
  declarations: [NewInputComponent],
  exports: [NewInputComponent],
})
export class DynamicServicesModule {}
