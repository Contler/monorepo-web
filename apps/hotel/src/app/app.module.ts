import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.fire),
    RouterModule.forRoot(
      [
        {
          path: 'login',
          loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
        },
      ],
      { initialNavigation: 'enabled' },
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
