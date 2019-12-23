import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { MenuController, Platform } from '@ionic/angular';
import { ZoneService } from '../services/zone.service';

@Component({
  selector: "contler-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  public readonly menuItems: MenuItem[] = [
    {
      icon: "error",
      name: "Solicitudes inmediatas",
      route: "/home/inmediate-requests"
    },
    {
      icon: "access_alarm",
      name: "Wake up calls",
      route: null
    },
    {
      icon: "sms_failed",
      name: "Solicitudes especiales",
      route: "/home/special-requests"
    }
  ];

  public currentRoute: string | undefined;
  public chiefZonesLabel: string | undefined;

  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    public auth: AuthService,
    private platform: Platform,
    private menuController: MenuController,
    private zoneService: ZoneService
  ) {}

  async ngOnInit() {
    this.listenCurrentRoute();
    if (this.platform.is("cordova")) {
      await this.setUserToken();
    }
    this.zoneService
      .getZones()
      .pipe(take(1))
      .subscribe(zones => {
        const chiefZones: string[] = [];
        zones.forEach(zone => {
          if (this.auth.user!.leaderZone[zone.uid]) {
            chiefZones.push(zone.name);
          }
        });
        this.chiefZonesLabel = chiefZones.join("-");
      }, console.error);
  }

  private listenCurrentRoute() {
    this.currentRoute = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(data => {
        this.currentRoute = (data as NavigationEnd).url
      });
  }

  async setUserToken() {
    const token = await this.notificationsService.getPlayerId();
    await this.notificationsService.setTokenToUser(this.auth.user!.uid!, token);
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
        this.router.navigate(["/login"]);
      })
      .catch(() => {
        console.error("Hubo un error");
      });
  }
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
}
