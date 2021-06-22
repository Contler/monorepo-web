import { Component, OnInit } from '@angular/core';
import { GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
import { MessagesService } from 'guest/services/messages/messages.service';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmediateOptionLink, OptionModule, OptionType } from '@contler/models';
import { RoomService } from '@contler/core';
import { ZoneService } from '../services/zone.service';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { MODULES, RequestService, TypeRequest } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';

@Component({
  selector: 'contler-my-room',
  templateUrl: './my-room.component.html',
  styleUrls: ['./my-room.component.scss'],
})
export class MyRoomComponent implements OnInit {
  selectedSubcategory = '';
  loader = false;
  zone: ZoneEntity;
  modules$: Observable<OptionModule[]>;

  constructor(
    route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService,
    private zoneService: ZoneService,
    private roomService: RoomService,
    private analytics: AngularFireAnalytics,
    private requestService: RequestService,
    private store: Store<State>,
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
    this.modules$ = this.store.pipe(
      selectUserState,
      first(),
      map((data) => data.hotel),
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
    this.store
      .pipe(
        selectUserState,
        first(),
        map(({ user, hotel }) => this.generateRequest(hotel, user, msg)),
        switchMap((request) => this.requestService.saveRequest(request)),
      )
      .subscribe(
        () => {
          this.analytics
            .logEvent('request_create', {
              type: 'room',
              service: 'zoneRequest.categories.roomKeys',
              time: new Date(),
            })
            .then(() => {
              this.loader = false;
              this.router.navigate(['/home/my-request']);
            });
        },
        (error) => {
          console.error(error);
          this.messagesService.showServerError();
        },
      );
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

  private generateRequest(hotel: HotelEntity, guest: GuestEntity, msg: string) {
    return this.requestService.createRequest(TypeRequest.MESSAGE_REQUEST, {
      hotel,
      service: MODULES.immediate,
      zone: this.zone || null,
      guest,
      message: msg,
    }).request;
  }
}
