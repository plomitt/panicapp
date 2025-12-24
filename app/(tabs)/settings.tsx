import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlassView } from '@/components/GlassView';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SUPPORTED_LANGUAGES } from '@/constants/Translations';
import { usePreferences } from '@/context/PreferencesContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTranslation } from '@/hooks/use-translation';

export default function SettingsScreen() {
  const { themePreference, setThemePreference, language, setLanguage } = usePreferences();
  const { t } = useTranslation();

  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>

          <ThemedText type="title" style={styles.header}>{t('settings.title')}</ThemedText>

          {/* --- APPEARANCE SECTION --- */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>{t('settings.appearance')}</ThemedText>
          <GlassView style={styles.section}>

            <SettingItem
              label={t('settings.theme.system')}
              icon="iphone"
              isSelected={themePreference === 'system'}
              onPress={() => setThemePreference('system')}
              tintColor={tintColor}
              textColor={textColor}
            />
            <SettingItem
              label={t('settings.theme.light')}
              icon="sun.max.fill"
              isSelected={themePreference === 'light'}
              onPress={() => setThemePreference('light')}
              tintColor={tintColor}
              textColor={textColor}
            />
            <SettingItem
              label={t('settings.theme.dark')}
              icon="moon.fill"
              isSelected={themePreference === 'dark'}
              onPress={() => setThemePreference('dark')}
              tintColor={tintColor}
              textColor={textColor}
              isLast
            />
          </GlassView>

          {/* --- LANGUAGE SECTION --- */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>{t('settings.language')}</ThemedText>
          <GlassView style={styles.section}>
            {SUPPORTED_LANGUAGES.map((lang, index) => (
              <SettingItem
                key={lang.code}
                label={lang.label}
                icon="globe" // generic icon for now
                isSelected={language === lang.code}
                onPress={() => setLanguage(lang.code)}
                tintColor={tintColor}
                textColor={textColor}
                isLast={index === SUPPORTED_LANGUAGES.length - 1}
              />
            ))}
          </GlassView>

        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

// Helper Component for List Items
function SettingItem({ label, icon, isSelected, onPress, tintColor, textColor, isLast }: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.item, !isLast && styles.separator, { borderColor: 'rgba(150,150,150,0.1)' }]}>
        <View style={styles.itemLeft}>
          <IconSymbol name={icon} size={24} color={isSelected ? tintColor : textColor} />
          <ThemedText style={[styles.label, { fontWeight: isSelected ? '700' : '400' }]}>{label}</ThemedText>
        </View>
        {isSelected && <IconSymbol name="checkmark" size={20} color={tintColor} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { padding: 20, paddingBottom: 100 },
  header: { marginBottom: 30, marginTop: 10 },
  sectionTitle: { marginBottom: 10, marginLeft: 10, opacity: 0.6 },
  section: { marginBottom: 30 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  label: { fontSize: 16 },
  separator: { borderBottomWidth: 1 },
});