import { createReducer, on } from '@ngrx/store';
import * as RequestActions from './request.actions';
import { AbstractRequest } from '@contler/dynamic-services';
import { BookingEntity, OrderEntity, WakeUpEntity } from '@contler/entity';
import { LateCheckUser } from '@contler/models';

export const requestFeatureKey = 'request';

export interface RequestState {
  immediate: AbstractRequest[];
  special: AbstractRequest[];
  bookings: BookingEntity[];
  room: AbstractRequest[];
  wakeUp: WakeUpEntity[];
  orders: OrderEntity[];
  reception: AbstractRequest[];
  late: LateCheckUser[];
  clean: AbstractRequest[];
  maintain: AbstractRequest[];
}

export const initialState: RequestState = {
  immediate: [],
  special: [],
  bookings: [],
  room: [],
  wakeUp: [],
  orders: [],
  reception: [],
  late: [],
  clean: [],
  maintain: [],
};

export const reducer = createReducer(
  initialState,
  on(RequestActions.setImmediate, (state, { request }) => ({ ...state, immediate: request })),
  on(RequestActions.setSpecial, (state, { request }) => ({ ...state, special: request })),
  on(RequestActions.setReservation, (state, { request }) => ({ ...state, bookings: request })),
  on(RequestActions.setRoom, (state, { request }) => ({ ...state, room: request })),
  on(RequestActions.setWake, (state, { request }) => ({ ...state, wakeUp: request })),
  on(RequestActions.setOrder, (state, { request }) => ({ ...state, orders: request })),
  on(RequestActions.setReception, (state, { request }) => ({ ...state, reception: request })),
  on(RequestActions.setLate, (state, { request }) => ({ ...state, late: request })),
  on(RequestActions.setClean, (state, { request }) => ({ ...state, clean: request })),
  on(RequestActions.setMaintain, (state, { request }) => ({ ...state, maintain: request })),
);
