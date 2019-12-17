import { Component, OnInit } from '@angular/core';
import { UsersService } from 'guest/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { SpecialRequest, Guest } from '@contler/core/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { SpecialRequestsService } from 'guest/services/special-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss'],
})
export class SpecialRequestComponent implements OnInit {
  loader = false;
  description: string | null = null;

  constructor(
    private usersService: UsersService,
    private auth: AngularFireAuth,
    private realtime: AngularFireDatabase,
    private specialRequestsService: SpecialRequestsService,
    private router: Router
  ) {}

  ngOnInit() {}

  async saveRequest() {
    this.loader = true;
    const user: Guest = (await this.usersService
      .getUserByKey(this.auth.auth.currentUser ? this.auth.auth.currentUser.uid : '')
      .pipe(take(1))
      .toPromise()) as Guest;
    let specialRequest = new SpecialRequest();
    specialRequest.uid = this.realtime.createPushId();
    specialRequest.hotel = user.hotel;
    specialRequest.room = user.room ? user.room.uid : null;
    specialRequest.roomName = user.room ? user.room.name : null;
    specialRequest.user = user.uid;
    specialRequest.userName = `${user.name} ${user.lastName}`;
    specialRequest.checkIn = user.checkIn;
    specialRequest.checkOut = user.checkOut;
    specialRequest.description = this.description;
    this.specialRequestsService
      .add(specialRequest)
      .then(() => {
        this.loader = false;
        this.router.navigate(['/home']);
      })
      .catch(() => {
        this.loader = false;
      });
  }
}
