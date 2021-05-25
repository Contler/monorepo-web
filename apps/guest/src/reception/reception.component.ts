import { Component, OnInit } from '@angular/core';
import { ImmediateOptionLink } from '@contler/models';
import { Observable } from 'rxjs';
import { ReceptionService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { first, switchMap, tap } from 'rxjs/operators';
import { MessagesService } from 'guest/services/messages/messages.service';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  options$: Observable<ImmediateOptionLink[]>;

  constructor(
    private guestService: GuestService,
    private receptionService: ReceptionService,
    private messagesService: MessagesService,
  ) {}

  public ngOnInit(): void {
    const loader = this.messagesService.showLoader();
    this.options$ = this.guestService.$hotel.pipe(first()).pipe(
      switchMap((hotel) => this.receptionService.getOptionsReception(hotel.uid)),
      tap((data) => {
        this.messagesService.closeLoader(loader);
      }),
    );
  }
}
