import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { GlassView } from '@/components/GlassView'; // NEW
import { LiquidOrb } from '@/components/LiquidOrb';
import { MindfulnessFlower } from '@/components/MindfulnessFlower'; // NEW
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
  const stepColor = useThemeColor({}, currentStep.colorKey);
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleTap = (event: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const { pageX, pageY } = event.nativeEvent;
    setRipples((prev) => [...prev, { id: Date.now(), x: pageX, y: pageY }]);

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

  // --- IDLE / START ---
  if (status === 'IDLE') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.menuContainer}>
          <GroundIcon size={80} color={tintColor} style={{ marginBottom: 20 }} />
          <ThemedText type="title">Grounding</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>5-4-3-2-1 Technique</ThemedText>
          
          <GlassView style={styles.glassCard}>
            <ThemedText style={styles.description}>
              Use this exercise to anchor yourself in the present moment when you feel overwhelmed.
            </ThemedText>
          </GlassView>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: tintColor }]} 
            onPress={startExercise}
          >
            <ThemedText style={[styles.buttonText, { color: textColor }]}>Start Exercise</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // --- COMPLETE ---
  if (status === 'COMPLETE') {
    return (
      <ThemedView style={styles.container}>
        {/* Flower Background for consistency */}
        <View style={styles.absoluteFillCenter}>
            <MindfulnessFlower color={stepColor} stepIndex={STEPS.length - 1} totalSteps={STEPS.length} />
        </View>

        <SafeAreaView style={styles.menuContainer}>
           <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: textColor }} />
            <IconSymbol name="checkmark.circle.fill" size={80} color={tintColor} />
          </View>

          <ThemedText type="title" style={{marginTop: 20}}>Well Done.</ThemedText>
          
          <GlassView style={styles.glassCard}>
            <ThemedText style={styles.description}>
              Take a deep breath. You have grounded yourself in the present.
            </ThemedText>
          </GlassView>

          <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={reset}>
            <ThemedText style={[styles.buttonText, { color: textColor }]}>Finish</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // --- ACTIVE EXERCISE ---
  return (
    <ThemedView style={styles.container}>
      
      {/* 1. Liquid Orb (Self-contained */}
      <View style={styles.absoluteFillCenter}>
        <LiquidOrb 
          color={stepColor} 
          stepIndex={stepIndex} 
          totalSteps={STEPS.length} 
        />
      </View>

      {/* 2. Ripples */}
      <View style={styles.absoluteFill} pointerEvents="none">
        {ripples.map((r) => (
          <TapRipple key={r.id} x={r.x} y={r.y} color={stepColor} onComplete={() => removeRipple(r.id)} />
        ))}
      </View>

      {/* 3. Glass UI (Depth Layer 2 - Floating on top) */}
      <TouchableOpacity activeOpacity={1} style={styles.touchableArea} onPress={handleTap}>
        <SafeAreaView style={styles.safeArea}>
          
          <GlassView style={styles.headerGlass}>
            <ThemedText type="subtitle" style={{ opacity: 0.7 }}>{currentStep.sense}</ThemedText>
          </GlassView>

          <View style={styles.splitContentContainer}>
            <View style={styles.upperSection}>
               {/* Number floats directly on the flower, no glass needed to keep it integrated */}
              <ThemedText style={styles.bigNumber}>{itemsLeft}</ThemedText>
            </View>

            <View style={styles.lowerSection}>
              {/* Instruction uses Glass to separate from the flower background */}
              <GlassView style={styles.instructionGlass}>
                <ThemedText type="title" style={styles.instruction}>
                    {currentStep.instruction}
                </ThemedText>
                <ThemedText style={{ marginTop: 10, opacity: 0.5, textAlign: 'center' }}>(Tap anywhere)</ThemedText>
              </GlassView>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.dotsContainer}>
              {STEPS.map((_, index) => (
                <View key={index} style={[styles.dot, { backgroundColor: textColor, opacity: index === stepIndex ? 1 : 0.2 }]} />
              ))}
            </View>
          </View>

        </SafeAreaView>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  absoluteFill: { ...StyleSheet.absoluteFillObject, zIndex: 0 },
  absoluteFillCenter: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 0 },
  menuContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  touchableArea: { flex: 1, zIndex: 1 },
  safeArea: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  subtitle: { marginTop: 10, opacity: 0.6 },
  
  // Glass Styles
  glassCard: { padding: 20, marginVertical: 30, marginHorizontal: 20 },
  headerGlass: { paddingHorizontal: 20, paddingVertical: 8, marginTop: 10, borderRadius: 20 },
  instructionGlass: { 
    padding: 25, 
    marginHorizontal: 25, // Adds space on left/right
    width: 'auto', // Let it size to content (with max limit below)
    maxWidth: '90%', // Prevents it from hitting edges
    alignItems: 'center',
    alignSelf: 'center', // Centers the box itself
  },

  description: { textAlign: 'center', fontSize: 18, lineHeight: 26 },
  button: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: '600' },
  
  // Layout
  splitContentContainer: { flex: 1, width: '100%', paddingHorizontal: 0 }, // Removed padding to let Glass touch edges if needed
  upperSection: { flex: 0.45, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10 },
  lowerSection: { flex: 0.55, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, width: '100%' },
  
  bigNumber: { fontSize: 140, lineHeight: 140, fontWeight: 'bold', textAlign: 'center', width: '100%' },
  instruction: { textAlign: 'center', fontSize: 24, lineHeight: 32 },
  
    footer: { 
    marginBottom: 90, // Increased from 20 to clear the absolute tab bar
    height: 50, 
    justifyContent: 'center' 
  },
  dotsContainer: { flexDirection: 'row', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});