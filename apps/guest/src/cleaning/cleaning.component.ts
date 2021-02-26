import { Component, OnInit } from '@angular/core';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { ImmediateOptionLink } from '@contler/models';
import { GuestService } from 'guest/services/guest.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss'],
})
export class CleaningComponent implements OnInit {
  options$: Observable<ImmediateOptionLink[]>;

  constructor(
    private guestService: GuestService,
    private dynamicService: DynamicModuleService,
    private messagesService: MessagesService,
  ) {}

  ngOnInit(): void {
    const loader = this.messagesService.showLoader();
    this.options$ = this.guestService.$hotel.pipe(first()).pipe(
      switchMap((hotel) =>
        this.dynamicService
          .getOptionsModule(hotel.uid, MODULES.cleaning)
          .pipe(map((options) => options as ImmediateOptionLink[])),
      ),
      tap(() => this.messagesService.closeLoader(loader)),
    );
  }
}
