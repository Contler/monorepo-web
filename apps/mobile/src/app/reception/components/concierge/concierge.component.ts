import { AfterViewInit, Component, Input } from '@angular/core';
import { ConciergeModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { ReceptionService } from '@contler/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'contler-concierge',
  templateUrl: './concierge.component.html',
  styleUrls: ['./concierge.component.scss'],
})
export class ConciergeComponent extends PetitionBase implements AfterViewInit {
  @Input() concierge: ConciergeModel;
  constructor(
    private reception: ReceptionService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    authService: AuthService,
    dialog: MatDialog,
  ) {
    super(authService, dialog);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.concierge.guest);
  }

  goToModal() {
    const { active, comment, createAt, uid, date } = this.concierge;
    const com = `${comment} - ${this.datePipe.transform(date, 'shortTime')}`;
    this.openModal(!!active, com, 'Concierge', uid, createAt).subscribe(async ({ complete }) => {
      await this.reception.conciergeRef.doc(this.concierge.uid).update({ active: complete });
      this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
    });
  }
}
