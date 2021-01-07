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
  {
    name: 'Deutsche',
    englishName: 'German',
    prefix: 'de-DE',
    unicode: '🇩🇪',
  },
  {
    name: 'Français',
    englishName: 'French',
    prefix: 'fr-FR',
    unicode: '🇫🇷',
  },
  {
    name: 'Italiano',
    englishName: 'Italian',
    prefix: 'it-IT',
    unicode: '🇮🇹',
  },
  {
    name: 'Português',
    englishName: 'Portuguese',
    prefix: 'pt-PT',
    unicode: '🇵🇹',
  },
];

export const getLan = (): [Language, Language[]] => {
  const actualPref = localStorage.lan || 'es-CO';
  const actualLang = LANGUAGES.find((lan) => lan.prefix === actualPref);
  const otherLang = LANGUAGES.filter((lan) => lan.prefix !== actualPref);
  return [actualLang, otherLang];
};
