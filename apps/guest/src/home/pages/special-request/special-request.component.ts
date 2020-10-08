import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'guest/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { SpecialRequestsService } from 'guest/services/special-requests.service';
import { Router } from '@angular/router';
import { GuestService } from 'guest/services/guest.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from 'guest/services/messages/messages.service';
import { HotelEntity } from '@contler/entity';
import { ZoneService } from 'guest/services/zone.service';
import { RequestRequest } from '@contler/models/request-request';
import { RequestService } from 'guest/services/request.service';

@Component({
  selector: 'contler-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss'],
})
export class SpecialRequestComponent implements OnInit, OnDestroy {
  loader = false;
  description: string | null = null;

  hotel: HotelEntity | null | undefined;
  private guestSubscribe: Subscription;

  constructor(
    private requestService: RequestService,
    private sanitizer: DomSanitizer,
    private zoneService: ZoneService,
    private usersService: UsersService,
    private auth: AngularFireAuth,
    private realtime: AngularFireDatabase,
    private specialRequestsService: SpecialRequestsService,
    private router: Router,
    private guestService: GuestService,
    private messagesService: MessagesService,
  ) {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnInit() {}

  async saveRequest() {
    this.loader = true;
    this.guestService.$guest
      .pipe(
        take(1),
        map((guest) => {
          const request = new RequestRequest();
          request.hotel = this.hotel!;
          request.guest = guest!;
          request.room = guest!.room;
          request.special = true;
          request.message = this.description!;
          return request;
        }),
        switchMap((request) => this.requestService.saveRequest(request)),
      )
      .subscribe(
        () => {
          this.loader = false;
          this.router.navigate(['/home']);
          this.messagesService.showToastMessage('Immediate request successfully created');
        },
        (error) => {
          this.loader = false;
          this.messagesService.showToastMessage('Error creating request');
        },
      );
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '',
    );
  }

  getButtonColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `background-color: ${this.hotel.color}; color: #ffffff !important`
        : '',
    );
  }

  ngOnDestroy() {
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }
}
