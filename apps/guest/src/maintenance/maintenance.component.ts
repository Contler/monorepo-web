import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImmediateOptionLink } from '@contler/models';
import { GuestService } from 'guest/services/guest.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { first, switchMap, tap } from 'rxjs/operators';
import { DynamicModuleService } from '@contler/dynamic-services';

@Component({
  selector: 'contler-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  options$: Observable<ImmediateOptionLink[]>;

  constructor(
    private guestService: GuestService,
    private dynamicService: DynamicModuleService,
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    const loader = this.messagesService.showLoader();
    this.options$ = this.guestService.$hotel.pipe(first()).pipe(
      switchMap((hotel) => this.dynamicService.getMaintenanceModule(hotel.uid)),
      tap(() => this.messagesService.closeLoader(loader)),
    );
  }
}
