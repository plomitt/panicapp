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
  isFinished?: boolean; // NEW: Triggers the morph
}

export function LiquidOrb({ color, stepIndex, totalSteps, isFinished = false }: LiquidOrbProps) {
  const { width } = useWindowDimensions();
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  // Base size of the orb (85% of screen width)
  const BASE_SIZE = width * 0.85;
  // Target size for the checkmark background (60px)
  const TARGET_SIZE = 60;

  const animatedColor = useSharedValue(color);
  const focusProgress = useSharedValue(0);
  const breath = useSharedValue(1);
  const finishProgress = useSharedValue(0); // 0 = Active, 1 = Finished

  useEffect(() => {
    animatedColor.value = withTiming(color, { duration: 800 });
  }, [color]);

  useEffect(() => {
    // If finished, we ignore step progress
    if (!isFinished) {
      const progress = stepIndex / (totalSteps - 1);
      focusProgress.value = withSpring(progress, { damping: 20, stiffness: 90 });
    }
  }, [stepIndex, isFinished]);

  useEffect(() => {
    // Animate the Morph state
    finishProgress.value = withTiming(isFinished ? 1 : 0, { 
      duration: 800, 
      easing: Easing.inOut(Easing.cubic) 
    });
  }, [isFinished]);

  useEffect(() => {
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
      {[0, 1, 2].map((layerIndex) => (
        <LiquidLayer
          key={layerIndex}
          layerIndex={layerIndex}
          baseSize={BASE_SIZE}
          targetSize={TARGET_SIZE}
          color={animatedColor}
          focusProgress={focusProgress}
          finishProgress={finishProgress}
          breath={breath}
          isDark={isDark}
        />
      ))}
    </View>
  );
}

function LiquidLayer({ layerIndex, baseSize, targetSize, color, focusProgress, finishProgress, breath, isDark }: any) {
  // Layer Configuration
  const initialRatio = [1.0, 0.75, 0.5][layerIndex]; 
  
  const animatedStyle = useAnimatedStyle(() => {
    // 1. Calculate Standard Active Size
    // Inner core (layer 2) shrinks less than outer layers during steps
    const stepShrink = interpolate(
        focusProgress.value, 
        [0, 1], 
        [1, 0.6 + (layerIndex * 0.1)]
    );
    
    // 2. Calculate Finished Size
    // All layers want to become TARGET_SIZE (60px)
    // We calculate the scale needed to turn "Base * Ratio" into "Target"
    const currentBaseSize = baseSize * initialRatio;
    const targetScale = targetSize / currentBaseSize;

    // 3. Morph Logic: Interpolate between Active Scale and Finished Scale
    // Active Scale = stepShrink * breath
    // Finished Scale = targetScale (no breath)
    
    const activeScale = stepShrink * interpolate(
        breath.value, 
        [0.95, 1.05], 
        [0.95 + (layerIndex * 0.01), 1.05 - (layerIndex * 0.01)]
    );

    const finalScale = interpolate(finishProgress.value, [0, 1], [activeScale, targetScale]);

    return {
      width: currentBaseSize,
      height: currentBaseSize,
      borderRadius: currentBaseSize / 2,
      backgroundColor: color.value,
      transform: [{ scale: finalScale }],
      // Opacity Logic:
      // Active: [0.2, 0.4, 0.9]
      // Finished: Outer layers fade to 0, Inner Core (Layer 2) becomes 1 (Solid)
      opacity: interpolate(
        finishProgress.value,
        [0, 1],
        [
           [0.2, 0.4, 0.9][layerIndex], 
           layerIndex === 2 ? 1 : 0 // Layer 2 stays, others vanish
        ]
      ),
    };
  });

  return (
    <Animated.View style={[styles.layerPosition, animatedStyle]}>
      {/* Blur removed on finish (so it matches the solid checkmark background) */}
      {layerIndex < 2 && (
        <Animated.View style={{ opacity: interpolate(finishProgress.value, [0, 1], [1, 0]) }}>
             <BlurView
              intensity={layerIndex === 0 ? 40 : 20}
              tint={isDark ? 'dark' : 'light'}
              style={[StyleSheet.absoluteFill, { borderRadius: 9999 }]}
            />
        </Animated.View>
      )}

      {/* Border fades out on finish */}
      <Animated.View style={[
        styles.borderOverlay, 
        { 
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
          borderWidth: layerIndex === 2 ? 0 : 1,
          opacity: interpolate(finishProgress.value, [0, 1], [1, 0]) 
        }
      ]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  layerPosition: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // We remove overflow hidden so shadows work, but blur needs radius matching
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  borderOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 9999 },
});