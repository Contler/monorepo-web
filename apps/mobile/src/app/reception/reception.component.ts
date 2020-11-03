import { Component, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GeneralService } from '../services/general.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnDestroy {
  readonly PAGES = {
    PENDING: '/home/reception/pending',
    READY: '/home/reception/ready',
  };
  currentPage: string | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(public menu: MenuController, public generalService: GeneralService, private router: Router) {}

  ionViewWillEnter() {
    this.currentPage = this.router.url;
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => (this.currentPage = (data as NavigationEnd).url));
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ionViewWillLeave() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
