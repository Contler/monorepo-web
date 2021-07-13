import { Component, OnInit } from '@angular/core';
import { HotelEntity, RoomEntity } from '@contler/entity';
import { RoomService } from '../../../room/services/room.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../../services/messages/messages.service';
import { GuestService } from '../../../guest/services/guest.service';
import { DOCUMENT_TYPE } from '@contler/const';
import { HotelBookingService } from '@contler/hotel/guest/services/hotel-booking.service';
import { HotelBookingRequest } from '@contler/models/hotel-booking-request';
import { AuthService } from '@contler/hotel/services/auth.service';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-new-guest',
  templateUrl: './new-guest.component.html',
  styleUrls: ['./new-guest.component.scss'],
})
export class NewGuestComponent implements OnInit {
  readonly documentTypes = DOCUMENT_TYPE;
  compareRooms: (room1: RoomEntity, room2: RoomEntity) => boolean;
  rooms: RoomEntity[] = [];
  formBookingHotel: FormGroup;
  searchEmailForm: FormControl;
  showAddGuestForm = false;
  private hotel: HotelEntity;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private guestService: GuestService,
    private hotelBookingService: HotelBookingService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.compareRooms = (room1: RoomEntity, room2: RoomEntity) => room1 && room2 && room1?.uid === room2?.uid;
    this.formBookingHotel = this.createFormBookingHotel();
    this.searchEmailForm = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)]),
    );
  }

  get guestsControl(): FormArray {
    return this.formBookingHotel.controls['guests'] as FormArray;
  }

  get bookingControl(): FormGroup {
    return this.formBookingHotel.controls['booking'] as FormGroup;
  }

  ngOnInit(): void {
    combineLatest([this.roomService.getRoom(), this.authService.$hotel]).subscribe(([rooms, hotel]) => {
      this.rooms = rooms;
      this.hotel = hotel;
    });
  }

  async searchGuest(): Promise<void> {
    const email = this.searchEmailForm.value;
    const loader = this.messagesService.showLoader();
    try {
      const guest = await this.guestService.searchGuestByEmail(email).toPromise();
      if (guest) {
        this.addOption();
        const lastGuestControl = this.guestsControl.length - 1;
        this.guestsControl.at(lastGuestControl).patchValue(guest);
        this.guestsControl.at(lastGuestControl).get('email').disable();
      } else {
        this.addOption(email);
      }
      this.showAddGuestForm = false;
      this.searchEmailForm.reset();
      this.messagesService.closeLoader(loader);
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }

  addOption(email: string = ''): void {
    const guestControl = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [email, [Validators.required, Validators.email]],
      typeDocument: ['', Validators.required],
      document: ['', Validators.required],
      uid: ['', Validators.nullValidator],
    });
    this.guestsControl.push(guestControl);
  }

  addGuest(): void {
    this.showAddGuestForm = true;
  }

  remoteGuest(index: number): void {
    this.guestsControl.removeAt(index);
  }

  onCreateBooking(): void {
    const {
      booking: { checkIn, checkOut, room },
      guests,
    } = this.formBookingHotel.value;
    const newGuest = guests.filter((guest) => guest.uid === '');
    const updateGuest = guests.filter((guest) => guest.uid !== '');
    const createBooking: HotelBookingRequest = {
      checkIn,
      checkOut,
      room,
      newGuest,
      hotel: this.hotel,
      updateGuest,
    };
    const loader = this.messagesService.showLoader();
    this.hotelBookingService.createHotelBookingService(createBooking).subscribe(
      () => {
        this.messagesService.closeLoader(loader);
        this.router.navigate(['home', 'guest']);
      },
      (err) => {
        this.messagesService.closeLoader(loader);
      },
    );
  }

  private createFormBookingHotel(): FormGroup {
    return this.formBuilder.group({
      booking: this.formBuilder.group({
        room: ['', Validators.required],
        checkIn: ['', Validators.required],
        checkOut: ['', Validators.required],
      }),
      guests: this.formBuilder.array([]),
    });
  }
}
