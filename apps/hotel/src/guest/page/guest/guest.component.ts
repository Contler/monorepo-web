import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelNewGuestComponent } from 'hotel/guest/components/model-new-guest/model-new-guest.component';

@Component({
  selector: 'contler-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  loadCreateGuest = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openModalNewGuest() {
    this.dialog.open(ModelNewGuestComponent, {
      width: '940px',
      maxWidth: '940px',
      panelClass: 'cnt-modal',
    });
  }
}
