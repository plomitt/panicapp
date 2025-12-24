import { GlassView } from '@/components/GlassView';
import { ThemedText } from '@/components/themed-text';
import { useTranslation } from '@/hooks/use-translation';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GroundingStepsProps {
    currentStep: { sense: string; instruction: string };
    itemsLeft: number;
    totalSteps: number;
    stepIndex: number;
    textColor: string;
    onTap: (event: GestureResponderEvent) => void;
}

export function GroundingSteps({
    currentStep,
    itemsLeft,
    totalSteps,
    stepIndex,
    textColor,
    onTap
}: GroundingStepsProps) {
    const { t } = useTranslation();

    return (
        <Animated.View
            style={styles.absoluteFill}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
        >
            <TouchableOpacity activeOpacity={1} style={styles.touchableArea} onPress={onTap}>
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
                            {Array.from({ length: totalSteps }).map((_, i) => (
                                <View key={i} style={[styles.dot, { backgroundColor: textColor, opacity: i === stepIndex ? 1 : 0.2 }]} />
                            ))}
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    absoluteFill: { ...StyleSheet.absoluteFillObject },
    touchableArea: { flex: 1, width: '100%' },
    safeArea: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
    headerGlass: { paddingHorizontal: 20, paddingVertical: 8, marginTop: 10, borderRadius: 20 },
    splitContentContainer: { flex: 1, width: '100%' },
    upperSection: { flex: 0.45, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10 },
    lowerSection: { flex: 0.55, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, width: '100%' },
    bigNumber: { fontSize: 140, lineHeight: 140, fontWeight: 'bold', textAlign: 'center', width: '100%' },
    instructionGlass: { padding: 25, marginHorizontal: 25, width: 'auto', maxWidth: '90%', alignItems: 'center', alignSelf: 'center' },
    instruction: { textAlign: 'center', fontSize: 24, lineHeight: 32 },
    footer: { marginBottom: 90, height: 50, justifyContent: 'center', paddingBottom: 40 },
    dotsContainer: { flexDirection: 'row', gap: 8 },
    dot: { width: 10, height: 10, borderRadius: 5 },
});
