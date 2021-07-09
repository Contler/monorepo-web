import { Component, Inject } from '@angular/core';
import { DOCUMENT_TYPE } from '@contler/const';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestRequest } from '@contler/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../../room/services/room.service';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { GuestService } from '../../../guest/services/guest.service';
import { UserService } from '@contler/core';
import { GuestEntity, RoomEntity } from '@contler/entity';
import { MessagesService } from '../../../services/messages/messages.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { combineLatest, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'contler-model-new-guest',
  templateUrl: './model-new-guest.component.html',
  styleUrls: ['./model-new-guest.component.scss'],
})
export class ModelNewGuestComponent {
  readonly documentTypes = DOCUMENT_TYPE;

  guestGroup: FormGroup;
  rooms: RoomEntity[] = [];
  load = false;
  error: string | undefined;
  searchEmailForm: FormControl;
  partnerEmailForm: FormControl;
  updateGuest = false;
  filteredPartners: Observable<GuestEntity[]>;
  private guest: GuestEntity;

  constructor(
    public dialogRef: MatDialogRef<ModelNewGuestComponent>,
    @Inject(MAT_DIALOG_DATA) private partners: GuestEntity[],
    private roomService: RoomService,
    private guestService: GuestService,
    private userService: UserService,
    formBuild: FormBuilder,
    private messagesService: MessagesService,
    private analytics: AngularFireAnalytics,
  ) {
    this.partnerEmailForm = new FormControl('', Validators.email);
    this.searchEmailForm = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)]),
    );
    this.guestGroup = formBuild.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typeDocument: ['', Validators.required],
      document: ['', Validators.required],
      room: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
    this.listenerPartnerEmailForm();
    this.roomService.getRoom().subscribe((rooms) => {
      console.log({ rooms });
      this.rooms = rooms;
      this.room!.reset();
    });
  }

  get room() {
    return this.guestGroup.get('room');
  }

  saveUser() {
    this.error = undefined;
    this.load = true;
    if (this.updateGuest) {
      this.onUpdateGuest();
      return;
    }
    this.userService
      .getUser()
      .pipe(
        map((user) => ({ ...this.guestGroup.getRawValue(), hotel: user.hotel } as GuestRequest)),
        switchMap((guestRequest) => this.guestService.saveGuest(guestRequest)),
        tap(async (guest) => await this.addPartner(guest)),
      )
      .subscribe(
        (guest) => {
          this.analytics.logEvent('create_guest_complete');
          this.load = false;
          this.dialogRef.close(guest);
        },
        (error) => {
          this.load = false;
          if (error.status === 400) {
            if (error.error && error.error.message) {
              this.error = error.error.message;
              this.analytics.logEvent('create_guest_error', {
                error: error.error.message,
              });
            } else {
              this.error = 'La Habitación ya fue ocupada';
              this.analytics.logEvent('create_guest_error', {
                error: 'room unavailable',
              });
            }
          } else {
            this.error = 'No pudimos crear el usuario';
            this.analytics.logEvent('create_guest_error', {
              error: JSON.stringify(error),
            });
          }
        },
      );
  }

  public async searchGuest(stepper: MatHorizontalStepper): Promise<void> {
    const email = this.searchEmailForm.value;
    const loader = this.messagesService.showLoader();
    try {
      this.guest = await this.guestService.searchGuestByEmail(email).toPromise();
      if (this.guest) {
        if (this.guest.partner) {
          this.partnerEmailForm.setValue(this.guest.partner.email);
          this.partnerEmailForm.updateValueAndValidity();
        }
        this.guestGroup.patchValue(this.guest);
        this.guestGroup.updateValueAndValidity();
        console.log(this.guestGroup);
        this.updateGuest = true;
      } else {
        this.guestGroup.reset();
        this.guestGroup.get('email').setValue(this.searchEmailForm.value);
        this.updateGuest = false;
      }
      this.messagesService.closeLoader(loader);
      stepper.next();
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }

  public onPartnerSelected($event: MatAutocompleteSelectedEvent): void {
    const email: string = $event.option.viewValue;
    const partner = this.partners.find((partner) => partner.email === email);
    if (partner) {
      const roomControl = this.guestGroup.get('room');
      const checkInControl = this.guestGroup.get('checkIn');
      const checkOutControl = this.guestGroup.get('checkOut');
      partner.room.guest = [];
      roomControl.setValue(partner.room);
      checkInControl.setValue(partner.checkIn);
      checkOutControl.setValue(partner.checkOut);
      roomControl.disable();
      checkInControl.disable();
      checkOutControl.disable();
    } else {
      this.resetReservationsControls();
    }
  }

  private onUpdateGuest(): void {
    const { name, lastName, email, typeDocument, document, room, checkIn, checkOut } = this.guestGroup.value;
    this.guest = {
      ...this.guest,
      name,
      lastName,
      email,
      typeDocument,
      document,
      room,
      checkIn,
      checkOut,
    };
    this.userService
      .getUser()
      .pipe(
        map((user) => ({ ...this.guest, hotel: user.hotel } as GuestEntity)),
        switchMap((guestRequest) => this.guestService.updateGuest(guestRequest)),
      )
      .subscribe(
        (guest) => {
          this.load = false;
          this.dialogRef.close(guest);
        },
        (error) => {
          this.load = false;
          if (error.status === 400) {
            if (error.error && error.error.message) {
              this.error = error.error.message;
            } else {
              this.error = 'La Habitación ya fue ocupada';
            }
          } else {
            this.error = 'No pudimos actualizar el usuario';
          }
        },
      );
  }

  private listenerPartnerEmailForm(): void {
    this.filteredPartners = this.partnerEmailForm.valueChanges.pipe(
      startWith(''),
      debounceTime(1000),
      map((email) => this.filterPartnerByEmail(email)),
    );
  }

  private filterPartnerByEmail(email: string): GuestEntity[] {
    if (email) {
      const filterValue = email.toLowerCase();
      return this.partners.filter((partner) => partner.email.toLowerCase().includes(filterValue));
    }
    this.resetReservationsControls();
    return [];
  }

  private resetReservationsControls(): void {
    const roomControl = this.guestGroup.get('room');
    roomControl.setValue('');
    roomControl.enable();

    const checkInControl = this.guestGroup.get('checkIn');
    checkInControl.setValue('');
    checkInControl.enable();

    const checkOutControl = this.guestGroup.get('checkOut');
    checkOutControl.setValue('');
    checkOutControl.enable();
  }
  compareRooms(room1: RoomEntity, room2: RoomEntity) {
    console.log(room1);
    console.log(room2);
    return room1 && room2 && room1.uid === room2.uid;
  }

  private async addPartner(partnerAdded: GuestEntity): Promise<void> {
    const guestEmail = this.partnerEmailForm.value;
    const guest = this.partners.find((partner) => partner.email === guestEmail);
    guest.partners = [...guest.partners, partnerAdded];
    delete guest.partners;
    partnerAdded.partner = guest;
    try {
      await combineLatest([
        this.guestService.updateGuest(guest),
        this.guestService.updateGuest(partnerAdded),
      ]).toPromise();
    } catch (e) {
      this.messagesService.showServerError();
    }
  }
}
