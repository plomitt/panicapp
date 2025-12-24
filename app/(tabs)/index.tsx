import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';

// Components
import { GroundingComplete } from '@/components/Grounding/GroundingComplete';
import { GroundingIdle } from '@/components/Grounding/GroundingIdle';
import { GroundingOrb } from '@/components/Grounding/GroundingOrb';
import { GroundingSteps } from '@/components/Grounding/GroundingSteps';
import { TapRipple } from '@/components/TapRipple';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useTranslation } from '@/hooks/use-translation';

// 1. Static Configuration (Data that doesn't change with language)
const STEP_CONFIG = [
  { count: 5, key: 'sight', colorKey: 'step5' },
  { count: 4, key: 'touch', colorKey: 'step4' },
  { count: 3, key: 'sound', colorKey: 'step3' },
  { count: 2, key: 'smell', colorKey: 'step2' },
  { count: 1, key: 'taste', colorKey: 'step1' },
] as const;

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export default function HomeScreen() {
  const { t, language } = useTranslation();

  const STEPS = useMemo(() => {
    return STEP_CONFIG.map((step) => ({
      ...step,
      sense: t(`grounding.steps.${step.key}.sense`),
      instruction: t(`grounding.steps.${step.key}.instruction`),
    }));
  }, [language, t]);
  // No more shared values needed for screen opacity!

  const [status, setStatus] = useState<'IDLE' | 'ACTIVE' | 'COMPLETE'>('IDLE');
  const [stepIndex, setStepIndex] = useState(0);
  const [itemsLeft, setItemsLeft] = useState(5);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const currentStep = STEPS[stepIndex];
  const stepColor = useThemeColor({}, currentStep.colorKey);
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const handleTap = (event: GestureResponderEvent) => {
    if (status !== 'ACTIVE') return;

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

  return (
    <ThemedView style={styles.container}>

      {/* LAYER 0: THE ORB - Only visible in ACTIVE or COMPLETE */}
      {(status === 'ACTIVE' || status === 'COMPLETE') && (
        <GroundingOrb
          stepIndex={stepIndex}
          totalSteps={STEPS.length}
          stepColor={stepColor}
          isFinished={status === 'COMPLETE'}
        />
      )}

      {/* LAYER 1: RIPPLES */}
      <View style={styles.absoluteFill} pointerEvents="none">
        {ripples.map((r) => (
          <TapRipple key={r.id} x={r.x} y={r.y} color={stepColor} onComplete={() => removeRipple(r.id)} />
        ))}
      </View>

      {/* LAYER 2: IDLE SCREEN */}
      {status === 'IDLE' && (
        <GroundingIdle
          onStart={() => {
            setStatus('ACTIVE');
            setStepIndex(0);
            setItemsLeft(5);
          }}
          tintColor={tintColor}
          textColor={textColor}
        />
      )}

      {/* LAYER 3: ACTIVE PROCESS UI */}
      {status === 'ACTIVE' && (
        <GroundingSteps
          currentStep={currentStep}
          itemsLeft={itemsLeft}
          totalSteps={STEPS.length}
          stepIndex={stepIndex}
          textColor={textColor}
          onTap={handleTap}
        />
      )}

      {/* LAYER 4: COMPLETE SCREEN */}
      {status === 'COMPLETE' && (
        <GroundingComplete
          onReset={() => setStatus('IDLE')}
          tintColor={tintColor}
          textColor={textColor}
        />
      )}

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  absoluteFill: { ...StyleSheet.absoluteFillObject },
});