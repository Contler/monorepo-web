import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'contler-special-requests',
  templateUrl: './special-requests.page.html',
  styleUrls: ['./special-requests.page.scss'],
})
export class SpecialRequestsPage implements OnInit, OnDestroy {
  public readonly PAGES = {
    ACTIVE: "/home/special-requests/active",
    PAST: "/home/special-requests/past"
  };
  public currentPage: string | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, public generalService: GeneralService) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.currentPage = this.router.url;
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
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
