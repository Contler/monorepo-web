import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SpecialRequestsService } from 'hotel/special-requests/services/special-requests.service';
import { RequestEntity } from '@contler/entity';

@Component({
  selector: 'contler-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  sections: ItemMenu[] = [
    {
      name: 'Huéspedes',
      icon: 'account_circle',
      link: ['/home', 'guest'],
      outlined: false,
      isReception: false,
    },
    {
      name: 'Solicitudes inmediatas',
      icon: 'error',
      outlined: false,
      primary: true,
      link: ['home', 'inmediate-requests'],
      badge: null,
      isReception: false,
    },
    {
      name: 'Recepción',
      icon: 'room_service',
      link: ['home', 'inmediate-requests'],
      outlined: false,
      isReception: true,
    },
    {
      name: 'Zonas',
      icon: 'room',
      outlined: false,
      link: ['home', 'zone'],
      isReception: false,
    },
    {
      name: 'Reservas de espacios',
      icon: 'event',
      outlined: false,
      link: ['home', 'reservation', 'calendar'],
      isReception: false,
    },
    {
      name: 'Restaurante',
      icon: 'restaurant',
      outlined: false,
      link: ['home', 'restaurant'],
      isReception: false,
    },
    {
      name: 'Empleados',
      icon: 'account_circle',
      outlined: true,
      link: ['home', 'employer'],
      isReception: false,
    },
    {
      name: 'Solicitudes Especiales',
      icon: 'sms_failed',
      outlined: false,
      link: ['home', 'special-requests'],
      isReception: false,
    },
    {
      name: 'Late Checkouts',
      icon: 'directions_walk',
      outlined: false,
      link: ['home', 'late'],
      isReception: false,
    },
  ];

  private inmediateRequestsSubscription: Subscription | null = null;
  private specialRequestsSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private inmediateRequestsService: InmediateRequestsService,
    private specialRequestsService: SpecialRequestsService,
  ) {}

  goToPage(router: any[], isReception: boolean) {
    if (isReception) {
      this.router.navigate(router, { queryParams: { RECEPTION: 'RECEPTION' } });
    } else {
      this.router.navigate(router);
    }
  }

  ngOnInit() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .pipe(
        map((requests: RequestEntity[]) => requests.filter((request) => !request.finishAt)),
        map((requests) => requests.length),
      )
      .subscribe((quantity) => (this.sections[1].badge = quantity));
    this.specialRequestsSubscription = this.specialRequestsService
      .listenSpecialRequestByHotel()
      .pipe(
        map((requests: RequestEntity[]) => requests.filter((request) => !request.complete)),
        map((requests) => requests.length),
      )
      .subscribe((quantity) => (this.sections[4].badge = quantity));
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
    if (this.specialRequestsSubscription) {
      this.specialRequestsSubscription.unsubscribe();
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
}
