import { AfterViewInit, Component, Input } from '@angular/core';
import { ConciergeModel } from '@contler/models';
import { PetitionBase } from '../petition-base';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'contler-concierge',
  templateUrl: './concierge.component.html',
  styleUrls: ['./concierge.component.scss'],
})
export class ConciergeComponent extends PetitionBase implements AfterViewInit {
  @Input() concierge: ConciergeModel;
  constructor(authService: AuthService, dialog: MatDialog) {
    super(authService, dialog);
  }

  ngAfterViewInit(): void {
    this.loadGuest(this.concierge.guest);
  }

  goToModal() {
    const { active, comment, createAt, uid } = this.concierge;
    this.openModal(!!active, comment, 'Concierge', uid, createAt).subscribe();
  }
}
