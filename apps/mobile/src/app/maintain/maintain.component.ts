import { Component, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ReceptionModel } from '@contler/models';
import { EmployerEntity } from '@contler/entity';
import { Observable, Subscription } from 'rxjs';
import { GeneralService } from '../services/general.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'contler-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.scss'],
})
export class MaintainComponent implements OnDestroy {
  $receptionReq: Observable<ReceptionModel[]>;

  user: EmployerEntity | null = null;
  totalReception: number;

  readonly PAGES = {
    PENDING: '/home/maintain/pending',
    READY: '/home/maintain/ready',
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
