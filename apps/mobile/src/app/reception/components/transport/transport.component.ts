import { AfterViewInit, Component, Input } from '@angular/core';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';
import { TransportModel } from '@contler/models';

@Component({
  selector: 'contler-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss'],
})
export class TransportComponent extends PetitionBase implements AfterViewInit {
  @Input() transport: TransportModel;

  constructor(authService: AuthService) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.transport.guest);
  }
}
