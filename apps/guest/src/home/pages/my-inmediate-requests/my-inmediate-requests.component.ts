import { Component, OnDestroy, OnInit } from '@angular/core';
import { InmediateRequestsService } from 'guest/services/inmediate-requests.service';
import { GeneralService } from 'guest/services/general.service';
import { Subscription } from 'rxjs';
import { Request } from '@contler/models/request';
import { Router } from '@angular/router';
import { Hotel } from '@contler/models';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  public pendingRequests: Request[] = [];
  public readyRequests: Request[] = [];

  hotel: Hotel | null | undefined;
  private guestSubscribe: Subscription;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    public generalService: GeneralService,
    private guestService: GuestService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
  }

  ngOnInit() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .subscribe((requests: Request[]) => {
        this.pendingRequests = requests.filter(request => !request.finished_at);
        this.readyRequests = requests.filter(request => !!request.finished_at);
      });
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  goToRequest(request: Request) {
    this.router.navigate(['/home', 'inmediate-request', request.uid]);
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  getSelectedTabStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `color: ${this.hotel.color} !important; border-bottom: 2px solid ${
            this.hotel.color
          }; background-color: #e4f3eb`
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
