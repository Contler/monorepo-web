import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CoreModule } from '@contler/core';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: 'login', component: LoginComponent },
        { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
      ],
      { initialNavigation: 'enabled' },
    ),
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthModule,
    CoreModule.forRoot({ urlBackend: environment.apiUrl }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
