import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface GlassViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export function GlassView({ children, style, intensity = 30 }: GlassViewProps) {
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  return (
    <View style={[styles.glassContainer, style]}>
      <BlurView 
        intensity={intensity} 
        tint={isDark ? 'dark' : 'light'} 
        style={StyleSheet.absoluteFill} 
      />
      <View style={[
        styles.borderLayer, 
        { borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)' }
      ]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    // Subtle shadow for depth (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android elevation
    elevation: 5,
    backgroundColor: 'transparent', // Let blur do the work
  },
  borderLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    borderWidth: 1.5,
    zIndex: 1,
  },
});