import { AfterViewInit, Component, Input } from '@angular/core';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';
import { TransportModel } from '@contler/models';
import { MatDialog } from '@angular/material/dialog';
import { ReceptionService } from '@contler/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'contler-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss'],
})
export class TransportComponent extends PetitionBase implements AfterViewInit {
  @Input() transport: TransportModel;

  constructor(
    authService: AuthService,
    dialog: MatDialog,
    private reception: ReceptionService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
  ) {
    super(authService, dialog);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.transport.guest);
  }

  goToModal() {
    const { active, createAt, uid, date, destination } = this.transport;
    const com = `${destination} - ${this.datePipe.transform(date, 'longDate')}`;
    this.openModal(!!active, com, 'Transport', uid, createAt).subscribe(async ({ complete }) => {
      await this.reception.transportRef.doc(uid).update({ active: complete });
      this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
    });
  }
}
