import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {}

  showToastMessage(message: string, closeMessage: string = null, duration: number = 2000) {
    const msg = this.translate.instant('global.CLOSE');

    this.snackBar.open(message, closeMessage || msg, {
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
}
