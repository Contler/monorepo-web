import { Component, OnInit } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'guest';

  constructor(private guestService: GuestService, private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.avalibleUser();
  }

  avalibleUser() {
    this.guestService.checkAvailableUser().subscribe(({ checkIn, checkOut }) => {
      if (new Date() < checkIn) {
        this.afAuth
          .signOut()
          .then(() => this.router.navigate(['/login']))
          .catch(() => {});
      } else if (new Date() > checkOut) {
        this.afAuth
          .signOut()
          .then(() => this.router.navigate(['/login']))
          .catch(() => {});
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
