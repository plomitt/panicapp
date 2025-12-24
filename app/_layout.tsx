import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { PreferencesProvider } from '@/context/PreferencesContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

import { Colors } from '@/constants/theme';

// Separate component to consume the context
function AppLayout() {
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

      // 1. Set body background color to match theme
      // @ts-ignore
      document.body.style.backgroundColor = backgroundColor;
      // @ts-ignore
      document.documentElement.style.backgroundColor = backgroundColor;

      // 2. Set meta theme-color for iOS Safari / Chrome Address bar
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', backgroundColor);
    }
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <AppLayout />
    </PreferencesProvider>
  );
}
