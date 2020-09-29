import { AfterViewInit, Component, Input } from '@angular/core';
import { MoneyModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReceptionService } from '@contler/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'contler-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
})
export class MoneyComponent extends PetitionBase implements AfterViewInit {
  @Input() money: MoneyModel;

  constructor(
    authService: AuthService,
    dialog: MatDialog,
    private reception: ReceptionService,
    private snackBar: MatSnackBar,
  ) {
    super(authService, dialog);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.money.guest);
  }

  goToModal() {
    const { active, createAt, uid, value } = this.money;
    const com = `${value}`;
    this.openModal(!!active, com, 'Cash loan', uid, createAt).subscribe(async ({ complete }) => {
      await this.reception.moneyRef.doc(uid).update({ active: complete });
      this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
    });
  }
}
