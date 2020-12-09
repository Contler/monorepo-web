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
import { environment } from 'guest/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule, HotelService, UserService } from '@contler/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { AvalibleUserGuard } from 'guest/common-components/guards/avalible-user.guard';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthGuardModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    CoreModule.forRoot({ urlBackend: environment.apiUrl }),
    NgxMaskModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, {
      metaReducers,
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
  providers: [HotelService, UserService, AvalibleUserGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
