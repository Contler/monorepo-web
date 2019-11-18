import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { hasCustomClaim } from '@angular/fire/auth-guard';


import { AppComponent } from 'hotel/app/app.component';
import { environment } from 'hotel/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.fire),
    RouterModule.forRoot(
      [
        {
          path: 'login',
          loadChildren: () => import('hotel/login/login.module').then(m => m.LoginModule),
        },
      ],
      { initialNavigation: 'enabled' },
    ),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
