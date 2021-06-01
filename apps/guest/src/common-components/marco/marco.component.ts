import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';

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
  @Input() backUrl: string | boolean | null = null;
  @Input() filter = false;
  @Input() home = false;
  @Output() openFilter = new EventEmitter<void>();

  logo: string | undefined;
  maxHeight = '';

  constructor(
    private guestService: GuestService,
    public generalService: GeneralService,
    private router: Router,
    private location: Location,
  ) {
    this.guestService.$hotel.subscribe((hotel) => (this.logo = hotel!.logo));
    this.maxHeight = window.innerHeight + 'px';
  }

  goToRoute(url: string | boolean) {
    if (typeof url === 'string') {
      this.router.navigateByUrl(url);
    } else {
      this.location.back();
    }
  }
}
