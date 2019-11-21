import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'hotel/material/material.module';
import { LoginComponent } from 'hotel/login/login.component';
import { LoginRoutingModule } from 'hotel/login/login-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ]
})
export class LoginModule { }
