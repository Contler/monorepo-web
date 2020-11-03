import { Component, OnDestroy } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ReceptionModel } from '@contler/models';

import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'contler-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.scss'],
})
export class CleanComponent implements OnDestroy {
  $receptionReq: Observable<ReceptionModel[]>;

  user: EmployerEntity | null = null;
  totalReception: number;
  readonly PAGES = {
    PENDING: '/home/clean/pending',
    READY: '/home/clean/ready',
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
