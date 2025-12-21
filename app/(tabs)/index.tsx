import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { BreathingOrb } from '@/components/BreathingOrb';
import { TapRipple } from '@/components/TapRipple';
import { GroundIcon } from '@/components/icons/GroundIcon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

interface GroundingStep {
  count: number;
  sense: string;
  instruction: string;
  colorKey: keyof typeof Colors.light;
}

const STEPS: GroundingStep[] = [
  {
    count: 5,
    sense: 'SIGHT',
    instruction: 'Look around. Tap for 5 things you can SEE.',
    colorKey: 'step5',
  },
  {
    count: 4,
    sense: 'TOUCH',
    instruction: 'Find 4 things you can physically FEEL.',
    colorKey: 'step4',
  },
  {
    count: 3,
    sense: 'SOUND',
    instruction: 'Listen carefully. Tap for 3 things you can HEAR.',
    colorKey: 'step3',
  },
  {
    count: 2,
    sense: 'SMELL',
    instruction: 'Identify 2 things you can SMELL.',
    colorKey: 'step2',
  },
  {
    count: 1,
    sense: 'TASTE',
    instruction: 'Focus on 1 thing you can TASTE.',
    colorKey: 'step1',
  },
];

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export default function HomeScreen() {
  const [status, setStatus] = useState<'IDLE' | 'ACTIVE' | 'COMPLETE'>('IDLE');
  const [stepIndex, setStepIndex] = useState(0);
  const [itemsLeft, setItemsLeft] = useState(5);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const currentStep = STEPS[stepIndex];

  // Colors
  const stepColor = useThemeColor({}, currentStep.colorKey);
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleTap = (event: GestureResponderEvent) => {
    // 1. Feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // 2. Add Ripple at tap location
    const { pageX, pageY } = event.nativeEvent;
    const newRipple = { id: Date.now(), x: pageX, y: pageY };
    setRipples((prev) => [...prev, newRipple]);

    // 3. Logic
    if (itemsLeft > 1) {
      setItemsLeft(itemsLeft - 1);
    } else {
      if (stepIndex < STEPS.length - 1) {
        setStepIndex(stepIndex + 1);
        setItemsLeft(STEPS[stepIndex + 1].count);
      } else {
        setStatus('COMPLETE');
      }
    }
  };

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const startExercise = () => {
    setStatus('ACTIVE');
    setStepIndex(0);
    setItemsLeft(5);
  };

  const reset = () => {
    setStatus('IDLE');
  };

  // --- START SCREEN ---
  if (status === 'IDLE') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.menuContainer}>
          <GroundIcon size={80} color={tintColor} style={{ marginBottom: 20 }} />
          <ThemedText type="title">Grounding</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>5-4-3-2-1 Technique</ThemedText>
          <ThemedText style={styles.description}>
            Use this exercise to anchor yourself in the present moment when you feel overwhelmed.
          </ThemedText>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: tintColor }]} 
            onPress={startExercise}
          >
            <ThemedText style={[styles.buttonText, { color: textColor }]}> 
              Start Exercise
            </ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // --- COMPLETE SCREEN ---
  if (status === 'COMPLETE') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.menuContainer}>
          {/* Layered Icon */}
          <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: textColor 
            }} />
            <IconSymbol name="checkmark.circle.fill" size={80} color={tintColor} />
          </View>

          <ThemedText type="title" style={{marginTop: 20}}>Well Done.</ThemedText>
          <ThemedText style={styles.description}>
            Take a deep breath. You have grounded yourself in the present.
          </ThemedText>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: tintColor }]}
            onPress={reset}
          >
            <ThemedText style={[styles.buttonText, { color: textColor }]}>Finish</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // --- ACTIVE EXERCISE ---
  // Note: We use ThemedView here so the background is standard (White/Black)
  // The color comes from the Orb.
  return (
    <ThemedView style={styles.container}>
      
      {/* 1. Background Animation Layer */}
      <View style={[styles.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
        <BreathingOrb 
          color={stepColor} 
          stepIndex={stepIndex} 
          totalSteps={STEPS.length} 
        />
      </View>

      {/* 2. Interaction Layer (Ripples) */}
      <View style={styles.absoluteFill} pointerEvents="none">
        {ripples.map((r) => (
          <TapRipple 
            key={r.id} 
            x={r.x} 
            y={r.y} 
            color={stepColor} // Ripple matches the orb color
            onComplete={() => removeRipple(r.id)} 
          />
        ))}
      </View>

      {/* 3. Content Layer */}
      <TouchableOpacity 
        activeOpacity={1} 
        style={styles.touchableArea} 
        onPress={handleTap}
      >
        <SafeAreaView style={styles.safeArea}>
          
          <View style={styles.header}>
            <ThemedText type="subtitle" style={{ opacity: 0.5 }}>
              {currentStep.sense}
            </ThemedText>
          </View>

          <View style={styles.splitContentContainer}>
            <View style={styles.upperSection}>
              {/* Number sits on top of the orb */}
              <ThemedText style={styles.bigNumber}>
                {itemsLeft}
              </ThemedText>
            </View>

            <View style={styles.lowerSection}>
              <ThemedText type="title" style={styles.instruction}>
                {currentStep.instruction}
              </ThemedText>
              <ThemedText style={{ marginTop: 20, opacity: 0.5 }}>
                (Tap anywhere to count)
              </ThemedText>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.dotsContainer}>
              {STEPS.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    { 
                      backgroundColor: textColor, // Dots are now standard text color
                      opacity: index === stepIndex ? 1 : 0.2 
                    }
                  ]} 
                />
              ))}
            </View>
          </View>

        </SafeAreaView>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  touchableArea: {
    flex: 1,
    zIndex: 1, // Ensures taps are registered
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 10,
    opacity: 0.6,
  },
  description: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
    fontSize: 18,
    marginHorizontal: 30,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
  },
  splitContentContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
  },
  upperSection: {
    flex: 0.45,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  lowerSection: {
    flex: 0.55,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  bigNumber: {
    fontSize: 140,
    lineHeight: 140,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  instruction: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
  },
  footer: {
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});