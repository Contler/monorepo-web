import { Component } from '@angular/core';
import { DOCUMENT_TYPE } from '@contler/const';
import { MatDialogRef } from '@angular/material/dialog';
import { GuestRequest } from '@contler/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../../room/services/room.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { GuestService } from '../../../guest/services/guest.service';
import { UserService } from '@contler/core';
import { GuestEntity, RoomEntity } from '@contler/entity';
import { MessagesService } from '../../../services/messages/messages.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'contler-model-new-guest',
  templateUrl: './model-new-guest.component.html',
  styleUrls: ['./model-new-guest.component.scss'],
})
export class ModelNewGuestComponent {
  readonly documentTypes = DOCUMENT_TYPE;

  guestGroup: FormGroup;
  partnerGroup: FormGroup;
  rooms: RoomEntity[] = [];
  load = false;
  error: string | undefined;
  searchEmailForm: FormControl;
  updateGuest = false;
  private guest: GuestEntity;
  private partner: GuestEntity;
  showFormAddPartner = false;

  constructor(
    public dialogRef: MatDialogRef<ModelNewGuestComponent>,
    private roomService: RoomService,
    private guestService: GuestService,
    private userService: UserService,
    private formBuild: FormBuilder,
    private messagesService: MessagesService,
    private analytics: AngularFireAnalytics,
  ) {
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
    this.roomService
      .getRoom()
      .pipe(map((rooms) => rooms.filter((room) => !room.guest)))
      .subscribe((rooms) => {
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
        map((user) => ({ ...this.guestGroup.value, hotel: user.hotel } as GuestRequest)),
        switchMap((guestRequest) => this.guestService.saveGuest(guestRequest)),
        tap(() => {
          if (this.guestGroup && this.guestGroup.valid) {
            this.createPartner(this.guest, this.partnerGroup.value);
          }
        }),
      )
      .subscribe(
        (guest) => {
          guest.partner = this.partner;
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
        this.guestGroup.patchValue(this.guest);
        if (this.guest.partner) {
          this.partner = this.guest.partner;
          this.partner.hotel = this.guest.hotel;
          this.partner.room = this.guest.room;
          this.addPartner();
          this.partnerGroup.patchValue(this.partner);
        }
        this.updateGuest = true;
      } else {
        this.guestGroup.reset();
        this.guestGroup.get('email').setValue(this.searchEmailForm.value);
        this.updateGuest = false;
      }
      this.messagesService.closeLoader(loader);
      stepper.next();
    } catch (err) {
      console.log(err);
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
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
        tap(() => {
          if (this.partnerGroup && this.partnerGroup.valid) {
            this.updatePartner(this.partnerGroup.value);
          }
        }),
      )
      .subscribe(
        (guest: GuestEntity) => {
          this.load = false;
          guest.partner = this.partner;
          this.dialogRef.close(guest);
        },
        (error) => {
          console.log(error);
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

  public addPartner(): void {
    this.showFormAddPartner = true;
    this.partnerGroup = this.formBuild.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typeDocument: ['', Validators.required],
      document: ['', Validators.required],
    });
  }

  public async removePartner(): Promise<void> {
    const loader = this.messagesService.showLoader();
    this.showFormAddPartner = false;
    this.partnerGroup = null;
    try {
      this.guest.partner = null;
      await this.guestService.updateGuest(this.guest).toPromise();
      await this.guestService.deletePartner(this.partner.uid).toPromise();
      this.partner = null;
      this.messagesService.closeLoader(loader);
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }

  private createPartner(guest: GuestEntity, partnerFormValue): void {
    const partnerRequest = { ...guest, ...partnerFormValue } as GuestRequest;
    this.guestService
      .saveGuest(partnerRequest)
      .pipe(
        switchMap((partner) => {
          this.partner = partner;
          guest.partner = partner;
          return this.guestService.updateGuest(guest);
        }),
      )
      .subscribe();
  }

  private updatePartner(partnerFormValue: any): void {
    if (!this.partner) {
      this.createPartner(this.guest, partnerFormValue);
      return;
    }
    this.partner = {
      ...this.partner,
      ...partnerFormValue,
    };
    this.guestService.updateGuest(this.partner).subscribe();
  }
}
