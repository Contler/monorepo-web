import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as UserActions from '../user/user.actions';
import * as RequestActions from './request.actions';
import { MODULES, RequestService } from '@contler/dynamic-services';
import { LateCheckOutService, ProductService, ReservationService } from '@contler/core';
import { EMPTY, pipe } from 'rxjs';
import { WakeService } from '../../services/wake.service';

@Injectable()
export class RequestEffects {
  private hotelPipe = pipe(
    ofType(UserActions.setUser),
    map(({ employer }) => employer.hotel),
  );

  immediateRequest$ = createEffect(() => {
    return this.actions$.pipe(
      this.hotelPipe,
      switchMap(({ uid }) =>
        this.request.getByService(MODULES.immediate, { active: true, hotelId: uid }).valueChanges(),
      ),
      map((requests) => RequestActions.setImmediate({ request: requests })),
    );
  });

  specialRequest$ = createEffect(() => {
    return this.actions$.pipe(
      this.hotelPipe,
      switchMap(({ uid }) =>
        this.request.getByService(MODULES.special, { active: true, hotelId: uid }).valueChanges(),
      ),
      map((requests) => RequestActions.setSpecial({ request: requests })),
    );
  });

  reservationRequest$ = createEffect(() => {
    return this.actions$.pipe(
      this.hotelPipe,
      switchMap(({ uid }) => this.reservationService.getBookingByHotel(uid)),
      map((booking) => booking.filter((book) => book.active && !book.complete)),
      map((requests) => RequestActions.setReservation({ request: requests })),
    );
  });

  roomRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderZones.find((le) => le.category.id === 3)) {
          return this.request
            .getByService(MODULES.room, { active: true, hotelId: employer.hotel.uid })
            .valueChanges()
            .pipe(map((requests) => RequestActions.setRoom({ request: requests })));
        } else {
          return EMPTY;
        }
      }),
    );
  });

  wakeRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderSpecialZone.find((sp) => sp.zone.name === 'wakeZone')) {
          return this.wakeService
            .getWakeIncomplete(employer.hotel.uid)
            .pipe(map((requests) => RequestActions.setWake({ request: requests })));
        } else {
          return EMPTY;
        }
      }),
    );
  });

  deliveryRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderSpecialZone.find((sp) => sp.zone.name === 'deliveryZone')) {
          return this.productService.getOrdersByHotel(employer.hotel.uid).pipe(
            map((orders) => orders.filter((order) => order.state < 2)),
            map((requests) => RequestActions.setOrder({ request: requests })),
          );
        } else {
          return EMPTY;
        }
      }),
    );
  });

  receptionRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderSpecialZone.find((sp) => sp.zone.name === 'receptionZone')) {
          return this.request
            .getByService(MODULES.reception, { active: true, hotelId: employer.hotel.uid })
            .valueChanges()
            .pipe(map((requests) => RequestActions.setReception({ request: requests })));
        } else {
          return EMPTY;
        }
      }),
    );
  });

  checkoutRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderSpecialZone.find((sp) => sp.zone.name === 'lateZone')) {
          return this.lateService.getLateByHotel(employer.hotel.uid).pipe(
            map((lattes) => lattes.filter((late) => !!late.user.room)),
            map((requests) => RequestActions.setLate({ request: requests })),
          );
        } else {
          return EMPTY;
        }
      }),
    );
  });

  cleanRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderSpecialZone.find((sp) => sp.zone.name === 'cleanZone')) {
          return this.request
            .getByService(MODULES.cleaning, { active: true, hotelId: employer.hotel.uid })
            .valueChanges()
            .pipe(map((requests) => RequestActions.setClean({ request: requests })));
        } else {
          return EMPTY;
        }
      }),
    );
  });

  maintainRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.setUser),
      mergeMap(({ employer }) => {
        if (employer.leaderSpecialZone.find((sp) => sp.zone.name === 'maintainZone')) {
          return this.request
            .getByService(MODULES.maintenance, { active: true, hotelId: employer.hotel.uid })
            .valueChanges()
            .pipe(map((requests) => RequestActions.setMaintain({ request: requests })));
        } else {
          return EMPTY;
        }
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private request: RequestService,
    private reservationService: ReservationService,
    private wakeService: WakeService,
    private productService: ProductService,
    private lateService: LateCheckOutService,
  ) {}
}
