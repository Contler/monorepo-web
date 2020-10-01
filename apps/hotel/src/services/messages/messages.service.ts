import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private snackBar: MatSnackBar) {}

  showToastMessage(message: string, closeMessage: string = 'Cerrar', duration: number = 2000) {
    this.snackBar.open(message, closeMessage, {
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
