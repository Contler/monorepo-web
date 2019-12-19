import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { User } from 'lib/models/user';
import { UsersService } from 'guest/services/users.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Hotel } from 'lib/models/hotel';
import { GuestService } from 'guest/services/guest.service';

@Component({
  selector: 'contler-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public readonly menuItems: MenuItem[] = [
    {
      icon: 'error',
      name: 'Solicitud inmediata',
      route: '/home/guest-requests',
    },
    {
      icon: 'error_outline',
      name: 'Mis solicitudes inmediatas',
      route: '/home/my-inmediate-requests',
    },
    {
      icon: 'calendar_today',
      name: 'Reservas',
      route: null,
    },
    {
      icon: 'room_service',
      name: 'Pedidos',
      route: null,
    },
    {
      icon: 'sms_failed',
      name: 'Solicitudes especiales',
      route: '/home/special-requests',
    },
    {
      icon: 'alarm',
      name: 'Wake up call',
      route: null,
    },
    {
      icon: 'directions_walk',
      name: 'Late Checkout',
      route: null,
    },
  ];

  public currentRoute: string | null = null;
  public user: User | null = null;
  public hotel: Hotel | null | undefined;

  private userSubscription: Subscription | null = null;
  private guestSubscribe: Subscription;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private auth: AngularFireAuth,
    private guestService: GuestService,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: any) => (this.currentRoute = data.url));
  }

  private listenUser() {
    this.userSubscription = this.usersService
      .getUserByKey(this.auth.auth.currentUser ? this.auth.auth.currentUser.uid : '')
      .subscribe(user => (this.user = user as User), () => {});
  }

  goToRoute(url: string) {
    this.router.navigateByUrl(url);
  }

  isSelectedRoute(route: string): boolean {
    return this.currentRoute !== null && this.currentRoute.includes(route);
  }

  async logout() {
    this.auth.auth
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
