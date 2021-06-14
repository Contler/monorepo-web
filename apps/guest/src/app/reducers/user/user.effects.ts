import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as UserActions from './user.actions';
import { UserService } from '@contler/core';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap((data) => this.useService.getGuestById(data.uid)),
      map((user) => UserActions.setUser({ user })),
    );
  });

  constructor(private actions$: Actions, private useService: UserService) {}
}
