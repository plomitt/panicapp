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
      description: 'Use this exercise to gently bring your attention back to the present moment when you feel overwhelmed.',
      start: 'Start Exercise',
      tapAnywhere: '(Tap anywhere)',
      wellDone: 'Well done.',
      finishDescription: 'Take a slow, deep breath. You are here, in the present moment.',
      finishButton: 'Finish',
      steps: {
        sight: { sense: 'SIGHT', instruction: 'Look around. Tap 5 things you can SEE.' },
        touch: { sense: 'TOUCH', instruction: 'Notice 4 things you can physically FEEL.' },
        sound: { sense: 'SOUND', instruction: 'Listen closely. Tap 3 things you can HEAR.' },
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
        dark: 'Тёмная',
        system: 'Системная',
      },
    },
    grounding: {
      title: 'Заземление',
      subtitle: 'Техника 5-4-3-2-1',
      description: 'Это упражнение помогает мягко вернуть внимание в настоящий момент, когда становится тревожно.',
      start: 'Начать упражнение',
      tapAnywhere: '(Нажмите в любом месте)',
      wellDone: 'Хорошо получилось.',
      finishDescription: 'Сделайте спокойный глубокий вдох. Вы здесь и сейчас.',
      finishButton: 'Завершить',
      steps: {
        sight: { sense: 'ЗРЕНИЕ', instruction: 'Оглядитесь. Нажмите на 5 вещей, которые вы ВИДИТЕ.' },
        touch: { sense: 'ОСЯЗАНИЕ', instruction: 'Обратите внимание на 4 вещи, которые вы можете ПОЧУВСТВОВАТЬ.' },
        sound: { sense: 'СЛУХ', instruction: 'Прислушайтесь. Нажмите на 3 звука, которые вы СЛЫШИТЕ.' },
        smell: { sense: 'ОБОНЯНИЕ', instruction: 'Определите 2 запаха, которые вы ЧУВСТВУЕТЕ.' },
        taste: { sense: 'ВКУС', instruction: 'Сосредоточьтесь на 1 вкусе, который вы можете ОЩУТИТЬ.' },
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
      description: 'Este ejercicio te ayuda a volver con calma al momento presente cuando te sientes abrumado.',
      start: 'Comenzar ejercicio',
      tapAnywhere: '(Toca en cualquier lugar)',
      wellDone: 'Muy bien.',
      finishDescription: 'Respira lenta y profundamente. Estás aquí, en el presente.',
      finishButton: 'Finalizar',
      steps: {
        sight: { sense: 'VISTA', instruction: 'Mira a tu alrededor. Toca 5 cosas que puedas VER.' },
        touch: { sense: 'TACTO', instruction: 'Observa 4 cosas que puedas SENTIR físicamente.' },
        sound: { sense: 'OÍDO', instruction: 'Escucha con atención. Toca 3 cosas que puedas OÍR.' },
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
        system: '系统',
      },
    },
    grounding: {
      title: '正念稳定',
      subtitle: '5-4-3-2-1 放松练习',
      description: '当你感到紧张或不安时，这个练习可以温柔地帮助你回到当下。',
      start: '开始练习',
      tapAnywhere: '(点击任意位置)',
      wellDone: '做得很好。',
      finishDescription: '慢慢深呼吸。你已经回到了此刻。',
      finishButton: '完成',
      steps: {
        sight: { sense: '视觉', instruction: '环顾四周。点击 5 个你能看到的东西。' },
        touch: { sense: '触觉', instruction: '注意 4 个你能感觉到的事物。' },
        sound: { sense: '听觉', instruction: '仔细聆听。点击 3 个你能听到的声音。' },
        smell: { sense: '嗅觉', instruction: '辨认 2 种你能闻到的气味。' },
        taste: { sense: '味觉', instruction: '专注于 1 种你能尝到的味道。' },
      }
    },
  },

  fr: {
    settings: {
      title: 'Paramètres',
      appearance: 'Apparence',
      language: 'Langue',
      theme: {
        light: 'Clair',
        dark: 'Sombre',
        system: 'Système',
      },
    },
    grounding: {
      title: 'Ancrage',
      subtitle: 'Technique 5-4-3-2-1',
      description: 'Cet exercice vous aide à revenir doucement au moment présent lorsque vous vous sentez dépassé.',
      start: 'Commencer',
      tapAnywhere: '(Touchez n’importe où)',
      wellDone: 'Très bien.',
      finishDescription: 'Prenez une respiration lente et profonde. Vous êtes ici, maintenant.',
      finishButton: 'Terminer',
      steps: {
        sight: { sense: 'VUE', instruction: 'Regardez autour de vous. Touchez 5 choses que vous pouvez VOIR.' },
        touch: { sense: 'TOUCHER', instruction: 'Remarquez 4 choses que vous pouvez RESSENTIR.' },
        sound: { sense: 'OUÏE', instruction: 'Écoutez attentivement. Touchez 3 sons que vous pouvez ENTENDRE.' },
        smell: { sense: 'ODORAT', instruction: 'Identifiez 2 odeurs que vous pouvez SENTIR.' },
        taste: { sense: 'GOÛT', instruction: 'Concentrez-vous sur 1 chose que vous pouvez GOÛTER.' },
      }
    },
  },

  hi: {
    settings: {
      title: 'सेटिंग्स',
      appearance: 'दिखावट',
      language: 'भाषा',
      theme: {
        light: 'हल्का',
        dark: 'गहरा',
        system: 'सिस्टम',
      },
    },
    grounding: {
      title: 'ग्राउंडिंग',
      subtitle: '5-4-3-2-1 तकनीक',
      description: 'जब आप बेचैन महसूस करें, यह अभ्यास आपको धीरे-धीरे वर्तमान में लौटने में मदद करता है।',
      start: 'शुरू करें',
      tapAnywhere: '(कहीं भी टैप करें)',
      wellDone: 'बहुत अच्छा।',
      finishDescription: 'धीरे और गहरी सांस लें। आप इस पल में सुरक्षित हैं।',
      finishButton: 'समाप्त',
      steps: {
        sight: { sense: 'दृष्टि', instruction: 'आसपास देखें। 5 चीज़ें टैप करें जिन्हें आप देख सकते हैं।' },
        touch: { sense: 'स्पर्श', instruction: '4 चीज़ों पर ध्यान दें जिन्हें आप महसूस कर सकते हैं।' },
        sound: { sense: 'श्रवण', instruction: 'ध्यान से सुनें। 3 आवाज़ें टैप करें जिन्हें आप सुन सकते हैं।' },
        smell: { sense: 'गंध', instruction: '2 गंध पहचानें जिन्हें आप महसूस कर सकते हैं।' },
        taste: { sense: 'स्वाद', instruction: '1 स्वाद पर ध्यान केंद्रित करें।' },
      }
    },
  },

  bn: {
    settings: {
      title: 'সেটিংস',
      appearance: 'দেখানো',
      language: 'ভাষা',
      theme: {
        light: 'হালকা',
        dark: 'গাঢ়',
        system: 'সিস্টেম',
      },
    },
    grounding: {
      title: 'গ্রাউন্ডিং',
      subtitle: '৫-৪-৩-২-১ পদ্ধতি',
      description: 'যখন অস্থির লাগে, এই অনুশীলনটি আপনাকে ধীরে ধীরে বর্তমান মুহূর্তে ফিরিয়ে আনে।',
      start: 'শুরু করুন',
      tapAnywhere: '(যেকোনো জায়গায় ট্যাপ করুন)',
      wellDone: 'ভালো করেছেন।',
      finishDescription: 'ধীরে গভীর শ্বাস নিন। আপনি এখন এখানেই আছেন।',
      finishButton: 'শেষ',
      steps: {
        sight: { sense: 'দৃষ্টি', instruction: 'চারপাশে তাকান। ৫টি জিনিস ট্যাপ করুন যা আপনি দেখতে পাচ্ছেন।' },
        touch: { sense: 'স্পর্শ', instruction: '৪টি জিনিস লক্ষ্য করুন যা আপনি অনুভব করতে পারেন।' },
        sound: { sense: 'শ্রবণ', instruction: 'মনোযোগ দিয়ে শুনুন। ৩টি শব্দ ট্যাপ করুন।' },
        smell: { sense: 'ঘ্রাণ', instruction: '২টি গন্ধ শনাক্ত করুন।' },
        taste: { sense: 'স্বাদ', instruction: '১টি স্বাদের উপর মনোযোগ দিন।' },
      }
    },
  },

  pt: {
    settings: {
      title: 'Configurações',
      appearance: 'Aparência',
      language: 'Idioma',
      theme: {
        light: 'Claro',
        dark: 'Escuro',
        system: 'Sistema',
      },
    },
    grounding: {
      title: 'Ancoragem',
      subtitle: 'Técnica 5-4-3-2-1',
      description: 'Este exercício ajuda você a se reconectar com o momento presente quando se sentir ansioso.',
      start: 'Iniciar',
      tapAnywhere: '(Toque em qualquer lugar)',
      wellDone: 'Muito bem.',
      finishDescription: 'Respire lenta e profundamente. Você está aqui agora.',
      finishButton: 'Finalizar',
      steps: {
        sight: { sense: 'VISÃO', instruction: 'Olhe ao redor. Toque em 5 coisas que você pode VER.' },
        touch: { sense: 'TOQUE', instruction: 'Perceba 4 coisas que você pode SENTIR.' },
        sound: { sense: 'AUDIÇÃO', instruction: 'Escute com atenção. Toque em 3 sons que você pode OUVIR.' },
        smell: { sense: 'OLFATO', instruction: 'Identifique 2 cheiros que você pode SENTIR.' },
        taste: { sense: 'PALADAR', instruction: 'Concentre-se em 1 sabor que você pode SENTIR.' },
      }
    },
  },

  id: {
    settings: {
      title: 'Pengaturan',
      appearance: 'Tampilan',
      language: 'Bahasa',
      theme: {
        light: 'Terang',
        dark: 'Gelap',
        system: 'Sistem',
      },
    },
    grounding: {
      title: 'Grounding',
      subtitle: 'Teknik 5-4-3-2-1',
      description: 'Latihan ini membantu Anda kembali dengan tenang ke saat ini ketika merasa cemas.',
      start: 'Mulai',
      tapAnywhere: '(Ketuk di mana saja)',
      wellDone: 'Bagus sekali.',
      finishDescription: 'Tarik napas perlahan dan dalam. Anda ada di sini sekarang.',
      finishButton: 'Selesai',
      steps: {
        sight: { sense: 'PENGLIHATAN', instruction: 'Lihat sekeliling. Ketuk 5 hal yang bisa Anda LIHAT.' },
        touch: { sense: 'SENTUHAN', instruction: 'Perhatikan 4 hal yang bisa Anda RASAKAN.' },
        sound: { sense: 'PENDENGARAN', instruction: 'Dengarkan dengan saksama. Ketuk 3 suara yang bisa Anda DENGAR.' },
        smell: { sense: 'PENCIUMAN', instruction: 'Kenali 2 aroma yang bisa Anda CIUM.' },
        taste: { sense: 'PENGECAP', instruction: 'Fokus pada 1 rasa yang bisa Anda RASAKAN.' },
      }
    },
  },

  ja: {
    settings: {
      title: '設定',
      appearance: '外観',
      language: '言語',
      theme: {
        light: 'ライト',
        dark: 'ダーク',
        system: 'システム',
      },
    },
    grounding: {
      title: 'グラウンディング',
      subtitle: '5-4-3-2-1 テクニック',
      description: '不安を感じたとき、この練習はやさしく今この瞬間へ意識を戻す助けになります。',
      start: '始める',
      tapAnywhere: '(どこでもタップ)',
      wellDone: 'よくできました。',
      finishDescription: 'ゆっくり深呼吸してください。あなたは今ここにいます。',
      finishButton: '完了',
      steps: {
        sight: { sense: '視覚', instruction: '周りを見て、見えるものを5つタップしてください。' },
        touch: { sense: '触覚', instruction: '感じられるものを4つ意識してください。' },
        sound: { sense: '聴覚', instruction: '耳を澄ませて、聞こえる音を3つタップしてください。' },
        smell: { sense: '嗅覚', instruction: '匂いを2つ感じ取ってください。' },
        taste: { sense: '味覚', instruction: '味を1つ感じることに集中してください。' },
      }
    },
  },

  ko: {
    settings: {
      title: '설정',
      appearance: '모양',
      language: '언어',
      theme: {
        light: '밝게',
        dark: '어둡게',
        system: '시스템',
      },
    },
    grounding: {
      title: '그라운딩',
      subtitle: '5-4-3-2-1 기법',
      description: '불안하거나 압도될 때, 이 연습은 현재 순간으로 부드럽게 돌아오도록 도와줍니다.',
      start: '시작하기',
      tapAnywhere: '(아무 곳이나 탭하세요)',
      wellDone: '잘하셨어요.',
      finishDescription: '천천히 깊게 숨을 쉬세요. 지금 이 순간에 있습니다.',
      finishButton: '완료',
      steps: {
        sight: { sense: '시각', instruction: '주변을 둘러보고 볼 수 있는 것 5가지를 탭하세요.' },
        touch: { sense: '촉각', instruction: '느낄 수 있는 것 4가지를 알아차려 보세요.' },
        sound: { sense: '청각', instruction: '귀 기울여 듣고 들리는 소리 3가지를 탭하세요.' },
        smell: { sense: '후각', instruction: '맡을 수 있는 냄새 2가지를 느껴보세요.' },
        taste: { sense: '미각', instruction: '느껴지는 맛 1가지에 집중하세요.' },
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
  { code: 'zh', label: '中文 (普通话)', symbol: '中' },
  { code: 'fr', label: 'Français', symbol: 'Fr' },
  { code: 'hi', label: 'हिन्दी', symbol: 'हि' },
  { code: 'bn', label: 'বাংলা', symbol: 'বা' },
  { code: 'pt', label: 'Português', symbol: 'Pt' },
  { code: 'id', label: 'Bahasa Indonesia', symbol: 'Id' },
  { code: 'ja', label: '日本語', symbol: '日' },
  { code: 'ko', label: '한국어', symbol: '한' },
];