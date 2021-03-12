import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MODULES } from '../constants/modules-references';
import { first, map, take, tap } from 'rxjs/operators';
import {
  ImmediateOptionDynamicForm,
  ImmediateOptionLink,
  ImmediateOptionText,
  ImmediateRequestModule,
  Language,
  OptionModule,
  OptionType,
} from '@contler/models';
import { ImmediateModule } from '../utils/Immediate-module';
import { ReceptionModule } from '@contler/models/reception-module';
import { Observable } from 'rxjs';
import { roomBaseModule } from './data-source/roomBase';
import { getLan, LANGUAGES } from '@contler/const';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as transDynamic } from '@contler/dynamic-translate';
import { FormCreation } from '../interfaces/form-creation';
import { FormService } from '../interfaces/form-service';
import { DynamicRequest, receptionDynamicConverter } from '../interfaces/dynamic-request';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryFn } from '@angular/fire/firestore/interfaces';
import {
  cashLoanTemplate,
  exchangeTemplate,
  transportTemplate,
  travelServiceTemplate,
} from '../utils/service-template';

@Injectable()
export class DynamicModuleService {
  constructor(
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dynTranslate: transDynamic,
    private fireDb: AngularFirestore,
  ) {}

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

  public getOptionsModule(
    hotelUid: string,
    moduleReference: MODULES,
    active = true,
  ): Observable<OptionModule[] | null> {
    const url = `${MODULES.root}/${hotelUid}/${moduleReference}/options`;
    let query = this.db.list<OptionModule>(url);
    if (active) {
      query = this.db.list<OptionModule>(url, (ref) => ref.orderByChild('active').equalTo(true));
    }
    return query.valueChanges().pipe(
      tap((data) => {
        if (data.length === 0) {
          if (moduleReference === MODULES.reception) {
            this.setUpReception(url, hotelUid, moduleReference);
          } else if (moduleReference === MODULES.room) {
            this.setUpRoom(url);
          }
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

  async addOptionToModule(hotelId: string, option: OptionModule, moduleReference: MODULES): Promise<void> {
    const url = `${MODULES.root}/${hotelId}/${moduleReference}/options`;
    const list = await this.db.list(url).valueChanges().pipe(take(1)).toPromise();
    list.push(option);
    return this.db.object(url).set(list);
  }
  async removeOptionModule(
    hotelId: string,
    option: ImmediateOptionLink,
    moduleReference: MODULES,
  ): Promise<void> {
    const url = `${MODULES.root}/${hotelId}/${moduleReference}/options`;
    let list = await this.db.list<ImmediateOptionLink>(url).valueChanges().pipe(take(1)).toPromise();
    list = list.filter((l) => l.link !== option.link);
    return this.db.object(url).set(list);
  }
  async updateOptionToModule(
    hotelId: string,
    option: ImmediateOptionDynamicForm,
    moduleReference: MODULES,
  ): Promise<void> {
    const url = `${MODULES.root}/${hotelId}/${moduleReference}/options`;
    let list = await this.db.list<ImmediateOptionLink>(url).valueChanges().pipe(take(1)).toPromise();
    list = list.map((l) => {
      if (l.link === option.link) {
        l.text = option.text;
        l.icon = option.icon;
      }
      return l;
    });
    return this.db.object(url).set(list);
  }
  private async setUpReception(url: string, hotelUid: string, moduleReference: MODULES.reception) {
    const receptionModule: ReceptionModule = {
      options: [],
    };
    await this.db.object(url).set(receptionModule.options);
    await this.createFormModuleDynamic(
      travelServiceTemplate,
      hotelUid,
      moduleReference,
      null,
      LANGUAGES.find((lg) => lg.code === 'es'),
    );
    await this.createFormModuleDynamic(
      cashLoanTemplate,
      hotelUid,
      moduleReference,
      null,
      LANGUAGES.find((lg) => lg.code === 'es'),
    );
    await this.createFormModuleDynamic(
      exchangeTemplate,
      hotelUid,
      moduleReference,
      null,
      LANGUAGES.find((lg) => lg.code === 'es'),
    );
    await this.createFormModuleDynamic(
      transportTemplate,
      hotelUid,
      moduleReference,
      null,
      LANGUAGES.find((lg) => lg.code === 'es'),
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
        formKey: null,
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

  private setUpRoom(url: string): void {
    this.db.object(url).set(roomBaseModule.options);
  }

  async createFormModuleDynamic(
    data: FormCreation,
    hotelUid: string,
    moduleReference: MODULES,
    formService: FormService = null,
    defaultLang?: Language,
  ) {
    const form = [...data.form];
    let actualLan: Language;
    let languages: Language[];

    if (defaultLang) {
      actualLan = defaultLang;
      languages = LANGUAGES.filter((lg) => lg.code !== actualLan.code);
    } else {
      actualLan = getLan()[0];
      languages = getLan()[1];
    }
    this.generateMSg('preferences.message.translateMessage');
    const keyService = formService ? formService.key : this.db.createPushId();
    const dataInit = await Promise.all([
      this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: hotelUid,
          mgs: data.name,
          url: `${moduleReference}Module/${keyService}/name`,
        })
        .toPromise(),
      this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: hotelUid,
          mgs: data.description,
          url: `${moduleReference}Module/${keyService}/description`,
        })
        .toPromise(),
    ]);
    for await (const inputField of form) {
      const dataInput = await this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: hotelUid,
          mgs: inputField.description,
          url: `${moduleReference}Module/${keyService}/descriptionFile`,
        })
        .toPromise();
      inputField.description = dataInput.key;
      if (inputField.option) {
        let i = 0;
        for await (const inputFieldElementOption of inputField.option) {
          const optionKey = await this.dynTranslate
            .generateUrl({
              actualLan,
              languages,
              hotel: hotelUid,
              mgs: inputFieldElementOption,
              url: `${moduleReference}Module/${keyService}/optionFile`,
            })
            .toPromise();
          inputField.option[i] = optionKey.key;
          i++;
        }
      }
      if (!!inputField.money?.nameSelect) {
        const nameSelect = await this.dynTranslate
          .generateUrl({
            actualLan,
            languages,
            hotel: hotelUid,
            mgs: inputField.money.nameSelect,
            url: `${moduleReference}Module/${keyService}/optionFile`,
          })
          .toPromise();
        inputField.money.nameSelect = nameSelect.key;
      }
    }
    this.generateMSg('preferences.message.saveForm');
    await this.db.database.ref(MODULES.form).child(keyService).set({
      title: dataInit[1].key,
      form,
      key: keyService,
      serviceName: dataInit[0].key,
    });

    this.generateMSg('preferences.message.saveService');
    const option: ImmediateOptionDynamicForm = {
      active: true,
      text: dataInit[0].key,
      icon: data.icon,
      type: OptionType.DYNAMIC_FORM,
      link: `/home/services/${moduleReference}/${keyService}`,
      formKey: keyService,
    };
    if (!formService) {
      await this.addOptionToModule(hotelUid, option, moduleReference);
    } else {
      await this.updateOptionToModule(hotelUid, option, moduleReference);
    }
  }
  generateMSg(key: string) {
    const msg1 = this.translate.instant(key);
    this.snackBar.open(msg1, 'X', { duration: 3000 });
  }

  getFormData(formId: string) {
    const url = `${MODULES.form}/${formId}`;
    return this.db.object<FormService>(url).valueChanges().pipe(first());
  }

  saveDynamicRequest(request: DynamicRequest) {
    const key = this.fireDb.createId();
    request.key = key;
    return this.fireDb.doc(`dynamicRequest/${key}`).set(request);
  }

  updateDynamicRequest(request: DynamicRequest) {
    return this.fireDb.collection(`dynamicRequest`).doc(request.key).update(request);
  }

  getDynamicRequest(hotelId: string, module: MODULES, status: boolean, untilDate?: number, formId?: string) {
    const reference = this.fireDb.firestore
      .collection('dynamicRequest')
      .withConverter(receptionDynamicConverter);

    let query: QueryFn;

    if (untilDate) {
      const oneDayToMilliseconds = 86400000;
      const totalDays = untilDate * oneDayToMilliseconds;
      const date = new Date(Date.now() - totalDays);
      query = (ref) =>
        ref
          .where('hotelId', '==', hotelId)
          .where('service', '==', module)
          .where('active', '==', status)
          .where('createAt', '>=', date);
    } else {
      query = (ref) =>
        ref.where('hotelId', '==', hotelId).where('service', '==', module).where('active', '==', status);
    }
    if (formId) {
      return this.fireDb
        .collection<DynamicRequest>(reference, query)
        .valueChanges()
        .pipe(map((forms) => forms.filter((form) => form.nameService.includes(formId))));
    } else {
      return this.fireDb.collection<DynamicRequest>(reference, query).valueChanges();
    }
  }

  getOptionModule(path: string, hotelUid: string, optionUid): Observable<OptionModule[]> {
    let ref = `modules/${hotelUid}`;
    let link = '/home/services/';
    if (path.includes('cleaning')) {
      ref += '/cleaning/options';
      link += 'cleaning';
    } else if (path.includes('reception')) {
      ref += '/reception/options';
      link += 'reception';
    } else if (path.includes('room')) {
      ref += '/room/options';
      link += 'room';
    }
    link += `/${optionUid}`;
    return this.db
      .list<OptionModule>(ref, (queryFn) => queryFn.orderByChild('link').equalTo(link))
      .valueChanges();
  }

  removeDictionaryFormModule(hotelUid: string, moduleReference: MODULES, formId: string) {
    const path = `dictionary/${hotelUid}/${moduleReference}Module/${formId}`;
    return this.db.object(path).remove();
  }
}
