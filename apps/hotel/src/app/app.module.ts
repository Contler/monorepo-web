import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { CoreModule, HotelService, UserService } from '@contler/core';

import { AppComponent } from 'hotel/app/app.component';
import { environment } from 'hotel/environments/environment';
import { AppRoutingModule } from 'hotel/app/app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'hotel/material/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UiModule } from '@contler/ui';

//Register language Es
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    CoreModule.forRoot({
      urlBackend: environment.apiUrl,
    }),
    UiModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: window.localStorage.lan || 'es-CO',
    }),
  ],
  providers: [UserService, HotelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
