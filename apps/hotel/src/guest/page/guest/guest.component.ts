import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Guest } from '@contler/core/models';
import { GuestService } from 'hotel/guest/services/guest.service';
import { ModelNewGuestComponent } from 'hotel/guest/components/model-new-guest/model-new-guest.component';
import { Subscription } from 'rxjs';
import { DOCUMENT_TYPE } from 'lib/const';
import { LoaderComponent } from 'hotel/material/components/loader/loader.component';
import { ModalEditGuestComponent } from 'hotel/guest/components/modal-edit-guest/modal-edit-guest.component';

@Component({
  selector: 'contler-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnDestroy {
  loadCreateGuest = false;
  displayedColumns: string[] = ['name', 'document', 'type', 'room', 'checkIn', 'checkOut', 'actions'];
  dataSource = new MatTableDataSource<Guest>();

  private subscription: Subscription;

  constructor(private dialog: MatDialog, private guestService: GuestService) {
    this.subscription = this.guestService.getGuest().subscribe(guests => {
      this.dataSource.data = guests;
    });
  }

  openModalNewGuest() {
    this.dialog.open(ModelNewGuestComponent, {
      width: '940px',
      maxWidth: '940px',
      panelClass: 'cnt-modal',
    });
  }

  getDocumentType(type: number) {
    return DOCUMENT_TYPE.find(document => document.value === type);
  }

  deleteGuest(guest: Guest) {
    const ref = this.dialog.open(LoaderComponent, { disableClose: true });
    this.guestService.deleteUser(guest.uid).subscribe(() => ref.close());
  }

  editGuest(guest: Guest) {
    this.dialog.open(ModalEditGuestComponent, {
      data: guest,
      width: '940px',
      maxWidth: '940px',
      panelClass: 'cnt-modal',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
