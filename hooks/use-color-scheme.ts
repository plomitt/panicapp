import { usePreferences } from '@/context/PreferencesContext';

export function useColorScheme() {
  const { activeColorScheme } = usePreferences();
  return activeColorScheme;
}