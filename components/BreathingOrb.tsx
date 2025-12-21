import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
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

interface BreathingOrbProps {
  color: string;
  stepIndex: number; // 0 to 4
  totalSteps: number;
}

export function BreathingOrb({ color, stepIndex, totalSteps }: BreathingOrbProps) {
  const { width } = useWindowDimensions();
  
  // 1. Breathing Animation (Infinite Pulse)
  const breath = useSharedValue(1);
  
  // 2. Focus Animation (Shrinking based on step)
  const focusLevel = useSharedValue(0); 

  // 3. Color Animation (The Fix)
  // We initialize a Shared Value with the color prop.
  // This allows the UI thread to track the color value directly.
  const animatedColor = useSharedValue(color);

  useEffect(() => {
    // Start continuous breathing
    breath.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1, // Infinite
      true // Reverse
    );
  }, []);

  useEffect(() => {
    // Animate the size change when step updates
    focusLevel.value = withSpring(stepIndex);
  }, [stepIndex]);

  // THE FIX: Explicitly watch for the 'color' prop changing
  useEffect(() => {
    // Animate the SharedValue to the new color
    animatedColor.value = withTiming(color, { duration: 500 });
  }, [color]);

  const animatedStyle = useAnimatedStyle(() => {
    const stepScale = interpolate(
      focusLevel.value,
      [0, totalSteps - 1],
      [1.3, 0.4] 
    );

    return {
      transform: [
        { scale: breath.value * stepScale },
      ],
      // Use the Shared Value, not the prop directly
      backgroundColor: animatedColor.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.orb,
        { width: width, height: width, borderRadius: width / 2 },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
  },
});