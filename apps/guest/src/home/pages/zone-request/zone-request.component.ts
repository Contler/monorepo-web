import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { Hotel, Request, Zone, User } from 'lib/models';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { SUB_CATEGORY } from 'lib/const';
import { NotificationsService } from 'guest/services/notifications.service';
import { UsersService } from 'guest/services/users.service';

@Component({
  selector: 'contler-zone-request',
  templateUrl: './zone-request.component.html',
  styleUrls: ['./zone-request.component.scss'],
})
export class ZoneRequestComponent implements OnDestroy {
  @ViewChild('content', { static: false }) content!: ElementRef<HTMLDivElement>;

  hotel: Hotel | null | undefined;
  requestController = new FormControl('', Validators.required);
  loader = false;
  zone: Zone | undefined;
  categories = SUB_CATEGORY;
  private zoneUid: string | null;
  private guestSubscribe: Subscription;
  private zoneSubscribe: Subscription;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private afDb: AngularFireDatabase,
    private zoneService: ZoneService,
    private notificationsService: NotificationsService,
    private usersService: UsersService,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
    this.zoneUid = this.route.snapshot.paramMap.get('id');
    this.zoneSubscribe = this.zoneService.$zones
      .pipe(map(zones => zones.find(zone => zone.uid === this.zoneUid)))
      .subscribe(zone => (this.zone = zone));
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  getButtonColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `background-color: ${this.hotel.color}; color: #ffffff !important` : '',
    );
  }

  async saveRequest() {
    const chiefTokens: string[] = await this.getChiefTokens();
    this.loader = true;
    this.guestService.$guest
      .pipe(
        map(
          guest =>
            new Request(
              this.afDb.createPushId()!,
              this.hotel!.uid!,
              guest!.uid,
              `${guest!.name} ${guest!.lastName}`,
              this.zoneUid!,
              this.zone ? this.zone.name : '-',
              this.requestController.value,
            ),
        ),
        switchMap(request => this.afDb.object(`${Request.REF}/${request.uid}`).set(request.serialize())),
      )
      .subscribe(async () => {
        await this.notificationsService.sendMassiveNotification('Tienes una nueva solicitud inmediata', chiefTokens);
        this.loader = false;
        this.requestController.reset();
      });
  }

  private getChiefTokens(): Promise<string[]> {
    return new Promise(async resolve => {
      let chiefTokens: string[] = [];
      const users: User[] = (await this.usersService
        .getChiefsByHotel(this.hotel && this.hotel.uid ? this.hotel.uid : '')
        .pipe(
          map(users => users.filter((user: any) => user.leaderZone[this.zone ? this.zone.uid : ''])),
          take(1),
        )
        .toPromise()) as User[];
      for (let i = 0; i < users.length; i++) {
        const userTokens = await this.usersService
          .getTokensByUser(<string>users[i].uid)
          .pipe(
            take(1),
            map((data: any) => {
              let tokens: string[] = [];
              for (let token in data) {
                tokens.push(token);
              }
              return tokens;
            }),
          )
          .toPromise();
        chiefTokens = chiefTokens.concat(userTokens);
      }
      resolve(chiefTokens);
    });
  }

  setQuickRequest(value: string) {
    this.requestController.setValue(value);
    const temp = this.content.nativeElement.parentNode as any;
    temp.scrollTop = temp.scrollHeight;
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
