import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { MenuController, Platform } from '@ionic/angular';
import { EmployerEntity } from '@contler/entity';

@Component({
  selector: 'contler-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: EmployerEntity | null = null;
  private showReception = false;

  public readonly menuItems: MenuItem[] = [
    {
      icon: 'error',
      name: 'Solicitudes inmediatas',
      route: '/home/inmediate-requests',
      show: true,
    },
    {
      icon: 'access_alarm',
      name: 'Wake up calls',
      route: '/home/wake-up',
      show: false,
    },
    {
      icon: 'sms_failed',
      name: 'Solicitudes especiales',
      route: '/home/special-requests',
      show: true,
    },
    {
      icon: 'calendar_today',
      name: 'Reservas',
      route: '/home/booking',
      show: true,
    },
    {
      icon: 'room_service',
      name: 'Pedidos remotos',
      route: '/home/order',
      show: true,
    },
    {
      icon: 'room_service',
      name: 'Recepción',
      route: '/home/reception',
      show: false,
    },
    {
      icon: 'bar_chart',
      name: 'Estadisticas',
      route: '/home/statistic',
      show: true,
    },
    {
      icon: 'transfer_within_a_station',
      name: 'Late Checkout',
      route: '/home/late',
      show: false,
    },
  ];
  public currentRoute: string | undefined;
  public chiefZonesLabel: string | undefined;

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    public auth: AuthService,
    private platform: Platform,
    private menuController: MenuController,
  ) {
    this.auth.$user.subscribe((user) => {
      this.user = user;
      const chiefZones: string[] = [];
      this.user!.leaderZones.forEach((zone) => chiefZones.push(zone.name));
      this.chiefZonesLabel = chiefZones.join('-');
      this.menuItems[1].show = this.user!.wakeZone;
      this.menuItems[4].show = this.user!.lateZone;
      this.menuItems[5].show = this.user.receptionZone;
    });
  }

  async ngOnInit() {
    this.listenCurrentRoute();
    if (this.platform.is('cordova')) {
      await this.setUserToken();
    }
  }

  private listenCurrentRoute() {
    this.currentRoute = this.router.url;
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((data) => {
      this.currentRoute = (data as NavigationEnd).url;
    });
  }

  setUserToken() {
    this.notificationsService.setTokenToUser();
  }

  goToRoute(url: string) {
    this.router.navigateByUrl(url);
    this.menuController.toggle();
  }

  isRouteSelected(route: string): boolean {
    return this.currentRoute!.includes(route);
  }

  logout() {
    this.auth
      .logout()
      .then(() => {
        this.menuController.toggle();
        this.router.navigate(['/login']);
      })
      .catch(() => {
        console.error('Hubo un error');
      });
  }
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
  show: boolean;
}
