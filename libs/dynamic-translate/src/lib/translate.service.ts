import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { filter, map, mergeMap, startWith, switchMap, tap } from 'rxjs/operators';
import { LangChangeEvent, TranslateService as TrService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { getLan } from '@contler/const';
import { LoaderDynamicTranslate } from './loader';

@Injectable()
export class TranslateService {
  private sub = new BehaviorSubject<{ lan: LangChangeEvent; dic: any }>(null);
  changeDic = this.sub.asObservable().pipe(filter((data) => !!data));

  constructor(
    loader: LoaderDynamicTranslate,
    private afDb: AngularFireDatabase,
    externalTranslate: TrService,
  ) {
    const [actual] = getLan();
    loader.obs
      .pipe(
        switchMap((uid) => afDb.object<any>(`dictionary/${uid}`).valueChanges()),
        mergeMap((dic) =>
          externalTranslate.onLangChange.pipe(
            startWith({ lang: actual.prefix } as LangChangeEvent),
            map((lan) => ({ lan, dic })),
          ),
        ),
        tap((data) => console.log(data)),
      )
      .subscribe((data) => this.sub.next(data));
  }
}
