import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotelEntity, ZoneEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmediateOptionLink, OptionModule, OptionType, ReceptionModel } from '@contler/models';
import { ReceptionService, RoomService } from '@contler/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';
import { TranslateService } from '@ngx-translate/core';
import { ZoneService } from '../services/zone.service';
import { RequestService } from '../services/request.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'contler-my-room',
  templateUrl: './my-room.component.html',
  styleUrls: ['./my-room.component.scss'],
})
export class MyRoomComponent implements OnInit, OnDestroy {
  hotel: HotelEntity | null | undefined;
  selectedSubcategory = '';
  loader = false;

  private guestSubscribe: Subscription;
  zone: ZoneEntity;
  public modules$: Observable<OptionModule[]>;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private messagesService: MessagesService,
    private receptionService: ReceptionService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private zoneService: ZoneService,
    private requestService: RequestService,
    route: ActivatedRoute,
    private roomService: RoomService,
    private analytics: AngularFireAnalytics,
  ) {
    const zoneUid = route.snapshot.paramMap.get('id');
    this.zoneService.$zones
      .pipe(
        filter((zones) => zones.length > 0),
        take(1),
        map((zones) => zones.find((zone) => zone.uid === zoneUid)),
      )
      .subscribe((zone) => {
        if (zone) {
          this.zone = zone;
        }
      });
  }

  ngOnInit() {
    const loader = this.messagesService.showLoader();
    this.modules$ = this.guestService.$hotel.pipe(first()).pipe(
      switchMap((hotel) => this.roomService.getOptionsRoom(hotel.uid)),
      tap(() => this.messagesService.closeLoader(loader)),
    );
  }

  selectOption(opt: OptionModule) {
    switch (opt.type) {
      case OptionType.DYNAMIC_FORM:
      case OptionType.LINK:
        this.router.navigate([(opt as ImmediateOptionLink).link]);
        break;
      case OptionType.TEXT:
        this.selectedSubcategory = opt.text;
    }
  }

  async saveRequest() {
    this.loader = true;
    const msg = this.selectedSubcategory ? this.selectedSubcategory : '';
    if (msg === 'zoneRequest.categories.roomKeys') {
      this.createRoomKeys(msg);
    } else {
      this.createRoomPetition(msg);
    }
  }

  createRoomKeys(msg: string) {
    this.requestService.newRequest(this.zone, msg).subscribe(
      () => {
        this.analytics
          .logEvent('request_create', {
            type: 'room',
            service: 'zoneRequest.categories.roomKeys',
            time: new Date(),
          })
          .then(() => {
            this.loader = false;
            this.router.navigate(['/home/guest-requests']);
          });
      },
      () => {
        this.loader = false;
        this.messagesService.showServerError();
      },
    );
  }

  createRoomPetition(msg: string) {
    const modalConfig: ModalConfigModel = {
      text: this.translate.instant('myRoom.text'),
      close: this.translate.instant('myRoom.close'),
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        map(
          (guest) =>
            ({
              createAt: new Date(),
              comment: msg,
              guest: guest.uid,
              hotel: guest.hotel.uid,
              type: 'Room keys',
              active: true,
            } as ReceptionModel),
        ),
        switchMap((request) => this.receptionService.createReception(request)),
        switchMap(() =>
          this.dialog
            .open<ModalCompleteComponent, ModalConfigModel>(ModalCompleteComponent, {
              data: modalConfig,
            })
            .afterClosed(),
        ),
      )
      .subscribe(
        () => {
          this.loader = false;
          this.router.navigate(['/home/guest-requests']);
        },
        () => {
          this.loader = false;
          this.messagesService.showServerError();
        },
      );
  }

  ngOnDestroy(): void {
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  buttonDisabled() {
    let disabledButton = false;
    if (!this.selectedSubcategory) {
      disabledButton = true;
    } else if (this.selectedSubcategory === 'Other') {
      disabledButton = true;
    }
    return disabledButton;
  }

  public setQuickRequest(value: string): void {
    this.selectedSubcategory = value;
  }
}
