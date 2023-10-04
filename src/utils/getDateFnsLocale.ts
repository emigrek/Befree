import { Locale } from 'date-fns';
import * as Locales from 'date-fns/locale';
import * as Localization from 'expo-localization';

export function getDateFnsLocale({
  locale,
}: Pick<typeof Localization, 'locale'>): Locale {
  const [languageCode, regionCode] = locale.split('-');

  const dateFnsLocale = (Locales as Record<string, Locale>)[
    languageCode + regionCode
  ];

  if (dateFnsLocale) {
    return dateFnsLocale;
  }

  return (Locales as Record<string, Locale>)[languageCode] || Locales.enUS;
}
