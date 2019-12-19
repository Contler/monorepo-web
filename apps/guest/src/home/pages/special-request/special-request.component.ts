import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'guest/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { SpecialRequest, Guest, Hotel } from '@contler/core/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { SpecialRequestsService } from 'guest/services/special-requests.service';
import { Router } from '@angular/router';
import { GuestService } from 'guest/services/guest.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'contler-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss'],
})
export class SpecialRequestComponent implements OnInit, OnDestroy {
  loader = false;
  description: string | null = null;

  hotel: Hotel | null | undefined;
  private guestSubscribe: Subscription;

  constructor(
    private usersService: UsersService,
    private auth: AngularFireAuth,
    private realtime: AngularFireDatabase,
    private specialRequestsService: SpecialRequestsService,
    private router: Router,
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
  }

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

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  getButtonColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `background-color: ${this.hotel.color}; color: #ffffff !important` : '',
    );
  }

  ngOnDestroy() {
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }
}
