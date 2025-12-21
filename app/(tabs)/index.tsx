import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import your existing infrastructure
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
  icon: string;
  colorKey: keyof typeof Colors.light;
}

const STEPS: GroundingStep[] = [
  {
    count: 5,
    sense: 'SIGHT',
    instruction: 'Look around. Tap for 5 things you can SEE.',
    icon: 'eye.fill',
    colorKey: 'step5',
  },
  {
    count: 4,
    sense: 'TOUCH',
    instruction: 'Find 4 things you can physically FEEL.',
    icon: 'hand.point.up.fill',
    colorKey: 'step4',
  },
  {
    count: 3,
    sense: 'SOUND',
    instruction: 'Listen carefully. Tap for 3 things you can HEAR.',
    icon: 'ear.fill',
    colorKey: 'step3',
  },
  {
    count: 2,
    sense: 'SMELL',
    instruction: 'Identify 2 things you can SMELL.',
    icon: 'nose.fill',
    colorKey: 'step2',
  },
  {
    count: 1,
    sense: 'TASTE',
    instruction: 'Focus on 1 thing you can TASTE.',
    icon: 'mouth.fill',
    colorKey: 'step1',
  },
];

export default function HomeScreen() {
  const [status, setStatus] = useState<'IDLE' | 'ACTIVE' | 'COMPLETE'>('IDLE');
  const [stepIndex, setStepIndex] = useState(0);
  const [itemsLeft, setItemsLeft] = useState(5);

  const currentStep = STEPS[stepIndex];

  // Theme Hooks
  const stepTextColor = useThemeColor({}, 'stepText');
  const backgroundColor = useThemeColor({}, currentStep.colorKey);
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleTap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

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

  const startExercise = () => {
    setStatus('ACTIVE');
    setStepIndex(0);
    setItemsLeft(5);
  };

  const reset = () => {
    setStatus('IDLE');
  };

  // --- VIEW: START SCREEN ---
  if (status === 'IDLE') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.menuContainer}>
          <GroundIcon 
            size={60} 
            color={tintColor} 
            style={{marginBottom: 20}} 
          />
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

  // --- VIEW: COMPLETE SCREEN ---
if (status === 'COMPLETE') {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.menuContainer}>
          
          {/* LAYERED ICON COMPONENT */}
          <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
            {/* 1. The Background Circle (Fills the checkmark hole) */}
            <View style={{
              position: 'absolute',
              width: 60,  // Smaller than the icon so it doesn't peek out the edges
              height: 60,
              borderRadius: 30, // Makes it a perfect circle
              backgroundColor: textColor, 
            }} />
            
            {/* 2. The Icon (The outer ring) */}
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
            <ThemedText style={[styles.buttonText, { color: textColor }]}>
              Finish
            </ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  // --- VIEW: ACTIVE EXERCISE ---
  return (
    <View style={[styles.fullScreen, { backgroundColor }]}>
      <TouchableOpacity 
        activeOpacity={1} 
        style={styles.touchableArea} 
        onPress={handleTap}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Header (Top of screen) */}
          <View style={styles.header}>
            <ThemedText type="subtitle" style={{ color: stepTextColor, opacity: 0.7 }}>
              {currentStep.sense}
            </ThemedText>
          </View>

          {/* 
             Split Screen Layout: 
             Upper holds the number. 
             Lower holds the text. 
          */}
          <View style={styles.splitContentContainer}>
            
            {/* Upper Section: Number sits at the bottom of this section */}
            <View style={styles.upperSection}>
              <ThemedText style={[styles.bigNumber, { color: stepTextColor }]}>
                {itemsLeft}
              </ThemedText>
            </View>

            {/* Lower Section: Text sits at the top of this section */}
            <View style={styles.lowerSection}>
              <ThemedText type="title" style={[styles.instruction, { color: stepTextColor }]}>
                {currentStep.instruction}
              </ThemedText>
              <ThemedText style={{ color: stepTextColor, marginTop: 20, opacity: 0.5 }}>
                (Tap anywhere to count)
              </ThemedText>
            </View>

          </View>

          {/* Footer (Dots) */}
          <View style={styles.footer}>
            <View style={styles.dotsContainer}>
              {STEPS.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    { backgroundColor: stepTextColor, opacity: index === stepIndex ? 1 : 0.2 }
                  ]} 
                />
              ))}
            </View>
          </View>

        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Used for Start/End screens
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
  },
  touchableArea: {
    flex: 1,
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
  
  // --- Exercise Specific Layout ---
  header: {
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    zIndex: 10,
  },
  // New Container that holds the split sections
  splitContentContainer: {
    flex: 1, // Takes up all remaining space between Header and Footer
    width: '100%',
    paddingHorizontal: 30,
  },
  upperSection: {
    flex: 0.45, // Takes top 45% of the central area
    justifyContent: 'flex-end', // Aligns number to the bottom of this box
    alignItems: 'center',
    paddingBottom: 10, // Small gap between number and text
  },
  lowerSection: {
    flex: 0.55, // Takes bottom 55% of the central area
    justifyContent: 'flex-start', // Aligns text to the top of this box
    alignItems: 'center',
    paddingTop: 10, // Small gap between number and text
  },
  bigNumber: {
    fontSize: 140, // Increased slightly
    lineHeight: 140, // Keeps line height tight to the number
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    // We remove negative margins to rely on Flexbox
  },
  instruction: {
    textAlign: 'center',
    fontSize: 24, // Explicit size to ensure readability
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