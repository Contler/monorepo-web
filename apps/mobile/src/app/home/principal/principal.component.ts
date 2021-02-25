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
  ROOM,
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
      name: 'menu.immediateRequest',
      route: '/home/inmediate-requests',
      type: ServiceType.IMMEDIATE,
    },

    {
      icon: 'sms_failed',
      name: 'menu.specialRequest',
      route: '/home/special-requests',
      type: ServiceType.SPECIAL,
    },
    {
      icon: 'calendar_today',
      name: 'menu.booking',
      route: '/home/booking',
      type: ServiceType.RESERVATION,
    },
  ];

  constructor(private auth: AuthService, public generalService: GeneralService, public menu: MenuController) {
    this.auth.$user.pipe(take(1)).subscribe((user) => {
      this.user = user;

      if (this.user.leaderZones.find((le) => le.category.id === 3)) {
        this.listServices.push({
          icon: 'bed',
          name: 'menu.room',
          route: '/home/room',
          type: ServiceType.ROOM,
        });
      }
      if (this.user.leaderSpecialZone.find((sp) => sp.zone.name === 'wakeZone')) {
        this.listServices.push({
          icon: 'access_alarm',
          name: 'menu.wakeUp',
          route: '/home/wake-up',
          type: ServiceType.WAKE_UP,
        });
      }
      if (this.user.leaderSpecialZone.find((sp) => sp.zone.name === 'deliveryZone')) {
        this.listServices.push({
          icon: 'room_service',
          name: 'menu.order',
          route: '/home/order',
          type: ServiceType.DELIVERY,
        });
      }
      if (this.user.leaderSpecialZone.find((sp) => sp.zone.name === 'receptionZone')) {
        this.listServices.push({
          icon: 'room_service',
          name: 'menu.reception',
          route: '/home/reception',
          type: ServiceType.RECEPTION,
        });
      }
      if (this.user.leaderSpecialZone.find((sp) => sp.zone.name === 'lateZone')) {
        this.listServices.push({
          icon: 'transfer_within_a_station',
          name: 'menu.lateCheckout',
          route: '/home/late',
          type: ServiceType.CHECK_OUT,
        });
      }
      if (this.user.leaderSpecialZone.find((sp) => sp.zone.name === 'cleanZone')) {
        this.listServices.push({
          icon: 'cleaning_services',
          name: 'menu.clean',
          route: '/home/clean',
          type: ServiceType.CLEAN,
        });
      }
      if (this.user.leaderSpecialZone.find((sp) => sp.zone.name === 'maintainZone')) {
        this.listServices.push({
          icon: 'engineering',
          name: 'menu.maintain',
          route: '/home/maintain',
          type: ServiceType.MAINTAIN,
        });
      }
    });
  }

  ngOnInit(): void {}
}
