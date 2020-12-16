import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { MenuController, Platform } from '@ionic/angular';
import { EmployerEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  name: string;
  prefix: string;
  unicode: string;
}

@Component({
  selector: 'contler-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: EmployerEntity | null = null;

  languages: Language[] = [
    {
      name: 'Español',
      prefix: 'es-CO',
      unicode: '🇨🇴',
    },
    {
      name: 'English',
      prefix: 'en-US',
      unicode: '🇬🇧',
    },
  ];

  lan: Language;

  public readonly menuItems: MenuItem[] = [
    {
      icon: 'home',
      name: 'menu.home',
      route: '/home',
      show: true,
    },
    {
      icon: 'error',
      name: 'menu.immediateRequest',
      route: '/home/inmediate-requests',
      show: true,
    },
    {
      icon: 'access_alarm',
      name: 'menu.wakeUp',
      route: '/home/wake-up',
      show: false,
    },
    {
      icon: 'sms_failed',
      name: 'menu.specialRequest',
      route: '/home/special-requests',
      show: true,
    },
    {
      icon: 'calendar_today',
      name: 'menu.booking',
      route: '/home/booking',
      show: true,
    },
    {
      icon: 'room_service',
      name: 'menu.order',
      route: '/home/order',
      show: true,
    },
    {
      icon: 'room_service',
      name: 'menu.reception',
      route: '/home/reception',
      show: false,
    },
    {
      icon: 'bar_chart',
      name: 'menu.statistic',
      route: '/home/statistic',
      show: true,
    },
    {
      icon: 'transfer_within_a_station',
      name: 'menu.lateCheckout',
      route: '/home/late',
      show: false,
    },
    {
      icon: 'cleaning_services',
      name: 'menu.clean',
      route: '/home/clean',
      show: false,
    },
    {
      icon: 'engineering',
      name: 'menu.maintain',
      route: '/home/maintain',
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
    private translate: TranslateService,
  ) {
    this.lan = this.languages.find((lan) => lan.prefix === localStorage.lan) || this.languages[0];
    this.auth.$user.subscribe((user) => {
      this.user = user;
      const chiefZones: string[] = [];
      this.user!.leaderZones.forEach((zone) => chiefZones.push(zone.name));
      this.chiefZonesLabel = chiefZones.join('-');
      this.menuItems[2].show = this.user!.wakeZone;
      this.menuItems[5].show = this.user!.deliveryZone;
      this.menuItems[6].show = this.user.receptionZone;
      this.menuItems[8].show = this.user.lateZone;
      this.menuItems[9].show = this.user.cleanZone;
      this.menuItems[10].show = this.user.maintainZone;
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
    this.closeToogle();
  }

  closeToogle() {
    this.menuController.toggle();
  }

  isRouteSelected(route: string): boolean {
    return this.currentRoute!.includes(route);
  }

  logout() {
    this.auth
      .logout()
      .then(() => {
        this.closeToogle();
        this.router.navigate(['/login']);
      })
      .catch(() => {
        console.error('Hubo un error');
      });
  }

  changeLanguage() {
    localStorage.lan = this.lan.prefix;
    this.translate.use(this.lan.prefix);
    this.menuController.toggle();
  }
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
  show: boolean;
}
