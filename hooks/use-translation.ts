import { i18n } from '@/constants/Translations';
import { usePreferences } from '@/context/PreferencesContext';
import { useCallback } from 'react';

export function useTranslation() {
    const { language } = usePreferences();

    const t = useCallback((scope: string, options?: any) => {
        return i18n.t(scope, { ...options, locale: language });
    }, [language]);

    return { t, language };
}
