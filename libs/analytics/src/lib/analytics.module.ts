import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AnalyticsService } from './analytics.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [CommonModule, AngularFireAnalyticsModule, AngularFireAuthModule, AngularFirestoreModule],
})
export class AnalyticsModule {
  constructor(analytics: AnalyticsService) {
    analytics.load();
  }
}
