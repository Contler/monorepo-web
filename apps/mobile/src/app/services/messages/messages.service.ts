import { Injectable } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { Observable } from 'rxjs';
import { ResultResponseComponent } from './result-response/result-response.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { InputMessageComponent } from './input-message/input-message.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {}

  showToastMessage(message: string, closeMessage: string = null, duration: number = 2000) {
    const msn = closeMessage || this.translate.instant('global.CLOSE');
    this.snackBar.open(message, msn, {
      duration: duration,
    });
  }

  showServerError(
    error = null,
    message: string = null,
    closeMessage: string = null,
    duration: number = 3000,
  ) {
    if (error) {
      console.error(error);
    }
    const msnClose = closeMessage || this.translate.instant('global.CLOSE');
    const msnMessage = message || this.translate.instant('global.ERROR_SERVER');
    this.snackBar.open(msnMessage, msnClose, {
      duration: duration,
    });
  }

  showLoader() {
    return this.dialog.open(SpinnerComponent, {
      disableClose: true,
    });
  }

  closeLoader(loader: any, message: string | null = null) {
    loader.close();
    if (message) {
      this.showToastMessage(message);
    }
  }

  showConfirm(
    content: string,
    title: string = 'Confirme por favor',
    confirmText: string = 'Aceptar',
    cancelText: string = 'Cancelar',
  ): Observable<boolean> {
    const ref = this.dialog.open(ConfirmComponent, {
      data: { title, content, confirmText, cancelText },
      panelClass: 'rounded_modal',
    });
    return ref.afterClosed();
  }

  errorMessage(message: string, duration: number = 3000) {
    const ref = this.dialog.open(ResultResponseComponent, {
      data: { message, type: 'error', icon: 'close' },
    });
    setTimeout(() => {
      if (ref) {
        ref.close();
      }
    }, duration);
  }

  successMessage(message: string, duration: number = 3000) {
    const ref = this.dialog.open(ResultResponseComponent, {
      data: { message, type: 'success', icon: 'done' },
    });
    setTimeout(() => {
      if (ref) {
        ref.close();
      }
    }, duration);
  }

  alertMessage(message: string, buttonText: string = 'Aceptar', icon: string = 'warning') {
    this.dialog.open(AlertMessageComponent, {
      data: { message, buttonText, icon },
      disableClose: true,
    });
  }

  inputMessage(placeholder: string, type: string = 'text', required: boolean = false) {
    const ref = this.dialog.open(InputMessageComponent, {
      data: { placeholder, type, required },
      panelClass: 'rounded_modal',
    });
    return ref.afterClosed();
  }

  logMessage(message: string) {
    console.log(message);
  }
}
