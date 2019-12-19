import { Component, OnInit, OnDestroy } from '@angular/core';
import { InmediateRequestsService } from 'guest/services/inmediate-requests.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, pluck, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Request, Hotel } from '@contler/core/models';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'contler-inmediate-request',
  templateUrl: './inmediate-request.component.html',
  styleUrls: ['./inmediate-request.component.scss'],
})
export class InmediateRequestComponent implements OnInit, OnDestroy {
  private requestSubscription: Subscription | null = null;
  public request: Request | null = null;

  hotel: Hotel | null | undefined;
  private guestSubscribe: Subscription;

  loader = false;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private activatedRoute: ActivatedRoute,
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
  }

  ngOnInit() {
    this.requestSubscription = this.activatedRoute.params
      .pipe(
        pluck('uid'),
        switchMap(uid => {
          return this.inmediateRequestsService.getInmediateRequestByKey(uid).pipe(take(1));
        }),
      )
      .subscribe(request => (this.request = request as Request), () => {});
  }

  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  saveRequest() {
    this.loader = true;
    const score = this.request ? this.request.score : 0;
    const scoreComments = this.request ? this.request.scoreComments : null;
    this.inmediateRequestsService
      .updateRequest(this.request ? this.request.uid : '', { score, scoreComments })
      .then(() => {
        this.loader = false;
      })
      .catch(() => {
        this.loader = false;
      });
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  getButtonColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `background-color: ${this.hotel.color}; color: #ffffff !important` : '',
    );
  }
}
