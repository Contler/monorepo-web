import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as transDynamic } from '@contler/dynamic-translate';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'hotel/services/auth.service';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FormCreation } from 'hotel/preferences/components/new-service-wrap/new-service-wrap.component';
import { getLan } from '@contler/const';
import { ImmediateOptionLink, OptionType } from '@contler/models';

@Component({
  selector: 'contler-create-maintenance-module',
  templateUrl: './create-maintenance-module.component.html',
  styleUrls: ['./create-maintenance-module.component.scss'],
})
export class CreateMaintenanceModuleComponent implements OnInit {
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
    this.auth.$employer.pipe(take(1)).subscribe((user) => (this.hotel = user.hotel));
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
          url: `maintenanceModule/${keyService}/name`,
        })
        .toPromise(),
      this.dynTranslate
        .generateUrl({
          actualLan,
          languages,
          hotel: this.hotel.uid,
          mgs: data.description,
          url: `maintenanceModule/${keyService}/description`,
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
          url: `maintenanceModule/${keyService}/descriptionFile`,
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
              url: `maintenanceModule/${keyService}/optionFile`,
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
    await this.dynamic.addOptionToMaintenance(this.hotel.uid, option);
    return this.route.navigate(['/preferences/maintenance']);
  }
  generateMSg(key: string) {
    const msg1 = this.translate.instant(key);
    this.snackBar.open(msg1, 'X', { duration: 3000 });
  }
}
