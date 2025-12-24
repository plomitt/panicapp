import * as Haptics from 'expo-haptics';
import React, { useEffect, useMemo, useState } from 'react'; // Added useMemo
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { GlassView } from '@/components/GlassView';
import { LiquidOrb } from '@/components/LiquidOrb';
import { TapRipple } from '@/components/TapRipple';
import { GroundIcon } from '@/components/icons/GroundIcon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
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

  const [status, setStatus] = useState<'IDLE' | 'ACTIVE' | 'COMPLETE'>('IDLE');
  const [stepIndex, setStepIndex] = useState(0);
  const [itemsLeft, setItemsLeft] = useState(5);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const currentStep = STEPS[stepIndex];
  const stepColor = useThemeColor({}, currentStep.colorKey);
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  // ANIMATION SHARED VALUES
  const idleOpacity = useSharedValue(1);
  const activeOpacity = useSharedValue(0);
  const completeOpacity = useSharedValue(0);
  const orbOpacity = useSharedValue(0);

  useEffect(() => {
    if (status === 'IDLE') {
      idleOpacity.value = withTiming(1, { duration: 500 });
      activeOpacity.value = withTiming(0, { duration: 500 });
      completeOpacity.value = withTiming(0, { duration: 500 });
      orbOpacity.value = withTiming(0, { duration: 500 });
    } else if (status === 'ACTIVE') {
      idleOpacity.value = withTiming(0, { duration: 500 });
      activeOpacity.value = withTiming(1, { duration: 500 });
      completeOpacity.value = withTiming(0, { duration: 500 });
      orbOpacity.value = withTiming(1, { duration: 800 });
    } else if (status === 'COMPLETE') {
      activeOpacity.value = withTiming(0, { duration: 500 });
      completeOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    }
  }, [status]);

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

      {/* LAYER 0: THE ORB */}
      <Animated.View style={[styles.absoluteFillCenter, { opacity: orbOpacity }]}>
        <LiquidOrb
          color={stepColor}
          stepIndex={stepIndex}
          totalSteps={STEPS.length}
          isFinished={status === 'COMPLETE'}
        />
      </Animated.View>

      {/* LAYER 1: RIPPLES */}
      <View style={styles.absoluteFill} pointerEvents="none">
        {ripples.map((r) => (
          <TapRipple key={r.id} x={r.x} y={r.y} color={stepColor} onComplete={() => removeRipple(r.id)} />
        ))}
      </View>

      {/* LAYER 2: IDLE SCREEN (Translated) */}
      <Animated.View
        style={[styles.absoluteFill, { opacity: idleOpacity }]}
        pointerEvents={status === 'IDLE' ? 'auto' : 'none'}
      >
        <SafeAreaView style={styles.menuContainer}>
          <GroundIcon size={80} color={tintColor} style={{ marginBottom: 20 }} />
          <ThemedText type="title">{t('grounding.title')}</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>{t('grounding.subtitle')}</ThemedText>
          <GlassView style={styles.glassCard}>
            <ThemedText style={styles.description}>
              {t('grounding.description')}
            </ThemedText>
          </GlassView>
          <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={() => {
            setStatus('ACTIVE'); setStepIndex(0); setItemsLeft(5);
          }}>
            <ThemedText style={[styles.buttonText, { color: textColor }]}>{t('grounding.start')}</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>

      {/* LAYER 3: ACTIVE PROCESS UI (Translated via STEPS) */}
      <Animated.View
        style={[styles.absoluteFill, { opacity: activeOpacity }]}
        pointerEvents={status === 'ACTIVE' ? 'auto' : 'none'}
      >
        <TouchableOpacity activeOpacity={1} style={styles.touchableArea} onPress={handleTap}>
          <SafeAreaView style={styles.safeArea}>
            <GlassView style={styles.headerGlass}>
              <ThemedText type="subtitle" style={{ opacity: 0.7 }}>{currentStep.sense}</ThemedText>
            </GlassView>
            <View style={styles.splitContentContainer}>
              <View style={styles.upperSection}>
                <ThemedText style={styles.bigNumber}>{itemsLeft}</ThemedText>
              </View>
              <View style={styles.lowerSection}>
                <GlassView style={styles.instructionGlass}>
                  <ThemedText type="title" style={styles.instruction}>{currentStep.instruction}</ThemedText>
                  <ThemedText style={{ marginTop: 10, opacity: 0.5 }}>{t('grounding.tapAnywhere')}</ThemedText>
                </GlassView>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.dotsContainer}>
                {STEPS.map((_, i) => (
                  <View key={i} style={[styles.dot, { backgroundColor: textColor, opacity: i === stepIndex ? 1 : 0.2 }]} />
                ))}
              </View>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </Animated.View>

      {/* LAYER 4: COMPLETE SCREEN (Translated) */}
      <Animated.View
        style={[styles.absoluteFill, { opacity: completeOpacity }]}
        pointerEvents={status === 'COMPLETE' ? 'auto' : 'none'}
      >
        <SafeAreaView style={styles.menuContainer}>
          <View style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: textColor,
            }} />
            <IconSymbol name="checkmark.circle.fill" size={80} color={tintColor} />
          </View>

          <ThemedText type="title" style={{ marginTop: 20 }}>{t('grounding.wellDone')}</ThemedText>
          <GlassView style={styles.glassCard}>
            <ThemedText style={styles.description}>
              {t('grounding.finishDescription')}
            </ThemedText>
          </GlassView>
          <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={() => setStatus('IDLE')}>
            <ThemedText style={[styles.buttonText, { color: textColor }]}>{t('grounding.finishButton')}</ThemedText>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  absoluteFill: { ...StyleSheet.absoluteFillObject },
  absoluteFillCenter: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 0 },
  menuContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  touchableArea: { flex: 1, width: '100%' },
  safeArea: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  subtitle: { marginTop: 10, opacity: 0.6 },
  glassCard: { padding: 20, marginVertical: 30, marginHorizontal: 20 },
  headerGlass: { paddingHorizontal: 20, paddingVertical: 8, marginTop: 10, borderRadius: 20 },
  instructionGlass: { padding: 25, marginHorizontal: 25, width: 'auto', maxWidth: '90%', alignItems: 'center', alignSelf: 'center' },
  description: { textAlign: 'center', fontSize: 18, lineHeight: 26 },
  button: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, marginTop: 10 },
  buttonText: { fontSize: 18, fontWeight: '600' },
  splitContentContainer: { flex: 1, width: '100%' },
  upperSection: { flex: 0.45, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10 },
  lowerSection: { flex: 0.55, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, width: '100%' },
  bigNumber: { fontSize: 140, lineHeight: 140, fontWeight: 'bold', textAlign: 'center', width: '100%' },
  instruction: { textAlign: 'center', fontSize: 24, lineHeight: 32 },
  footer: { marginBottom: 90, height: 50, justifyContent: 'center' },
  dotsContainer: { flexDirection: 'row', gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
});