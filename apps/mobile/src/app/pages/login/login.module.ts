import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { MaterialModule } from '../../material/material.module';
import { MessagesModule } from '../../services/messages/messages.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MaterialModule,
    MessagesModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
