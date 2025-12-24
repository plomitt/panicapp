import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

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
      description: 'Use this exercise to anchor yourself in the present moment when you feel overwhelmed.',
      start: 'Start Exercise',
      tapAnywhere: '(Tap anywhere)',
      wellDone: 'Well Done.',
      finishDescription: 'Take a deep breath. You have grounded yourself in the present.',
      finishButton: 'Finish',
      steps: {
        sight: { sense: 'SIGHT', instruction: 'Look around. Tap for 5 things you can SEE.' },
        touch: { sense: 'TOUCH', instruction: 'Find 4 things you can physically FEEL.' },
        sound: { sense: 'SOUND', instruction: 'Listen carefully. Tap for 3 things you can HEAR.' },
        smell: { sense: 'SMELL', instruction: 'Identify 2 things you can SMELL.' },
        taste: { sense: 'TASTE', instruction: 'Focus on 1 thing you can TASTE.' },
      }
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
      description: 'Используйте это упражнение, чтобы вернуться в настоящий момент, когда чувствуете тревогу.',
      start: 'Начать',
      tapAnywhere: '(Нажмите в любом месте)',
      wellDone: 'Отлично.',
      finishDescription: 'Сделайте глубокий вдох. Вы вернулись в настоящий момент.',
      finishButton: 'Завершить',
      steps: {
        sight: { sense: 'ЗРЕНИЕ', instruction: 'Оглядитесь. Нажмите на 5 вещей, которые вы ВИДИТЕ.' },
        touch: { sense: 'ОСЯЗАНИЕ', instruction: 'Найдите 4 вещи, которые можно ПОЧУВСТВОВАТЬ.' },
        sound: { sense: 'СЛУХ', instruction: 'Прислушайтесь. Нажмите на 3 звука, которые СЛЫШИТЕ.' },
        smell: { sense: 'ОБОНЯНИЕ', instruction: 'Определите 2 запаха, которые вы ЧУВСТВУЕТЕ.' },
        taste: { sense: 'ВКУС', instruction: 'Сосредоточьтесь на 1 вещи, которую можно ПОПРОБОВАТЬ.' },
      }
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
      description: 'Usa este ejercicio para anclarte en el momento presente cuando te sientas abrumado.',
      start: 'Comenzar',
      tapAnywhere: '(Toca en cualquier lugar)',
      wellDone: 'Muy bien.',
      finishDescription: 'Respira profundo. Te has anclado en el presente.',
      finishButton: 'Terminar',
      steps: {
        sight: { sense: 'VISTA', instruction: 'Mira a tu alrededor. Toca 5 cosas que puedas VER.' },
        touch: { sense: 'TACTO', instruction: 'Encuentra 4 cosas que puedas SENTIR físicamente.' },
        sound: { sense: 'OÍDO', instruction: 'Escucha atentamente. Toca 3 cosas que puedas OÍR.' },
        smell: { sense: 'OLFATO', instruction: 'Identifica 2 cosas que puedas OLER.' },
        taste: { sense: 'GUSTO', instruction: 'Concéntrate en 1 cosa que puedas SABOREAR.' },
      }
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
      description: '当你感到不知所措时，使用此练习将自己锚定在当下。',
      start: '开始练习',
      tapAnywhere: '(点击任意位置)',
      wellDone: '做得好。',
      finishDescription: '深呼吸。你已经回到了当下。',
      finishButton: '完成',
      steps: {
        sight: { sense: '视觉', instruction: '环顾四周。点击 5 件你能看到的东西。' },
        touch: { sense: '触觉', instruction: '找到 4 件你能感觉到的东西。' },
        sound: { sense: '听觉', instruction: '仔细听。点击 3 件你能听到的声音。' },
        smell: { sense: '嗅觉', instruction: '辨别 2 件你能闻到的气味。' },
        taste: { sense: '味觉', instruction: '专注于 1 件你能尝到的味道。' },
      }
    },
  },
};

export const i18n = new I18n(translations);

i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export type LanguageCode = keyof typeof translations;
export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string; symbol: string }[] = [
  { code: 'en', label: 'English', symbol: 'En' },
  { code: 'ru', label: 'Русский', symbol: 'Ру' },
  { code: 'es', label: 'Español', symbol: 'Es' },
  { code: 'zh', label: '中文', symbol: '文' },
];