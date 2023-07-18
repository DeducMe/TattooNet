import {useEffect, useState} from 'react';

export type Language = 'en' | 'ru' | 'fr';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/ru.json'));
countries.registerLocale(require('i18n-iso-countries/langs/fr.json'));

export type Country = {
  code: string;
  name: string;
};

const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const getCountries = (lang: string): Country[] =>
  Object.entries(countries.getNames(lang, {select: 'official'})).map(
    ([code, name]) => ({
      code: countries.toAlpha3(code),
      name: `${getFlagEmoji(code)} ${name}`,
    }),
  );

export default function useLanguages() {
  const [locale, setLocale] = useState<Language>('en');
  const [languages, setLanguages] = useState<Country[]>([]);

  useEffect(() => {
    setLanguages(getCountries(locale));
  }, [locale]);

  return {languages, setLocale};
}
