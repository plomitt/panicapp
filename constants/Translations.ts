import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Define languages
const translations = {
  en: {
    settings: {
      title: 'Settings',
      appearance: 'Appearance',
      language: 'Language',
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
    },
    grounding: {
      title: 'Grounding',
      subtitle: '5-4-3-2-1 Technique',
      start: 'Start Exercise',
    },
  },
  ru: {
    settings: {
      title: 'Настройки',
      appearance: 'Внешний вид',
      language: 'Язык',
      theme: {
        light: 'Светлая',
        dark: 'Темная',
        system: 'Системная',
      },
    },
    grounding: {
      title: 'Заземление',
      subtitle: 'Техника 5-4-3-2-1',
      start: 'Начать',
    },
  },
  es: {
    settings: {
      title: 'Ajustes',
      appearance: 'Apariencia',
      language: 'Idioma',
      theme: {
        light: 'Claro',
        dark: 'Oscuro',
        system: 'Sistema',
      },
    },
    grounding: {
      title: 'Anclaje',
      subtitle: 'Técnica 5-4-3-2-1',
      start: 'Comenzar',
    },
  },
  zh: {
    settings: {
      title: '设置',
      appearance: '外观',
      language: '语言',
      theme: {
        light: '浅色',
        dark: '深色',
        system: '系统默认',
      },
    },
    grounding: {
      title: '着陆',
      subtitle: '5-4-3-2-1 技术',
      start: '开始练习',
    },
  },
};

// Initialize i18n
export const i18n = new I18n(translations);

// Set initial locale based on system, falling back to English
i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export type LanguageCode = keyof typeof translations;
export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' },
];