import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

// Import the IconSymbolName type to ensure type safety
import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// 1. Define which icon goes with which route name here
const TAB_ICONS: Record<string, IconSymbolName> = {
  index: 'house.fill',
  settings: 'gear', // Change explore to settings, use gear icon
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme ?? 'light'];
  
  const activeColor = theme.tint;
  const inactiveColor = theme.icon;
  const borderColor = theme.glassBorder;
  const bubbleColor = theme.tabHighlight;

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.glassPill}>
        <BlurView
          intensity={80}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[
          StyleSheet.absoluteFill, 
          { 
            borderColor: borderColor, 
            borderWidth: 1.5, 
            borderRadius: 35 
          }
        ]} />

        <View style={styles.tabItemsContainer}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            
            // 2. Safely get the icon name based on the route
            const iconName = TAB_ICONS[route.name] || 'questionmark'; // Fallback

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
              >
                {isFocused && (
                  <View style={[styles.activeBubble, { backgroundColor: bubbleColor }]} />
                )}

                <IconSymbol
                  size={28}
                  name={iconName} // Fixed: Passing string directly
                  color={isFocused ? activeColor : inactiveColor}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Settings' }}
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