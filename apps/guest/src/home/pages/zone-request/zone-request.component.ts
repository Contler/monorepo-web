import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { Request, User } from '@contler/models';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { SUB_CATEGORY, SUB_CATEGORY_DRINKS } from '@contler/const';
import { NotificationsService } from 'guest/services/notifications.service';
import { UsersService } from 'guest/services/users.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { HotelEntity, ZoneEntity } from '@contler/entity';

@Component({
  selector: 'contler-zone-request',
  templateUrl: './zone-request.component.html',
  styleUrls: ['./zone-request.component.scss'],
})
export class ZoneRequestComponent implements OnDestroy {
  @ViewChild('content', { static: false }) content!: ElementRef<HTMLDivElement>;

  hotel: HotelEntity | null | undefined;
  requestController = new FormControl('', Validators.required);
  loader = false;
  zone: ZoneEntity | undefined;
  categories = SUB_CATEGORY;
  private zoneUid: string | null;
  private guestSubscribe: Subscription;
  private zoneSubscribe: Subscription;

  public isSubCategory = false; // DRINKS PAGE, etc

  //CODIGO TEMPORAL HASTA DEFINIR LOGICA DE PRODUCTOS
  public typeName: string | null = null;
  public drinkName: string | null = null;
  public drinksQuantity: number | null = null;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private afDb: AngularFireDatabase,
    private zoneService: ZoneService,
    private notificationsService: NotificationsService,
    private usersService: UsersService,
    private messagesService: MessagesService,
    private router: Router,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
    this.zoneUid = this.route.snapshot.paramMap.get('id');
    this.zoneSubscribe = this.zoneService.$zones
      .pipe(map(zones => zones.find(zone => zone.uid === this.zoneUid)))
      .subscribe(zone => {
        this.zone = zone
        console.log(zone);
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

  async saveRequest() {
    const chiefTokens: string[] = await this.getChiefTokens();
    this.loader = true;
    this.guestService.$guest
      .pipe(
        map(guest => {
          const request = new Request(
            this.afDb.createPushId()!,
            this.hotel!.uid!,
            guest!.uid,
            `${guest!.name} ${guest!.lastName}`,
            this.zoneUid!,
            this.zone ? this.zone.name : '-',
            this.requestController.value,
          );
          request.room = guest!.room!.name;
          if (this.isSubCategory) {
            // MÁS ADELANTE PUEDEN HABER DIFERENTES TIPOS DE 'SUB CATEGORÍAS PARA TENER EN CUENTA
            request.drinkData = {
              typeKey: null,
              typeName: this.typeName,
              drinkKey: null,
              drinkName: this.drinkName,
              units: this.drinksQuantity,
            };
          }
          return request;
        }),
        switchMap(request => this.afDb.object(`${Request.REF}/${request.uid}`).set(request.serialize())),
      )
      .subscribe(
        async () => {
          await this.notificationsService.sendMassiveNotification('Tienes una nueva solicitud inmediata', chiefTokens);
          this.loader = false;
          this.requestController.reset();
          this.router.navigate(['/home']);
          this.messagesService.showToastMessage('Solicitud inmediata creada exitosamente');
        },
        () => {
          this.loader = false;
          this.messagesService.showServerError();
        },
      );
  }

  private getChiefTokens(): Promise<string[]> {
    return new Promise(async resolve => {
      let chiefTokens: string[] = [];
      const users: User[] = (await this.usersService
        .getChiefsByHotel(this.hotel && this.hotel.uid ? this.hotel.uid : '')
        .pipe(
          map(userss => userss.filter((user: any) => user.leaderZone[this.zone ? this.zone.uid : ''])),
          take(1),
        )
        .toPromise()) as User[];
      for (let i = 0; i < users.length; i++) {
        const userTokens = await this.usersService
          .getTokensByUser(<string>users[i].uid)
          .pipe(
            take(1),
            map((data: any) => {
              const tokens: string[] = [];
              for (const token in data) {
                if (token in data) {
                  tokens.push(token);
                }
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
    if (value === SUB_CATEGORY_DRINKS) {
      this.isSubCategory = true;
    }
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
