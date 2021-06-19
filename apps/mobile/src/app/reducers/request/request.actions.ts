import { createAction, props } from '@ngrx/store';
import { AbstractRequest } from '@contler/dynamic-services';
import { BookingEntity, OrderEntity, WakeUpEntity } from '@contler/entity';
import { LateCheckUser } from '@contler/models';

export const setImmediate = createAction('[Request] Load immediate', props<{ request: AbstractRequest[] }>());
export const setSpecial = createAction('[Request] Load special', props<{ request: AbstractRequest[] }>());
export const setReservation = createAction('[Request] Load booking', props<{ request: BookingEntity[] }>());
export const setRoom = createAction('[Request] Load room', props<{ request: AbstractRequest[] }>());
export const setWake = createAction('[Request] Load wake', props<{ request: WakeUpEntity[] }>());
export const setOrder = createAction('[Request] Load order', props<{ request: OrderEntity[] }>());
export const setReception = createAction('[Request] Load Reception', props<{ request: AbstractRequest[] }>());
export const setLate = createAction('[Request] Load Late', props<{ request: LateCheckUser[] }>());
export const setClean = createAction('[Request] Load clean', props<{ request: AbstractRequest[] }>());
export const setMaintain = createAction('[Request] Load maintain', props<{ request: AbstractRequest[] }>());
