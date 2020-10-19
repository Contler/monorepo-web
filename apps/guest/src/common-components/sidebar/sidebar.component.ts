import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from '@contler/models/user';
import { UsersService } from 'guest/services/users.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { GuestService } from 'guest/services/guest.service';
import { HotelEntity } from '@contler/entity';

@Component({
  selector: 'contler-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public readonly menuItems: MenuItem[] = [
    {
      icon: 'error',
      name: 'Inmediate Request',
      route: '/home/guest-requests',
    },
    {
      icon: 'error_outline',
      name: 'My immediate requests',
      route: '/home/my-inmediate-requests',
    },
    {
      icon: 'calendar_today',
      name: 'Reservations',
      route: '/home/reservation',
    },
    {
      icon: 'calendar_today',
      name: 'My Reservations',
      route: '/home/reservation/my-reservation',
    },
    {
      icon: 'room_service',
      name: 'Orders',
      route: '/home/product',
    },
    {
      icon: 'sms_failed',
      name: 'Special requests',
      route: '/home/special-requests',
    },
    {
      icon: 'alarm',
      name: 'Wake up call',
      route: '/home/wake-up',
    },
    {
      icon: 'directions_walk',
      name: 'Late Check-out',
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
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
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
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
}
