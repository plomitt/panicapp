import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface GlassViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export function GlassView({ children, style, intensity = 30 }: GlassViewProps) {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  
  const borderColor = useThemeColor({}, 'glassBorder');

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(borderColor, { duration: 300 }),
    };
  });

  return (
    <View style={[styles.glassContainer, style]}>
      <BlurView 
        intensity={intensity} 
        tint={isDark ? 'dark' : 'light'} 
        style={StyleSheet.absoluteFill} 
        pointerEvents="none" 
      />
      
      <Animated.View 
        style={[styles.borderLayer, animatedBorderStyle]} 
        pointerEvents="none"
      />
      
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  borderLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    borderWidth: 1.5,
    zIndex: 1,
  },
});