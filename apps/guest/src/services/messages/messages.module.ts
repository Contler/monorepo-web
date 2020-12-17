import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResultResponseComponent } from './result-response/result-response.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'guest/material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SpinnerComponent,
    ConfirmComponent,
    ResultResponseComponent,
    AlertMessageComponent,
    InputMessageComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, TranslateModule],
  entryComponents: [
    SpinnerComponent,
    ConfirmComponent,
    ResultResponseComponent,
    AlertMessageComponent,
    InputMessageComponent,
  ],
  exports: [],
})
export class MessagesModule {}
