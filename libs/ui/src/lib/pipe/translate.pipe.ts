import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { getLan } from '@contler/const';
import { Observable } from 'rxjs';

interface KeyMap {
  [key: string]: string;
}

@Pipe({
  name: 'ctrTranslate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService, private afDb: AngularFireDatabase) {}

  transform(key: string): Observable<string> {
    const [lang] = getLan();
    return this.afDb
      .object<KeyMap>(key)
      .valueChanges()
      .pipe(
        mergeMap((data) =>
          this.translate.onLangChange.pipe(
            startWith({ lang: lang.prefix }),
            map((lan) => (!!data ? data[lan.lang] || data[lang.prefix] || key : key)),
          ),
        ),
      );
  }
}
