import { GlassView } from '@/components/GlassView';
import { GroundIcon } from '@/components/icons/GroundIcon';
import { ThemedText } from '@/components/themed-text';
import { useTranslation } from '@/hooks/use-translation';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GroundingIdleProps {
    onStart: () => void;
    tintColor: string;
    textColor: string;
}

export function GroundingIdle({ onStart, tintColor, textColor }: GroundingIdleProps) {
    const { t } = useTranslation();

    return (
        <Animated.View
            style={styles.absoluteFill}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
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
                <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={onStart}>
                    <ThemedText style={[styles.buttonText, { color: textColor }]}>{t('grounding.start')}</ThemedText>
                </TouchableOpacity>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    absoluteFill: { ...StyleSheet.absoluteFillObject },
    menuContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    subtitle: { marginTop: 10, opacity: 0.6 },
    glassCard: { padding: 20, marginVertical: 30, marginHorizontal: 20 },
    description: { textAlign: 'center', fontSize: 18, lineHeight: 26 },
    button: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, marginTop: 10 },
    buttonText: { fontSize: 18, fontWeight: '600' },
});
