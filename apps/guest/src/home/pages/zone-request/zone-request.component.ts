import { AfterViewInit, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { NotificationsService } from 'guest/services/notifications.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { HotelEntity, ZoneEntity } from '@contler/entity';
import { RequestService } from 'guest/services/request.service';
import { TranslateService } from '@ngx-translate/core';
import { ImmediateOptionLink, OptionModule, OptionType } from '@contler/models';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';
import { UserState } from 'guest/app/reducers/user/user.reducer';

@Component({
  selector: 'contler-zone-request',
  templateUrl: './zone-request.component.html',
  styleUrls: ['./zone-request.component.scss'],
})
export class ZoneRequestComponent implements AfterViewInit {
  selectedSubcategory = '';
  showRequestField = false;
  hotel: HotelEntity | null | undefined;
  requestController = new FormControl('', Validators.required);
  loader = false;
  zone: ZoneEntity | undefined;
  zones$: Observable<any>;

  private userSelector: Observable<UserState>;

  private readonly zoneUid: string | null;

  constructor(
    private store: Store<State>,
    private analytics: AngularFireAnalytics,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private requestService: RequestService,
    private notificationsService: NotificationsService,
    private messagesService: MessagesService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.zoneUid = this.route.snapshot.paramMap.get('id');
    this.userSelector = this.store.pipe(selectUserState);
  }

  public ngAfterViewInit(): void {
    const zone$ = this.zoneService.$zones.pipe(
      map((zones) => zones.find((zone) => zone.uid === this.zoneUid)),
    );

    this.zones$ = combineLatest<[UserState, ZoneEntity]>([this.userSelector, zone$]).pipe(
      filter(([{ hotel }, zone]) => !!hotel && !!zone),
      tap(([{ hotel }, zone]) => {
        this.hotel = hotel;
        this.zone = zone;
      }),
      switchMap(([{ hotel }, zone]) => this.zoneService.getOptionsByZoneType(hotel.uid, zone.category.id)),
    );
  }

  selectOpt(opt: OptionModule) {
    switch (opt.type) {
      case OptionType.LINK:
      case OptionType.DYNAMIC_FORM:
        this.router.navigate([(opt as ImmediateOptionLink).link]);
        break;
      case OptionType.TEXT:
        this.selectedSubcategory = opt.text;
        this.showRequestField = false;
        break;
      case OptionType.OTHER:
        this.selectedSubcategory = 'Other';
        this.showRequestField = true;
    }
  }

  getButtonColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `background-color: ${this.hotel.color}; color: #ffffff !important`
        : '',
    );
  }

  async saveRequest() {
    this.loader = true;
    const msg = this.requestController.value || this.selectedSubcategory;
    this.requestService.newRequest(this.zone, msg, !!this.requestController.value).subscribe(
      () => {
        this.analytics.logEvent('request_create', {
          type: 'immediate',
          zone: this.zone.uid,
          zoneName: this.zone.name,
          requestMessage: msg,
          time: new Date(),
        });
        this.loader = false;
        this.requestController.reset();
        this.router.navigate(['/home/my-request']);
        this.messagesService.showToastMessage(
          this.translate.instant('zoneRequest.immediateRequestSuccessfullyCreated'),
        );
      },
      () => {
        this.loader = false;
        this.messagesService.showServerError();
      },
    );
  }

  setQuickRequest(value: string) {
    if (value) {
      this.selectedSubcategory = value;
      this.showRequestField = false;
    } else {
      this.selectedSubcategory = 'Other';
      this.showRequestField = true;
    }
  }

  buttonDisabled() {
    let disabledButton = false;
    if (!this.selectedSubcategory) {
      disabledButton = true;
    } else if (this.selectedSubcategory === 'Other' && this.requestController.invalid) {
      disabledButton = true;
    }
    return disabledButton;
  }
}
