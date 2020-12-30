import { Component, OnDestroy } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { map, switchMap, take } from 'rxjs/operators';
import { SUB_CATEGORY } from '@contler/const';
import { NotificationsService } from 'guest/services/notifications.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { HotelEntity, ZoneEntity } from '@contler/entity';
import { RequestRequest } from '@contler/models/request-request';
import { RequestService } from 'guest/services/request.service';
import { CATEGORY_ZONE_EN, ROOM_SERVICE, SUB_CATEGORY_DRINKS } from './const/zone-const';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as DynamicService } from '@contler/dynamic-translate';

@Component({
  selector: 'contler-zone-request',
  templateUrl: './zone-request.component.html',
  styleUrls: ['./zone-request.component.scss'],
})
export class ZoneRequestComponent implements OnDestroy {
  selectedSubcategory = '';
  showRequestField = false;
  hotel: HotelEntity | null | undefined;
  requestController = new FormControl('', Validators.required);
  loader = false;
  zone: ZoneEntity | undefined;
  categoryZones = CATEGORY_ZONE_EN;
  categories = SUB_CATEGORY;
  private zoneUid: string | null;
  private guestSubscribe: Subscription;
  private zoneSubscribe: Subscription;

  public isSubCategory = false; // DRINKS PAGE, etc

  //CODIGO TEMPORAL HASTA DEFINIR LOGICA DE PRODUCTOS
  public typeName: string | null = null;
  public drinkName = '';

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private requestService: RequestService,
    private notificationsService: NotificationsService,
    private messagesService: MessagesService,
    private router: Router,
    private translate: TranslateService,
    private dynamicService: DynamicService,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
    this.zoneUid = this.route.snapshot.paramMap.get('id');
    this.zoneSubscribe = this.zoneService.$zones
      .pipe(map((zones) => zones.find((zone) => zone.uid === this.zoneUid)))
      .subscribe((zone) => {
        if (zone) {
          this.zone = zone;
          this.zone.category = this.categoryZones[this.zone.category.id];
        }
      });
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
    const msg = this.selectedSubcategory || this.requestController.value;
    const chiefTokens: string[] = this.zone!.leaders.filter((leader) => !!leader.pushToken).map(
      (leader) => leader.pushToken,
    );
    this.guestService.$guest
      .pipe(
        take(1),
        map((guest) => {
          const request = new RequestRequest();
          request.hotel = guest!.hotel;
          request.guest = guest!;
          request.room = guest!.room;
          request.zone = this.zone!;
          request.special = false;
          request.message = msg;
          return request;
        }),
        switchMap((request) => this.requestService.saveRequest(request)),
        switchMap(() =>
          this.notificationsService.sendNotification(
            `${this.translate.instant(
              'zoneRequest.thereIsAnImmediateRequestAt',
            )} ${this.dynamicService.getInstant(this.zone.name)} ${this.translate.instant(
              'zoneRequest.waitingToBeAttended',
            )}`,
            chiefTokens,
          ),
        ),
      )
      .subscribe(
        () => {
          this.loader = false;
          this.requestController.reset();
          this.router.navigate(['/home']);
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
    this.selectedSubcategory = value;
    if (value === SUB_CATEGORY_DRINKS || value === ROOM_SERVICE || value === 'A drink') {
      this.router.navigate(['/home/product/create']);
    } else if (value === 'Reserve a space') {
      this.router.navigate(['/home/reservation']);
    } else {
      this.showRequestField = value === 'Other';
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

  ngOnDestroy(): void {
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
    if (this.zoneSubscribe) {
      this.zoneSubscribe.unsubscribe();
    }
  }
}
