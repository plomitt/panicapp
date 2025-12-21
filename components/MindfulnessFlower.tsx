import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface MindfulnessFlowerProps {
  color: string;
  stepIndex: number; // 0 to 4
  totalSteps: number;
}

const PETAL_COUNT = 6;

export function MindfulnessFlower({ color, stepIndex, totalSteps }: MindfulnessFlowerProps) {
  const { width } = useWindowDimensions();
  const FLOWER_SIZE = width * 0.8;
  const PETAL_SIZE = FLOWER_SIZE / 2;

  // 1. Structural State (0 = Closed/Step 1,  1 = Open/Step 5)
  // We map stepIndex (0..4) to an expansion value (0..1)
  const expansion = useSharedValue(0);

  // 2. Breathing Pulse (The "Life" of the flower)
  const breath = useSharedValue(1);

  // 3. Color Transition
  const animatedColor = useSharedValue(color);

  useEffect(() => {
    // Pulse indefinitely
    breath.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    // Map Steps to Expansion:
    // Step 0 (5 items) -> Expansion 1.0 (Fully Open)
    // Step 4 (1 item)  -> Expansion 0.0 (Closed/Sphere)
    // We invert the index because Step 0 is the "Biggest" step in your app logic.
    const targetExpansion = interpolate(
      stepIndex,
      [0, totalSteps - 1],
      [1, 0], // 1 = Open, 0 = Closed
      Extrapolation.CLAMP
    );
    
    expansion.value = withSpring(targetExpansion, { damping: 15 });
  }, [stepIndex]);

  useEffect(() => {
    animatedColor.value = withTiming(color, { duration: 800 });
  }, [color]);

  // Render 6 Petals
  return (
    <View style={[styles.container, { width: FLOWER_SIZE, height: FLOWER_SIZE }]}>
      {Array.from({ length: PETAL_COUNT }).map((_, index) => {
        return (
          <Petal
            key={index}
            index={index}
            total={PETAL_COUNT}
            color={animatedColor}
            expansion={expansion}
            breath={breath}
            size={PETAL_SIZE}
          />
        );
      })}
      
      {/* Optional: A center glow for depth */}
      <Animated.View style={[styles.centerGlow, { backgroundColor: animatedColor }]} />
    </View>
  );
}

// Sub-component for individual petals to keep code clean
function Petal({ index, total, color, expansion, breath, size }: any) {
  const rotationOffset = (360 / total) * index;

  const style = useAnimatedStyle(() => {
    // 1. Rotation Logic
    // When closed (expansion 0), petals slightly overlap but mostly align
    // When open (expansion 1), they rotate out to their full circle positions
    const rotate = interpolate(expansion.value, [0, 1], [rotationOffset / 2, rotationOffset]);
    
    // 2. Translation (The "Bloom")
    // Move away from center based on expansion
    const translate = interpolate(expansion.value, [0, 1], [0, size / 3]);

    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color.value,
      position: 'absolute',
      opacity: 0.6, // Glassy transparency
      transform: [
        // Global breathing scale
        { scale: breath.value }, 
        // Rotate to the petal's angle
        { rotate: `${rotate}deg` },
        // Move outwards
        { translateY: -translate },
        // Twist slightly as we move out for that organic feel
        { rotate: `${interpolate(expansion.value, [0, 1], [0, 45])}deg` }
      ],
    };
  });

  return <Animated.View style={style} />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.8,
  },
});