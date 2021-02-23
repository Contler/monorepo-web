import { Component, OnInit } from '@angular/core';
import { OPTIONS_RECEPTION } from 'guest/reception/const/reception-options.const';
import { ImmediateOptionLink } from '@contler/models';
import { Observable } from 'rxjs';
import { ReceptionService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
})
export class ReceptionComponent implements OnInit {
  // options = OPTIONS_RECEPTION;
  options$: Observable<ImmediateOptionLink[]>;

  constructor(private guestService: GuestService, private receptionService: ReceptionService) {}

  public ngOnInit(): void {
    this.options$ = this.guestService.$hotel
      .pipe(first())
      .pipe(switchMap((hotel) => this.receptionService.getOptionsReception(hotel.uid)));
  }
}
