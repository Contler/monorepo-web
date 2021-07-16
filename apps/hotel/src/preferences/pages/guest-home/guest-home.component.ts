import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@contler/hotel/services/auth.service';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HotelEntity, SpecialZoneHotelEntity } from '@contler/entity';
import { HotelService, SpecialZoneGuestService } from '@contler/core';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';
import { SpecialZoneGuest } from '@contler/models';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditSpecialZoneGuestComponent } from './edit-special-zone-guest/edit-special-zone-guest.component';
import { TranslateService } from '@contler/dynamic-translate';
import { getLan } from '@contler/const';
import { GuestHomeCanDeactivateGuard } from '@contler/hotel/preferences/pages/guest-home/guards/guest-home-can-deactivate.guard';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { EcommerceService } from '@contler/hotel/ecommerce/services/ecommerce.service';

@Component({
  selector: 'contler-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.scss'],
  providers: [GuestHomeCanDeactivateGuard],
})
export class GuestHomeComponent implements OnInit {
  hotel: HotelEntity;
  SpecialZoneHotelEntity = SpecialZoneHotelEntity;
  specialZoneGuest$: Observable<SpecialZoneGuest[]>;
  specialZoneGuest: SpecialZoneGuest[] = [];
  preparedZonesUpdate: { [index: string]: SpecialZoneGuest } = {};
  hasChanges = false;

  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private messagesService: MessagesService,
    private specialZoneGuestService: SpecialZoneGuestService,
    private router: Router,
    private matDialog: MatDialog,
    public translate: TranslateService,
    private ecommerceService: EcommerceService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  canDeactivate(): boolean {
    return !this.hasChanges;
  }

  ngOnInit(): void {
    this.specialZoneGuest$ = this.authService.$hotel.pipe(
      tap((hotel) => (this.hotel = hotel)),
      switchMap((hotel) =>
        this.specialZoneGuestService
          .getSpecialZoneGuest(hotel.uid)
          .pipe(tap((specialZones) => (this.specialZoneGuest = specialZones))),
      ),
    );
  }

  public async goToHome(): Promise<void> {
    const zonesUpdate: { [index: string]: SpecialZoneGuest } = {};
    const promisesRemoveOldKeys = [];
    const loader = this.messagesService.showLoader();
    this.specialZoneGuest.forEach((zone, index) => {
      if (
        this.preparedZonesUpdate.hasOwnProperty(index) &&
        (this.preparedZonesUpdate[index].status !== zone.status ||
          this.preparedZonesUpdate[index].name !== zone.name)
      ) {
        zonesUpdate[index] = this.preparedZonesUpdate[index];
      }
      if (
        this.preparedZonesUpdate.hasOwnProperty(index) &&
        this.preparedZonesUpdate[index].name !== zone.name &&
        !zone.name.includes('.')
      ) {
        promisesRemoveOldKeys.push(this.translate.removeTranslate(zone.name, this.hotel.uid));
      }
    });
    try {
      await Promise.all(promisesRemoveOldKeys);
      await this.specialZoneGuestService.updateMultipleSpecialZoneGuest(this.hotel.uid, zonesUpdate);
      this.messagesService.closeLoader(loader);
      this.hasChanges = false;
      this.router.navigate(['home']);
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
      console.log(err);
    }
  }

  updateZone($event: MatSlideToggleChange, zone: SpecialZoneGuest, index: number): void {
    zone.status = $event.checked;
    this.preparedZonesUpdate[index] = zone;
    if (Object.keys(this.preparedZonesUpdate).length) {
      this.hasChanges = true;
    }
    this.specialZoneGuest$ = this.specialZoneGuest$.pipe(
      map((specialZones) =>
        specialZones.map((specialZone, i) => {
          if (i === index) {
            specialZone = zone;
          }
          return specialZone;
        }),
      ),
    );
  }

  public openEditZoneName(zone: SpecialZoneGuest, index: number): void {
    const dialogEditSpecialZone = this.matDialog.open(EditSpecialZoneGuestComponent, {
      disableClose: true,
      data: zone,
      id: zone.link,
    });
    dialogEditSpecialZone.afterClosed().subscribe(async (response) => {
      if (response) {
        const loader = this.messagesService.showLoader();
        try {
          await this.updateSpecialZone(response, zone, index);
          this.hasChanges = true;
          this.messagesService.closeLoader(loader);
        } catch (err) {
          this.messagesService.closeLoader(loader);
          this.messagesService.showServerError();
        }
      }
    });
  }

  async updateSpecialZone(response: string, zone: SpecialZoneGuest, index: number) {
    const [actualLan, languages] = getLan();
    const translate = await this.translate
      .generateUrl({
        actualLan,
        languages,
        url: 'specialZoneGuest',
        hotel: this.hotel.uid,
        mgs: response,
      })
      .toPromise();
    zone.name = translate.key;
    this.preparedZonesUpdate[index] = zone;
    this.specialZoneGuest$ = this.specialZoneGuest$.pipe(
      map((specialZones) =>
        specialZones.map((specialZone, i) => {
          if (i === index) {
            specialZone = zone;
          }
          return specialZone;
        }),
      ),
    );
  }

  updateECommerce($event: MatSlideToggleChange, ecommerce: EcommerceEntity, index: number): void {
    ecommerce.status = $event.checked;
    const loader = this.messagesService.showLoader();
    this.ecommerceService.updateCommerce(ecommerce).subscribe(
      () => {
        this.hotel.ecommerce[index].status = ecommerce.status;
        this.messagesService.closeLoader(loader);
      },
      () => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
      },
    );
  }
}
