import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceType } from '../../principal/principal.component';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SpecialRequestsService } from '../../../services/special-requests.service';
import { WakeService } from '../../../services/wake.service';
import { AuthService } from '../../../services/auth.service';
import { LateCheckOutService, ProductService, ReservationService } from '@contler/core';
import { ReceptionLocalService } from '../../../services/reception/reception-local.service';

interface Type {
  icon: string;
  name: string;
  route: string;
  type: ServiceType;
}

@Component({
  selector: 'contler-item-home',
  templateUrl: './item-home.component.html',
  styleUrls: ['./item-home.component.scss'],
})
export class ItemHomeComponent implements OnInit, OnChanges {
  @Input() type: Type;
  $count: Observable<number>;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private specialRequestsService: SpecialRequestsService,
    private wakeService: WakeService,
    private auth: AuthService,
    private reservationService: ReservationService,
    private productService: ProductService,
    private receptionLocalService: ReceptionLocalService,
    private lateService: LateCheckOutService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.type.type) {
      case ServiceType.IMMEDIATE:
        this.$count = this.inmediateRequestsService
          .listenImmediateRequestByHotel(false)
          .pipe(map((list) => list.length));
        break;
      case ServiceType.SPECIAL:
        this.$count = this.specialRequestsService
          .listenSpecialRequestByHotel(false)
          .pipe(map((list) => list.length));
        break;
      case ServiceType.WAKE_UP:
        this.$count = this.wakeService.$wakeIncomplete.pipe(
          take(1),
          map((list) => list.length),
        );
        break;
      case ServiceType.RESERVATION:
        this.$count = this.auth.$user.pipe(
          switchMap((user) => this.reservationService.getBookingByHotel(user!.hotel.uid)),
          map((booking) => booking.filter((book) => book.active && !book.complete)),
          map((list) => list.length),
        );
        break;
      case ServiceType.DELIVERY:
        this.$count = this.auth.$user.pipe(
          switchMap((user) => this.productService.getOrdersByHotel(user!.hotel.uid)),
          map((orders) => orders.filter((order) => order.state < 2)),
          map((list) => list.length),
        );
        break;
      case ServiceType.RECEPTION:
        this.$count = this.receptionLocalService.getReceptionReq().pipe(map((list) => list.length));
        break;
      case ServiceType.CHECK_OUT:
        this.$count = this.auth.$user.pipe(
          switchMap((user) => this.lateService.getLateByHotel(user!.hotel.uid)),
          map((lattes) => lattes.filter((late) => !!late.user.room)),
          map((list) => list.length),
        );
        break;
      case ServiceType.CLEAN:
        this.$count = this.receptionLocalService.getCleanReq().pipe(map((list) => list.length));
        break;
      case ServiceType.MAINTAIN:
        this.$count = this.receptionLocalService.getMaintainReq().pipe(map((list) => list.length));
    }
  }
}
