import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '@contler/models/user';
import { UsersService } from 'guest/services/users.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GuestService } from 'guest/services/guest.service';
import { HotelEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@contler/models/language.model';
import { LANGUAGES } from '@contler/const';

@Component({
  selector: 'contler-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  readonly languages = LANGUAGES;
  actualLanguage: Language;

  public readonly menuItems: MenuItem[] = [
    {
      icon: 'error',
      name: 'sidebar.immediateRequest',
      route: '/home/guest-requests',
    },
    {
      icon: 'error_outline',
      name: 'sidebar.myImmediateRequests',
      route: '/home/my-inmediate-requests',
    },
    {
      icon: 'book',
      name: 'sidebar.myRequest',
      route: '/home/my-request',
    },
    {
      icon: 'engineering',
      name: 'sidebar.maintenance',
      route: '/home/maintenance',
    },
    {
      icon: 'cleaning_services',
      name: 'sidebar.cleaning',
      route: '/home/cleaning',
    },
    {
      icon: 'calendar_today',
      name: 'sidebar.reservations',
      route: '/home/reservation',
    },
    {
      icon: 'calendar_today',
      name: 'sidebar.myReservations',
      route: '/home/reservation/my-reservation',
    },
    {
      icon: 'room_service',
      name: 'sidebar.orders',
      route: '/home/product',
    },
    {
      icon: 'sms_failed',
      name: 'sidebar.specialRequests',
      route: '/home/special-requests',
    },
    {
      icon: 'alarm',
      name: 'sidebar.wakeUpCall',
      route: '/home/wake-up',
    },
    {
      icon: 'directions_walk',
      name: 'sidebar.lateCheckOut',
      route: '/home/late',
    },
  ];

  public currentRoute: string | null = null;
  public user: User | null = null;
  public hotel: HotelEntity | null | undefined;

  private userSubscription: Subscription | null = null;
  private guestSubscribe: Subscription;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private auth: AngularFireAuth,
    private guestService: GuestService,
    private translate: TranslateService,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
    const { lan } = window.localStorage;
    this.actualLanguage = LANGUAGES.find((l) => l.prefix === lan) || LANGUAGES[0];
  }

  async ngOnInit() {
    this.listenCurrentRoute();
    this.listenUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  private listenCurrentRoute() {
    this.currentRoute = this.router.url;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data: any) => (this.currentRoute = data.url));
  }

  private async listenUser() {
    const usr = await this.auth.currentUser;
    this.userSubscription = this.usersService.getUserByKey(usr ? usr.uid : '').subscribe(
      (user) => (this.user = user as User),
      () => {},
    );
  }

  goToRoute(url: string) {
    this.router.navigateByUrl(url);
  }

  isSelectedRoute(route: string): boolean {
    return this.currentRoute !== null && this.currentRoute.includes(route);
  }

  async logout() {
    this.auth
      .signOut()
      .then(() => this.router.navigate(['/login']))
      .catch(() => {});
  }

  changeLanguage() {
    this.translate.use(this.actualLanguage.prefix);
    window.localStorage.lan = this.actualLanguage.prefix;
  }
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
}
