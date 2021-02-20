import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MODULES } from '../constants/modules-references';
import { take, tap } from 'rxjs/operators';
import {
  ImmediateOptionLink,
  ImmediateOptionText,
  ImmediateRequestModule,
  OptionModule,
  OptionType,
} from '@contler/models';
import { ImmediateModule } from '../utils/Immediate-module';
import { ReceptionModule } from '@contler/models/reception-module';

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

  getReceptionModule(hotelId: string) {
    const url = `${MODULES.root}/${hotelId}/${MODULES.reception}`;
    return this.db
      .object<ReceptionModule>(url)
      .valueChanges()
      .pipe(
        tap((data) => {
          if (!data) {
            this.setUpReception(url);
          }
        }),
      );
  }

  async addOptionToImmediate(hotelId: string, categoryId: string, option: OptionModule) {
    const url = `${MODULES.root}/${hotelId}/${MODULES.immediate}/categories/${categoryId}/options`;
    const list = await this.db.list(url).valueChanges().pipe(take(1)).toPromise();
    list.push(option);
    return this.db.object(url).set(list);
  }

  private setUpReception(url: string) {
    const receptionModule: ReceptionModule = {
      options: [],
    };
    receptionModule.options.push({
      active: true,
      type: OptionType.LINK,
      text: 'reception.transportation',
      link: '/home/reception/transportation',
      icon: 'fas fa-taxi',
    } as ImmediateOptionLink);
    receptionModule.options.push({
      active: true,
      type: OptionType.LINK,
      text: 'reception.cashLoan',
      link: '/home/reception/cash',
      icon: 'fas fa-dollar-sign',
    } as ImmediateOptionLink);
    receptionModule.options.push({
      active: true,
      type: OptionType.LINK,
      text: 'reception.currencyExchange',
      link: '/home/reception/exchange',
      icon: 'fas fa-globe',
    } as ImmediateOptionLink);
    receptionModule.options.push({
      active: true,
      type: OptionType.LINK,
      text: 'reception.concierge',
      link: '/home/reception/concierge',
      icon: 'fas fa-map-marker-alt',
    } as ImmediateOptionLink);
    this.db.object(url).set(receptionModule);
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
        active: true,
      } as ImmediateOptionText)
      .addOption('1', {
        type: OptionType.LINK,
        icon: 'far fa-calendar',
        text: 'zoneRequest.categories.spaceReserve',
        link: '/home/reservation',
        active: true,
      } as ImmediateOptionLink)
      .addOption('1', {
        type: OptionType.LINK,
        icon: 'fas fa-glass-martini-alt',
        text: 'zoneRequest.categories.drink',
        link: '/home/product/create',
        active: true,
      } as ImmediateOptionLink)
      .addOption('1', {
        type: OptionType.TEXT,
        icon: 'fas fa-user-friends',
        text: 'zoneRequest.categories.callHotel',
        value: 'zoneRequest.categories.callHotel',
        active: true,
      } as ImmediateOptionText)
      .addOption('2', {
        type: OptionType.TEXT,
        icon: 'fas fa-shower',
        text: 'zoneRequest.categories.towels',
        value: 'zoneRequest.categories.towels',
        active: true,
      } as ImmediateOptionText)
      .addOption('2', {
        type: OptionType.LINK,
        icon: 'fas fa-glass-martini-alt',
        text: 'zoneRequest.categories.drink',
        link: '/home/product/create',
        active: true,
      } as ImmediateOptionLink)
      .addOption('2', {
        type: OptionType.LINK,
        icon: 'far fa-calendar',
        text: 'zoneRequest.categories.spaceReserve',
        link: '/home/reservation',
        active: true,
      } as ImmediateOptionLink)
      .addOption('2', {
        type: OptionType.OTHER,
        icon: 'fas fa-plus',
        text: 'zoneRequest.categories.other',
        active: true,
      })
      .addOption('4', {
        type: OptionType.LINK,
        icon: 'fas fa-glass-martini-alt',
        text: 'zoneRequest.categories.food',
        link: '/home/product/create',
        active: true,
      } as ImmediateOptionLink)
      .addOption('4', {
        type: OptionType.TEXT,
        icon: 'fas fa-clock',
        text: 'zoneRequest.categories.clean',
        value: 'zoneRequest.categories.clean',
        active: true,
      } as ImmediateOptionText)
      .addOption('4', {
        type: OptionType.LINK,
        icon: 'fas fa-umbrella-beach',
        text: 'zoneRequest.categories.specialRequest',
        link: '/home/special-requests',
        active: true,
      } as ImmediateOptionLink)
      .addOption('5', {
        type: OptionType.TEXT,
        icon: 'fas fa-user',
        text: 'zoneRequest.categories.waiter',
        value: 'zoneRequest.categories.waiter',
        active: true,
      } as ImmediateOptionText)
      .addOption('5', {
        type: OptionType.TEXT,
        icon: 'fas fa-user',
        text: 'zoneRequest.categories.roomKeys',
        value: 'zoneRequest.categories.roomKeys',
        active: true,
      } as ImmediateOptionText);
    this.db
      .object<ImmediateRequestModule>(`${MODULES.root}/${hotelId}/${MODULES.immediate}`)
      .set(module.module);
  }
}
