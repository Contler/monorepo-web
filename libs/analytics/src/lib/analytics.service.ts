import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { EventDataInterface } from './interfaces/event-data.interface';

export const PLATFORM = new InjectionToken<string>('contler.analytics.platform');

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  isLoad = false;
  private screenPath: string;

  constructor(
    @Optional() @Inject(PLATFORM) private platform: string,
    private analytics: AngularFireAnalytics,
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {}

  load() {
    if (!this.isLoad) {
      this.router.events
        .pipe(filter((val) => val instanceof NavigationEnd))
        .subscribe((data: NavigationEnd) => {
          this.screenPath = data.urlAfterRedirects;
          let child = this.route.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          const { authGuardPipe, ...restData } = child.snapshot.data;
          this.logEvent('screen', restData);
        });
      this.isLoad = true;
    }
  }

  async logEvent(eventName: string, params?: { [key: string]: unknown }) {
    const user = await this.auth.currentUser;
    const eventData: EventDataInterface = {
      eventName,
      user: user?.uid || null,
      screen: this.screenPath,
      platform: this.platform,
      params,
      create: new Date(),
    };
    console.log(eventData);
    return Promise.all([
      this.firestore.collection('analytics').add(eventData),
      this.analytics.logEvent(eventName, params),
    ]);
  }
}
