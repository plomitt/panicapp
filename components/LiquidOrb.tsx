import { useColorScheme } from '@/hooks/use-color-scheme';
import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface LiquidOrbProps {
  color: string;
  stepIndex: number;
  totalSteps: number;
}

export function LiquidOrb({ color, stepIndex, totalSteps }: LiquidOrbProps) {
  const { width } = useWindowDimensions();
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  // Base size of the orb (85% of screen width)
  const BASE_SIZE = width * 0.85;

  const animatedColor = useSharedValue(color);
  const focusProgress = useSharedValue(0);
  const breath = useSharedValue(1);

  useEffect(() => {
    animatedColor.value = withTiming(color, { duration: 800 });
  }, [color]);

  useEffect(() => {
    // Step 0 -> 0 (Open/Big)
    // Step 4 -> 1 (Focused/Small)
    const progress = stepIndex / (totalSteps - 1);
    focusProgress.value = withSpring(progress, { damping: 20, stiffness: 90 });
  }, [stepIndex]);

  useEffect(() => {
    // Continuous Breathing
    breath.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  return (
    <View style={[styles.container, { width: BASE_SIZE, height: BASE_SIZE }]}>
      {/* 
        LAYER 0: The "Halo" (Outer, blurred, very transparent)
        LAYER 1: The "Body" (Middle, semi-transparent)
        LAYER 2: The "Core" (Inner, solid, drives the color)
      */}
      {[0, 1, 2].map((layerIndex) => (
        <LiquidLayer
          key={layerIndex}
          layerIndex={layerIndex}
          baseSize={BASE_SIZE}
          color={animatedColor}
          focusProgress={focusProgress}
          breath={breath}
          isDark={isDark}
        />
      ))}
    </View>
  );
}

function LiquidLayer({ layerIndex, baseSize, color, focusProgress, breath, isDark }: any) {
  // CONFIGURATION
  // Layer 0 (Outer): 100% size, Low Opacity
  // Layer 1 (Mid):   75% size,  Mid Opacity
  // Layer 2 (Core):  50% size,  High Opacity
  const sizeRatio = [1.0, 0.75, 0.5][layerIndex]; 
  
  const animatedStyle = useAnimatedStyle(() => {
    // Shrink logic: Inner core shrinks less than outer halo to maintain visibility
    const shrinkFactor = interpolate(
        focusProgress.value, 
        [0, 1], 
        [1, 0.6 + (layerIndex * 0.1)]
    );
    
    // Parallax Breath: Layers move at slightly different rates to feel "fluid"
    const breathScale = interpolate(
        breath.value, 
        [0.95, 1.05], 
        [0.95 + (layerIndex * 0.01), 1.05 - (layerIndex * 0.01)]
    );

    return {
      width: baseSize * sizeRatio,
      height: baseSize * sizeRatio,
      borderRadius: (baseSize * sizeRatio) / 2,
      backgroundColor: color.value,
      transform: [{ scale: shrinkFactor * breathScale }],
      // Layering Opacity to create "Density"
      // Outer = 0.3, Mid = 0.5, Inner = 0.9
      opacity: [0.2, 0.4, 0.9][layerIndex],
    };
  });

  return (
    <Animated.View style={[styles.layerPosition, animatedStyle]}>
      {/* Blur only on outer layers to create the "Atmosphere" */}
      {layerIndex < 2 && (
        <BlurView
          intensity={layerIndex === 0 ? 40 : 20}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* White Border / Reflection for Glass look */}
      <View style={[
        styles.borderOverlay, 
        { 
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
          borderWidth: layerIndex === 2 ? 0 : 1, // No border on core, only on glass shells
        }
      ]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layerPosition: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Keeps blur inside circle
    // Shadows provide the "Pop" off the white background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  borderOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 9999,
  },
});