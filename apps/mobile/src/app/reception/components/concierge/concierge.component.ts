import { AfterViewInit, Component, Input } from '@angular/core';
import { ConciergeModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'contler-concierge',
  templateUrl: './concierge.component.html',
  styleUrls: ['./concierge.component.scss'],
})
export class ConciergeComponent extends PetitionBase implements AfterViewInit {
  @Input() concierge: ConciergeModel;
  constructor(authService: AuthService) {
    super(authService);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.concierge.guest);
  }
}
