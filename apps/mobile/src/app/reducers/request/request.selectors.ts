import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRequest from './request.reducer';

export const selectRequestState = createFeatureSelector<fromRequest.RequestState>(
  fromRequest.requestFeatureKey,
);

export const selectImmediate = createSelector(selectRequestState, (state) => ({
  requests: state?.immediate || [],
  count: state?.immediate?.length || 0,
}));

export const selectSpecial = createSelector(selectRequestState, (state) => ({
  requests: state?.special || [],
  count: state?.special?.length || 0,
}));

export const selectBooking = createSelector(selectRequestState, (state) => ({
  requests: state?.bookings || [],
  count: state?.bookings?.length || 0,
}));

export const selectRoom = createSelector(selectRequestState, (state) => ({
  requests: state?.room || [],
  count: state?.room?.length || 0,
}));

export const selectWakeUp = createSelector(selectRequestState, (state) => ({
  requests: state?.wakeUp || [],
  count: state?.wakeUp?.length || 0,
}));

export const selectOrders = createSelector(selectRequestState, (state) => ({
  requests: state?.orders || [],
  count: state?.orders?.length || 0,
}));

export const selectReception = createSelector(selectRequestState, (state) => ({
  requests: state?.reception || [],
  count: state?.reception?.length || 0,
}));

export const selectLate = createSelector(selectRequestState, (state) => ({
  requests: state?.late || [],
  count: state?.late?.length || 0,
}));

export const selectClean = createSelector(selectRequestState, (state) => ({
  requests: state?.clean || [],
  count: state?.clean?.length || 0,
}));

export const selectMaintain = createSelector(selectRequestState, (state) => ({
  requests: state?.maintain || [],
  count: state?.maintain?.length || 0,
}));
