import { Component, OnInit } from '@angular/core';
import { REQUEST_STATUS } from '@contler/hotel/inmediate-requests/const/request.const';
import { InmediateRequestsService } from '@contler/hotel/inmediate-requests/services/inmediate-requests.service';
import { first, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ImmediateCategory } from '@contler/models';
import { AuthService } from '@contler/hotel/services/auth.service';

@Component({
  selector: 'contler-inmediate-requests',
  templateUrl: './inmediate-requests.component.html',
  styleUrls: ['./inmediate-requests.component.scss'],
})
export class InmediateRequestsComponent implements OnInit {
  filterByStatusSelected: string = REQUEST_STATUS.ALL;
  textFilter: string;
  typeRequest = 0;
  requestStatus = REQUEST_STATUS;
  categories$: Observable<ImmediateCategory[]>;

  constructor(private inmediateRequestsService: InmediateRequestsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.categories$ = this.authService.$hotel.pipe(
      first(),
      switchMap((hotel) => this.inmediateRequestsService.getCategoriesImmediate(hotel.uid)),
    );
  }
}
