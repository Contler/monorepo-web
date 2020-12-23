import { Language } from './language.model';

export class TranslateRequest {
  actualLan: Language;

  languages: Language[];

  hotel: string;

  url: string;

  mgs: string;
}
