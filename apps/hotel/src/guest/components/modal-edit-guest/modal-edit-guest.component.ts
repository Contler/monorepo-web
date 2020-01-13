import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Guest } from '@contler/models';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'contler-modal-edit-guest',
  templateUrl: './modal-edit-guest.component.html',
  styleUrls: ['./modal-edit-guest.component.scss'],
})
export class ModalEditGuestComponent {
  load = false;
  guestGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Guest,
    formBuild: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditGuestComponent>,
    private afStore: AngularFirestore,
  ) {
    this.guestGroup = formBuild.group({
      name: [data.name, Validators.required],
      lastName: [data.lastName, Validators.required],
      checkIn: [data.checkIn, Validators.required],
      checkOut: [data.checkOut, Validators.required],
    });
  }

  saveUser() {
    this.load = true;
    const { name, lastName, checkIn, checkOut } = this.guestGroup.value;
    this.afStore
      .doc<Guest>(`${Guest.REF}/${this.data.uid}`)
      .update({ name, lastName, checkIn: checkIn.toString(), checkOut: checkOut.toString() })
      .then(() => {
        this.load = false;
        this.dialogRef.close();
      });
  }
}
