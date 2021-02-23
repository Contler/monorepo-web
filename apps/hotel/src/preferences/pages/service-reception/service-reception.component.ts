import { Component, OnInit } from '@angular/core';
import { FormCreation } from '../../components/new-service-wrap/new-service-wrap.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as transDynamic } from '@contler/dynamic-translate';
import { getLan } from '@contler/const';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { ImmediateOptionLink, OptionType } from '@contler/models';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-service-reception',
  templateUrl: './service-reception.component.html',
  styleUrls: ['./service-reception.component.scss'],
})
export class ServiceReceptionComponent implements OnInit {
  load = false;
  private hotel: HotelEntity;

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dynTranslate: transDynamic,
    private db: AngularFireDatabase,
    private auth: AuthService,
    private dynamic: DynamicModuleService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.auth.$hotel.pipe(first()).subscribe((hotel) => (this.hotel = hotel));
  }

  async save(data: FormCreation) {
    const form = [...data.form];
    const [actualLan, languages] = getLan();
    this.load = true;
    this.generateMSg('preferences.message.translateMessage');
    const keyService = this.db.createPushId();
    const dataInit = await Promise.all([
      this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: this.hotel.uid,
          mgs: data.name,
          url: `receptionModule/${keyService}/name`,
        })
        .toPromise(),
      this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: this.hotel.uid,
          mgs: data.description,
          url: `receptionModule/${keyService}/description`,
        })
        .toPromise(),
    ]);

    for await (const inputField of form) {
      const dataInput = await this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: this.hotel.uid,
          mgs: inputField.description,
          url: `receptionModule/${keyService}/descriptionFile`,
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
              hotel: this.hotel.uid,
              mgs: inputFieldElementOption,
              url: `receptionModule/${keyService}/optionFile`,
            })
            .toPromise();
          inputField.option[i] = optionKey.key;
          i++;
        }
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
    const option: ImmediateOptionLink = {
      active: true,
      text: dataInit[0].key,
      icon: data.icon,
      type: OptionType.LINK,
      link: `/home/services/${keyService}`,
    };
    await this.dynamic.addOptionToReception(this.hotel.uid, option);
    return this.route.navigate(['/preferences/reception']);
  }

  generateMSg(key: string) {
    const msg1 = this.translate.instant(key);
    this.snackBar.open(msg1, 'X', { duration: 3000 });
  }
}
