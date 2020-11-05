import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';
import { MenuController } from '@ionic/angular';
import { take } from 'rxjs/operators';

export enum ServiceType {
  IMMEDIATE,
  WAKE_UP,
  SPECIAL,
  RESERVATION,
  DELIVERY,
  RECEPTION,
  CHECK_OUT,
  CLEAN,
  MAINTAIN,
}

@Component({
  selector: 'contler-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  user: EmployerEntity | null = null;
  listServices = [
    {
      icon: 'error',
      name: 'Solicitudes inmediatas',
      route: '/home/inmediate-requests',
      type: ServiceType.IMMEDIATE,
    },

    {
      icon: 'sms_failed',
      name: 'Solicitudes especiales',
      route: '/home/special-requests',
      type: ServiceType.SPECIAL,
    },
    {
      icon: 'calendar_today',
      name: 'Reservas',
      route: '/home/booking',
      type: ServiceType.RESERVATION,
    },
  ];

  constructor(private auth: AuthService, public generalService: GeneralService, public menu: MenuController) {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;
      if (this.user!.wakeZone) {
        this.listServices.push({
          icon: 'access_alarm',
          name: 'Wake up calls',
          route: '/home/wake-up',
          type: ServiceType.WAKE_UP,
        });
      }
      if (this.user!.deliveryZone) {
        this.listServices.push({
          icon: 'room_service',
          name: 'Pedidos',
          route: '/home/order',
          type: ServiceType.DELIVERY,
        });
      }
      if (this.user!.receptionZone) {
        this.listServices.push({
          icon: 'room_service',
          name: 'Recepción',
          route: '/home/reception',
          type: ServiceType.RECEPTION,
        });
      }
      if (this.user!.lateZone) {
        this.listServices.push({
          icon: 'transfer_within_a_station',
          name: 'Late Checkout',
          route: '/home/late',
          type: ServiceType.CHECK_OUT,
        });
      }
      if (this.user!.cleanZone) {
        this.listServices.push({
          icon: 'cleaning_services',
          name: 'Limpieza',
          route: '/home/clean',
          type: ServiceType.CLEAN,
        });
      }
      if (this.user!.maintainZone) {
        this.listServices.push({
          icon: 'engineering',
          name: 'Mantenimiento',
          route: '/home/maintain',
          type: ServiceType.MAINTAIN,
        });
      }
    });
  }

  ngOnInit(): void {}
}
