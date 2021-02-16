import { Language } from '../models';

export const LANGUAGES: Language[] = [
  {
    name: 'Español',
    englishName: 'Spanish',
    prefix: 'es-CO',
    unicode: '🇨🇴',
    code: 'es',
  },
  {
    name: 'English',
    englishName: 'English',
    prefix: 'en-US',
    unicode: '🇬🇧',
    code: 'en',
  },
  {
    name: 'Deutsche',
    englishName: 'German',
    prefix: 'de-DE',
    unicode: '🇩🇪',
    code: 'de',
  },
  {
    name: 'Français',
    englishName: 'French',
    prefix: 'fr-FR',
    unicode: '🇫🇷',
    code: 'fr',
  },
  {
    name: 'Italiano',
    englishName: 'Italian',
    prefix: 'it-IT',
    unicode: '🇮🇹',
    code: 'it',
  },
  {
    name: 'Português',
    englishName: 'Portuguese',
    prefix: 'pt-PT',
    unicode: '🇵🇹',
    code: 'pt',
  },
];

export const getLan = (): [Language, Language[]] => {
  const actualPref = localStorage.lan || 'es-CO';
  const actualLang = LANGUAGES.find((lan) => lan.prefix === actualPref);
  const otherLang = LANGUAGES.filter((lan) => lan.prefix !== actualPref);
  return [actualLang, otherLang];
};
