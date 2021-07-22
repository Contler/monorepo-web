import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InmediateRequestsService } from '@contler/hotel/inmediate-requests/services/inmediate-requests.service';
import { first, map, switchMap } from 'rxjs/operators';
import { combineLatest, Subscription } from 'rxjs';
import { SpecialRequestsService } from '@contler/hotel/special-requests/services/special-requests.service';
import { AuthService } from '@contler/hotel/services/auth.service';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { HotelService } from '@contler/hotel/services/hotel.service';

@Component({
  selector: 'contler-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  sections: ItemMenu[] = [
    {
      name: 'global.GUEST',
      icon: 'account_circle',
      link: ['/home', 'guest'],
      outlined: false,
      isReception: false,
      show: true,
    },
    {
      name: 'global.IMMEDIATE_REQUEST',
      icon: 'error',
      outlined: false,
      primary: true,
      link: ['home', 'inmediate-requests'],
      badge: null,
      isReception: false,
      show: true,
    },
    {
      name: 'global.RECEPTION',
      icon: 'room_service',
      link: ['home', 'inmediate-requests'],
      outlined: false,
      isReception: true,
      show: true,
    },
    {
      name: 'global.ZONE',
      icon: 'room',
      outlined: false,
      link: ['home', 'zone'],
      isReception: false,
      show: true,
    },
    {
      name: 'global.SPACE_RESERVATION',
      icon: 'event',
      outlined: false,
      link: ['home', 'reservation', 'calendar'],
      isReception: false,
      show: true,
    },
    {
      name: 'global.RESTAURANT',
      icon: 'restaurant',
      outlined: false,
      link: ['home', 'restaurant'],
      isReception: false,
      show: true,
    },
    {
      name: 'global.EMPLOYER',
      icon: 'account_circle',
      outlined: true,
      link: ['home', 'employer'],
      isReception: false,
      show: true,
    },
    {
      name: 'global.SPECIAL_REQUEST',
      icon: 'sms_failed',
      outlined: false,
      link: ['home', 'special-requests'],
      isReception: false,
      show: true,
    },
    {
      name: 'global.LATE_CHECKOUT',
      icon: 'directions_walk',
      outlined: false,
      link: ['home', 'late'],
      isReception: false,
      show: true,
    },
  ];

  private requestsSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private inmediateRequestsService: InmediateRequestsService,
    private specialRequestsService: SpecialRequestsService,
    private authService: AuthService,
    private dynamicService: DynamicModuleService,
    private hotelService: HotelService,
  ) {}

  goToPage(router: any[], isReception: boolean) {
    if (isReception) {
      this.router.navigate(router, { queryParams: { RECEPTION: 'RECEPTION' } });
    } else {
      this.router.navigate(router);
    }
  }

  async ngOnInit() {
    const initialConfiguration = await this.authService.$employer
      .pipe(
        first(),
        map((employer) => employer.hotel.initialConfiguration),
      )
      .toPromise();
    if (!initialConfiguration) {
      this.router.navigate(['preferences']);
    }
    this.authService.$hotel
      .pipe(switchMap((hotel) => this.hotelService.getSpecialZone(hotel.uid)))
      .subscribe((zones) => {
        this.sections = this.sections.map((section) => {
          if (section.isReception) {
            const isReceptionActive = zones.find((z) => z.zone.name === 'receptionZone');
            if (isReceptionActive) {
              section.show = isReceptionActive.status;
            }
          }
          if (section.name === 'global.LATE_CHECKOUT') {
            const isLateCheckoutActive = zones.find((z) => z.zone.name === 'lateZone');
            if (isLateCheckoutActive) {
              section.show = isLateCheckoutActive.status;
            }
          }
          return section;
        });
      });
    const immediateRequest$ = (hotelUid) => {
      return this.dynamicService.getDynamicRequest(hotelUid, MODULES.immediate, true);
    };
    const specialRequest$ = (hotelUid) => {
      return this.dynamicService.getDynamicRequest(hotelUid, MODULES.special, true);
    };
    this.requestsSubscription = this.authService.$hotel
      .pipe(switchMap((hotel) => combineLatest([immediateRequest$(hotel.uid), specialRequest$(hotel.uid)])))
      .pipe(map(([immediate, special]) => [immediate.length, special.length]))
      .subscribe(([immediateQuantity, specialQuantity]) => {
        this.sections[1].badge = immediateQuantity;
        this.sections[7].badge = specialQuantity;
      });
  }

  ngOnDestroy() {
    if (this.requestsSubscription) {
      this.requestsSubscription.unsubscribe();
    }
  }
}

interface ItemMenu {
  name: string;
  icon: string;
  outlined: boolean;
  isReception: boolean;
  primary?: boolean;
  link: string[] | null;
  badge?: number | null;
  show: boolean;
}
