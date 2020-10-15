import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity/guest.entity';
import { GuestService } from 'hotel/guest/services/guest.service';
import { MessagesService } from 'hotel/services/messages/messages.service';

@Component({
  selector: 'contler-modal-edit-guest',
  templateUrl: './modal-edit-guest.component.html',
  styleUrls: ['./modal-edit-guest.component.scss'],
})
export class ModalEditGuestComponent {
  load = false;
  guestGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: GuestEntity,
    formBuild: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditGuestComponent>,
    private guestService: GuestService,
    private messagesService: MessagesService,
  ) {
    this.guestGroup = formBuild.group({
      name: [data.name, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email],
      checkIn: [data.checkIn, Validators.required],
      checkOut: [data.checkOut, Validators.required],
    });
  }

  saveUser() {
    this.load = true;
    const { name, lastName, checkIn, checkOut } = this.guestGroup.value;
    this.data.name = name;
    this.data.lastName = lastName;
    this.data.checkIn = checkIn;
    this.data.checkOut = checkOut;
    this.guestService.updateGuest(this.data).subscribe(
      () => {
        this.dialogRef.close();
      },
      () => {
        this.load = false;
        this.messagesService.showServerError();
      },
    );
  }
}
