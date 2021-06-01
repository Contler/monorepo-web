import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { GuestHomeComponent } from '@contler/hotel/preferences/pages/guest-home/guest-home.component';
import { MessagesService } from '@contler/hotel/services/messages/messages.service';
import { SpecialZoneGuest } from '@contler/models';

@Injectable({
  providedIn: 'root',
})
export class GuestHomeCanDeactivateGuard implements CanDeactivate<unknown> {
  constructor(private messagesService: MessagesService) {}

  async canDeactivate(
    component: GuestHomeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Promise<boolean> {
    if (component.hasChanges) {
      const zonesUpdate: { [index: string]: SpecialZoneGuest } = {};
      const promisesRemoveOldKeys = [];
      const loader = this.messagesService.showLoader();
      component.specialZoneGuest.forEach((zone, index) => {
        if (
          component.preparedZonesUpdate.hasOwnProperty(index) &&
          component.preparedZonesUpdate[index].name !== zone.name
        ) {
          zonesUpdate[index] = component.preparedZonesUpdate[index];
          promisesRemoveOldKeys.push(
            component.translate.removeTranslate(
              component.preparedZonesUpdate[index].name,
              component.hotel.uid,
            ),
          );
        }
      });
      try {
        await Promise.all(promisesRemoveOldKeys);
        this.messagesService.closeLoader(loader);
        return true;
      } catch (e) {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
        return false;
      }
    }
    return true;
  }
}
