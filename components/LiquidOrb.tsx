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
  withTiming
} from 'react-native-reanimated';

// We need an Animated version of BlurView to animate its opacity seamlessly
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface LiquidOrbProps {
  color: string;
  stepIndex: number;
  totalSteps: number;
  isFinished?: boolean;
}

export function LiquidOrb({ color, stepIndex, totalSteps, isFinished = false }: LiquidOrbProps) {
  const { width } = useWindowDimensions();
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const BASE_SIZE = width * 0.85;
  const TARGET_SIZE = 60;

  const animatedColor = useSharedValue(color);
  const focusProgress = useSharedValue(0);
  const breath = useSharedValue(1);
  const finishProgress = useSharedValue(0);

  useEffect(() => {
    animatedColor.value = withTiming(color, { duration: 800 });
  }, [color]);

  useEffect(() => {
    if (!isFinished) {
      const progress = stepIndex / (totalSteps - 1);
      focusProgress.value = withSpring(progress, { damping: 20, stiffness: 90 });
    }
  }, [stepIndex, isFinished]);

  useEffect(() => {
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
  const initialRatio = [1.0, 0.75, 0.5][layerIndex]; 
  
  // 1. Main Geometry & Color Animation
  const animatedStyle = useAnimatedStyle(() => {
    const stepShrink = interpolate(
        focusProgress.value, 
        [0, 1], 
        [1, 0.6 + (layerIndex * 0.1)]
    );
    
    const currentBaseSize = baseSize * initialRatio;
    const targetScale = targetSize / currentBaseSize;

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
      opacity: interpolate(
        finishProgress.value,
        [0, 1],
        [
           [0.2, 0.4, 0.9][layerIndex], 
           layerIndex === 2 ? 1 : 0 
        ]
      ),
    };
  });

  // 2. Blur Opacity Animation (Moved to useAnimatedStyle)
  const blurStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(finishProgress.value, [0, 1], [1, 0]),
      borderRadius: 9999, // Ensure blur respects circle
    };
  });

  // 3. Border Animation (Moved to useAnimatedStyle)
  const borderStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(finishProgress.value, [0, 1], [1, 0]),
    };
  });

  return (
    <Animated.View style={[styles.layerPosition, animatedStyle]}>
      
      {/* Blur Layer */}
      {layerIndex < 2 && (
        <AnimatedBlurView
          intensity={layerIndex === 0 ? 40 : 20}
          tint={isDark ? 'dark' : 'light'}
          style={[StyleSheet.absoluteFill, blurStyle]} // Using the animated style
        />
      )}

      {/* Border Layer */}
      <Animated.View style={[
        styles.borderOverlay, 
        { 
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)',
          borderWidth: layerIndex === 2 ? 0 : 1,
        },
        borderStyle // Using the animated style
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  borderOverlay: { ...StyleSheet.absoluteFillObject, borderRadius: 9999 },
});