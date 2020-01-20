import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Guest } from '@contler/models';
import { GuestService } from 'hotel/guest/services/guest.service';
import { ModelNewGuestComponent } from 'hotel/guest/components/model-new-guest/model-new-guest.component';
import { Subscription } from 'rxjs';
import { DOCUMENT_TYPE } from '@contler/const';
import { LoaderComponent } from 'hotel/material/components/loader/loader.component';
import { ModalEditGuestComponent } from 'hotel/guest/components/modal-edit-guest/modal-edit-guest.component';
import { GuestEntity } from '@contler/entity/guest.entity';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'contler-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnDestroy {
  loadCreateGuest = false;
  displayedColumns: string[] = ['name', 'document', 'type', 'room', 'checkIn', 'checkOut', 'actions'];
  dataSource = new MatTableDataSource<GuestEntity>();

  private subscription: Subscription;

  constructor(private dialog: MatDialog, private guestService: GuestService) {
    this.subscription = this.guestService.getGuest().subscribe(guests => {
      this.dataSource.data = guests;
    });
  }

  openModalNewGuest() {
    this.dialog.open<ModelNewGuestComponent, void, GuestEntity>(ModelNewGuestComponent, {
      width: '940px',
      maxWidth: '940px',
      panelClass: 'cnt-modal',
    }).afterClosed().pipe(filter(data => !!data)).subscribe(data => {
      this.dataSource.data = [...this.dataSource.data, data!]
    })
  }

  getDocumentType(type: number) {
    return DOCUMENT_TYPE.find(document => document.value === type);
  }

  deleteGuest(guest: GuestEntity) {
    const ref = this.dialog.open(LoaderComponent, { disableClose: true });
    this.guestService.deleteUser(guest.uid).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(g => g.uid !== guest.uid);
      ref.close();
    });
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
