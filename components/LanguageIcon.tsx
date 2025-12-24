import { StyleSheet, Text, View } from 'react-native';

interface LanguageIconProps {
    symbol: string;
    color: string;
}

export function LanguageIcon({ symbol, color }: LanguageIconProps) {
    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.text, { color }]}>
                {symbol}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 28,
        height: 24,
        borderRadius: 6,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 16, // Adjust to center vertically
    },
});
