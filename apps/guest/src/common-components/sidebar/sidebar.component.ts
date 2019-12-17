import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { User } from 'lib/models/user';
import { UsersService } from 'guest/services/users.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

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
    {
      icon: 'exit_to_app',
      name: 'Cerrar Sesión',
      route: null,
    },
  ];

  public currentRoute: string | null = null;
  public user: User | null = null;

  private userSubscription: Subscription | null = null;

  constructor(
    private router: Router, 
    private usersService: UsersService, 
    private auth: AngularFireAuth) {}

  async ngOnInit() {
    this.listenCurrentRoute();
    this.listenUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
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
}

interface MenuItem {
  icon: string;
  name: string;
  route: string | null;
}
