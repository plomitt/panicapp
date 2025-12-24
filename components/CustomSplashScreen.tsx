import React from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { GroundIcon } from './icons/GroundIcon';

export function CustomSplashScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme ?? 'light';
    const backgroundColor = Colors[theme].background;
    const iconColor = theme === 'dark' ? '#ECEDEE' : '#11181C';

    return (
        <Animated.View
            exiting={FadeOut.duration(500)} // Smooth fade out
            style={[styles.container, { backgroundColor }]}
        >
            <View style={styles.iconContainer}>
                <GroundIcon size={120} color={iconColor} />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 99999, // Ensure it sits on top of everything
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
