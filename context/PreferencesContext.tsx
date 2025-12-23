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
  activeColorScheme: 'light' | 'dark'; // The actual resulting color scheme
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

  // Load saved settings on startup
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
            // Default to whatever i18n detected from system
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

  // Save settings when they change
  const setLanguage = async (lang: LanguageCode) => {
    setLanguageState(lang);
    i18n.locale = lang; // Update i18n instance immediately
    await AsyncStorage.setItem('language', lang);
  };

  const saveThemePreference = async (theme: ThemePreference) => {
    setThemePreference(theme);
    await AsyncStorage.setItem('themePreference', theme);
  };

  // Calculate actual theme
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