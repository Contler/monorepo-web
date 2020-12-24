import { Observable } from 'rxjs';

export abstract class LoaderDynamicTranslate {
  obs: Observable<string>;
}

export class Loader implements LoaderDynamicTranslate {
  constructor(public obs: Observable<string>) {}
}
