import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from '../../common-components/modal-loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private matDialog: MatDialog,
  ) {}

  showToastMessage(message: string, closeMessage: string = null, duration: number = 2000) {
    const msg = this.translate.instant('global.CLOSE');

    this.snackBar.open(message, closeMessage || msg, {
      duration: duration,
    });
  }
  showToastMessageTranslate(message: string, closeMessage: string = 'global.CLOSE', duration: number = 2000) {
    const closeMsg = this.translate.instant(closeMessage);
    const msg = this.translate.instant(message);

    this.snackBar.open(msg, closeMsg, {
      duration: duration,
    });
  }

  showServerError(
    error = null,
    message: string = 'Lo sentimos, hubo un error en el servidor',
    closeMessage: string = 'Cerrar',
    duration: number = 3000,
  ) {
    if (error) {
      console.error(error);
    }
    this.snackBar.open(message, closeMessage, {
      duration: duration,
    });
  }

  showLoader() {
    return this.matDialog.open(LoaderComponent, {
      disableClose: true,
      panelClass: 'dark_modal',
    });
  }

  closeLoader(loader, message: string = null, duration: number = 2000) {
    setTimeout(() => {
      loader.close();
    }, 1000);
    if (message) {
      this.showToastMessage(message, 'Cerrar', duration);
    }
  }
}
