import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CHIEF } from '@contler/const';
import { User } from '@contler/models';
import { AuthService } from '../../services/auth.service';
import { MessagesService } from '../../services/messages/messages.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: "contler-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private authService: AuthService,
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required]]
    });
  }

  ngOnInit() {

  }

  async login() {
    const loader = this.messagesService.showLoader();
    const { email, pass } = this.loginForm.value;
    this.authService
      .loginWithEmail(email, pass)
      .then(async userCredential => {
        const token = await userCredential.user!.getIdTokenResult();
        if (token.claims.rol !== CHIEF) {
          await this.authService.logout();
          this.messagesService.closeLoader(
            loader,
            "No tienes los permisos para ingresar"
          );
          return;
        }
        const user = (await this.usersService
          .getUserByKey(userCredential.user!.uid)
          .toPromise()) as User;
        await this.authService.saveUserDataStorage(user);
        this.navController.navigateForward("/home");
        this.messagesService.closeLoader(loader);
      })
      .catch(err => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError(err);
      });
  }
}
