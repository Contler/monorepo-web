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
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'hotel/material/material.module';
import { NgxMaskModule } from 'ngx-mask';

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
  ],
  providers: [UserService, HotelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
