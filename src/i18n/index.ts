import { setDefaultOptions } from 'date-fns';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import enUS from './en-US';
import { registerPaperDatesTranslations } from './paperDates';
import pl from './pl';

import { getDateFnsLocale } from '@/utils';

const translations = { en: enUS, pl };
const i18n = new I18n(translations);

setDefaultOptions({
  locale: getDateFnsLocale(Localization),
});

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

registerPaperDatesTranslations();

export default i18n;
