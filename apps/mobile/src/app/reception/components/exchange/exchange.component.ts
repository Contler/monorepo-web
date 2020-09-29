import { AfterViewInit, Component, Input } from '@angular/core';
import { ExchangeReqModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ReceptionService } from '@contler/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'contler-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent extends PetitionBase implements AfterViewInit {
  @Input() exchange: ExchangeReqModel;

  constructor(
    authService: AuthService,
    dialog: MatDialog,
    private reception: ReceptionService,
    private snackBar: MatSnackBar,
  ) {
    super(authService, dialog);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.exchange.guest);
  }

  goToModal() {
    const { active, createAt, uid, money, value } = this.exchange;
    const com = `${money.symbol} ${value}`;
    this.openModal(!!active, com, 'Exchange', uid, createAt).subscribe(async ({ complete }) => {
      await this.reception.exchangeRef.doc(uid).update({ active: complete });
      this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
    });
  }
}
