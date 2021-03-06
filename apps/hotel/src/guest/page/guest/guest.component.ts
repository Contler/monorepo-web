import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Guest } from '@contler/models';
import { GuestService } from '../../services/guest.service';
import { Subscription } from 'rxjs';
import { DOCUMENT_TYPE } from '@contler/const';
import { ModalEditGuestComponent } from '../../components/modal-edit-guest/modal-edit-guest.component';
import { GuestEntity } from '@contler/entity/guest.entity';
import { LoaderComponent } from '../../../common-components/modal-loader/loader.component';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnDestroy {
  loadCreateGuest = false;
  displayedColumns: string[] = ['name', 'document', 'type', 'room', 'checkIn', 'checkOut', 'actions'];
  dataSource = new MatTableDataSource<GuestEntity>();
  public requestStatus = {
    ACTIVE: 'actives',
    INACTIVE: 'inactives',
  };
  public filterByStatusSelected: string = this.requestStatus.ACTIVE;

  private subscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private guestService: GuestService,
    private analytics: AngularFireAnalytics,
    private router: Router,
  ) {
    this.subscription = this.guestService.getGuest().subscribe((guests) => {
      this.dataSource.data = guests;
    });

    this.dataSource.filterPredicate = (data, filterData) => this.getFilterPredicate(data, filterData);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDocumentType(type: number) {
    return DOCUMENT_TYPE.find((document) => document.value === type);
  }

  deleteGuest(guest: GuestEntity) {
    const ref = this.dialog.open(LoaderComponent, { disableClose: true });
    this.guestService.deleteUser(guest.uid).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((g) => g.uid !== guest.uid);
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

  private getFilterPredicate(data: GuestEntity, filterData: string) {
    const textLow = filterData.toLowerCase();
    if (filterData === this.requestStatus.ACTIVE) {
      return data.active;
    }
    if (filterData === this.requestStatus.INACTIVE) {
      return !data.active;
    }

    return (
      data.room.name.toLowerCase().includes(textLow) ||
      data.name.toLowerCase().includes(textLow) ||
      data.lastName.toLowerCase().includes(textLow)
    );
  }

  filterByStatus() {
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filterData) => this.getFilterPredicate(data, filterData);
  }

  goToNewGuest(): void {
    this.analytics.logEvent('create_guest_open');
    this.router.navigate(['home', 'guest', 'new']);
  }
}
