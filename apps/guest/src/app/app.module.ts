import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, HotelService, UserService } from '@contler/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { AvalibleUserGuard } from '../common-components/guards/avalible-user.guard';
import { DynamicTranslateModule, Loader, LoaderDynamicTranslate } from '@contler/dynamic-translate';
import { map } from 'rxjs/operators';
import { GuestService } from '../services/guest.service';
import { UiModule } from '@contler/ui';
import { MatMenuModule } from '@angular/material/menu';
import { ForgotComponent } from '../login/forgot/forgot.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import firebase from 'firebase/app';
import 'firebase/auth';
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'guest/app/reducers/user/user.effects';
const app = firebase.initializeApp(environment.fire, 'app');
if (environment.emulate) {
  app.auth().useEmulator('http://localhost:9099/');
}

export function LoadHotel(auth: GuestService) {
  return new Loader(auth.$guest.pipe(map((emp) => emp.hotel.uid)));
}

@NgModule({
  declarations: [AppComponent, LoginComponent, ForgotComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.fire, 'app'),
    AngularFireAuthGuardModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule,
    FormsModule,
    UiModule,
    ReactiveFormsModule,
    CoreModule.forRoot({ urlBackend: environment.apiUrl }),
    NgxMaskModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([UserEffects]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: window.localStorage.lan || 'es-CO',
    }),
    DynamicTranslateModule.forRoot({
      loader: {
        provide: LoaderDynamicTranslate,
        useFactory: LoadHotel,
        deps: [GuestService],
      },
      url: environment.apiUrl,
    }),
    MatMenuModule,
  ],
  providers: [HotelService, UserService, AvalibleUserGuard, ScreenTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
