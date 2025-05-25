// import 'server-only';

const dictionaries = {
  en: () => import('../../i18n/en.json').then((module) => module.default),
  el: () => import('../../i18n/el.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'el') => dictionaries[locale]();
