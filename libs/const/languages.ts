import { Language } from '../models';

export const LANGUAGES: Language[] = [
  {
    name: 'Español',
    englishName: 'Spanish',
    prefix: 'es-CO',
    unicode: '🇨🇴',
  },
  {
    name: 'English',
    englishName: 'English',
    prefix: 'en-US',
    unicode: '🇬🇧',
  },
];

export const getLan = (): [Language, Language[]] => {
  const actualPref = localStorage.lan || 'es-CO';
  const actualLang = LANGUAGES.find((lan) => lan.prefix === actualPref);
  const otherLang = LANGUAGES.filter((lan) => lan.prefix !== actualPref);
  return [actualLang, otherLang];
};
