import { Inject, Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { HttpClient } from "@angular/common/http";
import { LangChangeEvent, TranslateService as TrService } from "@ngx-translate/core";
import { filter, map, mergeMap, startWith, switchMap, take, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { getLan } from "@contler/const";
import { LoaderDynamicTranslate } from "./loader";
import { getDicValue } from "./utils/getDicValue";
import { TranslateConfig } from "./interface/config.interface";
import { TRANSLATE_CONFIG } from "./app.config";
import { TranslateRequest } from "@contler/models";

@Injectable()
export class TranslateService {
  private readonly url: string;

  private sub = new BehaviorSubject<{ lan: LangChangeEvent; dic: any }>(null);
  private dic: any;
  private lan: string;

  changeDic = this.sub.asObservable().pipe(filter((data) => !!data));

  constructor(
    loader: LoaderDynamicTranslate,
    externalTranslate: TrService,
    @Inject(TRANSLATE_CONFIG) config: TranslateConfig,
    private afDb: AngularFireDatabase,
    private http: HttpClient,
  ) {
    const [actual] = getLan();
    this.url = config.url;

    loader.obs
      .pipe(
        switchMap((uid) => afDb.object<any>(`dictionary/${uid}`).valueChanges()),
        mergeMap((dic) =>
          externalTranslate.onLangChange.pipe(
            startWith({ lang: actual.prefix } as LangChangeEvent),
            map((lan) => ({ lan, dic })),
          ),
        ),
        tap((data) => {
          this.dic = data.dic;
          this.lan = data.lan.lang;
        }),
      )
      .subscribe((data) => this.sub.next(data));
  }

  getTranslate(key: string | Array<string>) {
    return this.changeDic.pipe(
      take(1),
      map(({ dic, lan }) => {
        if (typeof key === 'string') {
          const keys = key.split('/');
          const dicLan = getDicValue(dic, keys);
          return !!dicLan ? dicLan[lan.lang] || key : key;
        } else {
          const trns = {};
          key.forEach((keyData) => {
            const keys = keyData.split('/');
            const dicLan = getDicValue(dic, keys);
            trns[keyData] = !!dicLan ? dicLan[lan.lang] || keyData : keyData;
          });
          return trns;
        }
      }),
    );
  }

  getInstant(key: string) {
    const keys = key.split('/');
    const dicLan = getDicValue(this.dic, keys);
    return !!dicLan ? dicLan[this.lan] || key : key;
  }

  updateTranslate(key: string, msg: string, hotelUid: string) {
    const [to, from] = getLan();
    return this.http.put(`${this.url}translate`, {
      key,
      msg,
      to,
      from,
      hotel: hotelUid,
    });
  }

  generateUrl(request: TranslateRequest) {
    return this.http.post<{ key: string }>(`${this.url}translate`, request);
  }
}
