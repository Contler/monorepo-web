import { Component, Input, OnInit } from '@angular/core';
import { ImmediateCategory, ImmediateOptionText, OptionType } from '@contler/models';
import { AngularFireDatabase } from '@angular/fire/database';
import { IconModel } from '@contler/models/icon.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@contler/dynamic-translate';
import { getLan } from '@contler/const';
import { HotelEntity } from '@contler/entity';
import { DynamicModuleService } from '@contler/dynamic-services';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MODULES } from '../../../../../../libs/dynamic-services/src/lib/constants/modules-references';

@Component({
  selector: 'contler-immediate-category',
  templateUrl: './immediate-category.component.html',
  styleUrls: ['./immediate-category.component.scss'],
})
export class ImmediateCategoryComponent implements OnInit {
  @Input() category: ImmediateCategory;
  @Input() hotel: HotelEntity;
  isOpen = false;
  icons: Observable<IconModel[]>;

  name: string;
  icon: string;

  constructor(
    private db: AngularFireDatabase,
    private translate: TranslateService,
    private dynamicModule: DynamicModuleService,
  ) {}

  ngOnInit(): void {
    this.icons = this.db.list<IconModel>('icons').valueChanges().pipe(take(1));
  }

  async addOption() {
    const [actualLan, languages] = getLan();
    const translate = await this.translate
      .generateUrl({
        actualLan,
        languages,
        url: 'immediateOption',
        hotel: this.hotel.uid,
        mgs: this.name,
      })
      .toPromise();
    const option: ImmediateOptionText = {
      active: true,
      icon: this.icon,
      text: translate.key,
      type: OptionType.TEXT,
      value: translate.key,
    };
    return this.dynamicModule.addOptionToImmediate(this.hotel.uid, this.category.id, option).then(() => {
      this.isOpen = false;
      this.name = null;
      this.icon = null;
    });
  }

  changeStatus(event: MatCheckboxChange, index: number) {
    const url = `${MODULES.root}/${this.hotel.uid}/${MODULES.immediate}/categories/${this.category.id}/options/${index}/active`;
    this.db.database.ref(url).set(event.checked);
  }
}
