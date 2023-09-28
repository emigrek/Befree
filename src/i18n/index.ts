import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import enUS from './en-US';
import { registerPaperDatesTranslations } from './paperDates';
import pl from './pl';

const translations = { 'en-US': enUS, 'pl-PL': pl };
const i18n = new I18n(translations);

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en-US';

registerPaperDatesTranslations();

export default i18n;
