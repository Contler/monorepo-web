import { AfterViewInit, Component, Input } from '@angular/core';
import { ExchangeReqModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'contler-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent extends PetitionBase implements AfterViewInit {
  @Input() exchange: ExchangeReqModel;

  constructor(authService: AuthService) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.exchange.guest);
  }
}
