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
      name: 'Empleados',
      icon: 'account_circle',
      outlined: true,
      link: ['home', 'employer'],
    },
    {
      name: 'Habitaciones',
      icon: 'meeting_room',
      outlined: false,
      link: ['home', 'room'],
    },
    {
      name: 'Zonas',
      icon: 'room',
      outlined: false,
      link: ['home', 'zone'],
    },
    {
      name: 'Solicitudes inmediatas',
      icon: 'error',
      outlined: false,
      primary: true,
      link: ['home', 'inmediate-requests'],
      badge: null,
    },
    {
      name: 'Reservas de espacios',
      icon: 'event',
      outlined: false,
      link: null,
    },
    {
      name: 'Pedidos Remotos',
      icon: 'room_service',
      outlined: false,
      link: null,
    },
    {
      name: 'Wake up Calls',
      icon: 'access_alarm',
      outlined: false,
      link: ['home', 'wake-up'],
    },
    {
      name: 'Late Checkouts',
      icon: 'directions_walk',
      outlined: false,
      link: null,
    },
    {
      name: 'Solicitudes Especiales',
      icon: 'sms_failed',
      outlined: false,
      link: ['home', 'special-requests'],
    },
  ];

  private inmediateRequestsSubscription: Subscription | null = null;
  private specialRequestsSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private inmediateRequestsService: InmediateRequestsService,
    private specialRequestsService: SpecialRequestsService,
  ) {}

  goToPage(router: any[]) {
    this.router.navigate(router);
  }

  ngOnInit() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .pipe(
        map((requests: RequestEntity[]) => requests.filter(request => !request.finishAt)),
        map(requests => requests.length),
      )
      .subscribe(quantity => (this.sections[3].badge = quantity));
    this.specialRequestsSubscription = this.specialRequestsService
      .listenSpecialRequestByHotel()
      .pipe(
        map((requests: RequestEntity[]) => requests.filter(request => !request.complete)),
        map(requests => requests.length),
      )
      .subscribe(quantity => (this.sections[8].badge = quantity));
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
  primary?: boolean;
  link: string[] | null;
  badge?: number | null;
}
