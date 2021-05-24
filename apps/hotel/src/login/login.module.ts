import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@contler/hotel/material/material.module';
import { LoginComponent } from '@contler/hotel/login/login.component';
import { LoginRoutingModule } from '@contler/hotel/login/login-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    TranslateModule,
  ],
})
export class LoginModule {}
