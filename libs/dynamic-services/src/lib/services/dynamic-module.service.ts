import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MODULES } from '../constants/modules-references';
import { tap } from 'rxjs/operators';
import {
  ImmediateOptionLink,
  ImmediateOptionText,
  ImmediateRequestModule,
  OptionType,
} from '@contler/models';
import { ImmediateModule } from '../utils/Immediate-module';

@Injectable()
export class DynamicModuleService {
  constructor(private db: AngularFireDatabase) {}

  getImmediateRequestModule(hotelId: string) {
    return this.db
      .object<ImmediateRequestModule>(`${MODULES.root}/${hotelId}/${MODULES.immediate}`)
      .valueChanges()
      .pipe(
        tap((data) => {
          if (!data) {
            this.setUpImmediateModule(hotelId);
          }
        }),
      );
  }

  private setUpImmediateModule(hotelId) {
    const module = new ImmediateModule();
    module
      .addCategory('1', 'zone.socialZone')
      .addCategory('2', 'zone.humidZone')
      .addCategory('4', 'zone.outsideHotel')
      .addCategory('5', 'zone.foodZone')
      .addOption('1', {
        type: OptionType.TEXT,
        icon: 'fas fa-key',
        text: 'zoneRequest.categories.roomKeys',
        value: 'zoneRequest.categories.roomKeys',
      } as ImmediateOptionText)
      .addOption('1', {
        type: OptionType.LINK,
        icon: 'far fa-calendar',
        text: 'zoneRequest.categories.spaceReserve',
        link: '/home/reservation',
      } as ImmediateOptionLink)
      .addOption('1', {
        type: OptionType.LINK,
        icon: 'fas fa-glass-martini-alt',
        text: 'zoneRequest.categories.drink',
        link: '/home/product/create',
      } as ImmediateOptionLink)
      .addOption('1', {
        type: OptionType.TEXT,
        icon: 'fas fa-user-friends',
        text: 'zoneRequest.categories.callHotel',
        value: 'zoneRequest.categories.callHotel',
      } as ImmediateOptionText)
      .addOption('2', {
        type: OptionType.TEXT,
        icon: 'fas fa-shower',
        text: 'zoneRequest.categories.towels',
        value: 'zoneRequest.categories.towels',
      } as ImmediateOptionText)
      .addOption('2', {
        type: OptionType.LINK,
        icon: 'fas fa-glass-martini-alt',
        text: 'zoneRequest.categories.drink',
        link: '/home/product/create',
      } as ImmediateOptionLink)
      .addOption('2', {
        type: OptionType.LINK,
        icon: 'far fa-calendar',
        text: 'zoneRequest.categories.spaceReserve',
        link: '/home/reservation',
      } as ImmediateOptionLink)
      .addOption('2', {
        type: OptionType.OTHER,
        icon: 'fas fa-plus',
        text: 'zoneRequest.categories.other',
      })
      .addOption('4', {
        type: OptionType.LINK,
        icon: 'fas fa-glass-martini-alt',
        text: 'zoneRequest.categories.food',
        link: '/home/product/create',
      } as ImmediateOptionLink)
      .addOption('4', {
        type: OptionType.TEXT,
        icon: 'fas fa-clock',
        text: 'zoneRequest.categories.clean',
        value: 'zoneRequest.categories.clean',
      } as ImmediateOptionText)
      .addOption('4', {
        type: OptionType.LINK,
        icon: 'fas fa-umbrella-beach',
        text: 'zoneRequest.categories.specialRequest',
        link: '/home/special-requests',
      } as ImmediateOptionLink)
      .addOption('5', {
        type: OptionType.TEXT,
        icon: 'fas fa-user',
        text: 'zoneRequest.categories.waiter',
        value: 'zoneRequest.categories.waiter',
      } as ImmediateOptionText)
      .addOption('5', {
        type: OptionType.TEXT,
        icon: 'fas fa-user',
        text: 'zoneRequest.categories.roomKeys',
        value: 'zoneRequest.categories.roomKeys',
      } as ImmediateOptionText);
    this.db
      .object<ImmediateRequestModule>(`${MODULES.root}/${hotelId}/${MODULES.immediate}`)
      .set(module.module);
  }
}
