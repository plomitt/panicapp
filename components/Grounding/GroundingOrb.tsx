import { LiquidOrb } from '@/components/LiquidOrb';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface GroundingOrbProps {
    stepIndex: number;
    totalSteps: number;
    stepColor: string;
    isFinished: boolean;
}

export function GroundingOrb({ stepIndex, totalSteps, stepColor, isFinished }: GroundingOrbProps) {
    return (
        <Animated.View
            style={styles.absoluteFillCenter}
            entering={FadeIn.duration(800)}
            exiting={FadeOut.duration(500)}
        >
            <LiquidOrb
                color={stepColor}
                stepIndex={stepIndex}
                totalSteps={totalSteps}
                isFinished={isFinished}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    absoluteFillCenter: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 0 },
});
