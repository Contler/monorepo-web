import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { SUB_CATEGORY, SUB_CATEGORY_DRINKS } from '@contler/const';
import { NotificationsService } from 'guest/services/notifications.service';
import { UsersService } from 'guest/services/users.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { HotelEntity, ZoneEntity } from '@contler/entity';
import { RequestRequest } from '@contler/models/request-request';
import { RequestService } from 'guest/services/request.service';

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
    private requestService: RequestService,
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
        this.zone = zone;
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
    this.loader = true;
    const chiefTokens: string[] = this.zone!.leaders.filter(leader => !!leader.pushToken).map(
      leader => leader.pushToken,
    );
    this.guestService.$guest
      .pipe(
        map(guest => {
          const request = new RequestRequest();
          request.hotel = guest!.hotel;
          request.guest = guest!;
          request.room = guest!.room;
          request.zone = this.zone!;
          request.special = false;
          request.message = this.requestController.value + ' ' + this.drinkName + ' ' + this.drinksQuantity;
          return request;
        }),
        switchMap(request => this.requestService.saveRequest(request)),
      )
      .subscribe(
        () => {
          this.loader = false;
          this.notificationsService.sendMassiveNotification('Tienes una nueva solicitud inmediata', chiefTokens);
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
