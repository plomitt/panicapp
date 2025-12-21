import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

interface TapRippleProps {
  x: number;
  y: number;
  color: string;
  onComplete: () => void;
}

export function TapRipple({ x, y, color, onComplete }: TapRippleProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    // 1. Expand
    scale.value = withTiming(4, { duration: 600 });
    
    // 2. Fade Out & Cleanup
    opacity.value = withTiming(0, { duration: 600 }, (finished) => {
      if (finished) {
        runOnJS(onComplete)();
      }
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
      backgroundColor: color,
    };
  });

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          left: x - 50, // Center the 100x100 circle on the tap coordinates
          top: y - 50,
        },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 0, // Behind text, in front of Orb
  },
});