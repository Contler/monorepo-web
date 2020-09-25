import { Component, Input } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { Router } from '@angular/router';
import { GeneralService } from 'guest/services/general.service';

@Component({
  selector: 'contler-marco',
  templateUrl: './marco.component.html',
  styleUrls: ['./marco.component.scss'],
})
export class MarcoComponent {
  @Input() padding = '16px 16px';
  @Input() backUrl: string | null = null;
  logo: string | undefined;
  maxHeight = '';

  constructor(
    private guestService: GuestService,
    public generalService: GeneralService,
    private router: Router,
  ) {
    this.guestService.$hotel.subscribe((hotel) => (this.logo = hotel!.logo));
    this.maxHeight = window.innerHeight - 80 + 'px';
  }

  goToRoute(url: string) {
    this.router.navigateByUrl(url);
  }
}
