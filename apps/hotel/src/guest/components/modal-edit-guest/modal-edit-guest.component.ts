import { Component, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GuestEntity } from '@contler/entity/guest.entity';
import { GuestService } from 'hotel/guest/services/guest.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { SpecialRequestsService } from 'hotel/special-requests/services/special-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contler-modal-edit-guest',
  templateUrl: './modal-edit-guest.component.html',
  styleUrls: ['./modal-edit-guest.component.scss'],
})
export class ModalEditGuestComponent implements OnInit, OnDestroy {
  load = false;
  guestGroup: FormGroup;
  private specialRequestsSubscription: Subscription | null = null;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['userName', 'roomName', 'description', 'checkIn', 'checkOut'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: GuestEntity,
    formBuild: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditGuestComponent>,
    private guestService: GuestService,
    private messagesService: MessagesService,
    private specialRequestsService: SpecialRequestsService,
  ) {
    this.guestGroup = formBuild.group({
      name: [data.name, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email],
      checkIn: [data.checkIn, Validators.required],
      checkOut: [data.checkOut, Validators.required],
    });
  }

  ngOnInit() {
    this.getSpecialRequestByHotel();
  }

  getSpecialRequestByHotel() {
    this.specialRequestsSubscription = this.specialRequestsService
      .listenSpecialRequestByHotel()
      .subscribe((requests) => {
        if (requests) {
          this.dataSource.data = requests.filter((req) => req.guest.uid === this.data.uid);
          this.dataSource.paginator = this.paginator as MatPaginator;
        }
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

  ngOnDestroy() {
    if (this.specialRequestsSubscription) {
      this.specialRequestsSubscription.unsubscribe();
    }
  }
}
