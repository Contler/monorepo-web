import { AfterViewInit, Component, Input } from '@angular/core';
import { MoneyModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'contler-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
})
export class MoneyComponent extends PetitionBase implements AfterViewInit {
  @Input() money: MoneyModel;

  constructor(authService: AuthService) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.money.guest);
  }
}
