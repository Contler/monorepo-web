import { Component, OnDestroy, OnInit } from '@angular/core';
import { InmediateRequestsService } from 'guest/services/inmediate-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from 'guest/services/messages/messages.service';
import { HotelEntity, RequestEntity } from '@contler/entity';
import { RequestService } from 'guest/services/request.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-inmediate-request',
  templateUrl: './inmediate-request.component.html',
  styleUrls: ['./inmediate-request.component.scss'],
})
export class InmediateRequestComponent implements OnInit, OnDestroy {
  private requestSubscription: Subscription | null = null;
  public request: RequestEntity | null = null;

  hotel: HotelEntity | null | undefined;
  private guestSubscribe: Subscription;

  loader = false;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private activatedRoute: ActivatedRoute,
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private messagesService: MessagesService,
    private router: Router,
    private requestService: RequestService,
    private translate: TranslateService,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnInit() {
    this.requestSubscription = this.activatedRoute.params
      .pipe(
        pluck('uid'),
        switchMap((uid) => {
          return this.requestService.getRequest(uid);
        }),
      )
      .subscribe(
        (request) => (this.request = request),
        () => {},
      );
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
    const scoreComments = this.request ? this.request.score : null;
    this.inmediateRequestsService
      .updateRequest(this.request ? this.request.id + '' : '', { score, scoreComments })
      .then(() => {
        this.loader = false;
        this.router.navigate(['/home']);
        this.messagesService.showToastMessage(
          this.translate.instant('inmediateRequest.requestModifiedSuccessfully'),
        );
      })
      .catch(() => {
        this.loader = false;
        this.messagesService.showServerError();
      });
  }
}
