import { i18n, LanguageCode } from '@/constants/Translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ThemePreference = 'light' | 'dark' | 'system';

interface PreferencesContextType {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  activeColorScheme: 'light' | 'dark'; 
}

const PreferencesContext = createContext<PreferencesContextType>({
  themePreference: 'system',
  setThemePreference: () => {},
  language: 'en',
  setLanguage: () => {},
  activeColorScheme: 'light',
});

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        const savedLang = await AsyncStorage.getItem('language');

        if (savedTheme) setThemePreference(savedTheme as ThemePreference);
        
        if (savedLang) {
            setLanguageState(savedLang as LanguageCode);
            i18n.locale = savedLang; 
        } else {
            setLanguageState(i18n.locale as LanguageCode);
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadSettings();
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    // 1. Update i18n immediately
    i18n.locale = lang;
    // 2. Trigger re-render via State
    setLanguageState(lang);
    // 3. Persist
    AsyncStorage.setItem('language', lang);
  };

  const saveThemePreference = async (theme: ThemePreference) => {
    setThemePreference(theme);
    await AsyncStorage.setItem('themePreference', theme);
  };

  const activeColorScheme = 
    themePreference === 'system' 
      ? (systemColorScheme ?? 'light') 
      : themePreference;

  if (!isLoaded) return null;

  return (
    <PreferencesContext.Provider value={{
      themePreference,
      setThemePreference: saveThemePreference,
      language,
      setLanguage,
      activeColorScheme,
    }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => useContext(PreferencesContext);