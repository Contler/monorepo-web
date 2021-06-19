import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MessagesModule } from './services/messages/messages.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { CoreModule, UserService } from '@contler/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule, Loader, LoaderDynamicTranslate } from '@contler/dynamic-translate';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

import firebase from 'firebase/app';
import 'firebase/auth';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './reducers/user/user.effects';
import { RequestEffects } from './reducers/request/request.effects';
const app = firebase.initializeApp(environment.firebaseConfig, 'app');

if (environment.emulate) {
  app.auth().useEmulator('http://localhost:9099/');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function LoadHotel(auth: AuthService) {
  return new Loader(auth.$user.pipe(map((emp) => emp.hotel.uid)));
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'app'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    MessagesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireAuthGuardModule,
    CoreModule.forRoot({ urlBackend: environment.apiUrl }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects, RequestEffects]),
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
        deps: [AuthService],
      },
      url: environment.apiUrl,
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, OneSignal, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
