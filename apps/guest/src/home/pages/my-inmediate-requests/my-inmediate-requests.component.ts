import { Component, OnDestroy, OnInit } from '@angular/core';
import { InmediateRequestsService } from 'guest/services/inmediate-requests.service';
import { GeneralService } from 'guest/services/general.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HotelEntity, RequestEntity } from '@contler/entity';
import { RequestService } from 'guest/services/request.service';

@Component({
  selector: 'contler-my-inmediate-requests',
  templateUrl: './my-inmediate-requests.component.html',
  styleUrls: ['./my-inmediate-requests.component.scss'],
})
export class MyInmediateRequestsComponent implements OnInit, OnDestroy {
  public PAGES = {
    PENDING: 'pending',
    READY: 'ready',
  };
  public currentPage = this.PAGES.PENDING;

  private inmediateRequestsSubscription: Subscription | null = null;
  public pendingRequests: RequestEntity[] = [];
  public readyRequests: RequestEntity[] = [];

  hotel: HotelEntity | null | undefined;
  private guestSubscribe: Subscription;

  constructor(
    private requestService: RequestService,
    private inmediateRequestsService: InmediateRequestsService,
    public generalService: GeneralService,
    private guestService: GuestService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnInit() {
    this.requestService.getRequests(false).subscribe((req) => (this.pendingRequests = req));
    this.requestService.getRequests(true).subscribe((req) => (this.readyRequests = req));
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  goToRequest(request: RequestEntity) {
    this.router.navigate(['/home', 'inmediate-request', request.id]);
  }

  getSelectedTabStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `color: ${this.hotel.color} !important; border-bottom: 2px solid ${this.hotel.color}; background-color: ${this.hotel.colorSecond}26`
        : '',
    );
  }

  /* // NO FUNCIONA EL METODO
  private lightenColor(color: string, percent: number) {
    var num = parseInt(color.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    );
  } */
}
