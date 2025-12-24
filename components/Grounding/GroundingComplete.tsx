import { GlassView } from '@/components/GlassView';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTranslation } from '@/hooks/use-translation';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GroundingCompleteProps {
    onReset: () => void;
    tintColor: string;
    textColor: string;
}

export function GroundingComplete({ onReset, tintColor, textColor }: GroundingCompleteProps) {
    const { t } = useTranslation();

    return (
        <Animated.View
            style={styles.absoluteFill}
            entering={FadeIn.delay(300).duration(800)}
            exiting={FadeOut.duration(500)}
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
                <TouchableOpacity style={[styles.button, { backgroundColor: tintColor }]} onPress={onReset}>
                    <ThemedText style={[styles.buttonText, { color: textColor }]}>{t('grounding.finishButton')}</ThemedText>
                </TouchableOpacity>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    absoluteFill: { ...StyleSheet.absoluteFillObject },
    menuContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    glassCard: { padding: 20, marginVertical: 30, marginHorizontal: 20 },
    description: { textAlign: 'center', fontSize: 18, lineHeight: 26 },
    button: { paddingVertical: 16, paddingHorizontal: 40, borderRadius: 100, marginTop: 10 },
    buttonText: { fontSize: 18, fontWeight: '600' },
});
