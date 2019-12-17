import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { map } from 'rxjs/operators';
import { Request } from 'lib/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contler-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  sections = [
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
    },
    {
      name: 'Pedidos Remotos',
      icon: 'room_service',
      outlined: false,
    },
    {
      name: 'Wake up Calls',
      icon: 'access_alarm',
      outlined: false,
    },
    {
      name: 'Late Checkouts',
      icon: 'directions_walk',
      outlined: false,
    },
    {
      name: 'Solicitudes Especiales',
      icon: 'sms_failed',
      outlined: false,
    },
  ];

  private inmediateRequestsSubscription: Subscription | null = null;

  constructor(private router: Router, private inmediateRequestsService: InmediateRequestsService) {}

  goToPage(router: any[]) {
    this.router.navigate(router);
  }

  ngOnInit() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .pipe(
        map((requests: Request[]) => requests.filter(request => !request.finished_at)),
        map(requests => requests.length),
      )
      .subscribe(quantity => (this.sections[3].badge = quantity));
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }
}
