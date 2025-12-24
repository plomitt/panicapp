import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView, BlurViewProps } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from 'react-native-reanimated';

import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from '@/hooks/use-translation';

const TAB_ICONS: Record<string, IconSymbolName> = {
  index: 'house.fill',
  settings: 'gear',
};

// --- REUSABLE BACKGROUND COMPONENT ---
function CrossFadeBlur({ isDark, intensity = 80 }: { isDark: boolean; intensity?: number }) {
  const lightOpacity = useDerivedValue(() => withTiming(isDark ? 0 : 1, { duration: 300 }), [isDark]);
  const darkOpacity = useDerivedValue(() => withTiming(isDark ? 1 : 0, { duration: 300 }), [isDark]);

  return (
    <>
      {[
        { tint: 'light', opacity: lightOpacity },
        { tint: 'dark', opacity: darkOpacity },
      ].map((layer) => (
        <Animated.View
          key={layer.tint}
          style={[StyleSheet.absoluteFill, { opacity: layer.opacity }]}
        >
          <BlurView
            intensity={intensity}
            tint={layer.tint as BlurViewProps['tint']}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ))}
    </>
  );
}

function TabItem({ onPress, isFocused, iconName, activeColor, inactiveColor, bubbleColor }: any) {
  const progress = useDerivedValue(() => {
    return withTiming(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused]);

  const animatedBubbleStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    backgroundColor: bubbleColor
  }), [bubbleColor]);

  return (
    <Pressable onPress={onPress} style={styles.tabItem}>
      <Animated.View style={[styles.activeBubble, animatedBubbleStyle]} />
      <IconSymbol
        size={28}
        name={iconName}
        color={isFocused ? activeColor : inactiveColor}
      />
    </Pressable>
  );
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme ?? 'light'];

  const borderColor = theme.glassBorder;
  const bubbleColor = theme.tabHighlight;

  const animatedPillStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(borderColor, { duration: 300 })
  }), [borderColor]);

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.glassPill}>

        <CrossFadeBlur isDark={isDark} />

        {/* BORDER LAYER */}
        <Animated.View style={[
          StyleSheet.absoluteFill,
          { borderWidth: 1.5, borderRadius: 35 },
          animatedPillStyle
        ]} />

        <View style={styles.tabItemsContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = TAB_ICONS[route.name] || 'questionmark';

            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
            };

            return (
              <TabItem
                key={route.key}
                onPress={onPress}
                isFocused={isFocused}
                iconName={iconName}
                activeColor={theme.tint}
                inactiveColor={theme.icon}
                bubbleColor={bubbleColor}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}



export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t('grounding.title') }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: t('settings.title') }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  glassPill: {
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  tabItemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    gap: 6,
  },
  tabItem: {
    width: 90,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  activeBubble: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
  },
});